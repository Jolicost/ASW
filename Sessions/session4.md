# Session 4 Delivery
## Què inclou el Primer Lliurament?

1. La implementació del cas d'ús previst per a la Sessió 02, revisada i corregida, si cal.
    * S'ha d'evitar donar d'alta urls repetits, encara que el títol sigui diferent. Tal com fa HN en aquests casos, si l'url ja existeix, es mostra la pàgina que visualitza aquella Contribució.
1. Implementació de la resta de funcionalitats:
    * Publicació de noves Contribucions de tipus "ask". Recordeu que si s'omplen alhora els camps "url" i "text", cal retornar un missatge d'error tal com fa HN.
    * Fer comentaris sobre Contribucions tipus "ask" i "url".
    * Visualització d'una Contribució, amb tots els seus  comentaris i les rèpliques a aquests.
    * Fer rèpliques sobre comentaris.
    * Votar Contribucions de tot tipus (url, ask, comentaris i rèpliques).
    * Registre / Login d'usuaris. Una diferència respecte al HN original: per fer el registre i el login heu d'utilitzar el "Sign In" extern de Google, Twitter, GitHub o similar (només un d'aquests). Mireu d'utilitzar gems que proporcionin aquesta funcionalitat. De fet, no cal que hi hagi diferència entre login i registre: quan l'usuari es loguegi per primera vegada es dóna d'alta com a usuari del sistema.
    * Veure i Editar perfils d'usuari.
    * Llistats: a banda dels 2 llistats que ja heu fet per al cas d'ús de la Sessió 02,  feu-ne també el llistat de Contribucions de tipus "ask" i el llistat de threads. La resta de llistats del Hacker-News original (comments, show, jobs, ...) no són necessaris.

El Look & Feel hauria de ser semblant, però no cal que sigui idèntic.

## Què s'ha de lliurar?

El vostre repositori Bitbucket/GitHub és el vostre lliurament, així com la demo que fareu a classe de les funcionalitats implementades. Per tant, assegureu-vos que al vostre repositori hi ha tota la info necessària. Concretament:

* Issue Tracker amb la info de com us heu distribuït les tasques i les incidències/problemes que heu tingut.
* Pàgina Principal amb la següent info:
    * Nom de tots els membres de l'equip.
    * Link a la vostra aplicació desplegada a heroku.

## Com s'ha de lliurar?

Un membre de l'equip ha de clicar a sobre el botó "Afegir Tramesa" que hi ha a sota d'aquesta pàgina i editar el camp de text que apareix per tal d'escriure-hi la URI del vostre repositori Bitbucket/GitHub. 

Després de "Desa els canvis", assegureu-vos que cliqueu el botó "Trametre tasca".

## Com s'avaluarà?

El vostre lliurament tindrà una nota que es calcularà:

* Info del repositori (pàgina principal, issue tracker): 10% 
* Implementació cas d'us de la sessió 02: 15%
* Implementació publicació de contribucions "ask": 5%
* Implementació visualització contribucions amb comentaris/rèpliques (tot l'arbre): 5%
* Implementació comentaris: 5%
* Implementació rèpliques: 5%
* Implementació votacions: 15%
* Implementació registre/login usuaris: 20%
* Implementació veure/editar perfils d'usuari: 10%
* Implementació dels llistats ask i threads: 10%

Cada membre del grup tindrà una nota individualitzada que es calcularà multiplicant la nota del lliurament pel "coeficient de participació" de l'alumne. Aquest "coeficient de participació" es calcularà a partir de la valoració feta pels companys de grup a través de l'enquesta penjada a Atenea.

## Què farem a classe?

1. Fareu la demo de l'aplicació.
1. Fixarem la to-do list per a la següent sessió
