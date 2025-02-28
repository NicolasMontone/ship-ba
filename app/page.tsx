import { Logo } from '@/components/logo'
import Image from 'next/image'

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
          <div className={'relative inline-block'}>
            <div
              className="absolute left-[3px] top-[3px] h-full w-full transition-transform hover:translate-x-0 hover:translate-y-0"
              style={{ border: '1px solid #fff' }}
            />

            <button
              className="font-mono font-medium text-sm px-3 py-2 relative z-10 transition-transform hover:translate-x-[3px] hover:translate-y-[3px]"
              style={{
                border: '1px solid #fff',
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
  )
}
