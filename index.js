const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

// NO MODIFICAR AQUEST

express()
  .use(express.static(path.join(__dirname, 'app/public')))
  .set('views', path.join(__dirname, 'app/views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index_old'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
