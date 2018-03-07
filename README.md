# Assignment 12
## JavaScript and DOM

This solution provides a web-based interface to view and search UFO sightings info stored
as an array of data in javascript file (.js).  There are two versions of the solution
included in the repo:
* Files with _L2 ending in their names, which correspond to level 2 part of the assignment. This version of the solution provides full search capability for 5 fields of input data: date, city, state, country and shape (the last two provide dropdown menus a user can select from).
    - Search of various fields can be performed individually or in combination with other fields.
    - When searching multiple fields, a user can either specify search criteria together or in subsequent steps. For example, if one wants to search for sightings on a given date and at a given city, s/he can specify these search criteria in the Date and City search fields and then execute a search. Alternatively, a user can first search for sightings on a given date, then refine this search by performing a subsequent search using the City field.  These two approaches yeild the same result.
    - A search using the text input fields can be conducted in two different ways: either pressing the enter key from within the search field (after entering a serach string), or by pressing the Search button (also after entering a serach string).
    - A search with dropdwon menus can be conducted only by pressing the Search button. This is because the enter key, when pressed within a dropdown menu selection, selects a given option.
    - To completely reset the search form (to initiate a brand new search), one can either reload the page (reload the URL or press ^L followed by the enter key) or clear all the search fields and conduct a search (hitting the enter key from within a text input field, or pressing the Search button).
* Files with _L3 ending in their names, which correspond to level 3 part of the assignment. This version of the solution provides the same functionality as the one above AND paginates the output.

Note that pagination (L3 version) is not fully correct.  Specifically, search results are rendered in one screen and without any pagination.  The search info displayed at the foot of the results, as well as page navigation buttons/links do not work properly--refer to records that were paginated previosuly.
