import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    username: v.optional(v.union(v.string(), v.null())),
    picture: v.optional(v.union(v.string(), v.null())),
    uid: v.string(),
    password: v.optional(v.union(v.string(), v.null())),
    authMethod: v.optional(v.union(v.literal("google"), v.literal("username"))),
    bio: v.optional(v.union(v.string(), v.null())),
    website: v.optional(v.union(v.string(), v.null())),
    github: v.optional(v.union(v.string(), v.null())),
    twitter: v.optional(v.union(v.string(), v.null())),
    linkedin: v.optional(v.union(v.string(), v.null())),
    isActive: v.optional(v.boolean()),
    lastLoginAt: v.optional(v.number()),
    emailVerified: v.optional(v.boolean()),
    subscription: v.optional(v.union(v.literal("free"), v.literal("pro"), v.literal("enterprise"))),
    tokensUsed: v.optional(v.number()),
    tokensLimit: v.optional(v.number()),
    preferences: v.optional(v.object({
      theme: v.optional(v.union(v.literal("dark"), v.literal("light"))),
      notifications: v.optional(v.boolean()),
      autoSave: v.optional(v.boolean()),
    })),
  }).index("by_email", ["email"])
   .index("by_username", ["username"])
   .index("by_uid", ["uid"]),
  
  workspace: defineTable({
    messages: v.any(),
    fileData: v.optional(v.any()),
    user: v.id("users"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isPublic: v.optional(v.boolean()),
    isTemplate: v.optional(v.boolean()),
    forkedFrom: v.optional(v.id("workspace")),
    githubRepo: v.optional(v.string()),
    deployments: v.optional(v.array(v.object({
      url: v.string(),
      platform: v.string(),
      createdAt: v.number(),
    }))),
    collaborators: v.optional(v.array(v.id("users"))),
    settings: v.optional(v.object({
      autoSave: v.boolean(),
      showLineNumbers: v.boolean(),
      theme: v.union(v.literal("dark"), v.literal("light")),
    })),
    views: v.optional(v.number()),
    likes: v.optional(v.number()),
  }).index("by_user", ["user"])
   .index("by_public", ["isPublic"])
   .index("by_template", ["isTemplate"]),
  
  // New collections for enhanced features
  userSessions: defineTable({
    user: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
    lastActiveAt: v.number(),
    deviceInfo: v.optional(v.object({
      userAgent: v.string(),
      ip: v.string(),
      platform: v.string(),
    })),
  }).index("by_user", ["user"])
   .index("by_token", ["token"]),
   
  activityLogs: defineTable({
    user: v.id("users"),
    workspace: v.optional(v.id("workspace")),
    action: v.string(), // 'create_workspace', 'update_workspace', 'login', 'github_push', etc.
    details: v.optional(v.any()),
    createdAt: v.number(),
  }).index("by_user", ["user"])
   .index("by_workspace", ["workspace"])
   .index("by_createdAt", ["createdAt"]),
   
  templates: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.string(),
    thumbnail: v.optional(v.string()),
    fileData: v.any(),
    tags: v.array(v.string()),
    author: v.id("users"),
    isPublic: v.boolean(),
    usageCount: v.number(),
    rating: v.number(),
    ratingCount: v.number(),
  }).index("by_category", ["category"])
   .index("by_public", ["isPublic"])
   .index("by_author", ["author"]),
});
