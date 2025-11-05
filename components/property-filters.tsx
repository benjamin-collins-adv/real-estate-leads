"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface PropertyFiltersProps {
  initialFilters?: {
    type?: string;
    status?: string;
    price?: string;
    bedrooms?: string;
    bathrooms?: string;
    search?: string;
    city?: string;
    state?: string;
  };
}

export function PropertyFilters({ initialFilters }: PropertyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize from URL params
  const [searchQuery, setSearchQuery] = useState(initialFilters?.search || searchParams.get("search") || "");
  const [typeFilter, setTypeFilter] = useState(initialFilters?.type || searchParams.get("type") || "all");
  const [statusFilter, setStatusFilter] = useState(initialFilters?.status || searchParams.get("status") || "all");
  const [priceFilter, setPriceFilter] = useState(initialFilters?.price || searchParams.get("price") || "all");
  const [bedroomsFilter, setBedroomsFilter] = useState(initialFilters?.bedrooms || searchParams.get("bedrooms") || "all");
  const [bathroomsFilter, setBathroomsFilter] = useState(initialFilters?.bathrooms || searchParams.get("bathrooms") || "all");
  
  // Update state when URL params change
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
    setTypeFilter(searchParams.get("type") || "all");
    setStatusFilter(searchParams.get("status") || "all");
    setPriceFilter(searchParams.get("price") || "all");
    setBedroomsFilter(searchParams.get("bedrooms") || "all");
    setBathroomsFilter(searchParams.get("bathrooms") || "all");
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set("search", searchQuery);
    if (typeFilter !== "all") params.set("type", typeFilter);
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (priceFilter !== "all") params.set("price", priceFilter);
    if (bedroomsFilter !== "all") params.set("bedrooms", bedroomsFilter);
    if (bathroomsFilter !== "all") params.set("bathrooms", bathroomsFilter);

    router.push(`/properties?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setStatusFilter("all");
    setPriceFilter("all");
    setBedroomsFilter("all");
    setBathroomsFilter("all");
    router.push("/properties");
  };

  const hasActiveFilters = 
    searchQuery || 
    typeFilter !== "all" || 
    statusFilter !== "all" || 
    priceFilter !== "all" ||
    bedroomsFilter !== "all" ||
    bathroomsFilter !== "all";

  return (
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
            <SelectItem value="land">Land</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
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
            <SelectItem value="sold">Sold</SelectItem>
            <SelectItem value="rented">Rented</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
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
        <Select value={bedroomsFilter} onValueChange={setBedroomsFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Bedrooms</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
            <SelectItem value="5">5+</SelectItem>
          </SelectContent>
        </Select>
        <Select value={bathroomsFilter} onValueChange={setBathroomsFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Bathrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Bathrooms</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
        {hasActiveFilters && (
          <Button variant="outline" onClick={handleClear} className="w-full">
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}

