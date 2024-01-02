import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useRef, createRef } from "react";
import PropTypes from "prop-types";
import ListWork from "../ListWork/ListWork";
import style from "./Leaflet.module.css";

const position = [49.80433535750162, 30.127963556537154];
const zoom = 13;

const customIcon = new Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Leaflet = ({ markers = [] }) => {
  const mapRef = useRef(null);
  const markerRefs = useRef(markers.map(() => createRef(null)));

  const handleMarkerClick = (coordinates, markerIndex) => {
    if (mapRef && mapRef.current) {
      mapRef.current.flyTo(coordinates, mapRef.current.getZoom());
    }

    const marker = markerRefs.current[markerIndex].current;

    if (marker) {
      marker.openPopup();
    }
  };

  return (
    <div>
      <div className={style.box}>
        <MapContainer
          className={style.leafletContainer}
          whenCreated={(map) => {
            mapRef.current = map;
          }}
          center={position}
          zoom={zoom}
          minZoom={9}
          ref={mapRef}
        >
          <TileLayer
            attribution="&copy; Google Maps"
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          {markers.length > 0 &&
            markers.map(({ id, geocode, label }, idx) => (
              <Marker
                ref={markerRefs.current[idx]}
                key={id}
                position={geocode}
                icon={customIcon}
              >
                <Popup>{label}</Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
      <div>
        <ListWork works={markers} onLocateWork={handleMarkerClick} />
      </div>
    </div>
  );
};

Leaflet.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      geocode: PropTypes.arrayOf(PropTypes.number).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default Leaflet;
