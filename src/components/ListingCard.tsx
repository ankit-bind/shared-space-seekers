
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface ListingProps {
  id: string;
  title: string;
  location: string;
  rentAmount: number;
  availableFrom: string;
  images: string[];
  amenities: string[];
  createdAt: string;
}

export function ListingCard({ 
  id, 
  title, 
  location, 
  rentAmount, 
  availableFrom, 
  images, 
  amenities 
}: ListingProps) {
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Default image if none provided
  const imageUrl = images && images.length > 0 
    ? images[0] 
    : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60';

  return (
    <Link to={`/listings/${id}`} className="block">
      <div className="listing-card h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge className="bg-white text-black font-medium">
              ${rentAmount}/month
            </Badge>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <p className="text-gray-600 text-sm mb-2">{location}</p>
          
          <div className="mt-auto">
            <div className="flex flex-wrap gap-1 mb-3">
              {amenities && amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="outline" className="bg-flatmate-soft-gray">
                  {amenity}
                </Badge>
              ))}
              {amenities && amenities.length > 3 && (
                <Badge variant="outline" className="bg-flatmate-soft-gray">
                  +{amenities.length - 3} more
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-gray-500">
              Available from {formatDate(availableFrom)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;
