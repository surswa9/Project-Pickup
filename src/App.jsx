import React, { useState } from 'react';
import {
  Menu, X, Mail, ChevronRight,
  Camera, Zap, Coffee
} from 'lucide-react';

// --- Logo ---
const Logo = ({ className = "w-12 h-12" }) => (
  <div className={`${className} relative select-none group`}>
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <circle cx="50" cy="50" r="42" stroke="#FF6B00" strokeWidth="6" />
      <path
        d="M45 40H55C58 40 60 42 60 45C60 48 58 50 55 50H45V60"
        stroke="white"
        strokeWidth="4"
      />
    </svg>
  </div>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLeague, setActiveLeague] = useState('elite');

  const eliteStandings = [
    { rank: 1, team: "Charles River Crossovers", w: 14, d: 2, l: 2, pts: 44 },
    { rank: 2, team: "Back Bay Ballers", w: 13, d: 3, l: 2, pts: 42 },
    { rank: 3, team: "Cambridge Classics", w: 11, d: 4, l: 3, pts: 37 },
    { rank: 4, team: "Seaport Swish", w: 10, d: 2, l: 6, pts: 32 },
    { rank: 5, team: "Mass Ave Mambas", w: 9, d: 4, l: 5, pts: 31 },
    { rank: 6, team: "Fenway Flyers", w: 8, d: 2, l: 8, pts: 26 },
    { rank: 7, team: "Beacon Hill Bruins", w: 7, d: 3, l: 8, pts: 24 },
    { rank: 8, team: "Southie Snipers", w: 5, d: 5, l: 8, pts: 20 },
  ];

  const socialStandings = [
    { rank: 1, team: "Public Garden Pigeons", w: 12, d: 4, l: 2, pts: 40 },
    { rank: 2, team: "Esplanade Easy-Buckets", w: 11, d: 5, l: 2, pts: 38 },
    { rank: 3, team: "T-Stop Travelers", w: 10, d: 4, l: 4, pts: 34 },
    { rank: 4, team: "Duck Boat Droppers", w: 9, d: 3, l: 6, pts: 30 },
    { rank: 5, team: "Prudential Put-Backs", w: 8, d: 6, l: 4, pts: 30 },
    { rank: 6, team: "Common Courts", w: 7, d: 4, l: 7, pts: 25 },
    { rank: 7, team: "Coolidge Corner Crew", w: 6, d: 5, l: 7, pts: 23 },
    { rank: 8, team: "Harbor Hoopsters", w: 5, d: 2, l: 11, pts: 17 },
  ];

  const currentStandings =
    activeLeague === 'elite' ? eliteStandings : socialStandings;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center text-center pt-20">
        <div>
          <Logo className="w-40 h-40 mx-auto mb-8" />
          <h1 className="text-5xl font-black italic">
            CHASE THE <span className="text-orange-500">POINTS</span>
          </h1>

          <div className="mt-8 flex gap-4 justify-center">
            <a href="#standings" className="bg-white text-black px-6 py-3 font-bold">
              Standings
            </a>
            <a href="#join" className="bg-orange-500 text-black px-6 py-3 font-bold">
              Apply
            </a>
          </div>
        </div>
      </section>

      {/* STANDINGS */}
      <section id="standings" className="py-24 px-6 max-w-6xl mx-auto">

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveLeague('elite')}
            className={`px-4 py-2 ${activeLeague === 'elite' ? 'bg-orange-500 text-black' : 'bg-white/10'}`}
          >
            Elite
          </button>

          <button
            onClick={() => setActiveLeague('social')}
            className={`px-4 py-2 ${activeLeague === 'social' ? 'bg-orange-500 text-black' : 'bg-white/10'}`}
          >
            Social
          </button>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400">
              <th>Rank</th>
              <th>Team</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>Pts</th>
            </tr>
          </thead>

          <tbody>
            {currentStandings.map((t) => (
              <tr key={t.rank} className="border-t border-white/10">
                <td>{t.rank}</td>
                <td>{t.team}</td>
                <td>{t.w}</td>
                <td>{t.d}</td>
                <td>{t.l}</td>
                <td className="text-orange-500 font-bold">{t.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* LIVE RULES (FIXED LOCATION) */}
        <div className="mt-10 bg-white/5 p-6 rounded-xl">
          <h3 className="font-bold mb-2">Live Rules</h3>
          <p className="text-gray-400 text-sm">
            Win = 3 pts, Draw = 1 pt, Loss = 0 pts
          </p>
        </div>

      </section>

      {/* JOIN */}
      <section id="join" className="py-24 text-center">
        <h2 className="text-4xl font-black">Join the League</h2>

        <a
          href="https://tally.so/r/7RaJMR"
          className="inline-block mt-8 bg-orange-500 text-black px-8 py-4 font-black"
        >
          Apply Now
        </a>
      </section>

    </div>
  );
};

export default App;
