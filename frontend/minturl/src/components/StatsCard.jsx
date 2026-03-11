import { useState } from "react";
import { getStats } from "../api/api";

const BarChartIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" x2="18" y1="20" y2="10" />
    <line x1="12" x2="12" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="14" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const MousePointerIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m4 4 7.07 17 2.51-7.39L21 11.07z" />
  </svg>
);

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
};

const extractShortCode = (input) => {
  const trimmed = input.trim();
  try {
    const url = new URL(trimmed);
    return url.pathname.replace(/^\//, "");
  } catch {
    return trimmed.replace(/^\//, "");
  }
};

const StatRow = ({ icon, label, value, isLink, isCode, highlight }) => (
  <div
    className={`flex items-start gap-3 py-3.5 border-b border-slate-100 last:border-0 ${highlight ? "group" : ""}`}
  >
    <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0 mt-0.5">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-widest font-sans mb-0.5">
        {label}
      </p>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-700 font-sans truncate block flex items-center gap-1 group transition-colors"
        >
          <span className="truncate">{value}</span>
          <span className="opacity-50 group-hover:opacity-100 flex-shrink-0 transition-opacity">
            <ExternalLinkIcon />
          </span>
        </a>
      ) : isCode ? (
        <span className="font-mono text-sm text-slate-700 font-medium">
          {value}
        </span>
      ) : highlight ? (
        <span className="text-2xl font-display font-700 text-blue-600">
          {value}
        </span>
      ) : (
        <span className="text-sm text-slate-700 font-sans">{value}</span>
      )}
    </div>
  </div>
);

export default function StatsCard() {
  const [input, setInput] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setStats(null);

    const shortCode = extractShortCode(input);

    try {
      const data = await getStats(shortCode);
      setStats(data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError(
          `No data found for short code "${shortCode}". Double-check the code and try again.`,
        );
      } else {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Failed to fetch analytics. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-100 opacity-0-init animate-fade-up"
      style={{ animationDelay: "250ms", animationFillMode: "forwards" }}
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-7">
        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
          <BarChartIcon />
        </div>
        <div>
          <h2 className="font-display text-lg font-700 text-slate-900 leading-tight">
            Analytics
          </h2>
          <p className="text-sm text-slate-400 font-sans font-light">
            Track your link performance
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleFetch} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-widest font-sans">
            Short Code or Full URL
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="abc123 or https://minturl.onrender.com/abc123"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-300
                       text-sm font-sans focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400
                       transition-all duration-200 hover:border-slate-300 font-mono"
          />
        </div>

        <div className="space-y-1.5" aria-hidden="true">
          <div className="text-xs opacity-0 select-none pointer-events-none">
            Placeholder
          </div>
          <div className="w-full px-4 py-3 rounded-xl h-[46px]" />
        </div>

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-sans font-medium text-sm
                     shadow-sm hover:shadow-md transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Fetching...
            </>
          ) : (
            <>
              <SearchIcon />
              Fetch Stats
            </>
          )}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-100 animate-slide-down">
          <p className="text-sm text-red-600 font-sans">{error}</p>
        </div>
      )}

      {/* Stats Result */}
      {stats && (
        <div className="mt-5 animate-slide-down">
          <div className="rounded-xl border border-slate-100 overflow-hidden">
            {/* Stats header */}
            <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-blue-50/40 border-b border-slate-100 flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-widest font-sans">
                Link Report
              </p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 border border-green-100 text-xs font-medium text-green-600 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-soft inline-block"></span>
                Active
              </span>
            </div>

            {/* Stats rows */}
            <div className="px-4">
              <StatRow
                icon={<MousePointerIcon />}
                label="Total Clicks"
                value={stats.clickCount?.toLocaleString() ?? "0"}
                highlight
              />
              <StatRow
                icon={
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                }
                label="Original URL"
                value={stats.originalUrl}
                isLink
              />
              <StatRow
                icon={
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                }
                label="Short Code"
                value={stats.shortCode}
                isCode
              />
              <StatRow
                icon={<ClockIcon />}
                label="Created At"
                value={formatDate(stats.createdAt)}
              />
              <StatRow
                icon={
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                  </svg>
                }
                label="Expires At"
                value={stats.expiryAt ? formatDate(stats.expiryAt) : "Never"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
