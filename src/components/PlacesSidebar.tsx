import React, { useState } from 'react';
import { Search, ChevronRight, X } from 'lucide-react';

interface PlacesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Continent {
  id: string;
  name: string;
  image: string;
  countries: {
    name: string;
    image: string;
    cities: {
      name: string;
      description: string;
      image: string;
      tags: string[];
    }[];
    recommendedPlaces: {
      name: string;
      description: string;
      image: string;
      tags: string[];
    }[];
  }[];
}

const continents: Continent[] = [
  {
    id: 'europe',
    name: 'Europe',
    image: 'https://images.pexels.com/photos/2570063/pexels-photo-2570063.jpeg',
    countries: [
      {
        name: 'France',
        image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
        recommendedPlaces: [
          {
            name: 'Paris',
            description: 'The City of Light, known for its iconic Eiffel Tower and world-class art museums.',
            image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
            tags: ['Culture', 'Art', 'Romance']
          },
          {
            name: 'Nice',
            description: 'Beautiful coastal city on the French Riviera with stunning beaches and promenades.',
            image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg',
            tags: ['Beach', 'Luxury', 'Mediterranean']
          }
        ],
        cities: [
          {
            name: 'Paris',
            description: 'The capital city of France, known for its art, culture, and iconic landmarks.',
            image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
            tags: ['Capital', 'Culture', 'Art']
          },
          {
            name: 'Lyon',
            description: 'A city known for its gastronomy and historical architecture.',
            image: 'https://images.pexels.com/photos/13599748/pexels-photo-13599748.jpeg',
            tags: ['Food', 'History', 'Culture']
          }
        ]
      },
      {
        name: 'Greece',
        image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
        recommendedPlaces: [
          {
            name: 'Santorini',
            description: 'Stunning island known for its white-washed buildings and sunset views.',
            image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
            tags: ['Island', 'Romance', 'Views']
          },
          {
            name: 'Athens',
            description: 'Ancient city with rich history and iconic archaeological sites.',
            image: 'https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg',
            tags: ['History', 'Ancient', 'Culture']
          }
        ],
        cities: [
          {
            name: 'Athens',
            description: 'The capital city with ancient ruins and vibrant modern culture.',
            image: 'https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg',
            tags: ['Capital', 'Ancient', 'History']
          },
          {
            name: 'Thessaloniki',
            description: 'Coastal city with rich Byzantine history and modern arts scene.',
            image: 'https://images.pexels.com/photos/1007681/pexels-photo-1007681.jpeg',
            tags: ['Coastal', 'History', 'Culture']
          }
        ]
      }
    ]
  },
  {
    id: 'asia',
    name: 'Asia',
    image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg',
    countries: [
      {
        name: 'Japan',
        image: 'https://images.pexels.com/photos/5169056/pexels-photo-5169056.jpeg',
        recommendedPlaces: [
          {
            name: 'Tokyo',
            description: 'Modern metropolis with a perfect blend of tradition and innovation.',
            image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
            tags: ['Modern', 'Culture', 'Technology']
          },
          {
            name: 'Kyoto',
            description: 'Traditional city with beautiful temples and gardens.',
            image: 'https://images.pexels.com/photos/5169056/pexels-photo-5169056.jpeg',
            tags: ['Traditional', 'Temples', 'Culture']
          }
        ],
        cities: [
          {
            name: 'Tokyo',
            description: 'Japan\'s bustling capital with cutting-edge technology and culture.',
            image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
            tags: ['Capital', 'Modern', 'Technology']
          },
          {
            name: 'Osaka',
            description: 'Known for its modern architecture and amazing street food.',
            image: 'https://images.pexels.com/photos/2341830/pexels-photo-2341830.jpeg',
            tags: ['Food', 'Modern', 'Urban']
          }
        ]
      }
    ]
  }
];

const PlacesSidebar: React.FC<PlacesSidebarProps> = ({ isOpen, onClose }) => {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`fixed inset-y-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}
    style={{ width: '800px' }}>
      {/* First Column - Continents */}
      <div className="w-20 border-r border-slate-200 bg-slate-50 flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center justify-center">
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-200 rounded-full transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {continents.map((continent) => (
            <button
              key={continent.id}
              onClick={() => {
                setSelectedContinent(selectedContinent === continent.id ? null : continent.id);
                setSelectedCountry(null);
              }}
              className={`w-full py-4 flex items-center justify-center hover:bg-slate-100 transition-colors ${
                selectedContinent === continent.id ? 'bg-slate-200' : ''
              }`}
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={continent.image}
                  alt={continent.name}
                  className="w-full h-full object-cover"
                />
                {selectedContinent === continent.id && (
                  <ChevronRight size={16} className="absolute bottom-0 right-0 text-white bg-black/50 rounded-full p-1" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Second Column - Countries */}
      {selectedContinent && (
        <div className="w-64 border-r border-slate-200 bg-white flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-medium text-slate-800">Countries in {continents.find(c => c.id === selectedContinent)?.name}</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {continents
              .find(c => c.id === selectedContinent)?.countries
              .map((country) => (
                <button
                  key={country.name}
                  onClick={() => setSelectedCountry(selectedCountry === country.name ? null : country.name)}
                  className={`w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors ${
                    selectedCountry === country.name ? 'bg-slate-100' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">{country.name}</span>
                    {selectedCountry === country.name && (
                      <ChevronRight size={16} className="text-slate-500" />
                    )}
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Third Column - Content Area */}
      <div className="flex-1 bg-slate-50 flex flex-col">
        {selectedContinent && (
          <div className="p-4 border-b border-slate-200">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search places..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto p-4">
          {selectedCountry ? (
            // Show cities when a country is selected
            <div className="grid gap-4">
              {continents
                .find(c => c.id === selectedContinent)
                ?.countries.find(c => c.name === selectedCountry)
                ?.cities.filter(city => 
                  city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  city.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((city, index) => (
                  <div key={index} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={city.image} 
                        alt={city.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="font-medium text-white text-lg">{city.name}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-slate-600 mb-3">{city.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {city.tags.map((tag, i) => (
                          <span key={i} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : selectedContinent ? (
            // Show recommended places when only continent is selected
            <div className="grid gap-4">
              <h3 className="font-medium text-slate-800 mb-2">Recommended Places</h3>
              {continents
                .find(c => c.id === selectedContinent)
                ?.countries.flatMap(country => country.recommendedPlaces)
                .filter(place => 
                  place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  place.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((place, index) => (
                  <div key={index} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={place.image} 
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="font-medium text-white text-lg">{place.name}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-slate-600 mb-3">{place.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {place.tags.map((tag, i) => (
                          <span key={i} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            // Show empty state when nothing is selected
            <div className="text-center p-6">
              <h3 className="text-lg font-medium text-slate-500">Select a continent</h3>
              <p className="text-slate-400 mt-1">Choose a continent to explore places</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacesSidebar;