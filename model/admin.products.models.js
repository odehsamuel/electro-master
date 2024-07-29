const mongodb = require("mongodb");
const bcrypt = require("bcryptjs");

const db = require("../data/database");

class AdminProduct {
  constructor(productData) {
    (this.title = productData.title),
      (this.summary = productData.summary),
      (this.category = productData.category),
      (this.price = +productData.price),
      (this.oldprice = +productData.price - 10.5),
      (this.description = productData.description),
      (this.image = productData.image),
      (this.imagePath = `product-data/images/${productData.image}`),
      (this.imageUrl = `/products/assets/images/${productData.image}`);
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static async findProducts() {
    const products = await db.getDb().collection("products").find().toArray();

    return products.map(function (product) {
      return new AdminProduct(product);
    });
  }

  static async getOne(productId) {
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: new mongodb.ObjectId(productId) });

    if (!product) {
      const error = new Error("Sorry pls, this product has not been created");
      error.code = 404;
      throw error;
    }
    return product;
  }

  static async update() {
    const newProduct = {
      title: this.title,
      price: this.price,
      image: this.image,
      description: this.description,
      category: this.category,
      summary: this.summary,
      // oldprice: this.oldprice,
    };

    let prodId;
    // try {
    prodId = new mongodb.ObjectId(this.id);
    // } catch (error) {
    //   return;
    // }

    await db
      .getDb()
      .collection("products")
      .updateOne({ _id: prodId }, { $set: newProduct });
  }

  async addProduct() {
    const newProduct = {
      title: this.title,
      price: this.price,
      image: this.image,
      description: this.description,
      category: this.category,
      summary: this.summary,
      // oldprice: this.oldprice,
    };

    let prodId;
    // try {
    prodId = new mongodb.ObjectId(this.id);
    // } catch (error) {
    //   return;
    // }

    if (prodId) {
      await db
        .getDb()
        .collection("products")
        .updateOne({ _id: prodId }, { $set: newProduct });
    } else {
      await db.getDb().collection("products").insertOne(newProduct);
    }
  }

  remove() {
    let prodId
    try{
    prodId = new mongodb.ObjectId(this.id);
    }catch(error){
      return console.log(error)
    }
    db.getDb().collection("products").deleteOne({_id : prodId})
  }
}

module.exports = AdminProduct;
