const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./products2.json";
    this.products = [];
    this.id = 0;
    const createFile = async () => {
      if (!fs.existsSync("./products2.json")) {
        return await fs.promises.writeFile("./products2.json", "[]");
      }
    };
    createFile();
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const files = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(files);
    this.products = products;

    const errorCode = this.products.find((product) => product.code == code);

    if (errorCode) {
      console.log("Error in the code, this code already exists");
    } else {
      this.id++;
      title = title || "No value entered";
      description = description || "No value entered";
      price = price || "No value entered";
      thumbnail = thumbnail || "No value entered";
      code = code || "No value entered";
      stock = stock || "No value entered";

      if (
        title == "No value entered" ||
        description == "No value entered" ||
        price == "No value entered" ||
        thumbnail == "No value entered" ||
        code == "No value entered" ||
        stock == "No value entered"
      ) {
        console.log("Error, fields not completed");
      } else {
        const product = {
          id: this.id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };

        this.products.push(product);
        const productsToString = JSON.stringify(this.products);
        await fs.promises.writeFile(this.path, productsToString);
      }
    }
  }

  async getProducts() {
    const filesProducts = await fs.promises.readFile(this.path, "utf-8");
    const filesProductsToParse = JSON.parse(filesProducts);
    console.log(filesProductsToParse);
  }

  async getProductById(id) {
    const filesProducts = await fs.promises.readFile(this.path, "utf-8");
    const filesProductsToParse = JSON.parse(filesProducts);
    const findProduct = filesProductsToParse.find(
      (product) => product.id == id
    );

    if (findProduct) {
      return console.log(findProduct);
    } else {
      console.log("Product not found");
    }
  }

  async updateProduct(id, prop, newValor) {
    const filesProducts = await fs.promises.readFile(this.path, "utf-8");
    const filesProductsToParse = JSON.parse(filesProducts);

    const findProduct = filesProductsToParse.find(
      (product) => product.id == id
    );

    if (findProduct == undefined) {
      console.log("Product not found");
    } else {
      findProduct[prop] = newValor;
      const productsToString = JSON.stringify(filesProductsToParse);
      await fs.promises.writeFile(this.path, productsToString);
    }
  }

  async deleteProduct(id) {
    const filesProducts = await fs.promises.readFile(this.path, "utf-8");
    const filesProductsToParse = JSON.parse(filesProducts);

    const positionProduct = filesProductsToParse.findIndex(
      (product) => product.id == id
    );

    if (positionProduct == -1) {
      console.log("Product not found");
    } else {
      delete filesProductsToParse[positionProduct];
      const productsDelete = filesProductsToParse.filter(
        (product) => product !== undefined
      );

      const productsToString = JSON.stringify(productsDelete);
      await fs.promises.writeFile(this.path, productsToString);
    }
  }
}

const productManager = new ProductManager();

async function prodFunc() {
  await productManager.addProduct(
    "prueba1",
    "Esta es la descripcion de una prueba1",
    1500,
    "Without image",
    "AAA001",
    36
  );

  await productManager.addProduct(
    "prueba2",
    "Esta es la descripcion de un prueba2",
    2050,
    "Without image",
    "AAA002",
    29
  );

  await productManager.addProduct(
    "prueba3",
    "Esta es la descripcion de una prueba3",
    1685,
    "Without image",
    "AAA003",
    32
  );

  await productManager.getProducts();

  await productManager.updateProduct(2, "title", "nuevo titulo");

  await productManager.getProductById(2);

  await productManager.deleteProduct(3);

  await productManager.getProducts();
}

prodFunc();
