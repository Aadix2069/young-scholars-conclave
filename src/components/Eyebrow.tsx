type EyebrowProps = {
  children: React.ReactNode;
  variant?: "light" | "dark";
  className?: string;
};

export function Eyebrow({ children, variant = "light", className = "" }: EyebrowProps) {
  return (
    <p
      className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] ${
        variant === "dark" ? "text-white/70" : "text-brand-blue/70"
      } ${className}`}
    >
      {children}
    </p>
  );
}
