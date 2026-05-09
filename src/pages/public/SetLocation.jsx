import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Navigation, QrCode } from 'lucide-react';
import Button from '../../components/ui/Button';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ position, setPosition, setAddress }) {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
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
    const [position, setPosition] = useState({ lat: 40.7128, lng: -74.0060 });

    const handleConfirm = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 1000);
    };

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                setPosition(newPos);
                setAddress(`Lat: ${newPos.lat.toFixed(4)}, Lng: ${newPos.lng.toFixed(4)}`);
            });
        }
    };

    return (
        <div className="w-full h-full bg-[var(--bg-primary)]">
            <div className="md:hidden w-full h-full flex flex-col p-6">
                <div className="flex justify-between items-center mb-10"><div /></div>
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold flex items-center justify-center gap-2 text-[var(--text-primary)]">
                        Set your locations <span className="text-[var(--tertiary-700)] text-lg">📍</span>
                    </h2>
                </div>
                <div className="flex flex-col gap-6 flex-1">
                    <button
                        onClick={() => console.log("Open QR Scanner")}
                        className="flex flex-col items-center justify-center p-8 bg-[var(--bg-secondary)] rounded-3xl shadow-sm text-center space-y-4 hover:shadow-md transition-shadow border border-[var(--border-color)]"
                    >
                        <QrCode size={48} className="text-[var(--primary-600)] opacity-60" />
                        <div>
                            <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">Scan QR Code</h3>
                            <p className="text-sm text-[var(--neutral-500)] leading-relaxed px-4">
                                Choose the simply way, scan your QR Code from our table
                            </p>
                        </div>
                    </button>
                    <button
                        onClick={() => console.log("Manual trigger")}
                        className="flex flex-col items-center justify-center p-8 bg-[var(--bg-secondary)] rounded-3xl shadow-sm text-center space-y-4 hover:shadow-md transition-shadow border border-[var(--border-color)]"
                    >
                        <div className="w-12 h-12 bg-[var(--tertiary-100)] dark:bg-[var(--neutral-700)] rounded-full flex items-center justify-center">
                            <MapPin size={32} className="text-[var(--tertiary-700)] fill-current" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">Select location manually</h3>
                            <p className="text-sm text-[var(--neutral-500)] leading-relaxed px-4">
                                If you prefer to add your location manually, here is your option
                            </p>
                        </div>
                    </button>
                </div>
                <div className="mt-auto pt-8 flex justify-center">
                    <div className="w-1/3 h-1 bg-[var(--neutral-200)] dark:bg-[var(--neutral-700)] rounded-full"></div>
                </div>
            </div>

            <div className="hidden md:flex flex-col items-center justify-center min-h-screen p-6">
                <div className="max-w-2xl w-full text-center space-y-3 mb-8">
                    <h2 className="text-3xl font-bold font-heading text-[var(--text-primary)]">
                        Start the Smart Menu Experience
                    </h2>
                    <p className="text-[var(--neutral-500)]">
                        Please enter your location or use your current location and enjoy the custom experience in any of your restaurants.
                    </p>
                </div>

                <div className="max-w-2xl w-full p-6 rounded-3xl bg-[var(--bg-secondary)] shadow-lg border border-[var(--border-color)]">
                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--neutral-400)] w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for streets, cities, districts..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-[var(--border-color)] bg-transparent text-[var(--text-primary)] outline-none focus:border-[var(--primary-600)] transition-all"
                        />
                    </div>

                    <div className="w-full h-80 mb-6 rounded-xl overflow-hidden border border-[var(--border-color)] z-0">
                        <MapContainer 
                            center={position} 
                            zoom={13} 
                            scrollWheelZoom={true} 
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <LocationMarker position={position} setPosition={setPosition} setAddress={setAddress} />
                        </MapContainer>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                        <button 
                            type="button" 
                            onClick={handleCurrentLocation}
                            className="flex items-center gap-2 hover:underline font-medium transition-colors text-[var(--primary-600)]"
                        >
                            <Navigation className="w-4 h-4" />
                            <span>Use my current location</span>
                        </button>
                        
                        <span className="hidden sm:inline text-[var(--border-color)]">|</span>

                        <div className="flex items-center gap-2 text-[var(--neutral-500)] font-medium">
                            <MapPin className="w-4 h-4" />
                            <span>Click map to adjust location</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl w-full mt-8">
                    <Button onClick={handleConfirm} disabled={isLoading} className="w-full py-4 rounded-xl font-bold shadow-lg shadow-purple-500/20">
                        {isLoading ? 'Setting Location...' : 'Confirm Location'}
                    </Button>
                </div>
            </div>
        </div>
    );
}