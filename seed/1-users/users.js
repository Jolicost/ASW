const { getObjectId } = require('../index');

const users = [
  {
    _id: getObjectId('Federico'),
    username: 'Federico_Garcia_Lorca',
    password: 'fedepordali'
  },
  {
    _id: getObjectId('Groucho'),
    username: 'Groucho_Marx',
    password: 'bigotitos'
  },
  {
    _id: getObjectId('Napoleon'),
    username: 'Napoleon',
    password: 'prussia'
  },
  {
    _id: getObjectId('Llarena'),
    username: 'Juez_Llarena',
    password: 'extradicion'
  },
  {
    _id: getObjectId('Trump'),
    username: 'Donald_Trump',
    password: 'thewall'
  },
  {
  _id: getObjectId('Armstrong'),
    username: 'Neil_Armstrong',
    password: 'jodeos'
  },
  {
  _id: getObjectId('Cesar'),
    username: 'Julio_Cesar',
    password: 'cleopatra'
  },
  {
  _id: getObjectId('Rajoy'),
    username: 'Mariano_Rajoy',
    password: 'alcaldeporpueblo'
  },
  {
  _id: getObjectId('Gerard'),
    username: 'Gerard_Butler',
    password: 'esparta'
  },
  {
  _id: getObjectId('Mercury'),
    username: 'Freddy_Mercury',
    password: 'amarillo'
  }
];

module.exports = users;