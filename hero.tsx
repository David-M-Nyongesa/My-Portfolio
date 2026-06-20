"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl">
        <p className="text-blue-400 mb-3">
          Hello, I'm
        </p>

        <h1 className="text-6xl md:text-8xl font-bold">
          David Nyongesa
        </h1>

        <h2 className="text-2xl md:text-4xl text-gray-400 mt-4">
          Full-Stack Software Engineer
        </h2>

        <p className="mt-8 max-w-2xl text-gray-300 text-lg">
          I build intelligent software systems that solve
          real-world problems through scalable architecture,
          AI integration, and modern web technologies.
        </p>

        <div className="flex gap-4 mt-10">
          <a
            href="#projects"
            className="bg-blue-600 px-6 py-3 rounded-lg"
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="border border-gray-700 px-6 py-3 rounded-lg"
          >
            Contact Me
          </a>
        </div>

        <div className="flex gap-5 mt-10">
          <Github />
          <Linkedin />
          <Mail />
        </div>
      </div>
    </section>
  );
}