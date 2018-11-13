# Sessió 07: Segon lliurament (30% Nota del Projecte)

## Què inclou el Segon Lliurament?

Per a aquest segon lliurament heu de dissenyar i implementar una API REST de nivell 2 del RMM (Richardson Maturity Model) per a la vostra aplicació web:

* La vostra API ha d'exposar les mateixes funcionalitats que l'aplicació web del primer lliurament, excepte la de login.
* Les representacions del recursos que s'obtindran a les respostes així com el format de les dades que s'inclouran a les peticions PUT i POST seran en JSON.
* Documentareu l'API segons la OpenAPI Specification:
    * Utilitzeu l'editor de Swagger http://editor.swagger.io/ tant per editar aquesta documentació com per provar-la. 
    * Versió de OpenAPI: 2.0 o superior (3.0.x).
* Autentificació: OpenAPI suporta varis tipus d'autentificació/autorització, essent el més senzill el basat en api-keys. Per tant, feu que tot usuari que es pugui loguejar a la vostra aplicació web disposi d'una api-key que podrà veure quan vagi a la pàgina del seu perfil. Aquesta api-key s'inclourà a totes les peticions de l'API i es comprovarà que 1) sigui correcta i 2) correspongui a l'usuari apropiat en aquelles peticions que comportin canvis en el domini (POST, PUT i DELETE).
* El fet d'utiltitzar els editor de Swagger també com a eina per provar la vostra API us obligarà a utilizar CORS. En Ruby on Rails hi ha "gems" per això.

## Què s'ha de lliurar?

El vostre repositori Bitbucket/GitHub és el vostre lliurament, així com la demo que fareu a classe de la vostra API. Per tant, assegureu-vos que al vostre repositori hi ha tota la info necessària. Concretament:

* El fitxer /api/api.yaml, amb la documentació de la vostra API, feta amb un editor de Swagger.
* Issue Tracker amb la info de com us heu distribuït les tasques i les incidències/problemes que heu tingut..

## Com s'ha de lliurar?

Un membre de l'equip ha de clicar a sobre el botó "Afegir Tramesa" que hi ha a sota d'aquesta pàgina i editar el camp de text que apareix per tal d'escriure-hi la URI del vostre repositori Bitbucket/GitHub. 

Després de "Desa els canvis", assegureu-vos que cliqueu el botó "Trametre tasca".

## Com s'avaluarà?

El vostre lliurament tindrà una nota que es calcularà:

* Info del repositori (pàgina principal, Issue Tracker): 10%
* Disseny i documentació API: 45 %
* Implementació API: 45 %

Cada membre del grup tindrà una nota individualitzada que es calcularà multiplicant la nota del lliurament pel "coeficient de participació" de l'alumne. Aquest "coeficient de participació" es calcularà a partir de la valoració feta pels companys de grup a través de l'enquesta penjada a Atenea.

## Què farem a classe

1. Fareu la demo de l'API: carregareu el vostre fitxer api.yaml a un dels editors de Swagger i explicareu i provareu la vostra API des d'aquesta eina.
1. Fixarem la to-do list per a la següent sessió
