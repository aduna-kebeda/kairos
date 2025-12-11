import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { VehicleDetail } from "@/components/vehicles/vehicle-detail"
import { vehicles } from "@/lib/data"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return vehicles.map((vehicle) => ({
    id: vehicle.id,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const vehicle = vehicles.find((v) => v.id === id)

  if (!vehicle) {
    return { title: "Vehicle Not Found | Kairos Addis" }
  }

  return {
    title: `${vehicle.name} | Kairos Addis`,
    description: vehicle.description,
  }
}

export default async function VehicleDetailPage({ params }: Props) {
  const { id } = await params
  const vehicle = vehicles.find((v) => v.id === id)

  if (!vehicle) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <VehicleDetail vehicle={vehicle} />
      <Footer />
    </main>
  )
}
