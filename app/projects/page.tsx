import { Suspense } from 'react';
import teamsData from '../../teams.json';
import { getProjectSlug } from '@/lib/get-projects-slug';
import { Project, projectsBase } from '@/lib/projects';
import { getUpvotesForAllProjects } from './actions';
import ProjectCard from './components/ProjectCard';
import ProjectsClientWrapper from './ProjectsClientWrapper';

// Function to get project image path
function getProjectImage(name: string): string {
  // Convert project name to kebab-case for matching image filenames
  const kebabCase = name.toLowerCase().replace(/\s+/g, '-');

  // Map specific project names to their image files
  const imageMapping: Record<string, string> = {
    majorana: '/projects/majorana.png',
    'burro-speech': '/projects/burro-speech.png',
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
  'Burro Speech':
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

// Custom project tags
const projectTags: Record<string, string[]> = {
  Majorana: ['IA', 'Streaming', 'Hackathon'],
  'Burro Speech': ['IA', 'Traducción', 'Hackathon'],
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

// Function to filter out redundant IA tags and ensure each project has Hackathon tag
function filterTags(tags: string[]): string[] {
  const filteredTags = tags.filter((tag) => tag !== 'IA');
  if (!filteredTags.includes('Hackathon')) {
    filteredTags.push('Hackathon');
  }
  return filteredTags;
}

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
    'Burro Speech': 'Thousand Sunny',
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
  // Get Spanish description if available
  const spanishDescription = spanishDescriptions[project.name] || undefined;

  // Get custom tags if available, or generate random ones
  const tags = filterTags(projectTags[project.name] || getRandomTags());

  // Get team information
  const team = findTeamForProject(project.name);

  return {
    ...project,
    upvotes: 0, // Will be filled from database
    tags,
    comments: Math.floor(Math.random() * 15),
    image: getProjectImage(project.name),
    spanishDescription,
    team,
  };
});

// ProjectsList component to handle data fetching
async function ProjectsList() {
  // Get upvote data from server
  const { projectCounts, userUpvotedProjects } =
    await getUpvotesForAllProjects();

  // Sort projects to show winners first (ordered by position) then others by upvote count
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.position && b.position) {
      return parseInt(a.position) - parseInt(b.position);
    }
    if (a.position) return -1;
    if (b.position) return 1;

    // If no position, sort by upvotes
    const upvoteDiff =
      (projectCounts.get(b.name) || 0) - (projectCounts.get(a.name) || 0);

    // If upvotes are the same, sort alphabetically by name
    if (upvoteDiff === 0) {
      return a.name.localeCompare(b.name);
    }

    return upvoteDiff;
  });

  return (
    <div className="space-y-4">
      {sortedProjects.map((project, index) => (
        <ProjectCard
          key={project.name}
          project={project}
          index={index}
          upvoteCount={projectCounts.get(project.name) || 0}
          isUpvoted={userUpvotedProjects.has(project.name)}
        />
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <ProjectsClientWrapper>
      <main className="min-h-screen bg-black text-white">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <header className="mb-8 sm:mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-white">
              Ship BA Batch #1
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
              En menos de 24hs, los participantes crearon 22 proyectos.
            </p>
          </header>

          <Suspense
            fallback={
              <div className="text-center py-8 sm:py-10">
                Cargando proyectos...
              </div>
            }
          >
            <ProjectsList />
          </Suspense>
        </div>
      </main>
    </ProjectsClientWrapper>
  );
}
