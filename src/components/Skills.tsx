import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { skills } from "../data/portfolio";

const categories = ["All", "Language", "Frontend", "Backend", "Tools"];

const categoryColors: Record<string, string> = {
  Language: "from-violet-500 to-purple-600",
  Frontend: "from-cyan-500 to-blue-600",
  Backend: "from-emerald-500 to-green-600",
  Tools: "from-orange-500 to-amber-500",
};

const categoryIcons: Record<string, string> = {
  Language: "{ }",
  Frontend: "◈",
  Backend: "⚙",
  Tools: "⊞",
};

function SkillChip({ name, category }: { name: string; category: string }) {
  const { isDark } = useTheme();
  const gradient = categoryColors[category] || "from-orange-500 to-amber-500";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
        isDark
          ? "bg-white/5 border-white/10 text-zinc-200 hover:bg-white/10 hover:border-white/20"
          : "bg-white border-zinc-200 text-zinc-800 shadow-sm hover:border-zinc-300 hover:shadow"
      }`}
    >
      <span
        className={`h-2 w-2 shrink-0 rounded-full bg-linear-to-br ${gradient}`}
        aria-hidden="true"
      />
      {name}
    </span>
  );
}

function SectionHeader({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle?: string;
}) {
  const { isDark } = useTheme();
  return (
    <div className="text-center mb-16">
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium mb-4 border ${
          isDark
            ? "bg-orange-500/10 text-orange-300 border-orange-500/20"
            : "bg-orange-500/10 text-orange-700 border-orange-500/30"
        }`}
      >
        ◈ skills
      </div>
      <h2
        className={`text-4xl sm:text-5xl font-bold tracking-tight mb-4 ${
          isDark ? "text-white" : "text-zinc-900"
        }`}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl mx-auto ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function Skills() {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = skills.filter(
    (s) => activeCategory === "All" || s.category === activeCategory,
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDark ? "bg-amber-500" : "bg-amber-400"
          }`}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader subtitle="Technologies and tools I work with regularly, organized by area.">
          My Tech Stack
        </SectionHeader>

        {/* Category overview cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {Object.entries(categoryIcons).map(([cat, icon]) => {
            const count = skills.filter((s) => s.category === cat).length;
            const gradient = categoryColors[cat];

            return (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? "All" : cat)
                }
                aria-pressed={activeCategory === cat}
                className={`relative p-5 rounded-2xl border text-left transition-all duration-200 hover:scale-105 overflow-hidden ${
                  activeCategory === cat
                    ? isDark
                      ? "border-orange-500/40 bg-orange-500/10"
                      : "border-orange-500/40 bg-orange-500/5"
                    : isDark
                      ? "border-white/10 bg-white/5 hover:border-white/20"
                      : "border-zinc-200 bg-white shadow-sm hover:border-zinc-300"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center text-white text-lg mb-3 shadow-lg`}
                >
                  {icon}
                </div>
                <div
                  className={`font-semibold text-sm mb-1 ${isDark ? "text-zinc-200" : "text-zinc-800"}`}
                >
                  {cat}
                </div>
                <div
                  className={`text-xs ${isDark ? "text-zinc-500" : "text-zinc-600"}`}
                >
                  {count} technologies
                </div>
                {activeCategory === cat && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Filter tabs */}
        <div
          className={`flex flex-wrap gap-2 mb-8 p-1.5 rounded-xl w-fit mx-auto ${
            isDark ? "bg-white/5" : "bg-zinc-200/70"
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25"
                  : isDark
                    ? "text-zinc-400 hover:text-zinc-200"
                    : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills chips */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {filtered.map((skill, i) => (
            <div
              key={skill.name}
              style={{ animationDelay: `${i * 0.04}s` }}
              className={visible ? "fade-in-up" : "opacity-0"}
            >
              <SkillChip name={skill.name} category={skill.category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
