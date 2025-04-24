
import { useState } from "react";
import { SearchFilters } from "@/components/SearchFilters";
import { ListingsGrid } from "@/components/ListingsGrid";
import { ListingProps } from "@/components/ListingCard";

const Listings = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data - this would be fetched from Supabase in a real app
  const allListings: ListingProps[] = [
    {
      id: "1",
      title: "Sunny Room in Downtown Apartment",
      location: "Downtown, New York",
      rentAmount: 850,
      availableFrom: "2025-05-15",
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"],
      amenities: ["Private Bath", "WiFi", "Furnished"],
      createdAt: "2025-04-01",
    },
    {
      id: "2",
      title: "Cozy Room in Shared House",
      location: "Brooklyn, New York",
      rentAmount: 700,
      availableFrom: "2025-05-01",
      images: ["https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"],
      amenities: ["Shared Bath", "WiFi", "Kitchen Access"],
      createdAt: "2025-04-05",
    },
    {
      id: "3",
      title: "Modern Studio Apartment",
      location: "Manhattan, New York",
      rentAmount: 1200,
      availableFrom: "2025-06-01",
      images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"],
      amenities: ["Private Bath", "WiFi", "Fully Furnished", "Gym Access"],
      createdAt: "2025-04-10",
    },
    {
      id: "4",
      title: "Spacious Room in Queens",
      location: "Queens, New York",
      rentAmount: 750,
      availableFrom: "2025-05-20",
      images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"],
      amenities: ["Shared Bath", "WiFi", "Parking", "Backyard"],
      createdAt: "2025-04-07",
    },
    {
      id: "5",
      title: "Loft in Trendy Neighborhood",
      location: "Williamsburg, Brooklyn",
      rentAmount: 1100,
      availableFrom: "2025-06-15",
      images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2057&q=80"],
      amenities: ["Private Bath", "WiFi", "Rooftop Access", "Dishwasher"],
      createdAt: "2025-04-12",
    },
    {
      id: "6",
      title: "Room in Quiet Neighborhood",
      location: "Park Slope, Brooklyn",
      rentAmount: 950,
      availableFrom: "2025-05-25",
      images: ["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"],
      amenities: ["Shared Bath", "WiFi", "Laundry", "Close to Park"],
      createdAt: "2025-04-14",
    }
  ];
  
  const [filteredListings, setFilteredListings] = useState(allListings);
  
  // Filter handler - in a real app, this would query Supabase
  const handleApplyFilters = (filters: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = allListings.filter(listing => {
        // Filter by location
        if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
        
        // Filter by rent range
        if (listing.rentAmount < filters.minRent || listing.rentAmount > filters.maxRent) {
          return false;
        }
        
        // Filter by available date
        if (filters.availableFrom && new Date(listing.availableFrom) < new Date(filters.availableFrom)) {
          return false;
        }
        
        // Additional filters would be applied here
        return true;
      });
      
      setFilteredListings(filtered);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Browse Listings</h1>
        <p className="text-gray-600 mt-1">Find the perfect room or roommate</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <SearchFilters onApplyFilters={handleApplyFilters} />
        </div>
        
        {/* Listings grid */}
        <div className="flex-1">
          <ListingsGrid 
            listings={filteredListings}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Listings;
