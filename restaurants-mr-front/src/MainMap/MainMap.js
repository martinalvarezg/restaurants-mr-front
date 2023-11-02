import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, GeoJSON, Circle} from 'react-leaflet';
import { isPolygon, isFeatureCollection } from 'geojson-validation';
import { useNavigate } from 'react-router-dom';
import * as turf from "@turf/turf"; 

const center = [4.605, -74.09]; // Default map center coordinates
const fillBlueOptions = { stroke: false, fillColor: 'blue' }


function MainMap(){

  const [upzs, setUpzs] = useState(null);
  const [addressPoints, setAddressPoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



    const onEachFeature = (feature, layer) => {
      //isGeoJSONValid(upzs)
      // Attach a click event handler to each GeoJSON feature
      layer.on("click", (e) => {
        // Access the coordinates of the clicked feature
        const coordinates = e.latlng;

        // Trigger your event based on the coordinates
        var loc = findPolygonContainingPoint(upzs,coordinates) 
        navigate({
          pathname: '/dashboard',
          search: `?loc=${loc.properties.nom_upz}`
        });
      });
    }

    const findPolygonContainingPoint = (geojson, coordinates) => {
      
      const point = turf.point([coordinates.lng, coordinates.lat]);
      for (const feature of geojson) {
        try{
        if (turf.booleanPointInPolygon(point,turf.polygon(feature.geometry.coordinates))) {
          return feature;
        }
        }
        catch(e){
          console.log("Upz not available");
        }
      }  
      return null; // No polygon found
    };

    useEffect(() => {

      fetch('https://mr-restuarant-bogota.s3.us-east-2.amazonaws.com/poblacion-upz-bogota.geojson')
      .then((response) => response.json())
      .then((json) => { 
        setUpzs(json.features);
      });

      fetch('https://mr-restuarant-bogota.s3.us-east-2.amazonaws.com/restaurants_loc_sample.json')
      .then((response) => response.json())
      .then((json) => { 
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
        <GeoJSON data={upzs} 
        style={{ fillColor: 'purple', color: 'black',  weight: 1 }}
        onEachFeature={onEachFeature} 
        />
      )}


      </MapContainer >
      </div>
      )

}
export default MainMap;