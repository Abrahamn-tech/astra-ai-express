"use client";
import React from "react";
import Link from "next/link";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Footer from "@/components/custom/Footer";
import { Button } from "@/components/ui/button";
import { Book, Code2, Zap, Shield, Users, Github, ChevronRight, Search, FileText, Video, MessageCircle } from "lucide-react";

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeSection, setActiveSection] = React.useState("getting-started");

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Zap,
      description: "Quick start guide and basic concepts",
      articles: [
        { title: "Installation", slug: "installation", difficulty: "Beginner" },
        { title: "Quick Start", slug: "quick-start", difficulty: "Beginner" },
        { title: "Basic Concepts", slug: "basic-concepts", difficulty: "Beginner" },
        { title: "Your First App", slug: "first-app", difficulty: "Beginner" },
      ]
    },
    {
      id: "guides",
      title: "Guides",
      icon: Book,
      description: "Step-by-step tutorials and examples",
      articles: [
        { title: "Building a Todo App", slug: "todo-app", difficulty: "Beginner" },
        { title: "Creating a Blog", slug: "blog", difficulty: "Intermediate" },
        { title: "E-commerce Platform", slug: "ecommerce", difficulty: "Advanced" },
        { title: "Real-time Chat", slug: "chat", difficulty: "Advanced" },
      ]
    },
    {
      id: "api-reference",
      title: "API Reference",
      icon: Code2,
      description: "Complete API documentation",
      articles: [
        { title: "AI Generation API", slug: "ai-api", difficulty: "Intermediate" },
        { title: "Workspace API", slug: "workspace-api", difficulty: "Intermediate" },
        { title: "User Management", slug: "user-api", difficulty: "Intermediate" },
        { title: "File Operations", slug: "file-api", difficulty: "Advanced" },
      ]
    },
    {
      id: "tutorials",
      title: "Tutorials",
      icon: Video,
      description: "Video tutorials and walkthroughs",
      articles: [
        { title: "Introduction to Astra AI", slug: "intro", difficulty: "Beginner" },
        { title: "Advanced Prompt Engineering", slug: "prompts", difficulty: "Intermediate" },
        { title: "Custom Components", slug: "components", difficulty: "Advanced" },
        { title: "Deployment Guide", slug: "deployment", difficulty: "Intermediate" },
      ]
    },
    {
      id: "community",
      title: "Community",
      icon: Users,
      description: "Community resources and support",
      articles: [
        { title: "Discord Server", slug: "discord", difficulty: "All" },
        { title: "GitHub Discussions", slug: "github", difficulty: "All" },
        { title: "Contributing", slug: "contributing", difficulty: "Intermediate" },
        { title: "Code of Conduct", slug: "conduct", difficulty: "All" },
      ]
    },
  ];

  const filteredSections = sections.map(section => ({
    ...section,
    articles: section.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.slug.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.articles.length > 0);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "text-green-400 bg-green-400/20";
      case "Intermediate": return "text-yellow-400 bg-yellow-400/20";
      case "Advanced": return "text-red-400 bg-red-400/20";
      default: return "text-gray-400 bg-gray-400/20";
    }
  };

  return (
    <>
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

      <div className="min-h-screen">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to know to build amazing applications with Astra AI
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <Link href="/docs/quick-start" className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <div className="flex items-center gap-3">
                <Zap className="h-8 w-8 text-blue-400" />
                <div>
                  <h3 className="text-white font-semibold">Quick Start</h3>
                  <p className="text-gray-400 text-sm">Get started in 5 minutes</p>
                </div>
              </div>
            </Link>
            <Link href="/docs/api" className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <div className="flex items-center gap-3">
                <Code2 className="h-8 w-8 text-purple-400" />
                <div>
                  <h3 className="text-white font-semibold">API Reference</h3>
                  <p className="text-gray-400 text-sm">Complete API docs</p>
                </div>
              </div>
            </Link>
            <Link href="/docs/examples" className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <div className="flex items-center gap-3">
                <Book className="h-8 w-8 text-green-400" />
                <div>
                  <h3 className="text-white font-semibold">Examples</h3>
                  <p className="text-gray-400 text-sm">Sample projects</p>
                </div>
              </div>
            </Link>
            <Link href="/docs/support" className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-orange-400" />
                <div>
                  <h3 className="text-white font-semibold">Support</h3>
                  <p className="text-gray-400 text-sm">Get help</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Documentation Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-white mb-6">Table of Contents</h2>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-500 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <section.icon className="h-4 w-4" />
                        <span>{section.title}</span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {filteredSections.map((section) => (
                <div key={section.id} className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <section.icon className="h-6 w-6 text-blue-400" />
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  </div>
                  <p className="text-gray-400 mb-6">{section.description}</p>
                  
                  <div className="space-y-3">
                    {section.articles.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/docs/${section.id}/${article.slug}`}
                        className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                          <div>
                            <h3 className="text-white font-medium group-hover:text-blue-300 transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-gray-500 text-sm">/docs/{section.id}/{article.slug}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(article.difficulty)}`}>
                            {article.difficulty}
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Section */}
          <div className="mt-16 text-center">
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Join Our Community</h2>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Connect with other developers, share your projects, and get help from the Astra AI team
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-300">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Users className="h-4 w-4 mr-2" />
                  Discord
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
