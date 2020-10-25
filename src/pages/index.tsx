import { GetServerSideProps } from 'next'
import { Title } from '@/styles/pages/Home'
import React from 'react'
import SEO from '@/components/SEO'

interface Product {
  id: number;
  title: string;
}

interface HomeProps {
  recommendedProducts: Product[];
}

export default function Home({ recommendedProducts }: HomeProps) {

  async function handleSum() {
    const math = ((await import('../lib/math')).default)

    math.sum(3, 5)
  }

  return (
    <div>

      <SEO title="DevCommerce, your best ecommerce!" shouldExcludeTitleSuffix />
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>
      </section>

      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`)
  const recommendedProducts = await response.json()

  return {
    props: {
      recommendedProducts
    }
  }
}
