import Leaflet from "../Leaflet/Leaflet";
import markers from "../../data/markers.json";

const App = () => {
  return (
    <div>
      <Leaflet markers={markers} />
    </div>
  );
};

export default App;
