import {
  addRemoveClassOnElement,
  scrollIntoView,
  clearActiveFromAll,
  splitString,
  splitList,
  getSideResultHtml,
  getMainResultHtml,
} from "./utils.js"

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
    div.innerHTML = getMainResultHtml(obj, query)
    resultList.appendChild(div)
  })
  //add divider between main and side results
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
    div.innerHTML = getSideResultHtml(obj, query)
    resultList.appendChild(div)
  })
  bindKeyboardMouseEvent()
}

//fn to handle mouse over and keyboard events for navigation
const bindKeyboardMouseEvent = () => {
  const resultList = document.querySelector(".result-list")
  resultList.addEventListener("mouseover", (e) => {
    const target = e.target
    if (target.classList.contains("result")) {
      clearActiveFromAll()
      addRemoveClassOnElement("active", target, true)
    } else {
      return
    }
  })
  resultList.addEventListener("mouseleave", (e) => {
    clearActiveFromAll()
  })
  document.removeEventListener("keyup", arrowEvent)
  document.addEventListener("keyup", arrowEvent)
}

const arrowEvent = (e) => {
  if (e.keyCode == "38") {
    // up arrow
    arrowAction(false)
  } else if (e.keyCode == "40") {
    // down arrow
    arrowAction(true)
  }
}
const arrowAction = (flag = false) => {
  const inputQuery = document.querySelector("#query")
  const inputValueLen = inputQuery.value.length
  inputQuery.blur()
  moveActiveElementUpDown(flag)
  inputQuery.setSelectionRange(inputValueLen, inputValueLen)
  inputQuery.focus()
}
//based on active element move selection up or down
const moveActiveElementUpDown = (flag) => {
  const allResults = document.querySelectorAll(".result")
  //flag:true go down
  //flag:false go up
  let { indexSelected } = getActiveResult()
  const toActiveElementIndex = flag ? indexSelected + 1 : indexSelected - 1
  const resultsArray = Array.from(allResults)
  const totalResults = resultsArray.length
  let newActive = null
  clearActiveFromAll()
  if (flag && toActiveElementIndex == totalResults) {
    addRemoveClassOnElement("active", resultsArray[0], true)
    newActive = resultsArray[0]
  } else if (!flag && toActiveElementIndex < 0) {
    addRemoveClassOnElement("active", resultsArray[totalResults - 1], true)
    newActive = resultsArray[totalResults - 1]
  } else {
    resultsArray.map((element, index) => {
      if (toActiveElementIndex === index) {
        addRemoveClassOnElement("active", element, true)
        newActive = element
      }
    })
  }
  scrollIntoView(newActive)
}

//get the currently selected result
const getActiveResult = () => {
  const allResults = document.querySelectorAll(".result")
  let indexSelected = -1
  let elementSelected = null
  Array.from(allResults).map((element, index) => {
    if (element.classList.contains("active")) {
      indexSelected = index
      elementSelected = element
    }
  })
  return {
    indexSelected,
    elementSelected,
  }
}

export default renderList
