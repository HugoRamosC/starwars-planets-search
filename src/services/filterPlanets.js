export function filterByName(arrPlanets, objInput) {
  const filteredName = arrPlanets
    .filter((p) => p.name.toUpperCase().includes(objInput.name.toUpperCase()));

  return filteredName;
}

export function filterByNumber(arrPlanets, arrFilters) {
  // let filteredByNumbers = arrPlanets;

  // arrFilters corresponde ao array com os inputs (filtro com números)
  // percorre todos os filtros aplicados modificando o array de planetas
  // arrFilters.forEach((fltr) => {
  //   switch (fltr.comparison) {
  //   case 'menor que':
  //     filteredByNumbers = filteredByNumbers
  //       .filter((plnt) => +plnt[fltr.column] < +fltr.value);
  //     break;
  //   case 'igual a':
  //     filteredByNumbers = filteredByNumbers
  //       .filter((plnt) => +plnt[fltr.column] === +fltr.value);
  //     break;
  //   default: // maior que
  //     filteredByNumbers = filteredByNumbers
  //       .filter((plnt) => +plnt[fltr.column] > +fltr.value);
  //     break;
  //   }
  // });
  // return filteredByNumbers;

  // let fltrByNumbs = arrPlanets;

  let fltrByNumbs = arrPlanets;

  arrFilters.forEach((fltr) => {
    switch (fltr.comparison) {
    case 'menor que':
      fltrByNumbs = fltrByNumbs.filter((plnt) => +plnt[fltr.column] < +fltr.value);
      break;
    case 'igual a':
      fltrByNumbs = fltrByNumbs.filter((plnt) => +plnt[fltr.column] === +fltr.value);
      break;
    default: // maior que
      fltrByNumbs = fltrByNumbs.filter((plnt) => +plnt[fltr.column] > +fltr.value);
      break;
    }
  });
  return fltrByNumbs;
}
