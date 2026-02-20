import { Station } from '../types';

// In a real app, this logic lives on your Node/Python backend. 
// The frontend just passes the map bounds (NorthEast / SouthWest coordinates).
export async function fetchStationsInBounds(
  center: { lat: number; lng: number }, 
  isUncharted: boolean
): Promise<Station[]> {
  
  // If the area already has stations in our DB, we would just return them.
  if (!isUncharted) {
    return []; // Handled by standard mock data for now
  }

  // SIMULATION: If area is uncharted, backend calls Google Places API
  // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=lat,lng&radius=5000&type=gas_station
  
  // We mock the response from Google Places API
  const mockGooglePlacesResponse = [
    { name: "Station Shell", lat: center.lat + 0.005, lng: center.lng + 0.005, vicinity: "Route Nationale" },
    { name: "Afriquia Station", lat: center.lat - 0.008, lng: center.lng + 0.002, vicinity: "Avenue Mohammed V" },
    { name: "Winxo", lat: center.lat + 0.002, lng: center.lng - 0.007, vicinity: "Quartier Industriel" }
  ];

  // Backend parses Google data and turns them into "Ghost Stations" in our DB
  const ghostStations: Station[] = mockGooglePlacesResponse.map((place, index) => {
    
    // Smart Brand Guessing based on Google Map Name
    let brand: Station['brand'] = 'Other';
    if (place.name.toLowerCase().includes('shell')) brand = 'Shell';
    if (place.name.toLowerCase().includes('afriquia')) brand = 'Afriquia';
    if (place.name.toLowerCase().includes('total')) brand = 'TotalEnergies';
    if (place.name.toLowerCase().includes('winxo')) brand = 'Winxo';

    return {
      id: `ghost-${index}-${Date.now()}`,
      name: place.name,
      brand: brand,
      location: { lat: place.lat, lng: place.lng, address: place.vicinity, city: "Unknown" },
      prices: {}, // NO PRICES YET!
      lastUpdated: 'Never',
      lastUpdatedTimestamp: 0,
      distance: 'Unknown',
      amenities: [],
      status: 'Open',
      trustScore: 0,
      isGhost: true // Flags it as a Google Import needing user verification
    };
  });

  return ghostStations;
}