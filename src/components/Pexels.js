import React, { useState } from "react";
import { Download, Heart, Search, Camera, User, Menu } from "lucide-react";

const Pexels = ({ photos, onSearch }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLike = (id) => {
    setLikedPhotos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDownload = (url, filename) => {
    // In a real app, you would handle proper download functionality
    // This is a simplified version
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "photo";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const heroBackgroundImage =
    photos && photos.length > 0 ? photos[0].urls.regular : "";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Camera className="h-8 w-8 text-[#53FFF7]" />
                <span className="ml-2 text-xl font-bold text-gray-800">
                  PexelClone
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  href="#"
                  className="border-[#53FFF7] text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Explore
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Collections
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button className="bg-[#53FFF7] p-1 rounded-full text-white hover:bg-[#53FFF7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#53FFF7]">
                <User className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#53FFF7]"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="bg-[#3faaa5] border-[#53FFF7] text-[#00eadf] block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Explore
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Collections
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero search section with dynamic background */}
      <div
        className="relative pt-16 pb-32 flex content-center items-center justify-center h-96"
        style={{
          backgroundImage: `url(${heroBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full px-4 ml-auto mr-auto text-center">
              <div className="max-w-md mx-auto">
                <h1 className="text-white font-semibold text-4xl mb-6">
                  The best free stock photos & videos
                </h1>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    className="w-full py-3 px-4 pl-12 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#53FFF7]"
                    placeholder="Search for free photos"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bg-[#53FFF7] text-white px-4 py-1 rounded-md hover:bg-[#6cede7] transition-colors"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={photo.urls.regular}
                alt={photo.alt_description || "Unsplash photo"}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
              />

              {/* Photo details */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 text-white transform transition-transform duration-300"
                style={{
                  transform:
                    hoveredId === photo.id
                      ? "translateY(0)"
                      : "translateY(100%)",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold truncate">
                    {photo.alt_description || "Untitled"}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleLike(photo.id)}
                      className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                    >
                      <Heart
                        size={20}
                        fill={likedPhotos[photo.id] ? "red" : "none"}
                        color={likedPhotos[photo.id] ? "red" : "white"}
                      />
                    </button>
                    <button
                      onClick={() =>
                        handleDownload(photo.urls.full, photo.alt_description)
                      }
                      className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                    >
                      <Download size={20} color="white" />
                    </button>
                  </div>
                </div>

                {/* Photographer info */}
                <div className="flex items-center mt-2">
                  {photo.user?.profile_image?.medium && (
                    <img
                      src={photo.user.profile_image.medium}
                      alt={photo.user.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <span className="text-sm opacity-90">
                    {photo.user?.name || "Unknown photographer"}
                  </span>
                </div>
              </div>

              {/* Likes count */}
              <div className="absolute top-2 right-2 bg-black bg-opacity-60 px-2 py-1 rounded-full text-white text-xs flex items-center">
                <Heart size={12} className="mr-1" />
                {photo.likes || 0}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pexels;
