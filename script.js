import { errorColor, removeErrorColor, errorImg } from './modules/error.js'
import { getPokemonByName } from './modules/api.js'
import { Pokemon } from './modules/pokemon.js'
import { newElement, setTypes, subtitleColor, cardColor, statsColor } from './modules/text.js'

const searchForm = document.querySelector('[name=searchForm]')
const pokemonName = document.querySelector('[name=pokemonName]')
const pokemonNbr = document.querySelector('input[name=pokemonNbr]')
const pokemonImg = document.querySelector('.card__image')
const statsNbr = document.querySelectorAll('.card__statsNbr p')
const inputs = document.querySelectorAll('input[type=text]')
const type = document.querySelector('.card__type')
const endpointPokebuild = 'https://pokebuildapi.fr/api/v1/pokemon/'
const endpointPokeapi = 'https://pokeapi.co/api/v2/pokemon-species/'


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

function test (pokemon) {
  const pok = new Pokemon(pokemon)
  setTypes(type, pok.types)
  subtitleColor(pok.types[0])
  statsColor(pok.types[0])
  cardColor(pok.types[0])
  
}

inputs.forEach((element) => {
  element.addEventListener('blur', (event) => {
    getPokemonByName(endpointPokebuild, element.value)
      .then((data) => {
        test(data)
        pokemonNbr.value = data.id
        pokemonName.value = data.name
        pokemonImg.src = data.image
        removeErrorColor(inputs)
        setStats(statsNbr, Object.values(data.stats))
      })
      .catch((error) => {
        errorColor(inputs)
        errorImg(pokemonImg)
        
        console.log(error)
      })
  })
})
