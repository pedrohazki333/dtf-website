import Link from 'next/link'
import { useRef } from 'react'
import { products } from '../lib/products'

export default function Home() {
  const listRef = useRef<HTMLDivElement>(null)
  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex flex-col items-center justify-center flex-1 text-center px-4 py-20 bg-gray-100">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 max-w-xl">
          Transforme sua ideia em uma peça personalizada com DTF
        </h1>
        <button
          className="mt-4 bg-electric text-white px-6 py-3 rounded-md"
          onClick={() => listRef.current?.scrollIntoView({ behavior: 'smooth' })}
        >
          Ver Produtos
        </button>
      </section>
      <section ref={listRef} className="px-4 py-16 grid gap-8 md:grid-cols-2">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/product/${p.slug}`}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
          >
            <img src={p.imagem} alt={p.nome} className="w-full h-60 object-contain" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{p.nome}</h2>
              <p className="text-electric font-bold">R$ {p.preco.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
