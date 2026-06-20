import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-32 px-6 max-w-6xl mx-auto"
    >
      <h2 className="text-4xl font-bold mb-12">
        Featured Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="border border-zinc-800 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold">
              {project.title}
            </h3>

            <p className="mt-4 text-gray-400">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}