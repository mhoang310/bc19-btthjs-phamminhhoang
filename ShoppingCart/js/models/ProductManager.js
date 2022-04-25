function ProductManager() {
    this.products = [];
}

ProductManager.prototype.getProducts = function () {
    // Call API to get products
    return new Promise((resolve, reject) => {
        axios.get("https://625a7352cda73d132d1f54c3.mockapi.io/api/products").then((result) => {
            this.products = result.data.map((item) => {
                const product = new Product (                                        
                    item.name,
                    item.price,
                    item.screen,
                    item.backCamera,
                    item.frontCamera,
                    item.img,
                    item.desc,
                    item.type,
                );
                // Gan id cho object
                product.id = item.id;                
                
                return product;
            });
            localStorage.setItem("products", JSON.stringify(productManager.products));            
            resolve();
            
        }).catch((error) => {
            reject(error)
            alert("Cannot get product list");
        });
    })
     
};

ProductManager.prototype.getProductById = function () {};

ProductManager.prototype.creatProduct = function () {};

ProductManager.prototype.updateProduct = function () {};

ProductManager.prototype.deleteProduct = function () {};
