import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding MongoDB database...");

  // Upsert categories
  const categoriesData = [
    { name: "Development", slug: "development", description: "Full stack, frontend, and backend engineering", icon: "💻", order: 1 },
    { name: "Data & AI", slug: "data-ai", description: "Data science, analytics, and artificial intelligence", icon: "🔬", order: 2 },
    { name: "Marketing", slug: "marketing", description: "Digital marketing and growth strategies", icon: "📈", order: 3 },
    { name: "Design", slug: "design", description: "UI/UX and visual design", icon: "🎨", order: 4 },
    { name: "Infrastructure", slug: "infrastructure", description: "Cloud and DevOps engineering", icon: "☁️", order: 5 },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log("✅ Categories created");

  const allCategories = await prisma.category.findMany();
  const categoryMap: Record<string, string> = {};
  for (const cat of allCategories) {
    categoryMap[cat.name] = cat.id;
  }

  const courses = [
    {
      slug: "frontend",
      title: "Frontend Development",
      tagline: "Craft Production-Ready Interfaces",
      description: "Master modern frontend development with React 19, TypeScript, state management, performance optimization, and testing. Build applications that scale.",
      categoryName: "Development",
      level: "Intermediate",
      price: 7999,
      originalPrice: 14999,
      duration: "12 Weeks",
      modulesCount: 32,
      studentsCount: 18923,
      rating: 4.9,
      icon: "⚡",
      colorFrom: "#0ea5e9",
      colorTo: "#2563eb",
      accentHex: "#0ea5e9",
      badgeClass: "badge-blue",
      highlights: ["React 19 & Hooks", "TypeScript Integration", "State Management (Zustand/Redux)", "Unit & E2E Testing", "Performance Optimization", "CI/CD Deployment"],
      skills: ["React", "TypeScript", "Next.js", "Redux", "Jest", "Vite"],
      curriculum: [
        { title: "JavaScript Mastery", topics: ["ES2024+ Features", "Async/Await & Promises", "Closures & Prototypes", "Event Loop & Microtasks", "Module Systems"], duration: "3 Weeks" },
        { title: "React Fundamentals", topics: ["Components & JSX", "Props, State & Refs", "All React Hooks", "Context API", "React Router v6"], duration: "3 Weeks" },
        { title: "Advanced React Patterns", topics: ["Performance with Memo", "Custom Hooks Library", "Suspense & Concurrent", "Server Components"], duration: "3 Weeks" },
        { title: "Production Engineering", topics: ["TypeScript Deep Dive", "Jest & Testing Library", "Playwright E2E", "Deployment & CI/CD"], duration: "3 Weeks" },
      ],
      faqs: [
        { question: "What prerequisites do I need?", answer: "HTML, CSS, and basic JavaScript. You should be comfortable writing simple scripts before enrolling." },
        { question: "Is React the right choice?", answer: "React has the highest enterprise demand. 70%+ of senior frontend roles require React expertise." },
        { question: "Do you teach TypeScript?", answer: "TypeScript is fully integrated from module 3 onwards, matching real production codebases." },
        { question: "What will I build?", answer: "5 production-level apps: e-commerce, social dashboard, real-time chat, portfolio, and a SaaS landing." },
      ],
      instructorName: "Mohit Sangwan",
      instructorTitle: "Sr Frontend Developer",
      instructorInitials: "MS",
      instructorAvatarColor: "#0ea5e9",
    },
    {
      slug: "digital-marketing",
      title: "Digital Marketing",
      tagline: "Grow Brands in the Digital Age",
      description: "Comprehensive digital marketing covering SEO, Google Ads, social media strategy, email automation, conversion optimization, and data-driven growth techniques.",
      categoryName: "Marketing",
      level: "All Levels",
      price: 4999,
      originalPrice: 9999,
      duration: "8 Weeks",
      modulesCount: 24,
      studentsCount: 22104,
      rating: 4.7,
      icon: "📈",
      colorFrom: "#f43f5e",
      colorTo: "#e11d48",
      accentHex: "#f43f5e",
      badgeClass: "badge-rose",
      highlights: ["Technical SEO", "Google Ads (Search & Display)", "Meta Ads Manager", "Email Automation", "GA4 Analytics", "Growth Hacking"],
      skills: ["SEO", "Google Analytics 4", "Facebook Ads", "Email Marketing", "Content Strategy", "CRO"],
      curriculum: [
        { title: "Digital Marketing Foundations", topics: ["Marketing Funnel Strategy", "Buyer Personas", "Channel Selection", "Brand Positioning"], duration: "2 Weeks" },
        { title: "SEO & Content Marketing", topics: ["Keyword Research & Strategy", "On-page & Technical SEO", "Link Building", "Content Calendar"], duration: "2 Weeks" },
        { title: "Paid Advertising", topics: ["Google Search & Display Ads", "Meta Ads Manager", "LinkedIn Campaigns", "Retargeting Funnels"], duration: "2 Weeks" },
        { title: "Analytics & Growth", topics: ["GA4 Deep Dive", "Conversion Rate Optimization", "A/B & Multivariate Testing", "Growth Experiments"], duration: "2 Weeks" },
      ],
      faqs: [
        { question: "Is this course for complete beginners?", answer: "Yes. We start from strategy basics but also cover advanced techniques that experienced marketers will value." },
        { question: "Will I run real campaigns?", answer: "Yes! You'll work with live ad accounts and real budgets as part of practical assignments." },
        { question: "Which tools are taught?", answer: "GA4, Google Ads, Meta Business Suite, SEMrush, Mailchimp, Hotjar, and more." },
        { question: "What about job placement?", answer: "Digital marketing is one of the fastest-growing fields. Our career support has a 78% placement rate within 3 months." },
      ],
      instructorName: "Mr. Ankit Kumar",
      instructorTitle: "Growth Marketing Leader",
      instructorInitials: "SK",
      instructorAvatarColor: "#f43f5e",
    },
    {
      slug: "data-science",
      title: "Data Science",
      tagline: "Unlock Intelligence from Data",
      description: "Complete data science program—Python, statistics, machine learning, deep learning, NLP, and model deployment. Work with real industry datasets from day one.",
      categoryName: "Data & AI",
      level: "Intermediate",
      price: 11999,
      originalPrice: 22999,
      duration: "16 Weeks",
      modulesCount: 40,
      studentsCount: 8934,
      rating: 4.9,
      icon: "🔬",
      colorFrom: "#7c3aed",
      colorTo: "#6d28d9",
      accentHex: "#7c3aed",
      badgeClass: "badge-violet",
      highlights: ["Python for Data", "Statistical Analysis", "Machine Learning", "Deep Learning", "NLP & Text Mining", "Model Deployment"],
      skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "SQL"],
      curriculum: [
        { title: "Python & Data Engineering", topics: ["Python Fundamentals", "NumPy & Pandas", "Data Cleaning & Wrangling", "SQL for Analysis"], duration: "4 Weeks" },
        { title: "Statistics & EDA", topics: ["Descriptive Statistics", "Probability Theory", "Hypothesis Testing", "Advanced Visualization"], duration: "4 Weeks" },
        { title: "Machine Learning", topics: ["Supervised Algorithms", "Unsupervised Learning", "Ensemble Methods", "Feature Engineering"], duration: "4 Weeks" },
        { title: "Deep Learning & Deployment", topics: ["Neural Networks", "NLP with Transformers", "Model Serving APIs", "MLOps Fundamentals"], duration: "4 Weeks" },
      ],
      faqs: [
        { question: "Do I need a math background?", answer: "Basic algebra helps but we teach all required statistics and linear algebra from scratch." },
        { question: "Is Python experience necessary?", answer: "No. We start Python from zero assuming no programming background whatsoever." },
        { question: "What projects are included?", answer: "Churn prediction, recommendation engine, NLP sentiment analysis, and a time-series forecasting system." },
        { question: "How does this compare to a degree?", answer: "Our curriculum is entirely industry-focused. Many graduates land roles purely on portfolio strength." },
      ],
      instructorName: "Ashutosh Kumar",
      instructorTitle: "Data Science Director",
      instructorInitials: "AK",
      instructorAvatarColor: "#7c3aed",
    },
    {
      slug: "full-stack",
      title: "Full Stack Development",
      tagline: "Build & Ship Complete Web Applications",
      description: "The definitive full stack program. Master frontend, backend, databases, and DevOps. Build production applications used by real users with industry mentorship.",
      categoryName: "Development",
      level: "All Levels",
      price: 14999,
      originalPrice: 29999,
      duration: "24 Weeks",
      modulesCount: 64,
      studentsCount: 31247,
      rating: 4.9,
      icon: "💻",
      colorFrom: "#2563eb",
      colorTo: "#7c3aed",
      accentHex: "#2563eb",
      badgeClass: "badge-blue",
      highlights: ["Frontend with React & Next.js", "Node.js Backend APIs", "PostgreSQL & MongoDB", "System Design", "Docker & AWS", "Career Placement Support"],
      skills: ["React", "Next.js", "Node.js", "MongoDB", "PostgreSQL", "Docker"],
      curriculum: [
        { title: "Frontend Engineering", topics: ["HTML & CSS Mastery", "JavaScript & TypeScript", "React & Next.js", "UI Component Architecture"], duration: "8 Weeks" },
        { title: "Backend Engineering", topics: ["Node.js & Express", "REST & GraphQL APIs", "Authentication Systems", "Database Design"], duration: "6 Weeks" },
        { title: "Infrastructure & Cloud", topics: ["PostgreSQL & Redis", "Docker Containers", "AWS Services", "CI/CD Pipelines"], duration: "6 Weeks" },
        { title: "Capstone & Career", topics: ["System Design Interviews", "Portfolio Projects", "Resume & LinkedIn", "Mock Interviews"], duration: "4 Weeks" },
      ],
      faqs: [
        { question: "Suitable for absolute beginners?", answer: "Yes! We start from zero HTML and take you to deploying scalable apps on cloud infrastructure." },
        { question: "What is the job placement rate?", answer: "85% of full-stack graduates receive offers within 6 months. Average fresher package: ₹8-12 LPA." },
        { question: "How many hours per week?", answer: "15-20 hours per week to complete comfortably in 24 weeks. Recordings available for flexible pacing." },
        { question: "Is mentor support included?", answer: "Weekly 1-on-1 mentor sessions, daily doubt resolution, and a dedicated Slack community of 15,000+ learners." },
      ],
      instructorName: "Rohit Gupta",
      instructorTitle: "Engineering Manager at Microsoft",
      instructorInitials: "RG",
      instructorAvatarColor: "#2563eb",
    },
    {
      slug: "data-analyst",
      title: "Data Analytics",
      tagline: "Turn Raw Data into Business Decisions",
      description: "Master data analysis with Excel, SQL, Power BI, Tableau, and Python. Extract insights, build dashboards, and tell data stories that drive executive decisions.",
      categoryName: "Data & AI",
      level: "Beginner",
      price: 5999,
      originalPrice: 11999,
      duration: "10 Weeks",
      modulesCount: 28,
      studentsCount: 15672,
      rating: 4.8,
      icon: "📊",
      colorFrom: "#f59e0b",
      colorTo: "#d97706",
      accentHex: "#f59e0b",
      badgeClass: "badge-amber",
      highlights: ["Advanced Excel", "SQL Query Mastery", "Power BI Dashboards", "Tableau Visualizations", "Python Analytics", "Storytelling with Data"],
      skills: ["Excel", "SQL", "Power BI", "Tableau", "Python", "Looker Studio"],
      curriculum: [
        { title: "Data Foundations", topics: ["Advanced Excel Functions", "SQL Fundamentals", "Business Metrics & KPIs", "Data Types & Quality"], duration: "2.5 Weeks" },
        { title: "Advanced SQL", topics: ["Complex Joins & Subqueries", "Window Functions", "CTEs & Optimization", "Database Design Basics"], duration: "2.5 Weeks" },
        { title: "Business Intelligence", topics: ["Power BI End-to-End", "Tableau Dashboards", "Dashboard Design Principles", "Data Storytelling"], duration: "2.5 Weeks" },
        { title: "Python Analytics", topics: ["Pandas & Matplotlib", "Statistical Analysis", "Business Case Projects", "Presentation Skills"], duration: "2.5 Weeks" },
      ],
      faqs: [
        { question: "What salary can I expect?", answer: "Entry-level analysts in India earn ₹4-8 LPA. Senior analysts earn ₹12-20 LPA. International roles pay significantly more." },
        { question: "Is Excel still relevant?", answer: "Absolutely. Advanced Excel remains the most used tool in business analytics globally." },
        { question: "Do I need programming knowledge?", answer: "No. We introduce Python analytically—no prior coding experience needed." },
        { question: "Will I build a portfolio?", answer: "4 end-to-end analysis projects across e-commerce, finance, HR, and healthcare domains." },
      ],
      instructorName: "Ashutosh Kumar",
      instructorTitle: "Senior Analytics Manager at Amazon",
      instructorInitials: "AK",
      instructorAvatarColor: "#f59e0b",
    },
  ];

  for (const course of courses) {
    const { categoryName, ...courseData } = course;
    const categoryId = categoryMap[categoryName];
    if (!categoryId) {
      console.error(`❌ Category not found: ${categoryName}`);
      continue;
    }
    await prisma.course.upsert({
      where: { slug: courseData.slug },
      update: {},
      create: { ...courseData, categoryId },
    });
  }

  console.log("✅ Courses seeded");

  // Admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "admin123",
    12
  );
  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@skillsboost.in" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@skillsboost.in",
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log("✅ Admin user created");

  // Default SiteSettings
  const existingSettings = await prisma.siteSettings.findFirst();
  if (!existingSettings) {
    await prisma.siteSettings.create({
      data: {
        siteName: "SkillsBoost",
        siteUrl: "https://skillsboost.in",
        defaultTitle: "Skills Boost — Learn Digital, Earn Digital",
        defaultDescription: "Master in-demand tech skills with Skills Boost. Industry-grade courses in Full Stack, Data Science, AI/ML, UI/UX, Digital Marketing & more.",
        phone: "+91 9650249028",
        email: "info@skillsboost.in",
        address: "NM22, 2nd Floor, M Block Old DLF Colony, Sector 14",
        city: "Gurugram",
        state: "Haryana",
        country: "IN",
        postalCode: "122007",
        latitude: 28.4595,
        longitude: 77.0266,
        socialLinks: {},
        themeColor: "#2563eb",
      },
    });
    console.log("✅ Default SiteSettings created");
  }

  // Default PageSEO for static pages
  const staticPages = [
    { pageName: "home", metaTitle: "Skills Boost — Learn Digital, Earn Digital", metaDescription: "Master in-demand tech skills with Skills Boost. Industry-grade courses in Full Stack, Data Science, AI/ML, UI/UX, Digital Marketing & more.", canonicalUrl: "https://skillsboost.in", robots: "index, follow" },
    { pageName: "courses", metaTitle: "All Courses — Full Stack, Data Science, AI & More | SkillsBoost", metaDescription: "Browse industry-grade courses. Full Stack, Data Science, AI/ML, UI/UX, Digital Marketing & more. Enroll today.", canonicalUrl: "https://skillsboost.in/courses", robots: "index, follow" },
    { pageName: "about", metaTitle: "About SkillsBoost — Our Mission, Team & Story", metaDescription: "SkillsBoost was founded to democratize world-class tech education. Learn about our mission, values, and community.", canonicalUrl: "https://skillsboost.in/about", robots: "index, follow" },
    { pageName: "contact", metaTitle: "Contact Us — SkillsBoost", metaDescription: "Get in touch with the SkillsBoost team. We're here to help you pick the right course and support your learning journey.", canonicalUrl: "https://skillsboost.in/contact", robots: "index, follow" },
    { pageName: "privacy", metaTitle: "Privacy Policy — SkillsBoost", metaDescription: "SkillsBoost privacy policy. Learn how we collect, use, and protect your personal information.", canonicalUrl: "https://skillsboost.in/privacy-policy", robots: "index, follow" },
    { pageName: "terms", metaTitle: "Terms & Conditions — SkillsBoost", metaDescription: "Read SkillsBoost terms and conditions for using our educational platform and services.", canonicalUrl: "https://skillsboost.in/terms-conditions", robots: "index, follow" },
  ];

  for (const page of staticPages) {
    await prisma.pageSEO.upsert({
      where: { pageName: page.pageName },
      update: {},
      create: page,
    });
  }

  console.log("✅ Default PageSEO created");

  console.log("🎉 Seeding complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
