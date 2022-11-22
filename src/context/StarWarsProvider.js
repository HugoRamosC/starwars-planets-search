import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchPlanets from '../services/fetchPlanets';
import StarWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetchPlanets().then((p) => setPlanets(p));
  }, []);
  console.log(planets);

  return (
    <StarWarsContext.Provider value={ { planets } }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.shape.isRequired,
};
