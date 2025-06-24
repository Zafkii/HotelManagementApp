// src/components/ScrollableNavbar.tsx
import { useRef, useEffect, ReactNode } from "react"
import "./ScrollableNavbar.css"

interface ScrollableNavbarProps {
  children: ReactNode
  className?: string
}

const ScrollableNavbar = ({
  children,
  className = "",
}: ScrollableNavbarProps) => {
  const navbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const navbar = navbarRef.current
    if (!navbar) return

    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true
      startX = e.pageX - navbar.offsetLeft
      scrollLeft = navbar.scrollLeft
    }

    const handleMouseLeave = () => (isDown = false)
    const handleMouseUp = () => (isDown = false)

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - navbar.offsetLeft
      const walk = (x - startX) * 1
      navbar.scrollLeft = scrollLeft - walk
    }

    navbar.addEventListener("mousedown", handleMouseDown)
    navbar.addEventListener("mouseleave", handleMouseLeave)
    navbar.addEventListener("mouseup", handleMouseUp)
    navbar.addEventListener("mousemove", handleMouseMove)

    return () => {
      navbar.removeEventListener("mousedown", handleMouseDown)
      navbar.removeEventListener("mouseleave", handleMouseLeave)
      navbar.removeEventListener("mouseup", handleMouseUp)
      navbar.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <nav ref={navbarRef} className={`scrollable-navbar ${className}`}>
      {children}
    </nav>
  )
}

export default ScrollableNavbar
