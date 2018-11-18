const { getObjectId } = require('../index');
// date = yyyy-mm-dd
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
    _id: getObjectId('Junqueras'),
    username: 'OfficialOriol',
    password: 'puigdebobo',
    createdAt: '2015-12-31'
  },
  {
    _id: getObjectId('Rivera'),
    username: 'Albert_Rivera',
    password: 'primoderivera',
    createdAt: '2001-01-20'
  },
  {
    _id: getObjectId('Sanchez'),
    username: 'Sanchez_Castejon',
    password: 'pabloiglesias',
    createdAt: '2006-07-11'
  },
  {
    _id: getObjectId('Aznar'),
    username: 'JoseMariaAznar',
    password: 'valledeloscaidos',
    createdAt: '2010-09-01'
  },
  {
    _id: getObjectId('Sebastian'),
    username: 'SebOfficial',
    password: 'naitsabes',
    createdAt: '2018-10-10'
  },
  {
    _id: getObjectId('Casado'),
    username: 'Casado_Pablo',
    password: 'unidad',
    createdAt: '2015-04-02'
  },
  {
    _id: getObjectId('Rubalcaba'),
    username: 'Rubalcalvo',
    password: 'socialismo',
    createdAt: '2014-07-01'
  },
  {
    _id: getObjectId('Valtonyc'),
    username: 'JosepArenas',
    password: 'injurias',
    createdAt: '1999-09-19'
  },
  {
    _id: getObjectId('Echenique'),
    username: 'Echenako',
    password: 'irenemontero',
    createdAt: '2000-04-13'
  },
  {
    _id: getObjectId('Puigdemont'),
    username: 'Puigdemont',
    password: 'catalunya',
    createdAt: '2006-02-23'
  },
  {
    _id: getObjectId('Wyoming'),
    username: 'ElIntermedio',
    password: 'lasexta',
    createdAt: '2011-05-30'
  },
  {
    _id: getObjectId('LeBron'),
    username: 'jamesLeb',
    password: 'kobebryant',
    createdAt: '1964-11-21'
  },
  {
    _id: getObjectId('Curry'),
    username: 'StephenCurry',
    password: 'kevinDurant',
    createdAt: '1977-12-22'
  },
  {
    _id: getObjectId('Westbrook'),
    username: 'Russellw',
    password: 'burger',
    createdAt: '2018-01-29'
  },
  {
    _id: getObjectId('Llarena'),
    username: 'Juez_Llarena',
    password: 'extradicion',
    createdAt: '2005-01-11'
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