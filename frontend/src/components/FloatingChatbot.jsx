import React, { useState, useEffect, useRef } from "react";
import "../styles/floatingChatbot.css";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Hello! I am SphereAI, your virtual learning and workspace guide. How can I help you explore SkillSphere today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const responseIndicesRef = useRef({
    overview: 0,
    courses: 0,
    xp: 0,
    badges: 0,
    sandbox: 0,
    workforce: 0,
    pricing: 0,
    cert: 0,
    general: 0
  });

  const getDynamicSkillSphereReply = (queryText) => {
    const q = queryText.toLowerCase();

    const responses = {
      overview: [
        "SkillSphere is an all-in-one gamified learning and workforce operations platform! It empowers developers with 12+ tech tracks, live code sandboxes, XP rewards, and blockchain-verified certificates, while providing managers with sprint planning and leave workflows.",
        "Think of SkillSphere as your futuristic growth accelerator! For students, it provides structured 6-chapter learning roadmaps, GFG reference notes, and video lessons. For teams, it offers employee directories, task assignment, and live metrics logging.",
        "SkillSphere bridges modern technical education with enterprise workforce management. Whether you are aiming to master React, Java, or AI Engineering, or seeking to manage sprint boards and team logs, SkillSphere brings everything into a unified portal.",
        "At its core, SkillSphere makes technical mastery engaging and measurable. You gain hands-on experience through interactive code execution, earn cyber-badges, track daily streaks, and verify course completion with cryptographic certificates!"
      ],

      courses: [
        "SkillSphere features 12 comprehensive learning tracks: 1) Frontend System Design, 2) React Developer, 3) JavaScript, 4) Data Structures & Algorithms, 5) Generative AI Engineering, 6) Machine Learning Foundations, 7) Advanced Node.js, 8) Next.js 14, 9) Web3 & Solidity, 10) AWS Cloud, 11) Python for Data Science, and 12) UI/UX Design! Each course includes 6 detailed modules, video lessons, and GFG notes.",
        "Our Learning Portal is structured into 6-chapter modules per course track. Each chapter comes equipped with verified GeeksforGeeks reference notes, YouTube video tutorials, XP rewards, and a 20-mark final assessment quiz to unlock your course completion badge!",
        "Whether you're starting with JavaScript fundamentals or advancing into Micro-Frontends and Generative AI, SkillSphere provides clear, step-by-step paths. You can track progress bars in real-time and test your knowledge with interactive quizzes.",
        "All SkillSphere courses are designed for practical mastery. You can select any track from the Courses page or top navigation pills to view curriculum chapters, study notes, and inline video streams."
      ],

      xp: [
        "You earn XP on SkillSphere by completing chapter modules (+100 to +250 XP per chapter) and scoring high on track quizzes (+15 XP per mark, up to 300 XP max per track). Accumulating XP levels up your profile badge!",
        "Gamification is embedded into every learning action on SkillSphere! Maintaining your daily login streak grants XP multipliers, while completing 6-module tracks unlocks exclusive Level titles from Apprentice to Grandmaster.",
        "Every chapter completed adds XP directly to your student account balance. You can view your total XP, current Level, and leaderboard rank in real-time from your Student Dashboard!",
        "XP rewards reflect your hands-on mastery! Completing all 6 modules of a course track earns over 1,000 XP and unlocks the official track completion assessment."
      ],

      badges: [
        "SkillSphere features 11 unlockable cyber-badges, including React Master, Java Master, Spring Boot Master, AI Architect, Code Ninja, Security Specialist, and Perfect Quizzer! Scoring 85%+ on a track quiz instantly unlocks its badge on your profile.",
        "Badges on SkillSphere represent verified skill milestones! When you achieve an 85% score (17+ out of 20 marks) on a course final quiz, the corresponding cyber-badge is awarded and linked to your digital certificate.",
        "You can inspect your unlocked badge showcase on the Features page or Student Dashboard. Each badge features glowing cyberpunk aesthetics and cryptographic proof of completion.",
        "Want to collect all 11 cyber-badges? Complete the 6 curriculum modules for React, Java, Spring Boot, DSA, or Gen AI and pass their 20-mark track assessments!"
      ],

      sandbox: [
        "SkillSphere includes an online Code Sandbox supporting JavaScript, Python 3, Java, and C++! You can write, edit, and execute code directly in your browser with live stdout terminal logs.",
        "Our multi-language Sandbox lets you test algorithms and functions on the fly! Select pre-built code templates or write custom scripts without installing any local compiler setup.",
        "The SkillSphere Sandbox is powered by an instant execution engine. Try writing Python functions, JS DOM scripts, or C++ algorithms and see output logs in real-time!",
        "Access the Sandbox from the top navbar to experiment with code snippets from your GFG study notes or practice problem sets."
      ],

      workforce: [
        "SkillSphere Workforce Management empowers team leads to oversee employee directories, assign sprint tickets with priority badges (High/Medium/Low), handle leave request approvals, and audit live system activity logs.",
        "For enterprise teams, SkillSphere provides a robust operations hub: managers can review team productivity, track active project progress, approve employee leave requests, and manage workforce roles.",
        "The Workforce Hub bridges project planning and team administration. Employees can view assigned tasks, update sprint statuses, and request time off seamlessly.",
        "Managers can access the Workforce Dashboard to view real-time system metrics, manage employee profiles, and assign priority tasks across development sprints."
      ],

      pricing: [
        "All courses on SkillSphere are currently 100% FREE under the SkillSphere Scholarship Grant! You get complete, unrestricted access to all 12 learning tracks, video lessons, sandboxes, and certificates for ₹0.",
        "Enrollment is completely free! Simply browse the Courses Catalog, click 'Enroll Now' on any course, and check out with the instant 100% Scholarship discount applied.",
        "No subscription or hidden fees! SkillSphere offers full access to all curriculum modules, GFG notes, quizzes, and verifiable certificates at zero cost.",
        "You can enroll in as many of the 12 courses as you like for free! Your enrolled courses will be unlocked immediately in your Learning Portal."
      ],

      cert: [
        "When you finish a course track on SkillSphere, a tamper-proof cryptographic verification hash is generated. You can copy your Certificate Hash ID from the Student Dashboard or download a high-res certificate image for your resume!",
        "SkillSphere certificates feature blockchain-style verification hashes. Employers can verify your certificate's authenticity, and you can share your credential image directly on LinkedIn or your portfolio.",
        "Every completed course track issues an official SkillSphere certificate containing your full name, course title, completion date, and unique verification ID.",
        "You can generate and download your custom PNG certificate anytime from the 'Certificates' tab in your Student Dashboard!"
      ],

      contact: [
        "Have a question or need assistance? You can email our support team at support@skillsphere.com or visit our Contact page to send a message directly to our helpdesk!",
        "We're here to help! Reach out to support@skillsphere.com for account support, course inquiries, or workforce setup assistance.",
        "Visit the Contact Us page in the platform navigation to submit a message or report an issue directly to our team."
      ],

      general: [
        `I'd be glad to help with your question about "${queryText}"! SkillSphere provides interactive learning tracks, real-time code sandboxes, XP rewards, and workforce management tools. Let me know if you need specific details on courses, certificates, or features!`,
        `Great question about "${queryText}"! On SkillSphere, you can explore 12 tech tracks, practice in our code sandbox, earn XP and badges, or manage team sprint projects. What specific aspect would you like to dive into?`,
        `SkillSphere is designed to make learning and working seamless! Feel free to ask about course roadmaps, quiz challenges, XP levelling, or workforce operations.`
      ]
    };

    let category = "general";
    if (q.includes("course") || q.includes("study") || q.includes("learn") || q.includes("track") || q.includes("react") || q.includes("java") || q.includes("dsa") || q.includes("ai")) {
      category = "courses";
    } else if (q.includes("xp") || q.includes("level") || q.includes("streak") || q.includes("point") || q.includes("score")) {
      category = "xp";
    } else if (q.includes("badge") || q.includes("achievement") || q.includes("trophy") || q.includes("unlock")) {
      category = "badges";
    } else if (q.includes("sandbox") || q.includes("code") || q.includes("compiler") || q.includes("run") || q.includes("terminal")) {
      category = "sandbox";
    } else if (q.includes("workforce") || q.includes("employee") || q.includes("manager") || q.includes("sprint") || q.includes("leave") || q.includes("team")) {
      category = "workforce";
    } else if (q.includes("price") || q.includes("cost") || q.includes("fee") || q.includes("free") || q.includes("pay") || q.includes("scholarship") || q.includes("enroll")) {
      category = "pricing";
    } else if (q.includes("cert") || q.includes("blockchain") || q.includes("verify") || q.includes("diploma") || q.includes("hash")) {
      category = "cert";
    } else if (q.includes("contact") || q.includes("help") || q.includes("support") || q.includes("email") || q.includes("bug")) {
      category = "contact";
    } else if (q.includes("what is") || q.includes("skillsphere") || q.includes("about") || q.includes("platform") || q.includes("overview") || q.includes("nexus")) {
      category = "overview";
    }

    const list = responses[category] || responses.general;
    const currentIndex = responseIndicesRef.current[category] || 0;
    const selectedReply = list[currentIndex % list.length];
    
    responseIndicesRef.current[category] = (currentIndex + 1) % list.length;
    return selectedReply;
  };

  const getUniversalTechnicalAnswer = (queryText) => {
    const q = queryText.toLowerCase();

    // Check for specific tech topics outside/inside platform
    if (q.includes("c++") || q.includes("cpp")) {
      return "💡 C++ Technical Overview:\nC++ is a high-performance, compiled object-oriented language with manual memory management. Key concepts:\n1. RAII (Resource Acquisition Is Initialization) for automatic memory cleanup using smart pointers (std::unique_ptr, std::shared_ptr).\n2. STL Containers: std::vector, std::unordered_map (O(1) average lookup).\n3. Compiling: `g++ main.cpp -o main -O3`.\n\nCode Example:\n```cpp\n#include <iostream>\n#include <memory>\n\nint main() {\n    auto ptr = std::make_unique<int>(42);\n    std::cout << \"Val: \" << *ptr << std::endl;\n    return 0;\n}\n```";
    }

    if (q.includes("rust")) {
      return "💡 Rust Technical Overview:\nRust provides memory safety without garbage collection through its strict Ownership & Borrowing system:\n1. Ownership Rules: Each value has one owner; value is dropped when owner goes out of scope.\n2. Borrowing: References (&T for immutable, &mut T for mutable) prevent data races at compile time.\n3. Cargo Build System: `cargo build --release`.\n\nCode Example:\n```rust\nfn main() {\n    let mut msg = String::from(\"Hello Rust\");\n    modify_str(&mut msg);\n    println!(\"{}\", msg);\n}\nfn modify_str(s: &mut String) {\n    s.push_str(\" - Zero Cost Abstraction!\");\n}\n```";
    }

    if (q.includes("docker") || q.includes("container")) {
      return "💡 Docker & Containerization:\nDocker packages applications and dependencies into standardized containers:\n1. Dockerfile: Blueprints defining base OS, environment, and run commands.\n2. Container vs Image: Images are read-only templates; Containers are runnable instances.\n3. Essential Commands: `docker build -t myapp .` and `docker run -p 8080:8080 myapp`.\n\nSample Dockerfile:\n```dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nCMD [\"npm\", \"start\"]\n```";
    }

    if (q.includes("kubernetes") || q.includes("k8s")) {
      return "💡 Kubernetes (K8s) Architecture:\nKubernetes automates deployment, scaling, and management of containerized apps:\n1. Pod: Smallest deployable unit hosting one or more containers.\n2. Service: Exposes pods to internal/external networks using ClusterIP, NodePort, or LoadBalancer.\n3. Deployment: Manages rolling updates and replica sets (`kubectl apply -f deployment.yaml`).";
    }

    if (q.includes("sql") || q.includes("database") || q.includes("postgres") || q.includes("mysql")) {
      return "💡 SQL & Relational Databases:\nRelational DBs store data in structured tables using ACID transactions (Atomicity, Consistency, Isolation, Durability):\n1. Joins: INNER JOIN (matching rows), LEFT JOIN (all left rows + matching right rows).\n2. Indexing: B-Tree indexes accelerate SELECT queries from O(N) full table scans to O(log N).\n\nSQL Example:\n```sql\nSELECT u.username, COUNT(o.id) AS total_orders\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id\nHAVING total_orders > 5;\n```";
    }

    if (q.includes("golang") || q.includes("go ")) {
      return "💡 Go (Golang) Microservices:\nGo is designed by Google for high-concurrency microservices:\n1. Goroutines: Lightweight threads managed by Go runtime (`go worker()`).\n2. Channels: Type-safe pipes for communicating between goroutines (`ch <- data`).\n\nCode Example:\n```go\npackage main\nimport (\"fmt\"; \"time\")\n\nfn worker(ch chan string) {\n    ch <- \"Worker Finished\"\n}\nfn main() {\n    ch := make(chan string)\n    go worker(ch)\n    fmt.Println(<-ch)\n}\n```";
    }

    if (q.includes("git") || q.includes("github")) {
      return "💡 Git Version Control:\nGit is a distributed version control system:\n1. `git rebase main`: Applies local commits on top of updated main branch for linear commit history.\n2. `git stash`: Temporarily shelves uncommitted changes (`git stash pop` to restore).\n3. `git cherry-pick <commit>`: Applies a specific commit from another branch.";
    }

    if (q.includes("operating system") || q.includes("os") || q.includes("linux") || q.includes("kernel")) {
      return "💡 Operating Systems & Linux Architecture:\n1. Process vs Thread: Processes have independent virtual memory spaces; Threads share memory within the same process.\n2. Memory Paging: Translates virtual memory addresses to physical RAM using Page Tables.\n3. Linux Essential Commands: `grep -rnw '/path/' -e 'pattern'` (search text), `netstat -tulpn` (check active ports).";
    }

    if (q.includes("networking") || q.includes("http") || q.includes("tcp") || q.includes("dns")) {
      return "💡 Computer Networking:\n1. OSI 7 Layers: Physical, Data Link, Network (IP), Transport (TCP/UDP), Session, Presentation, Application (HTTP).\n2. TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK before data transfer.\n3. HTTP Status Codes: 200 OK, 201 Created, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Error.";
    }

    if (q.includes("system design") || q.includes("microservice") || q.includes("architecture")) {
      return "💡 System Design Architecture:\n1. Load Balancer: Distributes incoming web traffic across NGINX or HAProxy server clusters.\n2. Distributed Caching: Uses Redis/Memcached to cache DB queries, reducing latency to < 5ms.\n3. Message Queues: Asynchronous decoupling using Apache Kafka or RabbitMQ for high throughput.";
    }

    // Default dynamic responder for platform & general tech questions
    return getDynamicSkillSphereReply(queryText);
  };

  // Send message handler
  const handleSendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    // Add user message
    const userMsg = { sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const systemPrompt = "You are SphereAI, a world-class AI Technical Mentor and Senior Software Architect. You answer ANY technical question on ANY computer science topic, programming language, software architecture, database, cloud, DevOps, operating system, or algorithm (e.g. C++, Rust, Go, Python, React, Java, Docker, Kubernetes, SQL, Data Structures, System Design, AI/ML, Cybersecurity, Linux, Git, etc.), regardless of whether it is officially on the SkillSphere platform syllabus or not. Always provide valid, accurate, highly detailed technical answers with code examples, architectural breakdowns, and best practices in a friendly, helpful, futuristic tone.";

    try {
      const response = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.slice(-6).map(m => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text
            })),
            { role: "user", content: text }
          ],
          model: "openai"
        })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const replyText = await response.text();
      if (replyText && replyText.trim().length > 0) {
        setMessages(prev => [...prev, { sender: "assistant", text: replyText.trim() }]);
      } else {
        throw new Error("Empty reply");
      }
    } catch (err) {
      console.warn("AI Chat API error, falling back to universal technical mentor:", err);
      
      setTimeout(() => {
        const dynamicReply = getUniversalTechnicalAnswer(text);
        setMessages(prev => [...prev, { sender: "assistant", text: dynamicReply }]);
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "What is SkillSphere?",
    "How to earn XP?",
    "How to manage teams?"
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button 
        className={`floating-chat-bubble ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with SphereAI"
      >
        {isOpen ? "✖" : "🤖"}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="floating-chat-window">
          
          {/* Header */}
          <div className="chat-window-header">
            <div className="chat-header-title">
              <div className="chat-status-dot"></div>
              <h4>SphereAI <span>virtual assistant</span></h4>
            </div>
            <button className="chat-header-close" onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>

          {/* Messages Log */}
          <div className="chat-window-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble-floating ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            
            {isLoading && (
              <div className="chat-typing-indicator">
                <div className="chat-typing-dot"></div>
                <div className="chat-typing-dot"></div>
                <div className="chat-typing-dot"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="chat-window-hints">
            {quickPrompts.map((prompt, i) => (
              <span 
                key={i} 
                className="chat-hint-chip"
                onClick={() => handleSendMessage(prompt)}
              >
                {prompt}
              </span>
            ))}
          </div>

          {/* Input Area */}
          <div className="chat-window-input-area">
            <input
              type="text"
              className="chat-window-input"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage(input);
              }}
              disabled={isLoading}
            />
            <button 
              className="chat-window-send"
              onClick={() => handleSendMessage(input)}
              disabled={isLoading || !input.trim()}
            >
              🚀
            </button>
          </div>

        </div>
      )}
    </>
  );
}
