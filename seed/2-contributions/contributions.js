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
        comments: 1,
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
        comments: 0,
        child: [

        ]
    },
    // NOUS

    // CATALUNYA I ELS SEUS COMENTARIS
    {
        _id: getObjectId('Catalunya'),
        title: 'Catalunya te dret a la autodeterminacio',
        content: 'https://www.vilaweb.cat',
        publishDate: '2017-10-01',
        contributionType: 'url',
        user: getObjectId('Puigdemont'),
        upvoted: [
            getObjectId('Junqueras')
        ],
        points: 1,
        comments: 2,
        child: [
            getObjectId('CommentCatalunya1'),
            getObjectId('CommentCatalunya2')
        ]
    },
    {
        _id: getObjectId('CommentCatalunya1'),
        content: "Clar que si",
        publishDate: '2018-03-04',
        contributionType: 'comment',
        user: getObjectId('Junqueras'),
        upvoted: [
            getObjectId('Puigdemont')
        ],
        points: 1,
        parent: getObjectId('Catalunya'),
        topParent: getObjectId('Catalunya'),
    },
    {
        _id: getObjectId('CommentCatalunya2'),
        content: "Soñad",
        publishDate: '2018-03-05',
        contributionType: 'comment',
        user: getObjectId('Casado'),
        upvoted: [
            getObjectId('Aznar')
        ],
        points: 1,
        parent: getObjectId('Catalunya'),
        topParent: getObjectId('Catalunya'),
        comments: 1,
        child: [
            getObjectId('CommentCatalunya3')
        ]
    },
    {
        _id: getObjectId('CommentCatalunya3'),
        content: "Clar que no",
        publishDate: '2018-03-06',
        contributionType: 'reply',
        user: getObjectId('Casado'),
        upvoted: [

        ],
        parent: getObjectId('CommentCatalunya2'),
        topParent: getObjectId('Catalunya'),
        comments: 1,
        child: [
            getObjectId('CommentCatalunya4')
        ]
    },
    {
        _id: getObjectId('CommentCatalunya4'),
        content: "Ns/nc",
        publishDate: '2018-03-06',
        contributionType: 'reply',
        user: getObjectId('Sanchez'),
        upvoted: [
            getObjectId('Aznar')
        ],
        points: 1,
        parent: getObjectId('CommentCatalunya3'),
        topParent: getObjectId('Catalunya')
    },

    // PRESUPUESTOS I ELS SEUS COMENTARIS
    {
        _id: getObjectId('Presupuestos'),
        title: 'Los presupuestos requieren mas debate',
        content: 'https://www.elpais.com',
        publishDate: '2018-10-30',
        contributionType: 'url',
        user: getObjectId('Sanchez'),
        upvoted: [
            getObjectId('Echenique')
        ],
        points: 1,
        child: [
            getObjectId('CommentPresupuestos1')
        ]
    },
    {
        _id: getObjectId('CommentPresupuestos1'),
        content: "Y menos cachondeo",
        publishDate: '2018-11-01',
        contributionType: 'comment',
        user: getObjectId('Echenique'),
        upvoted: [
            getObjectId('Puigdemont')
        ],
        points: 1,
        parent: getObjectId('Presupuestos'),
        topParent: getObjectId('Presupuestos')
    },
    {
        _id: getObjectId('CommentPresupuestos2'),
        content: "Y mas seriedad",
        publishDate: '2018-11-03',
        contributionType: 'reply',
        user: getObjectId('Puidemont'),
        upvoted: [
            getObjectId('Echenique')
        ],
        points: 1,
        parent: getObjectId('CommentPresupuestos1'),
        topParent: getObjectId('Presupuestos'),
        child: [
            getObjectId('CommentPresupuestos3')
        ]
    },
    {
        _id: getObjectId('CommentPresupuestos3'),
        content: "Y menos chorradas",
        publishDate: '2018-11-03',
        contributionType: 'reply',
        user: getObjectId('Aznar'),
        upvoted: [

        ],
        parent: getObjectId('CommentPresupuestos2'),
        topParent: getObjectId('Presupuestos'),
        child: [
            getObjectId('CommentPresupuestos4')
        ]
    },
    {
        _id: getObjectId('CommentPresupuestos4'),
        content: "Y mas reuniones",
        publishDate: '2018-11-03',
        contributionType: 'reply',
        user: getObjectId('Junqueras'),
        upvoted: [

        ],
        parent: getObjectId('CommentPresupuestos3'),
        topParent: getObjectId('Presupuestos'),
        child: [
            getObjectId('CommentPresupuestos5')
        ]
    },
    {
        _id: getObjectId('CommentPresupuestos5'),
        content: "Y menos comentarios",
        publishDate: '2018-11-03',
        contributionType: 'reply',
        user: getObjectId('Sanchez'),
        upvoted: [

        ],
        parent: getObjectId('CommentPresupuestos4'),
        topParent: getObjectId('Presupuestos')
    },


    // EXILIO I ELS SEUS COMENTARIS
    {
        _id: getObjectId('Exilio'),
        title: 'Los exilios no son propios de un estado democratico del siglo XXI',
        content: 'https://www.twitter.com',
        publishDate: '2018-05-30',
        contributionType: 'url',
        user: getObjectId('Valtonyc'),
        upvoted: [
            getObjectId('Puigdemont'),
            getObjectId('Junqueras')
        ],
        points: 2,
        child: [
            getObjectId('CommentExilio1')
        ]
    },
    {
        _id: getObjectId('CommentExilio1'),
        content: "Verdad",
        publishDate: '2018-06-01',
        contributionType: 'comment',
        user: getObjectId('Echenique'),
        upvoted: [
            getObjectId('Valtonyc')
        ],
        points: 1,
        parent: getObjectId('Exilio'),
        topParent: getObjectId('Exilio'),
        child: [
            getObjectId('CommentExilio2'),
            getObjectId('CommentExilio3')
        ]
    },
    {
        _id: getObjectId('CommentExilio2'),
        content: "Mentira",
        publishDate: '2018-06-01',
        contributionType: 'reply',
        user: getObjectId('Casado'),
        upvoted: [

        ],
        parent: getObjectId('CommentExilio1'),
        topParent: getObjectId('Exilio')
    },
    {
        _id: getObjectId('CommentExilio3'),
        content: "Relativo",
        publishDate: '2018-06-01',
        contributionType: 'reply',
        user: getObjectId('Sanchez'),
        upvoted: [
            getObjectId('Rubalcaba')
        ],
        points: 1,
        parent: getObjectId('CommentExilio1'),
        topParent: getObjectId('Exilio'),
        child: [
            getObjectId('CommentExilio4')
        ]

    },
    {
        _id: getObjectId('CommentExilio4'),
        content: "Puta logica",
        publishDate: '2018-06-02',
        contributionType: 'reply',
        user: getObjectId('Echenique'),
        upvoted: [
            getObjectId('Sanchez')
        ],
        points: 1,
        parent: getObjectId('CommentExilio3'),
        topParent: getObjectId('Exilio')
    },


    // GREATTIMES I ELS SEUS COMENTARIS
    {
        _id: getObjectId('GreatTimes'),
        title: 'La mejor época de España',
        content: 'https://www.youtube.com/watch?v=mnP_z4tXDCQ',
        publishDate: '2018-01-01',
        contributionType: 'url',
        user: getObjectId('Rivera'),
        upvoted: [
            getObjectId('Aznar')
        ],
        points: 1,
        child: [
            getObjectId('CommentGreatTimes1'),
            getObjectId('CommentGreatTimes3')
        ]
    },
    {
        _id: getObjectId('CommentGreatTimes1'),
        content: "Viva",
        publishDate: '2018-06-02',
        contributionType: 'comment',
        user: getObjectId('Aznar'),
        upvoted: [
            getObjectId('Rajoy')
        ],
        points: 1,
        parent: getObjectId('GreatTimes'),
        topParent: getObjectId('GreatTimes'),
        child: [
            getObjectId('CommentGreatTimes2')
        ]
    },
    {
        _id: getObjectId('CommentGreatTimes2'),
        content: "La mejor epoca va a ser exhumada, viva!",
        publishDate: '2018-06-02',
        contributionType: 'reply',
        user: getObjectId('Sanchez'),
        upvoted: [
            getObjectId('Echenique')
        ],
        points: 1,
        parent: getObjectId('CommentGreatTimes1'),
        topParent: getObjectId('GreatTimes')
    },
    {
        _id: getObjectId('CommentGreatTimes3'),
        content: "Pfffffff",
        publishDate: '2018-06-02',
        contributionType: 'comment',
        user: getObjectId('Valtonyc'),
        upvoted: [
            getObjectId('Junqueras')
        ],
        points: 1,
        parent: getObjectId('GreatTimes'),
        topParent: getObjectId('GreatTimes'),
        child: [
            getObjectId('CommentGreatTimes4')
        ]
    },
    {
        _id: getObjectId('CommentGreatTimes4'),
        content: "Sr Valtonyc vuelva a España",
        publishDate: '2018-06-02',
        contributionType: 'reply',
        user: getObjectId('Llarena'),
        upvoted: [
            getObjectId('Valtonyc')
        ],
        points: 1,
        parent: getObjectId('CommentGreatTimes3'),
        topParent: getObjectId('GreatTimes')
    },


    // INTERMEDIO I ELS SEUS COMENTARIS
    {
        _id: getObjectId('Intermedio'),
        title: 'El mejor capitulo del intermedio',
        content: 'https://www.lasexta.com',
        publishDate: '2018-11-12',
        contributionType: 'url',
        user: getObjectId('Wyoming'),
        upvoted: [
            getObjectId('Echenique')
        ],
        points: 1,
        child: [
            getObjectId('CommentIntermedio1'),
            getObjectId('CommentIntermedio2'),
            getObjectId('CommentIntermedio3')        ]
    },
    {
        _id: getObjectId('CommentIntermedio1'),
        content: "Buen programa",
        publishDate: '2018-11-13',
        contributionType: 'comment',
        user: getObjectId('Puigdemont'),
        upvoted: [
            getObjectId('Valtonyc')
        ],
        points: 1,
        parent: getObjectId('Intermedio'),
        topParent: getObjectId('Intermedio')
    },
    {
        _id: getObjectId('CommentIntermedio2'),
        content: "Si senyor",
        publishDate: '2018-11-14',
        contributionType: 'comment',
        user: getObjectId('Junqueras'),
        upvoted: [
            getObjectId('Valtonyc')
        ],
        points: 1,
        parent: getObjectId('Intermedio'),
        topParent: getObjectId('Intermedio')
    },
    {
        _id: getObjectId('CommentIntermedio3'),
        content: "Grans",
        publishDate: '2018-11-15',
        contributionType: 'comment',
        user: getObjectId('Junqueras'),
        upvoted: [
            getObjectId('Valtonyc')
        ],
        points: 1,
        parent: getObjectId('Intermedio'),
        topParent: getObjectId('Intermedio'),
        child: [
            getObjectId('CommentIntemedio4')
        ]
    },
    {
        _id: getObjectId('CommentIntermedio4'),
        content: "Siempre",
        publishDate: '2018-11-15',
        contributionType: 'reply',
        user: getObjectId('Wyoming'),
        upvoted: [
            getObjectId('Valtonyc')
        ],
        points: 1,
        parent: getObjectId('CommentIntermedio3'),
        topParent: getObjectId('Intermedio')
    },


    // NBA I ELS SEUS COMENTARIS
    {
        _id: getObjectId('NBA'),
        title: 'El mejor taponador de la historia',
        content: 'https://www.nba.com/news',
        publishDate: '2016-01-15',
        contributionType: 'url',
        user: getObjectId('LeBron'),
        upvoted: [
            getObjectId('Westbrook')
        ],
        points: 1,
        child: [
            getObjectId('CommentNBA1')
        ]
    },
    {
        _id: getObjectId('CommentNBA1'),
        content: "Que va",
        publishDate: '2018-01-16',
        contributionType: 'comment',
        user: getObjectId('Westbrook'),
        upvoted: [

        ],
        parent: getObjectId('NBA'),
        topParent: getObjectId('NBA'),
        child: [
            getObjectId('CommentNBA2')
        ]
    },
    {
        _id: getObjectId('CommentNBA2'),
        content: "Que si",
        publishDate: '2018-01-16',
        contributionType: 'reply',
        user: getObjectId('Curry'),
        upvoted: [
            getObjectId('LeBron')
        ],
        points: 1,
        parent: getObjectId('CommentNBA1'),
        topParent: getObjectId('NBA'),
        child: [
            getObjectId('CommentNBA3')
        ]
    },
    {
        _id: getObjectId('CommentNBA3'),
        content: "Creed a Curry",
        publishDate: '2018-01-16',
        contributionType: 'reply',
        user: getObjectId('LeBron'),
        upvoted: [
            getObjectId('Curry')
        ],
        points: 1,
        parent: getObjectId('CommentNBA2'),
        topParent: getObjectId('NBA'),
        child: [
            getObjectId('CommentNBA4'),
            getObjectId('CommentNBA5')
        ]
    },
    {
        _id: getObjectId('CommentNBA4'),
        content: "Eso",
        publishDate: '2018-01-16',
        contributionType: 'comment',
        user: getObjectId('Curry'),
        upvoted: [

        ],
        parent: getObjectId('CommentNBA3'),
        topParent: getObjectId('NBA')
    },
    {
        _id: getObjectId('CommentNBA5'),
        content: "No",
        publishDate: '2018-01-16',
        contributionType: 'comment',
        user: getObjectId('Westbrook'),
        upvoted: [

        ],
        parent: getObjectId('CommentNBA3'),
        topParent: getObjectId('NBA'),
        child: [
            getObjectId('CommentNBA6')
        ]
    },
    {
        _id: getObjectId('CommentNBA6'),
        content: "Nunca aprenderas",
        publishDate: '2018-01-18',
        contributionType: 'comment',
        user: getObjectId('Curry'),
        upvoted: [
            getObjectId('LeBron')
        ],
        points: 1,
        parent: getObjectId('CommentNBA5'),
        topParent: getObjectId('NBA')
    },


    // TRIPLED I ELS SEUS COMENTARIS
    {
        _id: getObjectId('TripleD'),
        title: 'Quien es el mejor jugador completo de la NBA?',
        publishDate: '2018-10-28',
        contributionType: 'ask',
        user: getObjectId('Westbrook'),
        upvoted: [
            getObjectId('LeBron')
        ],
        points: 1,
        child: [
            getObjectId('CommentTripleD1'),
            getObjectId('CommentTripleD4')
        ]
    },
    {
        _id: getObjectId('CommentTripleD1'),
        content: "Yo",
        publishDate: '2018-01-18',
        contributionType: 'comment',
        user: getObjectId('Curry'),
        upvoted: [
            getObjectId('LeBron')
        ],
        points: 1,
        parent: getObjectId('TripleD'),
        topParent: getObjectId('TripleD'),
        child: [
            getObjectId('CommentTripleD2')
        ]
    },
    {
        _id: getObjectId('CommentTripleD2'),
        content: "soy",
        publishDate: '2018-01-18',
        contributionType: 'reply',
        user: getObjectId('Curry'),
        upvoted: [
            getObjectId('Curry')
        ],
        points: 1,
        parent: getObjectId('CommentTripleD1'),
        topParent: getObjectId('TripleD'),
        child: [
            getObjectId('CommentTripleD3')
        ]
    },
    {
        _id: getObjectId('CommentTripleD3'),
        content: "ese",
        publishDate: '2018-01-18',
        contributionType: 'reply',
        user: getObjectId('Curry'),
        upvoted: [
            getObjectId('Westbrook')
        ],
        points: 1,
        parent: getObjectId('CommentTripleD2'),
        topParent: getObjectId('TripleD')
    },
    {
        _id: getObjectId('CommentTripleD4'),
        content: "No hay nadie más completo",
        publishDate: '2018-01-18',
        contributionType: 'comment',
        user: getObjectId('LeBron'),
        upvoted: [
            getObjectId('LeBron')
        ],
        points: 1,
        parent: getObjectId('TripleD'),
        topParent: getObjectId('TripleD'),
        child: [
            getObjectId('CommentTripleD5')
        ]
    },
    {
        _id: getObjectId('CommentTripleD5'),
        content: "que",
        publishDate: '2018-01-18',
        contributionType: 'reply',
        user: getObjectId('LeBron'),
        upvoted: [
            getObjectId('Westbrook')
        ],
        points: 1,
        parent: getObjectId('CommentTripleD4'),
        topParent: getObjectId('TripleD'),
        child: [
            getObjectId('CommentTripleD6')
        ]
    },
    {
        _id: getObjectId('CommentTripleD6'),
        content: "yo",
        publishDate: '2018-01-20',
        contributionType: 'reply',
        user: getObjectId('LeBron'),
        upvoted: [
            getObjectId('Curry')
        ],
        points: 1,
        parent: getObjectId('CommentTripleD5'),
        topParent: getObjectId('TripleD')
    },
    // FI DELS NOUS


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
        points: 1,
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
        points: 1,
        child: [
            getObjectId('Territorio')
        ]
    },
    {
        _id: getObjectId('Politica'),
        title: 'We need to ask something great',
        content: 'Porque china nos esta superando?',
        publishDate: '2016-11-20',
        contributionType: 'ask',
        user: getObjectId('Trump'),
        upvoted: [
            getObjectId('Gerard'),
            getObjectId('Llarena'),
            getObjectId('Rajoy'),
            getObjectId('Trump')
        ],
        points: 4,
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
        points: 1,
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
        points: 1,
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
        points: 1,
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
        points: 1,
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