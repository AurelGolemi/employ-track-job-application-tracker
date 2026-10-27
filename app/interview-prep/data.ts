export type QA = { q: string; a: string };

export type StackTrack = {
  name: string;
  blurb: string;
  technologies: string[];
  focus: string[];
};

export const BEHAVIORAL: QA[] = [
  {
    q: "Tell me about yourself.",
    a: "Give a concise introduction to what you are learning or building, the kinds of problems you enjoy, and what you are looking for next. Use a project, course, open-source contribution, or work experience as evidence, and connect it to the role.",
  },
  {
    q: "Tell me about a difficult bug or technical problem you solved.",
    a: "Explain the context, what made the problem challenging, how you investigated it, and what changed as a result. Be specific about your own decisions, including what you tried first and what you learned.",
  },
  {
    q: "Tell me about a time you disagreed with a teammate.",
    a: "Choose a real example from work, study, a group project, or a community contribution. Describe how you listened, shared your reasoning, and reached a decision together rather than focusing on who was right.",
  },
  {
    q: "How do you handle unclear requirements or a tight deadline?",
    a: "Explain how you clarify the desired outcome, identify assumptions and risks, and agree on a useful first version. Share how you communicate trade-offs and check that the delivered work solves the real problem.",
  },
  {
    q: "Why are you interested in this role?",
    a: "Connect something specific about the product, team, or engineering challenges to what you want to learn and contribute. Avoid relying on generic claims; show that you understand what the organization builds and who it serves.",
  },
  {
    q: "What is something you are working to improve?",
    a: "Pick a genuine skill you are actively developing. Explain what you noticed, the steps you are taking to improve, and how you will know you are making progress.",
  },
  {
    q: "Tell me about a project you are proud of.",
    a: "Describe the user or problem, your contribution, the main technical choices, and one challenge you worked through. Be ready to explain what you would change next and how you know the project works.",
  },
  {
    q: "What questions would you ask the interview team?",
    a: "Ask about the team's current goals, how engineers collaborate and get feedback, what success looks like in the first few months, and how the team balances delivery with quality.",
  },
];

export const TECHNICAL: QA[] = [
  {
    q: "How do you break down a programming problem before writing code?",
    a: "Clarify the expected input and output, work through a small example, identify edge cases, and describe a straightforward approach first. Then implement it, test it with representative cases, and discuss its time and space complexity.",
  },
  {
    q: "What are the differences between common data structures?",
    a: "Arrays provide indexed access; linked lists make local insertions and removals straightforward once a node is found; hash maps provide average constant-time key lookup; stacks are last-in, first-out; and queues are first-in, first-out. Choose based on the operations your problem needs.",
  },
  {
    q: "What is the difference between concurrency and parallelism?",
    a: "Concurrency is structuring work so multiple tasks can make progress over overlapping periods; parallelism means executing multiple tasks at the same time. A program can be concurrent without running tasks on multiple CPU cores.",
  },
  {
    q: "What does a web browser do when you visit a URL?",
    a: "At a high level, the browser resolves the domain, establishes a connection, sends an HTTP request, receives a response, and renders the page. The details can include DNS, TLS, caching, redirects, HTML parsing, and JavaScript execution.",
  },
  {
    q: "How do HTTP methods and status codes fit into an API?",
    a: "Methods communicate the intended operation, such as GET to read and POST to submit or create. Status codes describe the outcome, such as 200 for success, 201 for creation, 400 for an invalid request, 401/403 for authentication or permission issues, and 404 for a missing resource.",
  },
  {
    q: "When would you choose a relational database?",
    a: "Relational databases such as PostgreSQL and MySQL are a strong fit for structured data, relationships, and transactions. Model entities with clear keys, use constraints to protect data integrity, and use indexes for query patterns you have measured or expect.",
  },
  {
    q: "What is the difference between an INNER JOIN and a LEFT JOIN?",
    a: "An INNER JOIN returns rows that match on both sides. A LEFT JOIN returns every row from the left side and matching rows from the right, using NULL where there is no match.",
  },
  {
    q: "What is the difference between authentication and authorization?",
    a: "Authentication establishes who a user is. Authorization determines what that user is allowed to do. Enforce authorization on the server for every protected operation; hiding a control in the interface is not a security check.",
  },
  {
    q: "What does a useful automated test cover?",
    a: "A useful test checks observable behavior for an important case, including relevant edge cases. Unit tests isolate small pieces of logic, integration tests check how components work together, and end-to-end tests exercise user flows through the running application.",
  },
  {
    q: "How do Git branches and code reviews help a team?",
    a: "Branches isolate work so changes can be developed and reviewed before they reach a shared branch. A focused pull request should explain what changed and why; review helps catch issues, spread context, and agree on maintainable solutions.",
  },
  {
    q: "How would you investigate a slow application?",
    a: "Reproduce the slowdown and measure where time is spent before changing code. Check browser and server traces, network requests, database queries, and rendering; then address the measured bottleneck and compare results.",
  },
  {
    q: "How do JavaScript and TypeScript relate?",
    a: "TypeScript adds static type checking and language features that compile to JavaScript. Types can catch many mistakes during development, but they do not validate untrusted data at runtime; external input still needs validation.",
  },
  {
    q: "What should you know about Python, Java, or C# in a backend interview?",
    a: "Be ready to explain the language's core types, control flow, functions, error handling, and object-oriented concepts, then show how you use its ecosystem. For example, Python commonly pairs with Django or FastAPI, Java with Spring Boot, and C# with ASP.NET Core.",
  },
  {
    q: "What is the purpose of containers and cloud platforms?",
    a: "Containers package an application with its runtime dependencies for more consistent environments. Cloud platforms provide managed compute, networking, storage, and databases; understand deployment, configuration, logs, and basic access control for the services you use.",
  },
  {
    q: "How do you use AI coding tools without sacrificing code quality?",
    a: "Treat generated code as a proposal, not a source of truth. Give the tool scoped context, review its changes, verify assumptions against documentation, run tests and security checks, and make sure you can explain and maintain the result.",
  },
];

export const STACK_TRACKS: StackTrack[] = [
  {
    name: "JavaScript / TypeScript",
    blurb: "A flexible path into web development, from interactive interfaces to server-side APIs.",
    technologies: ["React", "Node.js", "Express", "Next.js"],
    focus: [
      "Language fundamentals, async code, and TypeScript types",
      "Reusable UI, state, and browser fundamentals",
      "HTTP APIs, validation, and server-side behavior",
    ],
  },
  {
    name: "Python",
    blurb: "A readable general-purpose language used in web services, automation, and data work.",
    technologies: ["Python", "Django", "FastAPI", "PostgreSQL"],
    focus: [
      "Core Python, collections, exceptions, and packages",
      "Routes, request validation, and service structure",
      "SQL, data modeling, and testing",
    ],
  },
  {
    name: "Java",
    blurb: "A long-established choice for backend services and large-scale enterprise applications.",
    technologies: ["Java", "Spring Boot", "Maven / Gradle", "PostgreSQL"],
    focus: [
      "Object-oriented programming, collections, and exceptions",
      "Spring dependency injection and REST controllers",
      "Persistence, testing, and service boundaries",
    ],
  },
  {
    name: "C# / .NET",
    blurb: "A modern, cross-platform ecosystem for APIs, web applications, and enterprise software.",
    technologies: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server"],
    focus: [
      "C# types, LINQ, async/await, and interfaces",
      "HTTP endpoints, middleware, and dependency injection",
      "Database access, validation, and automated tests",
    ],
  },
  {
    name: "Data & deployment foundations",
    blurb: "Skills that show up across stacks and help you ship complete, dependable applications.",
    technologies: ["SQL", "PostgreSQL / MySQL", "Git", "Docker", "AWS / Azure"],
    focus: [
      "Schema design, joins, indexes, and transactions",
      "Git collaboration and clear code reviews",
      "Environment configuration, containers, and deployment basics",
    ],
  },
  {
    name: "AI engineering",
    blurb: "Build software features around language models with predictable interfaces, useful context, and measurable quality.",
    technologies: ["LLM APIs", "OpenAI / Anthropic / Gemini", "Embeddings", "RAG", "pgvector"],
    focus: [
      "Prompt design, structured outputs, and tool/function calling",
      "Retrieval-augmented generation, embeddings, and data grounding",
      "Evaluation, latency, cost, privacy, and failure handling",
    ],
  },
  {
    name: "Agentic coding & AI-assisted development",
    blurb: "Use coding agents as part of an engineering workflow, from scoped tasks and repository context to reviewed, tested changes.",
    technologies: ["GitHub Copilot", "Cursor", "Claude Code", "OpenAI Codex", "MCP"],
    focus: [
      "Breaking work into bounded tasks and providing relevant context",
      "Tool permissions, human checkpoints, and safe agent workflows",
      "Reviewing generated diffs, running tests, and owning the final code",
    ],
  },
];
