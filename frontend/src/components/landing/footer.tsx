import logo from '@/assets/New_Project-Photoroom.png';

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(168,85,247,0.12)] bg-[#07070B] px-4 py-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <img src={logo} alt="Forked" className="h-16" />
        <p className="text-sm text-[#D8CFF8]/40">Decisions made simple. © 2026</p>
      </div>
    </footer>
  );
}
