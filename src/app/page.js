"use client";

import React, { useState, useEffect } from "react";
import Pexels from "@/components/Pexels";

const Page = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("nature");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Access_key = "s3wQtyteyPmFizQDLrTmy561noQjtONcyVzeSiVd8qw";

  const fetchPhotos = async (searchQuery) => {
    setLoading(true);
    try {
      const request = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=30`,
        {
          headers: {
            Authorization: `Client-ID ${Access_key}`,
          },
        }
      );

      if (!request.ok) {
        throw new Error(`Error fetching photos: ${request.status}`);
      }

      const data = await request.json();
      setPhotos(data.results);
      setError(null);
    } catch (err) {
      console.error("Error fetching photos:", err);
      setError("Failed to load photos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search from the Pexels component
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    fetchPhotos(newQuery);
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchPhotos(query);
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-800 mb-2">Oops!</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => fetchPhotos(query)}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {loading && photos.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#53FFF7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading amazing photos...</p>
          </div>
        </div>
      ) : (
        <Pexels photos={photos} onSearch={handleSearch} />
      )}
    </div>
  );
};

export default Page;
