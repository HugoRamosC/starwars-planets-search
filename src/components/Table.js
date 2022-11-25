import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
// import sortPlanets from '../services/sortPlanets';

export default function Table() {
  const {
    planets,
    loading,
    search,
  } = useContext(StarWarsContext);

  // const ordenedSearch = sortPlanets(search, sequence);

  return (
    loading ? (<p>Carregando...</p>)
      : (
        <table>
          {/* style={ { border: '1px solid' } }> */}
          <thead>
            <tr style={ { textAlign: 'center', border: '1px solid' } }>
              { Object.keys(planets[0]).map((key, i) => (
                <th key={ i }>
                  {/* style={ { textAlign: 'center', border: '1px solid' } }> */}
                  { key.toUpperCase() }
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              search.length === 0 ? (<tr><td>Nada encontrado</td></tr>)
                : (
                  search.map((p) => (
                    <tr key={ p.name }>
                      {Object.values(p).map((value, i) => (
                        i === 0 ? <td key={ i } data-testid="planet-name">{ value }</td>
                          : <td key={ i }>{ value }</td>
                      ))}
                    </tr>
                  )))
            }
          </tbody>
        </table>)
  );
}
