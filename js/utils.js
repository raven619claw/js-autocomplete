export const addRemoveClassOnElement = (className, element, flag) => {
  if (flag) {
    element.classList.add(className)
  } else {
    element.classList.remove(className)
  }
}
export const scrollIntoView = (element) => {
  element.scrollIntoView(false)
}
export const clearActiveFromAll = () => {
  const allResults = document.querySelectorAll(".result")
  Array.from(allResults).map((element) => {
    addRemoveClassOnElement("active", element)
  })
}

//finds index to split string for given sub string
export const splitString = (string, subString) => {
  const str1End = string.toLowerCase().indexOf(subString.toLowerCase())
  if (str1End == -1) {
    return [string.length, string.length]
  }
  const str2Start = str1End + subString.length

  return [str1End, str2Start]
}

//split results list based on main keys(name,id)
export const splitList = (query, list) => {
  const mainList = []
  const sideList = []
  list.map((obj) => {
    const { name, id } = obj
    if (
      name.toLowerCase().indexOf(query) > -1 ||
      id.toLowerCase().indexOf(query) > -1
    ) {
      mainList.push(obj)
    } else {
      sideList.push(obj)
    }
  })
  return { mainList, sideList }
}

export const getMainResultHtml = (obj, query) => {
  let { name, id, address } = obj
  //find index from strings to highlight query input
  const [nameStrStart, nameStrEnd] = splitString(name, query)
  const [idStrStart, idStrEnd] = splitString(id, query)
  return `
  <div class='item-id'>${id.slice(
    0,
    idStrStart
  )}<span class='selected'>${id.slice(idStrStart, idStrEnd)}</span>${id.slice(
    idStrEnd
  )}</div>
  <div class='item-name'>${name.slice(
    0,
    nameStrStart
  )}<span class='selected'>${name.slice(
    nameStrStart,
    nameStrEnd
  )}</span>${name.slice(nameStrEnd)}</div>
  <div class='item-address'>${address}</div>
  `
}
export const getSideResultHtml = (obj, query) => {
  let { name, id, address } = obj
  const [addressStrStart, addressStrEnd] = splitString(address, query)
  return `
  <div class='item-id'>${id}</div>
  <div class='item-name'>${name}</div>
  <div class='item-address'>${address.slice(
    0,
    addressStrStart
  )}<span class='selected'>${address.slice(
    addressStrStart,
    addressStrEnd
  )}</span>${address.slice(addressStrEnd)}</div>
  `
}
