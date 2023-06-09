export default function sortPlanets(arrPlanets, objOrder) {
  const arrWithoutUnknown = arrPlanets.filter((p) => p[objOrder.column] !== 'unknown');
  const arrUnknowns = arrPlanets.filter((p) => p[objOrder.column] === 'unknown');

  const sorted = arrWithoutUnknown.sort((a, b) => (
    objOrder.sort === 'ASC'
      ? a[objOrder.column] - b[objOrder.column]
      : b[objOrder.column] - a[objOrder.column]
  ));

  const newArr = [...sorted, ...arrUnknowns];
  return newArr;
}
