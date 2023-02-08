/**
 * ajoute un text-shadow au titre et au nombre pour signifier que ce
 * pokemon ou que l id est faux
 * @param {Array|NodeList} arrayElement
 */
export function errorColor (arrayElement) {
  arrayElement.forEach((element) => {
    element.classList.add('error-text')
  })
}

export function removeErrorColor (arrayElement) {
  arrayElement.forEach((element) => {
    element.classList.remove('error-text')
  })
}

export function errorImg (element) {
  element.src = './images/interrogation.png'
}
