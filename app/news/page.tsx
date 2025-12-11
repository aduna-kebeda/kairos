import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { newsArticles } from "@/lib/data"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"

export const metadata = {
  title: "News & Lifestyle | Kairos Addis",
  description:
    "Stay updated with the latest EV news, charging guides, model highlights, and lifestyle content from Kairos Addis.",
}

const categories = [
  { value: "all", label: "All Articles" },
  { value: "ev-benefits", label: "EV Benefits" },
  { value: "charging", label: "Charging" },
  { value: "model-highlights", label: "Model Highlights" },
  { value: "company-news", label: "Company News" },
  { value: "lifestyle", label: "Lifestyle" },
]

const featuredArticle = {
  id: "featured",
  title: "The Complete Guide to Electric Vehicle Ownership in Ethiopia",
  slug: "ev-ownership-guide-ethiopia",
  excerpt:
    "Everything you need to know about owning, charging, and maintaining an electric vehicle in Ethiopia. From charging infrastructure to cost savings, we cover it all.",
  content: "Full article content here...",
  image: "/electric-car-charging-station-modern-city.jpg",
  category: "ev-benefits" as const,
  author: "Kairos Addis Editorial Team",
  publishedAt: "2025-01-20",
  readTime: 12,
}

const additionalArticles = [
  {
    id: "5",
    title: "Top 5 Reasons to Switch to an Electric Vehicle Today",
    slug: "top-5-reasons-switch-ev",
    excerpt: "Discover the compelling reasons why now is the perfect time to make the transition to electric mobility.",
    image: "/happy-family-with-electric-car-modern.jpg",
    category: "ev-benefits",
    author: "Automotive Expert",
    publishedAt: "2025-01-18",
    readTime: 4,
  },
  {
    id: "6",
    title: "How to Maximize Your EV's Battery Life",
    slug: "maximize-ev-battery-life",
    excerpt:
      "Expert tips on charging habits, temperature management, and driving techniques to extend your battery's lifespan.",
    image: "/electric-car-battery-technology-diagram.jpg",
    category: "charging",
    author: "Technical Team",
    publishedAt: "2025-01-12",
    readTime: 6,
  },
  {
    id: "7",
    title: "Geely Galaxy E5: The Future of Smart Mobility",
    slug: "geely-galaxy-e5-spotlight",
    excerpt:
      "An in-depth look at the technology and features that make the Galaxy E5 a standout choice for Ethiopian drivers.",
    image: "/geely-galaxy-e5-spotlight-feature.jpg",
    category: "model-highlights",
    author: "Product Specialist",
    publishedAt: "2025-01-08",
    readTime: 5,
  },
]

const allArticles = [...newsArticles, ...additionalArticles]

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    "ev-benefits": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    charging: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "model-highlights": "bg-gold/20 text-gold",
    "company-news": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    lifestyle: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  }
  return colors[category] || "bg-muted text-muted-foreground"
}

function getCategoryLabel(category: string) {
  return categories.find((c) => c.value === category)?.label || category
}

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 bg-navy">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 border-gold text-gold">
              News & Lifestyle
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
              Stay <span className="text-gold">Informed</span>
            </h1>
            <p className="text-xl text-white/70">
              Explore the latest in electric mobility, charging solutions, model highlights, and the EV lifestyle in
              Ethiopia.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href={`/news/${featuredArticle.slug}`}>
            <Card className="overflow-hidden bg-card border-border hover:border-gold/50 transition-all group">
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <Image
                    src={featuredArticle.image || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-gold text-navy">Featured</Badge>
                </div>
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge className={`w-fit mb-4 ${getCategoryColor(featuredArticle.category)}`}>
                    {getCategoryLabel(featuredArticle.category)}
                  </Badge>
                  <h2 className="font-serif text-2xl lg:text-3xl font-bold text-card-foreground mb-4 group-hover:text-gold transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{featuredArticle.excerpt}</p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {featuredArticle.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredArticle.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {featuredArticle.readTime} min read
                    </span>
                  </div>
                  <div className="flex items-center text-gold font-medium group-hover:gap-2 transition-all">
                    Read Article
                    <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={category.value === "all" ? "default" : "outline"}
                className={
                  category.value === "all"
                    ? "bg-gold text-navy hover:bg-gold-light"
                    : "border-border hover:border-gold hover:text-gold bg-transparent"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allArticles.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`}>
                <Card className="h-full overflow-hidden bg-card border-border hover:border-gold/50 transition-all group">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <Badge className={`mb-3 ${getCategoryColor(article.category)}`}>
                      {getCategoryLabel(article.category)}
                    </Badge>
                    <h3 className="font-semibold text-lg text-card-foreground mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime} min
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-gold text-gold hover:bg-gold hover:text-navy bg-transparent"
            >
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-white/70 mb-8">
              Subscribe to our newsletter for the latest EV news, exclusive offers, and updates from Kairos Addis.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-gold"
              />
              <Button className="bg-gold text-navy hover:bg-gold-light font-semibold px-8">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
