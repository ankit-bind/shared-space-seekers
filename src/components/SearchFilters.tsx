
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

interface SearchFiltersProps {
  onApplyFilters: (filters: any) => void;
}

export function SearchFilters({ onApplyFilters }: SearchFiltersProps) {
  const [filters, setFilters] = useState({
    location: "",
    minRent: 0,
    maxRent: 3000,
    genderPreference: "any",
    petFriendly: "any",
    availableFrom: "",
  });
  
  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleRentChange = (values: number[]) => {
    setFilters((prev) => ({
      ...prev,
      minRent: values[0],
      maxRent: values[1],
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      location: "",
      minRent: 0,
      maxRent: 3000,
      genderPreference: "any",
      petFriendly: "any",
      availableFrom: "",
    });
  };
  
  const applyFilters = () => {
    onApplyFilters(filters);
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-medium text-lg mb-4">Filter Listings</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, neighborhood..."
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Rent Range</Label>
            <span className="text-sm text-gray-500">
              ${filters.minRent} - ${filters.maxRent}
            </span>
          </div>
          <Slider
            defaultValue={[filters.minRent, filters.maxRent]}
            min={0}
            max={3000}
            step={50}
            onValueChange={handleRentChange}
            className="py-4"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gender">Gender Preference</Label>
          <Select
            value={filters.genderPreference}
            onValueChange={(value) => handleFilterChange("genderPreference", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pets">Pet Friendly</Label>
          <Select
            value={filters.petFriendly}
            onValueChange={(value) => handleFilterChange("petFriendly", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date">Available From</Label>
          <Input
            id="date"
            type="date"
            value={filters.availableFrom}
            onChange={(e) => handleFilterChange("availableFrom", e.target.value)}
          />
        </div>
        
        <Separator />
        
        <div className="flex flex-col space-y-2 pt-2">
          <Button onClick={applyFilters}>Apply Filters</Button>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;
