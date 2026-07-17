export type QA = { q: string; a: string };
export type CompanyPlaybook = {
  name: string;
  blurb: string;
  stages: string[];
  sampleQuestions: string[];
  tips: string[];
};

export const BEHAVIORAL: QA[] = [
  {
    q: "Tell me about yourself.",
    a: "Keep it to 60–90 seconds: current situation (recent grad, job hunting), the stack you've built with (Next.js/TypeScript/Node/Postgres), one concrete project as proof, then why you want this specific role. End on the role, not on your life story.",
  },
  {
    q: "Tell me about a time you faced a difficult bug or technical problem.",
    a: "Use STAR (Situation, Task, Action, Result). A strong real example from your own projects: the three-parallel-auth-systems bug in your Street Style app — three non-communicating auth flows causing stale UI after login. Explain how you traced it to root cause, the fix (routing through one `useAuth().login()`), and the result (consistent state, cleaner codebase).",
  },
  {
    q: "Tell me about a time you disagreed with a teammate or had to give feedback.",
    a: "Pick a small, real, low-stakes example if you don't have a big one from work — a code review comment, a design disagreement in a group project. Focus on how you communicated, not on being right.",
  },
  {
    q: "How do you handle tight deadlines or ambiguous requirements?",
    a: "Give a concrete example of scoping down, asking clarifying questions, or shipping an MVP first. Mentioning how you break a vague client ask (e.g. a freelance client's site request) into a scoped list of pages/features works well here.",
  },
  {
    q: "Why do you want to work here?",
    a: "Research their product, stack, and one recent news item. Never say 'stability' or 'good salary' first — lead with something specific: their tech stack, a product you've used, or their engineering culture.",
  },
  {
    q: "Why should we hire you over someone with more experience?",
    a: "Don't compete on experience — reframe: fast learner, hands-on portfolio built independently, comfortable with modern stack (Next.js 16, TypeScript, Drizzle), and low ramp-up cost. Be honest, not defensive.",
  },
  {
    q: "What's your biggest weakness?",
    a: "Pick something real and in-progress, with evidence you're addressing it — e.g. 'I leaned on AI tooling heavily while learning, so I've been deliberately rebuilding components from documentation only to make sure I own the logic.' Shows self-awareness, not a fake weakness like 'I work too hard.'",
  },
  {
    q: "Where do you see yourself in a few years?",
    a: "Growth within engineering (stronger backend/system design skills, eventually owning features end-to-end), not 'management' unless that's true. Keep it grounded in the role you're applying for.",
  },
  {
    q: "Do you have any questions for us?",
    a: "Always have 2–3 ready: team structure, what a typical sprint looks like, what a successful first 90 days looks like. Never end with 'no, I think you covered it.'",
  },
];

export const TECHNICAL: QA[] = [
  {
    q: "What's the difference between let, const, and var?",
    a: "var is function-scoped and hoisted with undefined; let/const are block-scoped. const prevents reassignment of the binding (not deep immutability — an object declared with const can still have its properties mutated).",
  },
  {
    q: "Explain event delegation / the event loop, briefly.",
    a: "The event loop lets JS handle async work on a single thread: the call stack runs sync code, Web APIs (timers, fetch) run in the background, callbacks queue up in the task/microtask queues, and the loop pushes them onto the stack once it's empty. Microtasks (Promises) run before macrotasks (setTimeout).",
  },
  {
    q: "What are React hooks and why do we need rules for them?",
    a: "Hooks let function components hold state and side effects (useState, useEffect, etc.) without classes. Rules (only call at top level, only from React functions) exist because React tracks hook order per render to match state slots correctly.",
  },
  {
    q: "Explain the difference between useEffect and useLayoutEffect.",
    a: "useEffect runs after the browser paints (async, non-blocking); useLayoutEffect runs synchronously before paint. Use useLayoutEffect only when you need to measure/mutate the DOM before the user sees a flash.",
  },
  {
    q: "What's the difference between server components and client components in Next.js App Router?",
    a: "Server components render on the server, ship no JS to the client, and can access backend resources (DB, secrets) directly. Client components (\"use client\") run in the browser, hold interactivity/state, and can't directly touch server-only resources.",
  },
  {
    q: "How do you handle authentication/authorization in a Next.js app?",
    a: "Session/token validated server-side (middleware or a proxy layer checking cookies), protected routes redirect unauthenticated users, and server actions re-verify the session rather than trusting client state — client-side checks are UX only, never the real security boundary.",
  },
  {
    q: "What's the difference between SQL JOIN types (INNER, LEFT, RIGHT)?",
    a: "INNER JOIN returns only matching rows in both tables. LEFT JOIN returns all rows from the left table plus matches from the right (NULL where no match). RIGHT JOIN is the mirror of LEFT.",
  },
  {
    q: "What is an ORM, and why use Drizzle/Prisma instead of raw SQL?",
    a: "An ORM maps database rows to typed objects/queries in your app language. Drizzle gives you type-safe queries and migrations while staying close to real SQL (less abstraction/magic than Prisma), which is easier to reason about and debug.",
  },
  {
    q: "What is a race condition, and how might it show up in a web app?",
    a: "When the outcome depends on timing of concurrent operations — e.g. two rapid form submits both reading a stale value before either write completes. Guard with debouncing, optimistic locking, or server-side transactions.",
  },
  {
    q: "Explain REST API design basics: what makes an endpoint 'RESTful'?",
    a: "Resources are nouns (`/users/:id`), HTTP verbs express the action (GET/POST/PUT/DELETE), responses use proper status codes, and the API is stateless — each request carries everything needed to process it.",
  },
  {
    q: "What is Git rebase vs. merge, and when would you use each?",
    a: "Merge preserves both histories and adds a merge commit; rebase replays your commits on top of another branch for a linear history. Use merge for shared/public branches, rebase for cleaning up your own local branch before opening a PR.",
  },
  {
    q: "How would you optimize a slow page load?",
    a: "Profile first (Lighthouse/DevTools), then common fixes: image optimization (next/image), code-splitting/lazy loading, reducing client-side JS bundle, caching/ISR for data that doesn't change often, and avoiding waterfall requests.",
  },
  {
    q: "Live-coding: reverse a string / find duplicates in an array / FizzBuzz.",
    a: "These show up even in non-FAANG interviews as a baseline filter. Practice explaining your approach out loud before coding, mention time complexity, and don't go silent — talking through your thinking is often weighted as much as the answer.",
  },
];

export const COMPANY_PLAYBOOKS: CompanyPlaybook[] = [
  {
    name: "Big Tech / FAANG-style (Google, Amazon, Meta, Microsoft)",
    blurb:
      "Structured, multi-round loops with a heavy DSA/coding bar even for junior roles, plus a distinct behavioral round scored against company-specific values (e.g. Amazon's Leadership Principles, Google's 'Googleyness').",
    stages: [
      "Recruiter screen (fit, logistics, comp expectations)",
      "1–2 online assessments (algorithmic coding, sometimes OOD)",
      "2–4 onsite/virtual rounds: coding (data structures & algorithms), sometimes a light system-design round for junior roles",
      "Dedicated behavioral round scored against explicit values/principles",
    ],
    sampleQuestions: [
      "Reverse a string in O(n) time.",
      "Find the most frequently occurring element in an array.",
      "Implement a simple LRU cache.",
      "Walk me through a recent project you've built.",
      "Tell me about a time you debugged a complex problem.",
    ],
    tips: [
      "Drill arrays, strings, hashmaps, trees, and basic graph traversal — most junior loops stay in 'easy-to-medium LeetCode' territory.",
      "Narrate your thought process out loud; silence reads as a red flag even if you get the right answer.",
      "Prepare 5–6 STAR stories in advance and map them to common themes (conflict, failure, ambiguity, ownership) so you're not improvising under pressure.",
      "Ask about team, on-call expectations, and codebase size/age — these loops move fast and you won't get much time to ask later.",
    ],
  },
  {
    name: "Accenture",
    blurb:
      "Large consulting/IT-services process: an aptitude/cognitive assessment first, then a technical round focused on your actual projects and stack, then an HR/culture-fit round.",
    stages: [
      "Online aptitude test (logical reasoning, sometimes verbal/quant)",
      "Technical interview — often video, centered on your CV projects, OOP fundamentals, and whatever stack the role names (databases, cloud, Agile)",
      "HR interview — career goals, strengths/weaknesses, teamwork and conflict handling, and Accenture culture fit",
    ],
    sampleQuestions: [
      "Walk me through a project on your resume end-to-end.",
      "Explain the difference between a class and an object.",
      "Write a SQL query to find duplicate records in a table.",
      "How would you design a simple REST API for a todo app?",
    ],
    tips: [
      "Expect to explain a project from your resume in real depth — know every technical decision you made and why, not just what the project does.",
      "Basic OOP and DBMS questions come up often regardless of your specific stack — know classes/objects, joins, normalization at a fresh-grad level.",
      "The HR round genuinely evaluates fit with Accenture's collaboration-and-innovation framing — have a real answer for 'how do you see yourself contributing to our culture,' not a generic one.",
    ],
  },
  {
    name: "Deloitte",
    blurb:
      "Multi-stage: recruiter/HR phone screen with some theoretical programming questions, a technical round with a senior consultant (project deep-dive, possibly a different stack than the job description), then behavioral rounds focused on client-facing scenarios.",
    stages: [
      "Online application + initial screening (recruiter call or assessment)",
      "HR phone screen — includes some theoretical programming questions",
      "Technical round with a senior consultant — project walkthrough, stack-specific questions",
      "Behavioral round(s) — stakeholder management, ambiguity, incomplete-data decisions",
    ],
    sampleQuestions: [
      "Walk me through a project you've built and explain the technical decisions you made.",
      "How would you handle a situation where client requirements changed mid-project?",
      "Describe a time you worked with a difficult stakeholder — how did you communicate?",
      "Write a function to find missing numbers in an array.",
    ],
    tips: [
      "Interviewers may ask about a completely different tech stack than the one in the job posting — stay calm, explain your general problem-solving approach rather than freezing.",
      "Coding questions prioritize readable, correct code and clear explanation of edge cases over clever one-liners or speed.",
      "Have a real story ready for: 'a time you worked with a difficult stakeholder,' 'a project where requirements changed late,' and 'a decision you made with incomplete information' — these come up directly in Deloitte's loop.",
      "Some interviewers can come across as brusque or disengaged — don't take it personally or let it throw your delivery.",
    ],
  },
  {
    name: "TEKA Systems Greece (and similar SAP/enterprise consulting shops)",
    blurb:
      "Greece's largest SAP/Salesforce/ServiceNow consulting house, also hiring for front-end roles (JS/React) alongside SAP consulting. Expect a more traditional, project-and-client-oriented interview than a startup.",
    stages: [
      "CV screen — university degree in CS/Software Engineering or related is typically listed as a requirement",
      "Technical interview focused on the specific stack in the posting (for dev roles: JS fundamentals, framework basics; for SAP-adjacent roles: business-process understanding)",
      "Fit interview — client-facing consulting environment, so communication and reliability are explicitly evaluated",
    ],
    sampleQuestions: [
      "Explain how you'd integrate a frontend React app with an existing SAP backend.",
      "Describe a time you had to adapt a project to meet changing client requirements.",
      "What steps do you take to ensure secure communication between a browser and enterprise APIs?",
    ],
    tips: [
      "Frame your experience around client delivery, not just code — this is a consulting company serving large enterprise clients (retail, industrial, telecom, finance), so 'can you work directly with a client's requirements' matters as much as syntax.",
      "Be ready to discuss integration-style thinking (how a frontend talks to backend systems/APIs) since much of their work sits alongside enterprise systems like SAP.",
      "A university degree is commonly listed as a formal requirement for their developer postings — be ready to speak confidently about your IEK diploma and hands-on portfolio if asked how that compares.",
    ],
  },
  {
    name: "Smaller Greek tech companies & startups (e.g. gaming, product studios, small software houses)",
    blurb:
      "Leaner processes, fewer rounds, and a much bigger weight on 'can you actually build things' — take-home tasks or live pairing on real code are common instead of abstract algorithm rounds.",
    stages: [
      "Founder/hiring-manager screen — informal, culture and motivation focused",
      "Take-home task or live pairing exercise (build a small feature, fix a bug, or extend a small app)",
      "Final chat — team fit, salary, start date",
    ],
    sampleQuestions: [
      "Walk me through your best portfolio project and explain the key technical decisions.",
      "Here's a small bug in our codebase — how would you approach fixing it?",
      "Tell me about a time you shipped something quickly under pressure.",
      "How do you stay current with new libraries or frameworks in your stack?",
    ],
    tips: [
      "Your portfolio and GitHub matter more here than at big consulting firms — make sure your best project (the one you can explain end-to-end without AI having written the logic) is the one you lead with.",
      "For take-home tasks: prioritize working, clean code over a flashy but half-broken feature set. Small companies read take-homes as a proxy for how you'll actually ship.",
      "Ask directly about team size and who you'd be working with day-to-day — at this size, team fit questions cut both ways and it's fair to interview them back.",
      "Be ready to talk price/salary expectations earlier than at large firms — smaller companies often ask this in round one.",
    ],
  },
];