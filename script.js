import { errorColor, removeErrorColor, errorImg } from './modules/error.js'

const searchForm = document.querySelector('[name=searchForm]')
const pokemonName = document.querySelector('[name=pokemonName]')
const pokemonNbr = document.querySelector('input[name=pokemonNbr]')
const pokemonImg = document.querySelector('.card__image')
const statsNbr = document.querySelectorAll('.card__statsNbr p')
const inputs = document.querySelectorAll('input[type=text]')
const endpointPokebuild = 'https://pokebuildapi.fr/api/v1/pokemon/'

// on desactive la fonction d'envoie du formulaire
searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
})

/**
 * on modifie la valeur de notre element
 * @param {Element} element
 * @param {string} value
 */
function setValue(element, value) {
  element.value = value
}

async function getPokemonByName(pokemon) {
  const url = endpointPokebuild + pokemon
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
    if (response.status === 500) {
      errorColor(inputs)
      errorImg(pokemonImg)
    }
    throw new Error(`${response.status}: ${response.statusText}`)
  }
  const data = await response.json()
  removeErrorColor(inputs)
  return data
}

/**
 * modifie les stats pour correspondre au pokemon selectionne
 * @param {Array|NodeList} arrayElements
 * @param {Array} arrayValues
 */
function setStats(arrayElements, arrayValues) {
  arrayElements.forEach((element, key) => {
    element.innerText = arrayValues[key]
  })
}

inputs.forEach((element) => {
  element.addEventListener('blur', (event) => {
    getPokemonByName(element.value)
      .then((data) => {
        pokemonNbr.value = data.id
        pokemonName.value = data.name
        pokemonImg.src = data.image
        setStats(statsNbr, Object.values(data.stats))
      })
      .catch((error) => {
        console.log(error)
      })
  })
})
