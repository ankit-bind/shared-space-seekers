
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
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock profile data - would come from Supabase in a real app
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    occupation: "Software Engineer",
    bio: "I'm a tidy and respectful professional looking for a quiet place to live. I enjoy cooking and hiking on weekends.",
    profilePhotoUrl: "",
    preferences: {
      budgetMin: "500",
      budgetMax: "1000",
      preferredLocation: "Downtown",
      genderPreference: "any",
      lifestyle: "professional",
      petFriendly: true,
    }
  });
  
  const handleProfileChange = (key: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handlePreferenceChange = (key: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };
  
  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to Supabase Storage
      // For demo, just set a local URL
      setProfile((prev) => ({
        ...prev,
        profilePhotoUrl: URL.createObjectURL(file)
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, you'd update the profile in Supabase
    try {
      console.log("Updated profile:", profile);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Your Profile</h1>
        <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
      </div>
      
      <Tabs defaultValue="personalInfo">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personalInfo">Personal Information</TabsTrigger>
          <TabsTrigger value="preferences">Room Preferences</TabsTrigger>
        </TabsList>
        
        {/* Personal Information Tab */}
        <TabsContent value="personalInfo">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {profile.profilePhotoUrl ? (
                        <img
                          src={profile.profilePhotoUrl}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl text-gray-400">👤</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="profilePhoto">Profile Photo</Label>
                    <Input
                      id="profilePhoto"
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoUpload}
                    />
                    <p className="text-xs text-gray-500">
                      Recommended: Square image, at least 300x300px
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                {/* Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => handleProfileChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => handleProfileChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="e.g. Software Engineer"
                    value={profile.occupation}
                    onChange={(e) => handleProfileChange("occupation", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="bio">About Me</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell others about yourself, your lifestyle, and what you're looking for"
                    className="h-32"
                    value={profile.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                  />
                </div>
                
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
        
        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Budget Range</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budgetMin">Minimum ($)</Label>
                      <Input
                        id="budgetMin"
                        type="number"
                        min="0"
                        value={profile.preferences.budgetMin}
                        onChange={(e) => handlePreferenceChange("budgetMin", e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="budgetMax">Maximum ($)</Label>
                      <Input
                        id="budgetMax"
                        type="number"
                        min="0"
                        value={profile.preferences.budgetMax}
                        onChange={(e) => handlePreferenceChange("budgetMax", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="preferredLocation">Preferred Location</Label>
                  <Input
                    id="preferredLocation"
                    placeholder="e.g. Downtown, Near University"
                    value={profile.preferences.preferredLocation}
                    onChange={(e) => handlePreferenceChange("preferredLocation", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="genderPreference">Gender Preference</Label>
                  <Select
                    value={profile.preferences.genderPreference}
                    onValueChange={(value) => handlePreferenceChange("genderPreference", value)}
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
                
                <div>
                  <Label htmlFor="lifestyle">Lifestyle</Label>
                  <Select
                    value={profile.preferences.lifestyle}
                    onValueChange={(value) => handlePreferenceChange("lifestyle", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="social">Social/Outgoing</SelectItem>
                      <SelectItem value="quiet">Quiet/Private</SelectItem>
                      <SelectItem value="family">Family-oriented</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="petFriendly"
                    checked={profile.preferences.petFriendly}
                    onChange={(e) => handlePreferenceChange("petFriendly", e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="petFriendly">Pet Friendly</Label>
                </div>
                
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Preferences"}
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
