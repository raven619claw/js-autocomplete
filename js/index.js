import { addRemoveClassOnElement } from "./utils.js"
import mockData from "./mock.js"
import search from "./search.js"
import renderList from "./renderList.js"
const resultList = document.querySelector(".result-list")
const closeIcon = document.querySelector(".close-icon")
const inputQuery = document.querySelector("#query")
//added this to prevent cursor movement for arrow keys
inputQuery.addEventListener("keydown", (e) => {
  if (e.keyCode == "38" || e.keyCode == "40") {
    e.preventDefault()
    return
  }
})

const init = () => {
  //store the previous input
  let prevInput = ""
  //store if previous input had results
  let hasPrevResults = false
  //on focus show list if previous input was valid
  inputQuery.addEventListener("focus", (e) => {
    if (prevInput && hasPrevResults) {
      addRemoveClassOnElement("visible", resultList, true)
      addRemoveClassOnElement("show", closeIcon, true)
    }
  })
  //on close click render empty list and clear input
  closeIcon.addEventListener("click", () => {
    renderList("", [], true)
    document.querySelector("#query").value = ""
    addRemoveClassOnElement("show", closeIcon)
    prevInput = ""
    hasPrevResults = false
  })
  //on clicking outside close list
  document.querySelector("body").addEventListener("click", (e) => {
    const noResults = document.querySelector(".no-results")
    if (e.target == e.currentTarget) {
      addRemoveClassOnElement("show", noResults)
      addRemoveClassOnElement("visible", resultList)
      addRemoveClassOnElement("show", closeIcon)
    }
  })
  //on every key input run listener to fetch new results and update
  //can add throttle here if results were fetched from API
  inputQuery.addEventListener("keyup", (e) => {
    const noResults = document.querySelector(".no-results")
    const inputValue = e.target.value.trim() || ""
    //if input is different than previous input
    if (
      prevInput != inputValue
      // can add check to provide results only if minimum str length is reached
      // && inputValue.length > 3
    ) {
      resultList.scrollTop = 0
      //if input is empty render empty list
      if (inputValue == "") {
        renderList("", [], true)
        hasPrevResults = false
        prevInput = inputValue
        return
      }
      //else fetch results
      const searchResult = search(inputValue, mockData)
      //if no results are found
      if (!searchResult.length) {
        //and if there were no previous results
        if (!hasPrevResults) {
          //then show no users found error
          //pass no results as it is dynamically generated
          showHideNoUserErr(true)
          // hasPrevResults = false
        }
        prevInput = inputValue
        return
      }
      //else clear no users err
      showHideNoUserErr(false)
      //if results are found render the list with data
      renderList(inputValue, searchResult)
      hasPrevResults = true
    }
    //update var to match input next time
    prevInput = inputValue
  })
}
init()
const showHideNoUserErr = (flag) => {
  const noResults = document.querySelector(".no-results")
  addRemoveClassOnElement("show", noResults, flag)
  addRemoveClassOnElement("visible", resultList, flag)
  addRemoveClassOnElement("show", closeIcon, flag)
}
