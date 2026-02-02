import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Navigation, QrCode } from 'lucide-react'; 
import Button from '../../components/ui/Button'; 

// --- MAP IMPORTS ---
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- FIX LEAFLET ICONS (Standard React Leaflet Bug Fix) ---
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41], 
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- SUB-COMPONENT: CLICK TO MOVE MARKER ---
function LocationMarker({ position, setPosition, setAddress }) {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            // Simulate fetching address from coordinates
            setAddress(`Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

export default function SelectLocation() {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Default Position (New York City) - Change this to your preferred default
  const [position, setPosition] = useState({ lat: 40.7128, lng: -74.0060 });

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        navigate('/dashboard'); 
    }, 1000);
  };

  return (
    <div className="w-full h-full">
        
        {/* ============================================================
            MOBILE LAYOUT (Unchanged)
        ============================================================ */}
        <div className="md:hidden w-full h-full flex flex-col p-6">
            <div className="flex justify-between items-center mb-10"><div /></div>

            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                    Set your locations <span className="text-red-500 text-lg">📍</span>
                </h2>
            </div>

            <div className="flex flex-col gap-6 flex-1">
                <button 
                    onClick={() => console.log("Open QR Scanner")}
                    className="flex flex-col items-center justify-center p-8 bg-white dark:bg-[var(--neutral-800)] rounded-3xl shadow-sm text-center space-y-4 hover:shadow-md transition-shadow"
                >
                    <QrCode size={48} className="text-purple-900 opacity-60" />
                    <div>
                        <h3 className="font-bold text-lg mb-2">Scan QR Code</h3>
                        <p className="text-sm text-gray-500 leading-relaxed px-4">
                            Choose the simply way, scan your QR Code from our table
                        </p>
                    </div>
                </button>

                <button 
                    onClick={() => console.log("Show Manual Input")} 
                    className="flex flex-col items-center justify-center p-8 bg-white dark:bg-[var(--neutral-800)] rounded-3xl shadow-sm text-center space-y-4 hover:shadow-md transition-shadow"
                >
                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                        <MapPin size={32} className="text-red-500 fill-current" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Select location manually</h3>
                        <p className="text-sm text-gray-500 leading-relaxed px-4">
                            If you prefer to add your location manually, here is your option
                        </p>
                    </div>
                </button>
            </div>
            
            <div className="mt-auto pt-8 flex justify-center">
                <div className="w-1/3 h-1 bg-gray-200 rounded-full"></div>
            </div>
        </div>


        {/* ============================================================
            DESKTOP LAYOUT (Now with Real Map)
        ============================================================ */}
        <div className="hidden md:flex flex-col items-center justify-center h-full p-6">
            
            <div className="max-w-xl w-full text-center space-y-3 mb-8">
                <h2 className="text-3xl font-bold font-heading">
                    Start the Smart Menu Experience
                </h2>
                <p className="text-gray-500">
                    Please enter your location or use your current location and enjoy the custom experience in any of your restaurants.
                </p>
            </div>

            <div className="max-w-xl w-full p-6 rounded-3xl bg-white dark:bg-[var(--neutral-800)] shadow-lg border border-gray-100 dark:border-[var(--neutral-700)]">
                
                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search for streets, cities, districts..." 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-[var(--neutral-600)] bg-transparent outline-none focus:border-[var(--primary-600)] transition-all"
                    />
                </div>

                {/* --- REAL MAP IMPLEMENTATION --- */}
                <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden mb-6 border border-gray-100 dark:border-[var(--neutral-700)] z-0">
                    <MapContainer 
                        center={position} 
                        zoom={13} 
                        scrollWheelZoom={false} 
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* The interactive marker component */}
                        <LocationMarker 
                            position={position} 
                            setPosition={setPosition} 
                            setAddress={setAddress}
                        />
                    </MapContainer>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                    <button type="button" className="flex items-center gap-2 text-[var(--primary-600)] hover:underline font-medium transition-colors">
                        <Navigation className="w-4 h-4" />
                        <span>Use my current location</span>
                    </button>
                    
                    <span className="hidden sm:inline text-gray-300">|</span>

                    <button type="button" className="flex items-center gap-2 text-gray-500 hover:text-[var(--primary-600)] font-medium transition-colors">
                        <MapPin className="w-4 h-4" />
                        <span>Set my location on map</span>
                    </button>
                </div>
            </div>

            <div className="max-w-xl w-full mt-8">
                <Button onClick={handleConfirm} disabled={isLoading} className="w-full py-4 rounded-xl font-bold shadow-lg shadow-purple-500/20">
                    {isLoading ? 'Setting Location...' : 'Confirm Location'}
                </Button>
            </div>

        </div>
    </div>
  );
}