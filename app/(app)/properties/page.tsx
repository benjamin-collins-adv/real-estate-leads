import type { Metadata } from "next";
import { PropertyCard } from "@/components/property-card";
import { getProperties } from "@/lib/payload";
import { PropertyFilters } from "@/components/property-filters";

export async function generateMetadata({
  searchParams,
}: PropertiesPageProps): Promise<Metadata> {
  const params = await searchParams;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Helper function to format text for display
  const formatText = (text: string): string => {
    return text
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Build filter descriptions
  const filterParts: string[] = [];
  const keywords: string[] = [
    "real estate",
    "properties",
    "real estate listings",
  ];

  // Property type
  if (params.type && params.type !== "all") {
    const typeLabel = formatText(params.type);
    filterParts.push(typeLabel);
    keywords.push(typeLabel.toLowerCase());
  }

  // Status
  if (params.status && params.status !== "all") {
    const statusLabel = params.status
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    filterParts.push(statusLabel);
    keywords.push(statusLabel.toLowerCase());
  }

  // Location
  if (params.city) {
    filterParts.push(`in ${params.city}`);
    keywords.push(params.city.toLowerCase());
  }
  if (params.state) {
    if (!params.city) {
      filterParts.push(`in ${params.state}`);
    } else {
      filterParts.push(params.state);
    }
    keywords.push(params.state.toLowerCase());
  }

  // Price range
  if (params.price && params.price !== "all") {
    let priceLabel = "";
    switch (params.price) {
      case "under-500k":
        priceLabel = "Under $500,000";
        break;
      case "500k-1m":
        priceLabel = "$500k - $1M";
        break;
      case "1m-2m":
        priceLabel = "$1M - $2M";
        break;
      case "over-2m":
        priceLabel = "Over $2M";
        break;
    }
    if (priceLabel) {
      filterParts.push(priceLabel);
      keywords.push(priceLabel.toLowerCase().replace(/[^a-z0-9\s]/g, ""));
    }
  }

  // Bedrooms
  if (params.bedrooms && params.bedrooms !== "all") {
    const bedrooms = params.bedrooms;
    filterParts.push(`${bedrooms}+ Bedrooms`);
    keywords.push(`${bedrooms} bedroom`);
    keywords.push(`${bedrooms} bed`);
  }

  // Bathrooms
  if (params.bathrooms && params.bathrooms !== "all") {
    const bathrooms = params.bathrooms;
    filterParts.push(`${bathrooms}+ Bathrooms`);
    keywords.push(`${bathrooms} bathroom`);
  }

  // Search query
  if (params.search) {
    filterParts.push(`matching "${params.search}"`);
    keywords.push(params.search.toLowerCase());
  }

  // Build title
  let title = "Browse Properties | Real Estate Listings";
  if (filterParts.length > 0) {
    const mainFilter = filterParts.join(" ");
    title = `${mainFilter} | Real Estate Listings`;
  }

  // Build description
  let description =
    "Discover premium properties for sale and rent. Browse houses, apartments, condos, and townhouses with advanced filters.";
  if (filterParts.length > 0) {
    const filterText = filterParts.join(", ");
    description = `Find ${filterText.toLowerCase()} properties. Browse our curated collection of premium real estate listings with detailed information, photos, and pricing.`;
  }

  // Build canonical URL with filters
  const canonicalParams = new URLSearchParams();
  if (params.type && params.type !== "all")
    canonicalParams.set("type", params.type);
  if (params.status && params.status !== "all")
    canonicalParams.set("status", params.status);
  if (params.price && params.price !== "all")
    canonicalParams.set("price", params.price);
  if (params.bedrooms && params.bedrooms !== "all")
    canonicalParams.set("bedrooms", params.bedrooms);
  if (params.bathrooms && params.bathrooms !== "all")
    canonicalParams.set("bathrooms", params.bathrooms);
  if (params.city) canonicalParams.set("city", params.city);
  if (params.state) canonicalParams.set("state", params.state);
  if (params.search) canonicalParams.set("search", params.search);

  const canonicalUrl = canonicalParams.toString()
    ? `${baseUrl}/properties?${canonicalParams.toString()}`
    : `${baseUrl}/properties`;

  // Build Open Graph image URL (if you have a default OG image)
  const ogImage = `${baseUrl}/og-image.jpg`; // You can customize this

  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      siteName: "Real Estate Listings",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

interface PropertiesPageProps {
  searchParams: Promise<{
    type?: string;
    status?: string;
    price?: string;
    bedrooms?: string;
    bathrooms?: string;
    search?: string;
    city?: string;
    state?: string;
  }>;
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const params = await searchParams;

  // Parse price filter
  let minPrice: number | undefined;
  let maxPrice: number | undefined;
  if (params.price && params.price !== "all") {
    switch (params.price) {
      case "under-500k":
        maxPrice = 500000;
        break;
      case "500k-1m":
        minPrice = 500000;
        maxPrice = 1000000;
        break;
      case "1m-2m":
        minPrice = 1000000;
        maxPrice = 2000000;
        break;
      case "over-2m":
        minPrice = 2000000;
        break;
    }
  }

  const filters = {
    type: params.type,
    status: params.status,
    minPrice,
    maxPrice,
    bedrooms: params.bedrooms ? parseInt(params.bedrooms) : undefined,
    bathrooms: params.bathrooms ? parseInt(params.bathrooms) : undefined,
    search: params.search,
    city: params.city,
    state: params.state,
  };

  const properties = await getProperties(filters);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: properties.map((property, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                name: property.title,
                description:
                  property.description ||
                  `${property.title} in ${property.address}`,
                image: property.image,
                offers: {
                  "@type": "Offer",
                  price: property.price,
                  priceCurrency: "USD",
                  availability:
                    property.status === "for-sale"
                      ? "https://schema.org/InStock"
                      : "https://schema.org/PreOrder",
                  url: `${baseUrl}/properties/${property.slug}`,
                },
              },
            })),
          }),
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="mb-6 sm:mb-8 max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
            {(() => {
              const filterParts: string[] = [];
              const formatText = (text: string): string => {
                return text
                  .split(/[-_]/)
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
              };

              if (params.type && params.type !== "all") {
                filterParts.push(formatText(params.type));
              }
              if (params.status && params.status !== "all") {
                filterParts.push(
                  params.status
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())
                );
              }
              if (params.city) filterParts.push(`in ${params.city}`);
              if (params.state) {
                if (!params.city) filterParts.push(`in ${params.state}`);
                else filterParts.push(params.state);
              }

              return filterParts.length > 0
                ? filterParts.join(" ")
                : "Browse Properties";
            })()}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {properties.length > 0
              ? `Found ${properties.length} ${
                  properties.length === 1 ? "property" : "properties"
                } matching your criteria`
              : "Discover our complete collection of premium properties"}
          </p>
        </div>

        <PropertyFilters initialFilters={params} />

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <p className="text-base sm:text-lg text-muted-foreground mb-4">
              No properties found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
