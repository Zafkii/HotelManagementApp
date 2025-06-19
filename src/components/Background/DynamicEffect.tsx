import { useEffect } from "react"

const DynamicBackgroundEffect = () => {
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : e.clientX
      const y = "touches" in e ? e.touches[0].clientY : e.clientY

      const width = window.innerWidth
      const height = window.innerHeight

      const hueShift = (x / width - 0.5) * 10 // -15° a +15°
      const saturation = 0.8 + (1 - y / height) * 1.1 // desde 1.2 a 2.0

      const body = document.getElementById("dynamic-bg")
      if (body) {
        body.style.filter = `hue-rotate(${hueShift}deg) saturate(${saturation})`
      }
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("touchmove", handleMove)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("touchmove", handleMove)
    }
  }, [])

  return null
}

export default DynamicBackgroundEffect
