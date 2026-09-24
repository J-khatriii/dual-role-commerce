import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    threadId: v.string(),
    senderRole: v.union(v.literal("customer"), v.literal("supplier")),
    senderName: v.string(),
    text: v.string(),
    createdAt: v.number(),
  }).index("by_thread", ["threadId"]),
});
