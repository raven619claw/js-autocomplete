import { addRemoveClassOnElement } from "./utils.js"
import mockData from "./mock.js"
import search from "./search.js"
import renderList from "./renderList.js"
const resultList = document.querySelector(".result-list")
const closeIcon = document.querySelector(".close-icon")
const init = () => {
  const inputQuery = document.querySelector("#query")
  //store the previous input
  let prevInput = ""
  //store if previous input had results
  let hasPrevResults = false
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
          showHideNoUserErr(true, noResults)
          // hasPrevResults = false
        }
        prevInput = inputValue
        return
      }
      //else clear no users err
      showHideNoUserErr(false, noResults)
      //if results are found render the list with data
      renderList(inputValue, searchResult)
      hasPrevResults = true
    }
    //update var to match input next time
    prevInput = inputValue
  })
}
init()
const showHideNoUserErr = (flag, noResults) => {
  addRemoveClassOnElement("show", noResults, flag)
  addRemoveClassOnElement("visible", resultList, flag)
  addRemoveClassOnElement("show", closeIcon, flag)
}
