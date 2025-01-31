import { Logo } from '@/components/logo'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center gap-2 mt-20">
        <div className="w-full mt-40 flex justify-center">
          <Logo />
        </div>
        <p className="text-center text-xl text-secondary my-4 max-w-[500px]">
          Primera Hackathon de Buenos Aires enfocada en Shippear
        </p>

        <a
          href="https://x.com/shipbahackathon"
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
              Queres saber más?
            </button>
          </div>
        </a>
      </div>

      <div className="flex flex-col items-center mt-40">
        <h2 className="text-2xl font-bold mb-8">
          Acompañados por las mejores empresas
        </h2>

        <div className="flex flex-row ">
          <div className="flex justify-center border border-white border-1 border-solid w-fit p-4">
            Logos
          </div>
        </div>
      </div>
    </div>
  )
}
