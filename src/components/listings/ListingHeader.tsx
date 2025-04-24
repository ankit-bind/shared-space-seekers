
import React from 'react';

interface ListingHeaderProps {
  title: string;
  location: string;
  rentAmount: number;
}

export const ListingHeader = ({ title, location, rentAmount }: ListingHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
      <div className="flex items-center gap-2 mt-2 text-gray-600">
        <span>{location}</span>
        <span>•</span>
        <span>${rentAmount}/month</span>
      </div>
    </div>
  );
};
