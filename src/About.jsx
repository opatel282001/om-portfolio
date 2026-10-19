import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

function About() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
    gsap.from('.about-reveal', {
        y: 80,
        opacity: 0,
        ease: 'none',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',  // starts when the section enters the screen
          end: 'top 15%',    // fully visible when its top is at 30% of the screen
          scrub: 1.5,          // follows the scroll, with 1 s of smoothing
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <p className="section-label about-reveal">01 — About</p>
      <h2 className="about-reveal">Engineer between the factory floor and the virtual world.</h2>
      <p className="about-text about-reveal">
        I'm Om, an M.Eng. graduate in Industry 4.0 from SRH Berlin with a background in electronics.
        I like building things that connect machines, data and people — from sensors on a live
        production line to a VR welding cell that shows its energy use in real time. Now I'm looking
        for my first role in automation or digital manufacturing in Germany.
      </p>
      <div className="about-stats about-reveal">
        <div><span>70%</span>less paperwork with my IIoT system in production</div>
        <div><span>6-axis</span>industrial robot programmed in Python</div>
        <div><span>VR</span>energy planning tool for welding cells (M.Eng. thesis)</div>
      </div>
    </section>
  )
}

export default About