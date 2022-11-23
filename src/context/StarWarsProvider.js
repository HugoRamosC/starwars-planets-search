import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import fetchPlanets from '../services/fetchPlanets';
import StarWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredName, setFilteredName] = useState({});
  const [search, setSearch] = useState([]);

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
