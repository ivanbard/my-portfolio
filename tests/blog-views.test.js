import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import test from 'node:test';
import handler from '../api/blog-views.js';
import { countBlogView } from '../src/lib/blogViews.js';

function response() {
  return {
    statusCode: 200,
    setHeader() {},
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

test('blog views read and increment only known posts', async () => {
  const originalFetch = globalThis.fetch;
  const originalUrl = process.env.UPSTASH_REDIS_REST_URL;
  const originalToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const commands = [];

  process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';
  globalThis.fetch = async (_url, options) => {
    const command = JSON.parse(options.body);
    commands.push(command);
    return { ok: true, json: async () => ({ result: command[0] === 'MGET' ? command.slice(1).map(() => null) : 1 }) };
  };

  try {
    const ids = readdirSync(new URL('../src/posts/', import.meta.url)).map((name) => name.replace(/\.md$/, ''));
    const get = response();
    await handler({ method: 'GET' }, get);
    assert.equal(get.statusCode, 200);
    assert.deepEqual(Object.keys(get.body.views).sort(), ids.sort());
    assert.ok(Object.values(get.body.views).every((count) => count === 0));

    const post = response();
    await handler({ method: 'POST', body: { slug: ids[0] } }, post);
    assert.equal(post.statusCode, 200);
    assert.deepEqual(post.body, { views: 1 });
    assert.deepEqual(commands.at(-1), ['INCR', `blog-views:${ids[0]}`]);

    const invalid = response();
    await handler({ method: 'POST', body: { slug: 'other-post' } }, invalid);
    assert.equal(invalid.statusCode, 400);
    assert.equal(commands.length, 2);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.UPSTASH_REDIS_REST_URL;
    else process.env.UPSTASH_REDIS_REST_URL = originalUrl;
    if (originalToken === undefined) delete process.env.UPSTASH_REDIS_REST_TOKEN;
    else process.env.UPSTASH_REDIS_REST_TOKEN = originalToken;
  }
});

test('a post increments once per tab session', async () => {
  const originalFetch = globalThis.fetch;
  const originalStorage = globalThis.sessionStorage;
  const stored = new Map();
  const methods = [];

  globalThis.sessionStorage = {
    getItem: (key) => stored.get(key),
    setItem: (key, value) => stored.set(key, value),
    removeItem: (key) => stored.delete(key),
  };
  globalThis.fetch = async (_url, options = {}) => {
    methods.push(options.method ?? 'GET');
    return { ok: true, json: async () => options.method === 'POST'
      ? { views: 1 }
      : { views: { 'my-internship-journey': 1 } } };
  };

  try {
    assert.equal(await countBlogView('my-internship-journey'), 1);
    assert.equal(await countBlogView('my-internship-journey'), 1);
    assert.deepEqual(methods, ['POST', 'GET']);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalStorage === undefined) delete globalThis.sessionStorage;
    else globalThis.sessionStorage = originalStorage;
  }
});
