import { useState } from "react";
import Modal from "react-modal";
import GeocodingAutocomplete from "./GeocodingAutocomplete";

const DateModal = () => {
  const [open, setOpen] = useState(true);
  const openModal = () => {
    setOpen(!open);
  };
  const message = () => {
    return "asd";
  };
  const [selectedLocation, setSelectedLocation] = useState(null);
  return (
    <div>
      <a onClick={openModal}>
        {selectedLocation == null ? "" : selectedLocation.name}
      </a>
      <Modal isOpen={open} contentLabel="Example Modal">
        <h2>Hello</h2>
        <button onClick={selectedLocation != null ? openModal : message}>
          close
        </button>
        <div>I am a modal</div>
        <GeocodingAutocomplete
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        ></GeocodingAutocomplete>
      </Modal>
    </div>
  );
};
export default DateModal;
