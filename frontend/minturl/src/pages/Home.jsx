import ShortenForm from '../components/ShortenForm';
import StatsCard from '../components/StatsCard';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-72px)] px-4 py-14">
      {/* Hero Section */}
      <div
        className="text-center mb-14 opacity-0-init animate-fade-up"
        style={{ animationFillMode: 'forwards' }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600 font-sans mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse-soft inline-block"></span>
          Fast & Reliable URL Shortener
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-800 text-slate-900 mb-4 leading-tight">
          Make every link
          <span className="text-blue-600"> count.</span>
        </h1>
        <p className="text-base text-slate-400 font-sans font-light max-w-md mx-auto leading-relaxed">
          Shorten, share, and track your links with precision. Built for speed, designed for clarity.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <ShortenForm />
        <StatsCard />
      </div>

      {/* Footer note */}
      <p
        className="text-center text-xs text-blue-600 mt-12 font-sans opacity-0-init animate-fade-up"
        style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
      >
        Made with ❤️ by <span className="font-mono text-blue-600">Tanmay Khilari</span>
      </p>
    </main>
  );
}
