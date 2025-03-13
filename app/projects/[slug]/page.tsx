import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getProjectSlug } from '@/lib/get-projects-slug';
import { projectsBase } from '@/lib/projects';
import { getUpvotesForAllProjects } from '../actions';

import teamsData from '../../../teams.json';
import ProjectDetailClient from './components/ProjectDetailClient';

// Function to find team for a project
function findTeamForProject(projectName: string): any {
  // Handle specific project-team mappings
  const projectTeamMap: Record<string, string> = {
    Wololo: 'Wololo',
    'Tote Bag': 'NNs',
    Majorana: 'Majorana',
    Chronocode: 'campanacoding',
    'Que Comí': 'OF (Only Frontends)',
    'Sirvana Eats': 'Sirvana',
    'Shipa Docs': 'chaco',
    'Burro Speach': 'Thousand Sunny',
    'Expense Radar': 'Zeppole',
    'Norwich AI': 'Norwich AI',
    Gaid: 'GAID',
    'Mesh Community': 'Galo AI',
    Deppty: 'Deppty',
    'Shorts GENAI': 'b11b2fc4-5eac-460d-8285-964f73558f40',
    U0: 'NoName', // u0 - con Gonza
    'Fresh Decks': 'Fresh Co.',
    Ardillapp: 'stockIAte',
    'Docs AI': 'LGH',
    '???': 'Space Motion',
  };

  const teamName = projectTeamMap[projectName];
  if (!teamName) return null;

  return teamsData.find((team) => team.teamName === teamName);
}

// Function to filter out redundant IA tags
function filterTags(tags: string[] | undefined): string[] {
  if (!tags) return [];
  return tags.filter((tag) => tag !== 'IA');
}

export const dynamic = 'force-dynamic';

// Server component that fetches data and passes it to the client component
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Get project data from the imported projects array
  const slug = (await params)?.slug;
  const foundProject = projectsBase.find(
    (p) => getProjectSlug(p.name) === slug
  );

  // If project not found, return 404
  if (!foundProject) {
    notFound();
  }

  // Update project with filtered tags
  const project = {
    ...foundProject,
    tags: filterTags(foundProject.tags),
  };

  // Find team information
  const team = findTeamForProject(project.name);

  // Get upvote data from server
  const { projectCounts, userUpvotedProjects } =
    await getUpvotesForAllProjects();

  // Get upvote count for this project
  const upvoteCount = projectCounts.get(project.name) || 0;
  const isUpvoted = userUpvotedProjects.has(project.name);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="animate-pulse text-white">Cargando proyecto...</div>
        </div>
      }
    >
      <ProjectDetailClient
        project={project}
        team={team}
        upvoteCount={upvoteCount}
        isUpvoted={isUpvoted}
      />
    </Suspense>
  );
}
