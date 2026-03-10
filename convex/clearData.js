import { mutation } from "./_generated/server";

// Clear all users from the database
export const clearAllUsers = mutation({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    
    for (const user of users) {
      await ctx.db.delete(user._id);
    }
    
    return { deletedCount: users.length };
  },
});

// Clear all workspaces from the database
export const clearAllWorkspaces = mutation({
  args: {},
  handler: async (ctx) => {
    const workspaces = await ctx.db.query("workspace").collect();
    
    for (const workspace of workspaces) {
      await ctx.db.delete(workspace._id);
    }
    
    return { deletedCount: workspaces.length };
  },
});

// Clear all activity logs from the database
export const clearAllActivityLogs = mutation({
  args: {},
  handler: async (ctx) => {
    const logs = await ctx.db.query("activityLogs").collect();
    
    for (const log of logs) {
      await ctx.db.delete(log._id);
    }
    
    return { deletedCount: logs.length };
  },
});
