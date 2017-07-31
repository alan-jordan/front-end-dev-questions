var fs = require('fs')
names = ['Bob', 'Alice', 'Chewbacca', 'Yoshi', 'Link']
descs = ['a', 'b', 'c', 'd', 'e']

function returnRandomItem(items) {
  return items[Math.floor(Math.random() * 5)]
}

// console.log(returnRandomName(names))
//
namesArray = []
for(var i = 1; i < 13000; i++) {
  if(i % 3 == 0 || i % 5 == 0 || i % 4 ==0 || i % 7 == 0 || i % 2 == 0) {
    namesArray.push(`{"id: ${i}"}, name: "${returnRandomItem(names)}",\n`)
  }
}

descArray = []
for(var i = 1; i < 15000; i++) {
  if(i % 2 == 0 || i % 5 == 0 || i % 6 ==0 || i % 8 == 0 || i % 9 == 0) {
    descArray.push(`{"id: ${i}"}, name: "${returnRandomItem(descs)}",\n`)
  }
}

fs.writeFile('names.txt', namesArray, (err) => {
  err ? console.log(err) : console.log('saved')
})

fs.writeFile('descs.txt', descArray, (err) => {
  err ? console.log(err) : console.log('saved')
})
