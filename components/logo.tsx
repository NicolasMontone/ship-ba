'use client'
import { VFX } from '@vfx-js/core'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export function Logo() {
  const logoRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!logoRef.current) return
    const logo = logoRef.current

    const vfx = new VFX()

    vfx.add(logo, { shader: 'rgbShift' })
  }, [])

  return (
    <div ref={logoRef} className="relative w-full flex justify-center h-30">
      <img src="/ship-ba-light.svg" alt="logo" className="w-full" />
    </div>
  )
}
