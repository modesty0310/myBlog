var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/category/:name', function(req, res, next) {
  let category = req.params.name;

  req.database.query(`SELECT * FROM post join category on post.category=category.name WHERE url = '${category}'`, (err, rows) => {
    if(err) throw err;

    req.database.query(`SELECT * FROM category WHERE url = '${category}';`, (err, cat) => {
      if(err) throw err;
      console.log(cat[0])
      
      res.render('category', {
        session: req.session,
        posts: rows,
        selectedCategory: cat[0].name,
        categories: req.categories
      })
    })
  })
});

module.exports = router;