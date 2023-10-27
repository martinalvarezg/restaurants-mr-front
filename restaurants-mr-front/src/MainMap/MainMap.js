import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, GeoJSON, Circle} from 'react-leaflet';

const center = [4.605, -74.09]; // Default map center coordinates
const fillBlueOptions = { stroke: false, fillColor: 'blue' }

const addressPoints = [{center:[4.6139966,-74.0756006]},{center:[4.6129966,-74.0756006]},

{center:[4.6119966,-74.0756006]},{center:[4.6039659,-74.0756006]},{center:[4.6037598,-74.0756006]}
]

function MainMap(){

  const [upzs, setUpzs] = useState(null);
  const [addressPoints, setAddressPoints] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch('https://mr-restuarant-bogota.s3.us-east-2.amazonaws.com/poblacion-upz-bogota.geojson')
      .then((response) => response.json())
      .then((json) => { 
        setUpzs(json.features);

      });

      fetch('https://mr-restuarant-bogota.s3.us-east-2.amazonaws.com/restaurants_loc_sample.json')
      .then((response) => response.json())
      .then((json) => { 
        console.log('Locs', json)
        setAddressPoints(json);
        setLoading(false); 
      });
    }, []);

    if(loading)
    {
      return <div>Loading...</div>;
    }

    return(
        <div className="map-container">
        <MapContainer center={center} zoom={12} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          attribution='&copy;<a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
    {addressPoints.map((ele) => (
      <Circle center={ele.center} pathOptions={fillBlueOptions} radius={25} />
    ))}


    {upzs && (
        <GeoJSON data={upzs} style={{ fillColor: 'purple', color: 'black',  weight: 1 }} />
      )}


      </MapContainer >
      </div>
      )

}
export default MainMap;