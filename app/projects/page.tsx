'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Trophy,
  Globe,
  Video,
  Github,
  X,
  ChevronUp,
  MessageSquare,
  Tag,
  Maximize2,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import teamsData from '../../teams.json';
import { cn } from '@/lib/utils';
import { getProjectSlug } from '@/lib/get-projects-slug';
import { Project, projectsBase } from '@/lib/projects';

// Define the Project type

// Function to convert video URLs to embed URLs
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

// Function to get project image path
function getProjectImage(name: string): string {
  // Convert project name to kebab-case for matching image filenames
  const kebabCase = name.toLowerCase().replace(/\s+/g, '-');

  // Map specific project names to their image files
  const imageMapping: Record<string, string> = {
    majorana: '/projects/majorana.png',
    'burro-speach': '/projects/burro-speach.png',
    u0: '/projects/u0.png',
    wololo: '/projects/wololo.png',
    'tote-bag': '/projects/tote-bag.png',
    chronocode: '/projects/chronocode.png',
    'que-comí': '/projects/que-comi.png',
    'sirvana-eats': '/projects/sirvana-eats.png',
    'shipa-docs': '/projects/shipa-docs.png',
    'expense-radar': '/projects/expense-radar.png',
    'mesh-community': '/projects/mesh-community.png',
    'fresh-decks': '/projects/fresh-decks.png',
    ardillapp: '/projects/ardillap.png', // Note the typo in the filename
    'docs-ai': '/projects/docs-ai.png',
    gaid: '/projects/gaid.png',
    coddy: '/projects/coddy.png',
    introfy: '/projects/introfy.png',
  };

  // Return the mapped image path or a placeholder
  return (
    imageMapping[kebabCase] ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random&color=fff&size=300&bold=true&width=400&height=200`
  );
}

// Spanish translations for descriptions with Argentinian accent
const spanishDescriptions: Record<string, string> = {
  Majorana:
    'Asistente para streamers de Twitch: Analiza los temas principales del chat, sentimiento y métricas ¡Una genialidad para tus directos, che!',
  'Burro Speach':
    'Traducción en vivo con inteligencia artificial para eventos, reuniones o talleres. ¡Habla tranqui que Burro lo traduce al toque!',
  U0: 'Generá personas ficticias para recibir feedback de tu producto con IA. ¡La mejor forma de poner a prueba tu idea, viste!',
  Wololo:
    'Planificador de viajes con IA. Armá tu itinerario completo para cualquier destino sin complicarte la vida, ¡re copado!',
  'Tote Bag':
    'La única app que necesitás para hacer las compras. ¡No más listas en papel que después perdés, che!',
  Chronocode:
    'Entendé la historia completa de tu repositorio. ¡Mirá cómo fue evolucionando tu código, está buenísimo!',
  'Que Comí':
    'Registrá lo que comés sin esfuerzo. Llevá el control de tus comidas de forma fácil y rápida, ¡una masa!',
  'Sirvana Eats':
    'De prompt a comida. Pedí lo que se te antoje con simples instrucciones, ¡y listo el pollo!',
  'Shipa Docs':
    'Mejorá tu documentación con IA. Hacé que tus textos técnicos sean entendibles para todos, ¡un golazo!',
  'Expense Radar':
    'Obtené un análisis detallado de gastos al instante con recomendaciones accionables. ¡La mejor forma de controlar la guita!',
  Gaid: 'Encontrá tu plan para hoy. Descubrí actividades copadas cerca tuyo sin romperte el bocho pensando qué hacer.',
  'Mesh Community':
    'Encontrá tu network ideal. Conectate con gente que suma a tus proyectos, ¡re piola!',
  'Fresh Decks':
    'Creador de presentaciones con IA. Armá slides increíbles en dos patadas, ¡quedás como un campeón!',
  Ardillapp:
    'Stock y análisis para negocios. Controlá tu inventario y ventas sin volverte loco, ¡una maravilla!',
  'Docs AI':
    'Cursor para documentos. Navegá y editá textos de forma inteligente, ¡te ahorrás un montón de laburo!',
};

// Function to generate random tags
function getRandomTags(): string[] {
  const allTags = [
    'IA',
    'Desarrollo',
    'Productividad',
    'Web App',
    'Diseño',
    'Finanzas',
    'Hackathon',
    'Open Source',
    'No-Code',
  ];
  const numTags = 1 + Math.floor(Math.random() * 3); // 1-3 tags
  const selectedTags = [];

  // Always include Hackathon tag
  selectedTags.push('Hackathon');

  for (let i = 0; i < numTags; i++) {
    const tag = allTags[Math.floor(Math.random() * allTags.length)];
    if (!selectedTags.includes(tag)) {
      selectedTags.push(tag);
    }
  }

  return selectedTags;
}

// Custom project tags
const projectTags: Record<string, string[]> = {
  Majorana: ['IA', 'Streaming', 'Hackathon'],
  'Burro Speach': ['IA', 'Traducción', 'Hackathon'],
  U0: ['IA', 'UX', 'Feedback', 'Hackathon'],
  Wololo: ['IA', 'Viajes', 'Planificación', 'Hackathon'],
  'Tote Bag': ['Productividad', 'Compras', 'Hackathon'],
  Chronocode: ['Desarrollo', 'Git', 'Análisis', 'Hackathon'],
  'Que Comí': ['Salud', 'Alimentación', 'Hackathon'],
  'Sirvana Eats': ['IA', 'Comida', 'Hackathon'],
  'Shipa Docs': ['IA', 'Documentación', 'Desarrollo', 'Hackathon'],
  'Expense Radar': ['Finanzas', 'Análisis', 'Hackathon'],
  Gaid: ['IA', 'Ocio', 'Planificación', 'Hackathon'],
  'Mesh Community': ['Redes', 'Comunidad', 'Hackathon'],
  'Fresh Decks': ['IA', 'Presentaciones', 'Hackathon'],
  Ardillapp: ['Negocios', 'Inventario', 'Análisis', 'Hackathon'],
  'Docs AI': ['IA', 'Productividad', 'Documentos', 'Hackathon'],
};

// Parse the project data from the provided info

// Function to filter out redundant IA tags and ensure each project has Hackathon tag
function filterTags(tags: string[]): string[] {
  const filteredTags = tags.filter((tag) => tag !== 'IA');
  if (!filteredTags.includes('Hackathon')) {
    filteredTags.push('Hackathon');
  }
  return filteredTags;
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
    Coddy: 'Skip Lost',
    Introfy: 'Space Motion',
  };

  const teamName = projectTeamMap[projectName];
  if (!teamName) return null;

  return teamsData.find((team) => team.teamName === teamName);
}

// Add in the Product Hunt style fields, image paths, Spanish descriptions and custom tags
const projects: Project[] = projectsBase.map((project) => {
  // Generate random upvotes - more for winners
  const baseUpvotes = project.position ? 150 : 50;
  const upvotes = baseUpvotes + Math.floor(Math.random() * 100);

  // Position 1 gets more upvotes
  const positionBonus =
    project.position === '1'
      ? 150
      : project.position === '2'
      ? 100
      : project.position === '3'
      ? 50
      : 0;

  // Get Spanish description if available
  const spanishDescription = spanishDescriptions[project.name] || undefined;

  // Get custom tags if available, or generate random ones
  const tags = filterTags(projectTags[project.name] || getRandomTags());

  // Get team information
  const team = findTeamForProject(project.name);

  return {
    ...project,
    upvotes: upvotes + positionBonus,
    tags,
    comments: Math.floor(Math.random() * 15),
    image: getProjectImage(project.name),
    spanishDescription,
    team,
  };
});

export default function ProjectsPage() {
  const router = useRouter();

  // State for video modal
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentProjectName, setCurrentProjectName] = useState('');

  // State for image modal
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentImageAlt, setCurrentImageAlt] = useState('');

  // State for upvotes - store in a Map with project name as key
  const [upvoteCounts, setUpvoteCounts] = useState<Map<string, number>>(
    new Map(projects.map((p) => [p.name, p.upvotes || 0]))
  );

  // State for user upvotes
  const [userUpvotes, setUserUpvotes] = useState<Set<string>>(new Set());

  // Function to open video modal
  const openVideoModal = (videoUrl: string, projectName: string) => {
    setCurrentVideoUrl(getEmbedUrl(videoUrl));
    setCurrentProjectName(projectName);
    setVideoModalOpen(true);
  };

  // Function to close video modal
  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setCurrentVideoUrl('');
  };

  // Function to open image modal
  const openImageModal = (
    imageSrc: string,
    imageAlt: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage(imageSrc);
    setCurrentImageAlt(imageAlt);
    setImageModalOpen(true);
  };

  // Function to close image modal
  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  // Function to open project detail page
  const openProjectDetail = (projectName: string) => {
    const slug = getProjectSlug(projectName);
    router.push(`/projects/${slug}`);
  };

  // Function to handle upvote
  const handleUpvote = (projectName: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening project detail
    setUpvoteCounts((prev) => {
      const newCounts = new Map(prev);
      // If user already upvoted, remove upvote
      if (userUpvotes.has(projectName)) {
        newCounts.set(projectName, (prev.get(projectName) || 0) - 1);
        setUserUpvotes((prev) => {
          const newUpvotes = new Set(prev);
          newUpvotes.delete(projectName);
          return newUpvotes;
        });
      } else {
        // Otherwise add upvote
        newCounts.set(projectName, (prev.get(projectName) || 0) + 1);
        setUserUpvotes((prev) => {
          const newUpvotes = new Set(prev);
          newUpvotes.add(projectName);
          return newUpvotes;
        });
      }
      return newCounts;
    });
  };

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

  // Sort projects to show winners first (ordered by position) then others by upvote count
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.position && b.position) {
      return parseInt(a.position) - parseInt(b.position);
    }
    if (a.position) return -1;
    if (b.position) return 1;
    // If no position, sort by upvotes
    return (upvoteCounts.get(b.name) || 0) - (upvoteCounts.get(a.name) || 0);
  });

  // Add ESC key handler for closing modals
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeVideoModal();
        closeImageModal();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Ship BA Batch #1
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            En menos de 24hs, los participantes crearon 22 proyectos.
          </p>
        </header>

        <div className="space-y-4">
          {sortedProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`rounded-lg overflow-hidden border ${getWinnerClass(
                project.position
              )} hover:shadow-md transition-all duration-300 cursor-pointer`}
              onClick={() => openProjectDetail(project.name)}
            >
              <div className="flex p-6">
                {/* Upvote Column */}
                {/* <div className="mr-6 flex flex-col items-center justify-start pt-2">
                  <button
                    onClick={(e) => handleUpvote(project.name, e)}
                    className={`flex flex-col items-center group ${
                      userUpvotes.has(project.name)
                        ? `text-${project.position ? 'black' : 'white'}`
                        : `text-${project.position ? 'black/70' : 'gray-400'}`
                    }`}
                  >
                    <ChevronUp
                      className={`h-7 w-7 mb-1 ${
                        userUpvotes.has(project.name)
                          ? `text-${project.position ? 'black' : 'white'}`
                          : `group-hover:text-${
                              project.position ? 'black' : 'white'
                            }`
                      }`}
                    />
                    <span className="text-sm font-medium">
                      {upvoteCounts.get(project.name) || 0}
                    </span>
                  </button>
                </div> */}

                {/* Project Image */}
                <div className="mr-6 relative flex-shrink-0">
                  <div
                    className={`relative w-56 overflow-hidden rounded-lg border h-full ${
                      project.position
                        ? 'border-transparent bg-black/10'
                        : 'border-zinc-800 bg-zinc-900'
                    } shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center group`}
                  >
                    <img
                      src={project.image || getProjectImage(project.name)}
                      alt={project.name}
                      className="object-contain w-full h-full p-2 max-h-20"
                    />
                    <button
                      className="absolute top-1 right-1 bg-black/70 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) =>
                        openImageModal(
                          project.image || getProjectImage(project.name),
                          project.name,
                          e
                        )
                      }
                    >
                      <Maximize2
                        className={`h-4 w-4 ${
                          project.position ? 'text-white' : 'text-white'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        <span
                          className={`text-xl font-semibold ${
                            project.position ? 'text-black' : 'text-white'
                          }`}
                        >
                          {project.name}
                        </span>
                        {project.position && (
                          <div className="flex items-center ml-2 text-black">
                            <Trophy className="h-5 w-5 mr-1" />
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
                  <div className="flex items-center mt-2 space-x-3">
                    {project.productUrl && (
                      <Link
                        href={project.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'text-xs text-gray-300 hover:text-white flex items-center',
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
                        onClick={(e) => {
                          e.stopPropagation();
                          openVideoModal(project.videoUrl, project.name);
                        }}
                        className={cn(
                          'text-xs text-gray-300 hover:text-white flex items-center',
                          project.position && 'text-black hover:text-black'
                        )}
                      >
                        <Video className="h-3 w-3 mr-1" />
                        <span>Ver Demo</span>
                      </button>
                    )}

                    {typeof project.githubUrl === 'string' &&
                      project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'text-xs text-gray-300 hover:text-white flex items-center',
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
                          <button className="text-xs text-gray-300 hover:text-white flex items-center">
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
                  </div>

                  {/* Team Info (if available) */}
                  {project.team && (
                    <div className="mt-3 pt-2 border-t border-zinc-800">
                      <span
                        className={cn(
                          'text-xs text-gray-400',
                          project.position && 'text-black'
                        )}
                      >
                        Equipo: {project.team.teamName}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-zinc-900 rounded-lg overflow-hidden w-full max-w-4xl shadow-xl border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-zinc-800">
              <h3 className="text-xl font-bold text-white">
                {currentProjectName} Demo
              </h3>
              <button
                onClick={closeVideoModal}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative" style={{ paddingTop: '56.25%' }}>
              {/* Check for Google Drive URLs and display a different message */}
              {currentVideoUrl.includes('drive.google.com') ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black">
                  <p className="mb-4 text-lg text-gray-300">
                    Los videos de Google Drive no se pueden embeber
                    directamente.
                  </p>
                  <Link
                    href={currentVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded transition-colors"
                  >
                    Abrir Video en Google Drive
                  </Link>
                </div>
              ) : (
                <iframe
                  src={currentVideoUrl}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Image Modal */}
      {imageModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-zinc-900 rounded-lg overflow-hidden shadow-xl max-w-4xl w-full max-h-[90vh] p-4 border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                {currentImageAlt}
              </h3>
              <button
                onClick={closeImageModal}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-center items-center h-full">
              <img
                src={currentImage}
                alt={currentImageAlt}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
