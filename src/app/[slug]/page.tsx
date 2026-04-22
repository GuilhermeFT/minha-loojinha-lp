import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLpContent, getLpContentPaths, mergeWithLivePrices } from '@/lib/content'
import { LpPageContent } from '@/components/lp-page-content'
import { getPlansPrice } from '@/services/plans.service'

const siteUrlDefault =
  process.env.NEXT_PUBLIC_URL ?? 'https://minhaloojinha.com.br'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const paths = getLpContentPaths()
  if (!paths.includes(slug)) {
    return { title: 'Não encontrado' }
  }
  const content = getLpContent(slug)
  const baseUrl = siteUrlDefault.replace(/\/$/, '')
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: `${baseUrl}/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  const paths = getLpContentPaths()
  return paths.filter((p) => p !== 'main').map((slug) => ({ slug }))
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  const paths = getLpContentPaths()
  if (!paths.includes(slug)) {
    notFound()
  }

  const [rawContent, prices] = await Promise.all([
    Promise.resolve(getLpContent(slug)),
    getPlansPrice(),
  ])
  const content = mergeWithLivePrices(rawContent, prices)
  const siteUrl = process.env.NEXT_PUBLIC_URL ?? 'https://minhaloojinha.com.br'
  const baseUrl = siteUrl.replace(/\/$/, '')

  return <LpPageContent content={content} baseUrl={baseUrl} />
}
