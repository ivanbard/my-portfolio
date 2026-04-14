import { useEffect, useState } from 'react';
import '../styles/GitHubChart.css';

const levelColors = [
  '#ebe7de',
  '#d9d2c3',
  '#bcae96',
  '#9f8c71',
  '#7d684b',
];
const CONTRIBUTIONS_URL = '/api/github-contributions';

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(dateString));
}

function LoadingGrid() {
  return (
    <div className="github-chart-grid" aria-hidden="true">
      {Array.from({ length: 53 * 7 }).map((_, index) => (
        <span key={index} className="github-chart-cell github-chart-cell-loading" />
      ))}
    </div>
  );
}

export default function GitHubChart() {
  const [profileUrl, setProfileUrl] = useState('https://github.com/ivanbard');
  const [totalContributions, setTotalContributions] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    async function loadContributions() {
      try {
        const response = await fetch(CONTRIBUTIONS_URL);
        if (!response.ok) {
          throw new Error(`GitHub contributions request failed: ${response.status}`);
        }

        const data = await response.json();
        if (!cancelled) {
          setProfileUrl(data.profileUrl ?? 'https://github.com/ivanbard');
          setTotalContributions(data.totalContributions ?? null);
          setWeeks(data.weeks ?? []);
          setStatus('ready');
        }
      } catch {
        if (!cancelled) {
          setStatus('error');
        }
      }
    }

    loadContributions();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noreferrer"
      className="github-chart"
      aria-label={
        totalContributions
          ? `View ${totalContributions} GitHub contributions on GitHub`
          : "View Ivan Bardziyan's GitHub contributions on GitHub"
      }
    >
      <span className="github-chart-label">GitHub activity</span>

      {status === 'loading' && <LoadingGrid />}

      {status === 'ready' && (
        <div
          className="github-chart-grid"
          role="img"
          aria-label={
            totalContributions
              ? `${totalContributions} GitHub contributions over the last year`
              : 'GitHub contributions over the last year'
          }
        >
          {weeks.flat().map((day) => (
            <span
              key={day.date}
              className="github-chart-cell"
              style={{ '--cell-color': levelColors[day.level] ?? levelColors[0] }}
              title={`${day.count} contributions on ${formatDate(day.date)}`}
            />
          ))}
        </div>
      )}

      {status === 'error' && (
        <span className="github-chart-fallback">View recent GitHub activity</span>
      )}
    </a>
  );
}
