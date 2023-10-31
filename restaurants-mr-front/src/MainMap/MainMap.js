import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, GeoJSON, Circle} from 'react-leaflet';
import { isPolygon, isFeatureCollection } from 'geojson-validation';
import * as turf from "@turf/turf"; 

const center = [4.605, -74.09]; // Default map center coordinates
const fillBlueOptions = { stroke: false, fillColor: 'blue' }

const addressPoints = [{center:[4.6139966,-74.0756006]},{center:[4.6129966,-74.0756006]},

{center:[4.6119966,-74.0756006]},{center:[4.6039659,-74.0756006]},{center:[4.6037598,-74.0756006]}
]

function MainMap(){

  const [upzs, setUpzs] = useState(null);
  const [addressPoints, setAddressPoints] = useState(null);
  const [loading, setLoading] = useState(true);




    const onEachFeature = (feature, layer) => {

      isGeoJSONValid(upzs)
      // Attach a click event handler to each GeoJSON feature
      layer.on("click", (e) => {
        // Access the coordinates of the clicked feature
        const coordinates = e.latlng;

        // Trigger your event based on the coordinates
        //console.log("Clicked at:", coordinates);
        var loc = findPolygonContainingPoint(upzs,coordinates) 
        console.log("Loc: ",loc);
      });
    }


    const isGeoJSONValid = (geojson) => {
      if (isFeatureCollection(geojson)) {
        for (const feature of geojson.features) {
          try{
          if (!isPolygon(feature.geometry)) {
            return false; // Not a valid Polygon
          }
        }
          catch(err) {
              console.log("Error", feature) ;
          }
        }
        console.log(true)
        return true;
      }
      return false; // Not a valid FeatureCollection
    };



    const findPolygonContainingPoint = (geojson, coordinates) => {
      
      const point = turf.point([coordinates.lat, coordinates.lng]);
      console.log(geojson)
      for (const feature of geojson) {
        console.log(feature)
        if (turf.booleanPointInPolygon(point,turf.polygon(feature.geometry.coordinates))) {
          return feature;
        }
      }
    
      return null; // No polygon found
    };

    useEffect(() => {

      fetch('https://mr-restuarant-bogota.s3.us-east-2.amazonaws.com/poblacion-upz-bogota.geojson')
      .then((response) => response.json())
      .then((json) => { 
        setUpzs(json.features);
        isGeoJSONValid(upzs);
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