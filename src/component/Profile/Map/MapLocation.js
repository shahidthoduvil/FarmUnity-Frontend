import React from 'react';
import mapUrl from '../../../images/map.jpg';

const MapLocation = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
    <img src={mapUrl} alt="Location Map" className="w-full" />
    <div className="px-6 py-4">
      <h2 className="font-bold text-xl mb-2">Location</h2>
      <p className="text-gray-700">
        Latitude: , Longitude: 
      </p>
    </div>
  </div>
  );
};

export default MapLocation;
