const GITHUB_USERNAME = 'ivanbard';
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

const CONTRIBUTION_LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const CONTRIBUTIONS_QUERY = `
  query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              contributionLevel
              date
            }
          }
        }
      }
    }
  }
`;

function getContributionRange() {
  const to = new Date();
  const from = new Date(to);
  from.setUTCFullYear(from.getUTCFullYear() - 1);

  return {
    from: from.toISOString(),
    to: to.toISOString(),
  };
}

function normalizeWeeks(weeks = []) {
  return weeks.map((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: CONTRIBUTION_LEVELS[day.contributionLevel] ?? 0,
    })),
  );
}

export async function getGithubContributionsData(token = process.env.GITHUB_TOKEN) {
  if (!token) {
    throw new Error('Missing GITHUB_TOKEN');
  }

  const { from, to } = getContributionRange();
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'bardz-ca',
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: {
        login: GITHUB_USERNAME,
        from,
        to,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status}`);
  }

  const payload = await response.json();

  if (payload.errors?.length) {
    const message = payload.errors.map((error) => error.message).join('; ');
    throw new Error(`GitHub API error: ${message}`);
  }

  const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    throw new Error('GitHub contribution calendar missing from response');
  }

  return {
    username: GITHUB_USERNAME,
    profileUrl: GITHUB_PROFILE_URL,
    totalContributions: calendar.totalContributions,
    weeks: normalizeWeeks(calendar.weeks),
  };
}
