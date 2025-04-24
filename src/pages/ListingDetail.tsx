
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

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
    // In a real app, this would redirect to the messages page with this conversation
    toast({
      title: "Message Sent!",
      description: "This is a demo. Actual messaging requires Supabase integration.",
    });
  };
  
  // Current selected image
  const [selectedImage, setSelectedImage] = useState(listing.images[0]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Listing Title & Meta */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">{listing.title}</h1>
        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <span>{listing.location}</span>
          <span>•</span>
          <span>${listing.rentAmount}/month</span>
        </div>
      </div>
      
      {/* Image Gallery */}
      <div className="mb-8">
        <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 mb-2">
          <img 
            src={selectedImage} 
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {listing.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {listing.images.map((image, index) => (
              <button 
                key={index} 
                onClick={() => setSelectedImage(image)}
                className={`h-16 w-24 flex-shrink-0 rounded-md overflow-hidden ${
                  selectedImage === image ? "ring-2 ring-primary" : ""
                }`}
              >
                <img 
                  src={image} 
                  alt={`View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">About this space</h2>
            <p className="text-gray-700 whitespace-pre-line">{listing.description}</p>
          </div>
          
          {/* Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-gray-500 text-sm">Available From</p>
                <p className="font-medium">{formatDate(listing.availableFrom)}</p>
              </div>
              
              <div>
                <p className="text-gray-500 text-sm">Monthly Rent</p>
                <p className="font-medium">${listing.rentAmount}</p>
              </div>
              
              <div>
                <p className="text-gray-500 text-sm">Gender Preference</p>
                <p className="font-medium">{listing.preferences.genderPreference}</p>
              </div>
              
              <div>
                <p className="text-gray-500 text-sm">Pet Friendly</p>
                <p className="font-medium">{listing.preferences.petFriendly ? "Yes" : "No"}</p>
              </div>
              
              <div>
                <p className="text-gray-500 text-sm">Smoking</p>
                <p className="font-medium">{listing.preferences.smoking}</p>
              </div>
              
              <div>
                <p className="text-gray-500 text-sm">Listed On</p>
                <p className="font-medium">{formatDate(listing.createdAt)}</p>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <p className="text-gray-500 text-sm mb-2">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {listing.amenities.map((amenity, index) => (
                  <Badge key={index} variant="outline" className="bg-flatmate-soft-gray">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Owner Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <div className="h-10 w-10 rounded-full bg-flatmate-soft-purple flex items-center justify-center">
                  <span className="font-medium text-sm">
                    {listing.owner.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
              </Avatar>
              <div>
                <p className="font-medium">{listing.owner.name}</p>
                <p className="text-sm text-gray-500">
                  Member since {listing.owner.joinedDate}
                </p>
              </div>
            </div>
            
            {listing.owner.occupation && (
              <p className="text-sm mb-4">
                <span className="text-gray-500">Occupation:</span> {listing.owner.occupation}
              </p>
            )}
            
            <Button onClick={handleContactOwner} className="w-full">
              Contact
            </Button>
          </div>
          
          {/* Location Preview */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-medium mb-3">Location</h3>
            <div className="aspect-video bg-gray-200 rounded-md mb-2 flex items-center justify-center text-gray-400">
              Map Preview
            </div>
            <p className="text-gray-600 text-sm">{listing.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
