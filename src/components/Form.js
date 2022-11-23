import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import filterPlanets from '../services/filterPlanets';

export default function Form() {
  const {
    planets,
    filtered,
    setFiltered,
    setSearch,
  } = useContext(StarWarsContext);

  const [inputs, setInputs] = useState({
    name: '',
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  const handleClick = () => {
    setSearch(filterPlanets(planets, inputs));
  };

  useEffect(() => {
    setFiltered(inputs);
  }, [inputs]);// usado para garantir que as alterações do Input estejam salvas.

  useEffect(() => {
    setSearch(planets);
    // Object.values(filtered).length > 0
    if (inputs.name !== '') {
      setSearch(filterPlanets(planets, filtered));
    }
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
      <label htmlFor="column">
        Coluna:
        <select
          data-testid="column-filter"
          type="text"
          name="column"
          id="column"
          value={ inputs.column }
          onChange={ handleChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison">
        Comparação:
        <select
          data-testid="comparison-filter"
          name="comparison"
          id="comparison"
          value={ inputs.comparison }
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        Número:
        <input
          data-testid="value-filter"
          type="number"
          name="value"
          id="value"
          value={ inputs.value }
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </form>
  );
}
