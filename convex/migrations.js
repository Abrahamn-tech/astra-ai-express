import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Migration to update existing users with new fields
export const migrateExistingUsers = mutation({
  args: {},
  handler: async (ctx) => {
    const existingUsers = await ctx.db.query("users").collect();
    
    for (const user of existingUsers) {
      const updates = {};
      
      // Add missing fields with default values
      if (user.emailVerified === undefined) {
        updates.emailVerified = user.authMethod === "google";
      }
      
      if (user.tokensUsed === undefined) {
        updates.tokensUsed = 0;
      }
      
      if (user.tokensLimit === undefined) {
        updates.tokensLimit = 1000;
      }
      
      if (user.isActive === undefined) {
        updates.isActive = true;
      }
      
      if (user.subscription === undefined) {
        updates.subscription = "free";
      }
      
      if (user.bio === undefined) {
        updates.bio = null;
      }
      
      if (user.website === undefined) {
        updates.website = null;
      }
      
      if (user.github === undefined) {
        updates.github = null;
      }
      
      if (user.twitter === undefined) {
        updates.twitter = null;
      }
      
      if (user.linkedin === undefined) {
        updates.linkedin = null;
      }
      
      if (user.preferences === undefined) {
        updates.preferences = {
          theme: "dark",
          notifications: true,
          autoSave: true,
        };
      }
      
      // Only update if there are changes
      if (Object.keys(updates).length > 0) {
        await ctx.db.patch(user._id, updates);
        console.log(`Updated user ${user.email} with fields:`, Object.keys(updates));
      }
    }
    
    return { success: true, updatedCount: existingUsers.length };
  },
});
