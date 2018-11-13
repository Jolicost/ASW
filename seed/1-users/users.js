const { getObjectId } = require('../index');

const users = [
  {
    _id: getObjectId('Federico'),
    username: 'Federico_Garcia_Lorca',
    password: 'fedepordali',
    createdAt: '1900-01-01'
  },
  {
    _id: getObjectId('Groucho'),
    username: 'Groucho_Marx',
    password: 'bigotitos',
    createdAt: '1890-01-01'
  },
  {
    _id: getObjectId('Napoleon'),
    username: 'Napoleon',
    password: 'prussia',
    createdAt: '1790-01-01'
  },
  {
    _id: getObjectId('Llarena'),
    username: 'Juez_Llarena',
    password: 'extradicion',
    createdAt: '2005-01-01'
  },
  {
    _id: getObjectId('Trump'),
    username: 'Donald_Trump',
    password: 'thewall',
    createdAt: '1929-01-01'
  },
  {
  _id: getObjectId('Armstrong'),
    username: 'Neil_Armstrong',
    password: 'jodeos',
    createdAt: '1969-01-01'
  },
  {
  _id: getObjectId('Cesar'),
    username: 'Julio_Cesar',
    password: 'cleopatra',
    createdAt: '0001-01-01'
  },
  {
  _id: getObjectId('Rajoy'),
    username: 'Mariano_Rajoy',
    password: 'alcaldeporpueblo',
    createdAt: '1969-01-01'
  },
  {
  _id: getObjectId('Gerard'),
    username: 'Gerard_Butler',
    password: 'esparta',
    createdAt: '0200-01-01'
  },
  {
  _id: getObjectId('Mercury'),
    username: 'Freddy_Mercury',
    password: 'amarillo',
    createdAt: '1946-01-01'
  }
];

module.exports = users;