interface SectionLabelProps {
  children: React.ReactNode;
  variant?: "blue" | "teal" | "amber" | "violet" | "rose";
}

export default function SectionLabel({ children, variant = "blue" }: SectionLabelProps) {
  return (
    <span className={`badge badge-${variant} font-display`}>
      {children}
    </span>
  );
}
