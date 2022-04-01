//this file for routes is specific to the individual user
const express = require('express'),
  router = express.Router();

  const Products = require('../models/products_model');
  //let boards = Boards.getBoards(userID);

  function loggedIn(request, response, next) {
    console.log("middleware")
    if (request.user) {
      next();
    } else {
      response.redirect('/login');
    }
  }

  router.get('/MyBoards/products/:boardId',loggedIn, function(request, response) {//external routes
    let boardId=request.params.boardId;
    let productIds=Products.boardProducts(boardId);
    let productTitles=Products.productTitles(productIds);
    let productPrice=Products.productPrice(productIds);
    let productLink=Products.productLink(productIds);
    let productImage=Products.productImage(productIds);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("MyBoards/products/products", {
      user: request.user,
      productTitles:productTitles,
      productId:productIds,
      boardId:boardId,
      productPrice:productPrice,
      productLink:productLink,
      productImage:productImage
    });
  });

module.exports = router;
