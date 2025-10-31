"use client";

import { useState } from "react";
import { PropertyCard } from "@/components/property-card";
import { properties } from "@/lib/data";
import type { Property } from "@/types/property";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function PropertiesPage() {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");

  const handleSearch = () => {
    let filtered = [...properties];

    if (searchQuery) {
      filtered = filtered.filter(
        (prop) =>
          prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prop.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((prop) => prop.type === typeFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((prop) => prop.status === statusFilter);
    }

    if (priceFilter !== "all") {
      filtered = filtered.filter((prop) => {
        const price = prop.price;
        switch (priceFilter) {
          case "under-500k":
            return price < 500000;
          case "500k-1m":
            return price >= 500000 && price < 1000000;
          case "1m-2m":
            return price >= 1000000 && price < 2000000;
          case "over-2m":
            return price >= 2000000;
          default:
            return true;
        }
      });
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
      <div className="mb-6 sm:mb-8 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Browse Properties
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Discover our complete collection of premium properties
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="sm:col-span-2">
            <Input
              placeholder="Search by location or property name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="for-sale">For Sale</SelectItem>
              <SelectItem value="for-rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch} className="w-full">
            <Search className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
            <span className="sm:hidden">Go</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Price</SelectItem>
              <SelectItem value="under-500k">Under $500k</SelectItem>
              <SelectItem value="500k-1m">$500k - $1M</SelectItem>
              <SelectItem value="1m-2m">$1M - $2M</SelectItem>
              <SelectItem value="over-2m">Over $2M</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 sm:mb-6">
        <p className="text-sm text-muted-foreground">
          Found {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"}
        </p>
      </div>

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-16">
          <p className="text-base sm:text-lg text-muted-foreground mb-4">
            No properties found matching your criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setTypeFilter("all");
              setStatusFilter("all");
              setPriceFilter("all");
              setFilteredProperties(properties);
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}

