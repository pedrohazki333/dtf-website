import { useRouter } from 'next/router'
import { useState } from 'react'
import CanvasPreview from '../../components/CanvasPreview'
import UploadPreview from '../../components/UploadPreview'
import { getProduct } from '../../lib/products'
import Link from 'next/link'

export default function ProductPage() {
  const router = useRouter()
  const { slug } = router.query
  const product = typeof slug === 'string' ? getProduct(slug) : undefined
  const [design, setDesign] = useState<string>()

  if (!product) return <p className="p-4">Produto não encontrado.</p>

  return (
    <div className="p-4 max-w-3xl mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{product.nome}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <CanvasPreview baseImage={product.imagem} design={design} />
        <div className="flex-1 space-y-4">
          <UploadPreview onUpload={setDesign} />
          <div className="flex gap-4">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md">Adicionar ao Carrinho</button>
            <Link href="/checkout" className="bg-electric text-white px-4 py-2 rounded-md">Finalizar Pedido</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
