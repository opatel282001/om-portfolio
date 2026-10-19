import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Cursor from './Cursor'
import About from './About'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const heroRef = useRef(null)

  // smooth scrolling (Lenis), synced with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({lerp: 0.07, smoothWheel: true, smoothTouch: false})
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1) intro when the page loads
      gsap.from('.hero > *', {
        y: 40,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        stagger: 0.25,
        delay: 0.2,
      })

      // 2) while scrolling down, the hero moves up and fades out (follows the scroll)
      gsap.to(heroRef.current, {
        y: -120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, heroRef)

    return () => ctx.revert()
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
      <About />
    </>
  )
}

export default App