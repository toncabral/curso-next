import React from 'react'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { Title } from '@/styles/pages/Home'
import { client } from '@/lib/prismic'
import Prismic from 'prismic-javascript'
import PrismicDom from 'prismic-dom'
import { Document } from 'prismic-javascript/types/documents'


import SEO from '@/components/SEO'

interface Product {
  id: number;
  title: string;
}

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {


  return (
    <div>

      <SEO title="DevCommerce, your best ecommerce!" shouldExcludeTitleSuffix />
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalogs/products/${recommendedProduct.uid}`}>
                  {PrismicDom.RichText.asText(recommendedProduct.data.title)}
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}

