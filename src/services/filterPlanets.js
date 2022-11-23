function filterPlanets(arr, obj) {
  const filteredPlanets = arr
    .filter((p) => p.name.toUpperCase().includes(obj.name.toUpperCase()));

  let filteredNumbers = [];
  switch (obj.comparison) {
  case 'maior que':
    filteredNumbers = filteredPlanets.filter((p) => +p[obj.column] > +obj.value);
    break;
  case 'menor que':
    filteredNumbers = filteredPlanets.filter((p) => +p[obj.column] < +obj.value);
    break;
  case 'igual a':
    filteredNumbers = filteredPlanets.filter((p) => +p[obj.column] === +obj.value);
    break;
  default:
    filteredNumbers = arr;
    break;
  }
  return filteredNumbers;
}

export default filterPlanets;
