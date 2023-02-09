export async function getPokemonByName(endpoint, pokemon) {
  const url = endpoint + pokemon
  return getData(url)
}

/**
 * interroge l api et retourne nos datas sous forme de json
 * @param {string} url
 * @returns {JSON}
 */
async function getData (url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`)
  }
  const data = await response.json()
  return data
}