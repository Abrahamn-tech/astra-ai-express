"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Footer from "@/components/custom/Footer";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Clock, 
  Star, 
  GitBranch,
  Download,
  Upload,
  Settings,
  Trash2,
  Eye,
  Heart,
  MoreVertical,
  Loader2,
  FolderOpen,
  Zap,
  Sparkles,
  Rocket,
  ArrowUpRight,
  CheckCircle
} from "lucide-react";
import { formatRelativeTime } from "@/components/custom/Hero";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function WorkspacesPage() {
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [filterStatus, setFilterStatus] = useState("all"); // all, public, private, templates
  const [sortBy, setSortBy] = useState("recent"); // recent, name, views, likes
  const [selectedWorkspaces, setSelectedWorkspaces] = useState([]);
  
  const router = useRouter();
  const CreateWorkspace = useMutation(api.workspace.CreateWorkSpace);
  const DeleteWorkspace = useMutation(api.workspace.DeleteWorkspace);
  const UpdateWorkspace = useMutation(api.workspace.UpdateWorkspace);

  // Fetch user's workspaces
  const workspaces = useQuery(
    api.workspace.GetAllWorkspace,
    userDetail?._id ? { userId: userDetail._id } : "skip"
  );

  const [isLoading, setIsLoading] = useState(false);

  // Filter and sort workspaces
  const filteredWorkspaces = workspaces?.filter(workspace => {
    const matchesSearch = workspace.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workspace.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workspace.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "public" && workspace.isPublic) ||
                         (filterStatus === "private" && !workspace.isPublic) ||
                         (filterStatus === "templates" && workspace.isTemplate);
    
    return matchesSearch && matchesFilter;
  }) || [];

  const sortedWorkspaces = [...filteredWorkspaces].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return (a.title || "").localeCompare(b.title || "");
      case "views":
        return (b.views || 0) - (a.views || 0);
      case "likes":
        return (b.likes || 0) - (a.likes || 0);
      case "recent":
      default:
        return (b._creationTime || 0) - (a._creationTime || 0);
    }
  });

  const handleCreateWorkspace = async () => {
    if (!userDetail?._id) return;
    
    setIsLoading(true);
    try {
      const workspaceId = await CreateWorkspace({
        user: userDetail._id,
        messages: [{ role: "user", content: "New workspace" }],
        title: "Untitled Workspace",
        description: "",
        tags: [],
        isPublic: false,
        isTemplate: false,
        views: 0,
        likes: 0,
      });
      
      router.push(`/workspace/${workspaceId}`);
    } catch (error) {
      console.error("Error creating workspace:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    if (!confirm("Are you sure you want to delete this workspace? This action cannot be undone.")) {
      return;
    }
    
    try {
      await DeleteWorkspace({ workspaceId });
    } catch (error) {
      console.error("Error deleting workspace:", error);
    }
  };

  const handleTogglePublic = async (workspaceId, isPublic) => {
    try {
      await UpdateWorkspace({
        workspaceId,
        isPublic: !isPublic,
      });
    } catch (error) {
      console.error("Error updating workspace:", error);
    }
  };

  const handleToggleTemplate = async (workspaceId, isTemplate) => {
    try {
      await UpdateWorkspace({
        workspaceId,
        isTemplate: !isTemplate,
      });
    } catch (error) {
      console.error("Error updating workspace:", error);
    }
  };

  const navigateToWorkspace = (workspaceId) => {
    router.push(`/workspace/${workspaceId}`);
  };

  const getWorkspaceTitle = (workspace) => {
    if (workspace?.title) return workspace.title;
    if (workspace?.messages && workspace.messages.length > 0) {
      const firstUserMsg = workspace.messages.find((m) => m.role === "user");
      if (firstUserMsg?.content) {
        return firstUserMsg.content.slice(0, 60) + (firstUserMsg.content.length > 60 ? "..." : "");
      }
    }
    return "Untitled Workspace";
  };

  const getWorkspaceDescription = (workspace) => {
    return workspace?.description || "No description available";
  };

  if (!userDetail) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/20 rounded-full mb-4">
              <FolderOpen className="h-10 w-10 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Sign in to view your workspaces</h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Access your AI-powered projects and continue building amazing applications
            </p>
            <Button 
              onClick={() => router.push("/auth")} 
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium"
            >
              Sign In to Continue
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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

      <div className="min-h-screen p-6">
        {/* Professional Hero Section */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
              <Code2 className="h-4 w-4" />
              <span>Workspace Management</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Your <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400">Creative Hub</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Manage and organize all your AI-powered projects in one beautiful workspace
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-12 py-8 border-y border-gray-800">
              <div className="text-center group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{sortedWorkspaces.length}</div>
                <div className="text-sm text-gray-400">Total Projects</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {sortedWorkspaces.reduce((sum, w) => sum + (w.views || 0), 0)}
                </div>
                <div className="text-sm text-gray-400">Total Views</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                  {sortedWorkspaces.reduce((sum, w) => sum + (w.likes || 0), 0)}
                </div>
                <div className="text-sm text-gray-400">Total Likes</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {sortedWorkspaces.filter(w => w.isPublic).length}
                </div>
                <div className="text-sm text-gray-400">Public Projects</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              onClick={handleCreateWorkspace}
              disabled={isLoading}
              className="bg-linear-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-medium shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-3" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                  Create New Workspace
                  <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Professional Filters Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search your creative projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all hover:border-gray-600"
                >
                  <option value="all">All Projects</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="templates">Templates</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all hover:border-gray-600"
                >
                  <option value="recent">Most Recent</option>
                  <option value="name">Name</option>
                  <option value="views">Most Viewed</option>
                  <option value="likes">Most Liked</option>
                </select>

                <div className="flex gap-1 bg-gray-900/50 border border-gray-700 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 rounded-lg transition-all ${
                      viewMode === "grid" 
                        ? "bg-blue-500 text-white shadow-lg" 
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 rounded-lg transition-all ${
                      viewMode === "list" 
                        ? "bg-blue-500 text-white shadow-lg" 
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workspaces Grid/List */}
        <div className="max-w-7xl mx-auto">
          {sortedWorkspaces.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-800/50 rounded-full mb-6">
                <FolderOpen className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">No workspaces found</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                {searchQuery || filterStatus !== "all" 
                  ? "Try adjusting your search or filters to find your projects" 
                  : "Create your first workspace to start building amazing applications with AI"
                }
              </p>
              <Button
                onClick={handleCreateWorkspace}
                disabled={isLoading}
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-3" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Rocket className="h-5 w-5 mr-3" />
                    Create Your First Workspace
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
              {sortedWorkspaces.map((workspace) => (
                <div
                  key={workspace._id}
                  className={`group bg-black/40 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 ${
                    viewMode === "list" ? "flex items-center p-6" : "flex flex-col"
                  }`}
                >
                  {/* Workspace Header */}
                  <div className={`${viewMode === "list" ? "flex-1 flex items-center gap-6" : "p-6 pb-0"}`}>
                    <div className={`${viewMode === "list" ? "flex-1" : "space-y-4"}`}>
                      {/* Title and Status */}
                      <div className="flex items-start justify-between">
                        <h3 className={`font-semibold text-white group-hover:text-blue-300 transition-colors ${
                          viewMode === "list" ? "text-xl" : "text-lg"
                        }`}>
                          {getWorkspaceTitle(workspace)}
                        </h3>
                        
                        <div className="flex items-center gap-2">
                          {workspace.isPublic && (
                            <div className="bg-blue-500/20 text-blue-300 text-xs px-2.5 py-1 rounded-full font-medium">
                              Public
                            </div>
                          )}
                          {workspace.isTemplate && (
                            <div className="bg-purple-500/20 text-purple-300 text-xs px-2.5 py-1 rounded-full font-medium">
                              Template
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`text-gray-400 leading-relaxed ${
                        viewMode === "list" ? "text-base line-clamp-2" : "text-sm line-clamp-3"
                      }`}>
                        {getWorkspaceDescription(workspace)}
                      </p>

                      {/* Tags */}
                      {workspace.tags && workspace.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {workspace.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-800/50 text-gray-300 text-xs px-2.5 py-1 rounded-lg border border-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                          {workspace.tags.length > 3 && (
                            <span className="text-gray-500 text-xs px-2.5 py-1">
                              +{workspace.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>{formatRelativeTime(workspace._creationTime)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Eye className="h-4 w-4" />
                          <span>{workspace.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Heart className="h-4 w-4" />
                          <span>{workspace.likes || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Code2 className="h-4 w-4" />
                          <span>{workspace.messages?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={`${viewMode === "list" ? "flex items-center gap-3 ml-6" : "p-6 pt-0"}`}>
                    <Button
                      onClick={() => navigateToWorkspace(workspace._id)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                      size={viewMode === "list" ? "sm" : "default"}
                    >
                      {viewMode === "list" ? "Open" : "Open Workspace"}
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size={viewMode === "list" ? "sm" : "default"}
                          className="text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-900 border-gray-800 rounded-xl shadow-2xl">
                        <DropdownMenuItem
                          onClick={() => handleTogglePublic(workspace._id, workspace.isPublic)}
                          className="text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                          <Sparkles className="h-4 w-4 mr-3" />
                          {workspace.isPublic ? "Make Private" : "Make Public"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleTemplate(workspace._id, workspace.isTemplate)}
                          className="text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                          <Zap className="h-4 w-4 mr-3" />
                          {workspace.isTemplate ? "Remove from Templates" : "Add to Templates"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigateToWorkspace(workspace._id)}
                          className="text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteWorkspace(workspace._id)}
                          className="text-red-400 hover:text-red-300 hover:bg-gray-800 transition-colors"
                        >
                          <Trash2 className="h-4 w-4 mr-3" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
