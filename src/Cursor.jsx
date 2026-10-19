import { useEffect, useRef } from 'react'
import './Cursor.css'

function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // no custom cursor on phones/tablets
    if (window.matchMedia('(pointer: coarse)').matches) return

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: mouse.x, y: mouse.y }
    let frame

    // the dot follows the mouse instantly
    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`
    }

    // the ring grows when hovering over links/buttons
    const onOver = (e) => {
      const hovering = e.target.closest('a, button')
      ringRef.current.classList.toggle('cursor-ring--active', !!hovering)
    }

    // pulse on click, like pulling a VR trigger
    const onDown = (e) => {
      const pulse = document.createElement('div')
      pulse.className = 'cursor-pulse'
      pulse.style.left = `${e.clientX}px`
      pulse.style.top = `${e.clientY}px`
      document.body.appendChild(pulse)
      pulse.addEventListener('animationend', () => pulse.remove())
    }

    // the ring follows smoothly
    const animate = () => {
      ring.x += (mouse.x - ring.x) * 0.15
      ring.y += (mouse.y - ring.y) * 0.15
      ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`
      frame = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    document.body.classList.add('custom-cursor')
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      cancelAnimationFrame(frame)
      document.body.classList.remove('custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  )
}

export default Cursor