const router = require('express').Router();
const pug = require('pug');

router.get('/', (req, res, next) => {
  res.status(200).render('index.pug', {
    pageTitle: 'BA Planner'
  });
})

module.exports = router;