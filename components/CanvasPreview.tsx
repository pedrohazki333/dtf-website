'use client'
import { useEffect, useRef, useState } from 'react'

type Fabric = typeof import('fabric')

export default function CanvasPreview({ baseImage, design }: { baseImage: string; design?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasObj = useRef<Fabric['Canvas'] | null>(null)
  const designRef = useRef<Fabric['Image'] | null>(null)
  const [fabric, setFabric] = useState<Fabric>()

  useEffect(() => {
    import('fabric').then(setFabric)
  }, [])

  useEffect(() => {
    if (!fabric || !canvasRef.current) return
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 400,
      height: 400,
    })
    canvasObj.current = canvas
    fabric.Image.fromURL(baseImage, img => {
      img.selectable = false
      img.evented = false
      canvas.add(img)
      canvas.sendToBack(img)
    })
    return () => {
      canvas.dispose()
    }
  }, [baseImage, fabric])

  useEffect(() => {
    if (!fabric) return
    const canvas = canvasObj.current
    if (!canvas) return
    if (designRef.current) {
      canvas.remove(designRef.current)
    }
    if (design) {
      fabric.Image.fromURL(design, img => {
        img.scaleToWidth(200)
        img.top = 100
        img.left = 100
        designRef.current = img
        canvas.add(img)
      })
    }
  }, [design, fabric])

  return <canvas ref={canvasRef} className="border mx-auto" />
}
