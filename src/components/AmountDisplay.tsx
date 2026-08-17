import { formatCurrency } from "../helpers";

type AmountDisplayProps = {
  label?: string;
  amount: number;
}

export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
  return (
    <div className="flex gap-7 items-center border border-slate-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
      <span className="text-xs font-bold uppercase tracking-wider text-pink-700">
        {label && `${label}:`}
      </span>
      <p className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
        {formatCurrency(amount)}
      </p>
    </div>
  )
}