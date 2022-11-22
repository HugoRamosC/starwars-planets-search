import PropTypes from 'prop-types';
import React, { useState } from 'react';
import fetchPlanets from '../services/fetchPlanets';
import StarWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPlanets = async () => {
    const response = await fetchPlanets();
    setPlanets(response);
  };
  // useEffect(() => {
  //   fetchPlanets().then((p) => {
  //     console.log(p);
  //     setPlanets(p);
  //   });
  // }, []);
  // console.log(planets);

  // const values = useMemo(() => ({ planets }), [planets]);

  const values = {
    planets,
    getPlanets,
    loading,
    setLoading,
  };

  return (
    <StarWarsContext.Provider value={ values }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.shape.isRequired,
};
