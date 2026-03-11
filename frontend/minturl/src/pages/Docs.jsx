const Section = ({ id, title, children }) => (
  <section id={id} className="mb-12 scroll-mt-24">
    <h2 className="font-display text-2xl font-700 text-slate-900 mb-4">{title}</h2>
    {children}
  </section>
);

const CodeBlock = ({ children, lang = 'bash' }) => (
  <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm my-4">
    <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
      <span className="text-xs font-mono text-slate-400">{lang}</span>
    </div>
    <pre className="bg-slate-900 text-slate-100 text-sm font-mono p-4 overflow-x-auto leading-relaxed">
      <code>{children}</code>
    </pre>
  </div>
);

const Step = ({ number, title, children }) => (
  <div className="flex gap-4 mb-6">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white font-display font-700 text-sm flex items-center justify-center">
      {number}
    </div>
    <div className="flex-1 pt-1">
      <h3 className="font-sans font-600 text-slate-800 mb-1">{title}</h3>
      <div className="text-sm text-slate-500 font-sans leading-relaxed">{children}</div>
    </div>
  </div>
);

const TOCLink = ({ href, label }) => (
  <a
    href={href}
    className="block text-sm text-slate-500 hover:text-blue-600 font-sans py-1 border-l-2 border-transparent hover:border-blue-400 pl-3 transition-all duration-150"
  >
    {label}
  </a>
);

export default function Docs() {
  return (
    <main className="min-h-[calc(100vh-72px)] px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="mb-12 opacity-0-init animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600 font-sans mb-4">
            Documentation
          </div>
          <h1 className="font-display text-4xl font-800 text-slate-900 mb-3">Getting Started</h1>
          <p className="text-base text-slate-400 font-sans font-light max-w-xl leading-relaxed">
            Everything you need to set up and use MintURL — from installation to your first shortened link.
          </p>
        </div>

        <div className="flex gap-10">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div
              className="sticky top-24 opacity-0-init animate-fade-up"
              style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
            >
              <p className="text-xs font-medium text-slate-400 uppercase tracking-widest font-sans mb-3">On this page</p>
              <nav className="space-y-0.5">
                <TOCLink href="#overview" label="Overview" />
                <TOCLink href="#installation" label="Installation" />
                <TOCLink href="#usage" label="Basic Usage" />
                <TOCLink href="#expiry" label="Link Expiry" />
                <TOCLink href="#analytics" label="Analytics" />
                <TOCLink href="#faq" label="FAQ" />
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <div
            className="flex-1 min-w-0 opacity-0-init animate-fade-up"
            style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
          >
            <Section id="overview" title="Overview">
              <div className="prose-slate text-slate-600 font-sans text-sm leading-7 space-y-3">
                <p>
                  <strong className="text-slate-800">MintURL</strong> is a lightweight, self-hosted URL shortener with a clean REST API. It lets you create compact links, set expiry windows, and track click-through analytics — all from a single backend service running on <code className="font-mono text-blue-600 bg-blue-50 px-1 py-0.5 rounded text-xs">https://minturl.onrender.com</code>.
                </p>
                <p>
                  This frontend is a React + Vite application that communicates with that backend. No external services, no third-party trackers — just clean, fast redirects.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: '⚡', label: 'Fast Redirects', desc: 'Sub-millisecond redirect resolution' },
                  { icon: '📊', label: 'Click Analytics', desc: 'Track usage per short link' },
                  { icon: '⏳', label: 'Link Expiry', desc: 'Set TTL in days per link' },
                ].map((f) => (
                  <div key={f.label} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xl mb-1.5">{f.icon}</div>
                    <p className="text-sm font-medium text-slate-800 font-sans">{f.label}</p>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">{f.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="installation" title="Installation">
              <div className="text-sm text-slate-600 font-sans leading-7 mb-4">
                Clone the repository and install dependencies using npm:
              </div>
              <Step number="1" title="Clone the repo">
                <CodeBlock lang="bash">{`git clone https://github.com/your-org/minturl.git
cd minturl`}</CodeBlock>
              </Step>
              <Step number="2" title="Install frontend dependencies">
                <CodeBlock lang="bash">{`npm install`}</CodeBlock>
              </Step>
              <Step number="3" title="Start the dev server">
                Make sure your backend is running on port 8080, then:
                <CodeBlock lang="bash">{`npm run dev`}</CodeBlock>
                The app will be available at <code className="font-mono text-blue-600 bg-blue-50 px-1 py-0.5 rounded text-xs">http://localhost:5173</code>
              </Step>
              <Step number="4" title="Build for production">
                <CodeBlock lang="bash">{`npm run build
npm run preview`}</CodeBlock>
              </Step>
            </Section>

            <Section id="usage" title="Basic Usage">
              <div className="text-sm text-slate-600 font-sans leading-7 space-y-3 mb-4">
                <p>To shorten a URL, paste the destination link into the <strong className="text-slate-800">Shorten URL</strong> card and click the button. The generated short link will appear below — click it to test the redirect, or use the copy button.</p>
              </div>
              <div className="rounded-xl border border-slate-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-widest font-sans">Example Flow</p>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { step: 'Input', value: 'https://very-long-domain.com/with/a/deeply/nested/path?query=param' },
                    { step: 'Output', value: 'https://minturl.onrender.com/abc123' },
                    { step: 'Redirect', value: 'Clicking the short link opens the original URL' },
                  ].map((row) => (
                    <div key={row.step} className="flex items-start gap-3 text-sm">
                      <span className="w-16 flex-shrink-0 text-xs font-medium text-slate-400 uppercase tracking-widest font-sans pt-0.5">{row.step}</span>
                      <span className="font-mono text-slate-700 text-xs bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 leading-relaxed">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section id="expiry" title="Link Expiry">
              <div className="text-sm text-slate-600 font-sans leading-7 space-y-3">
                <p>
                  The <strong className="text-slate-800">Expiry Days</strong> field is optional. When left blank, your link lives forever. When set, the link will stop redirecting after the specified number of days from creation.
                </p>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-3">
                  <span className="text-amber-500 text-base flex-shrink-0">⚠️</span>
                  <p className="text-sm text-amber-700 font-sans">
                    Visiting an expired link returns an error. The short code is not reusable after expiry — create a new one if needed.
                  </p>
                </div>
              </div>
            </Section>

            <Section id="analytics" title="Analytics">
              <div className="text-sm text-slate-600 font-sans leading-7 space-y-3">
                <p>
                  Use the <strong className="text-slate-800">Analytics</strong> card to look up stats for any short code. You can enter either the short code alone (e.g. <code className="font-mono text-blue-600 bg-blue-50 px-1 py-0.5 rounded text-xs">abc123</code>) or the full short URL — the app will extract the code automatically.
                </p>
                <p>Stats include the original URL, total click count, creation date, and expiry date.</p>
              </div>
            </Section>

            <Section id="faq" title="FAQ">
              <div className="space-y-4">
                {[
                  {
                    q: 'Can I use a custom short code?',
                    a: 'Not yet — short codes are auto-generated by the backend. Custom aliases may be added in a future release.',
                  },
                  {
                    q: 'What happens when a link expires?',
                    a: 'The backend returns a 404 or error response. The frontend Analytics card will reflect this when you look up an expired code.',
                  },
                  {
                    q: 'Is the backend included in this repo?',
                    a: 'No — this repo contains only the React frontend. Point it at any MintURL-compatible backend by updating the baseURL in src/api/api.js.',
                  },
                  {
                    q: 'How do I change the backend URL?',
                    a: 'Edit the baseURL value in src/api/api.js from https://minturl.onrender.com/api to your backend\'s address.',
                  },
                ].map((item) => (
                  <details key={item.q} className="group rounded-xl border border-slate-100 overflow-hidden">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors font-sans text-sm font-medium text-slate-700 list-none">
                      {item.q}
                      <svg className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0 ml-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </summary>
                    <div className="px-5 py-4 text-sm text-slate-500 font-sans leading-relaxed border-t border-slate-100">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}
