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
            getObjectId('Trump'),
            getObjectId('Napoleon')
        ],
        points: 2,
        child: [
            getObjectId('CommentFakeNews1')

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
        ],
        points: 1,
        child: [

        ]
    },
    {
        _id: getObjectId('Idiota'),
        title: 'Abro hilo',
        content: 'Ha visto alguien a mi churri?',
        publishDate: '1936-10-05',
        contributionType: 'ask',
        user: getObjectId('Federico'),
        upvoted: [
            getObjectId('Gerard')
        ],
        points: 0,
        child: [
            getObjectId('CommentIdiota1')
        ]
    },
    {
        _id: getObjectId('Territorio'),
        title: 'Ayuda urgente por favor',
        content: 'Sabe alguien como puedo conquistar Prusia?',
        publishDate: '1806-03-12',
        contributionType: 'ask',
        user: getObjectId('Napoleon'),
        upvoted: [
            getObjectId('Gerard')
        ],
        points: 0,
        child: [
            getObjectId('Territorio')
        ]
    },
    {
        _id: getObjectId('Politica'),
        title: 'We need to ask something great',
        content: 'Los inmigrantes, porque no pueden levantar su propio pais?',
        publishDate: '2016-11-20',
        contributionType: 'ask',
        user: getObjectId('Trump'),
        upvoted: [
            getObjectId('Gerard'),
            getObjectId('Llarena'),
            getObjectId('Rajoy'),
            getObjectId('Trump')
        ],
        points: 0,
        child: [

        ]
    },
    {
        _id: getObjectId('Visado'),
        title: 'More questions to make America great again',
        content: 'Alguien sabe como denegar un visado?',
        publishDate: '2017-01-01',
        contributionType: 'ask',
        user: getObjectId('Trump'),
        upvoted: [
            getObjectId('Gerard')
        ],
        points: 0,
        child: [
            getObjectId('CommentVisado1')

        ]
    },
    // Comments and replies
    {
        _id: getObjectId('CommentFakeNews1'),
        content: "Me Gusta",
        publishDate: '2016-03-03',
        contributionType: 'comment',
        user: getObjectId('Rajoy'),
        upvoted: [
            getObjectId('Gerard')
        ],
        parent: getObjectId('FakeNews'),
        topParent: getObjectId('FakeNews')
    },

    // Comments 'Idiota'
    {
        _id: getObjectId('CommentIdiota1'),
        content: "Puede que parezca un idiota [...]",
        publishDate: '2016-03-04',
        contributionType: 'comment',
        user: getObjectId('Groucho'),
        upvoted: [
            getObjectId('Rajoy')
        ],
        parent: getObjectId('Idiota'),
        topParent: getObjectId('Idiota'),
        child: [
            getObjectId('CommentIdiota1')
        ]
    },
    {
        _id: getObjectId('CommentIdiota2'),
        content: "Y a mi que me importa",
        publishDate: '2016-03-05',
        contributionType: 'reply',
        user: getObjectId('Federico'),
        upvoted: [
            getObjectId('Freddy')
        ],
        parent: getObjectId('CommentIdiota1'),
        topParent: getObjectId('Idiota')
    },

    // Comments 'Territorio'
    {
        _id: getObjectId('CommentTerritorio1'),
        content: 'url',
        publishDate: '1806-03-16',
        contributionType: 'comment',
        user: getObjectId('Cesar'),
        parent: getObjectId('Territorio'),
        topParent: getObjectId('Territorio'),
        upvoted: [],
        child: [
            getObjectId('CommentTerritorio2')
        ]
    },
    {
        _id: getObjectId('CommentTerritorio2'),
        content: 'Merci',
        publishDate: '1806-03-17',
        contributionType: 'reply',
        user: getObjectId('Napoleon'),
        parent: getObjectId('CommentTerritorio1'),
        topParent: getObjectId('Territorio'),
        upvoted: [],
        child: [
            getObjectId('CommentTerritorio3')
        ]
    },
    {
        _id: getObjectId('CommentTerritorio3'),
        content: 'Ave cesar emperatus romanus',
        publishDate: '1806-03-17',
        contributionType: 'reply',
        user: getObjectId('Cesar'),
        parent: getObjectId('CommentTerritorio2'),
        topParent: getObjectId('Territorio'),
        upvoted: []
    },

    // Coments Visado

    {
        _id: getObjectId('CommentVisado1'),
        content: 'Pues no lo se',
        publishDate: '2017-01-02',
        contributionType: 'comment',
        user: getObjectId('Rajoy'),
        parent: getObjectId('Visado'),
        topParent: getObjectId('Visado'),
        upvoted: [],
        child: [
            getObjectId('CommentVisado2')
        ]
    },
    {
        _id: getObjectId('CommentVisado2'),
        content: 'En todo caso, siempre puedes extraditar',
        publishDate: '2017-01-03',
        contributionType: 'reply',
        user: getObjectId('Llarena'),
        parent: getObjectId('CommentVisado1'),
        topParent: getObjectId('Visado'),
        upvoted: [],
        child: [
            getObjectId('CommentVisado3')
        ]
    },
    {
        _id: getObjectId('CommentVisado3'),
        content: 'Great idea. America First',
        publishDate: '2017-01-04',
        contributionType: 'reply',
        user: getObjectId('Trump'),
        parent: getObjectId('CommentVisado2'),
        topParent: getObjectId('Visado'),
        upvoted: [],
        child: [
            getObjectId('CommentVisado4')
        ]    
    },
    {
        _id: getObjectId('CommentVisado4'),
        content: 'Viva el vino',
        publishDate: '2017-01-05',
        contributionType: 'reply',
        user: getObjectId('Rajoy'),
        parent: getObjectId('CommentVisado3'),
        topParent: getObjectId('Visado'),
        upvoted: []
    }

];



module.exports = contributions;