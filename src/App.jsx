import React, { useState, useEffect } from 'react';
import {
  Trophy, Users, Calendar, Clock, Info,
  Menu, X, Mail, ChevronRight,
  Camera, Zap, Coffee, AlertCircle
} from 'lucide-react';

// --- Utility: Fuzzy Matching (Levenshtein Distance) ---
const getLevenshteinDistance = (a, b) => {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
  }
  return matrix[b.length][a.length];
};

const Logo = ({ className = "w-12 h-12" }) => (
  <div className={`${className} relative select-none group`}>
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-[0_0_15px_rgba(255,107,0,0.3)] overflow-visible"
    >
      {/* Background Accent Glow */}
      <circle cx="50" cy="50" r="45" fill="#FF6B00" fillOpacity="0.05" />
      
      {/* Main Basketball Shape */}
      <circle 
        cx="50" 
        cy="50" 
        r="42" 
        stroke="#FF6B00" 
        strokeWidth="6" 
        className="transition-all duration-500 group-hover:stroke-white"
      />
      
      {/* Dynamic Seam Lines (Geometric/Modern Style) */}
      <g stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" className="transition-all duration-500 group-hover:stroke-white">
        {/* Horizontal curve */}
        <path d="M12 50C12 50 35 35 50 35C65 35 88 50 88 50" />
        <path d="M12 55C12 55 35 70 50 70C65 70 88 55 88 55" />
        
        {/* Vertical curve */}
        <path d="M50 8V92" strokeWidth="6" />
        
        {/* Side Accents for "Motion" */}
        <path d="M25 20C35 25 35 75 25 80" opacity="0.6" />
        <path d="M75 20C65 25 65 75 75 80" opacity="0.6" />
      </g>

      {/* The "P" (Project) Monogram integrated into the ball */}
      <path 
        d="M45 40H55C58 40 60 42 60 45C60 48 58 50 55 50H45V60" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinecap="square"
        className="drop-shadow-sm"
      />
    </svg>
  </div>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLeague, setActiveLeague] = useState('elite');
  
  // Registration Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    league: '',
    teamName: '',
    experience: ''
  });
  const [error, setError] = useState('');

  // Initializing with current standings teams
  const [eliteTeams, setEliteTeams] = useState([
  "Charles River Crossovers",
  "Back Bay Ballers",
  "Cambridge Classics",
  "Seaport Swish",
  "Mass Ave Mambas",
  "Fenway Flyers",
  "Beacon Hill Bruins",
  "Southie Snipers"
]);
  const [socialTeams, setSocialTeams] = useState([
  "Public Garden Pigeons",
  "Esplanade Easy-Buckets",
  "T-Stop Travelers",
  "Duck Boat Droppers",
  "Prudential Put-Backs",
  "Common Courts",
  "Coolidge Corner Crew",
  "Harbor Hoopsters"
]);

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

  const handleApply = (e) => {
  e.preventDefault();
  window.open("https://tally.so/r/7RaJMR", "_blank");
};

  const currentStandings = activeLeague === 'elite' ? eliteStandings : socialStandings;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-600">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="w-12 h-12 md:w-14 md:h-14" />
            <div className="hidden sm:block font-black italic text-xl uppercase tracking-tighter leading-none">
              Project <span className="text-orange-500">Pickup</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Format', 'Standings', 'Info'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">
                {item}
              </a>
            ))}
            <a href="#join" className="bg-orange-500 hover:bg-white text-black px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
              Register Now
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=2022&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        
        <div className="relative z-20 text-center px-6 max-w-5xl">
          <div className="flex justify-center mb-8">
            <Logo className="w-48 h-48 md:w-64 md:h-64 animate-float" />
          </div>
          <h1 className="text-6xl md:text-[140px] font-black italic uppercase tracking-tighter leading-[0.8] mb-8">
            CHASE THE<br/><span className="text-orange-500 underline decoration-8 decoration-white/10">POINTS.</span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-12 font-medium italic">
            High-stakes competition or high-quality social pickup basketball. <br className="hidden md:block" />Two leagues. One court. Boston’s best.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#standings" className="group px-12 py-6 bg-white text-black font-black uppercase text-sm tracking-[0.2em] skew-x-[-10deg] hover:bg-orange-500 hover:text-white transition-all shadow-2xl flex items-center justify-center">
              League Tables <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#join" className="px-12 py-6 bg-orange-500 text-black font-black uppercase text-sm tracking-[0.2em] skew-x-[-10deg] hover:bg-white transition-all shadow-2xl">
              Apply to Play
            </a>
          </div>
        </div>
      </section>

      {/* League Selection Info */}
      <section id="format" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 text-white">Find Your <span className="text-orange-500">Tier</span></h2>
          <div className="h-2 w-32 bg-orange-500 skew-x-[-20deg] mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-neutral-900/80 p-12 rounded-[40px] border-2 border-orange-500/20 relative overflow-hidden group hover:border-orange-500 transition-all">
            <Zap className="absolute right-8 top-8 w-16 h-16 text-orange-500/20 group-hover:text-orange-500/40 transition-all" />
            <h3 className="text-4xl font-black italic uppercase mb-4 text-orange-500">Elite League</h3>
            <p className="text-xl text-gray-400 mb-6 font-bold uppercase tracking-widest">The Competitive Grind</p>
            <p className="text-gray-300 leading-relaxed mb-8">For the former varsity players and serious hoopers. Full intensity, high-speed play, and zero margin for error. 10 teams fighting for the top of the table.</p>
            <div className="flex items-center gap-4 text-sm font-black uppercase">
                <span className="bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full">High Intensity</span>
                <span className="bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full">Advanced Skills</span>
            </div>
          </div>

          <div className="bg-neutral-900/80 p-12 rounded-[40px] border-2 border-blue-500/20 relative overflow-hidden group hover:border-blue-500 transition-all">
            <Coffee className="absolute right-8 top-8 w-16 h-16 text-blue-500/20 group-hover:text-blue-500/40 transition-all" />
            <h3 className="text-4xl font-black italic uppercase mb-4 text-blue-400">Social League</h3>
            <p className="text-xl text-gray-400 mb-6 font-bold uppercase tracking-widest">The Recreation Tier</p>
            <p className="text-gray-300 leading-relaxed mb-8">For the social players. Focus on community, great vibes, and good cardio. Still competitive, but with a lighter atmosphere.</p>
            <div className="flex items-center gap-4 text-sm font-black uppercase">
                <span className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full">Social Vibes</span>
                <span className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full">All Skill Levels</span>
            </div>
          </div>
        </div>
      </section>

      {/* Standings Section */}
      <section id="standings" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-end gap-3 flex-wrap">
  <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
    The <span className="text-orange-500">Table</span>
  </h2>

  <span className="text-xs md:text-sm text-gray-500 italic mb-2">
    (illustrative only)
  </span>
</div>
            
            {/* League Toggle */}
            <div className="flex gap-4 mt-8">
                <button 
                    onClick={() => setActiveLeague('elite')}
                    className={`px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest transition-all skew-x-[-10deg] ${activeLeague === 'elite' ? 'bg-orange-500 text-black' : 'bg-neutral-900 text-gray-500 border border-white/5'}`}
                >
                    Elite League
                </button>
                <button 
                    onClick={() => setActiveLeague('social')}
                    className={`px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest transition-all skew-x-[-10deg] ${activeLeague === 'social' ? 'bg-blue-500 text-black' : 'bg-neutral-900 text-gray-500 border border-white/5'}`}
                >
                    Social League
                </button>
            </div>
          </div>
          <div className="bg-neutral-900 border border-white/5 px-8 py-6 rounded-3xl flex gap-10">
            <div className="text-center">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Win (Sweep)</p>
              <p className="text-xl font-black italic">3 PTS</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Draw (Split)</p>
              <p className="text-xl font-black italic">1 PT</p>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900/40 border border-white/10 rounded-[50px] overflow-hidden backdrop-blur-3xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase text-gray-500 font-black tracking-[0.3em] border-b border-white/10 bg-white/5">
                  <th className="px-10 py-8">Pos</th>
                  <th className="px-10 py-8">Franchise</th>
                  <th className="px-10 py-8 text-center">Sweep</th>
                  <th className="px-10 py-8 text-center">Split</th>
                  <th className="px-10 py-8 text-center">Loss</th>
                  <th className="px-10 py-8 text-right">Points</th>
                </tr>
              </thead>
              <tbody className="font-black italic text-xl uppercase tracking-tighter">
                {currentStandings.map((s) => (
                  <tr key={s.rank} className="border-b border-white/5 hover:bg-orange-500/5 transition-colors">
                    <td className="px-10 py-8 text-gray-600">{s.rank}</td>
                    <td className="px-10 py-8">{s.team}</td>
                    <td className="px-10 py-8 text-center text-gray-400">{s.w}</td>
                    <td className="px-10 py-8 text-center text-gray-400">{s.d}</td>
                    <td className="px-10 py-8 text-center text-gray-400">{s.l}</td>
                    <td className="px-10 py-8 text-right text-orange-500 text-4xl">{s.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
{/* Info Section */}
<section id="info" className="py-32 px-6 max-w-5xl mx-auto">
  <div className="text-center mb-16">
    <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
      League <span className="text-orange-500">Info</span>
    </h2>
    <div className="h-2 w-32 bg-orange-500 skew-x-[-20deg] mx-auto mt-6"></div>
  </div>

  <div className="bg-neutral-900/60 border border-white/10 rounded-[40px] p-10 md:p-14 space-y-10 text-gray-300 leading-relaxed">
    
    <div>
      <h3 className="text-xl font-black uppercase text-white mb-2">
        How the Point System Works
      </h3>
      <p>
        Every game in Project Pickup contributes to your team’s standing. Each team has two games per week (14 total weeks, 28 total games) that count towards your point total.
        Win both games, that's a sweep. Win one, that's a split. Win none... I think you know the rest.
        Results are tracked using a simple points system that rewards winning consistently.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black uppercase text-white mb-2">
        Scoring Rules
      </h3>
      <ul className="space-y-2 font-bold">
        <li>🏆 Win (Sweep) = 3 Points</li>
        <li>🤝 Draw (Split) = 1 Point</li>
        <li>❌ Loss = 0 Points</li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-black uppercase text-white mb-2">
        Standings
      </h3>
      <p>
        Teams are ranked by total points. If tied, head-to-head results and point differential may be used as tiebreakers.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-black uppercase text-white mb-2">
        Season Format
      </h3>
      <p>
        Each team plays a fixed number of matchups. The team with the most points at the end of the season is crowned champion of their league.
      </p>
    </div>

  </div>
</section>
      {/* Join Section */}
      <section id="join" className="py-32 bg-neutral-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/5 blur-[120px] rounded-full"></div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 text-white">Join the <span className="text-orange-500">Season.</span></h2>
          <div className="bg-neutral-900 border border-white/10 p-12 md:p-16 rounded-[60px] shadow-3xl">
            <div className="flex justify-between items-center mb-12">
              <div className="text-left">
                <p className="text-xs font-black uppercase tracking-[0.4em] text-orange-500 mb-2">Individual Entry (Either League)</p>
                <h3 className="text-6xl font-black italic text-white">$400</h3>
              </div>
              <Logo className="w-24 h-24 opacity-20" />
            </div>
            
            <ul className="grid md:grid-cols-2 gap-6 text-left mb-12">
              {[
                '18 Guaranteed Matchups', 
                'Official League Shorts', 
                'See your Highlights on our IG', 
                'Reserved 1.5H Court Slots', 
                'Open Play/Practice Time', 
                'Inaugural Season Status'
              ].map((li, idx) => (
                <li key={idx} className="flex items-center text-sm font-bold text-gray-300 uppercase tracking-wide italic">
                  <div className="w-2 h-2 bg-orange-500 mr-3"></div> {li}
                </li>
              ))}
            </ul>

           <div className="text-center">
  <p className="text-gray-300 mb-8 font-bold uppercase tracking-wide">
    Click below to apply through our official registration form
  </p>

  <a
    href="https://tally.so/r/7RaJMR"
    target="_blank"
    rel="noreferrer"
    className="inline-block w-full py-6 bg-white text-black font-black uppercase text-lg tracking-widest skew-x-[-10deg] hover:bg-orange-500 hover:text-white transition-all"
  >
    Apply to Play
  </a>
</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <Logo className="w-24 h-24 mb-10" />
          <div className="flex gap-12 mb-16">
  
  {/* Instagram / Camera icon */}
  <a
    href="https://instagram.com/project.pickup"
    target="_blank"
    rel="noreferrer"
  >
    <Camera className="w-6 h-6 text-gray-500 hover:text-white transition-colors cursor-pointer" />
  </a>

  {/* Email icon */}
  <a href="mailto:suryathesekar@gmail.com">
    <Mail className="w-6 h-6 text-gray-500 hover:text-white transition-colors cursor-pointer" />
  </a>

</div>
          <p className="text-gray-800 text-[10px] font-black uppercase tracking-[1em]">
            © PROJECT PICKUP MMXXVII • BOSTON
          </p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default App;
