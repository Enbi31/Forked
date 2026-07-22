import { useLocation } from 'wouter';
import { Twitter, Github } from 'lucide-react';
import logo from '@/assets/New_Project-Photoroom.png';

export default function Navbar() {
  const [, navigate] = useLocation();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl bg-[#07070B]/80 backdrop-blur-xl border border-[rgba(168,85,247,0.3)] rounded-full px-6 py-3 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/')} className="cursor-pointer">
          <img src={logo} alt="Forked" className="h-12 scale-[1.35] origin-left" />
        </button>
        
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/app')} className="px-6 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:from-[#8B4AF7] hover:to-[#B565F7] text-white font-semibold rounded-full glow-button transition-all duration-300 cursor-pointer">
            Fork It
          </button>
        </div>
      </div>
    </nav>
  );
}
