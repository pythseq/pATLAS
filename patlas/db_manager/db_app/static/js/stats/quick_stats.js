//********//
// PLOTLY //
//********//
// function to parse stats //

const statsParser = (masterObj, layout, autobinxVar, customColor, sortAlp, sortVal) => {
  console.log("master", masterObj)
  $("#progressBar").hide()
  $("#progressDiv").hide()
  $("#chartContainer1").show()

  // parse the final array
  // here it assures that sorts are made just once
  const finalArray = (sortAlp === true) ? masterObj.sort() : (sortVal === true) ? arraytByValue(masterObj) : masterObj

  // by default species are executed when opening stats visualization
  const data = [{
    x: finalArray,
    type: "histogram",
    autobinx: autobinxVar,
    xbins: {
      start: Math.min(...finalArray),  //... spread operator allows to pass
      // args in array to function
      end: Math.max(...finalArray),
      size: 10000
    },
    marker: {
      color: customColor,
    }
  }]
  Plotly.newPlot("chartContainer1", data, layout)
}

const resetProgressBar = () => {
  // resets progressBar
  $("#actualProgress").width("0%") // sets the width to 0 at each interaction
  $("#progressBar").show()
  $("#progressDiv").show()
  $("#chartContainer1").hide()
}

// const getMetadataSpecies = (data, tempList, speciesList, sortAlp, sortVal) => {
//   // this request uses nested json object to access json entries
//   // available in the database
//   // if request return no speciesName or plasmidName
//   // sometimes plasmids have no descriptor for one of these or both
//   const speciesName = (data.json_entry.name === null) ?
//     "unknown" : data.json_entry.name.split("_").join(" ")
//   // push to main list to control the final of the loop
//   speciesList.push(speciesName)
//   // constructs the speciesObject object that counts the number of
//   // occurrences of a species
//   // if (!(speciesName in speciesObject)) {
//   //   speciesObject[speciesName] = 1
//   // } else {
//   //   speciesObject[speciesName] = speciesObject[speciesName] + 1
//   // }
//   // if speciesList reaches the size of accessions given to tempList
//   // EXECUTE STATS
//   const layout = {
//     yaxis: {
//       title: "Number of selected plasmids"
//     },
//     xaxis: {
//       title: "Species",
//       tickangle: -45
//     },
//     title: "Species in selection",
//     margin: {
//       b: 200,
//       l: 100
//     }
//   }
//   console.log("speciesList", speciesList)
//   if (speciesList.length === tempList.length) { statsParser(speciesList, layout, true, "#B71C1C", sortAlp, sortVal) }
//   return speciesList
// }

// const getMetadataGenus = (data, tempList, genusList, sortAlp, sortVal) => {
//   // this request uses nested json object to access json entries
//   // available in the database
//   // if request return no genusName or plasmidName
//   // sometimes plasmids have no descriptor for one of these or both
//   // replace [ and ' by nothing for proper display
//   const genusName = (data.json_entry.taxa === "unknown") ?
//     "unknown" : data.json_entry.taxa.split(",")[0].replace(/['[]/g, "")
//   // push to main list to control the final of the loop
//   genusList.push(genusName)
//   // if genusList reaches the size of accessions given to tempList
//   // EXECUTE STATS
//   const layout = {
//     yaxis: {
//       title: "Number of selected plasmids"
//     },
//     xaxis: {
//       title: "Genera",
//       tickangle: -45
//     },
//     title: "Genera in selection",
//     margin: {
//       b: 200,
//       l: 100
//     }
//   }
//   if (genusList.length === tempList.length) { statsParser(genusList, layout, true, "red", sortAlp, sortVal) }
//   return genusList
//
// }
//
// const getMetadataFamily = (data, tempList, familyList, sortAlp, sortVal) => {
//   // this request uses nested json object to access json entries
//   // available in the database
//   // if request return no genusName or plasmidName
//   // sometimes plasmids have no descriptor for one of these or both
//   // replace ' by nothing for proper display
//   const familyName = (data.json_entry.taxa === "unknown") ?
//     "unknown" : data.json_entry.taxa.split(",")[1].replace(/[']/g, "")
//   // push to main list to control the final of the loop
//   familyList.push(familyName)
//   // if familyList reaches the size of accessions given to tempList
//   // EXECUTE STATS
//   const layout = {
//     yaxis: {
//       title: "Number of selected plasmids"
//     },
//     xaxis: {
//       title: "Families",
//       tickangle: -45
//     },
//     title: "Families in selection",
//     margin: {
//       b: 200,
//       l: 100
//     }
//   }
//   if (familyList.length === tempList.length) { statsParser(familyList, layout, true, "#FF5722", sortAlp, sortVal) }
//   return familyList
// }
//
// const getMetadataOrder = (data, tempList, orderList, sortAlp, sortVal) => {
//   // this request uses nested json object to access json entries
//   // available in the database
//   // if request return no genusName or plasmidName
//   // sometimes plasmids have no descriptor for one of these or both
//   // replace ' by nothing for proper display
//   const orderName = (data.json_entry.taxa === "unknown") ?
//     "unknown" : data.json_entry.taxa.split(",")[2].replace(/['\]]/g, "")
//   // push to main list to control the final of the loop
//   orderList.push(orderName)
//   // EXECUTE STATS
//   const layout = {
//     yaxis: {
//       title: "Number of selected plasmids"
//     },
//     xaxis: {
//       title: "Orders",
//       tickangle: -45
//     },
//     title: "Orders in selection",
//     margin: {
//       b: 200,
//       l: 100
//     }
//   }
//   if (orderList.length === tempList.length) { statsParser(orderList, layout, true, "orange", sortAlp, sortVal) }
//   return orderList
// }
//
// const getMetadataLength = (data, tempList, lengthList, sortAlp, sortVal) => {
//   // this request uses nested json object to access json entries
//   // available in the database
//
//   // get data for length
//   const speciesLength = (data.json_entry.length === null) ?
//     "unknown" : data.json_entry.length
//   // push to main list to control the final of the loop
//   lengthList.push(speciesLength)
//   // EXECUTE STATS
//   const layout = {
//     yaxis: {
//       title: "Number of selected plasmids"
//     },
//     xaxis: {
//       title: "Length",
//       tickangle: -45
//     },
//     title: "Lengths in selection",
//     margin: {
//       b: 200,
//       l: 100
//     }
//   }
//   if (lengthList.length === tempList.length) { statsParser(lengthList, layout, false, "#2196F3", sortAlp, sortVal) }
//   return lengthList
// }

// function equivalent to getMetadata but for Database db (plasmidfinder db)
const getMetadataPF = (tempList, taxaType, sortAlp, sortVal) => {
  // resets progressBar
  resetProgressBar()

  let PFList = []

  for (const item in tempList) {
    if ({}.hasOwnProperty.call(tempList, item)) {
      const nodeId = tempList[item]
      $.get("api/getplasmidfinder/", {"accession": nodeId}, (data, status) => {
        // for each instance of item update progressBar
        progressBarControl(parseInt(item) + 1, tempList.length)
        // this request uses nested json object to access json entries
        // available in the database

        // get data for length
        const pfName = (data.json_entry.gene === null) ?
          "unknown" : data.json_entry.gene.replace(/['u\[\] ]/g, "").split(",")

        //then if unknown can push directly to array
        if (pfName === "unknown") {
          PFList.push(pfName)
        } else {
          // otherwise needs to parse the array into an array
          for (const i in pfName) { PFList.push(pfName[i]) }
        }

        // EXECUTE STATS
        const layout = {
          yaxis: {
            title: "Number of selected plasmids"
          },
          xaxis: {
            title: "plasmid families genes",
            tickangle: -45
          },
          title: "plasmid families in selection (from plasmidfinder database)",
          margin: {
            b: 200,
            l: 100
          }
        }
        if (PFList.length === tempList.length) { statsParser(PFList, layout, true, "#2196F3", sortAlp, sortVal) }
        return PFList
      })
    }
  }
}

// function equivalent to getMetadata but for Card db
const getMetadataRes = (tempList, taxaType, sortAlp, sortVal) => {
  // TODO this should plot resfinder and card seperately
  // resets progressBar
  resetProgressBar()

  let resList = []

  for (const item in tempList) {
    if ({}.hasOwnProperty.call(tempList, item)) {
      const nodeId = tempList[item]
      $.get("api/getresistances/", {"accession": nodeId}, (data, status) => {
        // for each instance of item update progressBar
        progressBarControl(parseInt(item) + 1, tempList.length)
        // this request uses nested json object to access json entries
        // available in the database

        // get data for length
        const pfName = (data.json_entry.gene === null) ?
          "unknown" : data.json_entry.gene.replace(/['u\[\] ]/g, "").split(",")

        //then if unknown can push directly to array
        if (pfName === "unknown") {
          resList.push(pfName)
        } else {
          // otherwise needs to parse the array into an array
          for (const i in pfName) { resList.push(pfName[i]) }
        }

        // EXECUTE STATS
        const layout = {
          yaxis: {
            title: "Number of selected plasmids"
          },
          xaxis: {
            title: "resistance genes",
            tickangle: -45
          },
          title: "resistance genes in selection (from card + resfinder database)",
          margin: {
            b: 200,
            l: 100
          }
        }
        if (resList.length === tempList.length) { statsParser(resList, layout, true, "#2196F3", sortAlp, sortVal) }
        return resList
      })
    }
  }
}

//**********************//
//*** MAIN FUNCTIONS ***//
//**********************//

// metadata handler function

const getMetadata = (tempList, taxaType, sortAlp, sortVal) => {
  // resets progressBar
  resetProgressBar()
  let taxaList = []
  let speciesList = []
  let promises = []
  // const speciesObject = {}
  for (const item in tempList) {
    if ({}.hasOwnProperty.call(tempList, item)) {
      const nodeId = tempList[item]
      promises.push(
        // query used to push to promise the data
        $.get("api/getspecies/", {"accession": nodeId}, (data, status) => {
          // for each instance of item update progressBar
          progressBarControl(parseInt(item) + 1, tempList.length)
          // then do everything else
          // taxaList = (taxaType === "species") ?
          //   getMetadataSpecies(data, tempList, taxaList, sortAlp, sortVal) :
          //   (taxaType === "genus") ?
          //     getMetadataGenus(data, tempList, taxaList, sortAlp, sortVal) :
          //     (taxaType === "family") ?
          //       getMetadataFamily(data, tempList, taxaList, sortAlp, sortVal) :
          //       (taxaType === "order") ?
          //         getMetadataOrder(data, tempList, taxaList, sortAlp, sortVal) :
          //         // (taxaType === "length") ?
          //         // here i reused the names but it is not actually a taxa List but
          //         // rather a generic list
          //         // here it is assumed that taxaType is "length"
          //         getMetadataLength(data, tempList, taxaList, sortAlp, sortVal)
        })
      )
    }
  }
  // waits for all promises to finish and then execute functions that will
  // render the graph
  Promise.all(promises)
    .then((results) => {
      results.map(result => {
        console.log("taxaList2", taxaType, taxaList, result)
        if (taxaType === "species") {
          const speciesName = (result.json_entry.name === null) ?
            "unknown" : result.json_entry.name.split("_").join(" ")
          // push to main list to control the final of the loop
          speciesList.push(speciesName)
        } else if (taxaType === "genus") {
          const genusName = (result.json_entry.taxa === "unknown") ?
            "unknown" : result.json_entry.taxa.split(",")[0].replace(/['[]/g, "")
          // push to main list to control the final of the loop
          speciesList.push(genusName)
        } else if (taxaType === "family") {
          const familyName = (result.json_entry.taxa === "unknown") ?
            "unknown" : result.json_entry.taxa.split(",")[1].replace(/[']/g, "")
          speciesList.push(familyName)
        } else if (taxaType === "order") {
          const orderName = (result.json_entry.taxa === "unknown") ?
            "unknown" : result.json_entry.taxa.split(",")[2].replace(/['\]]/g, "")
          speciesList.push(orderName)
        } else {
          const speciesLength = (result.json_entry.length === null) ?
            "unknown" : result.json_entry.length
          speciesList.push(speciesLength)
          // assumes that it is length by default
        }
      })
      // execute some function
      if (taxaType === "species") {
        console.log("after then", speciesList)
        const layout = {
          yaxis: {
            title: "Number of selected plasmids"
          },
          xaxis: {
            title: "Species",
            tickangle: -45
          },
          title: "Species in selection",
          margin: {
            b: 200,
            l: 100
          }
        }
        // assures that speciesList is fully generated before instanciating
        // plotly
        if (speciesList.length === tempList.length) { statsParser(speciesList, layout, true, "#B71C1C", sortAlp, sortVal) }
      } else if (taxaType === "genus") {
        const layout = {
          yaxis: {
            title: "Number of selected plasmids"
          },
          xaxis: {
            title: "Genera",
            tickangle: -45
          },
          title: "Genera in selection",
          margin: {
            b: 200,
            l: 100
          }
        }
        // assures that speciesList is fully generated before instanciating
        // plotly
        if (speciesList.length === tempList.length) { statsParser(speciesList, layout, true, "red", sortAlp, sortVal) }
      } else if (taxaType === "family") {
        const layout = {
          yaxis: {
            title: "Number of selected plasmids"
          },
          xaxis: {
            title: "Families",
            tickangle: -45
          },
          title: "Families in selection",
          margin: {
            b: 200,
            l: 100
          }
        }
        // assures that speciesList is fully generated before instanciating
        // plotly
        if (speciesList.length === tempList.length) { statsParser(speciesList, layout, true, "#FF5722", sortAlp, sortVal) }
      } else if (taxaType === "order") {
        const layout = {
          yaxis: {
            title: "Number of selected plasmids"
          },
          xaxis: {
            title: "Orders",
            tickangle: -45
          },
          title: "Orders in selection",
          margin: {
            b: 200,
            l: 100
          }
        }
        // assures that speciesList is fully generated before instanciating
        // plotly
        if (speciesList.length === tempList.length) { statsParser(speciesList, layout, true, "orange", sortAlp, sortVal) }
      } else {
        const layout = {
          yaxis: {
            title: "Number of selected plasmids"
          },
          xaxis: {
            title: "Length",
            tickangle: -45
          },
          title: "Lengths in selection",
          margin: {
            b: 200,
            l: 100
          }
        }
        // assures that speciesList is fully generated before instanciating
        // plotly
        if (speciesList.length === tempList.length) { statsParser(speciesList, layout, true, "#2196F3", sortAlp, sortVal) }
      }

    })
    .catch((error) => {
      console.log("Error! No query was made. Error message: ", error)
    })
}

// stats using node colors... if listGiFilter is empty

const statsColor = (g, graphics, mode, sortAlp, sortVal) => {
  let tempListAccessions = []
  g.forEachNode( (node) => {
    const currentNodeUI = graphics.getNodeUI(node.id)
    if (currentNodeUI.color === 0xFFA500ff) { tempListAccessions.push(node.id) }
  })
  console.log("tempListAccessions", tempListAccessions)
  // function to get the data from the accessions on the list
  const taxaList = (mode === "pf") ? getMetadataPF(tempListAccessions, mode, sortAlp, sortVal)
    : (mode === "res") ? getMetadataRes(tempListAccessions, mode, sortAlp, sortVal) :
    getMetadata(tempListAccessions, mode, sortAlp, sortVal)
  console.log("taxaList", taxaList)
  return taxaList
}

// repetitive function that is often called by main js
// (visualization_functions.js)
const repetitivePlotFunction = (areaSelection, listGiFilter, clickerButton, g, graphics) => {
  console.log("within function")
  const listPlots = (areaSelection === false) ?
    getMetadata(listGiFilter, clickerButton, false, false)
    : statsColor(g, graphics, clickerButton, false, false)
  console.log(listPlots)
  return listPlots
}

const pfRepetitivePlotFunction = (areaSelection, listGiFilter, clickerButton, g, graphics) => {
  const listPlots = (areaSelection === false) ? getMetadataPF(listGiFilter, clickerButton, false, false)
    : statsColor(g, graphics, clickerButton, false, false)
  return listPlots
}

const resRepetitivePlotFunction = (areaSelection, listGiFilter, clickerButton, g, graphics) => {
  const listPlots = (areaSelection === false) ? getMetadataRes(listGiFilter, clickerButton, false, false)
    : statsColor(g, graphics, clickerButton, false, false)
  return listPlots
}