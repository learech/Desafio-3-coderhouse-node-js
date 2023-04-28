import { promises as fs } from "fs";

export default class ProductManager {
    constructor() {
        this.path = "./productos.txt";
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, img, code, stock) => {
        ProductManager.id++;

        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id: ProductManager.id,
        };

        this.products.push(newProduct);

        await fs.writeFile(this.path, JSON.stringify(this.products, null, 1));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path, "utf-8");
        return JSON.parse(respuesta);
    };

    getProducts = async () => {
        let respuesta2 = await this.readProducts();
        return console.log(respuesta2);
    };

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        if (!respuesta3.find((product) => product.id === id)) {
            console.log("Producto no disponible");
        } else {
            console.log(respuesta3.find((product) => product.id === id));
        }
    };

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter((products) => products.id != id);
        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("Producto borrado");
    };

    updateProducts = async ({ id, ...producto }) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts();
        let productsModified = [{ ...producto, id }, ...productOld];
        await fs.writeFile(this.path, JSON.stringify(productsModified));
    };
}

//const productos = new ProductManager();

// productos.addProduct("Mania de futsal", "Rodilleras negras", 20000, "https://picsum.photos/200/300", "abc123", 20);
// productos.addProduct("Asics", "Rodilleras blancas", 30000, "https://picsum.photos/200/300", "abc124", 15);
// productos.addProduct("Reusch", "Rodilleras soft negras", 10000, "https://picsum.photos/200/300","abc125",30);
// productos.addProduct("Adidas", "Coderas negras", 10000, "https://picsum.photos/200/300", "abc126", 15);
// productos.addProduct("Sonder", "Coderas negras", 20000, "https://picsum.photos/200/300", "abc127", 15);
// productos.addProduct("Topper", "Coderas negras", 15000, "https://picsum.photos/200/300", "abc128", 15);
// productos.addProduct("Kion", "Coderas negras", 17000, "https://picsum.photos/200/300", "abc129", 15);
// productos.addProduct("Reebok", "Coderas negras", 20000, "https://picsum.photos/200/300", "abc130", 15);
// productos.addProduct("Nike", "Coderas negras", 10000, "https://picsum.photos/200/300", "abc131", 15);
// productos.addProduct("Umbro", "Coderas negras", 10000, "https://picsum.photos/200/300", "abc132", 15);

//productos.getProducts()

// productos.getProductsById(2)

// productos.deleteProductsById(1)

// productos.updateProducts({
//   title: "Reusch",
//   description: "Rodilleras soft blancas",
//   price: 12000,
//   imagen: "https://picsum.photos/200/300",
//   code: "abc125",
//   stock: 20,
//   id: 3
// })
