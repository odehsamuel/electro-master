const AdminProduct = require("../model/admin.products.models");

async function getProducts(req, res, next) {
  try {
    const newProduct = await AdminProduct.findProducts();
    res.render("admin-products/all-admin-products", { products: newProduct });
  } catch (error) {
    next(error);
    return;
  }
}

function getNewProducts(req, res) {
  res.render("admin-products/add-products");
}

async function createNewProducts(req, res, next) {
  const product = new AdminProduct({ ...req.body, image: req.file.filename });

  try {
    await product.addProduct();
    res.redirect("/admin/products");
  } catch (error) {
    return next(error);
  }
}

async function getOne(req, res, next) {
  const productID = req.params.productId;

  try {
    const product = await AdminProduct.getOne(productID);
    res.render("admin-products/edit-product", { product: product });
  } catch (error) {
    next(error);
    return;
  }
}

async function updateOne(req, res, next) {
  const product = new AdminProduct({ ...req.body, _id: req.params.productId });

  if (req.file) {
    // sumtin here
  }

  try {
    const updated = await AdminProduct.update()
    console.log(updated);
    res.redirect("/admin/products");
  } catch (error) {
    next(error);
    return;
  }
}

async function removeProduct(req, res, next) {
  const product = await getOne(req.params.productId)
  
  // await product.
  res.json({
    message : "Product deleted successfully!"
  })
}

module.exports = {
  getProducts: getProducts,
  getNewProducts: getNewProducts,
  createNewProducts: createNewProducts,
  getOne: getOne,
  updateOne: updateOne,
  removeProduct : removeProduct
};
