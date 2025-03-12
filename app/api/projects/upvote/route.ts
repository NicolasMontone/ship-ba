import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import db from '@/database';
import { upvotes, UpvoteSchema } from '@/database/schema';
import { eq, and } from 'drizzle-orm';
import { cookies } from 'next/headers';
import database from '@/database';

// Helper to get or create a user ID from cookies
async function getUserId(req: NextRequest) {
	const cookieStore = await cookies();
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

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const validation = UpvoteSchema.safeParse(body);

		if (!validation.success) {
			return NextResponse.json(
				{ error: 'Invalid request data', details: validation.error.format() },
				{ status: 400 }
			);
		}

		const { projectName } = validation.data;
		const userId = await getUserId(req);

		// Check if user already upvoted this project
		const existingUpvotes = await database.select().from(upvotes).where(
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

			return NextResponse.json({
				message: 'Upvote removed successfully',
				action: 'removed'
			});
		} else {
			// Otherwise, add the upvote
			await db.insert(upvotes).values({
				id: uuidv4(),
				projectName,
				userId,
			});

			return NextResponse.json({
				message: 'Upvote added successfully',
				action: 'added'
			});
		}
	} catch (error) {
		console.error('Error handling upvote:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

// Get upvote count for a project
export async function GET(req: NextRequest) {
	try {
		const url = new URL(req.url);
		const projectName = url.searchParams.get('projectName');

		if (!projectName) {
			return NextResponse.json(
				{ error: 'Project ID is required' },
				{ status: 400 }
			);
		}

		// Count upvotes for the project
		const result = await database.select().from(upvotes).where(eq(upvotes.projectName, projectName));

		const count = Number(result.length || 0);

		// Check if the current user has upvoted this project
		const userId = await getUserId(req);
		const userUpvoted = await database.select().from(upvotes).where(
			and(
				eq(upvotes.projectName, projectName),
				eq(upvotes.userId, userId)
			)
		);

		return NextResponse.json({
			count,
			userUpvoted: userUpvoted.length > 0
		});
	} catch (error) {
		console.error('Error getting upvote count:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
} 