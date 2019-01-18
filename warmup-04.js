'use strict';

const superagent =  require('superagent');

let fetchPeopleWithPromises = () => {
  return superagent
  .get('https://swapi.co/api/people')
  .then((response) => {
    response.body.results.forEach(({url}) => {
      superagent.get(url)
      .then(data => console.log('name', data.body.name));
    })
  })
  .then(promise =>{
    console.log(promise);
    return Promise.all(promise)

  .then(people => {
    let chars = [];
    people.forEach((char) => chars.push(char.body.name));
    
    return chars;
  })

})
.catch(err => console.err);
}

////////////////////////////////////////

let fetchPeopleWithAsync = async () => {
  try{

    let result = await superagent.get('https://swapi.co/api/people');
    //console.log(collection.body.results);
    let collection = result.body.results;
    let names = [];


    let requested = collection.map((data) => {
      return superagent.get(data.url);
    })
    //console.log(requested);

    let urls = await Promise.all(requested)
    .then(people => {
      people.forEach(data => {
        //console.log(data);
        names.push(data.body.name);
      });

    })
    return names;
  }

    catch(error){console.err};
}

fetchPeopleWithPromises().then(char => console.log('with promises', char));

fetchPeopleWithAsync().then(char => console.log('Async', char));