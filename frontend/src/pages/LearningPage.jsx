import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "../components/Background";
import "../styles/learningPage.css";

export default function LearningPage() {
  const { user, completedTopics, completeTopic, earnXp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const trackFromUrl = queryParams.get('track') || location.state?.track;
  const validTracks = ["fsd", "react", "javascript", "dsa", "java", "genai", "ml", "node", "springboot", "nextjs", "web3", "aws", "python", "uiux"];

  const [activeTrack, setActiveTrack] = useState(
    trackFromUrl && validTracks.includes(trackFromUrl) ? trackFromUrl : "react"
  );
  
  // Selected topic ID within track
  const [activeTopicId, setActiveTopicId] = useState(() => {
    const t = (trackFromUrl && validTracks.includes(trackFromUrl)) ? trackFromUrl : "react";
    if (t === "java") return "java_intro";
    if (t === "springboot") return "springboot_intro";
    return `${t}_intro`;
  });

  // Sync active track when URL query parameter changes
  useEffect(() => {
    if (trackFromUrl && validTracks.includes(trackFromUrl)) {
      setActiveTrack(trackFromUrl);
      if (trackFromUrl === "java") setActiveTopicId("java_intro");
      else if (trackFromUrl === "springboot") setActiveTopicId("springboot_intro");
      else setActiveTopicId(`${trackFromUrl}_intro`);
    }
  }, [trackFromUrl]);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [badgeUnlocked, setBadgeUnlocked] = useState(false);

  // Video Player state
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    setIsPlayingVideo(false);
  }, [activeTrack, activeTopicId]);

  // Track configurations for all 12 platform courses
  const tracks = {
    fsd: {
      name: "Frontend System Design",
      class: "react",
      instructor: "Alexis Mangin",
      badgeName: "Frontend Architect Badge",
      badgeKey: "fsd_badge",
      topics: [
        { id: "fsd_intro", title: "1. Architecture & Scalability", videoId: "S5-nF8m_6y0", videoTitle: "Frontend System Design - Chapter 1: Architecture & Scalability", xp: 100, content: <div><p>Frontend System Design focuses on designing scalable, resilient, and maintainable web applications.</p></div> },
        { id: "fsd_cdn", title: "2. CDN & Asset Caching", videoId: "bMknfKXIFA8", videoTitle: "Frontend System Design - Chapter 2: Asset Delivery & Edge Caching", xp: 100, content: <div><p>CDNs distribute content globally closer to users, reducing latency and bandwidth overhead.</p></div> },
        { id: "fsd_state", title: "3. State Management & Event Bus", videoId: "SqcY0GlETPk", videoTitle: "Frontend System Design - Chapter 3: State Normalization & Bus Architecture", xp: 150, content: <div><p>Managing global vs local state cleanly prevents memory leaks and unnecessary component re-renders.</p></div> },
        { id: "fsd_micro", title: "4. Micro-Frontends & Module Federation", videoId: "0riHps91AzE", videoTitle: "Frontend System Design - Chapter 4: Micro-Frontends", xp: 150, content: <div><p>Micro-frontends allow multiple teams to independently build, test, and deploy UI features.</p></div> },
        { id: "fsd_perf", title: "5. Web Vitals & Performance Monitoring", videoId: "LDB4uaJ87e0", videoTitle: "Frontend System Design - Chapter 5: Core Web Vitals & Optimization", xp: 200, content: <div><p>Measuring LCP, FID, and CLS ensures optimal user experience across network conditions.</p></div> },
        { id: "fsd_net", title: "6. Network Protocols & WebSockets", videoId: "TNhaISOUy6Q", videoTitle: "Frontend System Design - Chapter 6: Realtime Protocols & WebSockets", xp: 200, content: <div><p>Bi-directional real-time communication using WebSockets and HTTP/3 streaming.</p></div> }
      ],
      quiz: [{ q: "What is the primary goal of Frontend System Design?", options: ["Designing database tables.", "Building scalable, high-performance web applications.", "Configuring Linux servers.", "Designing logos."], correct: 1 }]
    },
    javascript: {
      name: "JavaScript",
      class: "react",
      instructor: "Akshay Saini",
      badgeName: "JavaScript Ninja Badge",
      badgeKey: "js_badge",
      topics: [
        { id: "javascript_intro", title: "1. JS Execution Context & Engine", videoId: "hdI2bqOjy3c", videoTitle: "JavaScript - Chapter 1: Execution Context & Memory Allocation", xp: 100, content: <div><p>JavaScript executes inside an Execution Context containing a Memory Component and a Code Execution Component.</p></div> },
        { id: "javascript_closures", title: "2. Closures & Scope Chain", videoId: "PkZNo7MFNFg", videoTitle: "JavaScript - Chapter 2: Closures, Lexical Scope & Lexical Environment", xp: 150, content: <div><p>A closure gives a function access to its outer scope even after the outer function has closed.</p></div> },
        { id: "javascript_async", title: "3. Event Loop & Asynchronous JS", videoId: "8zKuNo4ay8E", videoTitle: "JavaScript - Chapter 3: Event Loop, Microtask Queue & Call Stack", xp: 150, content: <div><p>The event loop monitors the call stack and microtask queue to execute async callbacks seamlessly.</p></div> },
        { id: "javascript_promises", title: "4. Promises & Async/Await", videoId: "DHvZLI7aU3c", videoTitle: "JavaScript - Chapter 4: Promises, Async/Await & Error Handling", xp: 200, content: <div><p>Promises handle asynchronous operations with resolved or rejected states.</p></div> },
        { id: "javascript_proto", title: "5. Prototypes & OOP Inheritance", videoId: "1g4zP3bS5tM", videoTitle: "JavaScript - Chapter 5: Prototype Chain & Inherited Methods", xp: 200, content: <div><p>JavaScript uses prototype-based inheritance where objects inherit properties from prototype objects.</p></div> },
        { id: "javascript_es6", title: "6. ES6+ Array Methods & Map/Set", videoId: "NCwa_xi0Uuc", videoTitle: "JavaScript - Chapter 6: ES6 Array Methods & Map/Set Collections", xp: 200, content: <div><p>Modern ES6 features including map, filter, reduce, destructuring, and Map/Set collections.</p></div> }
      ],
      quiz: [{ q: "What is a closure in JavaScript?", options: ["Function with references to outer scope", "Window close", "Loop", "Database"], correct: 0 }]
    },
    genai: {
      name: "Generative AI Engineering",
      class: "react",
      instructor: "Andrew Ng",
      badgeName: "AI Engineer Badge",
      badgeKey: "genai_badge",
      topics: [
        { id: "genai_intro", title: "1. LLM Architecture & Prompting", videoId: "mEsleV16qdo", videoTitle: "Generative AI - Chapter 1: Transformer Models & Prompt Tuning", xp: 150, content: <div><p>Generative AI leverages transformer models (like GPT) to process natural language using self-attention mechanisms.</p></div> },
        { id: "genai_rag", title: "2. RAG Pipelines & Vector DBs", videoId: "mEsleV16qdo", videoTitle: "Generative AI - Chapter 2: Retrieval Augmented Generation & Embeddings", xp: 150, content: <div><p>Retrieval-Augmented Generation connects LLMs to custom knowledge bases using vector embeddings.</p></div> },
        { id: "genai_langchain", title: "3. LangChain & LlamaIndex Agents", videoId: "mEsleV16qdo", videoTitle: "Generative AI - Chapter 3: Autonomous AI Agents & Tool Calling", xp: 200, content: <div><p>Building autonomous AI agents using LangChain to chain tools, APIs, and memory stores together.</p></div> },
        { id: "genai_finetune", title: "4. Fine-Tuning & Quantization", videoId: "mEsleV16qdo", videoTitle: "Generative AI - Chapter 4: Model Fine-Tuning & LoRA Quantization", xp: 200, content: <div><p>Fine-tuning open-source LLMs like Llama using LoRA and QLoRA techniques.</p></div> },
        { id: "genai_multimodal", title: "5. Multimodal AI Models", videoId: "mEsleV16qdo", videoTitle: "Generative AI - Chapter 5: Vision & Multimodal Embeddings", xp: 200, content: <div><p>Integrating vision, speech, and text into unified multimodal AI pipelines.</p></div> },
        { id: "genai_deploy", title: "6. AI Guardrails & Deployment", videoId: "mEsleV16qdo", videoTitle: "Generative AI - Chapter 6: Production AI Guardrails & Safety", xp: 250, content: <div><p>Deploying LLMs in production with hallucination detection and safety guardrails.</p></div> }
      ],
      quiz: [{ q: "What powers modern LLMs?", options: ["Transformers", "SQL", "HTML", "C++"], correct: 0 }]
    },
    ml: {
      name: "Machine Learning Foundations",
      class: "java",
      instructor: "Andrew Ng",
      badgeName: "ML Specialist Badge",
      badgeKey: "ml_badge",
      topics: [
        { id: "ml_intro", title: "1. Supervised & Unsupervised ML", videoId: "i_LwzRVP7bg", videoTitle: "Machine Learning - Chapter 1: Supervised vs Unsupervised Models", xp: 100, content: <div><p>Supervised learning trains models on labeled datasets; unsupervised learning finds hidden patterns in unlabeled data.</p></div> },
        { id: "ml_regression", title: "2. Linear & Logistic Regression", videoId: "i_LwzRVP7bg", videoTitle: "Machine Learning - Chapter 2: Regression Algorithms & Cost Functions", xp: 150, content: <div><p>Predicting continuous values and classification probabilities using gradient descent.</p></div> },
        { id: "ml_trees", title: "3. Decision Trees & Random Forests", videoId: "i_LwzRVP7bg", videoTitle: "Machine Learning - Chapter 3: Tree Ensembles & Random Forests", xp: 150, content: <div><p>Tree-based models and ensemble methods for classification and regression tasks.</p></div> },
        { id: "ml_nn", title: "4. Neural Networks & Backpropagation", videoId: "i_LwzRVP7bg", videoTitle: "Machine Learning - Chapter 4: Deep Learning & Backpropagation", xp: 200, content: <div><p>Deep neural network architectures, activation functions, and backpropagation optimization.</p></div> },
        { id: "ml_eval", title: "5. Model Evaluation & Overfitting", videoId: "i_LwzRVP7bg", videoTitle: "Machine Learning - Chapter 5: Precision, Recall & Cross Validation", xp: 200, content: <div><p>Evaluating model performance using confusion matrices, ROC curves, and regularization.</p></div> },
        { id: "ml_tools", title: "6. Scikit-Learn & PyTorch Setup", videoId: "i_LwzRVP7bg", videoTitle: "Machine Learning - Chapter 6: Production ML Pipelines with Scikit-Learn", xp: 250, content: <div><p>Building end-to-end ML workflows using Python, Scikit-Learn, and PyTorch.</p></div> }
      ],
      quiz: [{ q: "Which type of ML uses labeled data?", options: ["Supervised", "Unsupervised", "Reinforcement", "Random"], correct: 0 }]
    },
    nextjs: {
      name: "Fullstack Next.js 14",
      class: "react",
      instructor: "Vercel Academy",
      badgeName: "Next.js Master Badge",
      badgeKey: "next_badge",
      topics: [
        { id: "nextjs_intro", title: "1. App Router & Server Components", videoId: "wm5gMKCORL4", videoTitle: "Next.js 14 - Chapter 1: App Router & Server Actions", xp: 150, content: <div><p>Next.js 14 App Router introduces React Server Components for fast initial page rendering and reduced client bundle size.</p></div> },
        { id: "nextjs_actions", title: "2. Server Actions & Form Mutations", videoId: "wm5gMKCORL4", videoTitle: "Next.js 14 - Chapter 2: Server Actions & Data Mutation", xp: 150, content: <div><p>Executing server-side code directly from client UI forms using Server Actions.</p></div> },
        { id: "nextjs_routing", title: "3. Dynamic Routing & Middleware", videoId: "wm5gMKCORL4", videoTitle: "Next.js 14 - Chapter 3: Dynamic Segments & Edge Middleware", xp: 200, content: <div><p>Intercepting requests and managing dynamic route segments with Next.js middleware.</p></div> },
        { id: "nextjs_rendering", title: "4. SSR vs SSG vs ISR Caching", videoId: "wm5gMKCORL4", videoTitle: "Next.js 14 - Chapter 4: Rendering Strategies & Full-Route Caching", xp: 200, content: <div><p>Optimizing static site generation, server-side rendering, and incremental static regeneration.</p></div> },
        { id: "nextjs_auth", title: "5. NextAuth.js Authentication", videoId: "wm5gMKCORL4", videoTitle: "Next.js 14 - Chapter 5: NextAuth & OAuth Provider Setup", xp: 250, content: <div><p>Securing fullstack applications with session tokens, JWTs, and OAuth authentication.</p></div> },
        { id: "nextjs_deploy", title: "6. Vercel Edge Deployment", videoId: "wm5gMKCORL4", videoTitle: "Next.js 14 - Chapter 6: Edge Network Deployment & Performance", xp: 250, content: <div><p>Deploying Next.js applications to Vercel's global edge network with zero configuration.</p></div> }
      ],
      quiz: [{ q: "What is the primary feature of Next.js 14 App Router?", options: ["React Server Components", "XML Layouts", "PHP Support", "jQuery plugins"], correct: 0 }]
    },
    web3: {
      name: "Web3 & Solidity Development",
      class: "react",
      instructor: "Patrick Collins",
      badgeName: "Web3 Architect Badge",
      badgeKey: "web3_badge",
      topics: [
        { id: "web3_intro", title: "1. Blockchain & Smart Contracts", videoId: "gyMwXuJrbJQ", videoTitle: "Web3 - Chapter 1: Smart Contracts & EVM Execution", xp: 150, content: <div><p>Web3 decentralizes application logic using smart contracts running on peer-to-peer blockchain nodes.</p></div> },
        { id: "web3_solidity", title: "2. Solidity Syntax & Data Types", videoId: "gyMwXuJrbJQ", videoTitle: "Web3 - Chapter 2: Solidity Contracts, Mappings & Structs", xp: 150, content: <div><p>Writing smart contracts with state variables, mappings, and functions in Solidity.</p></div> },
        { id: "web3_foundry", title: "3. Hardhat & Foundry Testing", videoId: "gyMwXuJrbJQ", videoTitle: "Web3 - Chapter 3: Smart Contract Unit Testing & Deployment", xp: 200, content: <div><p>Testing and deploying smart contracts using Hardhat and Foundry toolchains.</p></div> },
        { id: "web3_tokens", title: "4. ERC-20 & ERC-721 Standards", videoId: "gyMwXuJrbJQ", videoTitle: "Web3 - Chapter 4: Fungible & Non-Fungible Token Standards", xp: 200, content: <div><p>Building custom ERC-20 tokens and ERC-721 NFT smart contracts with OpenZeppelin.</p></div> },
        { id: "web3_ethers", title: "5. Ethers.js & Wagmi Frontend", videoId: "gyMwXuJrbJQ", videoTitle: "Web3 - Chapter 5: MetaMask & Ethers.js Wallet Connection", xp: 250, content: <div><p>Connecting React frontends to Web3 wallets and blockchain providers using Wagmi.</p></div> },
        { id: "web3_security", title: "6. Smart Contract Auditing & Gas", videoId: "gyMwXuJrbJQ", videoTitle: "Web3 - Chapter 6: Reentrancy Attacks & Gas Optimization", xp: 250, content: <div><p>Auditing smart contracts against security vulnerabilities and optimizing gas consumption.</p></div> }
      ],
      quiz: [{ q: "What executes smart contracts on Ethereum?", options: ["EVM (Ethereum Virtual Machine)", "JVM", "V8", "Node.js"], correct: 0 }]
    },
    aws: {
      name: "Cloud Computing with AWS",
      class: "springboot",
      instructor: "Stephane Maarek",
      badgeName: "AWS Cloud Master Badge",
      badgeKey: "aws_badge",
      topics: [
        { id: "aws_intro", title: "1. AWS IAM & EC2 Infrastructure", videoId: "ulprqHHWlng", videoTitle: "AWS Cloud - Chapter 1: Identity Access Management & EC2", xp: 150, content: <div><p>Amazon Web Services (AWS) provides cloud compute (EC2), storage (S3), and serverless functions (Lambda).</p></div> },
        { id: "aws_ec2", title: "2. EC2 Virtual Servers & VPC", videoId: "ulprqHHWlng", videoTitle: "AWS Cloud - Chapter 2: Virtual Private Cloud & Security Groups", xp: 150, content: <div><p>Configuring EC2 virtual servers, auto-scaling groups, and custom Virtual Private Clouds (VPC).</p></div> },
        { id: "aws_s3", title: "3. S3 Bucket Storage & CDN", videoId: "ulprqHHWlng", videoTitle: "AWS Cloud - Chapter 3: Simple Storage Service & CloudFront CDN", xp: 200, content: <div><p>Storing static assets in S3 buckets and accelerating delivery with CloudFront.</p></div> },
        { id: "aws_lambda", title: "4. AWS Lambda & Serverless", videoId: "ulprqHHWlng", videoTitle: "AWS Cloud - Chapter 4: Serverless Computing & API Gateway", xp: 200, content: <div><p>Building event-driven serverless backends using AWS Lambda and API Gateway.</p></div> },
        { id: "aws_db", title: "5. RDS & DynamoDB Databases", videoId: "ulprqHHWlng", videoTitle: "AWS Cloud - Chapter 5: Relational & NoSQL Cloud Databases", xp: 250, content: <div><p>Managing managed SQL databases with Amazon RDS and NoSQL tables with DynamoDB.</p></div> },
        { id: "aws_ecs", title: "6. Docker & ECS Container Management", videoId: "ulprqHHWlng", videoTitle: "AWS Cloud - Chapter 6: Elastic Container Service & Fargate", xp: 250, content: <div><p>Orchestrating containerized microservices using Docker, ECS, and AWS Fargate.</p></div> }
      ],
      quiz: [{ q: "Which AWS service provides virtual servers?", options: ["EC2", "S3", "DynamoDB", "Lambda"], correct: 0 }]
    },
    python: {
      name: "Python for Data Science",
      class: "java",
      instructor: "Corey Schafer",
      badgeName: "Data Scientist Badge",
      badgeKey: "py_badge",
      topics: [
        { id: "python_intro", title: "1. Python Core & Data Structures", videoId: "LHBE6Q9XlzI", videoTitle: "Python Data Science - Chapter 1: Core Syntax & Data Structures", xp: 150, content: <div><p>Python is the premier language for data science, leveraging NumPy and Pandas for array and tabular data manipulation.</p></div> },
        { id: "python_numpy", title: "2. NumPy N-Dimensional Arrays", videoId: "LHBE6Q9XlzI", videoTitle: "Python Data Science - Chapter 2: Vectorized Operations with NumPy", xp: 150, content: <div><p>Performing fast numerical computations and array slicing using NumPy.</p></div> },
        { id: "python_pandas", title: "3. Pandas DataFrames & Manipulation", videoId: "LHBE6Q9XlzI", videoTitle: "Python Data Science - Chapter 3: Data Cleaning & DataFrame Wrangling", xp: 200, content: <div><p>Filtering, joining, and aggregating complex datasets using Pandas DataFrames.</p></div> },
        { id: "python_viz", title: "4. Matplotlib & Seaborn Visualization", videoId: "LHBE6Q9XlzI", videoTitle: "Python Data Science - Chapter 4: Data Visualization & Charts", xp: 200, content: <div><p>Generating publication-quality plots and heatmaps with Matplotlib and Seaborn.</p></div> },
        { id: "python_eda", title: "5. Exploratory Data Analysis (EDA)", videoId: "LHBE6Q9XlzI", videoTitle: "Python Data Science - Chapter 5: Exploratory Data Analysis", xp: 250, content: <div><p>Uncovering statistical insights, handling missing values, and detecting outliers.</p></div> },
        { id: "python_ml", title: "6. Scikit-Learn Machine Learning", videoId: "LHBE6Q9XlzI", videoTitle: "Python Data Science - Chapter 6: Predictive Modeling with Scikit-Learn", xp: 250, content: <div><p>Training regression and classification models using Scikit-Learn pipelines.</p></div> }
      ],
      quiz: [{ q: "Which library is used for dataframes in Python?", options: ["Pandas", "React", "Express", "Spring"], correct: 0 }]
    },
    uiux: {
      name: "UI/UX Design Masterclass",
      class: "react",
      instructor: "Daniel Walter Scott",
      badgeName: "UI/UX Designer Badge",
      badgeKey: "uiux_badge",
      topics: [
        { id: "uiux_intro", title: "1. Design Thinking & Wireframing", videoId: "c9Wg6Cb_YlU", videoTitle: "UI/UX Design - Chapter 1: Design Systems & Figma Layouts", xp: 150, content: <div><p>UI/UX Design focuses on creating intuitive user experiences, accessibility, and visual hierarchy using Figma.</p></div> },
        { id: "uiux_personas", title: "2. User Research & Personas", videoId: "c9Wg6Cb_YlU", videoTitle: "UI/UX Design - Chapter 2: User Personas & Empathy Maps", xp: 150, content: <div><p>Conducting user interviews, building target personas, and mapping customer journeys.</p></div> },
        { id: "uiux_figma", title: "3. Figma Components & Auto Layout", videoId: "c9Wg6Cb_YlU", videoTitle: "UI/UX Design - Chapter 3: Figma Auto Layout & Component Variants", xp: 200, content: <div><p>Designing responsive UI components using Figma Auto Layout and variants.</p></div> },
        { id: "uiux_designsys", title: "4. Design Systems & Micro-Interactions", videoId: "c9Wg6Cb_YlU", videoTitle: "UI/UX Design - Chapter 4: Design Systems & Prototyping Animations", xp: 200, content: <div><p>Building comprehensive design systems and interactive micro-animations.</p></div> },
        { id: "uiux_testing", title: "5. Usability Testing & Heatmaps", videoId: "c9Wg6Cb_YlU", videoTitle: "UI/UX Design - Chapter 5: Usability Testing & Analytics", xp: 250, content: <div><p>Testing prototypes with users, analyzing heatmaps, and iterating on feedback.</p></div> },
        { id: "uiux_handoff", title: "6. Handoff to Web Developers", videoId: "c9Wg6Cb_YlU", videoTitle: "UI/UX Design - Chapter 6: Developer Handoff & Asset Export", xp: 250, content: <div><p>Preparing Figma design specs, tokens, and asset exports for frontend developers.</p></div> }
      ],
      quiz: [{ q: "Which tool is standard for modern UI/UX design?", options: ["Figma", "MS Paint", "Notepad", "Eclipse"], correct: 0 }]
    },
    dsa: {
      name: "Data Structures & Algorithms (DSA)",
      class: "java",
      instructor: "Striver (takeUforward)",
      badgeName: "FAANG DSA Badge",
      badgeKey: "dsa_badge",
      topics: [
        { id: "dsa_intro", title: "1. Big-O Time & Space Complexity", videoId: "rZ41y93P2Qo", videoTitle: "DSA - Chapter 1: Complexity Analysis & Asymptotic Notations", xp: 100, content: <div><p>Big-O notation quantifies how algorithm runtime or space requirements grow as input size grows.</p></div> },
        { id: "dsa_arrays", title: "2. Arrays, Matrix & Two Pointers", videoId: "rZ41y93P2Qo", videoTitle: "DSA - Chapter 2: Array Manipulations & Two Pointer Technique", xp: 150, content: <div><p>Solving array problems with two pointers, sliding window, and prefix sums.</p></div> },
        { id: "dsa_lists", title: "3. Linked Lists & Stack Queues", videoId: "rZ41y93P2Qo", videoTitle: "DSA - Chapter 3: Linked Lists, Stacks & Queues", xp: 150, content: <div><p>Reversing linked lists, cycle detection, and LIFO/FIFO stack/queue data structures.</p></div> },
        { id: "dsa_trees", title: "4. Binary Trees & BST Traversal", videoId: "rZ41y93P2Qo", videoTitle: "DSA - Chapter 4: Binary Trees & BST Traversals", xp: 200, content: <div><p>Inorder, preorder, postorder traversals, and Binary Search Tree properties.</p></div> },
        { id: "dsa_dp", title: "5. Dynamic Programming Foundations", videoId: "rZ41y93P2Qo", videoTitle: "DSA - Chapter 5: Dynamic Programming & Memoization", xp: 250, content: <div><p>Solving complex optimization problems with memoization and tabulation.</p></div> },
        { id: "dsa_graphs", title: "6. Graph Algorithms (BFS/DFS)", videoId: "rZ41y93P2Qo", videoTitle: "DSA - Chapter 6: Graph Traversals & Shortest Path", xp: 250, content: <div><p>Breadth-First Search, Depth-First Search, Dijkstra's algorithm, and topological sort.</p></div> }
      ],
      quiz: [{ q: "What is the time complexity of binary search?", options: ["O(log N)", "O(N)", "O(N^2)", "O(1)"], correct: 0 }]
    },
    node: {
      name: "Advanced Node.js & Microservices",
      class: "springboot",
      instructor: "Telusko",
      badgeName: "Node Microservices Badge",
      badgeKey: "node_badge",
      topics: [
        { id: "node_intro", title: "1. Node.js Event Loop & Express", videoId: "LAUi8pOIc68", videoTitle: "Node.js Microservices - Chapter 1: Non-Blocking I/O & Express APIs", xp: 150, content: <div><p>Node.js uses a single-threaded non-blocking event loop powered by libuv to handle high concurrency.</p></div> },
        { id: "node_express", title: "2. RESTful API Architecture", videoId: "LAUi8pOIc68", videoTitle: "Node.js Microservices - Chapter 2: Express Controllers & Middleware", xp: 150, content: <div><p>Structuring scalable Express REST APIs with controllers, routes, and error middleware.</p></div> },
        { id: "node_db", title: "3. PostgreSQL & Prisma ORM", videoId: "LAUi8pOIc68", videoTitle: "Node.js Microservices - Chapter 3: Relational DBs & Prisma ORM", xp: 200, content: <div><p>Connecting Node.js microservices to PostgreSQL using type-safe Prisma ORM queries.</p></div> },
        { id: "node_docker", title: "4. Docker Containerization", videoId: "LAUi8pOIc68", videoTitle: "Node.js Microservices - Chapter 4: Dockerizing Microservices", xp: 200, content: <div><p>Writing Dockerfiles and Docker Compose files to run microservices in isolated containers.</p></div> },
        { id: "node_mq", title: "5. RabbitMQ & Event Streaming", videoId: "LAUi8pOIc68", videoTitle: "Node.js Microservices - Chapter 5: Message Queues & Event Streaming", xp: 250, content: <div><p>Asynchronous inter-service messaging using RabbitMQ exchanges and queues.</p></div> },
        { id: "node_gateway", title: "6. API Gateway & Microservices Auth", videoId: "LAUi8pOIc68", videoTitle: "Node.js Microservices - Chapter 6: API Gateway & Centralized Auth", xp: 250, content: <div><p>Routing requests through a central API gateway with JWT authorization.</p></div> }
      ],
      quiz: [{ q: "What powers Node.js non-blocking I/O?", options: ["Libuv & Event Loop", "JVM", "Multi-threading", "Apache"], correct: 0 }]
    },

    react: {
      name: "React Developer",
      class: "react",
      instructor: "Hitesh Choudhary",
      videoTitle: "React JS One Shot Complete Course (Chai aur Code)",
      videoId: "eILUmHJ_5_8",
      badgeName: "React Master Badge",
      badgeKey: "react_badge",
      topics: [
        {
          id: "react_intro",
          title: "1. React Introduction",
          videoId: "w7ejDZ8SWv8",
          videoTitle: "React JS Full Course - Chapter 1: Introduction & Environment Setup",
          xp: 100,
          content: (
            <div>
              <p>React is an open-source JavaScript library developed by Facebook for building user interfaces, specifically single-page applications. It allows developers to create reusable UI components.</p>
              <p><strong>Key Concept: The Virtual DOM</strong></p>
              <p>Instead of manipulating the browser's DOM directly (which is slow), React creates an in-memory data structure cache called the Virtual DOM. When a component changes, React computes the diff and updates only the altered elements in the real DOM.</p>
              <pre>
                <code>{`// Basic React Render Code Example
import React from 'react';
import ReactDOM from 'react-dom/client';

const heading = <h1>Hello, SkillSphere!</h1>;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(heading);`}</code>
              </pre>
            </div>
          )
        },
        {
          id: "react_jsx",
          title: "2. React JSX Syntax",
          videoId: "bMknfKXIFA8",
          videoTitle: "React JS Full Course - Chapter 2: JSX Syntax & Dynamic Rendering",
          xp: 100,
          content: (
            <div>
              <p>JSX stands for JavaScript XML. It is a syntax extension for JavaScript that allows you to write HTML-like structures directly inside your JavaScript code.</p>
              <p><strong>JSX Rules:</strong></p>
              <ul>
                <li>Must return a single root element (wrap elements in a Fragment <code>&lt;&gt;&lt;/&gt;</code> or div).</li>
                <li>Close all tags explicitly (e.g. <code>&lt;br /&gt;</code>).</li>
                <li>Use camelCase for HTML attributes (e.g., <code>className</code> instead of <code>class</code>).</li>
              </ul>
              <pre>
                <code>{`// JSX Expression Embedding Example
const username = "CypherCoder";
const element = (
  <div>
    <h2>Welcome, {username}!</h2>
    <p>Current Time: {new Date().toLocaleTimeString()}</p>
  </div>
);`}</code>
              </pre>
            </div>
          )
        },
        {
          id: "react_components",
          title: "3. Functional Components",
          videoId: "SqcY0GlETPk",
          videoTitle: "React JS Full Course - Chapter 3: Functional Components & Reusability",
          xp: 150,
          content: (
            <div>
              <p>Components are the building blocks of any React application. Modern React uses Functional Components, which are simply JavaScript functions returning JSX code.</p>
              <pre>
                <code>{`// Functional Component Example
import React from 'react';

function ProfileCard(props) {
  return (
    <div className="profile-card">
      <h3>Name: {props.name}</h3>
      <p>Role: {props.role}</p>
    </div>
  );
}

export default ProfileCard;`}</code>
              </pre>
            </div>
          )
        },
        {
          id: "react_props_state",
          title: "4. State & Props",
          videoId: "0riHps91AzE",
          videoTitle: "React JS Full Course - Chapter 4: State Management & Props Passing",
          xp: 150,
          content: (
            <div>
              <p><strong>Props</strong> are read-only variables passed from parent components down to child components. They cannot be modified inside the child component.</p>
              <p><strong>State</strong> represents data private to the component that can change over time. Updating state triggers a component re-render.</p>
              <pre>
                <code>{`// State Counter Hook Example
import React, { useState } from 'react';

function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click Me
      </button>
    </div>
  );
}`}</code>
              </pre>
            </div>
          )
        },
        {
          id: "react_hooks",
          title: "5. React Hooks (useEffect)",
          videoId: "LDB4uaJ87e0",
          videoTitle: "React JS Full Course - Chapter 5: React Hooks (useState & useEffect)",
          xp: 200,
          content: (
            <div>
              <p>Hooks let you use state and other React features without writing a class component. The <code>useEffect</code> hook allows you to perform side effects (such as fetching data or API calls) in functional components.</p>
              <pre>
                <code>{`// useEffect API Fetch Hook Example
import React, { useState, useEffect } from 'react';

function UserLoader() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/octocat')
      .then(res => res.json())
      .then(data => setUserData(data));
  }, []); // Empty dependency array run on mount only

  return userData ? <p>User: {userData.name}</p> : <p>Loading...</p>;
}`}</code>
              </pre>
            </div>
          )
        },
        {
          id: "react_lifecycle",
          title: "6. React Component Lifecycle",
          videoId: "TNhaISOUy6Q",
          videoTitle: "React JS Full Course - Chapter 6: Lifecycle Phases & Optimization",
          xp: 150,
          content: (
            <div>
              <p>React components go through three primary lifecycle phases:</p>
              <ul>
                <li><strong>Mounting</strong>: Component is created and inserted into the DOM (e.g. <code>useEffect</code> runs).</li>
                <li><strong>Updating</strong>: State changes or Props update, re-rendering the component.</li>
                <li><strong>Unmounting</strong>: Component is removed from the DOM (e.g. return statement cleanups in <code>useEffect</code>).</li>
              </ul>
              <pre>
                <code>{`// Cleanup Function Example inside useEffect
useEffect(() => {
  const handleScroll = () => console.log(window.scrollY);
  window.addEventListener('scroll', handleScroll);

  return () => {
    // Unmounting cleanup removes listeners
    window.removeEventListener('scroll', handleScroll);
  };
}, []);`}</code>
              </pre>
            </div>
          )
        }
      ],
      quiz: [
        {
          q: "What is the primary function of the Virtual DOM in React?",
          options: [
            "To directly modify the browser's real HTML document structure.",
            "To compute changes in memory and batch update only altered real DOM nodes.",
            "To serve as a database storage layer for client sessions.",
            "To bind styles statically on compiling."
          ],
          correct: 1
        },
        {
          q: "Which of the following is NOT a rule of JSX?",
          options: [
            "Must return a single root element (Fragment or div).",
            "Tags must be explicitly closed (e.g. <br />).",
            "Use standard lowercase class attributes for styling.",
            "HTML attributes must use camelCase naming (e.g. className)."
          ],
          correct: 2
        },
        {
          q: "What is the key difference between props and state in React?",
          options: [
            "State is read-only, props can be mutated inside the child component.",
            "Props are private, state is public.",
            "Props are immutable data passed down, state is mutable local component data.",
            "State is managed by parent components, props by the child."
          ],
          correct: 2
        },
        {
          q: "How do you run a useEffect hook ONLY once on component mount?",
          options: [
            "Omit the dependency array completely.",
            "Pass an empty array [] as the second parameter.",
            "Pass the variable inside the array [variable].",
            "Call useEffect inside an if-statement."
          ],
          correct: 1
        },
        {
          q: "Which hook is used to manage local state in functional components?",
          options: [
            "useEffect",
            "useContext",
            "useState",
            "useReducer"
          ],
          correct: 2
        }
      ]
    },
    java: {
      name: "Java Master",
      class: "java",
      instructor: "Striver (takeUforward) / Kunal Kushwaha",
      videoTitle: "Java OOPs Concepts, Inheritance & Polymorphism Classes",
      videoId: "bSrmtUscR_4",
      badgeName: "Java Master Badge",
      badgeKey: "java_badge",
      topics: [
        {
          id: "java_intro",
          title: "1. Java JVM, JRE & JDK",
          videoId: "eIrMbAQSU34",
          videoTitle: "Java Tutorial - Chapter 1: JDK, JRE, JVM Architecture & Setup",
          xp: 100,
          content: (
            <div>
              <p>Java is a robust, class-based, object-oriented programming language designed to have as few implementation dependencies as possible (Write Once, Run Anywhere - WORA).</p>
              <p><strong>Architecture Stack:</strong></p>
              <ul>
                <li><strong>JVM (Java Virtual Machine)</strong>: Executes compiled Java Bytecode (.class files).</li>
                <li><strong>JRE (Java Runtime Environment)</strong>: Contains the JVM and standard libraries to run Java apps.</li>
                <li><strong>JDK (Java Development Kit)</strong>: Complete kit to develop Java applications, containing JRE, compiler (javac), and debugger tools.</li>
              </ul>
              <pre>
                <code>{`// Standard Java Hello World Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java World!");
    }
}`}</code>
              </pre>
            </div>
          )
        },
        {
          id: "java_datatypes",
          title: "2. Data Types & Variables",
          videoId: "A74TOX803D0",
          videoTitle: "Java Tutorial - Chapter 2: Primitive & Reference Data Types",
          xp: 100,
          content: (
            <div>
              <p>Java is a strongly typed language, meaning every variable must be declared with a data type before compilation.</p>
              <p><strong>Primitive Types</strong>: byte, short, int, long, float, double, boolean, char.</p>
              <p><strong>Reference Types</strong>: Strings, Arrays, Classes, Interfaces. They store references/memory address pointers to objects.</p>
              <pre>
                <code>{`// Declaring primitives and Reference Types in Java
int score = 450;
double price = 99.99;
boolean isActive = true;
String banner = "Welcome to SkillSphere Learning!";`}</code>
              </pre>
            </div>
          )
        },
        {
          id: "java_oops",
          title: "3. Core OOPs Pillars",
          videoId: "bSrmtUscR_4",
          videoTitle: "Java Tutorial - Chapter 3: OOPs Pillars (Classes, Inheritance, Polymorphism)",
          xp: 200,
          content: (
            <div>
              <p>Java is heavily anchored in Object-Oriented Programming (OOPs) structured around four pillars:</p>
              <ul>
                <li><strong>Inheritance</strong>: Child classes derive fields/methods from parent classes using <code>extends</code>.</li>
                <li><strong>Polymorphism</strong>: Methods perform different tasks based on object inputs (Overloading & Overriding).</li>
                <li><strong>Encapsulation</strong>: Restricting direct variable modifications using private scopes and public getters/setters.</li>
                <li><strong>Abstraction</strong>: Hiding complex logic using abstract classes or interfaces.</li>
              </ul>
              <pre>
                <code>{`// Abstract Class and Inheritance Example
abstract class Animal {
    public abstract void makeSound();
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof Woof!");
    }
}`}</code>
              </pre>
            </div>
          )
        },
        {
          id: "java_exceptions",
          title: "4. Exception Handling",
          videoId: "1ZX_iGz01-Q",
          videoTitle: "Java Tutorial - Chapter 4: Exception Handling & Try-Catch-Finally",
          xp: 150,
          content: (
            <div>
              <p>Exceptions are events that disrupt the normal flow of instructions. Java uses <code>try-catch-finally</code> blocks to handle errors gracefully.</p>
              <pre>
                <code>{`// Exception Try Catch Example
public class ExceptionTest {
    public static void main(String[] args) {
        try {
            int quotient = 100 / 0; // Throws ArithmeticException
        } catch (ArithmeticException e) {
            System.err.println("Math error: division by zero!");
        } finally {
            System.out.println("This block always executes.");
        }
    }
}`}</code>
              </pre>
            </div>
          )
        },
        {
          id: "java_collections",
          title: "5. Collections Framework",
          videoId: "VI_P-kF_b6c",
          videoTitle: "Java Tutorial - Chapter 5: Collections Framework (ArrayList, HashMap, HashSet)",
          xp: 200,
          content: (
            <div>
              <p>The Java Collections Framework provides an architecture to store and manipulate a group of objects dynamically.</p>
              <ul>
                <li><strong>List</strong>: Ordered list allowing duplicates (e.g. <code>ArrayList</code>, <code>LinkedList</code>).</li>
                <li><strong>Set</strong>: Unordered list rejecting duplicates (e.g. <code>HashSet</code>).</li>
                <li><strong>Map</strong>: Key-Value pairs mapping unique identifiers (e.g. <code>HashMap</code>).</li>
              </ul>
              <pre>
                <code>{`// HashMap Collection Example
import java.util.HashMap;

public class CollectionsTest {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("CypherLearner", 2450);
        map.put("NeonCoder", 2900);
        
        System.out.println("XP: " + map.get("CypherLearner"));
    }
}`}</code>
              </pre>
            </div>
          )
        },
        {
          id: "java_multithreading",
          title: "6. Java Multithreading",
          videoId: "r_MbozD32eo",
          videoTitle: "Java Tutorial - Chapter 6: Multithreading & Concurrent Execution",
          xp: 200,
          content: (
            <div>
              <p>Multithreading is a Java feature that allows concurrent execution of two or more threads for maximum CPU utilization.</p>
              <pre>
                <code>{`// Runnable Thread Example
class Task implements Runnable {
    public void run() {
        System.out.println("Running task inside thread: " + 
                           Thread.currentThread().getName());
    }
}

public class ThreadTest {
    public static void main(String[] args) {
        Thread thread = new Thread(new Task());
        thread.start(); // Starts the thread
    }
}`}</code>
              </pre>
            </div>
          )
        }
      ],
      quiz: [
        {
          q: "Which component of the Java architecture compiles code into bytecode?",
          options: [
            "JVM (Java Virtual Machine)",
            "JRE (Java Runtime Environment)",
            "JDK (which invokes javac compiler)",
            "JIT Compiler"
          ],
          correct: 2
        },
        {
          q: "What OOPs pillar is represented by extending a class and reusing its methods?",
          options: [
            "Encapsulation",
            "Inheritance",
            "Polymorphism",
            "Abstraction"
          ],
          correct: 1
        },
        {
          q: "What block is guaranteed to execute regardless of whether an exception is thrown?",
          options: [
            "try block",
            "catch block",
            "finally block",
            "throws block"
          ],
          correct: 2
        },
        {
          q: "Which collection interface rejects duplicate elements?",
          options: [
            "List",
            "Map",
            "Set",
            "Queue"
          ],
          correct: 2
        },
        {
          q: "How do you start a new Thread using a class that implements Runnable?",
          options: [
            "Call the run() method directly.",
            "Instantiate a Thread object passing the Runnable task, and call start().",
            "Use the start() keyword on the Runnable reference.",
            "Java runs Runnable classes automatically on compile."
          ],
          correct: 1
        }
      ]
    },
    springboot: {
      name: "Spring Boot Pro",
      class: "springboot",
      instructor: "Telusko (Navin Reddy)",
      videoTitle: "Spring Boot Core Framework & Microservices Course",
      videoId: "35EQXmHKZYs",
      badgeName: "Spring Boot Master Badge",
      badgeKey: "springboot_badge",
      topics: [
        {
          id: "springboot_intro",
          title: "1. Spring Boot Introduction",
          videoId: "5PdEmeopJVQ",
          videoTitle: "Spring Boot Tutorial - Chapter 1: Introduction & Project Setup",
          xp: 100,
          content: (
            <div>
              <p>Spring Boot is an extension of the Spring Framework that simplifies the bootstrapping and development of production-ready web applications by eliminating complex XML configurations.</p>
              <p><strong>Primary Features:</strong></p>
              <ul>
                <li><strong>Auto-Configuration</strong>: Automatically configures classes based on jar dependencies added to the project.</li>
                <li><strong>Starter Dependencies</strong>: Simplifies Maven/Gradle dependency imports using opinionated bundles.</li>
                <li><strong>Embedded Servers</strong>: Runs apps directly using built-in Tomcat (no external WAR deployment required).</li>
              </ul>
              <pre>
                <code>{`// Main Application class template
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`}</code>
              </pre>
            </div>
          )
        },
        {
          id: "springboot_mvc",
          title: "2. Controllers & Mappings",
          videoId: "vtPkZShrvXQ",
          videoTitle: "Spring Boot Tutorial - Chapter 2: Controllers & Web Request Mappings",
          xp: 150,
          content: (
            <div>
              <p>Spring Boot MVC uses the RestController annotation to build REST endpoints routing web requests directly to methods.</p>
              <pre>
                <code>{`// Spring Boot RestController Example
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {
    
    @GetMapping("/api/greet")
    public String getGreeting() {
        return "Greeting from SkillSphere Spring Boot microservice!";
    }
}`}</code>
              </pre>
            </div>
          )
        },
        {
          id: "springboot_di",
          title: "3. Dependency Injection",
          videoId: "vtPkZShrvXQ",
          videoTitle: "Spring Boot Tutorial - Chapter 3: Dependency Injection & IoC Containers",
          xp: 150,
          content: (
            <div>
              <p>Spring Core manages Dependency Injection (DI) through IoC (Inversion of Control) Containers. Class beans are registered using Component annotations and injected using <code>@Autowired</code>.</p>
              <pre>
                <code>{`// Service Injection Example
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class XpService {
    public int getMockXp() { return 2450; }
}

// Controller using injection
@RestController
class XpController {
    @Autowired
    private XpService xpService;
}`}</code>
              </pre>
            </div>
          )
        },
        {
          id: "springboot_jpa",
          title: "4. Spring Data JPA Repository",
          videoId: "9SGDpanrc8U",
          videoTitle: "Spring Boot Tutorial - Chapter 4: Spring Data JPA & Database Persistence",
          xp: 200,
          content: (
            <div>
              <p>Spring Data JPA simplifies database database layers by providing automatic CrudRepository interfaces, mapping SQL queries from method name declarations.</p>
              <pre>
                <code>{`// JPA Entity and Repository Mapping Template
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;

@Entity
class UserProfile {
    @Id
    private String email;
    private int xpPoints;
}

interface UserProfileRepository extends JpaRepository<UserProfile, String> {
    // Generates select * from user_profile where xp_points > ?
    List<UserProfile> findByXpPointsGreaterThan(int xpValue);
}`}</code>
              </pre>
            </div>
          )
        },
        {
          id: "springboot_rest",
          title: "5. Spring REST API & Responses",
          videoId: "35EQXmHKZYs",
          videoTitle: "Spring Boot Tutorial - Chapter 5: Building RESTful Web Services",
          xp: 200,
          content: (
            <div>
              <p>Spring Boot endpoints handle complex model object inputs via JSON serialization, binding payloads with `@RequestBody` and returning details using `@ResponseBody` inside response templates.</p>
              <pre>
                <code>{`// Rest Post mapping with ResponseEntity template
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;

@PostMapping("/api/xp/add")
public ResponseEntity<String> addXp(@RequestBody XpPayload payload) {
    if (payload.getPoints() <= 0) {
        return ResponseEntity.badRequest().body("Invalid point rewards!");
    }
    return ResponseEntity.ok("Successfully added " + payload.getPoints() + " XP!");
}`}</code>
              </pre>
            </div>
          )
        },
        {
          id: "springboot_security",
          title: "6. Spring Boot Security & JWT",
          videoId: "herX4m47GZ0",
          videoTitle: "Spring Boot Tutorial - Chapter 6: Spring Security & JWT Authentication",
          xp: 250,
          content: (
            <div>
              <p>Spring Security is the standard framework providing authentication, authorization, and protection against common web threats (like CSRF, SQL injections).</p>
              <pre>
                <code>{`// Basic Web Security Configure Bean
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeHttpRequests()
            .requestMatchers("/api/public/**").permitAll()
            .anyRequest().authenticated();
        return http.build();
    }
}`}</code>
              </pre>
            </div>
          )
        }
      ],
      quiz: [
        {
          q: "How does Spring Boot run web applications without external server installations?",
          options: [
            "It compiles code directly into native OS desktop binaries.",
            "It packages an embedded Tomcat server inside the executable build JAR.",
            "It uses JRE browser plugins to run bytecode dynamically.",
            "It requires Apache HTTP Server to serve static resources."
          ],
          correct: 1
        },
        {
          q: "Which annotation tells Spring Boot that a class routes API requests directly?",
          options: [
            "@Service",
            "@Component",
            "@RestController",
            "@Repository"
          ],
          correct: 2
        },
        {
          q: "What mechanism does @Autowired trigger in Spring Core?",
          options: [
            "Garbage collection of old controller variables.",
            "Automatic dependency injection of registered beans.",
            "Encryption of database JPA password fields.",
            "Compilation of custom SQL query mappings."
          ],
          correct: 1
        },
        {
          q: "What database mapping technology does Spring Data JPA integrate by default?",
          options: [
            "MongoDB document loader",
            "Redis Cache interface",
            "Hibernate ORM engine",
            "ElasticSearch index mappings"
          ],
          correct: 2
        },
        {
          q: "How do you map custom HTTP response headers and status codes in Spring Controllers?",
          options: [
            "By returning a raw String message value.",
            "By mapping the return using @ResponseBody only.",
            "By wrapping returns in a ResponseEntity<T> container object.",
            "By throwing custom RuntimeExceptions."
          ],
          correct: 2
        }
      ]
    }
  };

  const trackToCourseIdMap = {
    fsd: 1,
    react: 2,
    javascript: 3,
    dsa: 4,
    java: 4,
    genai: 5,
    ml: 6,
    node: 7,
    springboot: 7,
    nextjs: 8,
    web3: 9,
    aws: 10,
    python: 11,
    uiux: 12
  };

  const isCurrentTrackEnrolled = (trackKey = activeTrack) => {
    try {
      const savedIds = localStorage.getItem("enrolled_course_ids");
      const enrolledIds = savedIds ? JSON.parse(savedIds) : [1, 2, 3]; // Default enrolled
      const targetCourseId = trackToCourseIdMap[trackKey] || 2;
      return enrolledIds.includes(targetCourseId);
    } catch {
      return true;
    }
  };

  const [showQuickTipModal, setShowQuickTipModal] = useState(true);

  const getTopicQuickTip = (topicId) => {
    const tipsMap = {
      react_intro: "React Virtual DOM computes diffs in O(N) linear heuristics! Never mutate state directly—always use useState setters.",
      react_jsx: "Always attach unique key props (e.g. key={item.id}) to mapped JSX elements so React can optimize DOM reconciliation.",
      react_components: "Keep functional components pure! They should return identical JSX for the same props without side effects.",
      react_props_state: "State updates are async! When new state depends on previous state, use setCount(prev => prev + 1).",
      react_hooks: "Never call Hooks inside loops, conditions, or nested functions! Always call them at the top level of your component.",
      react_lifecycle: "Return cleanup functions in useEffect to unsubscribe from event listeners and prevent memory leaks.",
      
      javascript_intro: "JavaScript creates an Execution Context in 2 phases: 1) Memory Allocation (Hoisting) 2) Code Execution.",
      javascript_closures: "Closures retain references to outer scope variables! Be cautious of memory retention in long-lived listeners.",
      javascript_async: "Microtask Queue (Promises) has HIGHER execution priority than Macrotask Queue (setTimeout/setInterval).",
      javascript_promises: "Use Promise.allSettled() to await multiple operations safely without fail-fast crashes.",
      javascript_proto: "Objects inherit from Object.prototype. Use Object.create(proto) for clean prototypal delegation.",
      javascript_es6: ".map(), .filter(), and .reduce() are pure functions that do not mutate original arrays.",

      java_intro: "Primitive variables live on the Stack; object instances and arrays are allocated on the Heap.",
      java_oops: "Prefer composition over inheritance to create loosely-coupled, maintainable class hierarchies.",
      dsa_intro: "Binary Search operates in O(log N) time on sorted data. Midpoint formula: low + (high - low) / 2 to avoid overflow.",
      springboot_intro: "@RestController combines @Controller & @ResponseBody to automatically serialize outputs to JSON."
    };

    return tipsMap[topicId] || `Master the core architecture of ${currentTrack?.name || 'this module'}, practice writing modular code, and test edge cases thoroughly!`;
  };

  // Get current active track configuration
  const currentTrack = tracks[activeTrack] || tracks["react"];

  // Get current active topic configuration
  const currentTopic = currentTrack?.topics?.find(t => t.id === activeTopicId) || currentTrack?.topics?.[0] || tracks["react"].topics[0];

  // Calculate track progress
  const trackTopicIds = (currentTrack?.topics || []).map(t => t.id);
  const completedInTrackCount = trackTopicIds.filter(id => completedTopics.includes(id)).length;
  const trackProgressPct = Math.round((completedInTrackCount / (currentTrack?.topics?.length || 1)) * 100);

  const handleTrackChange = (trackKey) => {
    setActiveTrack(trackKey);
    setIsPlayingVideo(false);
    // Set default topic to first topic in selected track
    const targetTrack = tracks[trackKey] || tracks["react"];
    const firstTopicId = targetTrack?.topics?.[0]?.id || "react_intro";
    setActiveTopicId(firstTopicId);
    
    // Update browser URL parameter in real time
    navigate(`/learning?track=${trackKey}`, { replace: true });

    // Reset local quiz state
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setBadgeUnlocked(false);
  };

  const handleOptionSelect = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    if (!user) return;
    
    const quizList = currentTrack?.quiz || [
      { q: "What is the core concept of this course track?", options: ["High performance & architecture", "Manual data entry", "Unstyled text", "Hardware assembly"], correct: 0 }
    ];
    let correctCount = 0;
    quizList.forEach((question, idx) => {
      if (quizAnswers[idx] === question.correct) {
        correctCount++;
      }
    });

    const marks = correctCount * 4; // Max 20 marks
    const pct = (marks / 20) * 100;
    setQuizScore(marks);
    setQuizSubmitted(true);

    const isQuizPassedKey = `completed_quiz_${activeTrack}_${user.email || user.username}`;
    const wasQuizPreviouslyPassed = localStorage.getItem(isQuizPassedKey);

    // Dynamic XP Reward: 15 XP per Mark (Max 300 XP per track)
    if (!wasQuizPreviouslyPassed) {
      const earnedXpAmount = marks * 15;
      if (earnXp && earnedXpAmount > 0) {
        earnXp(earnedXpAmount);
      }
      localStorage.setItem(isQuizPassedKey, "true");
    }

    // Badge Unlock: 85% score threshold (>= 17 marks, i.e. 5/5 correct)
    if (pct >= 85) {
      localStorage.setItem(`badge_${currentTrack.badgeKey}_${user.email || user.username}`, "true");
      setBadgeUnlocked(true);
    } else {
      setBadgeUnlocked(false);
    }
  };

  return (
    <div className="learning-portal-page">
      <Background />
      <Navbar />

      <main className="learning-portal-content">
        
        {/* Header Title Section */}
        <section className="lp-header-section">
          <h1>Learning Curriculum Portal</h1>
          <p>Read programming modules in React, Java, and Spring Boot. Pass final track challenges to unlock cyber-badges!</p>
        </section>

        {/* Track Selector Tabs */}
        <section className="lp-track-tabs" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '25px', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
          {Object.keys(tracks).map(key => {
            const trk = tracks[key];
            const isActive = activeTrack === key;
            const isEnrolled = isCurrentTrackEnrolled(key);
            return (
              <button
                key={key}
                type="button"
                className={`lp-tab-btn ${trk.class || 'react'} ${isActive ? "active" : ""}`}
                onClick={() => handleTrackChange(key)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '24px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                  zIndex: 20,
                  border: isEnrolled ? (isActive ? '1px solid #00e5ff' : '1px solid rgba(255,255,255,0.15)') : '1px dashed rgba(239,68,68,0.5)',
                  opacity: isEnrolled ? 1 : 0.85
                }}
              >
                {isEnrolled ? (isActive ? "▶ " : "✓ ") : "🔒 "}{trk.name}
              </button>
            );
          })}
        </section>

        {/* Track Progress Bar */}
        <section className="lp-overall-progress">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '700' }}>
            <span>{currentTrack.name} Path Completion</span>
            <span style={{ color: '#00e5ff' }}>{completedInTrackCount} / {currentTrack.topics.length} Chapters ({trackProgressPct}%)</span>
          </div>
          <div className="lp-progress-bar-container">
            <div 
              className="lp-progress-bar-fill" 
              style={{ 
                width: `${trackProgressPct}%`,
                background: activeTrack === "react" ? "linear-gradient(90deg, #00e5ff, #8a2eff)" : activeTrack === "java" ? "linear-gradient(90deg, #ef4444, #f97316)" : "linear-gradient(90deg, #22c55e, #8a2eff)"
              }}
            ></div>
          </div>
        </section>

        {/* Workspace Columns / Lock Guard */}
        {!isCurrentTrackEnrolled() ? (
          <section className="lp-locked-workspace-banner" style={{
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '20px',
            padding: '50px 30px',
            textAlign: 'center',
            margin: '30px 0',
            boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(12px)'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '15px' }}>🔒</div>
            <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#ef4444', fontSize: '28px', marginBottom: '14px' }}>
              Course Content Locked — Enrollment Required
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '17px', maxWidth: '650px', margin: '0 auto 25px auto', lineHeight: '1.6' }}>
              You haven't enrolled in <strong>{currentTrack.name}</strong> yet. Please complete the quick enrollment checkout to unlock all 6 video modules, GFG reference notes, and cyber-badge assessments!
            </p>
            <button
              type="button"
              onClick={() => navigate('/courses')}
              style={{
                background: 'linear-gradient(90deg, #ef4444, #f97316)',
                color: '#ffffff',
                border: 'none',
                padding: '14px 36px',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 0 25px rgba(239, 68, 68, 0.4)'
              }}
            >
              💳 Go to Courses Catalog & Enroll ↗
            </button>
          </section>
        ) : (
          <div className="lp-split-workspace">
          
          {/* Left Sidebar Chapter List */}
          <aside className="lp-sidebar-chapters">
            {currentTrack.topics.map(topic => {
              const isCompleted = completedTopics.includes(topic.id);
              return (
                <div 
                  key={topic.id} 
                  className={`lp-chapter-item ${activeTopicId === topic.id ? "active" : ""}`}
                  onClick={() => setActiveTopicId(topic.id)}
                >
                  <span className="lp-chapter-title">{topic.title}</span>
                  <span className="lp-chapter-status">
                    {isCompleted ? (
                      <span className="lp-status-completed">✓</span>
                    ) : (
                      <span className="lp-status-pending">○</span>
                    )}
                  </span>
                </div>
              );
            })}

            {/* Quiz section in list */}
            <div 
              className={`lp-chapter-item ${activeTopicId === "quiz" ? "active" : ""}`}
              onClick={() => setActiveTopicId("quiz")}
              style={{ border: '1px dashed rgba(255, 255, 255, 0.15)', marginTop: '15px', background: activeTopicId === "quiz" ? 'rgba(0, 229, 255, 0.05)' : '' }}
            >
              <span className="lp-chapter-title" style={{ fontWeight: '700' }}>📝 Track Quiz Challenge</span>
              <span className="lp-chapter-status">
                {user && localStorage.getItem(`completed_quiz_${activeTrack}_${user.email || user.username}`) ? (
                  <span className="lp-status-completed">✓ Passed</span>
                ) : (
                  <span className="lp-status-pending">20 Marks</span>
                )}
              </span>
            </div>
          </aside>

          {/* Right Main Reading Panel */}
          <article className="lp-reading-panel">
            {activeTopicId === "quiz" ? (
              /* Quiz Render Mode */
              <div>
                <div className="lp-tutorial-header">
                  <div className="lp-tutorial-title">
                    <h2>Track Quiz Challenge: {currentTrack.name}</h2>
                    <span style={{ fontSize: '14px', color: '#94a3b8' }}>Total Marks: 20 (5 questions * 4 marks each). Needs 85% (17+ marks) to unlock the badge!</span>
                  </div>
                </div>

                {quizSubmitted && (
                  <div className={`lp-quiz-results ${quizScore >= 17 ? "" : "failed"}`}>
                    <h3 className="lp-quiz-results-title">
                      {quizScore >= 17 ? "🎉 Assessment Passed!" : "⚠️ Assessment Failed"}
                    </h3>
                    <p style={{ fontSize: '18px', fontWeight: '700' }}>Your Score: {quizScore} / 20 Marks ({Math.round((quizScore / 20) * 100)}%)</p>
                    <p style={{ fontSize: '15px', color: '#94a3b8', marginTop: '8px' }}>
                      {quizScore >= 17 
                        ? `Congratulations! You unlocked the ${currentTrack.badgeName}! View it in your dashboard.`
                        : "You scored less than 85%. Review the chapters and try again to unlock your badge."
                      }
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmitQuiz} className="lp-quiz-container">
                  {(currentTrack?.quiz || [
                    { q: "What is the core concept of this course track?", options: ["High performance & architecture", "Manual data entry", "Unstyled text", "Hardware assembly"], correct: 0 }
                  ]).map((item, qIdx) => (
                    <div key={qIdx} className="lp-quiz-question-card">
                      <p className="lp-quiz-question-text">{qIdx + 1}. {item.q}</p>
                      <div className="lp-quiz-options">
                        {item.options.map((opt, optIdx) => (
                          <label 
                            key={optIdx} 
                            className={`lp-quiz-option-label ${quizAnswers[qIdx] === optIdx ? "selected" : ""}`}
                          >
                            <input 
                              type="radio" 
                              name={`question_${qIdx}`}
                              className="lp-quiz-option-input"
                              checked={quizAnswers[qIdx] === optIdx}
                              onChange={() => handleOptionSelect(qIdx, optIdx)}
                              disabled={quizSubmitted}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="lp-completion-area" style={{ marginTop: '20px' }}>
                    {!user ? (
                      <>
                        <span className="lp-guest-warning">⚠️ Please log in to submit your quiz and earn XP!</span>
                        <button className="lp-btn-complete" type="button" onClick={() => navigate('/login')}>
                          Sign In
                        </button>
                      </>
                    ) : user.role !== 'STUDENT' ? (
                      <span className="lp-guest-warning">⚠️ Only Student accounts can submit quizzes to earn rewards.</span>
                    ) : quizSubmitted ? (
                      <button 
                        className="lp-btn-complete" 
                        type="button"
                        onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}
                        style={{ background: 'transparent', border: '1px solid #00e5ff', color: '#00e5ff', boxShadow: 'none' }}
                      >
                        Retake Quiz
                      </button>
                    ) : (
                      <button 
                        className="lp-btn-complete" 
                        type="submit"
                        disabled={Object.keys(quizAnswers).length < currentTrack.quiz.length}
                      >
                        Submit Quiz
                      </button>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              /* Tutorial Render Mode */
              <div>
                {/* Quick Revision Tip Pop-Up Card */}
                {showQuickTipModal ? (
                  <div className="lp-quick-tip-card" style={{
                    background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.14), rgba(138, 46, 255, 0.14))',
                    border: '1px solid rgba(0, 229, 255, 0.45)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    marginBottom: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '15px',
                    boxShadow: '0 8px 25px rgba(0, 229, 255, 0.2)'
                  }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ fontSize: '26px' }}>💡</span>
                      <div>
                        <strong style={{ color: '#00e5ff', fontSize: '14px', fontFamily: 'Orbitron, sans-serif', display: 'block', marginBottom: '4px' }}>
                          Quick Pro-Tip ({currentTopic?.title}):
                        </strong>
                        <span style={{ color: '#f8fafc', fontSize: '13px', lineHeight: '1.5' }}>
                          {getTopicQuickTip(currentTopic?.id)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowQuickTipModal(false)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        border: 'none',
                        color: '#ffffff',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Got It! 👍
                    </button>
                  </div>
                ) : (
                  <div style={{ marginBottom: '18px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => setShowQuickTipModal(true)}
                      style={{
                        background: 'rgba(0, 229, 255, 0.1)',
                        border: '1px solid rgba(0, 229, 255, 0.3)',
                        color: '#00e5ff',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      💡 Show Quick Pro-Tip
                    </button>
                  </div>
                )}

                <div>
                  <div className="lp-tutorial-header">
                    <div className="lp-tutorial-title">
                      <h2>{currentTopic.title}</h2>
                      <span style={{ fontSize: '14px', color: '#94a3b8' }}>Course: {currentTrack.name}</span>
                    </div>
                    <div className="lp-tutorial-reward">
                      +{currentTopic.xp} XP REWARD
                    </div>
                  </div>

                  <div className="lp-tutorial-content">
                    {currentTopic.content}
                  </div>
                </div>

                {/* GeeksforGeeks (GFG) Reference Notes & Revision Module */}
                <div className="gfg-notes-section" style={{
                  marginTop: '30px',
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(46, 204, 113, 0.35)',
                  borderRadius: '14px',
                  padding: '24px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(46, 204, 113, 0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '24px' }}>📖</span>
                      <h3 style={{ margin: 0, fontFamily: 'Orbitron, sans-serif', color: '#2ecc71', fontSize: '18px' }}>
                        GeeksforGeeks (GFG) Quick Revision Notes & Article Reference
                      </h3>
                    </div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      background: 'rgba(46, 204, 113, 0.15)',
                      color: '#2ecc71',
                      border: '1px solid rgba(46, 204, 113, 0.3)',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      textTransform: 'uppercase'
                    }}>
                      GFG Verified Notes
                    </span>
                  </div>

                  <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                    Reference notes compiled from <strong>GeeksforGeeks Tech Articles & Interview Guides</strong> for <em>{currentTopic?.title}</em>.
                  </p>

                  {/* GFG Summary Breakdown Box */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                    <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '14px', borderRadius: '10px', borderLeft: '4px solid #2ecc71' }}>
                      <strong style={{ color: '#2ecc71', fontSize: '13px', display: 'block', marginBottom: '4px' }}>⚡ Time Complexity (GFG):</strong>
                      <span style={{ color: '#f8fafc', fontSize: '13px' }}>
                        {activeTrack === "react" ? "O(1) Virtual DOM diffing computation" : activeTrack === "java" ? "O(1) Heap allocation / O(Log N) tree ops" : "O(1) Dependency Injection context lookup"}
                      </span>
                    </div>
                    <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '14px', borderRadius: '10px', borderLeft: '4px solid #00e5ff' }}>
                      <strong style={{ color: '#00e5ff', fontSize: '13px', display: 'block', marginBottom: '4px' }}>💾 Auxiliary Space (GFG):</strong>
                      <span style={{ color: '#f8fafc', fontSize: '13px' }}>
                        {activeTrack === "react" ? "O(N) component state tree storage" : activeTrack === "java" ? "O(N) object reference heap footprint" : "O(N) Spring container bean instance map"}
                      </span>
                    </div>
                  </div>

                  {/* GFG Key Interview Takeaways */}
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#f8fafc', fontSize: '14px' }}>💡 Top GFG Interview Takeaways:</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#94a3b8', fontSize: '13px', lineHeight: '1.7' }}>
                      <li>Understand the core underlying memory lifecycle and execution flow before optimizing code.</li>
                      <li>Avoid unnecessary re-renders or object allocations inside loop constructs.</li>
                      <li>Refer to official GFG problem sets to practice coding problems based on this topic.</li>
                    </ul>
                  </div>

                  {/* GFG External Link */}
                  <div style={{ marginTop: '18px', textAlign: 'right' }}>
                    <a 
                      href={
                        activeTrack === "react" 
                          ? "https://www.geeksforgeeks.org/reactjs-tutorials/" 
                          : activeTrack === "java" 
                          ? "https://www.geeksforgeeks.org/java/" 
                          : "https://www.geeksforgeeks.org/spring-boot-tutorial/"
                      } 
                      target="_blank" 
                      rel="noreferrer"
                      style={{
                        color: '#2ecc71',
                        textDecoration: 'none',
                        fontSize: '13px',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>Read Full GeeksforGeeks Article & Practice Problems ↗</span>
                    </a>
                  </div>
                </div>

                {/* Interactive Embedded YouTube Player */}
                {(() => {
                  const activeTopicVideoId = currentTopic?.videoId || currentTrack.videoId || "w7ejDZ8SWv8";
                  const activeTopicVideoTitle = currentTopic?.videoTitle || currentTrack.videoTitle || "React JS Course Video";
                  
                  return (
                    <div className="lp-video-section" style={{ marginTop: '30px', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', overflow: 'hidden', background: 'rgba(15, 23, 42, 0.7)', padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                        <h4 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '16px', color: activeTrack === "react" ? "#00e5ff" : activeTrack === "java" ? "#f97316" : "#22c55e", margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          🎥 Video Lesson: {activeTopicVideoTitle}
                        </h4>
                        
                        <button 
                          onClick={() => window.open(`https://www.youtube.com/watch?v=${activeTopicVideoId}`, '_blank')}
                          style={{
                            background: 'rgba(255, 0, 0, 0.15)',
                            border: '1px solid rgba(255, 0, 0, 0.4)',
                            color: '#ff4d4d',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <span>Open on YouTube ↗</span>
                        </button>
                      </div>

                      {isPlayingVideo ? (
                        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: '10px', overflow: 'hidden', background: '#000', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
                          <iframe
                            src={`https://www.youtube.com/embed/${activeTopicVideoId}?autoplay=1&rel=0`}
                            title={activeTopicVideoTitle}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              border: 'none'
                            }}
                          />
                        </div>
                      ) : (
                        <div 
                          className="lp-video-thumbnail-container"
                          onClick={() => setIsPlayingVideo(true)}
                          style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden', borderRadius: '10px', background: '#000', cursor: 'pointer' }}
                        >
                          <img 
                            src={`https://img.youtube.com/vi/${activeTopicVideoId}/hqdefault.jpg`} 
                            alt={activeTopicVideoTitle}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                          />
                          <div className="lp-video-play-overlay">
                            <span style={{ fontSize: '32px' }}>▶</span>
                          </div>
                          <div style={{
                            position: 'absolute',
                            bottom: '12px',
                            left: '12px',
                            background: 'rgba(0, 0, 0, 0.75)',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            color: '#ffffff',
                            fontWeight: '600'
                          }}>
                            Click to Play Video Inline
                          </div>
                        </div>
                      )}

                      <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginTop: '10px', fontStyle: 'italic' }}>
                        Instructor: <strong>{currentTrack.instructor}</strong> • Interactive Module Video
                      </span>
                    </div>
                  );
                })()}

                {/* Bottom complete action button */}
                <div className="lp-completion-area" style={{ marginTop: '35px' }}>
                  {!user ? (
                    <>
                      <span className="lp-guest-warning">
                        ⚠️ Please sign up or log in as a student to save progress and earn XP rewards!
                      </span>
                      <button className="lp-btn-complete" onClick={() => navigate('/login')}>
                        Sign In
                      </button>
                    </>
                  ) : user.role !== 'STUDENT' ? (
                    <span className="lp-guest-warning" style={{ color: '#ff00c8' }}>
                      ⚠️ XP rewards and study trackers are exclusive to Student accounts.
                    </span>
                  ) : completedTopics.includes(currentTopic.id) ? (
                    <button className="lp-btn-complete" disabled>
                      ✓ Completed (+{currentTopic.xp} XP Earned)
                    </button>
                  ) : (
                    <button 
                      className="lp-btn-complete" 
                      onClick={() => completeTopic(currentTopic.id, currentTopic.xp)}
                    >
                      Mark Chapter as Completed
                    </button>
                  )}
                </div>
              </div>
            )}
          </article>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}