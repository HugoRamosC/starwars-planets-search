import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Table() {
  const { planets } = useContext(StarWarsContext);
  console.log(planets);
  return (
    <table>
      <thead>
        <tr>
          {
            Object.keys(planets[0]).map((key, i) => (
              <th key={ i } style={ { 'text-align': center } }>{ key.toUpperCase() }</th>
            ))
          }
        </tr>
      </thead>
    </table>
  );
}
