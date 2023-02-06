const searchForm = document.querySelector('[name=searchForm]')
const pokemonName = document.querySelector('[name=pokemonName]')
const pokemonNbr = document.querySelector('input[name=pokemonNbr]')
const pokemonImg = document.querySelector('.card__image')
const statsNbr = document.querySelectorAll('.card__statsNbr p')

// on desactive la fonction d'envoie du formulaire
searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
})

pokemonName.addEventListener('blur', (event) => {
  getPokemonByName(pokemonName.value)
    .then(data => {
      pokemonNbr.value = data.id
      pokemonName.value = data.name
      pokemonImg.src = data.image
      for (let i in statsNbr){ 
        statsNbr[i].innerText = Object.values(data.stats)[i]
      }
    })
    .catch (error => { 
      console.log(error)
    })
})

pokemonNbr.addEventListener('blur', (event) => {
  getPokemonByName(pokemonNbr.value)
  .then((data) => {
    pokemonNbr.value = data.id
    pokemonName.value = data.name
    pokemonImg.src = data.image
    for (let i in statsNbr){ 
      statsNbr[i].innerText = Object.values(data.stats)[i]
    }
  })
})

const getPokemonByName = async (pokemon) => {
  const url = `https://pokebuildapi.fr/api/v1/pokemon/${pokemon}`
  try {
    const pokemonReturn = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!pokemonReturn.ok) {
      if (pokemonReturn.status === 500) {
        pokemonName.style.color = 'red'
      }
      throw new Error(`${pokemonReturn.status}: ${pokemonReturn.statusText}`)
    } else {
      const data = await pokemonReturn.json()
      pokemonName.style.color = pokemonName.style.color === 'red' ? null : null
      return data
    }
  } catch (err) {
    console.error("Erreur lors de la requete vers l'API : ", err)
  }
}
