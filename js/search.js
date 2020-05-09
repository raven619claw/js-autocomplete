export default (query, mock) => {
  const results = []
  //loop over mock arr
  mock.map((obj) => {
    if (search(query.toLowerCase(), obj)) {
      //if found in string then add to results arr
      results.push(obj)
    }
  })
  return results
}

const search = (query, object) => {
  var flag = false
  //recursively check if any key value pair matches the query
  Object.keys(object).map((key) => {
    if (typeof object[key] == "object") {
      flag = flag || !!search(query, object[key])
    } else {
      var string = object[key].toString().toLowerCase()
      flag = flag || string.indexOf(query) > -1
    }
  })
  return flag
}
window.search = search
