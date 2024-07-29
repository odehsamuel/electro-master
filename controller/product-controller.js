const Product = require("../model/product.models");

function getStore(req, res) {
  res.render("users-products/store");
}

function getCheckout(req, res) {
  res.render("users-products/checkout");
}

async function checkout(req, res) {
  const product = new Product(req.body);

  await product.addOrders();
  res.redirect("/blank");
}

function getProducts(req, res) {
  res.render("users-products/product");
}

module.exports = {
  getStore: getStore,
  getCheckout: getCheckout,
  checkout: checkout,
  getProducts: getProducts
};
