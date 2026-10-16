import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, intro, tone = "dark" }) {
  const eyebrowColor = tone === "dark" ? "text-sage" : "text-forest";
  const introColor = tone === "dark" ? "text-neutral-400" : "text-neutral-600";

  return (
    <Reveal className="mb-16 max-w-3xl md:mb-20">
      <p className={`mb-4 text-sm font-semibold tracking-wide ${eyebrowColor}`}>{eyebrow}</p>
      <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">{title}</h2>
      {intro && <p className={`mt-6 text-lg leading-relaxed md:text-xl ${introColor}`}>{intro}</p>}
    </Reveal>
  );
}
