/*globals setupPopupDisplay */

/**
 * This function controls the elements in the toggle button on the top right
 * corner of patlas that enables the user to switch the search between
 * plasmid names and accession number.
 * @param {boolean} toggleStatus - a boolean to control the status of the
 * toggle for plasmid name or accession number search box
 */
const toggleManager = (toggleStatus) => {
  // if node mode on disable dropdown and retrieve an alert whenever the dropdown is clicked in this instance
  if (toggleStatus === true) {
    document.getElementById("toggle-event").className += " disabled"
    $("#formValueId").attr("placeholder", "Search plasmid name")
  }
  // if node mode is off enables dropdown
  else {
    document.getElementById("toggle-event").className =
      document.getElementById("toggle-event").className.replace(/(?:^|\s)disabled(?!\S)/g, "")
    $("#formValueId").attr("placeholder", "Search accession number")
  }
}

/**
 * Function that handles the request of a single node click opening the
 * top-right side popup, with metadata about a plasmid
 * @param {Object} node - object that stores the id, links and data for that
 * node.
 * @param {function} setupPopupDisplay - function that should be executed
 * inside this function.
 */
const requestPlasmidTable = (node, setupPopupDisplay) => {
  // if statement to check if node is in database or is a new import
  // from mapping
  if (typeof node.data.seqLength !== "undefined") {
    $.post("api/getspecies/", {"accession": JSON.stringify([node.id])}, (data, status) => {
      // this request uses nested json object to access json entries
      // available in the database
      // if request return no speciesName or plasmidName
      // sometimes plasmids have no descriptor for one of these or both
      const speciesName = (data[0].json_entry.name === null) ?
        "N/A" : data[0].json_entry.name.split("_").join(" ")

      const plasmidName = (data[0].json_entry.plasmid_name === null) ?
        "N/A" : data[0].json_entry.plasmid_name

      const clusterId = (data[0].json_entry.cluster === null) ?
        "N/A" : data[0].json_entry.cluster
      // check if data can be called as json object properly from db something like data.species or data.length
      setupPopupDisplay(node, speciesName, plasmidName, clusterId) //callback
      // function for
      // node displaying after fetching data from db
    })
  }  // exception when node has no length (used on new nodes?)
  else {
    const speciesName = "N/A"
    const plasmidName = "N/A"
    const clusterId = "N/A"
    setupPopupDisplay(node, speciesName, plasmidName, clusterId) //callback
  }
}

/**
 * function that iterates all nodes and when it finds a match recenters the dom
 * @param {Object} g - graph related functions that iterate through nodes
 * and links.
 * @param {Object} graphics - vivagraph functions related with node and link
 * data.
 * @param {Object} renderer - vivagraph object to render the graph.
 * @param {String}  query - the string with the accession number of the node
 * to be queried. Query string can be both in one of the following formats:
 * e.g. NC_011413.1, NC_011413_1 or NC_011413
 * @param {Boolean|String} currentQueryNode - this variable may be a boolean
 * when there is no nodes queried before and the popup is closed. When,
 * there is already a popup set, this will have stored a string with the
 * accession number of the previously stored node.
 * @returns {String} currentQueryNode - returns currentQueryNode to be
 * stored globally for future executions of this functions
 */
const centerToggleQuery = (g, graphics, renderer, query, currentQueryNode) => {

  /**
   * This variable will store the accession number with the version that will
   * then be used to control if the popup is already open or not and to center
   * on the queried node.
   * @type {String|null}
   */
  let queriedMatch = null

  const queriedNode = g.forEachNode( (node) => {
    const nodeUI = graphics.getNodeUI(node.id)
    const sequence = node.data.sequence.split(">")[3].split("<")[0]
    const x = nodeUI.position.x,
      y = nodeUI.position.y
    // checks if query is equal to sequence or if the query is equal to the
    // sequence without the accession number
    if (sequence === query ||
      sequence.split("_").slice(0,2).join("_") === query) {
      // centers graph visualization in a given node, searching for gi
      renderer.moveTo(x, y)
      nodeUI.backupColor = nodeUI.color
      nodeUI.color = 0x900C3F
      // assigns queriedMatch the sequence that hits the query in this if
      // statement
      queriedMatch = sequence
      // requests table for sequences metadata
      requestPlasmidTable(node, setupPopupDisplay)
      // also needs to reset previous node to its original color
      if (currentQueryNode !== false) {
        const previousNodeUI = graphics.getNodeUI(currentQueryNode)
        previousNodeUI.color = previousNodeUI.backupColor   // default color
      }
      return sequence // this just returns true if it enters this if statement
    }
  })

  // check if there is a match for the queried node
  if (queriedNode !== true) {
    // if no query is returned then alert the user
    $("#alertId_search").show()
    window.setTimeout(() => { $("#alertId_search").hide() }, 5000)
    return currentQueryNode
  } else {
    // if there is a match return the queriedMatch
    return queriedMatch
  }
}

/**
 * Function to search plasmid names when toggle is on. This function is
 * async and returns a promise which results can then be parsed by .then()
 * @param {Object} g - graph related functions that iterate through nodes
 * and links.
 * @param {Object} graphics - vivagraph functions related with node and link
 * data.
 * @param {Object} renderer - vivagraph object to render the graph.
 * @param {Boolean|String} currentQueryNode - this variable may be a boolean
 * when there is no nodes queried before and the popup is closed. When,
 * there is already a popup set, this will have stored a string with the
 * accession number of the previously stored node.
 * @returns {Promise<String|*>} currentQueryNode - returns currentQueryNode to be
 * stored globally for future executions of this functions
 */
const toggleOnSearch = async (g, graphics, renderer, currentQueryNode) => {
  const query = $("#formValueId").val()
  // await allows to wait for the response from the query
  // result is an accession get from db
  const result = await $.get("api/getplasmidname/", {"plasmid_name": query})
  currentQueryNode = await centerToggleQuery(g, graphics, renderer, result.plasmid_id, currentQueryNode)
  return currentQueryNode
}
