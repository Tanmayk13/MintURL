import { useState } from 'react';
import Home from './pages/Home';
import Docs from './pages/Docs';
import ApiReference from './pages/ApiReference';

const MintLogo = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="9" fill="#2563eb"/>
    <path d="M8 22V12l5.5 7 5.5-7v10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12v10" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="24" cy="12" r="1.5" fill="white"/>
  </svg>
);

const PAGES = { home: Home, docs: Docs, api: ApiReference };

function Navbar({ activePage, setPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLink = (page, label) => (
    <button
      onClick={() => { setPage(page); setMobileOpen(false); window.scrollTo(0, 0); }}
      className={`text-sm font-sans font-medium transition-colors duration-150
        ${activePage === page
          ? 'text-blue-600'
          : 'text-slate-500 hover:text-slate-800'
        }`}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => { setPage('home'); window.scrollTo(0, 0); }}
          className="flex items-center gap-2.5 group"
        >
          <MintLogo />
          <span className="font-display text-xl font-700 text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
            Mint<span className="text-blue-600">URL</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLink('docs', 'Docs')}
          {navLink('api', 'API')}
          <button
            onClick={() => { setPage('home'); window.scrollTo(0, 0); }}
            className="text-sm px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-sans font-medium
                       shadow-btn hover:shadow-btn-hover transition-all duration-200 active:scale-[0.97]"
          >
            Get Started
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors"
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1 animate-slide-down">
          {[['home', 'Home'], ['docs', 'Docs'], ['api', 'API Reference']].map(([page, label]) => (
            <button
              key={page}
              onClick={() => { setPage(page); setMobileOpen(false); window.scrollTo(0, 0); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-sans font-medium transition-colors
                ${activePage === page
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const PageComponent = PAGES[page] || Home;

  return (
    <div className="min-h-screen">
      <Navbar activePage={page} setPage={setPage} />
      <PageComponent />
    </div>
  );
}
