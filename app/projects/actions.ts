'use server';

import { v4 as uuidv4 } from 'uuid';
import db from '@/database';
import { upvotes } from '@/database/schema';
import { eq, and } from 'drizzle-orm';
import { cookies } from 'next/headers';

// Helper to get or create a user ID from cookies
async function getUserId() {
	const cookieStore = cookies();
	let userId = cookieStore.get('userId')?.value;

	if (!userId) {
		userId = uuidv4();
		// Set cookie to expire in 1 year
		cookieStore.set('userId', userId, {
			expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
			path: '/',
			sameSite: 'strict',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		});
	}

	return userId;
}

// Get upvote counts for all projects
export async function getUpvotesForAllProjects() {
	try {
		// Get all upvotes
		const allUpvotes = await db.select().from(upvotes);

		// Group by project name
		const projectCounts = new Map<string, number>();
		for (const upvote of allUpvotes) {
			const count = projectCounts.get(upvote.projectName) || 0;
			projectCounts.set(upvote.projectName, count + 1);
		}

		// Get user upvoted projects
		const userId = await getUserId();
		const userUpvotes = await db.select().from(upvotes).where(eq(upvotes.userId, userId));
		const userUpvotedProjects = new Set(userUpvotes.map(upvote => upvote.projectName));

		return {
			projectCounts,
			userUpvotedProjects
		};
	} catch (error) {
		console.error('Error getting upvote counts:', error);
		throw new Error('Failed to get upvote counts');
	}
}

// Toggle upvote for a project
export async function toggleUpvote(projectName: string) {
	try {
		const userId = await getUserId();

		// Check if user already upvoted this project
		const existingUpvotes = await db.select().from(upvotes).where(
			and(
				eq(upvotes.projectName, projectName),
				eq(upvotes.userId, userId)
			)
		);

		if (existingUpvotes.length > 0) {
			// If upvote exists, remove it (toggle behavior)
			await db.delete(upvotes).where(
				and(
					eq(upvotes.projectName, projectName),
					eq(upvotes.userId, userId)
				)
			);

			return {
				message: 'Upvote removed successfully',
				action: 'removed'
			};
		} else {
			// Otherwise, add the upvote
			await db.insert(upvotes).values({
				id: uuidv4(),
				projectName,
				userId,
			});

			return {
				message: 'Upvote added successfully',
				action: 'added'
			};
		}
	} catch (error) {
		console.error('Error toggling upvote:', error);
		throw new Error('Failed to toggle upvote');
	}
}

// Reset all upvotes (admin function - could be improved with proper auth)
export async function resetAllUpvotes() {
	try {
		await db.delete(upvotes);
		return { success: true, message: 'All upvotes have been reset' };
	} catch (error) {
		console.error('Error resetting upvotes:', error);
		throw new Error('Failed to reset upvotes');
	}
} 