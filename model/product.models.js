// const bcrypt = require("bcryptjs");

// const db = require("../data/database");

// class Product {
//   constructor(productData) {
//     (this.title = productData.title),
//       (this.summary = productData.summary),
//       (this.price = productData.price),
//       (this.description = productData.description),
//       (this.image = productData.image);
//   }

//   async addOrders() {
//     //     const zipCode = req.body.zipCode;
//     //   enteredPassword = req.body.password;
//     //   const username = `${req.body.firstName} ${req.body.lastName}`;
//     const hashedPassword = await bcrypt.hash(enteredPassword, 12);

//     const orderInfo = {
//       username: username,
//       email: req.body.email,
//       location: {
//         address: req.body.address,
//         city: req.body.city,
//         country: req.body.country,
//       },
//       telephone: req.body.tel,
//       password: hashedPassword,
//       message: req.body.message,
//     };
//     const order = await db.getDb().collection("orders").insertOne(orderInfo);

//     console.log(order);
//   }

//   async addProduct() {
//     const newProduct = {
//       title: this.title,
//       summary: this.summary,
//       price: this.price,
//       imagePath: this.imagePath,
//     };

//     await db.getDb().collection("products").insertOne(newProduct);
//   }
// }

// module.exports = Product;
