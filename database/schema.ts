import { InferSelectModel } from "drizzle-orm";
import { boolean, integer, jsonb, pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { z } from 'zod'



// Upvotes table
export const upvotes = pgTable('upvotes_1', {
	id: text('id').primaryKey(),
	projectName: text('project_name').notNull(),
	userId: text('user_id').notNull(), // User identifier (could be IP or session ID for anonymous users)
	createdAt: timestamp('created_at').defaultNow(),
});

// Comments table
export const comments = pgTable('comments_1', {
	id: text('id').primaryKey(),
	projectName: text('project_name').notNull(),
	userId: text('user_id').notNull(), // User identifier
	userName: text('user_name').notNull(),
	userAvatar: text('user_avatar'),
	content: text('content').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
});

export type Upvote = InferSelectModel<typeof upvotes>;
export type Comment = InferSelectModel<typeof comments>;

// Zod schemas for validation
export const CommentSchema = z.object({
	content: z.string().min(1, "Comment cannot be empty").max(500, "Comment is too long"),
	userName: z.string().min(1, "Name is required"),
});

export const UpvoteSchema = z.object({
	projectName: z.string().min(1, "Project Name is required"),
});