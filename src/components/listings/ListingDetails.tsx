
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ListingDetailsProps {
  description: string;
  availableFrom: string;
  rentAmount: number;
  preferences: {
    genderPreference: string;
    petFriendly: boolean;
    smoking: string;
  };
  createdAt: string;
  amenities: string[];
  formatDate: (date: string) => string;
}

export const ListingDetails = ({
  description,
  availableFrom,
  rentAmount,
  preferences,
  createdAt,
  amenities,
  formatDate
}: ListingDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">About this space</h2>
        <p className="text-gray-700 whitespace-pre-line">{description}</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Details</h2>
        
        <div className="grid grid-cols-2 gap-y-4">
          <div>
            <p className="text-gray-500 text-sm">Available From</p>
            <p className="font-medium">{formatDate(availableFrom)}</p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Monthly Rent</p>
            <p className="font-medium">${rentAmount}</p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Gender Preference</p>
            <p className="font-medium">{preferences.genderPreference}</p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Pet Friendly</p>
            <p className="font-medium">{preferences.petFriendly ? "Yes" : "No"}</p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Smoking</p>
            <p className="font-medium">{preferences.smoking}</p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Listed On</p>
            <p className="font-medium">{formatDate(createdAt)}</p>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <p className="text-gray-500 text-sm mb-2">Amenities</p>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity, index) => (
              <Badge key={index} variant="outline" className="bg-flatmate-soft-gray">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

