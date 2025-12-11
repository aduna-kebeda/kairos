import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { newsArticles } from "@/lib/data"
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

const articleContent = `
## Introduction

Ethiopia's transportation landscape is undergoing a remarkable transformation. As the country embraces sustainable development goals and works toward reducing carbon emissions, electric vehicles (EVs) are emerging as a key component of this green revolution.

## The Rise of EVs in Ethiopia

Over the past few years, we've witnessed a significant shift in attitudes toward electric mobility. Ethiopian consumers are increasingly recognizing the benefits of EVs, from lower operating costs to environmental consciousness.

### Key Benefits for Ethiopian Drivers

1. **Cost Savings**: With electricity being significantly cheaper than fuel in Ethiopia, EV owners can save substantially on their monthly transportation costs.

2. **Environmental Impact**: EVs produce zero tailpipe emissions, contributing to cleaner air in our cities, particularly in Addis Ababa where traffic congestion is a growing concern.

3. **Reduced Maintenance**: Electric vehicles have fewer moving parts than traditional combustion engines, meaning lower maintenance costs and fewer visits to the mechanic.

4. **Government Support**: The Ethiopian government has introduced various incentives to promote EV adoption, including reduced import duties on electric vehicles.

## Charging Infrastructure

One of the most common concerns about EV ownership is charging infrastructure. At Kairos Addis, we're working to address this challenge:

- **Home Charging**: Most EV owners charge their vehicles at home overnight, making it convenient and cost-effective.
- **Public Charging**: We're partnering with businesses and government entities to expand public charging networks across Addis Ababa.
- **Fast Charging**: Our service center offers fast-charging capabilities for customers who need a quick top-up.

## The Future Looks Electric

As battery technology continues to improve and charging infrastructure expands, we expect EV adoption in Ethiopia to accelerate. The vehicles we offer at Kairos Addis – from BYD, Geely, and Toyota – represent the cutting edge of electric mobility technology, designed to meet the unique needs of Ethiopian drivers.

## Conclusion

The electric revolution in Ethiopia is not just about transportation – it's about building a sustainable future for generations to come. At Kairos Addis, we're proud to be at the forefront of this transformation, helping Ethiopians embrace cleaner, smarter mobility solutions.

---

*Ready to join the electric revolution? Visit our showroom or contact us to learn more about our premium electric vehicle selection.*
`

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const article = newsArticles.find((a) => a.slug === slug)

  if (!article) {
    return { title: "Article Not Found | Kairos Addis" }
  }

  return {
    title: `${article.title} | Kairos Addis News`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = newsArticles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = newsArticles.filter((a) => a.id !== article.id).slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-24">
        <div className="relative h-[50vh] min-h-[400px]">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="mx-auto max-w-4xl">
              <Badge className="mb-4 bg-gold text-navy">{article.category.replace("-", " ")}</Badge>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{article.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white/70">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {article.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {article.readTime} min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/news">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to News
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Share:</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground mb-8 pb-8 border-b border-border">{article.excerpt}</p>

          {/* Article Body */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="whitespace-pre-line text-foreground leading-relaxed">{articleContent}</div>
          </div>

          {/* CTA */}
          <Card className="mt-12 bg-navy text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="font-serif text-2xl font-bold mb-4">Interested in Electric Vehicles?</h3>
              <p className="text-white/70 mb-6">
                Explore our premium selection of EVs and schedule a test drive today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/vehicles">
                  <Button className="bg-gold text-navy hover:bg-gold-light">Browse Vehicles</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Related Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedArticles.map((related) => (
              <Link key={related.id} href={`/news/${related.slug}`}>
                <Card className="h-full overflow-hidden bg-card border-border hover:border-gold/50 transition-all group">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={related.image || "/placeholder.svg"}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-card-foreground mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{related.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
