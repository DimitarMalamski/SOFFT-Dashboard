import { Menu } from "lucide-react";

export default function OrderTypeSelector({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-emerald-200 text-sm tracking-wide">
          {label}
        </label>
      )}

      <div
        className="relative rounded-xl overflow-hidden bg-gradient-to-r 
        from-emerald-950/70 via-emerald-900/60 to-emerald-800/50 
        shadow-md shadow-emerald-900/40 border border-emerald-600/30"
      >
        <select
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 bg-transparent text-emerald-100 
          focus:outline-none appearance-none cursor-pointer
          pr-10"
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-emerald-950 text-emerald-100 cursor-pointer"
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* Arrow */}
        <Menu className="material-symbols-outlined absolute right-3 top-1/2 
          -translate-y-1/2 text-emerald-300 pointer-events-none" />
      </div>
    </div>
  );
}
