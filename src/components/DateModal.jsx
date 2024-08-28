import { useState } from "react";
import Modal from "react-modal";
import GeocodingAutocomplete from "./GeocodingAutocomplete";

const DateModal = ({ selectedLocation, setSelectedLocation }) => {
  const [open, setOpen] = useState(true);
  const openModal = () => {
    setOpen(!open);
  };
  const doNothing = () => {
    return false;
  };
  return (
    <div>
      <a onClick={openModal}>
        {selectedLocation == null ? "" : selectedLocation.name}
      </a>
      <Modal isOpen={open} contentLabel="Example Modal">
        <h2>Írd be a lekérdezni kívánt város nevét:</h2>

        <GeocodingAutocomplete
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          openModal={openModal}
        ></GeocodingAutocomplete>
        <button onClick={selectedLocation != null ? openModal : doNothing}>
          close
        </button>
      </Modal>
    </div>
  );
};
export default DateModal;
