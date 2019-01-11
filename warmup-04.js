'use strict';

const superagent =  require('superagent');

let fetchPeopleAsync = () => {
  return superagent
  .get('https://swapi.co/api/people')
  .then((response) => {
    //console.log(response.body);
    let result = response.body;
    //console.log(result);
    result.map((char) => {
      console.log(char.results);
      superagent.get(char.results);
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

let fetchPeopleSync = async () => {
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

fetchPeopleAsync().then(char => console.log('with promises', char));

fetchPeopleSync().then(char => console.log('with callbacks', char));