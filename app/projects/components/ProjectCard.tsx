'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trophy, Globe, Video, Github, MessageSquare, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getProjectSlug } from '@/lib/get-projects-slug';
import UpvoteButton from './UpvoteButton';
import { Project } from '@/lib/projects';

type ProjectCardProps = {
  project: Project;
  index: number;
  upvoteCount: number;
  isUpvoted: boolean;
};

declare global {
  interface Window {
    projectModals?: {
      openVideoModal: (videoUrl: string, projectName: string) => void;
      openImageModal: (
        imageSrc: string,
        imageAlt: string,
        e: React.MouseEvent
      ) => void;
    };
  }
}

export default function ProjectCard({
  project,
  index,
  upvoteCount,
  isUpvoted,
}: ProjectCardProps) {
  const router = useRouter();

  // Function to get winner class based on position
  const getWinnerClass = (position: string) => {
    switch (position) {
      case '1':
        // Gold effect for 1st place - darker gradient
        return 'bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-700 border-yellow-500 shadow-yellow-900/30 text-white';
      case '2':
        // Silver effect for 2nd place - darker gradient
        return 'bg-gradient-to-br from-gray-500 via-gray-400 to-gray-600 border-gray-500 shadow-gray-900/30 text-white';
      case '3':
        // Bronze effect for 3rd place - darker gradient
        return 'bg-gradient-to-br from-amber-700 via-amber-500 to-amber-700 border-amber-500 shadow-amber-900/30 text-white';
      default:
        // Default styling for non-winners
        return 'bg-zinc-900 border-zinc-800 hover:shadow-white/5';
    }
  };

  // Function to open video modal
  const openVideoModal = (
    videoUrl: string,
    projectName: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (window.projectModals) {
      window.projectModals.openVideoModal(videoUrl, projectName);
    }
  };

  // Function to open project detail page
  const openProjectDetail = () => {
    const slug = getProjectSlug(project.name);
    router.push(`/projects/${slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`rounded-lg overflow-hidden border ${getWinnerClass(
        project.position
      )} hover:shadow-md transition-all duration-300 cursor-pointer`}
      onClick={openProjectDetail}
    >
      <div className="flex flex-col md:flex-row p-4 md:p-6">
        {/* Upvote Column - Always at top on mobile, left on desktop */}
        <div className="flex md:flex-col items-center md:items-start justify-start md:mr-6 mb-4 md:mb-0 md:pt-2">
          <UpvoteButton
            projectName={project.name}
            initialCount={upvoteCount}
            isUpvoted={isUpvoted}
            position={project.position}
          />
        </div>

        {/* Responsive layout for project image and info */}
        <div className="flex flex-col md:flex-row flex-1">
          {/* Project Image */}
          <div className="md:mr-6 relative flex-shrink-0 mb-4 md:mb-0">
            <div
              className={`relative w-full md:w-48 h-32 md:h-auto overflow-hidden rounded-lg border ${
                project.position
                  ? 'border-transparent bg-black/10'
                  : 'border-zinc-800 bg-zinc-900'
              } shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center group`}
            >
              <img
                src={project.image}
                alt={project.name}
                className="object-contain w-full h-full p-2 max-h-28 md:max-h-24"
              />
            </div>
          </div>

          {/* Project Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center mb-1">
                  <span
                    className={`text-lg md:text-xl font-semibold ${
                      project.position ? 'text-black' : 'text-white'
                    }`}
                  >
                    {project.name}
                  </span>
                  {project.position && (
                    <div className="flex items-center ml-2 text-black">
                      <Trophy className="h-4 w-4 md:h-5 md:w-5 mr-1" />
                      <span className="font-bold text-sm">
                        {project.position}º
                      </span>
                    </div>
                  )}
                </div>
                <p
                  className={`text-sm mb-2 ${
                    project.position ? 'text-black/80' : 'text-gray-300'
                  }`}
                >
                  {project.spanishDescription || project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`inline-flex items-center text-xs px-2 py-1 rounded ${
                        project.position
                          ? 'bg-black/20 text-black'
                          : 'bg-zinc-800 text-white'
                      }`}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center mt-2 gap-2 md:gap-3">
              {project.productUrl && (
                <Link
                  href={project.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'text-xs text-gray-300 hover:text-white flex items-center hover:bg-gray-700/20 p-2 rounded-md duration-100 transition-all',
                    project.position && 'text-black hover:text-black'
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Globe className="h-3 w-3 mr-1" />
                  <span>Visitar Sitio</span>
                </Link>
              )}

              {project.videoUrl && project.videoUrl !== '-' && (
                <button
                  onClick={(e) =>
                    openVideoModal(project.videoUrl, project.name, e)
                  }
                  className={cn(
                    'text-xs text-gray-300 hover:text-white flex items-center hover:bg-gray-700/20 p-2 rounded-md duration-100 transition-all',
                    project.position && 'text-black hover:text-black'
                  )}
                >
                  <Video className="h-3 w-3 mr-1" />
                  <span>Ver Demo</span>
                </button>
              )}

              {typeof project.githubUrl === 'string' && project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'text-xs text-gray-300 hover:text-white flex items-center hover:bg-gray-700/20 p-2 rounded-md duration-100 transition-all',
                    project.position && 'text-black hover:text-black'
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-3 w-3 mr-1" />
                  <span>GitHub</span>
                </Link>
              )}

              {Array.isArray(project.githubUrl) &&
                project.githubUrl.length > 0 && (
                  <div
                    className="relative group"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="text-xs text-gray-300 hover:text-white flex items-center hover:bg-gray-700/20 p-2 rounded-md duration-100 transition-all">
                      <Github className="h-3 w-3 mr-1" />
                      <span>GitHub ({project.githubUrl.length})</span>
                    </button>
                    <div className="absolute left-0 mt-2 w-64 bg-black rounded-md shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 border border-zinc-800">
                      {(project.githubUrl as string[]).map((url, idx) => (
                        <Link
                          key={idx}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-2 px-3 text-sm hover:bg-zinc-900 rounded text-gray-300 mb-1 truncate"
                        >
                          {url.replace('https://github.com/', '')}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              {/* Comments Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openProjectDetail();
                }}
                className={cn(
                  'text-xs text-gray-300 hover:text-white flex items-center hover:bg-gray-700/20 p-2 rounded-md duration-100 transition-all',
                  project.position && 'text-black hover:text-black'
                )}
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                <span>Comentarios ({project.comments})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Team Information */}
      {project.team && (
        <div
          className={`px-4 py-2 text-xs border-t ${
            project.position
              ? 'border-black/10 text-black/80'
              : 'border-zinc-800 text-gray-400'
          }`}
        >
          Equipo: {project.team.teamName}
        </div>
      )}
    </motion.div>
  );
}
