
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

interface Owner {
  id: string;
  name: string;
  photo: string | null;
  occupation: string;
  joinedDate: string;
}

interface ListingSidebarProps {
  owner: Owner;
  location: string;
  onContactOwner: () => void;
}

export const ListingSidebar = ({ owner, location, onContactOwner }: ListingSidebarProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <div className="h-10 w-10 rounded-full bg-flatmate-soft-purple flex items-center justify-center">
              <span className="font-medium text-sm">
                {owner.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
          </Avatar>
          <div>
            <p className="font-medium">{owner.name}</p>
            <p className="text-sm text-gray-500">
              Member since {owner.joinedDate}
            </p>
          </div>
        </div>
        
        {owner.occupation && (
          <p className="text-sm mb-4">
            <span className="text-gray-500">Occupation:</span> {owner.occupation}
          </p>
        )}
        
        <Button onClick={onContactOwner} className="w-full">
          Contact
        </Button>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-medium mb-3">Location</h3>
        <div className="aspect-video bg-gray-200 rounded-md mb-2 flex items-center justify-center text-gray-400">
          Map Preview
        </div>
        <p className="text-gray-600 text-sm">{location}</p>
      </div>
    </div>
  );
};
