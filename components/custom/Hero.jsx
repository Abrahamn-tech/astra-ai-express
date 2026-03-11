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
import { ArrowRight, Link as LinkIcon, Loader2, Clock, Code2, Wand2, Sparkles, Zap, Shield, Github, Rocket, Users, BarChart3, Puzzle, Globe, FolderOpen } from "lucide-react";

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
      console.log("User not authenticated, redirecting to auth page");
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
      <div className="flex flex-col items-center mt-24 xl:mt-36 gap-8 px-4">
        {/* Main Hero Section */}
        <div className="text-center space-y-6 max-w-4xl">
          <div className="space-y-4">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-center">
              Turn your{" "}
              <span className="font-['Press_Start_2P'] bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-300 animate-gradient">
                ideas
              </span>{" "}
              into{" "}
              <span className="font-['Press_Start_2P'] bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-purple-300 animate-gradient">
                apps
              </span>{" "}
              instantly
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-medium max-w-3xl mx-auto">
              Transform your concepts into production-ready applications with the power of AI. 
              No coding experience required - just describe what you want to build.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 py-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">10K+</div>
              <div className="text-sm text-gray-400">Apps Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">50K+</div>
              <div className="text-sm text-gray-400">Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">1M+</div>
              <div className="text-sm text-gray-400">Lines of Code</div>
            </div>
          </div>
        </div>

        {/* Prompt Input Section */}
        <div
          className="p-6 border rounded-2xl max-w-2xl w-full shadow-2xl"
          style={{ backgroundColor: Colors.BACKGROUND }}
        >
          <div className="flex gap-3">
            <textarea
              value={userInput}
              placeholder={Lookup.INPUT_PLACEHOLDER}
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
              className="outline-none bg-transparent w-full h-36 max-h-48 resize-none text-white placeholder-gray-500"
              disabled={isLoading || isNavigating || isEnhancing}
            />
            {userInput && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={enhancePrompt}
                  disabled={isEnhancing || isLoading || isNavigating}
                  className={`p-3 h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    isEnhancing || isLoading || isNavigating
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:scale-105"
                  } bg-emerald-500 hover:bg-emerald-600 shadow-lg`}
                  title="Enhance prompt with AI"
                >
                  {isEnhancing ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <Wand2 className="h-6 w-6" />
                  )}
                </button>
                <button
                  onClick={() =>
                    !isLoading &&
                    !isNavigating &&
                    !isEnhancing &&
                    onGenerate(userInput)
                  }
                  disabled={isLoading || isNavigating || isEnhancing}
                  className={`p-3 h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    isLoading || isNavigating || isEnhancing
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:scale-105"
                  } bg-blue-500 hover:bg-blue-600 shadow-lg`}
                  title="Generate workspace"
                >
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Sparkles className="h-4 w-4" />
              <span>AI-powered code generation</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Zap className="h-4 w-4" />
              <span>Instant preview</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Github className="h-4 w-4" />
              <span>Export to GitHub</span>
            </div>
          </div>
        </div>

        {/* Suggested Prompts */}
        <div className="w-full max-w-4xl">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Popular Ideas</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Lookup?.SUGGESTIONS.map((s, index) => (
              <button
                key={index}
                onClick={() =>
                  !isLoading && !isNavigating && !isEnhancing && onGenerate(s)
                }
                className="px-4 py-2 border border-gray-700 rounded-full text-sm text-gray-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200 group"
              >
                <span className="flex items-center gap-2">
                  <Rocket className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  {s}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Features Showcase */}
        <div className="w-full max-w-6xl mt-16 mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose Astra AI?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg group-hover:scale-110 transition-transform">
                  <Sparkles className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">AI-Powered Generation</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Advanced AI models understand your requirements and generate complete, 
                production-ready applications with modern best practices.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-lg group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Real-time Preview</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                See your application come to life instantly with our live preview system. 
                Make changes and watch them update in real-time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-emerald-500 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-500/20 rounded-lg group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Enterprise Security</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your code and data are protected with enterprise-grade security. 
                OAuth authentication and encrypted storage keep your projects safe.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-orange-500 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-orange-500/20 rounded-lg group-hover:scale-110 transition-transform">
                  <Github className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">GitHub Integration</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Seamlessly push your projects to GitHub repositories. 
                Collaborate with your team and maintain version control effortlessly.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cyan-500 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Collaborative Workspaces</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Share your workspaces with team members, collaborate in real-time, 
                and build amazing applications together.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-pink-500 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-pink-500/20 rounded-lg group-hover:scale-110 transition-transform">
                  <Puzzle className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Template Library</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Start with professional templates or create your own. 
                Accelerate development with pre-built components and layouts.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="w-full max-w-4xl mt-12 mb-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Built with Modern Technologies
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-gray-400 font-medium">Next.js 15</div>
            <div className="text-gray-400 font-medium">React 19</div>
            <div className="text-gray-400 font-medium">Tailwind CSS</div>
            <div className="text-gray-400 font-medium">Convex</div>
            <div className="text-gray-400 font-medium">Google AI</div>
            <div className="text-gray-400 font-medium">Sandpack</div>
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
