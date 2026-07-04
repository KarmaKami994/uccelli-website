const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/uccelli-society",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/uccelli_society/",
    path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/uccellisociety",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
];

interface SocialIconsProps {
  /** "light" for dark backgrounds (footer), "dark" for light backgrounds (contact page). */
  variant?: "light" | "dark";
  size?: number;
}

export function SocialIcons({ variant = "dark", size = 16 }: SocialIconsProps) {
  const cls =
    variant === "light"
      ? "w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors"
      : "w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-black hover:border-neutral-400 transition-colors";

  return (
    <div className="flex items-center gap-4">
      {SOCIALS.map(({ label, href, path }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={cls}>
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
