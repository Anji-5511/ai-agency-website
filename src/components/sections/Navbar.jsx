import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button'
import useActiveSection from '../../hooks/useActiveSection'
import { EASE } from '../../lib/motion'
import { BRAND_LOGO, BRAND_NAME } from '../../lib/brand'

// Link targets. Add matching ids (e.g. id="services") to the sections when they are built.
// Lenis scrolls to them smoothly because it handles every #hash link.
const NAV_LINKS = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#ai-demo' },
  { label: 'Process', href: '#process' },
]
const CTA = { label: "Let's Talk", href: '#contact' }
const SECTION_IDS = [...NAV_LINKS.map((link) => link.href.slice(1)), CTA.href.slice(1)]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const activeId = useActiveSection(SECTION_IDS)

  // The background fades in gradually over the first 80px of scrolling (no re-renders).
  const { scrollY } = useScroll()
  const backgroundOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const topShadeOpacity = useTransform(scrollY, [0, 80], [1, 0])

  // While the mobile menu is open: Escape closes it, the page behind doesn't scroll,
  // and it closes automatically if the window grows to desktop size.
  useEffect(() => {
    if (!menuOpen) return
    const desktop = window.matchMedia('(min-width: 768px)')
    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpen(false)
    const onDesktop = (event) => event.matches && setMenuOpen(false)

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onDesktop)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [menuOpen])

  const menuVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : -8, transition: { duration: reduceMotion ? 0 : 0.2 } },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.35,
        ease: EASE,
        when: 'beforeChildren',
        staggerChildren: reduceMotion ? 0 : 0.05,
      },
    },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 8 },
    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.4, ease: EASE } },
  }

  return (
    <header id="top" className="fixed inset-x-0 top-0 z-50">
      {/* Background layers: a soft top shade for readability, then a blurred bar that fades in on scroll. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={{ opacity: topShadeOpacity }}
          className="absolute inset-x-0 top-0 h-[120%] bg-linear-to-b from-ink-950/60 to-transparent"
        />
        <motion.div
          style={{ opacity: backgroundOpacity }}
          className="absolute inset-0 border-b border-white/15 bg-ink-800/85 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.7)] backdrop-blur-2xl backdrop-saturate-150"
        >
          {/* Thin accent line on the bottom edge separates the bar from the page */}
          <span className="absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-brand-violet/50 to-transparent" />
        </motion.div>
        <div
          className={`absolute inset-0 border-b border-line bg-ink-950/90 backdrop-blur-xl transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <nav
        aria-label="Main"
        className="container-page grid h-16 grid-cols-[1fr_auto] items-center md:h-[72px] md:grid-cols-[1fr_auto_1fr]"
      >
        <a
          href="#top"
          aria-label={`${BRAND_NAME}, back to top`}
          className="flex w-fit items-center gap-2.5 whitespace-nowrap font-display text-lg font-semibold tracking-tight text-fg"
        >
          <span className="flex h-11 w-[4.4rem] items-center justify-center overflow-hidden rounded-lg bg-white md:h-12 md:w-[4.8rem]">
            <img src={BRAND_LOGO} alt="" className="size-full scale-[1.6] object-contain" />
          </span>
          {BRAND_NAME}
        </a>

        <ul className="hidden items-center gap-3 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`group relative block rounded-control px-3.5 py-2 text-sm font-medium transition-colors duration-300 ease-premium hover:text-fg focus-visible:text-fg ${
                    isActive ? 'text-fg' : 'text-fg/75'
                  }`}
                >
                  {/* Soft violet wash on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-control bg-linear-to-b from-brand-violet/15 to-brand-blue/5 opacity-0 transition-opacity duration-300 ease-premium group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                  <span className="relative">{link.label}</span>
                  {/* Underline grows from the center on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3.5 bottom-0.5 h-px origin-center scale-x-0 bg-linear-to-r from-brand-blue via-brand-violet to-brand-cyan transition-transform duration-300 ease-premium group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                  {/* Active indicator slides between links */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE }}
                      className="absolute inset-x-3.5 bottom-0.5 h-px bg-linear-to-r from-brand-blue/80 via-brand-violet/80 to-brand-cyan/80"
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden justify-end md:flex">
          <Button href={CTA.href} className="px-5 py-2.5">
            {CTA.label}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="flex size-10 cursor-pointer items-center justify-center rounded-control border border-line-strong bg-white/5 text-fg transition-colors duration-300 hover:bg-white/10 active:bg-white/15 md:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? 'close' : 'open'}
              initial={{ opacity: 0, rotate: reduceMotion ? 0 : -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: reduceMotion ? 0 : 45 }}
              transition={{ duration: reduceMotion ? 0 : 0.15 }}
              className="flex"
            >
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="container-page pb-8 pt-2 md:hidden"
          >
            <ul className="border-t border-line">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.href.slice(1)
                return (
                  <motion.li key={link.href} variants={itemVariants} className="border-b border-line">
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`group flex items-center gap-3 py-4 font-display text-2xl font-medium transition-[color,transform,background-color] duration-300 ease-premium hover:translate-x-1 hover:text-fg focus-visible:text-fg active:bg-white/5 ${
                        isActive ? 'text-fg' : 'text-fg/80'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-px bg-linear-to-r from-brand-blue to-brand-cyan transition-all duration-300 ease-premium group-hover:w-5 ${
                          isActive ? 'w-5' : 'w-0'
                        }`}
                      />
                      {link.label}
                    </a>
                  </motion.li>
                )
              })}
            </ul>
            <motion.div variants={itemVariants}>
              <Button href={CTA.href} onClick={() => setMenuOpen(false)} className="mt-6 w-full">
                {CTA.label}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
