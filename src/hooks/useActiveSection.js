import { useEffect, useState } from 'react'

// Returns the id of the section currently crossing the middle of the screen, or null.
// Ids that don't exist on the page yet are ignored, so this works before the sections are built.
export default function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null)
  const key = ids.join(',')

  useEffect(() => {
    const elements = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) setActiveId(target.id)
          else setActiveId((current) => (current === target.id ? null : current))
        })
      },
      // A thin band in the middle of the viewport decides which section is active.
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [key])

  return activeId
}
