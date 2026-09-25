type PrismmaMarkProps = {
  className: string;
};

export function PrismmaMark({ className }: PrismmaMarkProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 4 43 34 24 44 5 34 24 4Z" />
      <path d="m24 4-9 30m9-30 9 30M5 34h38M24 44V4M15 34l9 10 9-10" />
    </svg>
  );
}
