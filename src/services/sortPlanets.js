export default function sortPlanets(arrPlanets, objOrder) {
  if (objOrder.sort === 'ASC') {
    const sorted = arrPlanets.sort((a, b) => a[objOrder.column] - b[objOrder.column]);
    return sorted;
  }
  const sorted = arrPlanets.sort((a, b) => b[objOrder.column] - a[objOrder.column]);
  return sorted;
}
