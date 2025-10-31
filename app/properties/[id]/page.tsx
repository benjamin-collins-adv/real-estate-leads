import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertyById, properties } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Square, MapPin, Calendar, Car, ArrowLeft } from "lucide-react";
import { InformationRequest } from "@/components/lead-generation/information-request";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }));
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
      <Link
        href="/properties"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Properties
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Image Gallery */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full rounded-lg overflow-hidden">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Property Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Badge
                variant={property.status === "for-sale" ? "default" : "secondary"}
                className="text-xs"
              >
                {property.status === "for-sale" ? "For Sale" : "For Rent"}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{property.address}</span>
            </div>

            <div className="text-3xl sm:text-4xl font-bold text-primary mb-6 sm:mb-8">
              {formatPrice(property.price)}
              {property.status === "for-rent" && (
                <span className="text-lg sm:text-xl font-normal text-muted-foreground">/mo</span>
              )}
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                  <Bed className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground mb-2" />
                  <div className="text-xl sm:text-2xl font-bold">{property.bedrooms}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Bedrooms</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                  <Bath className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground mb-2" />
                  <div className="text-xl sm:text-2xl font-bold">{property.bathrooms}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Bathrooms</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                  <Square className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground mb-2" />
                  <div className="text-xl sm:text-2xl font-bold">{property.sqft.toLocaleString()}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Square Feet</div>
                </CardContent>
              </Card>
              {property.parking !== undefined && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                    <Car className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground mb-2" />
                    <div className="text-xl sm:text-2xl font-bold">{property.parking}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Parking</div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Description */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">Description</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {property.description || "This beautiful property offers everything you're looking for in a perfect home."}
              </p>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold">Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm sm:text-base text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t">
              {property.yearBuilt && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Year Built</div>
                    <div className="text-sm sm:text-base font-medium">{property.yearBuilt}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Want More Information?</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                  Get detailed property information, floor plans, neighborhood data, and pricing analysis delivered to your inbox.
                </p>
              </div>
              <InformationRequest
                propertyId={property.id}
                resourceType="property-details"
                trigger={
                  <Button className="w-full" size="lg">
                    Download Property Details
                  </Button>
                }
              />
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <div className="pt-4 sm:pt-6 border-t space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold">
                    {formatPrice(property.price)}
                    {property.status === "for-rent" && "/mo"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bedrooms</span>
                  <span className="font-semibold">{property.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bathrooms</span>
                  <span className="font-semibold">{property.bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Square Feet</span>
                  <span className="font-semibold">{property.sqft.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

