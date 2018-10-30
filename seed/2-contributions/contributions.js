const { getObjectId } = require('../index');

/* Armstrong a fakenews */
/* Rajoy comenta me gusta */
/* Donald trump vota positiu */

/* Gerald fa autospam de les seves pelicules, mes comentaris amb mes trailers */
/* Gerald fa upvote a tots els comentaris */


/* Federico pregunta: Abro hilo si alguien ha visto a mi churri 
Groucho responde: Puede que parezca un idiota [...]
Rajoy fa upvote a groucho
Federico responde: y a mi que me importa 

Freddy fa upvote

Napoleon pregunta si alguien sabe como conquistar un territorio
Julio upvote napoleon
Llarena upvote napoleon

Julio cesar le pasa un link
Napoleon respon merci
Julio cesar li diu Ave cesar emperatus romanus

Trump Los inmigrantes ¿por qué no se quedan a levantar su país?
Llarena upvote
Rajoy upvote
Trump upvote


Trump asks: Como denegar un visado?
Rajoy responde: Pues no lo se
Llarena: En todo caso, siempre puedes extraditar
Trump: Great idea. America First
Rajoy: Viva el vino

2018-10-29T17:57:06.607Z
*/
const contributions = [
    // Top contributions
    {
        _id: getObjectId('FakeNews'),
        title: 'Apollo 11 was a hoax',
        content: 'https://www.express.co.uk/news/weird/963446/Moon-landing-fake-NASA-hoax-Apollo-11-conspiracy-theory-David-Meade',
        publishDate: '1969-05-05',
        contributionType: 'url',
        user: getObjectId('Armstrong'),
        upvoted: [
            getObjectId('Trump')
        ]
    },
    {
        _id: getObjectId('Spam'),
        title: 'This video changed my life',
        content: 'https://www.youtube.com/watch?v=mnP_z3qXDCQ',
        publishDate: '2018-01-01',
        contributionType: 'url',
        user: getObjectId('Gerard'),
        upvoted: [
            getObjectId('Gerard')
        ]
    },
    {
        _id: getObjectId('Idiota'),
        title: 'Abro hilo',
        content: 'Ha visto alguien a mi churri?',
        publishDate: '1936-10-05',
        contributionType: 'ask',
        user: getObjectId('Federico')
    },
    {
        _id: getObjectId('Territorio'),
        title: 'Ayuda urgente por favor',
        content: 'Sabe alguien como puedo conquistar Prusia?',
        publishDate: '1806-03-12',
        contributionType: 'ask',
        user: getObjectId('Napoleon')
    },
    {
        _id: getObjectId('Politica'),
        title: 'We need to ask something great',
        content: 'Los inmigrantes, porque no pueden levantar su propio pais?',
        publishDate: '2016-11-20',
        contributionType: 'ask',
        user: getObjectId('Trump')
    },
    {
        _id: getObjectId('Visado'),
        title: 'More questions to make America great again',
        content: 'Alguien sabe como denegar un visado?',
        publishDate: '2017-01-01',
        contributionType: 'ask',
        user: getObjectId('Trump')
    },

];

module.exports = contributions;