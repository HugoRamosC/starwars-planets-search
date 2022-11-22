import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
// import fetchPlanets from '../services/fetchPlanets';

export default function Table() {
  const { planets, getPlanets, loading, setLoading } = useContext(StarWarsContext);
  // const [planets, setPlanets] = useState([]);

  useEffect(() => {
    getPlanets().then(() => setLoading(false));
    console.log(planets);
    // fetchPlanets().then((p) => {
    //   console.log(p);
    //   setPlanets(p);
    // });
  }, []);
  // console.log(planets);

  return (
    <table style={ { border: '1px solid' } }>
      <thead>
        <tr>
          { loading ? <p>Carregando...</p>
            : Object.keys(planets[0]).map((key, i) => (
              <th key={ i } style={ { 'text-align': 'center', border: '1px solid' } }>
                { key.toUpperCase() }
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        { loading ? <p>Carregando...</p>
          : planets.map((p) => (
            <tr key={ p.name }>
              {Object.values(p).map((value, i) => <td key={ i }>{ value }</td>)}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
