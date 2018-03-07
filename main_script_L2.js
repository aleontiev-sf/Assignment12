// Get reference to the tbody element (table body) for subsequent manipulation
var $tbody = document.querySelector('tbody');
/* Declare two empty arrays that will hold dropdown menu item values for two
      of the search fields (for Country and Shape). */
var country_dropdown_values = [];
var shape_dropdown_values = [];
/* Add an event listener to call formHandler() when search form is submitted
     (Search button is clicked). */
document.getElementById("myForm").addEventListener("submit", formHandler, true);
// Set filteredSightings to dataSet (entrire data set) initially
var filteredSightings = dataSet;
/*
 *  The renderTable function renders the filteredSightings to the tbody
 */
function renderTable() {
  $tbody.innerHTML = '';  /* First, clear the table body
    * Then itereate over all the records in filteredSightings and
    *   retrieve all the fields within each record to display as a
    *   table (by adding rows to the table body)
    */
  for (var i = 0; i < filteredSightings.length; i++) {
    var record = filteredSightings[i];
    var fields = Object.keys(record);
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = record[field];
    }
  }
}
/* The function formHandler() is the workhorse which builds a new verion
 *    of filteredSigthings array by filtering the entire data set (dataSet)
 *    using a callback filter.
 */
function formHandler() {
  event.preventDefault();
  // Retrieve the value of various fields in the search form for processing
  //    by the filter callback function.
  var $dateField = document.querySelector('#dateField');
  var $cityField = document.querySelector('#cityField');
  var $stateField = document.querySelector('#stateField');
  var $countrySelection = document.querySelector('#countrySelection');
  var $shapeSelection = document.querySelector('#shapeSelection');
  filteredSightings = dataSet.filter(function(sighting) {
    /*
     Initialize boolean flags that are used to determine whether a given
        record is to be displayed.  Initial value for all these falgs is
        false; various subsequent checks set the flags to true, based on
        user input in the search form.
     The logic of these checks is the same:  first determine if the
        user wants to search based on a given field; if not (the user is not
        interested in searching the given field), set the corresponding
        field falg to true; otherwise, check to see if the current
        record field value matches the search field value (specified by the
        user) and if there's a match, set the corresponding field flag to true.
     In the end, the filter callback function returns true (the current record 
        is added to filteredSightings) if ALL these flags are true.
     Note that I didn't set up a function to perform this identical check 
        since each check sets a different variable (boolean flag) and the 
        code to handle different flags would complicated the code. Also, the
        logic of checking is different for text fields and dropdown menu
        options: for text field check for value of 0 length; for dropdown
        menu options, check for 'all' as the value of the field.  This is
        why I opted to repeat the code for checking each field (for simpler 
       code to read and maintain). */
    dateFound = cityFound = stateFound = countryFound = shapeFound = false;
    if ( $dateField.value.length == 0 ){
      dateFound = true;
    } else {
      var filterDate = $dateField.value.trim();
      var sightingDate = sighting.datetime.trim();
      if (filterDate === sightingDate) {
        dateFound = true;
      }
    }

    if ( $cityField.value.length == 0 ){
      cityFound = true;
    } else {
      var filterCity = $cityField.value.trim().toLowerCase();
      var sightingCity = sighting.city.trim().toLowerCase();
      if (filterCity === sightingCity) {
        cityFound = true;
      }
    }

    if ( $stateField.value.length == 0 ){
      stateFound = true;
    } else {
      var filterState = $stateField.value.trim().toLowerCase();
      var sightingState = sighting.state.trim().toLowerCase();
      if (filterState === sightingState) {
        stateFound = true;
      }
    }

    if ( $countrySelection.value === 'all' ){
      countryFound = true;
    } else {
      var filterCountry = $countrySelection.value.trim().toLowerCase();
      var sightingCountry = sighting.country.trim().toLowerCase();
      if (filterCountry === sightingCountry) {
        countryFound = true;
      }
    }

    if ( $shapeSelection.value === 'all' ){
      shapeFound = true;
    } else {
      var filterShape = $shapeSelection.value.trim().toLowerCase();
      var sightingShape = sighting.shape.trim().toLowerCase();
      if (filterShape === sightingShape) {
        shapeFound = true;
      }
    }

    if ( dateFound && cityFound && stateFound && countryFound && shapeFound ) {
      return true
    } else {
      return false
    }
  });
  // Now that the entire data set has been filtered and filteredSightings array
  //   has been updated based on user input, render the new result set. 
  renderTable();
} // end of formHandler function
/*
 * The code below is executed every time the page is reloaded. First, the entire
 *   data set is rendered.  Next, dropdown menu options values (used in the search
 *   form) are captrued in arrays for each menu.  Finally, the search form
 *   dropdown menus are dynamically created using d3.select() calls for each 
 *   dropdown menu.
 * I initially added a check to see if dorpdowm menu option values have been added
 *   previosly, to avoid filtering the entire data set.  I did this to avoid 
 *   scanning the entire data set upon every page reload. Unforutnately, I found
 *   out that these variables (arrays) are reset every time--a behavior I didn't 
 *   expect. So this check is redundant; but I left it in place.
 */
renderTable();
if ( shape_dropdown_values.length == 0  || country_dropdown_values.length == 0 ){
  var temp = dataSet.filter(function(record){
  if ( shape_dropdown_values.indexOf(record.shape) == -1 ) {
    shape_dropdown_values.push(record.shape);
  }
  if ( country_dropdown_values.indexOf(record.country) == -1 ) {
    country_dropdown_values.push(record.country);
  }
  });
  for (var i=0; i<shape_dropdown_values.length; i++) {
    var shapeMenu = d3.select('#shapeSelection')
      .append("option:option")
      .attr("value", shape_dropdown_values[i])
      .text(shape_dropdown_values[i]);
  }
  for (var i=0; i<country_dropdown_values.length; i++) {
    var countryMenu = d3.select('#countrySelection')
      .append("option:option")
      .attr("value", country_dropdown_values[i])
      .text(country_dropdown_values[i]);
  }
}