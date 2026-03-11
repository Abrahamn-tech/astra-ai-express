"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "convex/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Footer from "@/components/custom/Footer";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Lookup from "@/data/Lookup";
import Colors from "@/data/Colors";
import { 
  ArrowRight, 
  Link as LinkIcon, 
  Loader2, 
  Clock, 
  Code2, 
  Wand2, 
  Sparkles, 
  Zap, 
  Shield, 
  Github, 
  Rocket, 
  Users, 
  BarChart3, 
  Puzzle, 
  Globe, 
  FolderOpen,
  Terminal,
  Database,
  Cloud,
  Cpu,
  GitBranch,
  Package,
  Star,
  TrendingUp,
  CheckCircle,
  ArrowUpRight
} from "lucide-react";

// Helper function to format relative time
export function formatRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

function Hero() {
  const [userInput, setUserInput] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail, isLoadingUser } =
    useContext(UserDetailContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const CreateWorkspace = useMutation(api.workspace.CreateWorkSpace);
  const router = useRouter();

  // Fetch user's previous workspaces
  const workspaces = useQuery(
    api.workspace.GetAllWorkspace,
    userDetail?._id ? { userId: userDetail._id } : "skip"
  );

  useEffect(() => {
    console.log("UserDetail updated:", userDetail);
  }, [userDetail]);

  const onGenerate = async (input) => {
    if (!input?.trim()) return;

    console.log("onGenerate called with userDetail:", userDetail);

    if (isLoadingUser) {
      console.log("Still loading user...");
      return;
    }

    const msg = { role: "user", content: input };
    setMessages([msg]);

    if (!userDetail || !userDetail._id) {
      console.log("User not authenticated, saving prompt and redirecting to auth page");
      // Save the prompt to sessionStorage before redirecting
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pendingPrompt", input);
      }
      router.push("/auth");
      return;
    }

    try {
      setIsLoading(true);
      const workspaceId = await CreateWorkspace({
        user: userDetail._id,
        messages: [msg],
        title: input.slice(0, 50) + (input.length > 50 ? "..." : ""),
        description: input,
      });

      setIsNavigating(true);
      router.push("/workspace/" + workspaceId);
    } catch (error) {
      console.error("Error creating workspace:", error);
      setIsLoading(false);
      setIsNavigating(false);
    }
  };

  const enhancePrompt = async () => {
    if (!userInput?.trim()) return;

    setIsEnhancing(true);
    try {
      const response = await fetch("/api/enhance-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await response.json();
      if (data.enhancedPrompt) {
        setUserInput(data.enhancedPrompt);
      }
    } catch (error) {
      console.error("Error enhancing prompt:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const navigateToWorkspace = (workspaceId) => {
    setIsNavigating(true);
    router.push("/workspace/" + workspaceId);
  };

  // Extract first user message from workspace
  const getWorkspaceTitle = (workspace) => {
    if (workspace?.messages && workspace.messages.length > 0) {
      const firstUserMsg = workspace.messages.find((m) => m.role === "user");
      if (firstUserMsg?.content) {
        return (
          firstUserMsg.content.slice(0, 60) +
          (firstUserMsg.content.length > 60 ? "..." : "")
        );
      }
    }
    return "Untitled Workspace";
  };

  return (
    <>
      {/* Navigation Loader Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
            <p className="text-white text-lg font-medium">
              Moving to your workspace...
            </p>
          </div>
        </div>
      )}

      {/* Background Gradient Animation */}
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(5, 8, 25)"
        gradientBackgroundEnd="rgb(10, 15, 40)"
        firstColor="59, 130, 246"
        secondColor="139, 92, 246"
        thirdColor="34, 211, 238"
        fourthColor="124, 58, 237"
        fifthColor="56, 189, 248"
        pointerColor="103, 232, 249"
        size="80%"
        blendingValue="hard-light"
        interactive={true}
        containerClassName="fixed inset-0 -z-10"
      />

      {/* Hero Content */}
      <div className="flex flex-col items-center mt-20 xl:mt-32 gap-12 px-4">
        {/* Professional Hero Section */}
        <div className="text-center space-y-8 max-w-5xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Powered by Advanced AI</span>
            <ArrowUpRight className="h-4 w-4" />
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center leading-tight">
              <span className="block text-white mb-2">Build production-ready</span>
              <span className="block bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient">
                applications
              </span>
              <span className="block text-white mt-2">with AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-normal max-w-4xl mx-auto leading-relaxed">
              Transform your ideas into fully functional web applications in minutes. 
              Modern tech stack, enterprise-grade security, and seamless GitHub integration.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-12 py-8 border-y border-gray-800">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">10K+</div>
              <div className="text-sm text-gray-400">Apps Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">50K+</div>
              <div className="text-sm text-gray-400">Developers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">1M+</div>
              <div className="text-sm text-gray-400">Lines Generated</div>
            </div>
          </div>
        </div>

        {/* Professional Prompt Input Section */}
        <div className="w-full max-w-4xl">
          <div
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
            <div className="relative bg-black/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-white mb-2">Start Building</h3>
                  <p className="text-gray-400">Describe what you want to create</p>
                </div>
                
                <div className="flex gap-4">
                  <textarea
                    value={userInput}
                    placeholder="e.g., Create a task management app with drag-and-drop functionality..."
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (
                          userInput?.trim() &&
                          !isLoading &&
                          !isNavigating &&
                          !isEnhancing
                        ) {
                          onGenerate(userInput);
                        }
                      }
                    }}
                    spellCheck={false}
                    className="flex-1 outline-none bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 resize-none h-32 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    {userInput && (
                      <button
                        onClick={enhancePrompt}
                        disabled={isEnhancing || isLoading || isNavigating}
                        className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 ${
                          isEnhancing || isLoading || isNavigating
                            ? "opacity-50 cursor-not-allowed bg-gray-800"
                            : "bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer hover:scale-105"
                        }`}
                      >
                        {isEnhancing ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Enhancing...</span>
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-4 w-4" />
                            <span>Enhance</span>
                          </>
                        )}
                      </button>
                    )}
                    
                    <button
                      onClick={() =>
                        !isLoading &&
                        !isNavigating &&
                        !isEnhancing &&
                        onGenerate(userInput)
                      }
                      disabled={!userInput?.trim() || isLoading || isNavigating || isEnhancing}
                      className={`px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-200 ${
                        !userInput?.trim() || isLoading || isNavigating || isEnhancing
                          ? "opacity-50 cursor-not-allowed bg-gray-800 text-gray-400"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white cursor-pointer hover:scale-105 shadow-lg"
                      }`}
                    >
                      {isLoading || isNavigating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Creating...</span>
                        </>
                      ) : (
                        <>
                          <Rocket className="h-4 w-4" />
                          <span>Build App</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-emerald-500" />
                      <span>Instant Preview</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-emerald-500" />
                      <span>GitHub Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Templates */}
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Popular Templates</h3>
            <p className="text-gray-400">Start with these proven patterns</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Terminal className="h-5 w-5" />, title: "CLI Tool", desc: "Command-line interface" },
              { icon: <Database className="h-5 w-5" />, title: "Dashboard", desc: "Analytics dashboard" },
              { icon: <Cloud className="h-5 w-5" />, title: "SaaS App", desc: "Multi-tenant platform" },
              { icon: <Users className="h-5 w-5" />, title: "Social App", desc: "Community platform" }
            ].map((template, index) => (
              <button
                key={index}
                onClick={() => !isLoading && !isNavigating && !isEnhancing && onGenerate(`Create a ${template.title.toLowerCase()}: ${template.desc}`)}
                className="group p-4 bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl hover:border-blue-500 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                    {template.icon}
                  </div>
                  <h4 className="text-white font-semibold">{template.title}</h4>
                </div>
                <p className="text-gray-400 text-sm">{template.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Professional Features Grid */}
        <div className="w-full max-w-7xl mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Ship
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From idea to production in minutes, not weeks. Professional tools that developers actually use.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Core Features */}
            <div className="group bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg group-hover:scale-110 transition-transform">
                  <Cpu className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">AI-Powered Generation</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Advanced AI models understand your requirements and generate complete, production-ready applications with modern best practices.
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-400">
                <CheckCircle className="h-4 w-4" />
                <span>GPT-4 Powered</span>
              </div>
            </div>

            <div className="group bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-lg group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Real-time Preview</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                See your application come to life instantly with our live preview system. Make changes and watch them update in real-time.
              </p>
              <div className="flex items-center gap-2 text-sm text-purple-400">
                <CheckCircle className="h-4 w-4" />
                <span>Hot Reload</span>
              </div>
            </div>

            <div className="group bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-emerald-500 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-500/20 rounded-lg group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Enterprise Security</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Your code and data are protected with enterprise-grade security. OAuth authentication and encrypted storage keep your projects safe.
              </p>
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle className="h-4 w-4" />
                <span>SOC 2 Compliant</span>
              </div>
            </div>

            {/* Developer Tools */}
            <div className="group bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-orange-500 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-orange-500/20 rounded-lg group-hover:scale-110 transition-transform">
                  <GitBranch className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Git Integration</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Seamless Git integration with automatic branching, commit management, and pull request generation for professional workflows.
              </p>
              <div className="flex items-center gap-2 text-sm text-orange-400">
                <CheckCircle className="h-4 w-4" />
                <span>Auto-commits</span>
              </div>
            </div>

            <div className="group bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cyan-500 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:scale-110 transition-transform">
                  <Package className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Modern Stack</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Built with the latest technologies: Next.js 15, React 19, Tailwind CSS, and TypeScript for optimal performance.
              </p>
              <div className="flex items-center gap-2 text-sm text-cyan-400">
                <CheckCircle className="h-4 w-4" />
                <span>Always Updated</span>
              </div>
            </div>

            <div className="group bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-pink-500 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-pink-500/20 rounded-lg group-hover:scale-110 transition-transform">
                  <Rocket className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">One-Click Deploy</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Deploy to production with a single click. Supports Vercel, Netlify, AWS, and custom deployments out of the box.
              </p>
              <div className="flex items-center gap-2 text-sm text-pink-400">
                <CheckCircle className="h-4 w-4" />
                <span>CI/CD Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="w-full max-w-6xl mt-16 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Trusted by Modern Developers</h2>
            <p className="text-gray-400">Built with the tools you love</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Convex", "Google AI", "Vercel", "GitHub"].map((tech) => (
              <div key={tech} className="text-gray-400 font-medium text-lg">
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Previous Workspaces Section */}
        {userDetail && workspaces && workspaces.length > 0 && (
          <div className="w-full max-w-6xl mt-12 mb-20">
            <div className="flex items-center gap-2 mb-6">
              <Code2 className="h-6 w-6 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">
                Your Recent Projects
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {workspaces.slice(0, 6).map((workspace) => (
                <div
                  key={workspace._id}
                  onClick={() => navigateToWorkspace(workspace._id)}
                  className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4 cursor-pointer hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 overflow-hidden"
                >
                  {/* Animated gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-300" />

                  <div className="relative z-10">
                    {/* Preview Section */}
                    <div className="bg-gray-950/50 rounded-lg p-3 mb-3 h-32 overflow-hidden border border-gray-700/50">
                      <div className="text-xs text-gray-400 font-mono overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                        {workspace.messages && workspace.messages.length > 0 ? (
                          workspace.messages.slice(0, 3).map((msg, idx) => (
                            <div key={idx} className="mb-2">
                              <span
                                className={
                                  msg.role === "user"
                                    ? "text-blue-400"
                                    : "text-purple-400"
                                }
                              >
                                {msg.role === "user" ? "You: " : "AI: "}
                              </span>
                              <span className="text-gray-300">
                                {msg.content.slice(0, 80)}
                                {msg.content.length > 80 ? "..." : ""}
                              </span>
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-500">No messages yet</span>
                        )}
                      </div>
                    </div>

                    {/* Workspace Info */}
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold truncate group-hover:text-purple-300 transition-colors">
                        {getWorkspaceTitle(workspace)}
                      </h4>

                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>
                          {formatRelativeTime(workspace._creationTime)}
                        </span>
                      </div>

                      {/* Messages count */}
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                          {workspace.messages?.length || 0} messages
                        </div>
                        {workspace.fileData && (
                          <div className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                            Has files
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover arrow indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-5 w-5 text-purple-400" />
                  </div>
                </div>
              ))}
            </div>

            {workspaces.length > 6 && (
              <div className="text-center mt-6">
                <Link
                  href="/workspaces"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors group"
                >
                  View all workspaces
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}

            {/* Quick Access Link */}
            {workspaces.length > 0 && (
              <div className="text-center mt-4">
                <Link
                  href="/workspaces"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-purple-500/50 rounded-lg text-purple-400 hover:text-purple-300 hover:border-purple-400 transition-all duration-200 text-sm"
                >
                  <FolderOpen className="h-4 w-4" />
                  Manage All Workspaces
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Hero;
