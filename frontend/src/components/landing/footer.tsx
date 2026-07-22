export default function Footer() {
  return (
    <footer className="border-t border-[rgba(168,85,247,0.12)] bg-[#07070B] px-4 py-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white font-semibold">
          <span className="text-xl">⚡</span>
          <span>Fork</span>
        </div>
        <p className="text-sm text-[#D8CFF8]/40">Decisions made simple. © 2026</p>
      </div>
    </footer>
  );
}
