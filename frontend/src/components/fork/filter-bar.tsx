import { filterOptions } from '@/lib/fork-data';

interface FilterBarProps {
  filters: Record<string, string[]>;
  onFilterChange: (group: string, values: string[]) => void;
}

const groupLabels: Record<string, string> = {
  price: 'Price Range',
  utility: 'Utility / Use Case',
  feature: 'Key Feature',
};

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const toggle = (group: string, value: string) => {
    const current = filters[group] || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange(group, next);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-6">
      {Object.entries(filterOptions).map(([group, options]) => (
        <div key={group}>
          <p className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">
            {groupLabels[group]}
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
