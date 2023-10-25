import { MapContainer, TileLayer, Polygon, GeoJSON} from 'react-leaflet';
import React, { useEffect, useState } from 'react';
function MainMap(){

    const center = [4.605, -74.09]; // Default map center coordinates
    const purpleOptions = { color: 'purple' }; // Poligons coordinates

    const [upzs, setUpzs] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch('https://mr-restuarant-bogota.s3.us-east-2.amazonaws.com/poblacion-upz-bogota.geojson')
      .then((response) => response.json())
      .then((json) => { 
        setUpzs(json.features);
        setLoading(false); 
      });
    }, []);

    if(loading)
    {
      return <div>Loading...</div>;
    }


//<Polygon pathOptions={purpleOptions} positions={poli.geometry.coordinates} />
    return(
        <div className="map-container">
        <MapContainer center={center} zoom={12} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          attribution='&copy;<a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
    
    {upzs && (
        <GeoJSON data={upzs} style={{ fillColor: 'purple', color: 'black',  weight: 1 }} />
      )}


      </MapContainer>
      </div>
      )

}
export default MainMap;