const subtitles = document.querySelectorAll('.subtitle')
const cards = document.querySelectorAll('.card')
const statsTag = document.querySelectorAll('.card__statsTag p')
const height = document.querySelectorAll('.height')
const weight = document.querySelectorAll('.weight')
const description = document.querySelectorAll('.card__descriptionText')
const bar = document.querySelectorAll('.bar')

export function newElement (balise, value, classList) {
  const element = document.createElement(balise)
  element.innerText = value
  element.className = classList.join(' ')
  return element
}

export function setHeight (value) {
  height.forEach(element => {
    element.innerText = `${value} m`
  })
}

export function setWeight (value) {
  weight.forEach(element => {
    element.innerText = `${value} kg`
  })
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

export function setDescription (value) {
  description.forEach(element => {
    element.innerText = value
  })
}

export function setBar (stats, type) {
  bar.forEach( (element, key) => {
    element.setAttribute('class', `card__bar bar bar--${type.toLowerCase()}`)
    element.firstElementChild.setAttribute('class', `card__barProgress bar__progress ${type.toLowerCase()}--bgColor`)
    element.firstElementChild.style.width = (stats[key] / 3).toString() + '%'
  })
}