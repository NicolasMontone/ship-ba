export type Project = {
	position: string;
	name: string;
	productUrl: string;
	videoUrl: string;
	githubUrl: string | string[];
	// New fields for Product Hunt-like design
	description?: string;
	spanishDescription?: string;
	tags?: string[];
	image?: string; // Image path
	team?: any;
	comments?: number; // Number of comments
	upvotes?: number; // Number of upvotes
}

export const projectsBase: Project[] = [
	// Winners (with position)
	{
		position: '1',
		name: 'Majorana',
		productUrl: 'https://shipba-proyect-2.vercel.app/',
		videoUrl: 'https://www.youtube.com/watch?v=wqrSNCqqUus',
		githubUrl: 'https://github.com/Peibl/shipba-proyect-2',
		description:
			'Twitch streamer assistant: chat main discussion topics, sentiment & analytics',
		spanishDescription: 'Asistente para streamers de Twitch: Analiza los temas principales del chat, sentimiento y métricas ¡Una genialidad para tus directos, che!',
		tags: ['IA', 'Streaming', 'Hackathon'],
		image: '/projects/majorana.png',
		team: 'Majorana',
	},
	{
		position: '2',
		name: 'Burro Speech',
		productUrl: 'https://burro-speech.vercel.app/',
		videoUrl: 'https://youtu.be/bYqF2QPHnf4',
		githubUrl: 'https://github.com/418labs/burro-speech',
		description:
			'AI-powered live translation for events, meetings or workshops',
		spanishDescription: 'Traducción en vivo con inteligencia artificial para eventos, reuniones o talleres. ¡Habla tranqui que Burro lo traduce al toque!',
		tags: ['IA', 'Traducción', 'Hackathon'],
		image: '/projects/burro-speech.png',
		team: 'Thousand Sunny',
	},
	{
		position: '3',
		name: 'U0',
		productUrl: 'https://www.npmjs.com/package/@lndgalante/u0',
		videoUrl: '-',
		githubUrl: 'https://github.com/lndgalante/last-minute-shipba',
		description:
			'Generate user personas to get feedback on your product with AI',
		spanishDescription: 'Generá personas ficticias para recibir feedback de tu producto con IA. ¡La mejor forma de poner a prueba tu idea, viste!',
		tags: ['IA', 'UX', 'Feedback', 'Hackathon'],
		image: '/projects/u0.png',
		team: 'NoName',
	},

	// Other projects (no position)
	{
		position: '',
		name: 'Wololo',
		productUrl: 'https://wololo-shipba-hackathon.vercel.app/',
		videoUrl:
			'https://drive.google.com/file/d/1nhbDfasH0Ye8t_pzzdi2YGB-YNfts3nw/view?usp=sharing',
		githubUrl: 'https://github.com/gvillo/wololo-shipba-hackathon',
		description: 'AI Travel Planner',
		spanishDescription: 'Planificador de viajes con IA. Armá tu itinerario completo para cualquier destino sin complicarte la vida, ¡re copado!',
		tags: ['IA', 'Viajes', 'Planificación', 'Hackathon'],
		image: '/projects/wololo.png',
		team: 'Wololo',
	},
	{
		position: '',
		name: 'Tote Bag',
		productUrl: 'https://www.toteplan.com/',
		videoUrl: 'https://youtu.be/Wb99RXGnLzY',
		githubUrl: 'The only app you need to buy groceries',
		description: 'The only app you need to buy groceries',
		spanishDescription: 'La única app que necesitás para hacer las compras. ¡No más listas en papel que después perdés, che!',
		tags: ['Productividad', 'Compras', 'Hackathon'],
		image: '/projects/tote-bag.png',
		team: 'NNs',
	},
	{
		position: '',
		name: 'Chronocode',
		productUrl: 'https://www.chronocode.ai/',
		videoUrl: 'https://www.loom.com/share/004c5f3037e84e86bd39a98abdf033e3',
		githubUrl: 'https://github.com/chrono-code-hackathon/chronocode',
		description: "Understand your repository's journey",
		spanishDescription: 'Entendé la historia completa de tu repositorio. ¡Mirá cómo fue evolucionando tu código, está buenísimo!',
		tags: ['Desarrollo', 'Git', 'Análisis', 'Hackathon'],
		image: '/projects/chronocode.png',
		team: 'campanacoding',
	},
	{
		position: '',
		name: 'Que Comí',
		productUrl: 'https://quecomi.vercel.app',
		videoUrl:
			'https://drive.google.com/file/d/1-6O1Ro-xGT8QkXzPIkXoLMKf4NBveHN6/view?usp=drive_link',
		githubUrl: 'Registra lo que comes sin esfuerzo',
		description: 'Registra lo que comes sin esfuerzo',
		spanishDescription: 'Registrá lo que comés sin esfuerzo. Llevá el control de tus comidas de forma fácil y rápida, ¡una masa!',
		tags: ['Salud', 'Alimentación', 'Hackathon'],
		image: '/projects/que-comi.png',
		team: 'OF (Only Frontends)',
	},
	{
		position: '',
		name: 'Sirvana Eats',
		productUrl: 'https://eat-eight.vercel.app/',
		videoUrl: 'https://screen.studio/share/cVgh0P9Q',
		githubUrl: [
			'https://github.com/mateozaratefw/muerte',
			'https://github.com/mateozaratefw/eat',
			'https://github.com/mateozaratefw/sirvana-eats',
		],
		description: 'Prompt to food',
		spanishDescription: 'De prompt a comida. Pedí lo que se te antoje con simples instrucciones, ¡y listo el pollo!',
		tags: ['IA', 'Comida', 'Hackathon'],
		image: '/projects/sirvana-eats.png',
		team: 'Sirvana',
	},
	{
		position: '',
		name: 'Shipa Docs',
		productUrl: 'https://shipa-docs.vercel.app/',
		videoUrl: 'https://screen.studio/share/Y72mmc2l',
		githubUrl: 'https://github.com/decker-dev/shipa-app',
		description: 'Improve Your Documentation with AI',
		spanishDescription: 'Mejorá tu documentación con IA. Hacé que tus textos técnicos sean entendibles para todos, ¡un golazo!',
		tags: ['IA', 'Documentación', 'Desarrollo', 'Hackathon'],
		image: '/projects/shipa-docs.png',
		team: 'chaco',
	},
	{
		position: '',
		name: 'Expense Radar',
		productUrl: 'https://expenseradar.com',
		videoUrl: 'https://youtu.be/UQcXsKQNuDQ',
		githubUrl: '',
		description:
			'Get instant, detailed expense analysis with actionable recommendation',
		spanishDescription: 'Obtené un análisis detallado de gastos al instante con recomendaciones accionables. ¡La mejor forma de controlar la guita!',
		tags: ['Finanzas', 'Análisis', 'Hackathon'],
		image: '/projects/expense-radar.png',
		team: 'Zeppole',
	},
	// {
	//   position: '',
	//   name: 'Norwich AI',
	//   productUrl: 'https://norwichai-front.vercel.app/',
	//   videoUrl: 'https://youtu.be/hiQVXgFets0',
	//   githubUrl: '',
	// },
	{
		position: '',
		name: 'Gaid',
		productUrl: 'http://gaid.ar/',
		videoUrl: 'https://youtu.be/EsQ5hO-RQ3o',
		githubUrl: 'https://github.com/gaid-org',
		description: 'Encontrá tu plan para hoy',
		spanishDescription: 'Encontrá tu plan para hoy. Descubrí actividades copadas cerca tuyo sin romperte el bocho pensando qué hacer.',
		tags: ['IA', 'Ocio', 'Planificación', 'Hackathon'],
		image: '/projects/gaid.png',
		team: 'GAID',
	},
	{
		position: '',
		name: 'Mesh Community',
		productUrl: 'https://mesh-community.vercel.app',
		videoUrl:
			'https://www.loom.com/share/05de786126fd4c029a9a9cd234efa6d4?sid=db5d8b38-5fbf-4116-bc55-b1526bed6024',
		githubUrl: 'https://github.com/florianreyes/shipba-rag',
		description: 'Encontrá tu network',
		spanishDescription: 'Encontrá tu network ideal. Conectate con gente que suma a tus proyectos, ¡re piola!',
		tags: ['Redes', 'Comunidad', 'Hackathon'],
		image: '/projects/mesh-community.png',
		team: 'Galo AI',
	},
	// {
	//   position: '',
	//   name: 'Deppty',
	//   productUrl: 'https://deppty.vercel.app/',
	//   videoUrl: 'https://www.loom.com/share/725b975f089e4c1bbd3fa597680d40e7',
	//   githubUrl: 'https://github.com/Flozad/deppty',
	// },
	// {
	//   position: '',
	//   name: 'Shorts GENAI',
	//   productUrl: 'https://nextjs-ai-chatbot-misty-surf-6277.fly.dev/',
	//   videoUrl:
	//     'https://drive.google.com/drive/folders/1QrmqHcl7y6QKHK-jECwdU9pqPdfVj2mL?usp=sharing',
	//   githubUrl: '',
	// },
	{
		position: '',
		name: 'Fresh Decks',
		productUrl: 'https://decks.eighteenlabs.ai/',
		videoUrl: 'https://youtu.be/nMOxbkwbNDU',
		githubUrl: '',
		description: 'AI-powered deck builder',
		spanishDescription: 'Creador de presentaciones con IA. Armá slides increíbles en dos patadas, ¡quedás como un campeón!',
		tags: ['IA', 'Presentaciones', 'Hackathon'],
		image: '/projects/fresh-decks.png',
		team: 'Fresh Co.',
	},
	{
		position: '',
		name: 'Ardillapp',
		productUrl: 'https://ardillapp.vercel.app/',
		videoUrl:
			'https://drive.google.com/file/d/1c9XnJ2YqEXuXFKzkslDbVVXod53XVk-p/view',
		githubUrl: 'https://github.com/julideangelis/ardillapp',
		description: 'Stock and analysis for businesses',
		spanishDescription: 'Stock y análisis para negocios. Controlá tu inventario y ventas sin volverte loco, ¡una maravilla!',
		tags: ['Negocios', 'Inventario', 'Análisis', 'Hackathon'],
		image: '/projects/ardillap.png', // Note the typo in the filename
		team: 'stockIAte',
	},
	{
		position: '',
		name: 'Docs AI',
		productUrl: 'docsai-1.vercel.app',
		videoUrl: 'https://youtu.be/kalxhTx5paA',
		githubUrl: 'https://github.com/guerrerojuli/shipba',
		description: 'Cursor for documents',
		spanishDescription: 'Cursor para documentos. Navegá y editá textos de forma inteligente, ¡te ahorrás un montón de laburo!',
		tags: ['IA', 'Productividad', 'Documentos', 'Hackathon'],
		image: '/projects/docs-ai.png',
		team: 'LGH',
	},
	// {
	//   position: '',
	//   name: '???',
	//   productUrl: 'https://e4d9-190-210-38-133.ngrok-free.app/',
	//   videoUrl:
	//     'https://www.loom.com/share/241c5c4049ab416d918f6b91448bdf0e?sid=24ab7440-5763-4006-af30-3825c3ea8f44',
	//   githubUrl: '',
	// },
	{
		position: '',
		name: 'Coddy',
		productUrl: 'https://coddy-naomicouriels-projects.vercel.app',
		videoUrl: '',
		githubUrl: '',
		description: 'Tu tutor personal de programación',
		tags: ['IA', 'Educación', 'Programación', 'Hackathon'],
		image: '/projects/coddy.png',
		team: 'Skip Lost',
	},
	{
		position: '',
		name: 'Introfy',
		productUrl: 'https://introfy-seven.vercel.app/',
		videoUrl: 'https://www.youtube.com/watch?v=QEXdLYPlgyc',
		githubUrl: '',
		description: 'Encontrá la red perfecta para vos',
		tags: ['Redes', 'Comunidad', 'Hackathon'],
		image: '/projects/introfy.png',
		team: 'Space Motion',
	},
];