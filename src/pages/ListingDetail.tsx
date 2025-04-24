
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ListingHeader } from "@/components/listings/ListingHeader";
import { ListingGallery } from "@/components/listings/ListingGallery";
import { ListingDetails } from "@/components/listings/ListingDetails";
import { ListingSidebar } from "@/components/listings/ListingSidebar";

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // In a real app, this would fetch the listing from Supabase
  // Mock listing data
  const listing = {
    id: id || "1",
    title: "Sunny Room in Downtown Apartment",
    description: "A beautiful, sun-filled room available in a spacious 2-bedroom apartment in the heart of downtown. The room comes furnished with a bed, desk, and closet. You'll be sharing the bathroom, kitchen, and living room with one other roommate who works in tech and travels frequently. The apartment is located on the 5th floor with elevator access, close to public transportation, restaurants, and shops. Utilities and internet included in the rent. Looking for a clean, respectful professional or student.",
    location: "Downtown, New York",
    rentAmount: 850,
    availableFrom: "2025-05-15",
    createdAt: "2025-04-01",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    ],
    amenities: ["Private Room", "Shared Bath", "WiFi", "Furnished", "Kitchen Access", "Laundry"],
    preferences: {
      genderPreference: "Any",
      petFriendly: true,
      smoking: "No smoking",
    },
    owner: {
      id: "user1",
      name: "Alex Smith",
      photo: null,
      occupation: "Software Engineer",
      joinedDate: "2024-12",
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const handleContactOwner = () => {
    toast({
      title: "Message Sent!",
      description: "This is a demo. Actual messaging requires Supabase integration.",
    });
  };
  
  // Current selected image
  const [selectedImage, setSelectedImage] = useState(listing.images[0]);

  return (
    <div className="max-w-4xl mx-auto">
      <ListingHeader 
        title={listing.title}
        location={listing.location}
        rentAmount={listing.rentAmount}
      />
      
      <ListingGallery 
        images={listing.images}
        title={listing.title}
        selectedImage={selectedImage}
        onImageSelect={setSelectedImage}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ListingDetails 
            description={listing.description}
            availableFrom={listing.availableFrom}
            rentAmount={listing.rentAmount}
            preferences={listing.preferences}
            createdAt={listing.createdAt}
            amenities={listing.amenities}
            formatDate={formatDate}
          />
        </div>
        
        <ListingSidebar 
          owner={listing.owner}
          location={listing.location}
          onContactOwner={handleContactOwner}
        />
      </div>
    </div>
  );
};

export default ListingDetail;

