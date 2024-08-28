import { useState } from "react";
import "./App.css";
import DateModal from "./components/DateModal";
import WeatherComponent from "./components/Weather";

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <>
      <DateModal
        setSelectedLocation={setSelectedLocation}
        selectedLocation={selectedLocation}
      ></DateModal>
      {selectedLocation != null ? (
        <WeatherComponent
          location={selectedLocation}
          setLocation={setSelectedLocation}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default App;
