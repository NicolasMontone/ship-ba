export type Project = {
	position: string;
	name: string;
	productUrl: string;
	videoUrl: string;
	githubUrl: string | string[];
	// New fields for Product Hunt-like design
	description?: string;
	spanishDescription?: string;
	upvotes?: number;
	tags?: string[];
	comments?: number;
	image?: string; // Image path
	team?: any;
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
	},
	{
		position: '2',
		name: 'Burro Speach',
		productUrl: 'https://burro-speech.vercel.app/',
		videoUrl: 'https://youtu.be/bYqF2QPHnf4',
		githubUrl: 'https://github.com/418labs/burro-speech',
		description:
			'AI-powered live translation for events, meetings or workshops',
	},
	{
		position: '3',
		name: 'U0',
		productUrl: 'https://www.npmjs.com/package/@lndgalante/u0',
		videoUrl: '-',
		githubUrl: 'https://github.com/lndgalante/last-minute-shipba',
		description:
			'Generate user personas to get feedback on your product with AI',
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
	},
	{
		position: '',
		name: 'Tote Bag',
		productUrl: 'https://www.toteplan.com/',
		videoUrl: 'https://youtu.be/Wb99RXGnLzY',
		githubUrl: 'The only app you need to buy groceries',
	},
	{
		position: '',
		name: 'Chronocode',
		productUrl: 'https://www.chronocode.ai/',
		videoUrl: 'https://www.loom.com/share/004c5f3037e84e86bd39a98abdf033e3',
		githubUrl: 'https://github.com/chrono-code-hackathon/chronocode',
		description: "Understand your repository's journey",
	},
	{
		position: '',
		name: 'Que Comí',
		productUrl: 'https://quecomi.vercel.app',
		videoUrl:
			'https://drive.google.com/file/d/1-6O1Ro-xGT8QkXzPIkXoLMKf4NBveHN6/view?usp=drive_link',
		githubUrl: 'Registra lo que comes sin esfuerzo',
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
	},
	{
		position: '',
		name: 'Shipa Docs',
		productUrl: 'https://shipa-docs.vercel.app/',
		videoUrl: 'https://screen.studio/share/Y72mmc2l',
		githubUrl: 'https://github.com/decker-dev/shipa-app',
		description: 'Improve Your Documentation with AI',
	},
	{
		position: '',
		name: 'Expense Radar',
		productUrl: 'https://expenseradar.com',
		videoUrl: 'https://youtu.be/UQcXsKQNuDQ',
		githubUrl: '',
		description:
			'Get instant, detailed expense analysis with actionable recommendation',
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
	},
	{
		position: '',
		name: 'Mesh Community',
		productUrl: 'https://mesh-community.vercel.app',
		videoUrl:
			'https://www.loom.com/share/05de786126fd4c029a9a9cd234efa6d4?sid=db5d8b38-5fbf-4116-bc55-b1526bed6024',
		githubUrl: 'https://github.com/florianreyes/shipba-rag',
		description: 'Encontrá tu network',
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
	},
	{
		position: '',
		name: 'Ardillapp',
		productUrl: 'https://ardillapp.vercel.app/',
		videoUrl:
			'https://drive.google.com/file/d/1brhWkGA44LriTIfcsk2J0HP5GQoUTEbI/view?usp=sharing',
		githubUrl: 'https://github.com/julideangelis/ardillapp',
		description: 'Stock and analysis for businesses',
	},
	{
		position: '',
		name: 'Docs AI',
		productUrl: 'docsai-1.vercel.app',
		videoUrl: 'https://youtu.be/kalxhTx5paA',
		githubUrl: 'https://github.com/guerrerojuli/shipba',
		description: 'Cursor for documents',
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
	},
	{
		position: '',
		name: 'Introfy',
		productUrl: 'https://introfy-seven.vercel.app/',
		videoUrl: 'https://www.youtube.com/watch?v=QEXdLYPlgyc',
		githubUrl: '',
		description: 'Encontrá la red perfecta para vos',
	},
];