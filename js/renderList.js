import { addRemoveClassOnElement } from "./utils.js"

const resultList = document.querySelector(".result-list")
const closeIcon = document.querySelector(".close-icon")
//on close click render empty list and clear input
closeIcon.addEventListener("click", () => {
  renderList("", [], true)
  document.querySelector("#query").value = ""
  addRemoveClassOnElement("show", closeIcon)
})
const renderList = (query, list, resetFlag) => {
  resultList.innerHTML = "<div class='no-results'>No users found</div>"
  //on reset empty the list
  if (resetFlag) {
    addRemoveClassOnElement("show", closeIcon)
    addRemoveClassOnElement("visible", resultList)
    return
  }
  //else show list and close btn
  addRemoveClassOnElement("visible", resultList, true)
  addRemoveClassOnElement("show", closeIcon, true)
  //split list into main results from name,id
  //and side results from other keys
  const { mainList, sideList } = splitList(query, list)
  //loop over result and create list to render
  mainList.map((obj) => {
    const div = document.createElement("div")
    addRemoveClassOnElement("result", div, true)
    let { name, id, address } = obj

    //find index from strings to highlight query input
    const [nameStrStart, nameStrEnd] = splitString(name, query)
    const [idStrStart, idStrEnd] = splitString(id, query)
    div.innerHTML = `
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
    resultList.appendChild(div)
  })
  const div = document.createElement("div")
  div.innerHTML = `"${query}" found in items`
  addRemoveClassOnElement("divider", div, true)
  if (sideList.length) {
    resultList.appendChild(div)
  }
  //render other results
  sideList.map((obj) => {
    const div = document.createElement("div")
    addRemoveClassOnElement("result", div, true)
    let { name, id, address } = obj
    const [addressStrStart, addressStrEnd] = splitString(address, query)
    div.innerHTML = `
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
    resultList.appendChild(div)
  })
}
//finds index to split string for given sub string
const splitString = (string, subString) => {
  const str1End = string.toLowerCase().indexOf(subString.toLowerCase())
  if (str1End == -1) {
    return [string.length, string.length]
  }
  const str2Start = str1End + subString.length

  return [str1End, str2Start]
}
//split results list based on main keys(name,id)
const splitList = (query, list) => {
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

export default renderList
