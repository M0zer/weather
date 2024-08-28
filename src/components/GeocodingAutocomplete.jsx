import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

function GeocodingAutocomplete({
  selectedLocation,
  setSelectedLocation,
  openModal,
}) {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState([]);
  GeocodingAutocomplete.propTypes = {
    selectedLocation: PropTypes.shape({
      name: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
    }),
    setSelectedLocation: PropTypes.shape({
      name: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
    }),
  };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocations = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery) {
        setLocations([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://geocoding-api.open-meteo.com/v1/search",
          {
            params: {
              name: searchQuery,
              count: 5,
              language: "hu",
              format: "json",
            },
          }
        );

        if (response.data && response.data.results) {
          setLocations(response.data.results);
        } else {
          setLocations([]);
        }
      } catch (err) {
        setError("Hiba történt az adatok lekérése során.");
        setLocations([]);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchLocations(query);
  }, [query, fetchLocations]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedLocation(null);
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setQuery(location.name);
    setLocations([]);
    openModal();
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Kezdj el gépelni egy városnevet..."
        className="autocomplete-input"
      />
      {isLoading && <div className="loading">Betöltés...</div>}
      {error && <div className="error">{error}</div>}
      {locations.length > 0 && (
        <ul className="autocomplete-list">
          {locations.map((location) => (
            <li
              key={location.id}
              onClick={() => handleSelectLocation(location)}
              className="autocomplete-item"
            >
              {location.name}, {location.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GeocodingAutocomplete;
