import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Form() {
  const {
    planets,
    filtered,
    setFiltered,
    setSearch,
  } = useContext(StarWarsContext);
  const [inputs, setInputs] = useState({
    name: '',
  });

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  const filterPlanets = () => {
    const filteredPlanets = planets
      .filter((p) => p.name.toUpperCase().includes(filtered.name.toUpperCase()));
    setSearch(filteredPlanets);
  };

  useEffect(() => {
    setFiltered(inputs);
  }, [inputs]);

  useEffect(() => {
    setSearch(planets);
    if (Object.values(filtered).length > 0) filterPlanets();
  }, [planets, filtered]);

  return (
    <form>
      Filtros:
      <label htmlFor="name">
        Nome:
        <input
          data-testid="name-filter"
          type="text"
          name="name"
          value={ inputs.name }
          id="name"
          onChange={ handleChange }
        />
      </label>
    </form>
  );
}
