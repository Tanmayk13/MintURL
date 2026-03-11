import { useState } from 'react';
import { shortenUrl } from '../api/api';

const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);

export default function ShortenForm() {
  const [url, setUrl] = useState('');
  const [expiryDays, setExpiryDays] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const data = await shortenUrl(url.trim(), expiryDays || null);
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to shorten URL. Please check your input and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = shortUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const extractShortCode = (url) => {
    try {
      return new URL(url).pathname.replace('/', '');
    } catch {
      return url;
    }
  };

  return (
    <div
      className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-100 opacity-0-init animate-fade-up"
      style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-7">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-btn">
          <LinkIcon />
        </div>
        <div>
          <h2 className="font-display text-lg font-700 text-slate-900 leading-tight">Shorten URL</h2>
          <p className="text-sm text-slate-400 font-sans font-light">Generate a compact, shareable link</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* URL Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-widest font-sans">
            Destination URL
          </label>
          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-long-url.com/goes/here"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-300
                         text-sm font-sans focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400
                         transition-all duration-200 hover:border-slate-300"
            />
          </div>
        </div>

        {/* Expiry Days Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-widest font-sans flex items-center gap-1.5">
            <CalendarIcon />
            Expiry Days
            <span className="normal-case tracking-normal font-light text-slate-400 ml-0.5">(optional)</span>
          </label>
          <input
            type="number"
            value={expiryDays}
            onChange={(e) => setExpiryDays(e.target.value)}
            placeholder="e.g. 7"
            min="1"
            max="365"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-300
                       text-sm font-sans focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400
                       transition-all duration-200 hover:border-slate-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-sans font-medium text-sm
                     shadow-btn hover:shadow-btn-hover transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                     active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Shortening...
            </>
          ) : (
            <>
              <LinkIcon />
              Shorten URL
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

      {/* Result */}
      {shortUrl && (
        <div className="mt-5 animate-slide-down">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-2.5 font-sans">
              Your Short Link
            </p>
            <div className="flex items-center gap-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 font-mono text-sm text-blue-700 font-medium truncate hover:text-blue-800
                           flex items-center gap-1.5 group transition-colors duration-150"
              >
                <span className="truncate">{shortUrl}</span>
                <span className="opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <ExternalLinkIcon />
                </span>
              </a>
              <button
                onClick={handleCopy}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium font-sans
                           transition-all duration-200 border
                           ${copied
                             ? 'bg-green-50 border-green-200 text-green-600'
                             : 'bg-white border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                           }`}
              >
                {copied ? <><CheckIcon /> Copied!</> : <><CopyIcon /> Copy</>}
              </button>
            </div>
            <p className="text-xs text-blue-400 mt-2 font-sans">
              Short code: <span className="font-mono font-medium text-blue-600">{extractShortCode(shortUrl)}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
