async function fetchPlanets() {
  // try {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();
  data.results.forEach((obj) => delete obj.residents);
  return data.results;
  // } catch (e) {
  //   throw new Error(e.detail);
  // }
}

export default fetchPlanets;
