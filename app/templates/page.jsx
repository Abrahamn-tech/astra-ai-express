"use client";
import React from "react";
import Link from "next/link";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid3X3, List, Star, Download, Heart, Eye, Clock, Sparkles, Code2, Zap, ArrowUpRight } from "lucide-react";

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [viewMode, setViewMode] = React.useState("grid");
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const categories = [
    { id: "all", name: "All Templates", icon: Sparkles },
    { id: "web", name: "Web Apps", icon: Code2 },
    { id: "mobile", name: "Mobile Apps", icon: Zap },
    { id: "api", name: "API Services", icon: Code2 },
    { id: "dashboard", name: "Dashboards", icon: Grid3X3 },
  ];

  const templates = [
    {
      id: 1,
      name: "E-commerce Store",
      description: "Full-featured online shopping platform with cart, checkout, and payment integration",
      category: "web",
      image: "/templates/ecommerce.jpg",
      downloads: 1250,
      rating: 4.8,
      reviews: 89,
      author: "Astra Team",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      difficulty: "Intermediate",
    },
    {
      id: 2,
      name: "Task Management App",
      description: "Collaborative task management system with real-time updates and team features",
      category: "web",
      image: "/templates/taskmanager.jpg",
      downloads: 890,
      rating: 4.6,
      reviews: 67,
      author: "Astra Team",
      tags: ["React", "Firebase", "Tailwind"],
      difficulty: "Beginner",
    },
    {
      id: 3,
      name: "Weather Dashboard",
      description: "Beautiful weather dashboard with forecasts, maps, and location-based data",
      category: "dashboard",
      image: "/templates/weather.jpg",
      downloads: 567,
      rating: 4.7,
      reviews: 45,
      author: "Community",
      tags: ["React", "API", "Charts"],
      difficulty: "Beginner",
    },
    {
      id: 4,
      name: "Social Media App",
      description: "Complete social networking platform with posts, likes, and real-time messaging",
      category: "mobile",
      image: "/templates/social.jpg",
      downloads: 2100,
      rating: 4.9,
      reviews: 156,
      author: "Astra Team",
      tags: ["React Native", "Node.js", "Socket.io"],
      difficulty: "Advanced",
    },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />
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
              <Sparkles className="h-4 w-4" />
              <span>Templates Gallery</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
              Start <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400">Faster</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Build amazing applications faster with our collection of professionally designed templates
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 mb-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search templates..."
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
                    <category.icon className="h-4 w-4 inline mr-2" />
                    {category.name}
                  </button>
                ))}
              </div>

              {/* View Mode */}
              <div className="flex gap-2 bg-gray-900/50 border border-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === "grid" ? "bg-blue-500 text-white shadow-lg" : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === "list" ? "bg-blue-500 text-white shadow-lg" : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-500 text-lg mb-4">No templates found</div>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-blue-500/20"
                >
                  {/* Template Image */}
                  <div className="relative h-48 bg-linear-to-br from-blue-500/20 to-purple-500/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code2 className="h-16 w-16 text-blue-400/50 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white border border-gray-700">
                      {template.difficulty}
                    </div>
                  </div>

                  {/* Template Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors mb-2">
                          {template.name}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{template.description}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-800/50 text-gray-300 text-xs px-2 py-1 rounded-lg border border-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          <span>{template.downloads}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400" />
                          <span>{template.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{template.reviews}</span>
                        </div>
                      </div>
                    </div>

                    {/* Author */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        by <span className="text-blue-400 hover:text-blue-300 transition-colors">{template.author}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-300 hover:scale-105 transition-all"
                        >
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/30"
                        >
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
