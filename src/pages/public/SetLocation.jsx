import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Navigation, QrCode } from 'lucide-react';
import Button from '../../components/ui/Button';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
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
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            setAddress(`Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`);
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

function MapController({ centerPos }) {
    const map = useMap();
    useEffect(() => {
        if (centerPos) {
            map.flyTo(centerPos, 15, { animate: true, duration: 1.5 });
        }
    }, [centerPos, map]);
    return null;
}

export default function SelectLocation() {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState({ lat: 40.7128, lng: -74.0060 });
    const [mapCenter, setMapCenter] = useState(null);

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
                setMapCenter(newPos);
                setAddress(`Lat: ${newPos.lat.toFixed(4)}, Lng: ${newPos.lng.toFixed(4)}`);
            });
        }
    };

    const focusMap = () => {
        setMapCenter({ ...position }); 
    };

    return (
        <div className="w-full h-full bg-[var(--bg-primary)] overflow-y-auto">
            <div className="md:hidden w-full min-h-full flex flex-col p-6">
                <div className="text-center mb-10 mt-8">
                    <h2 className="text-2xl font-bold flex items-center justify-center gap-2 text-[var(--text-primary)]">
                        Set your locations <span className="text-[var(--tertiary-700)] text-lg">📍</span>
                    </h2>
                </div>
                <div className="flex flex-col gap-6 flex-1">
                    <button
                        onClick={() => console.log("QR Scanner")}
                        className="flex flex-col items-center justify-center p-8 bg-[var(--bg-secondary)] rounded-3xl shadow-sm text-center space-y-4 border border-[var(--border-color)]"
                    >
                        <QrCode size={48} className="text-[var(--primary-600)] opacity-60" />
                        <div>
                            <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">Scan QR Code</h3>
                            <p className="text-sm text-[var(--neutral-500)] px-4">
                                Scan your QR Code from our table
                            </p>
                        </div>
                    </button>
                    <button
                        className="flex flex-col items-center justify-center p-8 bg-[var(--bg-secondary)] rounded-3xl shadow-sm text-center space-y-4 border border-[var(--border-color)]"
                    >
                        <div className="w-12 h-12 bg-[var(--tertiary-100)] dark:bg-[var(--neutral-700)] rounded-full flex items-center justify-center">
                            <MapPin size={32} className="text-[var(--tertiary-700)] fill-current" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">Select location manually</h3>
                            <p className="text-sm text-[var(--neutral-500)] px-4">
                                Scroll down to select on map
                            </p>
                        </div>
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center min-h-full p-6 md:p-12">
                <div className="max-w-3xl w-full text-center space-y-3 mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-[var(--text-primary)] tracking-wide">
                        Start the Smart Menu Experience
                    </h2>
                    <p className="text-[var(--neutral-400)] text-sm md:text-base max-w-xl mx-auto">
                        Please enter your location or use your current location and enjoy the custom experience in any of your restaurants.
                    </p>
                </div>

                <div className="max-w-3xl w-full p-8 rounded-[2rem] bg-[var(--bg-secondary)] shadow-2xl border border-[var(--border-color)] flex flex-col">
                    <div className="relative mb-6">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--neutral-400)] w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for streets, cities, districts..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] outline-none focus:border-[var(--primary-600)] transition-all shadow-inner"
                        />
                    </div>

                    <div className="w-full h-[350px] mb-6 rounded-2xl overflow-hidden border border-[var(--border-color)] z-0 relative shadow-inner">
                        <MapContainer 
                            center={position} 
                            zoom={13} 
                            scrollWheelZoom={true} 
                            style={{ height: '100%', width: '100%', zIndex: 0 }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <LocationMarker position={position} setPosition={setPosition} setAddress={setAddress} />
                            <MapController centerPos={mapCenter} />
                        </MapContainer>
                    </div>

                    <div className="flex items-center justify-center gap-6 mt-2">
                        <button 
                            type="button" 
                            onClick={handleCurrentLocation}
                            className="flex items-center gap-2.5 text-sm font-medium transition-colors text-[var(--neutral-400)] hover:text-[var(--text-primary)] group"
                        >
                            <MapPin className="w-4 h-4 group-hover:text-[var(--tertiary-700)] transition-colors" />
                            <span>Use my current location</span>
                        </button>
                        
                        <span className="text-[var(--border-color)]">|</span>

                        <button 
                            type="button" 
                            onClick={focusMap}
                            className="flex items-center gap-2.5 text-sm font-medium transition-colors text-[var(--neutral-400)] hover:text-[var(--text-primary)] group"
                        >
                            <Navigation className="w-4 h-4 group-hover:text-[var(--primary-600)] transition-colors" />
                            <span>Set my location on map</span>
                        </button>
                    </div>
                </div>

                <div className="max-w-3xl w-full mt-10 hidden md:block">
                    <Button onClick={handleConfirm} disabled={isLoading} className="w-full py-5 rounded-2xl font-bold text-lg shadow-xl shadow-[var(--primary-600)]/20 hover:scale-[1.01] transition-transform">
                        {isLoading ? 'Setting Location...' : 'Confirm Location'}
                    </Button>
                </div>
            </div>
        </div>
    );
}