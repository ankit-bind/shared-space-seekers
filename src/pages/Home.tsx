
import { Button } from "@/components/ui/button";
import { ListingsGrid } from "@/components/ListingsGrid";
import { Link } from "react-router-dom";
import { ListingProps } from "@/components/ListingCard";

const Home = () => {
  // Mock featured listings
  const featuredListings: ListingProps[] = [
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
    }
  ];

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl">
        <div className="gradient-bg py-16 px-8 md:py-20 md:px-12 rounded-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Find Your Perfect Roommate Today
            </h1>
            <p className="text-lg mb-8 text-gray-800">
              Connect with compatible roommates and find your ideal shared living space
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link to="/listings">Browse Listings</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link to="/create-listing">Create a Listing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">How It Works</h2>
          <p className="text-gray-600 mt-2">Find your ideal roommate in 3 easy steps</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-flatmate-soft-yellow p-6 rounded-xl text-center">
            <div className="bg-amber-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
              <span className="font-bold text-xl">1</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Create Your Profile</h3>
            <p className="text-gray-600">Tell potential roommates about yourself and your preferences.</p>
          </div>
          
          <div className="bg-flatmate-soft-blue p-6 rounded-xl text-center">
            <div className="bg-blue-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
              <span className="font-bold text-xl">2</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Browse Listings</h3>
            <p className="text-gray-600">Find rooms or roommates that match your criteria and budget.</p>
          </div>
          
          <div className="bg-flatmate-soft-green p-6 rounded-xl text-center">
            <div className="bg-green-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
              <span className="font-bold text-xl">3</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Connect & Move In</h3>
            <p className="text-gray-600">Message potential roommates and find your perfect match.</p>
          </div>
        </div>
      </section>
      
      {/* Featured Listings */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Featured Listings</h2>
            <p className="text-gray-600 mt-1">Check out some of our top room listings</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/listings">View all</Link>
          </Button>
        </div>
        
        <ListingsGrid listings={featuredListings} />
      </section>
      
      {/* CTA Section */}
      <section className="bg-flatmate-soft-purple p-8 md:p-10 rounded-xl text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Ready to find your perfect roommate?
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Join thousands of people who've found their ideal living situation through Flatmate Finder.
        </p>
        <Button asChild size="lg" className="text-lg">
          <Link to="/auth">Get Started</Link>
        </Button>
      </section>
    </div>
  );
};

export default Home;
