import { getPokemonByName } from './api.js'


export class Pokemon {
  constructor(data) {
    this.name = data.name
    this.id = data.id
    this.height = data.height
    this.weight = data.weight
    this.description = data.description

    this.types = data.apiTypes.reverse().map((obj) => obj.name)
    this.img = data.image
    this.hp = data.stats.HP
    this.atk = data.stats.attack
    this.defense = data.stats.defense
    this.special_attack = data.stats.special_attack
    this.special_defense = data.stats.special_defense
    this.spd = data.stats.speed

   
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
