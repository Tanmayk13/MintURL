import { useState } from 'react';

const Badge = ({ children, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    slate: 'bg-slate-100 text-slate-600 border-slate-200',
    amber: 'bg-amber-100 text-amber-700 border-amber-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-mono font-medium ${colors[color]}`}>
      {children}
    </span>
  );
};

const MethodBadge = ({ method }) => {
  const colors = {
    POST: 'bg-blue-600 text-white',
    GET: 'bg-green-600 text-white',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-700 ${colors[method]}`}>
      {method}
    </span>
  );
};

const CodeBlock = ({ children, lang = 'json' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm my-3">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-xs font-mono text-slate-400">{lang}</span>
        <button
          onClick={handleCopy}
          className="text-xs font-sans text-slate-400 hover:text-white transition-colors px-2 py-0.5 rounded"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="bg-slate-900 text-slate-100 text-sm font-mono p-4 overflow-x-auto leading-relaxed">
        <code>{children.trim()}</code>
      </pre>
    </div>
  );
};

const ParamRow = ({ name, type, required, description }) => (
  <tr className="border-b border-slate-100 last:border-0">
    <td className="py-3 pr-4">
      <div className="flex items-center gap-2">
        <code className="font-mono text-xs text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">{name}</code>
        {required && <span className="text-xs text-red-500 font-sans">required</span>}
      </div>
    </td>
    <td className="py-3 pr-4">
      <Badge color="slate">{type}</Badge>
    </td>
    <td className="py-3 text-sm text-slate-500 font-sans leading-relaxed">{description}</td>
  </tr>
);

const EndpointCard = ({ id, method, path, title, description, params, requestExample, responseExample, notes }) => (
  <div
    id={id}
    className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden mb-6 scroll-mt-24
               hover:shadow-card-hover transition-all duration-300"
  >
    {/* Header */}
    <div className="px-6 py-5 border-b border-slate-100 flex flex-wrap items-center gap-3">
      <MethodBadge method={method} />
      <code className="font-mono text-sm text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 flex-1">
        {path}
      </code>
    </div>

    <div className="px-6 py-5 space-y-5">
      {/* Title & description */}
      <div>
        <h3 className="font-display text-lg font-700 text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-500 font-sans leading-relaxed">{description}</p>
      </div>

      {/* Parameters */}
      {params && (
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest font-sans mb-3">Parameters</p>
          <div className="rounded-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-widest font-sans">Name</th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-widest font-sans">Type</th>
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500 uppercase tracking-widest font-sans">Description</th>
                </tr>
              </thead>
              <tbody className="px-4 divide-y divide-slate-100">
                {params.map((p) => (
                  <tr key={p.name} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <code className="font-mono text-xs text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">{p.name}</code>
                        {p.required && <span className="text-xs text-red-500 font-sans font-medium">required</span>}
                      </div>
                    </td>
                    <td className="py-3 px-4"><Badge color="slate">{p.type}</Badge></td>
                    <td className="py-3 px-4 text-sm text-slate-500 font-sans leading-relaxed">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Request Example */}
      {requestExample && (
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest font-sans mb-1">Request Body</p>
          <CodeBlock lang="json">{requestExample}</CodeBlock>
        </div>
      )}

      {/* Response Example */}
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-widest font-sans mb-1">Response</p>
        <CodeBlock lang="json">{responseExample}</CodeBlock>
      </div>

      {/* Notes */}
      {notes && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex gap-3">
          <span className="text-blue-400 flex-shrink-0 mt-0.5">ℹ️</span>
          <p className="text-sm text-blue-700 font-sans leading-relaxed">{notes}</p>
        </div>
      )}
    </div>
  </div>
);

const TOCLink = ({ href, method, label }) => (
  <a
    href={href}
    className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 font-sans py-1.5 border-l-2 border-transparent hover:border-blue-400 pl-3 transition-all duration-150"
  >
    <span className={`text-xs font-mono font-700 px-1.5 py-0.5 rounded ${method === 'POST' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
      {method}
    </span>
    {label}
  </a>
);

export default function ApiReference() {
  return (
    <main className="min-h-[calc(100vh-72px)] px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="mb-12 opacity-0-init animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600 font-sans mb-4">
            API Reference
          </div>
          <h1 className="font-display text-4xl font-800 text-slate-900 mb-3">REST API</h1>
          <p className="text-base text-slate-400 font-sans font-light max-w-xl leading-relaxed">
            Full reference for all MintURL API endpoints. Base URL:{' '}
            <code className="font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-sm">https://minturl.onrender.com/api</code>
          </p>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-2 mt-5">
            <Badge color="slate">REST</Badge>
            <Badge color="slate">JSON</Badge>
            <Badge color="green">v1.0</Badge>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div
              className="sticky top-24 opacity-0-init animate-fade-up"
              style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
            >
              <p className="text-xs font-medium text-slate-400 uppercase tracking-widest font-sans mb-3">Endpoints</p>
              <nav className="space-y-0.5">
                <TOCLink href="#shorten" method="POST" label="Shorten URL" />
                <TOCLink href="#stats" method="GET" label="Get Stats" />
                <TOCLink href="#redirect" method="GET" label="Redirect" />
              </nav>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest font-sans mb-3">Reference</p>
                <nav className="space-y-0.5">
                  <a href="#errors" className="block text-sm text-slate-500 hover:text-blue-600 font-sans py-1 border-l-2 border-transparent hover:border-blue-400 pl-3 transition-all duration-150">Error Codes</a>
                  <a href="#auth" className="block text-sm text-slate-500 hover:text-blue-600 font-sans py-1 border-l-2 border-transparent hover:border-blue-400 pl-3 transition-all duration-150">Authentication</a>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div
            className="flex-1 min-w-0 opacity-0-init animate-fade-up"
            style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
          >
            <EndpointCard
              id="shorten"
              method="POST"
              path="/api/shorten"
              title="Create Short URL"
              description="Accepts a long URL and an optional expiry window. Returns a shortened URL using a randomly generated short code."
              params={[
                { name: 'url', type: 'string', required: true, description: 'The destination URL to shorten. Must be a valid URL including protocol (https://).' },
                { name: 'expiryDays', type: 'number', required: false, description: 'Number of days until the link expires. Omit for a permanent link.' },
              ]}
              requestExample={`{
  "url": "https://example.com/very/long/path?with=params",
  "expiryDays": 7
}`}
              responseExample={`{
  "shortUrl": "https://minturl.onrender.com/abc123"
}`}
              notes="The short code is auto-generated. The shortUrl field contains the full redirect URL ready to share."
            />

            <EndpointCard
              id="stats"
              method="GET"
              path="/api/stats/{shortCode}"
              title="Get URL Analytics"
              description="Fetches usage statistics for a given short code, including the original URL, click count, creation timestamp, and optional expiry."
              params={[
                { name: 'shortCode', type: 'string', required: true, description: 'The short code identifier (e.g. abc123). Passed as a path parameter.' },
              ]}
              responseExample={`{
  "shortCode": "abc123",
  "originalUrl": "https://example.com/very/long/path",
  "clickCount": 25,
  "createdAt": "2026-03-11T10:30:00",
  "expiryAt": "2026-03-18T10:30:00"
}`}
              notes="expiryAt will be null if no expiry was set. clickCount increments on every redirect, not on stats lookups."
            />

            <EndpointCard
              id="redirect"
              method="GET"
              path="/{shortCode}"
              title="Redirect to Original URL"
              description="Resolves the short code and issues an HTTP redirect to the original URL. This is the public-facing endpoint users interact with."
              params={[
                { name: 'shortCode', type: 'string', required: true, description: 'The short code from the generated short URL (e.g. abc123).' },
              ]}
              responseExample={`HTTP/1.1 302 Found
Location: https://example.com/very/long/path

// If expired or not found:
HTTP/1.1 404 Not Found`}
              notes="Each successful redirect increments the clickCount for that short code. Expired links return a 404."
            />

            {/* Error Codes */}
            <div id="errors" className="scroll-mt-24 mb-6">
              <h2 className="font-display text-2xl font-700 text-slate-900 mb-5">Error Codes</h2>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-widest font-sans">Status</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-widest font-sans">Meaning</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-widest font-sans">When it happens</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { status: '200 OK', color: 'green', meaning: 'Success', when: 'Request completed successfully' },
                      { status: '302 Found', color: 'blue', meaning: 'Redirect', when: 'Short code resolved, redirecting to original URL' },
                      { status: '400 Bad Request', color: 'amber', meaning: 'Invalid input', when: 'Missing or malformed url field in request body' },
                      { status: '404 Not Found', color: 'amber', meaning: 'Not found', when: 'Short code doesn\'t exist or link has expired' },
                      { status: '500 Server Error', color: 'amber', meaning: 'Server error', when: 'Unexpected backend failure' },
                    ].map((row) => (
                      <tr key={row.status} className="border-b border-slate-100 last:border-0">
                        <td className="py-3.5 px-5"><Badge color={row.color}>{row.status}</Badge></td>
                        <td className="py-3.5 px-5 text-slate-700 font-sans font-medium text-sm">{row.meaning}</td>
                        <td className="py-3.5 px-5 text-slate-500 font-sans text-sm">{row.when}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Auth */}
            <div id="auth" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-700 text-slate-900 mb-4">Authentication</h2>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
                <div className="flex gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                  <span className="text-slate-400 flex-shrink-0">🔓</span>
                  <p className="text-sm text-slate-600 font-sans leading-relaxed">
                    The current version of MintURL does not require authentication. All endpoints are publicly accessible when running locally.
                  </p>
                </div>
                <p className="text-sm text-slate-500 font-sans leading-relaxed">
                  If you plan to deploy MintURL to a public server, it is strongly recommended to add an API key or OAuth layer in front of the <code className="font-mono text-blue-600 bg-blue-50 px-1 py-0.5 rounded text-xs">POST /api/shorten</code> endpoint to prevent abuse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
