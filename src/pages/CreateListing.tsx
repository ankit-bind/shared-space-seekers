
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const CreateListing = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    neighborhood: "",
    rentAmount: "",
    availableFrom: "",
    genderPreference: "any",
    petFriendly: false,
    amenities: {
      wifi: false,
      privateBathroom: false,
      furnished: false,
      parking: false,
      laundry: false,
      airConditioning: false,
    },
    images: [] as File[],
  });
  
  const handleInputChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleAmenityChange = (key: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [key]: checked
      }
    }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Convert FileList to array and append to existing images
      const newImages = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5) // Limit to 5 images
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This would be implemented with Supabase in a real app
    try {
      console.log("Form data:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "Your listing has been created. Note that this is a demo and requires Supabase integration for actual functionality.",
      });
      
      // Reset form (in a real app, you might redirect to the new listing)
      setFormData({
        title: "",
        description: "",
        city: "",
        neighborhood: "",
        rentAmount: "",
        availableFrom: "",
        genderPreference: "any",
        petFriendly: false,
        amenities: {
          wifi: false,
          privateBathroom: false,
          furnished: false,
          parking: false,
          laundry: false,
          airConditioning: false,
        },
        images: [],
      });
    } catch (error) {
      console.error("Error creating listing:", error);
      toast({
        title: "Error",
        description: "Failed to create listing",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Create a New Listing</h1>
        <p className="text-gray-600 mt-1">Share details about your available room or property</p>
      </div>
      
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Listing Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Cozy Room in Downtown Apartment"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your space, rules, ideal roommate, etc."
                  className="h-32"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="e.g. New York"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="neighborhood">Neighborhood</Label>
                  <Input
                    id="neighborhood"
                    placeholder="e.g. Downtown"
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Listing Details</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rent">Monthly Rent ($)</Label>
                  <Input
                    id="rent"
                    type="number"
                    min="0"
                    placeholder="e.g. 800"
                    value={formData.rentAmount}
                    onChange={(e) => handleInputChange("rentAmount", e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="availableDate">Available From</Label>
                  <Input
                    id="availableDate"
                    type="date"
                    value={formData.availableFrom}
                    onChange={(e) => handleInputChange("availableFrom", e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Gender Preference</Label>
                  <Select
                    value={formData.genderPreference}
                    onValueChange={(value) => handleInputChange("genderPreference", value)}
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
                
                <div className="flex items-center space-x-2 h-full pt-8">
                  <Checkbox 
                    id="petFriendly" 
                    checked={formData.petFriendly}
                    onCheckedChange={(checked) => 
                      handleInputChange("petFriendly", checked === true)
                    }
                  />
                  <Label htmlFor="petFriendly">Pet Friendly</Label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Amenities */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="wifi" 
                  checked={formData.amenities.wifi}
                  onCheckedChange={(checked) => 
                    handleAmenityChange("wifi", checked === true)
                  }
                />
                <Label htmlFor="wifi">WiFi</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="privateBathroom" 
                  checked={formData.amenities.privateBathroom}
                  onCheckedChange={(checked) => 
                    handleAmenityChange("privateBathroom", checked === true)
                  }
                />
                <Label htmlFor="privateBathroom">Private Bathroom</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="furnished" 
                  checked={formData.amenities.furnished}
                  onCheckedChange={(checked) => 
                    handleAmenityChange("furnished", checked === true)
                  }
                />
                <Label htmlFor="furnished">Furnished</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="parking" 
                  checked={formData.amenities.parking}
                  onCheckedChange={(checked) => 
                    handleAmenityChange("parking", checked === true)
                  }
                />
                <Label htmlFor="parking">Parking</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="laundry" 
                  checked={formData.amenities.laundry}
                  onCheckedChange={(checked) => 
                    handleAmenityChange("laundry", checked === true)
                  }
                />
                <Label htmlFor="laundry">Laundry</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="airConditioning" 
                  checked={formData.amenities.airConditioning}
                  onCheckedChange={(checked) => 
                    handleAmenityChange("airConditioning", checked === true)
                  }
                />
                <Label htmlFor="airConditioning">Air Conditioning</Label>
              </div>
            </div>
          </div>
          
          {/* Photos */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Photos</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="photos">Upload Photos (max 5)</Label>
                <Input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Selected: {formData.images.length} / 5 photos
                </p>
              </div>
              
              {formData.images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <div className="h-20 w-20 border rounded-md overflow-hidden bg-gray-50">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Uploaded ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Listing"}
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Note: This is a demo. Actual functionality requires Supabase integration.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
