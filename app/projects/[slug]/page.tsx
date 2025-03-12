'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  X,
  Globe,
  Github,
  Video,
  ArrowLeft,
  Trophy,
  Mail,
  ExternalLink,
  GithubIcon,
} from 'lucide-react';
import teamsData from '../../../teams.json';
import { getProjectSlug } from '@/lib/get-projects-slug';
import { projectsBase } from '@/lib/projects';

// We'll use this same function from the main page
function getEmbedUrl(url: string): string {
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    // Extract video ID
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    }
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Loom
  if (url.includes('loom.com/share')) {
    const id = url.split('loom.com/share/')[1].split('?')[0];
    return `https://www.loom.com/embed/${id}`;
  }

  // For Google Drive videos, we can't easily embed them, so we'll just return the URL
  // Screen.studio seems to have a similar format to Loom
  if (url.includes('screen.studio/share')) {
    const id = url.split('screen.studio/share/')[1].split('?')[0];
    return `https://app.screen.studio/embed/${id}`;
  }

  // Return original URL for other cases
  return url;
}

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

// Function to get embed URL safely with null handling
function getSafeEmbedUrl(url: string | null | undefined): string | undefined {
  if (!url || url === '-') return undefined;
  return getEmbedUrl(url);
}

// Function to get winner class based on position
function getWinnerClass(position: string) {
  switch (position) {
    case '1':
      // Gold effect for 1st place - darker gradient
      return 'bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-600 border-yellow-500 shadow-yellow-900/30 text-white';
    case '2':
      // Silver effect for 2nd place - darker gradient
      return 'bg-gradient-to-br from-gray-500 via-gray-400 to-gray-600 border-gray-500 shadow-gray-900/30 text-white';
    case '3':
      // Bronze effect for 3rd place - darker gradient
      return 'bg-gradient-to-br from-amber-700 via-amber-500 to-amber-700 border-amber-500 shadow-amber-900/30 text-white';
    default:
      // Default styling for non-winners
      return 'bg-zinc-900 border-zinc-800';
  }
}

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<any>(null);

  // Always treat this as a modal
  const isModal = true;

  // Fetch project data based on slug
  useEffect(() => {
    // Get project data from the imported projects array
    const slug = params.slug as string;
    const foundProject = projectsBase.find(
      (p) => getProjectSlug(p.name) === slug
    );

    if (foundProject) {
      // Update project with filtered tags
      const updatedProject = {
        ...foundProject,
        tags: filterTags(foundProject.tags),
      };
      setProject(updatedProject);

      // Find team information
      const teamInfo = findTeamForProject(updatedProject.name);
      setTeam(teamInfo);
    }
    setLoading(false);
  }, [params.slug]);

  // Add ESC key handler for modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    // Handle outside click for modal
    const handleOutsideClick = (event: MouseEvent) => {
      const modalContent = document.querySelector('.modal-content');
      if (modalContent && !modalContent.contains(event.target as Node)) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleClose = () => {
    router.push('/projects');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse text-white">Cargando proyecto...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <h1 className="text-2xl font-bold text-white mb-4">
          ¡Che, no encontramos este proyecto!
        </h1>
        <p className="text-gray-300 mb-6">
          El proyecto que estás buscando no existe o fue eliminado.
        </p>
        <Link
          href="/projects"
          className="bg-white text-black px-4 py-2 rounded flex items-center hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a todos los proyectos
        </Link>
      </div>
    );
  }

  // Determine video URL for embedding with proper null check
  const videoEmbedUrl = project.videoUrl
    ? getSafeEmbedUrl(project.videoUrl)
    : undefined;

  // Determine if this is a winner project
  const isWinner = !!project.position;
  const winnerClass = getWinnerClass(project.position);

  const ProjectContent = () => (
    <div
      className={`rounded-lg overflow-hidden max-w-4xl w-full mx-auto shadow-lg max-h-[90vh] overflow-scroll border ${winnerClass} modal-content`}
    >
      {/* Header */}
      <div
        className={`flex justify-between items-center p-6 border-b ${
          isWinner ? 'border-black/20' : 'border-zinc-800'
        }`}
      >
        <div className="flex items-center">
          <h1
            className={`text-2xl font-bold ${
              isWinner ? 'text-white' : 'text-white'
            }`}
          >
            {project.name}
          </h1>
          {project.position && (
            <div className="flex items-center ml-2 text-white">
              <Trophy className="h-5 w-5 mr-1" />
              <span className="font-bold text-sm">{project.position}º</span>
            </div>
          )}
        </div>
        <button
          onClick={handleClose}
          className={`transition-colors ${
            isWinner
              ? 'text-white/80 hover:text-white'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main content */}
      <div className="p-6">
        {/* Project image */}
        <div className="flex justify-center mb-8">
          <div
            className={`relative w-full overflow-hidden rounded-lg border ${
              isWinner
                ? 'border-transparent bg-black/20'
                : 'border-zinc-800 bg-black'
            } shadow-sm flex items-center justify-center`}
          >
            <img
              src={project.image}
              alt={project.name}
              className="object-contain w-full h-full p-4 max-h-[300px]"
            />
          </div>
        </div>

        {/* Project description */}
        <div className="mb-8">
          <h2
            className={`text-lg font-semibold mb-2 ${
              isWinner ? 'text-black' : 'text-white'
            }`}
          >
            Descripción
          </h2>
          <p className={`${isWinner ? 'text-black/90' : 'text-gray-300'}`}>
            {project.spanishDescription || project.description}
          </p>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-8">
            <h2
              className={`text-lg font-semibold mb-2 ${
                isWinner ? 'text-black' : 'text-white'
              }`}
            >
              Etiquetas
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className={`inline-flex items-center text-sm px-3 py-1 rounded-full ${
                    isWinner
                      ? 'bg-black/30 text-black'
                      : 'bg-zinc-800 text-white'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Team Information */}
        {team && team.member && team.member.length > 0 && (
          <div className="mb-8">
            <h2
              className={`text-lg font-semibold mb-2 ${
                isWinner ? 'text-black' : 'text-white'
              }`}
            >
              Equipo: {team.teamName}
            </h2>
            <div
              className={`space-y-3 p-4 rounded-lg border ${
                isWinner
                  ? 'bg-black/20 border-black/30'
                  : 'bg-black border-zinc-800'
              }`}
            >
              {team.member.map((member: any, idx: number) => {
                const githubUserName = member?.github?.replace(
                  'https://github.com/',
                  ''
                );

                return (
                  <div key={idx} className="flex flex-col space-y-1">
                    {member.name && (
                      <div
                        className={`font-medium ${
                          isWinner ? 'text-black' : 'text-white'
                        }`}
                      >
                        {member.name}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-3">
                      {githubUserName && (
                        <Link
                          href={`https://github.com/${githubUserName}`}
                          className={`text-xs flex items-center hover:underline ${
                            isWinner
                              ? 'text-black/80 hover:text-black'
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          <GithubIcon className="h-3 w-3 mr-1" />
                          {githubUserName}
                        </Link>
                      )}
                      {member.x && (
                        <Link
                          href={
                            member.x.startsWith('http')
                              ? member.x
                              : `https://x.com/${member.x}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs flex items-center hover:underline ${
                            isWinner
                              ? 'text-black/80 hover:text-black'
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          <svg
                            className="h-3 w-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          {member.x.startsWith('http')
                            ? member.x.split('/').pop()
                            : member.x}
                        </Link>
                      )}
                      {member.linkedin && (
                        <Link
                          href={
                            member.linkedin.startsWith('http')
                              ? member.linkedin
                              : `https://linkedin.com/in/${member.linkedin}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs flex items-center hover:underline ${
                            isWinner
                              ? 'text-black/80 hover:text-black'
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          <svg
                            className="h-3 w-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          LinkedIn
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Video */}
        {videoEmbedUrl && (
          <div className="mb-8">
            <h2
              className={`text-lg font-semibold mb-4 ${
                isWinner ? 'text-black' : 'text-white'
              }`}
            >
              Demo Video
            </h2>
            <div
              className="relative rounded-lg overflow-hidden"
              style={{ paddingTop: '56.25%' }}
            >
              {videoEmbedUrl.includes('drive.google.com') ? (
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center border rounded-lg ${
                    isWinner
                      ? 'border-black/20 bg-black/10'
                      : 'border-zinc-800 bg-black'
                  }`}
                >
                  <Link
                    href={videoEmbedUrl as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded transition-colors flex items-center ${
                      isWinner
                        ? 'bg-black text-white hover:bg-black/80'
                        : 'bg-white hover:bg-gray-200 text-black'
                    }`}
                  >
                    Abrir Video en Google Drive
                  </Link>
                </div>
              ) : (
                <iframe
                  src={videoEmbedUrl}
                  className="absolute inset-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-4">
          {project.productUrl && (
            <Link
              href={project.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded transition-colors flex items-center ${
                isWinner
                  ? 'bg-black text-white hover:bg-black/80'
                  : 'bg-white hover:bg-gray-200 text-black'
              }`}
            >
              <Globe className="h-4 w-4 mr-2" />
              <span>Visitar Sitio Web</span>
            </Link>
          )}

          {typeof project.githubUrl === 'string' && project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded transition-colors flex items-center ${
                isWinner
                  ? 'bg-black/30 hover:bg-black/50 text-black'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-white'
              }`}
            >
              <Github className="h-4 w-4 mr-2" />
              <span>Ver Código en GitHub</span>
            </Link>
          )}

          {Array.isArray(project.githubUrl) && project.githubUrl.length > 0 && (
            <div className="relative group">
              <button
                className={`px-4 py-2 rounded transition-colors flex items-center ${
                  isWinner
                    ? 'bg-black/30 hover:bg-black/50 text-black'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                }`}
              >
                <Github className="h-4 w-4 mr-2" />
                <span>GitHub Repos ({project.githubUrl.length})</span>
              </button>
              <div
                className={`absolute left-0 mt-2 w-64 rounded-md shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 border ${
                  isWinner
                    ? 'bg-white/90 border-black/20'
                    : 'bg-black border-zinc-800'
                }`}
              >
                {(project.githubUrl as string[]).map((url, idx) => (
                  <Link
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block py-2 px-3 text-sm rounded mb-1 truncate ${
                      isWinner
                        ? 'hover:bg-black/20 text-black/80'
                        : 'hover:bg-zinc-900 text-gray-300'
                    }`}
                  >
                    {url.replace('https://github.com/', '')}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative w-full max-w-4xl"
      >
        <ProjectContent />
      </motion.div>
    </div>
  );
}
