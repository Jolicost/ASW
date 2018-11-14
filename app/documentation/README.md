# Autorització mitjançant tokens

Per a tal d'autoritzar usuaris en la API, s'utilitza la especificació JWT.

Podeu trobar més informació sobre com s'ha implementat l'autenticació en el següent enllaç:
https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens

## El funcionament bàsic del mecanisme d'autenticació es:

1. Cada vegada que es fa login (normal o amb github) Es genera un token
  * Aquest token es genera utilitzant: user.\_id + secretKey
  * Cada vegada que es torna a fer login es genera un altre token. Pero els anteriors **son valids**
1. El token surt al perfil del teu usuari. Es pot copiar facilment
1. Per a fer proves o bé verificar l'identitat d'un usuari, es pot utilitzar la ruta **/verify**
  * Heu d'incloure un HEADER HTTP anomenat
    * key: x-access-token 
    * value: el valor del token que tingueu al vostre perfil
  * Podeu fer una petició de prova amb POSTman a aquesta url i incorporant el token adequat
  * Si tot és correcte el servidor us retornarà les dades del vostre usuari
1. El servidor desencripta la informació del token i comprova si el token és correcte
1. Si és correcte, llavors es pot extreure la user.\_id (i per tant recuperar l'usuari original)
1. Aquesta funcionalitat es pot fer servir per a autoritzar certes parts de la API. Mireu el sessionController per a més informació