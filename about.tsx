export default function About() {
  return (
    <section
      id="about"
      className="py-32 px-6 max-w-6xl mx-auto"
    >
      <h2 className="text-4xl font-bold mb-10">
        About Me
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-gray-300 leading-8">
            I am a Full-Stack Software Engineer
            focused on building scalable software
            products that solve real business
            challenges.
          </p>

          <p className="text-gray-300 leading-8 mt-6">
            My expertise spans frontend
            engineering, backend architecture,
            databases, cloud deployment, AI
            integrations, and system design.
          </p>
        </div>

        <div className="space-y-4">
          <div className="border border-zinc-800 p-4 rounded-xl">
            Scalable Systems
          </div>

          <div className="border border-zinc-800 p-4 rounded-xl">
            AI Integrations
          </div>

          <div className="border border-zinc-800 p-4 rounded-xl">
            Cloud Deployments
          </div>

          <div className="border border-zinc-800 p-4 rounded-xl">
            Modern Architecture
          </div>
        </div>
      </div>
    </section>
  );
}