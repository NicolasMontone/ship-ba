import { Logo } from "@/components/logo";

import Image from "next/image";

const judges = [
  {
		name: "Gabriel",
		companyLogo: "/company/silver.svg",
		image: "/judge/gabriel.jpg",
		description:
			"Staff Engineer con 15+ años de experiencia en startups como Robinhood y OpenSea. Founder de Silver.dev y host del podcast Tecnología Informal",
		link: "https://x.com/Conanbatt",
	},
	{
		name: "Fefo Miras",
		companyLogo: "/company/scale.png",
		image: "/judge/fefo.jpg",
		description: "Founder pluggy.ai (YC S21), hacker, gamer, investor",
		link: "https://x.com/fefomiras",
	},
  {
    name: "Felipe Damonte",
		companyLogo: "/company/newtopia.png",
		image: "/judge/fela.jpeg",
		description: "Investor @ Newtopia VC",
		link: "https://www.linkedin.com/in/fela/",
  }
];

export default function Home() {
	return (
		<div className="mx-auto container p-4">
			<div className="flex flex-col items-center gap-2 my-20">
				<div className="md:mt-40 flex justify-center">
					<Logo />
				</div>
				<p className="text-center text-xl text-muted-foreground my-4 max-w-[500px]">
					Primera Hackathon de Buenos Aires enfocada en Shippear
				</p>

				<a
					href="https://forms.gle/bwhNofDrhXXJs2Kr8"
					target="_blank"
					rel="noreferrer"
				>
					<div className={"relative inline-block"}>
						<div
							className="absolute left-[3px] top-[3px] h-full w-full transition-transform hover:translate-x-0 hover:translate-y-0"
							style={{ border: "1px solid #fff" }}
						/>

						<button
							className="font-mono font-medium text-sm px-3 py-2 relative z-10 transition-transform hover:translate-x-[3px] hover:translate-y-[3px]"
							style={{
								border: "1px solid #fff",
							}}
							type="button"
						>
							Inscribí a tu equipo
						</button>
					</div>
				</a>
			</div>
			<div className="w-full flex flex-col items-start mt-24">
				<div className="flex justify-center w-full">
					<div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-32">
						<div className="flex flex-col items-start gap-2">
							<a href="https://www.silver.dev">
								<Image
									src="/sponsor/silver.svg"
									alt="Silver.dev - Platinum sponsor"
									width={300}
									height={120}
									className="object-contain"
									priority
								/>
							</a>
							<p className="font-mono text-sm mb-4">Platinum sponsor</p>
						</div>
						<div className="flex flex-col items-start gap-2">
							<a href="https://vercel.com">
								<Image
									src="/sponsor/vercel.svg"
									alt="Vercel - Gold sponsor"
									width={200}
									height={57}
									className="object-contain"
									priority
								/>
							</a>
							<p className="font-mono text-sm mb-4">Gold sponsor</p>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-dotted h-[45px] w-full my-20" />

			{/* <div className="bg-dotted h-[45px] w-full mt-20" /> */}
			<div className="w-full flex flex-col items-start mt-20">
				<h2 className="font-mono text-center text-md mb-4">Información</h2>
				<div className="w-full border border-white">
					<ul className="grid gap-4 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3">
						<li className="p-8 flex flex-col items-start justify-center">
							<h3 className="font-mono text-sm">Del 8 al 9 de Marzo</h3>
							<p className="text-sm text-muted-foreground mt-2">
								En un fin de semana, 24hs, tendremos que desarrollar un proyecto
								y dejarlo productivo
							</p>
						</li>

						<li className="p-8 flex flex-col items-start justify-center">
							<h3 className="font-mono text-sm">Equipos hasta 4 personas</h3>
							<p className="text-sm text-muted-foreground mt-2">
								Un equipo de pocas personas hace que se itere más rápido.
							</p>
						</li>

						<li className="p-8 flex flex-col items-start justify-center">
							<h3 className="font-mono text-sm">Jueces</h3>
							<p className="text-sm text-muted-foreground mt-2">
								Vamos a tener jueces que van a evaluar los proyectos.
								<br /> Se irán revelando poco a poco.
							</p>
						</li>

						<li className="p-8 flex flex-col items-start justify-center">
							<h3 className="font-mono text-sm">Mentores</h3>
							<p className="text-sm text-muted-foreground mt-2">
								Vamos a tener mentores que van a ayudar a los equipos.
							</p>
						</li>
						<li className="p-8 flex flex-col items-start justify-center">
							<h3 className="font-mono text-sm">Premios</h3>
							<p className="text-sm text-muted-foreground mt-2">
								Coming soon...
							</p>
						</li>
						<li className="p-8 flex flex-col items-start justify-center">
							<h3 className="font-mono text-sm">Inscripción</h3>
							<p className="text-sm text-muted-foreground mt-2">
								Hay cupos limitados, registrate para no perderte el evento.
							</p>
						</li>
					</ul>
				</div>
			</div>
			<div className="bg-dotted h-[45px] w-full my-20" />

			{/* Judges Section */}
			<div className="w-full flex flex-col items-start mt-32 mb-20">
				<h2 className="font-mono text-3xl font-bold mb-8">Jueces</h2>
				<p className="text-lg text-muted-foreground max-w-[800px] mb-12">
					Van a encargarse de evaluar los proyectos y dar feedback. <br />
					Los jueces son personas muy cracks con mucho recorrido en la industria y llevarte feedback de ellos puede ser lo más valioso de la hackathon.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
					{judges.map((judge) => (
						<a
							href={judge.link}
							target="_blank"
							rel="noreferrer"
							key={judge.name}
						>
							<div className="relative overflow-hidden border border-white/20 group transition-all duration-300 hover:shadow-lg">
								<div className="aspect-square relative">
									<Image
										src={judge.image}
										alt={`${judge.name} - Juez`}
										fill
										className="object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
										<Image
											src={judge.companyLogo}
											alt={`${judge.name} company`}
											width={120}
											height={60}
											className="object-contain mb-4"
										/>
                    <p className="text-sm text-center text-white font-mono leading-relaxed max-w-[90%] bg-black/40 p-2 rounded">{judge.description}</p>
									</div>
								</div>
								<div className="p-4 bg-black/80 absolute bottom-0 w-full transition-all duration-300 group-hover:bg-black/90">
									<h3 className="font-mono text-sm font-medium">
										{judge.name}
									</h3>
									<p className="text-xs text-white/70 mt-1 line-clamp-2">
										{judge.description}
									</p>
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
			<footer className="border-t-[1px] border-border px-4 md:px-6 pt-10 md:pt-16 bg-[#fff] dark:bg-[#0C0C0C] overflow-hidden h-[200px] md:h-[300px]">
				<div className="-mb-20">
					<Image
						src="/ship-ba-gray.png"
						alt="Ship BA Logo"
						width={1200}
						height={600}
						className="w-full object-contain"
						priority
					/>
				</div>
			</footer>
		</div>
	);
}
