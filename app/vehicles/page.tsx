import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { VehicleCatalog } from "@/components/vehicles/vehicle-catalog"

export const metadata = {
  title: "Vehicle Catalog | Kairos Addis",
  description:
    "Explore our premium selection of electric vehicles from BYD, Geely, and Toyota. Find your perfect EV for Ethiopian roads.",
}

export default function VehiclesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <VehicleCatalog />
      <Footer />
    </main>
  )
}
