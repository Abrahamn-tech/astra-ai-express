"use client";
import React from "react";
import Link from "next/link";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Footer from "@/components/custom/Footer";
import { Button } from "@/components/ui/button";
import { Code2, Copy, Check, Search, Terminal, Database, Cloud, Shield, Zap } from "lucide-react";

export default function APIPage() {
  const [copiedEndpoint, setCopiedEndpoint] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const endpoints = [
    {
      category: "Authentication",
      icon: Shield,
      endpoints: [
        {
          method: "POST",
          path: "/api/auth/google",
          description: "Authenticate with Google OAuth",
          parameters: ["code", "state"],
          response: "user object with token"
        },
        {
          method: "POST",
          path: "/api/auth/username",
          description: "Authenticate with username/password",
          parameters: ["username", "password"],
          response: "user object with token"
        },
        {
          method: "POST",
          path: "/api/auth/logout",
          description: "Logout current user",
          parameters: ["token"],
          response: "success message"
        }
      ]
    },
    {
      category: "AI Generation",
      icon: Zap,
      endpoints: [
        {
          method: "POST",
          path: "/api/ai/generate",
          description: "Generate code from natural language",
          parameters: ["prompt", "language", "framework"],
          response: "generated code and files"
        },
        {
          method: "POST",
          path: "/api/ai/enhance",
          description: "Enhance prompt for better results",
          parameters: ["prompt"],
          response: "enhanced prompt"
        },
        {
          method: "POST",
          path: "/api/ai/chat",
          description: "Chat with AI for code refinement",
          parameters: ["message", "context"],
          response: "AI response"
        }
      ]
    },
    {
      category: "Workspace",
      icon: Database,
      endpoints: [
        {
          method: "GET",
          path: "/api/workspace",
          description: "Get all user workspaces",
          parameters: ["userId", "token"],
          response: "array of workspace objects"
        },
        {
          method: "POST",
          path: "/api/workspace/create",
          description: "Create new workspace",
          parameters: ["title", "description", "userId"],
          response: "workspace object"
        },
        {
          method: "PUT",
          path: "/api/workspace/:id",
          description: "Update workspace",
          parameters: ["workspaceId", "updates"],
          response: "updated workspace"
        },
        {
          method: "DELETE",
          path: "/api/workspace/:id",
          description: "Delete workspace",
          parameters: ["workspaceId"],
          response: "success message"
        }
      ]
    },
    {
      category: "Files & Assets",
      icon: Cloud,
      endpoints: [
        {
          method: "GET",
          path: "/api/files/:workspaceId",
          description: "Get all files in workspace",
          parameters: ["workspaceId"],
          response: "array of file objects"
        },
        {
          method: "POST",
          path: "/api/files/upload",
          description: "Upload file to workspace",
          parameters: ["file", "workspaceId", "path"],
          response: "file object"
        },
        {
          method: "DELETE",
          path: "/api/files/:fileId",
          description: "Delete file",
          parameters: ["fileId"],
          response: "success message"
        }
      ]
    }
  ];

  const filteredEndpoints = endpoints.map(category => ({
    ...category,
    endpoints: category.endpoints.filter(endpoint =>
      endpoint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.parameters.some(param => param.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.endpoints.length > 0);

  const getMethodColor = (method) => {
    switch (method) {
      case "GET": return "text-green-400 bg-green-400/20";
      case "POST": return "text-blue-400 bg-blue-400/20";
      case "PUT": return "text-yellow-400 bg-yellow-400/20";
      case "DELETE": return "text-red-400 bg-red-400/20";
      default: return "text-gray-400 bg-gray-400/20";
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(text);
    setTimeout(() => setCopiedEndpoint(""), 2000);
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
            <h1 className="text-4xl font-bold text-white mb-4">API Reference</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Complete API documentation for integrating Astra AI into your applications
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search endpoints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* API Key Section */}
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">API Authentication</h2>
            </div>
            <p className="text-gray-400 mb-4">
              All API requests must include your API key in the Authorization header:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Authorization: Bearer your-api-key-here</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard("Authorization: Bearer your-api-key-here")}
                  className="text-gray-400 hover:text-white"
                >
                  {copiedEndpoint === "Authorization: Bearer your-api-key-here" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <Button variant="outline" className="border-gray-700 text-gray-300">
                Get API Key
              </Button>
              <Link href="/docs/authentication">
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
                  Learn More →
                </Button>
              </Link>
            </div>
          </div>

          {/* Endpoints */}
          <div className="space-y-8">
            {filteredEndpoints.map((category) => (
              <div key={category.category} className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="h-6 w-6 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">{category.category}</h2>
                </div>
                
                <div className="space-y-6">
                  {category.endpoints.map((endpoint, index) => (
                    <div key={index} className="border-l-2 border-gray-700 pl-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded text-xs font-mono ${getMethodColor(endpoint.method)}`}>
                            {endpoint.method}
                          </span>
                          <code className="text-blue-400 font-mono">{endpoint.path}</code>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(`${endpoint.method} ${endpoint.path}`)}
                          className="text-gray-400 hover:text-white"
                        >
                          {copiedEndpoint === `${endpoint.method} ${endpoint.path}` ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      
                      <p className="text-gray-300 mb-3">{endpoint.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white mb-2">Parameters:</h4>
                        <div className="flex flex-wrap gap-2">
                          {endpoint.parameters.map((param, paramIndex) => (
                            <span key={paramIndex} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm">
                              {param}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Response:</h4>
                        <p className="text-gray-400 text-sm">{endpoint.response}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Rate Limits */}
          <div className="mt-12 bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Rate Limits</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-medium mb-2">Free Plan</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>• 100 requests per hour</li>
                  <li>• 10 AI generations per day</li>
                  <li>• Community support</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Pro Plan</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>• 1000 requests per hour</li>
                  <li>• 100 AI generations per day</li>
                  <li>• Priority support</li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/pricing">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          </div>

          {/* SDKs */}
          <div className="mt-12 bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Official SDKs</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">JavaScript / TypeScript</h3>
                <p className="text-gray-400 text-sm mb-3">npm install @astra-ai/sdk</p>
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                  Documentation
                </Button>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Python</h3>
                <p className="text-gray-400 text-sm mb-3">pip install astra-ai</p>
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                  Documentation
                </Button>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">cURL / REST</h3>
                <p className="text-gray-400 text-sm mb-3">Direct HTTP requests</p>
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                  Examples
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
