"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
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
  Rocket
} from "lucide-react";
import Footer from "@/components/custom/Footer";
import Lookup from "@/data/Lookup";
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please sign in to view your workspaces</h2>
          <Button onClick={() => router.push("/auth")} className="bg-blue-500 hover:bg-blue-600">
            Sign In
          </Button>
        </div>
      </div>
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
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Your Workspaces</h1>
              <p className="text-gray-400">
                Manage and organize all your AI-generated projects
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                onClick={handleCreateWorkspace}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <Plus className="h-5 w-5 mr-2" />
                )}
                New Workspace
              </Button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search workspaces..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="all">All Workspaces</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="templates">Templates</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="recent">Most Recent</option>
                  <option value="name">Name</option>
                  <option value="views">Most Viewed</option>
                  <option value="likes">Most Liked</option>
                </select>

                <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">{sortedWorkspaces.length} Workspaces</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-purple-400" />
                <span className="text-gray-300">
                  {sortedWorkspaces.reduce((sum, w) => sum + (w.views || 0), 0)} Total Views
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">
                  {sortedWorkspaces.reduce((sum, w) => sum + (w.likes || 0), 0)} Total Likes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Workspaces Grid/List */}
        <div className="max-w-7xl mx-auto">
          {sortedWorkspaces.length === 0 ? (
            <div className="text-center py-20">
              <FolderOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No workspaces found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery || filterStatus !== "all" 
                  ? "Try adjusting your search or filters" 
                  : "Create your first workspace to get started"
                }
              </p>
              <Button
                onClick={handleCreateWorkspace}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <Plus className="h-5 w-5 mr-2" />
                )}
                Create Your First Workspace
              </Button>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
              {sortedWorkspaces.map((workspace) => (
                <div
                  key={workspace._id}
                  className={`group bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300 ${
                    viewMode === "list" ? "flex items-center p-4" : "flex flex-col"
                  }`}
                >
                  {/* Workspace Header */}
                  <div className={`${viewMode === "list" ? "flex-1 flex items-center gap-4" : "p-4 pb-0"}`}>
                    <div className={`${viewMode === "list" ? "flex-1" : "space-y-3"}`}>
                      {/* Title and Status */}
                      <div className="flex items-start justify-between">
                        <h3 className={`font-semibold text-white group-hover:text-blue-300 transition-colors ${
                          viewMode === "list" ? "text-lg" : "text-base"
                        }`}>
                          {getWorkspaceTitle(workspace)}
                        </h3>
                        
                        <div className="flex items-center gap-2">
                          {workspace.isPublic && (
                            <div className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                              Public
                            </div>
                          )}
                          {workspace.isTemplate && (
                            <div className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                              Template
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`text-gray-400 ${viewMode === "list" ? "text-sm line-clamp-2" : "text-xs line-clamp-3"}`}>
                        {getWorkspaceDescription(workspace)}
                      </p>

                      {/* Tags */}
                      {workspace.tags && workspace.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {workspace.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {workspace.tags.length > 3 && (
                            <span className="text-gray-500 text-xs px-2 py-1">
                              +{workspace.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatRelativeTime(workspace._creationTime)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{workspace.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{workspace.likes || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Code2 className="h-3 w-3" />
                          <span>{workspace.messages?.length || 0} msgs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={`${viewMode === "list" ? "flex items-center gap-2" : "p-4 pt-0"}`}>
                    <Button
                      onClick={() => navigateToWorkspace(workspace._id)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                      size={viewMode === "list" ? "sm" : "default"}
                    >
                      {viewMode === "list" ? "Open" : "Open Workspace"}
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size={viewMode === "list" ? "sm" : "default"}
                          className="text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-900 border-gray-800">
                        <DropdownMenuItem
                          onClick={() => handleTogglePublic(workspace._id, workspace.isPublic)}
                          className="text-gray-300 hover:text-white hover:bg-gray-800"
                        >
                          {workspace.isPublic ? "Make Private" : "Make Public"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleTemplate(workspace._id, workspace.isTemplate)}
                          className="text-gray-300 hover:text-white hover:bg-gray-800"
                        >
                          {workspace.isTemplate ? "Remove from Templates" : "Add to Templates"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigateToWorkspace(workspace._id)}
                          className="text-gray-300 hover:text-white hover:bg-gray-800"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteWorkspace(workspace._id)}
                          className="text-red-400 hover:text-red-300 hover:bg-gray-800"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
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
