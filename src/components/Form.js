import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import { filterByName, filterByNumber } from '../services/filterPlanets';

export default function Form() {
  const {
    planets,
    search,
    setSearch,
  } = useContext(StarWarsContext);

  const [inputs, setInputs] = useState({
    name: '',
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filters, setFilters] = useState([]);
  const [filteredByName, setFilteredByName] = useState([]);
  const [columnOptions, setColumnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  // Preenche search e filteredByName com todos os planetas no carregamento da página
  useEffect(() => {
    setSearch(planets); // search que é renderizado
    setFilteredByName(planets); // salva os planetas filtrados somente pelo nome
  }, [planets]);

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  useEffect(() => {
    if (inputs.name !== '') { // atualiza os states com o filtro por nome
      setSearch(filterByName(search, inputs));
      setFilteredByName(filterByName(search, inputs));
    } else { // atualiza o search filtrando somente pelo números (caso haja filtro de número), quando apaga o input nome
      setSearch(filterByNumber(planets, filters));
    }
  }, [inputs.name]);

  const handleFilterClick = () => { // salva os inputs em um array para rodar o filtro por número & dispara o useEffect abaixo
    const arrFilters = [...filters, inputs];
    setFilters(arrFilters);
  };

  const handleDeleteFilter = ({ target }) => { // atualiza o array de filtro quando um deles é deletado & dispara o useEffect abaixo
    const newArr = filters.filter((f) => f.column !== target.parentNode.id);
    setFilters(newArr);
  };

  const filterOptions = () => {
    if (filters.length !== 0) {
      const aplyedFilters = filters.map((f) => f.column);
      const optionsFiltered = columnOptions.filter((opt) => !aplyedFilters.includes(opt));
      setColumnOptions(optionsFiltered);
      setInputs({ ...inputs, column: optionsFiltered[0] });
    }
  };

  useEffect(() => { // atualiza o search (página) com os filtros por número
    setSearch(filterByNumber(filteredByName, filters));
    filterOptions();
  }, [filters]);

  return (
    <>
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
            {columnOptions.map((opt, i) => (
              <option key={ i } value={ opt }>{ opt }</option>
            ))}
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
          onClick={ handleFilterClick }
        >
          Filtrar
        </button>
      </form>
      { filters.length > 0
      && filters.map((f) => (
        <div key={ f.column } id={ f.column }>
          <p>{ `${f.column} ${f.comparison} ${f.value}` }</p>
          <button type="button" onClick={ handleDeleteFilter }>❌</button>
        </div>
      ))}
    </>
  );
}
