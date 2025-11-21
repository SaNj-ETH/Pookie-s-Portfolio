export const portfolioData = {
    personal: {
        name: "Shilpa Sundrani",
        headline: "Software Engineer | Full Stack Developer",
        summary: "Innovative Software Engineer with over 5 years of experience in designing and developing scalable web applications. Expert in React, Node.js, and cloud architectures, with a passion for creating immersive, user-centric digital experiences. Proven track record of leading frontend teams and optimizing application performance.",
        email: "shilpa.sundrani@example.com", // Placeholder as per privacy
        linkedin: "https://www.linkedin.com/in/shilpasundrani/",
        resumeUrl: "https://drive.google.com/file/d/1p7-Ja6xOLIVEo822FOFbpLwf3m-5Wc4V/view?usp=sharing"
    },
    experience: [
        {
            id: 1,
            role: "Senior Software Engineer",
            company: "TechCorp Solutions",
            period: "2022 - Present",
            description: "Spearheaded the migration of a monolithic enterprise application to a micro-frontend architecture using React and Webpack Module Federation. Improved page load times by 40% and mentored a team of 5 developers."
        },
        {
            id: 2,
            role: "Software Developer",
            company: "InnovateX Systems",
            period: "2019 - 2022",
            description: "Developed and maintained high-traffic e-commerce platforms. Implemented real-time inventory tracking using Node.js and WebSockets. Collaborated with UX designers to ensure pixel-perfect implementation of designs."
        },
        {
            id: 3,
            role: "Junior Web Developer",
            company: "Creative Web Studio",
            period: "2017 - 2019",
            description: "Assisted in the development of responsive websites for various clients. Gained proficiency in HTML5, CSS3, and JavaScript. Integrated third-party APIs for payment processing and social media feeds."
        }
    ],
    skills: [
        { name: "React", level: 95, type: "frontend" },
        { name: "Node.js", level: 85, type: "backend" },
        { name: "Three.js", level: 80, type: "3d" },
        { name: "TypeScript", level: 90, type: "language" },
        { name: "AWS", level: 75, type: "backend" },
        { name: "GraphQL", level: 80, type: "backend" },
        { name: "Next.js", level: 90, type: "frontend" },
        { name: "Tailwind CSS", level: 95, type: "design" }
    ],
    projects: [
        {
            id: 1,
            title: "Immersive 3D Portfolio",
            description: "A futuristic, interactive portfolio website built with React Three Fiber, featuring physics-based animations and a neon-cyber aesthetic.",
            tech: ["React", "Three.js", "R3F", "Framer Motion"],
            link: "#"
        },
        {
            id: 2,
            title: "Enterprise CRM Dashboard",
            description: "A comprehensive CRM solution with real-time data visualization, role-based access control, and automated reporting.",
            tech: ["React", "Redux", "Node.js", "PostgreSQL"],
            link: "#"
        },
        {
            id: 3,
            title: "AI-Powered Chatbot",
            description: "An intelligent customer support chatbot integrating OpenAI's GPT-4 API for natural language understanding and automated responses.",
            tech: ["Python", "FastAPI", "OpenAI", "React"],
            link: "#"
        }
    ]
};
