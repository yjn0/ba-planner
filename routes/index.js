const router = require('express').Router();
const pug = require('pug');

router.get('/', (req, res, next) => {
  const webpackPath = process.env.NODE_ENV === 'development' ?
    'http://localhost:8888/main.bundle.js' :
    '/public/packs/main.bundle.js'

  res.status(200).render('index.pug', {
    pageTitle: 'BA Planner',
    webpackPath
  });
})

module.exports = router;