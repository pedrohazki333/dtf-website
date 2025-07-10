'use client'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function UploadPreview({ onUpload }: { onUpload: (url: string) => void }) {
  const onDrop = useCallback((accepted: File[]) => {
    const file = accepted[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpload(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
  })

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-4 text-center cursor-pointer rounded-md"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Solte a imagem aqui ...</p>
      ) : (
        <p>Arraste ou clique para enviar sua estampa</p>
      )}
    </div>
  )
}
