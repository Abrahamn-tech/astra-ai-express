import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";
import bcrypt from "bcryptjs";

// ACTION: Google Login (handles both new and existing users)
export const GoogleLogin = action({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.union(v.string(), v.null()),
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Check if user already exists by email
      const existingUser = await ctx.runQuery(api.users.GetUser, {
        email: args.email,
      });

      if (existingUser) {
        // User exists, update last login and return user
        await ctx.runAction(api.users.UpdateLastLogin, {
          userId: existingUser._id,
        });

        // Log activity
        await ctx.runMutation(api.users.LogActivity, {
          user: existingUser._id,
          action: "user_login",
          details: { authMethod: "google", timestamp: Date.now() },
        });

        return existingUser._id;
      } else {
        // New user, create account
        return await ctx.runMutation(api.users.InsertUser, {
          name: args.name,
          email: args.email,
          username: null,
          picture: args.picture,
          uid: args.uid,
          password: null,
          authMethod: "google",
          bio: null,
          website: null,
          github: null,
          twitter: null,
          linkedin: null,
          isActive: true,
          lastLoginAt: Date.now(),
          emailVerified: true, // Auto-verify Google OAuth users
          subscription: "free",
          tokensUsed: 0,
          tokensLimit: 1000, // Free tier limit
          preferences: {
            theme: "dark",
            notifications: true,
            autoSave: true,
          },
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

// ACTION: Create User (uses bcrypt)
export const CreateUser = action({
  args: {
    name: v.string(),
    email: v.string(),
    username: v.optional(v.string()),
    picture: v.union(v.string(), v.null()),
    uid: v.string(),
    password: v.optional(v.string()),
    authMethod: v.union(v.literal("google"), v.literal("username")),
  },
  handler: async (ctx, args) => {
    try {
      // Check if user exists by email
      const existingEmail = await ctx.runQuery(api.users.CheckEmailExists, {
        email: args.email,
      });

      if (existingEmail) {
        throw new Error("Email already exists");
      }

      // Check if username exists (for username auth)
      if (args.authMethod === "username" && args.username) {
        const existingUsername = await ctx.runQuery(api.users.CheckUsernameExists, {
          username: args.username,
        });

        if (existingUsername) {
          throw new Error("Username already taken");
        }
      }

      let hashedPassword = null;

      // Hash password only for username auth
      if (args.authMethod === "username" && args.password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(args.password, salt);
      }

      // Insert user via mutation
      const result = await ctx.runMutation(api.users.InsertUser, {
        name: args.name,
        email: args.email,
        username: args.username || null,
        picture: args.picture,
        uid: args.uid,
        password: hashedPassword,
        authMethod: args.authMethod,
        // Enhanced fields with defaults
        bio: null,
        website: null,
        github: null,
        twitter: null,
        linkedin: null,
        isActive: true,
        lastLoginAt: Date.now(),
        emailVerified: args.authMethod === "google", // Auto-verify Google OAuth users
        subscription: "free",
        tokensUsed: 0,
        tokensLimit: 1000, // Free tier limit
        preferences: {
          theme: "dark",
          notifications: true,
          autoSave: true,
        },
      });

      // Log activity
      await ctx.runMutation(api.users.LogActivity, {
        user: result,
        action: "user_created",
        details: { authMethod: args.authMethod },
      });

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

// MUTATION: Insert User (internal, called by action)
export const InsertUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    username: v.union(v.string(), v.null()),
    picture: v.union(v.string(), v.null()),
    uid: v.string(),
    password: v.union(v.string(), v.null()),
    authMethod: v.union(v.literal("google"), v.literal("username")),
    bio: v.union(v.string(), v.null()),
    website: v.union(v.string(), v.null()),
    github: v.union(v.string(), v.null()),
    twitter: v.union(v.string(), v.null()),
    linkedin: v.union(v.string(), v.null()),
    isActive: v.boolean(),
    lastLoginAt: v.number(),
    emailVerified: v.boolean(),
    subscription: v.union(v.literal("free"), v.literal("pro"), v.literal("enterprise")),
    tokensUsed: v.number(),
    tokensLimit: v.number(),
    preferences: v.optional(v.object({
      theme: v.union(v.literal("dark"), v.literal("light")),
      notifications: v.boolean(),
      autoSave: v.boolean(),
    })),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      username: args.username,
      picture: args.picture,
      uid: args.uid,
      password: args.password,
      authMethod: args.authMethod,
      bio: args.bio,
      website: args.website,
      github: args.github,
      twitter: args.twitter,
      linkedin: args.linkedin,
      isActive: args.isActive,
      lastLoginAt: args.lastLoginAt,
      emailVerified: args.emailVerified,
      subscription: args.subscription,
      tokensUsed: args.tokensUsed,
      tokensLimit: args.tokensLimit,
      preferences: args.preferences,
    });
    return result;
  },
});

// QUERY: Check if email exists
export const CheckEmailExists = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    return users.length > 0;
  },
});

// QUERY: Check if username exists
export const CheckUsernameExists = query({
  args: {
    username: v.string(),
  },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), args.username))
      .collect();
    return users.length > 0;
  },
});

// ACTION: Login with Username (uses bcrypt)
export const LoginWithUsername = action({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Get user data
    const userData = await ctx.runQuery(api.users.GetUserByUsername, {
      username: args.username,
    });

    if (!userData) {
      throw new Error("User not found");
    }

    if (userData.authMethod !== "username") {
      throw new Error("This account uses Google OAuth. Please sign in with Google.");
    }

    if (!userData.password) {
      throw new Error("Invalid account configuration");
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(args.password, userData.password);

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    // Update last login
    await ctx.runAction(api.users.UpdateLastLogin, {
      userId: userData._id,
    });

    // Log activity
    await ctx.runMutation(api.users.LogActivity, {
      user: userData._id,
      action: "user_login",
      details: { authMethod: "username", timestamp: Date.now() },
    });

    return userData;
  },
});

// QUERY: Get User by Email
export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    return user[0];
  },
});

// QUERY: Get User by Username
export const GetUserByUsername = query({
  args: {
    username: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), args.username))
      .collect();
    return user[0];
  },
});

// MUTATION: Log Activity
export const LogActivity = mutation({
  args: {
    user: v.id("users"),
    action: v.string(),
    details: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("activityLogs", {
      user: args.user,
      action: args.action,
      details: args.details,
      createdAt: Date.now(),
    });
  },
});

// ACTION: Update User Profile
export const UpdateUserProfile = action({
  args: {
    userId: v.id("users"),
    bio: v.optional(v.string()),
    website: v.optional(v.string()),
    github: v.optional(v.string()),
    twitter: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    preferences: v.optional(v.object({
      theme: v.union(v.literal("dark"), v.literal("light")),
      notifications: v.boolean(),
      autoSave: v.boolean(),
    })),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(api.users.GetUserById, {
      userId: args.userId,
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updateData = {};
    if (args.bio !== undefined) updateData.bio = args.bio;
    if (args.website !== undefined) updateData.website = args.website;
    if (args.github !== undefined) updateData.github = args.github;
    if (args.twitter !== undefined) updateData.twitter = args.twitter;
    if (args.linkedin !== undefined) updateData.linkedin = args.linkedin;
    if (args.preferences !== undefined) updateData.preferences = args.preferences;

    await ctx.runMutation(api.users.UpdateUser, {
      userId: args.userId,
      ...updateData,
    });

    // Log activity
    await ctx.runMutation(api.users.LogActivity, {
      user: args.userId,
      action: "profile_updated",
      details: updateData,
    });

    return { success: true };
  },
});

// MUTATION: Update User
export const UpdateUser = mutation({
  args: {
    userId: v.id("users"),
    bio: v.optional(v.union(v.string(), v.null())),
    website: v.optional(v.union(v.string(), v.null())),
    github: v.optional(v.union(v.string(), v.null())),
    twitter: v.optional(v.union(v.string(), v.null())),
    linkedin: v.optional(v.union(v.string(), v.null())),
    preferences: v.optional(v.object({
      theme: v.union(v.literal("dark"), v.literal("light")),
      notifications: v.boolean(),
      autoSave: v.boolean(),
    })),
  },
  handler: async (ctx, args) => {
    const { userId, ...updateData } = args;
    await ctx.db.patch(userId, updateData);
  },
});

// QUERY: Get User by ID
export const GetUserById = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

// ACTION: Update Last Login - Fixed to use runAction instead of runMutation
export const UpdateLastLogin = action({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Force redeploy
    await ctx.runAction(api.users.UpdateUserLastLogin, {
      userId: args.userId,
      lastLoginAt: Date.now(),
    });

    // Log activity
    await ctx.runMutation(api.users.LogActivity, {
      user: args.userId,
      action: "user_login",
      details: { timestamp: Date.now() },
    });
  },
});

// MUTATION: Update User Last Login
export const UpdateUserLastLogin = mutation({
  args: {
    userId: v.id("users"),
    lastLoginAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      lastLoginAt: args.lastLoginAt,
    });
  },
});