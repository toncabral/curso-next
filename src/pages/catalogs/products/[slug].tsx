import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const AddToCartModal = dynamic(
  () => import('@/components/AddToCartModal'),
  { loading: () => <p>Loading...</p>, ssr: true }
)

export default function Product() {
  const router = useRouter()
  const [isAddToCartModalVisivble, setIsAddToCartModalVisivble] = useState(false)

  function handleAddToCart() {
    setIsAddToCartModalVisivble(true)
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCart} >Add to cart</button>

      { isAddToCartModalVisivble && <AddToCartModal /> }
    </div>
  )
}