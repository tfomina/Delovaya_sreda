import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Select from "react-select";

export const Licenses = ({ license = null, handleLicenseChange }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderWidth: "1px",
      borderColor: state.isFocused ? "#80bdff!important" : "#ced4da!important",
      boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(0,123,255,.25)" : "none",
      borderRadius: ".25rem",
      color: "#495057"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#80bdff"
        : state.isSelected
        ? "#007bff"
        : "#FFF"
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      backgroundColor: "#ced4da"
    })
  };

  const [options, setOptions] = useState([]);

  const fetchLicenses = async () => {
    try {
      const response = await axios("https://api.github.com/licenses");
      setOptions(response.data);
    } catch (error) {
      setOptions([]);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  return (
    <div className="flex-grow-1">
      <Select
        styles={customStyles}
        isOptionSelected={option =>
          license && license.node_id === option.node_id
        }
        onChange={handleLicenseChange}
        options={options}
        getOptionLabel={option => option.name}
        getOptionValue={option => option.node_id}
        placeholder="Выберите тип лицензии"
        isSearchable={true}
        isClearable={true}
        noOptionsMessage={() => "Ничего не найдено"}
      />
    </div>
  );
};

Licenses.propTypes = {
  license: PropTypes.object,
  handleLicenseChange: PropTypes.func
};
