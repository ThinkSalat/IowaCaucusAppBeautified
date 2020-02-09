// COpy and past the following into the console of your browser to get the data. use JSON.stringify(results) if you want to copy the results. 

const [precinctTable] = document.getElementsByClassName('precinct-table')

const [thead] = precinctTable.getElementsByClassName('thead')

const [subHead] = precinctTable.getElementsByClassName('sub-head')


const getHeaders = index => {
  let header = thead.childNodes[index + 1].innerText
  const subHeader = subHead.childNodes[index + 1].innerText
  return {
    header,
    subHeader
  }
}

const results = [...thead.childNodes].reduce( (obj, { innerHTML }) => {
  if (['', 'County', 'Precinct'].includes(innerHTML)) return obj
  obj[innerHTML] = {}
  return obj
}, {});

precinctTable.childNodes.forEach( (precinctRow, pctRow) => {
  if (pctRow < 4) return
  const [countyEl, precinctRowData] = precinctRow.childNodes
  const county = countyEl.innerText
  if (!county) return
  Object.keys(results).forEach( name => {
    results[name][county] = results[name][county] || {}
  })

  precinctRowData.childNodes.forEach( countyNode => {
    const precinct = countyNode.childNodes[0].innerText
    if (!precinct) return
    Object.keys(results).forEach( name => {
      results[name][county][precinct] = results[name][county][precinct] || { }
    })
    let candidate
    countyNode.childNodes.forEach( (precinctNode, index) => {
      const { header, subHeader } = getHeaders(index)
      if ([ 'Precinct', 'County'].includes(header)) return
      candidate = header || candidate
      results[candidate][county][precinct][subHeader] = precinctNode.innerText
    })
  })
})

console.log(results);