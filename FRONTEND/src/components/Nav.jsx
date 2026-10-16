import { profile } from "../content";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ onOpenResume }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/75 backdrop-blur-xl backdrop-saturate-150">
      <nav className="mx-auto flex h-12 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="text-sm font-semibold tracking-tight text-white">
          {profile.name}
        </a>
        <div className="flex items-center gap-7">
          <ul className="hidden items-center gap-7 sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs text-neutral-300 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onOpenResume}
            className="cursor-pointer rounded-full bg-white px-3.5 py-1 text-xs font-medium text-ink transition-colors hover:bg-sage"
          >
            Résumé
          </button>
        </div>
      </nav>
    </header>
  );
}
