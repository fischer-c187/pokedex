const subtitles = document.querySelectorAll('.subtitle')
const cards = document.querySelectorAll('.card')
const statsTag = document.querySelectorAll('.card__statsTag p')

export function newElement (balise, value, classList) {
  const element = document.createElement(balise)
  element.innerText = value
  element.className = classList.join(' ')
  return element
}

export function setTypes (parent, types) {
  parent.innerHTML = ''
  for(let element of types){
    parent.append(newElement('div', element, ['card__typeTag', `${element.toLowerCase()}--bgColor`]))
  }
}

export function subtitleColor (type) {
  subtitles.forEach(element => {
    element.setAttribute("class", `card__subtitle subtitle ${type.toLowerCase()}--color`)
  })
}

export function cardColor (type) {
  cards.forEach(element => {
    element.setAttribute("class", `card ${type.toLowerCase()}--bgColor`)
  })
}

export function statsColor (type) {
  statsTag.forEach(element => {
    element.setAttribute("class", `${type.toLowerCase()}--color`)
  })
}