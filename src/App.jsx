import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import Cursor from './Cursor'

function App() {
  const heroRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // every direct child of .hero slides up and fades in, one after another
      gsap.from('.hero > *', {
        y: 40,             // start 40px lower
        opacity: 0,        // start invisible
        duration: 0.9,     // each element takes 0.9 s
        ease: 'power3.out',
        stagger: 0.15,     // 0.15 s delay between elements
        delay: 0.2,
      })
    }, heroRef)

    return () => ctx.revert() // clean up
  }, [])

  return (
    <>
      <Cursor />
      <main className="hero" ref={heroRef}>
        <p className="tag">Industry 4.0 · Automation · XR</p>
        <h1>Om Ajay Patel</h1>
        <p className="subtitle">From factory floor to virtual space</p>
        <a className="cta" href="https://github.com/opatel282001" target="_blank" rel="noreferrer">
          View my work →
        </a>
      </main>
    </>
  )
}

export default App