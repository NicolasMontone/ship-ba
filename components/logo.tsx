'use client'
import { VFXImg, VFXProvider } from 'react-vfx'

export function Logo() {
  return (
    <VFXProvider>
      <div className="relative w-full flex justify-center h-30">
        <VFXImg
          src="/ship-ba-light.svg"
          alt="logo"
          className="w-full"
          width={600}
          height={300}
          shader="rgbShift"
        />
      </div>
    </VFXProvider>
  )
}
