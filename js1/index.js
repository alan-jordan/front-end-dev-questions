'use strict';
/**
 * We have two different arrays.  Each array contains different bits
 * of the meta-data about a user.  The "names" array contains objects
 * where each object has a user's ID and their name.  The
 * "descriptions" array contains objects where each object has a
 * user's ID and description.  We want to take the data from each
 * array and create a new array containing objects with a user's ID,
 * name, and description.
 *
 * If both arrays have an object with the same ID, then the output
 * array will only contain a single object with the correct name and
 * description.  However, if ID "443234" only exists in the names
 * array, we should just copy that to that output.  Same applies to
 * the descriptions array.
 *
 * Example:
 *
 * Input:
 *   names: [
 *     { id: '1', name: 'james' },
 *     { id: '2', name: 'sarah' }
 *   ]
 *   descriptions: [
 *     { id: '1', description: 'a' },
 *     { id: '3', description: 'b' }
 *   ]
 * Output:
 *   [
 *     { id: '1', name: 'james', description: 'a' },
 *     { id: '2', name: 'sarah' },
 *     { id: '3', description: 'b' }
 *   ]
 *
 * @public
 * @param {Array.<{id: string, name: string}>} names
 * @param {Array.<{id: string, description: string}>} descriptions
 * @returns {Array.<{id: string, [name]: string, [description]: string}>}
 */

 function remove(array, element) {
     const index = array.indexOf(element);
     array.splice(index, 1);
 }

function mergeData(names, descriptions) {

  let mergedArray = []

  let namesIdsArr = names.map((name) => name.id)
  let descIdsArr = descriptions.map((desc) => desc.id)

  let matchedIds = namesIdsArr.filter((id) => descIdsArr.indexOf(id) != -1)
  let uniqueNameIds = namesIdsArr.filter((id) => matchedIds.indexOf(id) == -1)
  let uniqueDescIds = descIdsArr.filter((id) => matchedIds.indexOf(id) == -1)
  let combinedUniqueIds = [...uniqueNameIds, ...uniqueDescIds]
  let combinedItems = [...names, ...descriptions]

  names.map((name) => {
    descriptions.map((desc) => {
      if(name.id == desc.id) {
        name.description = desc.description
        mergedArray.push(name)
      }
    })
  })

  combinedUniqueIds.map((id) => {
    combinedItems.map((item) => {
      if(item.id == id) {
        mergedArray.push(item)
      }
    })
  })

  return mergedArray.sort((a, b) => (a.id - b.id))
}

/**
 * Here are two smaller data sets to make it easy to check basic correctness.
 */
const userNames = [
	{ id: '1', name: 'james' },
  { id: '2', name: 'sarah' },
  { id: '4', name: 'bob' },
  { id: '5', name: 'bob' },
  { id: '7', name: 'bob' },
  { id: '8', name: 'bob' },
  { id: '10', name: 'bob' },
  { id: '11', name: 'bob' },
  { id: '13', name: 'bob' },
  { id: '14', name: 'bob' }
];
const userDescriptions = [
	{ id: '1', description: 'a' },
  { id: '3', description: 'b' },
  { id: '4', description: 'c' },
  { id: '6', description: 'c' },
  { id: '7', description: 'c' },
  { id: '9', description: 'c' },
  { id: '10', description: 'c' },
  { id: '11', description: 'c' },
  { id: '12', description: 'c' },
  { id: '13', description: 'c' }
];

const output = mergeData(userNames, userDescriptions)

// Display the output in an easy to read format
const container = document.getElementById('output');
container.textContent = JSON.stringify(output, null, 2);

//
// var hash = new Map();
// [...names, ...descriptions].forEach(function(object) {
//   console.log(hash.get(object.id))
//     hash.set(object.id, Object.assign(hash.get(object.id) || {}, object))
// });
// console.log(hash)
// return Array.from(hash.values());
