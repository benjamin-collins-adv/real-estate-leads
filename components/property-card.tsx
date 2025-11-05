import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <Link href={`/properties/${property.slug}`}>
        <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <Badge 
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-xs"
            variant={
              property.status === "for-sale" 
                ? "default" 
                : property.status === "for-rent"
                ? "secondary"
                : "outline"
            }
          >
            {property.status === "for-sale" 
              ? "For Sale" 
              : property.status === "for-rent"
              ? "For Rent"
              : property.status.charAt(0).toUpperCase() + property.status.slice(1).replace("-", " ")}
          </Badge>
          <Badge className="absolute top-3 left-3 sm:top-4 sm:left-4 text-xs" variant="outline">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </Badge>
        </div>
      </Link>

      <CardHeader className="flex-1">
        <Link href={`/properties/${property.slug}`}>
          <h3 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors mb-2 line-clamp-2">
            {property.title}
          </h3>
        </Link>
        <div className="flex items-start gap-1.5 text-xs sm:text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-2">{property.address}</span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">
          {formatPrice(property.price)}
          {property.status === "for-rent" && <span className="text-sm sm:text-base font-normal text-muted-foreground">/mo</span>}
        </div>
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full text-sm sm:text-base">
          <Link href={`/properties/${property.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

