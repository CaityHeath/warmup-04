'use strict';

const superagent = require('superagent');

const fetchPeopleWithPromises = () => {

  return superagent.get('https://swapi.co/api/people/')
  .then(res => {
    return res.body.results.map(person => {
      return superagent.get(person.url)
    })
  })
  .then(peopleReq => {
    return Promise.all(peopleReq)
    .then(people => {
      let names = [];
      for ( let data of people) {
        names.push(data.body.name);
      }
      return names;
    })
  })
};

fetchPeopleWithPromises()
.then(people => console.log('fetch with promises', {people}));

const fetchPeopleWithAsync = async () => {
  const peopleSet = await superagent.get('http://swapi.co/api/people/');

  const people = (peopleSet.body && peopleSet.body.results) || [];

  const peopleReq = people.map((person) => {
    return superagent.get(person.url);
  })

  const names = await Promise.all(peopleReq)
  .then(people => {
    let names = [];
    for(let data of people){
      names.push(data.body.name);
    }
    return names;
  });
  return names;
};

fetchPeopleWithAsync()
.then(people => console.log('fetch with async and await', {people}));