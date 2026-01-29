export default function projects() {
  return [
    {
      id: 1,
      title: "Bionic Reading App",
      subtitle: "Accessibility-Focused Text Processor",
      description:
        "Engineered a custom text-processing algorithm based on Bionic Reading principles, applying visual anchors to improve reading speed for users with Dyslexia and ADHD.",
      highlights: [
        "Custom visual anchors for focus",
        "Distraction-minimized 'Tunnel Vision' UI",
        "Real-time word assistance via Web Speech API"
      ],
      tech: ["React", "Web Speech API", "CSS Interactivity"],
      github: "https://github.com/Keynb23/Reading",
    },
    {
      id: 2,
      title: "Typing Speed Test + ML Model",
      subtitle: "Predictive Performance Analytics",
      description:
        "Full-stack application utilizing Linear Regression to predict WPM and accuracy based on character distribution and user typing patterns.",
      highlights: [
        "ML-driven performance predictions",
        "RESTful API for data flow management",
        "Continuous model training integration"
      ],
      tech: ["Python", "Flask", "Scikit-Learn", "JavaScript"],
      github: "https://github.com/Keynb23/typing-speed-test-main",
    },
    {
      id: 3,
      title: "NexusData",
      subtitle: "AI-Powered Entity Resolution Engine",
      description:
        "Automated ingestion engine using spaCy NLP to extract entities from unstructured text with dynamic confidence scoring and data normalization.",
      highlights: [
        "NLP-based entity extraction",
        "Golden Record preservation logic",
        "High-speed retrieval via SQLAlchemy ORM"
      ],
      tech: ["Python", "spaCy", "SQLite", "SQLAlchemy"],
      github: "https://github.com/Keynb23/NexusData",
    },
    {
      id: 4,
      title: "Better State Mo LLC",
      subtitle: "Client Website Redesign",
      description:
        "Redesigned a local business site using a scalable component-based architecture, delivering a modern interface tailored to a broad demographic.",
      highlights: [
        "Scalable component-based architecture",
        "Improved accessibility and engagement",
        "Firebase integration for backend services"
      ],
      tech: ["React", "Firebase", "Tailwind CSS"],
      github: "https://github.com/Keynb23/BetterStateMo",
      link: "https://www.betterstatepools.com/",
    },
    {
      id: 5,
      title: "AutoFiles",
      subtitle: "C# Desktop Scaffolding Tool",
      description:
        "Lightweight C# CLI utility that automates complex directory and file scaffolding, eliminating manual overhead in project initialization.",
      highlights: [
        "Modular architecture (InputParser/RootResolver)",
        "Custom text-parsing for nested structures",
        "Self-contained single-file executable"
      ],
      tech: ["C#", ".NET Core", "CLI Design"],
      github: "https://github.com/Keynb23/AutomatedFiling",
    },
  ];
}