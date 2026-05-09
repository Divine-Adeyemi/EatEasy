import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Navigation, QrCode, ChevronLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, CircleMarker } from 'react-leaflet';
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

const MOCK_RESTAURANTS = [
    { id: 1, name: "Gram Bistro", address: "790 8th Ave, New York", distance: "0.4 km away", lat: 40.7624, lng: -73.9875 },
    { id: 2, name: "Bin 71", address: "792 8th Ave, New York", distance: "1.2 km away", lat: 40.7630, lng: -73.9880 },
    { id: 3, name: "Sushi Bar", address: "794 8th Ave, New York", distance: "3.5 km away", lat: 40.7635, lng: -73.9885 },
];

function LocationMarker({ position, setPosition, setAddress }) {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            if(setAddress) setAddress(`Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`);
        },
    });
    return position === null ? null : <Marker position={position}></Marker>;
}

function MapController({ centerPos, zoomLevel = 14 }) {
    const map = useMap();
    useEffect(() => {
        if (centerPos) {
            map.flyTo(centerPos, zoomLevel, { animate: true, duration: 1.5 });
        }
    }, [centerPos, map, zoomLevel]);
    return null;
}

export default function SelectLocation() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    // State Flags
    const [isExpanded, setIsExpanded] = useState(false);
    const [mobileStep, setMobileStep] = useState('prompt'); 
    
    // Map & Location State
    const [position, setPosition] = useState({ lat: 40.7580, lng: -73.9855 });
    const [mapCenter, setMapCenter] = useState({ lat: 40.7580, lng: -73.9855 });
    const [initialAddress, setInitialAddress] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

    const handleFinalize = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 800);
    };

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                setPosition(newPos);
                setMapCenter(newPos);
                setInitialAddress(`Lat: ${newPos.lat.toFixed(4)}, Lng: ${newPos.lng.toFixed(4)}`);
            });
        }
    };

    const handleMobileContinue = () => {
        if (mobileStep === 'prompt') {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setMobileStep('list');
                setSelectedRestaurantId(MOCK_RESTAURANTS[0].id);
            }, 800);
        } else if (mobileStep === 'list') {
            handleFinalize();
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden relative">
            
            {/* ========================================================
                INITIAL STATE (isExpanded === false)
            ======================================================== */}
            {!isExpanded && (
                <>
                    {/* --- MOBILE --- */}
                    <div className="md:hidden flex-1 w-full flex flex-col p-6 overflow-y-auto">
                        <div className="text-center mb-10 mt-8 shrink-0">
                            <h2 className="text-2xl font-bold flex items-center justify-center gap-2 text-[var(--text-primary)]">
                                Set your locations <span className="text-[var(--tertiary-700)] text-lg">📍</span>
                            </h2>
                        </div>
                        <div className="flex flex-col gap-6 flex-1 min-h-0">
                            <button
                                onClick={() => alert("QR Scanner coming soon")}
                                className="flex flex-col items-center justify-center p-8 bg-[var(--bg-secondary)] rounded-3xl shadow-sm text-center space-y-4 border border-[var(--border-color)] shrink-0"
                            >
                                <QrCode size={48} className="text-[var(--primary-600)] opacity-60" />
                                <div>
                                    <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">Scan QR Code</h3>
                                    <p className="text-sm text-[var(--neutral-500)] px-4">
                                        Choose the simple way, scan your QR Code from our table
                                    </p>
                                </div>
                            </button>
                            <button
                                onClick={() => setIsExpanded(true)} 
                                className="flex flex-col items-center justify-center p-8 bg-[var(--bg-secondary)] rounded-3xl shadow-sm text-center space-y-4 border border-[var(--border-color)] shrink-0"
                            >
                                <div className="w-12 h-12 bg-[var(--tertiary-100)] dark:bg-[var(--neutral-700)] rounded-full flex items-center justify-center">
                                    <MapPin size={32} className="text-[var(--tertiary-700)] fill-current" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">Select location manually</h3>
                                    <p className="text-sm text-[var(--neutral-500)] px-4">
                                        If you prefer to add your location manually, here is your option
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* --- DESKTOP --- */}
                    <div className="hidden md:flex flex-1 flex-col items-center justify-center p-6 lg:p-12 min-h-0 overflow-y-auto">
                        <div className="max-w-3xl w-full text-center space-y-3 mb-8 shrink-0">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[var(--text-primary)] tracking-wide">
                                Start the Smart Menu Experience
                            </h2>
                            <p className="text-[var(--neutral-400)] text-sm md:text-base max-w-xl mx-auto">
                                Please enter your location or use your current location and enjoy the custom experience.
                            </p>
                        </div>

                        <div className="max-w-3xl w-full p-8 rounded-[2rem] bg-[var(--bg-secondary)] shadow-xl border border-[var(--border-color)] flex flex-col shrink-0">
                            <div className="relative mb-6">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--neutral-400)] w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search for streets, cities, districts..."
                                    value={initialAddress}
                                    onChange={(e) => setInitialAddress(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] outline-none focus:border-[var(--primary-600)] transition-all"
                                />
                            </div>

                            <div className="w-full h-[300px] mb-6 rounded-2xl overflow-hidden border border-[var(--border-color)] z-0 relative">
                                <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0 }}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <LocationMarker position={position} setPosition={setPosition} setAddress={setInitialAddress} />
                                    <MapController centerPos={mapCenter} zoomLevel={13} />
                                </MapContainer>
                            </div>

                            <div className="flex items-center justify-center gap-6 mt-2">
                                <button type="button" onClick={handleCurrentLocation} className="flex items-center gap-2.5 text-sm font-medium transition-colors text-[var(--neutral-400)] hover:text-[var(--text-primary)] group">
                                    <MapPin className="w-4 h-4 group-hover:text-[var(--tertiary-700)] transition-colors" />
                                    <span>Use my current location</span>
                                </button>
                                <span className="text-[var(--border-color)]">|</span>
                                <button type="button" onClick={() => setIsExpanded(true)} className="flex items-center gap-2.5 text-sm font-medium transition-colors text-[var(--neutral-400)] hover:text-[var(--text-primary)] group">
                                    <Navigation className="w-4 h-4 group-hover:text-[var(--primary-600)] transition-colors" />
                                    <span>Set my location on map</span>
                                </button>
                            </div>
                        </div>

                        <div className="max-w-3xl w-full mt-8 shrink-0">
                            <Button onClick={handleFinalize} disabled={isLoading} className="w-full py-5 rounded-2xl font-bold text-lg shadow-lg">
                                {isLoading ? 'Setting Location...' : 'Confirm Location'}
                            </Button>
                        </div>
                    </div>
                </>
            )}


            {/* ========================================================
                EXPANDED STATE (isExpanded === true)
            ======================================================== */}
            {isExpanded && (
                <>
                    {/* --- MOBILE EXPANDED --- */}
                    <div className="md:hidden flex-1 w-full flex flex-col p-6 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4 mt-2 shrink-0">
                            <button onClick={() => setIsExpanded(false)} className="p-2 text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-full transition-colors">
                                <ChevronLeft size={24} />
                            </button>
                        </div>

                        {mobileStep === 'prompt' && (
                            <div className="flex flex-col flex-1 items-center justify-center text-center px-4 min-h-0">
                                <div className="w-20 h-20 bg-[var(--tertiary-100)] dark:bg-[var(--tertiary-700)]/20 rounded-full flex items-center justify-center mb-8 shrink-0">
                                    <MapPin size={40} className="text-[var(--danger-700)] fill-[var(--danger-700)]" />
                                </div>
                                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                                    Share your location<br/>with us to order
                                </h2>
                                <p className="text-[var(--neutral-500)] text-sm mb-auto">
                                    Please enter your location or allow access to find all restaurants near you.
                                </p>
                                
                                <div className="w-full space-y-4 mt-8 shrink-0">
                                    <button onClick={() => setMobileStep('list')} className="text-[var(--primary-600)] font-medium text-sm">
                                        Enter a new location
                                    </button>
                                    <Button onClick={handleMobileContinue} disabled={isLoading} className="w-full py-4 rounded-xl font-bold bg-[var(--primary-600)] text-white">
                                        {isLoading ? 'Locating...' : 'Continue'}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {mobileStep === 'list' && (
                            <div className="flex flex-col flex-1 px-2 min-h-0">
                                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2 shrink-0">
                                    Share your location <span className="text-red-500 text-sm">📍</span>
                                </h2>
                                <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar">
                                    {MOCK_RESTAURANTS.map((rest) => (
                                        <div 
                                            key={rest.id}
                                            onClick={() => setSelectedRestaurantId(rest.id)}
                                            className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer shrink-0
                                                ${selectedRestaurantId === rest.id 
                                                    ? 'bg-[var(--bg-secondary)] border-[var(--primary-600)]' 
                                                    : 'bg-[var(--bg-secondary)] border-[var(--border-color)] opacity-70'}
                                            `}
                                        >
                                            <div>
                                                <h4 className="font-bold text-[var(--text-primary)]">{rest.name}</h4>
                                                <p className="text-xs text-[var(--neutral-500)] mt-1">{rest.address}</p>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                                ${selectedRestaurantId === rest.id ? 'border-[var(--secondary-800)]' : 'border-[var(--neutral-500)]'}
                                            `}>
                                                {selectedRestaurantId === rest.id && (
                                                    <div className="w-2.5 h-2.5 bg-[var(--secondary-800)] rounded-full"></div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full mt-6 pt-4 shrink-0 border-t border-[var(--border-color)]">
                                    <Button onClick={handleMobileContinue} disabled={isLoading || !selectedRestaurantId} className="w-full py-4 rounded-xl font-bold bg-[var(--primary-600)] text-white disabled:opacity-50">
                                        {isLoading ? 'Processing...' : 'Continue'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- DESKTOP EXPANDED (Absolute Full Screen Map) --- */}
                    <div className="hidden md:block absolute inset-0 z-0">
                        
                        <div className="absolute inset-0 z-0 bg-[var(--bg-primary)]">
                            <MapContainer center={mapCenter} zoom={15} zoomControl={false} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0 }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OSM contributors' />
                                <MapController centerPos={mapCenter} zoomLevel={15} />
                                {MOCK_RESTAURANTS.map((rest) => (
                                    <CircleMarker 
                                        key={rest.id} center={[rest.lat, rest.lng]} radius={6}
                                        pathOptions={{ color: 'var(--secondary-800)', fillColor: 'var(--secondary-600)', fillOpacity: 1, weight: 2 }}
                                    />
                                ))}
                            </MapContainer>
                        </div>

                        {/* Floating Navigation / Search UI over the map */}
                        <div className="absolute inset-0 z-10 pointer-events-none p-6">
                            
                            <button onClick={() => setIsExpanded(false)} className="pointer-events-auto p-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full shadow-lg text-[var(--text-primary)] hover:scale-105 transition-transform inline-flex">
                                <ChevronLeft size={20} />
                            </button>

                            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-xl flex flex-col items-center pointer-events-auto">
                                <div className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl shadow-2xl p-6 relative">
                                    <h2 className="text-center text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center justify-center gap-2">
                                        Set your location <span className="text-red-500 text-sm">📍</span>
                                    </h2>

                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--neutral-400)] w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search for streets, cities, districts..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm outline-none transition-all focus:border-[var(--primary-600)]"
                                        />
                                    </div>

                                    {searchQuery && (
                                        <div className="mt-2 flex flex-col gap-1 max-h-[40vh] overflow-y-auto no-scrollbar">
                                            {MOCK_RESTAURANTS.map((rest) => (
                                                <div 
                                                    key={rest.id}
                                                    onClick={() => {
                                                        setSearchQuery(rest.address);
                                                        setMapCenter({ lat: rest.lat, lng: rest.lng });
                                                        handleFinalize();
                                                    }}
                                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--neutral-200)] dark:hover:bg-[var(--neutral-700)] cursor-pointer transition-colors"
                                                >
                                                    <span className="text-sm text-[var(--text-primary)] font-medium">{rest.address}</span>
                                                    <span className="text-xs text-[var(--neutral-400)] flex items-center gap-1">
                                                        <MapPin size={12} /> {rest.distance}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}