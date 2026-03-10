import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

export const CreateWorkSpace = mutation({
  args: {
    messages: v.any(),
    user: v.id("users"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isPublic: v.optional(v.boolean()),
    isTemplate: v.optional(v.boolean()),
    views: v.optional(v.number()),
    likes: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    try {
      const workspaceId = await ctx.db.insert("workspace", {
        messages: args.messages,
        user: args.user,
        title: args.title || "Untitled Workspace",
        description: args.description || "",
        tags: args.tags || [],
        isPublic: args.isPublic || false,
        isTemplate: args.isTemplate || false,
        views: args.views || 0,
        likes: args.likes || 0,
        collaborators: [],
        deployments: [],
        settings: {
          autoSave: true,
          showLineNumbers: true,
          theme: "dark",
        },
      });
      
      // Log activity
      await ctx.db.insert("activityLogs", {
        user: args.user,
        action: "create_workspace",
        details: { workspaceId, title: args.title },
        createdAt: Date.now(),
      });
      
      return workspaceId;
    } catch (error) {
      throw new Error("Error creating workspace: " + error.message);
    }
  },
});

export const GetWorkspaceData = query({
  args: {
    workspaceId: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);
    return workspace;
  },
});

export const UpdateMessages = mutation({
  args: {
    workspaceId: v.id("workspace"),
    messages: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workspaceId, {
      messages: args.messages,
    });
    console.log(result);
    return result;
  },
});

export const UpdateFiles = mutation({
  args: {
    workspaceId: v.id("workspace"),
    files: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workspaceId, {
      fileData: args.files,
    });
    console.log(result);
    return result;
  },
});

export const GetAllWorkspace = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("workspace")
      .filter((q) => q.eq(q.field("user"), args.userId))
      .order("desc")
      .collect();

    return result;
  },
});

export const UpdateWorkspace = mutation({
  args: {
    workspaceId: v.id("workspace"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isPublic: v.optional(v.boolean()),
    isTemplate: v.optional(v.boolean()),
    views: v.optional(v.number()),
    likes: v.optional(v.number()),
    collaborators: v.optional(v.array(v.id("users"))),
    settings: v.optional(v.object({
      autoSave: v.boolean(),
      showLineNumbers: v.boolean(),
      theme: v.union(v.literal("dark"), v.literal("light")),
    })),
  },
  handler: async (ctx, args) => {
    const { workspaceId, ...updateData } = args;
    const result = await ctx.db.patch(workspaceId, updateData);
    return result;
  },
});

export const DeleteWorkspace = mutation({
  args: {
    workspaceId: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    
    // Log activity before deletion
    await ctx.db.insert("activityLogs", {
      user: workspace.user,
      action: "delete_workspace",
      details: { workspaceId: args.workspaceId, title: workspace.title },
      createdAt: Date.now(),
    });
    
    await ctx.db.delete(args.workspaceId);
    return { success: true };
  },
});

export const GetPublicWorkspaces = query({
  args: {
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("workspace")
      .filter((q) => q.eq(q.field("isPublic"), true))
      .order("desc");
    
    if (args.limit) {
      query = query.take(args.limit);
    }
    
    const workspaces = await query.collect();
    return workspaces;
  },
});

export const GetTemplateWorkspaces = query({
  args: {
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("workspace")
      .filter((q) => q.eq(q.field("isTemplate"), true))
      .order("desc");
    
    if (args.limit) {
      query = query.take(args.limit);
    }
    
    const workspaces = await query.collect();
    return workspaces;
  },
});

export const IncrementWorkspaceViews = mutation({
  args: {
    workspaceId: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    
    await ctx.db.patch(args.workspaceId, {
      views: (workspace.views || 0) + 1,
    });
    
    return { success: true };
  },
});

export const ToggleWorkspaceLike = mutation({
  args: {
    workspaceId: v.id("workspace"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    
    // This is a simplified version - in production you'd want to track which users liked which workspaces
    await ctx.db.patch(args.workspaceId, {
      likes: (workspace.likes || 0) + 1,
    });
    
    // Log activity
    await ctx.db.insert("activityLogs", {
      user: args.userId,
      workspace: args.workspaceId,
      action: "like_workspace",
      details: { workspaceId: args.workspaceId },
      createdAt: Date.now(),
    });
    
    return { success: true };
  },
});
