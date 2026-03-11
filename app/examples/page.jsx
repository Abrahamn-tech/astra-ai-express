"use client";
import React from "react";
import Link from "next/link";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Footer from "@/components/custom/Footer";
import { Button } from "@/components/ui/button";
import { Search, Filter, ExternalLink, Code2, Zap, Globe, Database, Shield, Star, Users, Clock, Download, Play, ArrowUpRight } from "lucide-react";

export default function ExamplesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState("all");

  const categories = [
    { id: "all", name: "All Examples" },
    { id: "web", name: "Web Apps" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "api", name: "API Services" },
    { id: "dashboard", name: "Dashboards" },
    { id: "ecommerce", name: "E-commerce" },
    { id: "social", name: "Social Media" },
    { id: "productivity", name: "Productivity" },
  ];

  const difficulties = [
    { id: "all", name: "All Levels" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ];

  const examples = [
    {
      id: 1,
      title: "Todo App",
      description: "A simple but powerful todo application with drag-and-drop functionality",
      category: "web",
      difficulty: "beginner",
      image: "/examples/todo.jpg",
      tags: ["React", "Tailwind", "Local Storage"],
      features: ["Add/Edit/Delete Tasks", "Drag & Drop", "Local Storage", "Categories"],
      author: "Astra Team",
      likes: 234,
      forks: 89,
      liveUrl: "https://todo-example.astra-ai.com",
      githubUrl: "https://github.com/astra-ai/todo-example",
      tutorialUrl: "/examples/todo-tutorial",
    },
    {
      id: 2,
      title: "Weather Dashboard",
      description: "Real-time weather dashboard with beautiful visualizations",
      category: "dashboard",
      difficulty: "intermediate",
      image: "/examples/weather.jpg",
      tags: ["React", "Charts", "API Integration"],
      features: ["Live Weather Data", "Interactive Charts", "Location Search", "Forecast"],
      author: "Community",
      likes: 567,
      forks: 123,
      liveUrl: "https://weather-example.astra-ai.com",
      githubUrl: "https://github.com/astra-ai/weather-example",
      tutorialUrl: "/examples/weather-tutorial",
    },
    {
      id: 3,
      title: "E-commerce Store",
      description: "Full-featured e-commerce platform with cart and checkout",
      category: "ecommerce",
      difficulty: "advanced",
      image: "/examples/ecommerce.jpg",
      tags: ["React", "Node.js", "Stripe", "MongoDB"],
      features: ["Product Catalog", "Shopping Cart", "Payment Integration", "Admin Panel"],
      author: "Astra Team",
      likes: 890,
      forks: 234,
      liveUrl: "https://ecommerce-example.astra-ai.com",
      githubUrl: "https://github.com/astra-ai/ecommerce-example",
      tutorialUrl: "/examples/ecommerce-tutorial",
    },
    {
      id: 4,
      title: "Chat Application",
      description: "Real-time chat application with rooms and messaging",
      category: "social",
      difficulty: "intermediate",
      image: "/examples/chat.jpg",
      tags: ["Socket.io", "React", "Node.js", "Authentication"],
      features: ["Real-time Messaging", "Chat Rooms", "User Authentication", "File Sharing"],
      author: "Community",
      likes: 445,
      forks: 167,
      liveUrl: "https://chat-example.astra-ai.com",
      githubUrl: "https://github.com/astra-ai/chat-example",
      tutorialUrl: "/examples/chat-tutorial",
    },
    {
      id: 5,
      title: "Task Management System",
      description: "Professional task management system with team collaboration",
      category: "productivity",
      difficulty: "advanced",
      image: "/examples/taskmanager.jpg",
      tags: ["React", "Firebase", "Collaboration", "Real-time"],
      features: ["Task Management", "Team Collaboration", "Real-time Updates", "Analytics"],
      author: "Astra Team",
      likes: 678,
      forks: 198,
      liveUrl: "https://taskmanager-example.astra-ai.com",
      githubUrl: "https://github.com/astra-ai/taskmanager-example",
      tutorialUrl: "/examples/taskmanager-tutorial",
    },
    {
      id: 6,
      title: "Blog Platform",
      description: "Modern blog platform with markdown support and comments",
      category: "web",
      difficulty: "intermediate",
      image: "/examples/blog.jpg",
      tags: ["Markdown", "React", "Node.js", "Comments"],
      features: ["Markdown Editor", "Comment System", "Categories", "Search"],
      author: "Community",
      likes: 345,
      forks: 98,
      liveUrl: "https://blog-example.astra-ai.com",
      githubUrl: "https://github.com/astra-ai/blog-example",
      tutorialUrl: "/examples/blog-tutorial",
    },
  ];

  const filteredExamples = examples.filter(example => {
    const matchesSearch = example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         example.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         example.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || example.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || example.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner": return "text-green-400 bg-green-400/20";
      case "intermediate": return "text-yellow-400 bg-yellow-400/20";
      case "advanced": return "text-red-400 bg-red-400/20";
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6">
              <Code2 className="h-4 w-4" />
              <span>Examples Gallery</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
              Learn by <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400">Example</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Explore real-world examples built with Astra AI and learn from the community
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 mb-8 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search examples..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                      selectedCategory === category.id
                        ? "bg-blue-500 text-white shadow-lg"
                        : "bg-gray-900/50 text-gray-400 border border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Difficulty Filter */}
              <div className="flex gap-2 flex-wrap">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty.id}
                    onClick={() => setSelectedDifficulty(difficulty.id)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                      selectedDifficulty === difficulty.id
                        ? "bg-purple-500 text-white shadow-lg"
                        : "bg-gray-900/50 text-gray-400 border border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    {difficulty.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Examples Grid */}
          {filteredExamples.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-500 text-lg mb-4">No examples found</div>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredExamples.map((example) => (
                <div key={example.id} className="group bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-blue-500/20">
                  {/* Example Image */}
                  <div className="relative h-48 bg-linear-to-br from-blue-500/20 to-purple-500/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code2 className="h-16 w-16 text-blue-400/50 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(example.difficulty)}`}>
                        {example.difficulty}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white border border-gray-700">
                        {example.category}
                      </span>
                    </div>
                  </div>

                  {/* Example Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors mb-2">
                          {example.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{example.description}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {example.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-800/50 text-gray-300 text-xs px-2 py-1 rounded-lg border border-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white mb-2">Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {example.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="text-xs text-gray-400">
                            • {feature}
                          </span>
                        ))}
                        {example.features.length > 3 && (
                          <span className="text-xs text-gray-400">+{example.features.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400" />
                          <span>{example.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{example.forks}</span>
                        </div>
                      </div>
                    </div>

                    {/* Author */}
                    <div className="text-sm text-gray-400 mb-4">
                      by <span className="text-blue-400">{example.author}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link href={example.liveUrl} target="_blank">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-300 flex-1 hover:scale-105 transition-all"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Live Demo
                        </Button>
                      </Link>
                      <Link href={example.githubUrl} target="_blank">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-300 hover:scale-105 transition-all"
                        >
                          <Code2 className="h-3 w-3" />
                        </Button>
                      </Link>
                      <Link href={example.tutorialUrl}>
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/30"
                        >
                          Tutorial
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contribute Section */}
          <div className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Contribute Your Examples</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
              Share your projects with the community and help others learn from your work
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-300 hover:scale-105 transition-all">
                <ExternalLink className="h-4 w-4 mr-2" />
                Submit Example
              </Button>
              <Link href="/docs/contributing">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/30">
                  Guidelines
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
