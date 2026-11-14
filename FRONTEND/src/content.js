// All portfolio copy lives here so it stays in sync with the résumé.

export const profile = {
  name: "Key'n Brosdahl",
  title: "Software Developer",
  location: "Kansas City, MO",
  phone: "573-397-8946",
  email: "keynb50@gmail.com",
  summary:
    "Software Developer building and maintaining React and TypeScript features for an education platform.",
  links: {
    portfolio: "https://keynb.netlify.app/",
    github: "https://github.com/Keynb23",
    linkedin: "https://www.linkedin.com/in/key-n-brosdahl-5320b3353/",
  },
};

export const experience = [
  {
    company: "Acellus",
    location: "Kansas City, MO",
    period: "2026 – Present",
    shipped: [
      {
        name: "Writing Tutor",
        detail:
          "Helped rebuild a feature that guides students through critical thinking and research as they write.",
      },
      {
        name: "Write Chapter Book",
        detail:
          "Helped build a feature that lets students write a full book and get it published.",
      },
      {
        name: "Dictionary & Encyclopedia",
        detail: "Built the reference tools used inside both writing features.",
      },
      {
        name: "Live Classroom",
        detail:
          "Helped build live class sessions with real-time communication over Socket.IO.",
      },
    ],
    roles: [
      {
        title: "Software Developer",
        bullets: [
          "Build new React and TypeScript components and features for an education platform used by homeschool families.",
          "Diagnose and fix bugs across the front end, tracing issues from user reports to root cause.",
          "Manage client state with Zustand and Jotai, server state with TanStack Query, and routing with TanStack Router.",
          "Validate data at the edges with Zod and build variant-driven UI components with Tailwind CSS and CVA.",
        ],
      },
      {
        title: "QA Developer",
        bullets: [
          "Wrote unit tests in Vitest to catch regressions before release.",
          "Ran QA and release testing and reported results to the engineering manager.",
          "Reproduced and documented defects with clear steps, which led directly into fixing them as a developer.",
        ],
      },
    ],
    // Full Acellus bullets for the printable résumé, in résumé order
    resumeRoles: [
      {
        title: "Software Developer",
        bullets: [
          "Build new React and TypeScript components and features for an education platform used by homeschool families.",
          "Helped rebuild Writing Tutor, a feature that guides students through critical thinking and research as they write.",
          "Helped build Write Chapter Book, a feature that lets students write a full book and get it published.",
          "Built a dictionary and encyclopedia used inside both Writing Tutor and Write Chapter Book.",
          "Helped build live classroom sessions with real-time communication over Socket.IO.",
          "Diagnose and fix bugs across the front end, tracing issues from user reports to root cause.",
          "Manage client state with Zustand and Jotai, server state with TanStack Query, and routing with TanStack Router.",
          "Validate data at the edges with Zod and build variant-driven UI components with Tailwind CSS and CVA.",
        ],
      },
      {
        title: "QA Developer",
        bullets: [
          "Wrote unit tests in Vitest to catch regressions before release.",
          "Ran QA and release testing and reported results to the engineering manager.",
          "Reproduced and documented defects with clear steps, which led directly into fixing them as a developer.",
        ],
      },
    ],
  },
  {
    company: "AstroSkills",
    location: "Remote",
    period: "Aug 2025 – Sep 2025",
    roles: [
      {
        title: "Frontend Developer Intern",
        bullets: [
          "Co-led front-end development and set the visual styling and typography standards for an educational platform.",
          "Worked with backend and cybersecurity teams to integrate secure APIs and real-time features.",
        ],
      },
    ],
  },
];

export const featuredProjects = [
  {
    name: "Better State Mo LLC",
    kind: "Client website",
    description:
      "Redesigned a local business site with a reusable component architecture for easier long-term maintenance.",
    bullets: [
      "Improved accessibility and delivered an interface built for a broad range of users.",
    ],
    tech: ["React", "Firebase"],
    live: "https://www.betterstatepools.com/",
    source: "https://github.com/Keynb23/BetterStateMo",
    visual: "site",
  },
  {
    name: "Bionic Reading App",
    kind: "Accessibility tool",
    description:
      "A text-processing algorithm based on Bionic Reading principles to help readers with dyslexia and ADHD.",
    bullets: [
      "Distraction-minimized UI with a radial “tunnel vision” gradient to reduce eye fatigue.",
      "Real-time pronunciation support using the Speech Synthesis API.",
    ],
    tech: ["React", "Web Speech API"],
    source: "https://github.com/Keynb23/Reading",
    visual: "bionic",
  },
];

export const moreProjects = [
  {
    name: "Typing Speed Test + ML",
    description:
      "Predicts typing speed and accuracy with a linear regression model served by a Flask API.",
    tech: ["Python", "Flask", "scikit-learn"],
    source: "https://github.com/Keynb23/typing-speed-test-main",
  },
  {
    name: "NexusData",
    description:
      "Extracts entities from unstructured text with spaCy and merges duplicates into clean records.",
    tech: ["Python", "spaCy", "SQLAlchemy"],
    source: "https://github.com/Keynb23/NexusData",
  },
  {
    name: "AutoFiles",
    description:
      "A C# command-line tool that scaffolds a project's folders and files from a simple text outline.",
    tech: ["C#", ".NET"],
    source: "https://github.com/Keynb23/AutomatedFiling",
  },
];

export const skills = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "Python"] },
  { group: "Framework", items: ["React"] },
  {
    group: "Libraries",
    items: [
      "TanStack Router",
      "TanStack Query",
      "Zustand",
      "Jotai",
      "Zod",
      "Tailwind CSS",
      "CVA",
      "Vite",
      "Socket.IO",
    ],
  },
  { group: "Testing", items: ["Vitest"] },
  { group: "Tools", items: ["Git", "GitHub", "VS Code"] },
];

export const show = {
  name: "I think, because you asked",
  tagline: "Sleep stories that teach you something.",
  description:
    "A podcast I write and produce: long, slow stories that walk through how the world works, made to fall asleep to. Each episode takes one big question and answers it gently over a few hours.",
  spotify: "https://open.spotify.com/show/6KzLHRteBsorgK8df0F8Js",
  spotifyEmbed: "https://open.spotify.com/embed/show/6KzLHRteBsorgK8df0F8Js?utm_source=generator&theme=0",
  youtube: "https://www.youtube.com/channel/UCdPGe4ZHuvZD5skidgLB_FQ",
  // Newest first. The YouTube video ID is the part after "watch?v=".
  episodes: [
    { number: 2, title: "The Errand", topic: "Why do we sleep?", youtubeId: "xBZKyMnbE68" },
    { number: 1, title: "Inside the Machine", topic: "How does AI work?", youtubeId: "siwOVlcGn8g" },
  ],
};

export const education = {
  school: "Coding Temple",
  credential: "Software Engineering Certificate",
  location: "Remote",
  period: "Mar 2025 – Jun 2025",
  detail: "Full-stack training in React, Flask, and SQL with Git/GitHub sprint workflows.",
};

export const resumeProjects = [
  {
    name: "Better State Mo LLC",
    meta: "Client website · React, Firebase",
    bullets: [
      "Redesigned a local business site with a reusable component architecture for easier long-term maintenance.",
      "Improved accessibility and delivered an interface built for a broad range of users.",
    ],
  },
  {
    name: "Bionic Reading App",
    meta: "React, Web Speech API",
    bullets: [
      "Built a text-processing algorithm based on Bionic Reading principles to help readers with dyslexia and ADHD.",
      "Designed a distraction-minimized UI with a radial “tunnel vision” gradient to reduce eye fatigue.",
      "Added real-time pronunciation support using the Speech Synthesis API.",
    ],
  },
];
