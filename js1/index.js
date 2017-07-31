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

 const names = ['Bob', 'Alice', 'Chewbacca', 'Yoshi', 'Link']
 const descs = ['a', 'b', 'c', 'd', 'e']

 function returnRandomItem(items) {
   return items[Math.floor(Math.random() * 5)]
 }

 let userNames = []
 for(var i = 1; i < 1000; i++) {
   if(i % 3 == 0 || i % 5 == 0 || i % 4 ==0 || i % 7 == 0 || i % 2 == 0) {
     userNames.push({id: `${i}`, name: `${returnRandomItem(names)}`})
   }
 }

 let userDescriptions = []
 for(var i = 1; i < 1000; i++) {
   if(i % 2 == 0 || i % 5 == 0 || i % 6 ==0 || i % 8 == 0 || i % 9 == 0) {
     userDescriptions.push({id: `${i}`, description: `${returnRandomItem(descs)}`})
   }
 }


function mergeData(names, descriptions) {

  let mergedArray = []

  const namesIdsArr = names.map((name) => name.id)
  const descIdsArr = descriptions.map((desc) => desc.id)

  const matchedIds = namesIdsArr.filter((id) => descIdsArr.indexOf(id) != -1)
  const uniqueNameIds = namesIdsArr.filter((id) => matchedIds.indexOf(id) == -1)
  const uniqueDescIds = descIdsArr.filter((id) => matchedIds.indexOf(id) == -1)
  const combinedUniqueIds = [...uniqueNameIds, ...uniqueDescIds]
  const combinedItems = [...names, ...descriptions]

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
  // return mergedArray
  return mergedArray.sort((a, b) => (a.id - b.id))

  // Much!!! Faster way of doing this
  // Had to google for this.
  // Creates a map and goes through combining elements with
  // Shared IDs

  // var hash = new Map();
  // [...names, ...descriptions].forEach(function(object) {
  //     hash.set(object.id, Object.assign(hash.get(object.id) || {}, object))
  // });
  // return Array.from(hash.values());
}




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
