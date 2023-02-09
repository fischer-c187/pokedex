const endpoint = [
  'https://pokebuildapi.fr/api/v1/pokemon/',
  'https://pokeapi.co/api/v2/pokemon-species/',
  'https://pokeapi.co/api/v2/pokemon/',
]

export async function getAllData(pokemon) {
  let id = 0

  let data = await getData(endpoint[0] + pokemon)
  id = data.id

  let data1 = await getData(endpoint[1] + id)

  data.description = data1.flavor_text_entries
    .find((val) => val.language.name === 'fr')
    .flavor_text.replaceAll('\n', ' ')

  data1 = await getData(endpoint[2] + id)

  data.height = data1.height / 10
  data.weight = data1.weight / 10

  return data
}

export function getPokemonByName(endpoint, pokemon) {
  const url = endpoint + pokemon
  return getData(url)
}

/**
 * interroge l api et retourne nos datas sous forme de json
 * @param {string} url
 * @returns {JSON}
 */
async function getData(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`)
  }
  return response.json()
}
