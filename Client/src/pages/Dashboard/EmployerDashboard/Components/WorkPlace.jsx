import axios from "axios";
import React, { useState } from "react";
import { TextField } from "@mui/material";

const WorkPlace = ({ formData, setFormData, inputStyles }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const MAPBOX_TOKEN =
    "pk.eyJ1IjoicGl5dXNoa2hhdHJpOTY4IiwiYSI6ImNtMWFteDk5eDBlN2Mya3EzcTRiazZ6aDIifQ.4-B17DQmbxNHo-ckUY59vQ";

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=15`
      );
      setSuggestions(response.data.features || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData((p) => ({ ...p, workplace: value }));
    fetchSuggestions(value);
  };

  const handleSelect = (place) => {
    setFormData((p) => ({
      ...p,
      workplace: place.place_name,
      coordinates: place.center, // [lng, lat]
    }));
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <TextField
        label="Workplace"
        value={formData.workplace}
        onChange={handleChange}
        sx={inputStyles}
        fullWidth
        placeholder="Enter workplace"
      />

      {loading && (
        <div className="absolute left-3 top-2 text-xs text-gray-500">
          Loading...
        </div>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full mt-1 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
          {suggestions.map((sug) => (
            <li
              key={sug.id}
              onClick={() => handleSelect(sug)}
              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {sug.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkPlace;
