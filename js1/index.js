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

function mergeData(names, descriptions) {
  var hash = new Map();
  [...names, ...descriptions].forEach(function(object) {
      hash.set(object.id, Object.assign(hash.get(object.id) || {}, object))
  });
  console.log(hash)
  return Array.from(hash.values());
}

/**
 * Here are two smaller data sets to make it easy to check basic correctness.
 */
const userNames = [
	{ id: '1', name: 'james' },
  { id: '2', name: 'sarah' },
  { id: '4', name: 'bob' }
];
const userDescriptions = [
	{ id: '1', description: 'a' },
  { id: '3', description: 'b' },
  { id: '4', description: 'c' }
];

const output = mergeData(userNames, userDescriptions)
console.log(output)

// Display the output in an easy to read format
const container = document.getElementById('output');
container.textContent = JSON.stringify(output, null, 2);


// function mergeData(names, descriptions) {
//   for(let name of names) {
//     for(let description of descriptions) {
//       if(name.id == description.id) {
//         name.description = description.description
//         newArray.push(name)
//       } else {
//         console.log(name);
//         // newArray.push(description)
//       }
//     }
//   }
// }


// var hash = new Map();
// names.concat(descriptions).forEach(function(obj) {
//     hash.set(obj.id, Object.assign(hash.get(obj.id) || {}, obj))
// });
// return Array.from(hash.values());
