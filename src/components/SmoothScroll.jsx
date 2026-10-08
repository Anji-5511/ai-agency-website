import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Mounts one Lenis instance for the whole app. Renders nothing.
// Touch devices keep native scrolling; Lenis only smooths wheel/trackpad input.
export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lenis = null
    let frameId = 0

    const raf = (time) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }

    const start = () => {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true })
      frameId = requestAnimationFrame(raf)
    }

    const stop = () => {
      cancelAnimationFrame(frameId)
      lenis?.destroy()
      lenis = null
    }

    // Follow the user's setting, even if it changes while the page is open.
    const sync = () => {
      stop()
      if (!reducedMotion.matches) start()
    }

    sync()
    reducedMotion.addEventListener('change', sync)

    return () => {
      reducedMotion.removeEventListener('change', sync)
      stop()
    }
  }, [])

  return null
}
