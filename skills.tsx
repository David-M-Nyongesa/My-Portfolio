const skills = {
  Frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "Redux"
  ],
  Backend: [
    "Node.js",
    "NestJS",
    "Express",
    "REST APIs"
  ],
  Database: [
    "PostgreSQL",
    "Prisma",
    "Redis"
  ],
  DevOps: [
    "Docker",
    "GitHub Actions",
    "CI/CD"
  ],
};

export default function Skills() {
  return (
    <section className="py-32 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12">
        Skills
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(skills).map(
          ([category, items]) => (
            <div
              key={category}
              className="border border-zinc-800 rounded-xl p-6"
            >
              <h3 className="font-bold text-xl mb-4">
                {category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {items.map((item) => (
                  <span
                    key={item}
                    className="bg-zinc-900 px-4 py-2 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}