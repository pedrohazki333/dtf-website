import { loadStripe } from '@stripe/stripe-js'
import { useCallback } from 'react'

export default function Checkout() {
  const handlePay = useCallback(async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || '')
    if (!stripe) return
    await stripe.redirectToCheckout({
      lineItems: [{ price: process.env.NEXT_PUBLIC_STRIPE_PRICE || '', quantity: 1 }],
      mode: 'payment',
      successUrl: window.location.origin + '/?success',
      cancelUrl: window.location.origin + '/?canceled',
    })
  }, [])

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="border p-4 rounded-md mb-4">
        <p>Camiseta Personalizada x1</p>
        <p className="font-bold">R$ 49,90</p>
      </div>
      <button onClick={handlePay} className="bg-electric text-white px-6 py-3 rounded-md w-full">
        Pagar com Stripe
      </button>
    </div>
  )
}
