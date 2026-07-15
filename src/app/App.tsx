// ============================================================
// QA PROFESSIONAL PORTFOLIO - Main Application File
// Think of this file like the blueprint of a building.
// Each section below is one "room" of the portfolio website.
// ============================================================

import { useState, useRef } from "react";
import {
  CheckCircle,
  Bug,
  Code2,
  MessageSquare,
  FlaskConical,
  Upload,
  FileText,
  Eye,
  X,
  ChevronDown,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  Menu,
} from "lucide-react";

// ============================================================
// DATA — Think of this as a spreadsheet of all your projects.
// Instead of writing the same HTML 15 times, we store the
// data here and let React "loop" through it automatically.
// ============================================================

const PROJECTS = [
  {
    id: 1,
    title: "E-commerce Login Automation",
    problem:
      "Manual login testing was slow and error-prone during every release cycle.",
    tested: "Valid credentials, wrong passwords, empty fields, locked accounts",
    tools: "Selenium, Python, pytest",
    result: "Reduced regression testing time by 70%; caught 3 edge-case bugs before launch.",
    tag: "Automation",
  },
  {
    id: 2,
    title: "Weather API Validation",
    problem:
      "The weather data API returned inconsistent values for certain city codes.",
    tested: "Response status codes, JSON structure, temperature units, error messages",
    tools: "Postman, Python requests, JSON Schema",
    result: "Identified 5 malformed responses; API team fixed data mapping issue.",
    tag: "API Testing",
  },
  {
    id: 3,
    title: "Calculator Edge-Case Testing",
    problem:
      "A web calculator app produced wrong results for large numbers and division by zero.",
    tested: "Boundary values, negative numbers, decimals, division by zero, overflow",
    tools: "Manual testing, equivalence partitioning, boundary value analysis",
    result: "Found 8 defects; all fixed before public release.",
    tag: "Functional",
  },
  {
    id: 4,
    title: "Bug Report Generator",
    problem:
      "QA team was writing inconsistent bug reports, slowing down developer fixes.",
    tested: "Template completeness, field validation, reproducibility of steps",
    tools: "Python, Jira API, Markdown",
    result: "Standardised reports reduced back-and-forth by 40%.",
    tag: "Tooling",
  },
  {
    id: 5,
    title: "Website Status Checker",
    problem:
      "No automated way to verify all pages returned 200 OK after each deployment.",
    tested: "HTTP status codes, redirect chains, timeout handling, SSL validity",
    tools: "Python, requests library, schedule",
    result: "Caught a broken redirect on production within 2 minutes of deploy.",
    tag: "Automation",
  },
  {
    id: 6,
    title: "Contact Form Validation",
    problem:
      "Contact form accepted invalid email formats and blank messages.",
    tested: "Required fields, email format, max character limits, XSS inputs",
    tools: "Manual testing, Selenium, OWASP checklist",
    result: "6 validation bugs logged; form now rejects all invalid submissions.",
    tag: "Functional",
  },
  {
    id: 7,
    title: "Order Total Checker",
    problem:
      "Cart total calculations were incorrect when discount codes and taxes combined.",
    tested: "Single items, bulk orders, tax tiers, discount stacking, free-shipping threshold",
    tools: "Excel test matrix, manual testing, Python calculator script",
    result: "Found 4 calculation defects; revenue leakage of ~£200/day was stopped.",
    tag: "Functional",
  },
  {
    id: 8,
    title: "Email Validator",
    problem:
      "Registration system accepted obviously invalid emails, causing bounce rates to spike.",
    tested: "RFC-5321 formats, special characters, subdomains, internationalized domains",
    tools: "Python regex, pytest, real-world email dataset",
    result: "Validator now blocks 99% of invalid formats at input.",
    tag: "Automation",
  },
  {
    id: 9,
    title: "Discount Code Validator",
    problem:
      "Expired and one-use promo codes were still being accepted at checkout.",
    tested: "Active codes, expired codes, used codes, case sensitivity, stacking rules",
    tools: "Postman, SQL queries, manual exploratory testing",
    result: "3 critical business-logic bugs found; £1,200 in losses prevented.",
    tag: "API Testing",
  },
  {
    id: 10,
    title: "Password Strength Checker",
    problem:
      "The strength meter showed 'Strong' for passwords that failed basic security rules.",
    tested: "Minimum length, uppercase, numeric, special characters, common-word detection",
    tools: "Manual testing, JavaScript console, security checklist",
    result: "Strength logic corrected; weak passwords now correctly flagged.",
    tag: "Security",
  },
  {
    id: 11,
    title: "Booking Slot Checker",
    problem:
      "Double-bookings occurred when two users selected the same slot simultaneously.",
    tested: "Concurrent requests, fully booked slots, past date selection, timezone edges",
    tools: "JMeter, manual testing, race-condition analysis",
    result: "Race condition identified and resolved; zero double-bookings post-fix.",
    tag: "Performance",
  },
  {
    id: 12,
    title: "Refund Policy Checker",
    problem:
      "Refund eligibility logic did not match the published policy, causing customer complaints.",
    tested: "Within-window refunds, expired windows, partial refunds, non-refundable items",
    tools: "Manual testing, business requirements review, decision tables",
    result: "Policy mismatches corrected in 2 sprints; support tickets dropped 30%.",
    tag: "Functional",
  },
  {
    id: 13,
    title: "Subscription Renewal Checker",
    problem:
      "Auto-renewal emails were firing for already-cancelled subscriptions.",
    tested: "Active, cancelled, paused, and trial subscription states",
    tools: "SQL, manual testing, state-transition diagrams",
    result: "Incorrect renewal logic fixed; customer complaints eliminated.",
    tag: "Functional",
  },
  {
    id: 14,
    title: "Delivery Time Estimator",
    problem:
      "Estimated delivery dates did not account for weekends, public holidays, or cut-off times.",
    tested: "Same-day cut-off, weekend orders, bank holidays, remote postcodes",
    tools: "Manual testing, date-edge analysis, Python test script",
    result: "8 date-calculation bugs fixed; customer delivery expectations now accurate.",
    tag: "Functional",
  },
  {
    id: 15,
    title: "Support Ticket Priority Checker",
    problem:
      "High-priority tickets were being auto-assigned a low priority due to keyword mismatch.",
    tested: "Keyword triggers, priority thresholds, SLA timers, escalation paths",
    tools: "Manual testing, regex analysis, Zendesk sandbox",
    result: "Priority assignment accuracy improved from 61% to 97%.",
    tag: "Functional",
  },
];

// Skills data - each skill has an icon component, name, and description.
// Think of this like a business card for each skill.
const SKILLS = [
  {
    icon: Code2,
    name: "Frontend Development",
    desc: "Building fast, accessible, and responsive web interfaces with React, modern CSS, and component-driven architecture.",
  },
  {
    icon: FlaskConical,
    name: "Manual & Exploratory Testing",
    desc: "Systematically uncovering defects through structured test cases, boundary analysis, and real-world user-journey exploration.",
  },
  {
    icon: Bug,
    name: "Bug Reporting & Tracking",
    desc: "Writing clear, reproducible defect reports with steps, environment details, and severity ratings in Jira and similar tools.",
  },
  {
    icon: CheckCircle,
    name: "API & Integration Testing",
    desc: "Validating REST endpoints for status codes, response schema, data accuracy, and error handling using Postman.",
  },
  {
    icon: MessageSquare,
    name: "UI/UX Design",
    desc: "Designing intuitive user experiences with a focus on clarity, visual hierarchy, and accessibility — from wireframe to polished UI.",
  },
];

// Tag color map - like a colour-coding system for project categories.
// Each tag gets a specific background and text colour pair.
const TAG_COLORS: Record<string, string> = {
  Automation: "bg-[#1b2a4a] text-white",
  "API Testing": "bg-[#2c3e6b] text-white",
  Functional: "bg-[#6f4e37] text-white",
  Tooling: "bg-[#4a3728] text-white",
  Security: "bg-[#111111] text-white",
  Performance: "bg-[#3d5275] text-white",
};

// ============================================================
// NAV COMPONENT
// Think of this like the table of contents at the top of the
// page. Clicking a link smoothly scrolls to that section.
// ============================================================
function Nav() {
  // useState is like a light switch — it remembers whether
  // the mobile menu is open (true) or closed (false).
  const [menuOpen, setMenuOpen] = useState(false);

  // scrollTo is a helper that finds a section by its ID and
  // scrolls the page to it — same as clicking an anchor link
  // but we can also close the mobile menu at the same time.
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const links = ["About", "Skills", "Projects", "Certificates", "Contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/8">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand name */}
        <button
          onClick={() => scrollTo("hero")}
          className="font-['DM_Serif_Display'] text-xl text-[#111111] tracking-tight"
        >
          Dav3<span className="text-[#6f4e37] mx-2">·</span>QA
        </button>

        {/* Desktop navigation links — hidden on mobile, visible on medium screens+ */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="text-sm text-[#6b6b6b] hover:text-[#111111] transition-colors duration-200 font-medium tracking-wide"
            >
              {link}
            </button>
          ))}
        </div>

        {/* CTA button in nav — desktop only */}
        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:block text-sm bg-[#1b2a4a] text-white px-5 py-2 rounded hover:bg-[#253669] transition-colors duration-200 font-medium"
        >
          Hire Me
        </button>

        {/* Hamburger menu button — mobile only */}
        <button
          className="md:hidden text-[#111111]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown menu — only shown when menuOpen is true */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-black/8 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="text-left text-sm text-[#6b6b6b] hover:text-[#111111] transition-colors font-medium"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="text-sm bg-[#1b2a4a] text-white px-5 py-2 rounded font-medium text-left"
          >
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
}

// ============================================================
// HERO SECTION
// This is the first thing visitors see — like the cover of a
// book. It introduces you and gives two action buttons.
// ============================================================
function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-white pt-16"
    >
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* Left column — text content */}
        <div>
          {/* Small label above name — like a subtitle on a book cover */}
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6f4e37] mb-4">
            QA Engineer · Frontend Developer · UI/UX Designer
          </p>

          {/* Main heading — the name */}
          <h1 className="font-['DM_Serif_Display'] text-4xl md:text-5xl leading-tight text-[#111111] mb-6">
            Domingo Tomiwa David
          </h1>

          {/* Short intro paragraph */}
          <p className="text-lg text-[#6b6b6b] leading-relaxed mb-8 max-w-md">
            I build and break software — crafting clean, responsive interfaces
            as a frontend developer while applying rigorous QA thinking to make
            sure every release meets the highest standard of quality.
          </p>

          {/* Call-to-action buttons — like the "front door" of the portfolio */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("projects")}
              className="bg-[#1b2a4a] text-white px-7 py-3 rounded text-sm font-semibold hover:bg-[#253669] transition-colors duration-200"
            >
              View My Work
            </button>
            <a
              href="https://dave-portfolio-azure.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#6f4e37] text-[#6f4e37] px-7 py-3 rounded text-sm font-semibold hover:bg-[#f3f0eb] transition-colors duration-200"
            >
              Frontend Portfolio ↗
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="border border-[#1b2a4a] text-[#1b2a4a] px-7 py-3 rounded text-sm font-semibold hover:bg-[#f3f0eb] transition-colors duration-200"
            >
              Get in Touch
            </button>
          </div>

          {/* Small trust signals — like stars on a product listing */}
          <div className="mt-12 flex gap-8">
            {[
              { value: "15+", label: "Projects Completed" },
              { value: "2-in-1", label: "Dev + QA Skills" },
              { value: "100%", label: "Defect Documentation" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-['DM_Serif_Display'] text-2xl text-[#111111]">
                  {stat.value}
                </p>
                <p className="text-xs text-[#6b6b6b] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — decorative card panel */}
        <div className="hidden md:block">
          <div className="bg-[#f9f8f6] border border-black/8 rounded-lg p-8 relative">
            {/* Accent bar at the top — like a colour stripe on a business card */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#6f4e37] rounded-t-lg" />

            <p className="text-xs font-semibold tracking-widest uppercase text-[#6b6b6b] mb-6">
              Current Focus
            </p>

            {/* List of current activities */}
            {[
              "Frontend dev with React & UI/UX design",
              "Test automation with Python & Selenium",
              "API contract validation",
              "Defect lifecycle management",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 mb-4">
                <CheckCircle
                  size={16}
                  className="text-[#6f4e37] mt-0.5 shrink-0"
                />
                <span className="text-sm text-[#111111]">{item}</span>
              </div>
            ))}

            <div className="mt-8 pt-6 border-t border-black/8">
              <p className="text-xs text-[#6b6b6b] mb-1">Open to opportunities</p>
              <div className="flex items-center gap-2">
                {/* Green dot — like an "online" indicator on a messaging app */}
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                <span className="text-sm font-medium text-[#111111]">
                  Available for freelance & full-time
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — a gentle nudge to keep reading */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#6b6b6b]">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}

// ============================================================
// ABOUT SECTION
// Like the "About the Author" page in a book. It tells your
// story, what you believe in, and what drives you.
// ============================================================
function About() {
  return (
    <section id="about" className="bg-[#f9f8f6] py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left — decorative element with numbers */}
        <div className="order-2 md:order-1">
          <div className="border-l-4 border-[#6f4e37] pl-8">
            <p className="font-['DM_Serif_Display'] text-4xl text-[#111111] mb-2">
              Finding the bug
            </p>
            <p className="font-['DM_Serif_Display'] text-4xl text-[#6f4e37] italic">
              before your users do.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6">
            {/* Stat boxes — like widgets on a dashboard */}
            {[
              { n: "15+", label: "Test Projects" },
              { n: "200+", label: "Bugs Documented" },
              { n: "3", label: "Testing Certifications" },
              { n: "5+", label: "Tools & Frameworks" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white border border-black/8 rounded p-5"
              >
                <p className="font-['DM_Serif_Display'] text-3xl text-[#1b2a4a]">
                  {s.n}
                </p>
                <p className="text-xs text-[#6b6b6b] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — text content */}
        <div className="order-1 md:order-2">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6f4e37] mb-3">
            About Me
          </p>
          <h2 className="font-['DM_Serif_Display'] text-4xl text-[#111111] mb-6">
            Quality is not an accident
          </h2>
          <div className="space-y-4 text-[#6b6b6b] leading-relaxed">
            <p>
              I am Domingo Tomiwa David — a frontend developer, UI/UX designer, and QA engineer
              who brings both a builder's and a breaker's mindset to every
              project. I craft clean, responsive interfaces and then put them
              through their paces to make sure they hold up under real-world
              conditions.
            </p>
            <p>
              My frontend work spans React, modern CSS, and user-centred design.
              On the QA side I handle manual exploratory testing, structured
              test-case design, API validation, and introductory automation —
              giving me a rare end-to-end view of the software delivery process.
            </p>
            <p>
              I believe that the best QA engineers understand how software is
              built, and the best developers understand how it breaks. That
              dual perspective is what I bring to every team I work with.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SKILLS SECTION
// Like a CV skills section, but displayed as visual cards
// so it is easier to scan at a glance.
// ============================================================
function Skills() {
  return (
    <section id="skills" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header — reused pattern across all sections */}
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6f4e37] mb-3">
            What I Bring
          </p>
          <h2 className="font-['DM_Serif_Display'] text-4xl text-[#111111]">
            Core Skills
          </h2>
        </div>

        {/* Skills grid — 1 column on mobile, 2 on tablet, 3 on desktop */}
        {/* Like a grid of product boxes in a shop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skill) => {
            // skill.icon is a Lucide icon component — we render it like a regular element
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="bg-[#f9f8f6] border border-black/8 rounded-lg p-6 hover:border-[#6f4e37]/40 transition-colors duration-200 group"
              >
                {/* Icon with coffee-brown background circle */}
                <div className="w-10 h-10 rounded bg-[#6f4e37]/10 flex items-center justify-center mb-4 group-hover:bg-[#6f4e37]/20 transition-colors duration-200">
                  <Icon size={20} className="text-[#6f4e37]" />
                </div>
                <h3 className="font-semibold text-[#111111] mb-2 text-sm">
                  {skill.name}
                </h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            );
          })}

          {/* Extra card that spans full width on some layouts — shows the tools */}
          <div className="bg-[#1b2a4a] rounded-lg p-6 sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-4">
              Tools & Tech
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Python",
                "Selenium",
                "pytest",
                "Postman",
                "Jira",
                "SQL",
                "Git",
                "JMeter",
                "OWASP",
                "REST APIs",
                "JSON Schema",
                "Excel",
              ].map((tool) => (
                // Each tool is a small pill badge — like a hashtag on social media
                <span
                  key={tool}
                  className="text-xs bg-white/10 text-white px-3 py-1 rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PROJECT CARD COMPONENT
// This is a reusable card for one project. Think of it like
// a postcard template — we fill in different text each time.
// ============================================================
function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  // showDetail controls whether the card is "flipped" to show extra info.
  // True = expanded, False = collapsed. Starts as false.
  const [showDetail, setShowDetail] = useState(false);

  const tagClass = TAG_COLORS[project.tag] || "bg-gray-200 text-gray-800";

  return (
    <div className="bg-[#f9f8f6] border border-black/8 rounded-lg overflow-hidden hover:border-[#6f4e37]/40 transition-all duration-200 flex flex-col">
      {/* Card header — always visible */}
      <div className="p-6 flex-1">
        {/* Project number + tag — like a catalogue entry */}
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-mono text-[#6b6b6b]">
            {String(project.id).padStart(2, "0")}
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagClass}`}>
            {project.tag}
          </span>
        </div>

        <h3 className="font-['DM_Serif_Display'] text-lg text-[#111111] mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-[#6b6b6b] leading-relaxed">
          {project.problem}
        </p>

        {/* Expandable detail section — only rendered when showDetail is true */}
        {showDetail && (
          <div className="mt-4 space-y-3 border-t border-black/8 pt-4">
            <div>
              <p className="text-xs font-semibold text-[#111111] mb-1">
                What was tested
              </p>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                {project.tested}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#111111] mb-1">
                Tools & concepts
              </p>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                {project.tools}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#6f4e37] mb-1">
                Outcome
              </p>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                {project.result}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Card footer — toggle button that shows/hides the detail section */}
      <button
        onClick={() => setShowDetail(!showDetail)}
        className="w-full px-6 py-3 border-t border-black/8 text-xs font-semibold text-[#6b6b6b] hover:text-[#111111] hover:bg-white transition-colors duration-200 flex items-center justify-between"
      >
        <span>{showDetail ? "Hide details" : "View details"}</span>
        <ExternalLink size={12} className={showDetail ? "opacity-0" : ""} />
      </button>
    </div>
  );
}

// ============================================================
// PROJECTS SECTION
// Renders all 15 project cards using a JavaScript .map()
// loop — like a printer printing the same card template 15
// times but with different words each time.
// ============================================================
function Projects() {
  // activeTag stores which filter button the user clicked.
  // "" means "All" — show every project.
  const [activeTag, setActiveTag] = useState("");

  // Unique tags extracted from all projects — used for the filter buttons
  const allTags = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.tag)))];

  // Filtered list: if "All" is selected show everything, otherwise show only
  // projects whose tag matches the selected one.
  const filtered =
    activeTag === "" || activeTag === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tag === activeTag);

  return (
    <section id="projects" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6f4e37] mb-3">
            My Work
          </p>
          <h2 className="font-['DM_Serif_Display'] text-4xl text-[#111111] mb-8">
            Project Showcase
          </h2>

          {/* Filter pills — like category tabs in an app store */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === "All" ? "" : tag)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-colors duration-200 ${
                  (activeTag === "" && tag === "All") || activeTag === tag
                    ? "bg-[#1b2a4a] text-white border-[#1b2a4a]"
                    : "bg-white text-[#6b6b6b] border-black/10 hover:border-[#1b2a4a]/40"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid — 1 column → 2 → 3 as screen grows */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CERTIFICATES SECTION
// Like a wall of framed certificates in an office.
// The user can also upload their own certificate files here.
// ============================================================

// Type that describes what a certificate object looks like in our app.
// Think of it like a label on a folder: it must have these fields.
type Certificate = {
  id: number;
  name: string;
  issuer: string;
  year: string;
  description: string;
  image?: string;
  // uploadedFile stores the browser's File object if the user uploads one
  uploadedFile?: File;
  // previewUrl is a temporary web address created for the uploaded file
  previewUrl?: string;
};

function Certificates() {
  // Initial certificate data — like pre-filled cards in a display case
  const [certs, setCerts] = useState<Certificate[]>([
    {
      id: 1,
      name: "Python Programming Certification",
      issuer: "Mimo",
      year: "2025",
      description:
        "Completed a comprehensive Python programming course covering core concepts, data structures, and practical coding exercises.",
      image: "/certs/python-cert.jpg",
    },
    {
      id: 2,
      name: "Game Development with AI Certification",
      issuer: "Mimo",
      year: "2025",
      description:
        "Completed a course focused on AI-assisted game development and building interactive experiences with Python.",
      image: "/certs/gamedev-cert.jpg",
    },
    {
      id: 3,
      name: "Digital Entrepreneurship Training",
      issuer: "La Plage Meta Verse",
      year: "2023",
      description:
        "Completed Digital Entrepreneurship Level 1 training and earned recognition for business and digital growth fundamentals.",
      image: "/certs/entrepreneurship-cert.jpg",
    },
  ]);

  // Which certificate the user is currently previewing (null = none)
  const [previewing, setPreviewing] = useState<Certificate | null>(null);

  // useRef is like putting a sticky note on the hidden file-input element
  // so we can trigger it (open the file picker) from a button click.
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({});

  // Called when the user picks a file from their computer.
  // certId tells us which certificate this upload belongs to.
  const handleUpload = (certId: number, file: File) => {
    // URL.createObjectURL creates a temporary browser URL for the file
    // — like a temporary link that only works in this browser session.
    const url = URL.createObjectURL(file);

    // Update the certificate in our list by replacing its entry
    // with a new one that includes the file and preview URL.
    setCerts((prev) =>
      prev.map((c) =>
        c.id === certId
          ? { ...c, uploadedFile: file, previewUrl: url }
          : c
      )
    );
  };

  return (
    <section id="certificates" className="bg-[#f9f8f6] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6f4e37] mb-3">
            Credentials
          </p>
          <h2 className="font-['DM_Serif_Display'] text-4xl text-[#111111] mb-2">
            Certificates
          </h2>
          <p className="text-sm text-[#6b6b6b]">
            Your credentials appear here with the same framed-preview feel as the other portfolio site.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {certs.map((cert) => {
            const mediaSrc = cert.previewUrl || cert.image;
            const hasMedia = Boolean(mediaSrc);

            return (
              <div
                key={cert.id}
                className="bg-white border border-black/8 rounded-lg overflow-hidden shadow-sm"
              >
                {/* Certificate display area — like a photo frame */}
                <div className="h-56 bg-[#f3f0eb] border-b border-black/8 p-3">
                  {hasMedia ? (
                    <div className="w-full h-full overflow-hidden rounded-md bg-white">
                      <img
                        src={mediaSrc}
                        alt={cert.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-[#6b6b6b]">
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#6b6b6b]/30 flex items-center justify-center">
                        <FileText size={22} className="text-[#6b6b6b]/50" />
                      </div>
                      <p className="mt-3 text-xs">No certificate preview</p>
                    </div>
                  )}
                </div>

                {/* Certificate info */}
                <div className="p-5">
                  <div className="w-8 h-0.5 bg-[#6f4e37] mb-3" />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-['DM_Serif_Display'] text-lg text-[#111111] mb-1">
                        {cert.name}
                      </h3>
                      <p className="text-xs text-[#6b6b6b]">
                        {cert.issuer} · {cert.year}
                      </p>
                    </div>
                    {hasMedia && (
                      <button
                        onClick={() => setPreviewing(cert)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#1b2a4a] hover:underline"
                      >
                        <Eye size={12} />
                        View
                      </button>
                    )}
                  </div>
                  <p className="mt-3 text-xs leading-5 text-[#6b6b6b]">
                    {cert.description}
                  </p>

                  {/* Hidden file input — like a backstage door; the button below opens it */}
                  <input
                    ref={(el) => {
                      fileRefs.current[cert.id] = el;
                    }}
                    type="file"
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(cert.id, file);
                    }}
                  />

                  {/* Upload button — clicking this triggers the hidden file input */}
                  <button
                    onClick={() => fileRefs.current[cert.id]?.click()}
                    className="mt-4 w-full flex items-center justify-center gap-2 border border-dashed border-[#6b6b6b]/30 rounded py-2.5 text-xs font-semibold text-[#6b6b6b] hover:border-[#6f4e37] hover:text-[#6f4e37] transition-colors duration-200"
                  >
                    <Upload size={13} />
                    {cert.previewUrl ? "Replace file" : "Upload certificate"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Preview modal — appears over the page when the user clicks View */}
      {previewing && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setPreviewing(null)}
        >
          <div
            className="bg-white rounded-lg overflow-hidden max-w-3xl w-full max-h-[90vh] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/8">
              <div>
                <p className="font-semibold text-sm text-[#111111]">
                  {previewing.name}
                </p>
                <p className="text-xs text-[#6b6b6b] mt-1">
                  {previewing.issuer} · {previewing.year}
                </p>
              </div>
              <button
                onClick={() => setPreviewing(null)}
                className="text-[#6b6b6b] hover:text-[#111111] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Preview area — renders PDF or image depending on file type */}
            <div className="overflow-auto max-h-[75vh] bg-[#f9f8f6] p-4">
              {previewing.uploadedFile?.type === "application/pdf" ? (
                <iframe
                  src={previewing.previewUrl}
                  className="w-full h-[70vh] rounded"
                  title={previewing.name}
                />
              ) : (
                <img
                  src={previewing.previewUrl || previewing.image}
                  alt={previewing.name}
                  className="w-full max-h-[70vh] object-contain rounded"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================
// CONTACT FORM — Formspree-powered
// Formspree works like a postbox: when the form is submitted,
// Formspree catches the data and emails it to your Gmail.
// Replace YOUR_FORM_ID with the ID from formspree.io.
// ============================================================
const FORMSPREE_ID = "YOUR_FORM_ID"; // ← swap this after signing up at formspree.io

function ContactForm() {
  // "idle" = waiting, "sending" = request in flight,
  // "success" = email sent, "error" = something went wrong
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // fetch() sends the form data to Formspree's server over the internet.
      // Think of it like dropping a letter in a postbox — Formspree then
      // forwards that letter to domingodavid1701@gmail.com.
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
        <div className="w-14 h-14 rounded-full bg-[#6f4e37]/20 flex items-center justify-center">
          <CheckCircle size={28} className="text-[#6f4e37]" />
        </div>
        <p className="font-['DM_Serif_Display'] text-2xl text-white">Message received!</p>
        <p className="text-sm text-[#8fa0c2]">
          Thanks for reaching out. Domingo will get back to you at{" "}
          <span className="text-white">domingodavid1701@gmail.com</span> shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs text-[#6f4e37] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-white/60 block mb-1.5">
          Your Name
        </label>
        {/* name="name" is how Formspree labels the field in the email it sends you */}
        <input
          type="text"
          name="name"
          required
          placeholder="Jane Smith"
          className="w-full bg-white/10 text-white placeholder-white/30 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#6f4e37] transition-colors"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-white/60 block mb-1.5">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="jane@company.com"
          className="w-full bg-white/10 text-white placeholder-white/30 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#6f4e37] transition-colors"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-white/60 block mb-1.5">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Tell me about your project or role..."
          className="w-full bg-white/10 text-white placeholder-white/30 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#6f4e37] transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-xs text-red-400">
          Something went wrong. Please email directly at domingodavid1701@gmail.com
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[#6f4e37] text-white py-3 rounded text-sm font-semibold hover:bg-[#5c4030] transition-colors duration-200 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

// ============================================================
// CONTACT SECTION
// The final room — where visitors reach out. Like a reception
// desk at the end of a showroom.
// ============================================================
function Contact() {
  return (
    <section id="contact" className="bg-[#1b2a4a] py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left — message */}
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6f4e37] mb-3">
            Get in Touch
          </p>
          <h2 className="font-['DM_Serif_Display'] text-4xl text-white mb-4">
            Let's work together
          </h2>
          <p className="text-[#8fa0c2] leading-relaxed mb-8">
            Whether you need a frontend developer who can also QA their own
            work, a dedicated tester for your release, or a UI/UX designer who
            thinks in user flows and edge cases — I am here to help.
          </p>

          {/* Contact links */}
          <div className="space-y-4">
            {[
              {
                icon: Mail,
                label: "domingodavid1701@gmail.com",
                href: "mailto:domingodavid1701@gmail.com",
              },
              {
                icon: Github,
                label: "github.com/Dav3",
                href: "#",
              },
              {
                icon: Linkedin,
                label: "linkedin.com/in/dav3",
                href: "#",
              },
              {
                icon: ExternalLink,
                label: "Frontend Portfolio ↗",
                href: "https://dave-portfolio-azure.vercel.app/",
              },
            ].map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 text-sm text-[#8fa0c2] hover:text-white transition-colors duration-200"
                >
                  <Icon size={16} className="text-[#6f4e37]" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Right — contact form wired to Formspree */}
        {/*
          HOW EMAIL NOTIFICATIONS WORK:
          Formspree is a free service that acts like a postbox between your
          website and your Gmail. When someone fills in this form and clicks
          Send, Formspree receives the data and immediately forwards it to
          domingodavid1701@gmail.com as an email notification.

          TO ACTIVATE (one-time, free):
          1. Go to https://formspree.io and sign up with domingodavid1701@gmail.com
          2. Click "New Form", name it "Portfolio Contact"
          3. Copy the form ID from the endpoint URL (looks like: xpwzabcd)
          4. Replace YOUR_FORM_ID below with that ID
          That's it — every submission will land in your Gmail inbox.
        */}
        <ContactForm />
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// The very bottom of the page — like the back cover of a book.
// ============================================================
function Footer() {
  return (
    <footer className="bg-[#111111] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-['DM_Serif_Display'] text-white text-lg">
          Dav3<span className="text-[#6f4e37] mx-2">·</span>QA
        </p>
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Domingo Tomiwa David · QA Engineer & Frontend Developer
        </p>
      </div>
    </footer>
  );
}

// ============================================================
// APP — Root component
// Think of this as the outer shell of the building that holds
// all the rooms together in the right order.
// ============================================================
export default function App() {
  return (
    // font-['Inter'] applies the Inter font family to all text inside
    <div className="font-['Inter'] min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
