'use strict';

const superagent =  require('superagent');

let fetchPeopleAsync = () => {

  return superagent
  .get('http://swapi.co/api/people')
  .then((response) => {
    let result = response.body.result;
    return result.map((char) => {
      return superagent.get(char.url);
    })
  })
  .then(promise =>{
    
    return Promise.all(promise)

  .then(people => {
    let chars = [];
    people.forEach((char) => chars.push(char.body.name));
    
    return chars;
  })

})
.catch(err => console.err);
}