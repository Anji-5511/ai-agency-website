export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-fg-muted ${className}`}
    >
      {children}
    </span>
  )
}
