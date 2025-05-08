import { Bath, Bed, Heart, House, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const CardCompact = ({ isFavorite, onFavoriteToggle, property, propertyLink, showFavoriteButton }: CardCompactProps) => {
  const [imgSrc, setImgSrc] = useState(property.photoUrls?.[0] || "/placeholder.jpg");

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg w-full mb-5 h-40 flex">
      <div className="relative w-1/3">
        <Image
          src={imgSrc}
          alt={property.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgSrc("/placeholder.jpg")}
          priority
        />
        <div className="absolute bottom-2 left-2 flex gap-1">
          {property.isPetsAllowed && (
            <span className="bg-white/80 text-black text-xs font-semibold px-2 py-1 rounded-full">Pets</span>
          )}
          {property.isParkingIncluded && (
            <span className="bg-white/80 text-black text-xs font-semibold px-2 py-1 rounded-full">Parking</span>
          )}
        </div>
      </div>

      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-bold mb-1">
              {propertyLink ? (
                <Link
                  href={propertyLink}
                  className="hover:underline hover:text-blue-600"
                  scroll={false}
                >
                  {property.name}
                </Link>
              ) : (
                property.name
              )}
            </h2>
            {showFavoriteButton && (
              <button
                className="bg-white rounded-full p-1"
                onClick={onFavoriteToggle}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={`w-4 h-4 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"}`}
                />
              </button>
            )}
          </div>
          <p className="text-gray-600 mb-1 text-sm truncate">
            {property?.location?.address}, {property?.location?.city}
          </p>
          <div className="flex text-sm items-center">
            <Star className="w-3 h-3 text-yellow-400 mr-1" />
            <span className="font-semibold">
              {property.averageRating ? property.averageRating.toFixed(1) : "N/A"}
            </span>
            <span className="text-gray-600 ml-1">
              ({property.numberOfReviews || 0})
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex gap-2 text-gray-600">
            <span className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.beds}
            </span>
            <span className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {property.baths}
            </span>
            <span className="flex items-center">
              <House className="w-4 h-4 mr-1" />
              {property.squareFeet}
            </span>
          </div>
          <p className="text-base font-bold">
            ${property.pricePerMonth.toFixed(0)}
            <span className="text-gray-600 text-base font-normal"> /mo</span>
          </p>
        </div>
      </div>
    </div>
  );
};
