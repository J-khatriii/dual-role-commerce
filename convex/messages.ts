import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { threadId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_thread", (q) => q.eq("threadId", args.threadId))
      .order("asc")
      .collect();
  },
});

export const send = mutation({
  args: {
    threadId: v.string(),
    senderRole: v.union(v.literal("customer"), v.literal("supplier")),
    senderName: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", { ...args, createdAt: Date.now() });
  },
});
