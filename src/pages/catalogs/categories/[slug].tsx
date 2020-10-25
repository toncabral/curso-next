import React from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import { Title } from "../../../styles/pages/Home"
import { useRouter } from "next/router"

interface Product {
  id: number;
  title: string;
}

interface CategoryProps {
  products: Product[];
}

export default function Category({products}: CategoryProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <Title>{router.query.slug}</Title>

<ul>
  {products.map(product => {
    return (
      <li key={product.id}>
        {product.title}
      </li>
    )
  })}
</ul>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3333/categories`)
  const categories = await response.json()
  return {
    paths: categories.map(category => {
      return {
        params: { slug: category.id }
      }
    }),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
  const { slug } = context.params

  const response = await fetch(`http://localhost:3333/products?category_id=${slug}`)
  const products = await response.json()

  return {
    props: {
      products
    },
    revalidate: 60,
  }
}