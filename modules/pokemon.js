import { getPokemonByName } from './api.js'
const endpointPokeapi = 'https://pokeapi.co/api/v2/pokemon/'
const endpointSpecies = 'https://pokeapi.co/api/v2/pokemon-species/'

export class Pokemon {
  constructor(data) {
    this.name = data.name
    this.id = data.id
    this.types = data.apiTypes.reverse().map((obj) => obj.name)
    this.img = data.image
    this.hp = data.stats.HP
    this.atk = data.stats.attack
    this.defense = data.stats.defense
    this.special_attack = data.stats.special_attack
    this.special_defense = data.stats.special_defense
    this.spd = data.stats.speed

    // on initialise nos variables a zero, en cas d'erreur ou si notre appel dure trop
    // longtemps cela ne provoquera pas d'erreur
    this.height = 0
    this.weight = 0
    this.description = ''
    this.#getDescription()
    this.#getHeightWeight()
  }

  // on va chercher dans une autre api les informations manquantes
  // ici la taille et le poids
  #getHeightWeight() {
    getPokemonByName(endpointPokeapi, this.id)
      .then((data) => {
        this.height = data.height / 10
        this.weight = data.weight / 10
      })
      .catch((error) => {
        this.height = 0
        this.weight = 0
        console.log(error)
      })
  }

  // recuperation de la description du pokemon
  #getDescription() {
    getPokemonByName(endpointSpecies, this.id)
      .then((data) => {
        this.description = data.flavor_text_entries
          .find((val) => val.language.name === 'fr')
          .flavor_text.replaceAll('\n', ' ')
      })
      .catch((error) => {
        console.log(error)
        return 'Error pokeApi'
      })
  }

  get stats() {
    return [
      this.hp,
      this.atk,
      this.defense,
      this.special_attack,
      this.special_defense,
      this.spd
    ]
  }
}
