import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
function MainMap(){

    const center = [4.605, -74.09]; // Default map center coordinates
      
    return(
        <div className="map-container">
        <MapContainer center={center} zoom={12} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          attribution='&copy;<a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center}>
          <Popup>
            A sample marker on the map.
          </Popup>
        </Marker>
      </MapContainer>
      </div>
      )

}

export default MainMap;