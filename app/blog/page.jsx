"use client";
import React from "react";
import Link from "next/link";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Footer from "@/components/custom/Footer";
import { Button } from "@/components/ui/button";
import { Search, Calendar, User, Clock, Tag, ChevronRight, Book, MessageCircle, Heart, Share2, ArrowUpRight } from "lucide-react";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const categories = [
    { id: "all", name: "All Posts" },
    { id: "tutorials", name: "Tutorials" },
    { id: "announcements", name: "Announcements" },
    { id: "guides", name: "Guides" },
    { id: "news", name: "News" },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Astra AI: A Complete Guide",
      excerpt: "Learn how to build your first application with Astra AI. This comprehensive guide covers everything from setup to deployment.",
      category: "tutorials",
      author: "Sarah Chen",
      authorRole: "Developer Advocate",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "/blog/getting-started.jpg",
      tags: ["beginner", "tutorial", "getting-started"],
      likes: 234,
      comments: 45,
      featured: true,
    },
    {
      id: 2,
      title: "Building a Real-time Chat App with Astra AI",
      excerpt: "Step-by-step tutorial on creating a real-time chat application using Astra AI's powerful features and modern web technologies.",
      category: "tutorials",
      author: "Mike Johnson",
      authorRole: "Senior Developer",
      date: "2024-01-12",
      readTime: "12 min read",
      image: "/blog/chat-app.jpg",
      tags: ["intermediate", "real-time", "socket.io"],
      likes: 189,
      comments: 32,
      featured: true,
    },
    {
      id: 3,
      title: "Astra AI 2.0: What's New and Exciting",
      excerpt: "Discover the latest features and improvements in Astra AI 2.0, including enhanced AI capabilities and new integrations.",
      category: "announcements",
      author: "Astra Team",
      authorRole: "Product Team",
      date: "2024-01-10",
      readTime: "5 min read",
      image: "/blog/v2-release.jpg",
      tags: ["announcement", "release", "features"],
      likes: 567,
      comments: 89,
      featured: false,
    },
    {
      id: 4,
      title: "Advanced Prompt Engineering Techniques",
      excerpt: "Master the art of prompt engineering to get the best results from Astra AI's code generation capabilities.",
      category: "guides",
      author: "Dr. Emily Rodriguez",
      authorRole: "AI Researcher",
      date: "2024-01-08",
      readTime: "15 min read",
      image: "/blog/prompt-engineering.jpg",
      tags: ["advanced", "ai", "prompts"],
      likes: 342,
      comments: 67,
      featured: false,
    },
    {
      id: 5,
      title: "From Idea to Production: A Complete Workflow",
      excerpt: "Follow the complete journey from concept to deployment with Astra AI, including best practices and optimization tips.",
      category: "guides",
      author: "Alex Thompson",
      authorRole: "Full Stack Developer",
      date: "2024-01-05",
      readTime: "10 min read",
      image: "/blog/workflow.jpg",
      tags: ["workflow", "production", "best-practices"],
      likes: 423,
      comments: 78,
      featured: false,
    },
    {
      id: 6,
      title: "Community Spotlight: Amazing Projects Built with Astra AI",
      excerpt: "Explore incredible projects created by our community members using Astra AI. Get inspired and learn from real-world examples.",
      category: "news",
      author: "Community Team",
      authorRole: "Community Manager",
      date: "2024-01-03",
      readTime: "6 min read",
      image: "/blog/community.jpg",
      tags: ["community", "showcase", "projects"],
      likes: 298,
      comments: 54,
      featured: false,
    },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
              <Book className="h-4 w-4" />
              <span>Astra AI Blog</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
              Latest <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400">Insights</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Latest news, tutorials, and insights from Astra AI team and community
            </p>
          </div>

          {/* Search and Category Filter */}
          <div className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 mb-12 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search blog posts..."
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
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Featured Posts</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredPosts.map((post) => (
                  <div key={post.id} className="group bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500 transition-all duration-300 hover:scale-105 shadow-xl">
                    {/* Post Image */}
                    <div className="relative h-48 bg-linear-to-br from-blue-500/20 to-purple-500/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Book className="h-16 w-16 text-blue-400/50 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                          Featured
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                      <Link href={`/blog/${post.id}`}>
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors mb-3">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-800/50 text-gray-300 text-xs px-2 py-1 rounded-lg border border-gray-700"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {regularPosts.map((post) => (
              <div key={post.id} className="group bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500 transition-all duration-300 hover:scale-105 shadow-xl">
                {/* Post Image */}
                <div className="relative h-32 bg-linear-to-br from-blue-500/20 to-purple-500/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Book className="h-12 w-12 text-blue-400/50 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <Link href={`/blog/${post.id}`}>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors mb-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{post.excerpt}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-800/50 text-gray-300 text-xs px-2 py-1 rounded-lg border border-gray-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 text-center mb-12 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
              Get latest tutorials, announcements, and insights delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
              />
              <Button className="bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/30">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Categories Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.slice(1).map((category) => {
              const categoryCount = blogPosts.filter(post => post.category === category.id).length;
              return (
                <Link
                  key={category.id}
                  href={`/blog/category/${category.id}`}
                  className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-xl p-4 hover:border-blue-500 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium group-hover:text-blue-300 transition-colors">{category.name}</h3>
                      <p className="text-gray-400 text-sm">{categoryCount} posts</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
