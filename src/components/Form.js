import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import { filterByName, filterByNumber } from '../services/filterPlanets';
import sortPlanets from '../services/sortPlanets';

export default function Form() {
  const {
    planets,
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
  } = useContext(StarWarsContext);
  const [click, setClick] = useState(false);

  const checkSelectOrder = document.querySelectorAll('input[name="sort"]');

  // Preenche search e filteredByName com todos os planetas no carregamento da página
  useEffect(() => {
    setSearch(planets); // search que é renderizado
    setFilteredByName(planets); // salva os planetas filtrados somente pelo nome
    // setSequence(order);
  }, [planets]);

  const handleChangeFilter = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  const handleChangeOrder = ({ target }) => {
    setOrder({ ...order, [target.name]: target.value });
  };

  useEffect(() => {
    if (inputs.name !== '') { // atualiza os states com o filtro por nome
      setSearch(filterByName(search, inputs));
      setFilteredByName(filterByName(search, inputs));
    } else { // atualiza o search filtrando somente pelo números (caso haja filtro de número), quando apaga o input nome
      setSearch(filterByNumber(planets, filters));
    }
  }, [inputs.name]);

  const handleClickAplyFilter = () => { // salva os inputs em um array para rodar o filtro por número & dispara o useEffect abaixo
    const arrFilters = [...filters, inputs];
    setFilters(arrFilters);
  };

  const handleClickDeleteFilter = ({ target }) => { // atualiza o array de filtro quando um deles é deletado & dispara o useEffect abaixo
    const newArr = filters.filter((f) => f.column !== target.parentNode.id);
    setFilters(newArr);
  };

  const handleClickClearAllFilters = () => {
    setFilteredByName(planets);
    setColumnOptions(columns);
    setFilters([]);
    setInputs({
      name: '',
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  };

  const filterOptions = () => {
    if (filters.length !== 0) {
      const aplyedFilters = filters.map((f) => f.column);
      const optionsFiltered = columns.filter((opt) => !aplyedFilters.includes(opt));
      setColumnOptions(optionsFiltered);

      if (optionsFiltered.length === 0) {
        setInputs({ ...inputs, column: columns[0] });
      } else {
        setInputs({ ...inputs, column: optionsFiltered[0] });
      }
    }
  };

  useEffect(() => { // atualiza o search (página) com os filtros por número
    setSearch(filterByNumber(filteredByName, filters));// filteredByName necessário aqui.. verificar para fatorar
    filterOptions();
  }, [filters]);

  const handleClickOrder = () => {
    setClick(true);
  };

  useEffect(() => {
    setSearch(sortPlanets(search, order));
    setClick(false);
  }, [click]);

  return (
    <>
      <form>
        <br />
        FILTROS:
        <br />
        <label htmlFor="name">
          Nome:
          <input
            data-testid="name-filter"
            type="text"
            name="name"
            value={ inputs.name }
            id="name"
            onChange={ handleChangeFilter }
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
            onChange={ handleChangeFilter }
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
            onChange={ handleChangeFilter }
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
            onChange={ handleChangeFilter }
          />
        </label>
        <br />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleClickAplyFilter }
        >
          Filtrar
        </button>
        <br />
        <br />
        ORDENAÇÃO:
        <br />
        <label htmlFor="column">
          Coluna:
          <select
            data-testid="column-sort"
            type="text"
            name="column"
            id="column"
            value={ order.column }
            onChange={ handleChangeOrder }
          >
            {columnOptions.map((opt) => (
              <option key={ opt } value={ opt }>{ opt }</option>
            ))}
          </select>
        </label>
        <label htmlFor="ascendente">
          <input
            type="radio"
            id="ascendente"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
            onChange={ handleChangeOrder }
          />
          Ascendente
        </label>
        <label htmlFor="descendente">
          <input
            type="radio"
            id="descendente"
            name="sort"
            value="DESC"
            data-testid="column-sort-input-desc"
            onChange={ handleChangeOrder }
          />
          Descendente
        </label>
        <br />
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ handleClickOrder }
          disabled={ ![...checkSelectOrder].some((select) => select.checked === true) }
        >
          Ordenar
        </button>
        <br />
        <br />
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ handleClickClearAllFilters }
        >
          Limpar Filtros & Ordem
        </button>
      </form>
      { filters.length > 0
      && filters.map((f) => (
        <div key={ f.column } id={ f.column } data-testid="filter">
          <button type="button" onClick={ handleClickDeleteFilter }>❌</button>
          <span>{ `${f.column} ${f.comparison} ${f.value}` }</span>
        </div>
      ))}
    </>
  );
}
