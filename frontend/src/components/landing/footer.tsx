import logo from '@/assets/New_Project-Photoroom.png';
import partnerLogo from '@/assets/file_000000007a7472088db28a57569e894e-Photoroom (1).png';
import { useLocation } from 'wouter';

export default function Footer() {
  const [, navigate] = useLocation();

  return (
    <footer className="border-t border-[rgba(168,85,247,0.12)] bg-[#07070B] px-4 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <button onClick={() => navigate('/')} className="cursor-pointer shrink-0">
            <img src={logo} alt="Forked" className="h-16" />
          </button>
          
          {/* Vertical divider on desktop, subtle */}
          <div className="hidden sm:block w-px h-10 bg-[rgba(168,85,247,0.2)] rounded-full" />
          
          <div className="flex items-center gap-3">
            <span className="font-medium text-[#D8CFF8]/50 tracking-wide uppercase text-xs">In partnership with</span>
            <img 
              src={partnerLogo} 
              alt="Partner" 
              className="h-16 brightness-0 invert opacity-80" 
            />
          </div>
        </div>
        
        <p className="text-sm text-[#D8CFF8]/30">Decisions made simple. © 2026</p>
      </div>
    </footer>
  );
}
