import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import fetchPlanets from '../services/fetchPlanets';
import StarWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredName, setFilteredName] = useState({});
  const [search, setSearch] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filteredByName, setFilteredByName] = useState([]);
  const [inputs, setInputs] = useState({
    name: '',
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [columnOptions, setColumnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [columns] = useState(columnOptions);
  const [order, setOrder] = useState({
    column: 'population',
    sort: '',
  });

  const getPlanets = async () => {
    const response = await fetchPlanets();
    setPlanets(response);
  };

  useEffect(() => {
    getPlanets().then(() => setLoading(false));
  }, []);

  const values = {
    getPlanets,
    planets,
    setPlanets,
    loading,
    setLoading,
    filteredName,
    setFilteredName,
    search,
    setSearch,
    inputs,
    setInputs,
    filters,
    setFilters,
    filteredByName,
    setFilteredByName,
    columns,
    columnOptions,
    setColumnOptions,
    order,
    setOrder,
  };

  return (
    <StarWarsContext.Provider value={ values }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};
