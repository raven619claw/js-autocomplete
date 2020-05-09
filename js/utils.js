export const insertHtmlbyClassName = (className, htmlString) => {
  if (className[0] !== ".") {
    className = "." + className
  }
  let element = document.querySelectorAll(className)[0]
  element.innerHTML = htmlString
}

export const addRemoveClassOnElement = (className, element, flag) => {
  if (flag) {
    element.classList.add(className)
  } else {
    element.classList.remove(className)
  }
}
export const appendElementByClassName = (className, element) => {
  if (className[0] !== ".") {
    className = "." + className
  }
  let container = document.querySelectorAll(className)[0]
  container.append(element)
}
