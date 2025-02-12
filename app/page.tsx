import { Logo } from '@/components/logo'

export default function Home() {
  return (
    <div className="mx-auto container p-4">
      <div className="flex flex-col items-center gap-2 mt-20">
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
    </div>
  )
}
