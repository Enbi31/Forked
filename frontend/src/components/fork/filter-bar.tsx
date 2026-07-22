import { filterOptions } from '@/lib/fork-data';

const labels: Record<string, string> = {
  price: 'Price Range',
  utility: 'Utility / Use Case',
  feature: 'Key Feature',
};

export default function FilterBar({ filters, onFilterChange }: {
  filters: Record<string, string[]>;
  onFilterChange: (group: string, values: string[]) => void;
}) {
  const toggle = (group: string, value: string) => {
    const cur = filters[group] || [];
    onFilterChange(group, cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-6">
      {Object.entries(filterOptions).map(([group, options]) => (
        <div key={group}>
          <p className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">
            {labels[group]}
          </p>
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => {
              const active = (filters[group] || []).includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => toggle(group, opt.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/50'
                      : 'bg-zinc-800 text-zinc-400 border border-transparent hover:bg-zinc-700'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
