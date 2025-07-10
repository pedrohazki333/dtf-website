export const products = [
  {
    slug: 'camiseta-personalizada',
    nome: 'Camiseta Personalizada',
    preco: 49.9,
    imagem: '/camisetas/camiseta-branca.svg',
  },
  {
    slug: 'blusa-moletom',
    nome: 'Blusa de Moletom',
    preco: 79.9,
    imagem: '/camisetas/blusa-branca.svg',
  },
] as const;

export type Product = (typeof products)[number];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
