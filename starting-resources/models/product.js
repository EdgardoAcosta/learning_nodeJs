const fs = require("fs");
const path = require("path");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, content) => {
      let products = [];
      if (!err) {
        try {
          products = JSON.parse(content);
        } catch (err) {}
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (error) => {
        console.log(err);
      });
    });
  }

  static fetcAll(cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    console.log(p);

    fs.readFile(p, "utf8", (err, content) => {
      if (err) {
        cb([]);
      } else {
        let data = [];
        try {
          data = JSON.parse(content);
        } catch (err) {}

        cb(data);
      }
    });
  }
};
