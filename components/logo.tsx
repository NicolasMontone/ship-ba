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

    //  "uvGradient" | "rainbow" | "glitch" | "rgbGlitch" | "rgbShift" | "shine" | "blink" | "spring" | "duotone" | "tritone" | "hueShift" | "sinewave" | "pixelate" | "halftone" | "slitScanTransition" | "warpTransition" | "pixelateTransition" | "focusTransition";
    vfx.add(logo, { shader: 'rgbShift' })
  }, [])

  return (
    <div ref={logoRef} className="relative w-full">
      <Image src="/ship-ba-light.svg" alt="logo" width={700} height={120} />
    </div>
  )
}
