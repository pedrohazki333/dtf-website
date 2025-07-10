'use client'
import { useEffect, useRef } from 'react'
import { fabric } from 'fabric'

export default function CanvasPreview({ baseImage, design }: { baseImage: string; design?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasObj = useRef<fabric.Canvas | null>(null)
  const designRef = useRef<fabric.Image>()

  useEffect(() => {
    if (!canvasRef.current) return
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
  }, [baseImage])

  useEffect(() => {
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
  }, [design])

  return <canvas ref={canvasRef} className="border mx-auto" />
}
