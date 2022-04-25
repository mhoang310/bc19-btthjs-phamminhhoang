function ProductManager() {
    this.products = [];
}

ProductManager.prototype.getProducts = function () {
    // Call API get list product    
    // Brower data at ProductManager.js
    return new Promise((resolve, reject) => {
        axios.get("https://625a7352cda73d132d1f54c3.mockapi.io/api/products").then((result) => {
            this.products = result.data.map((item) => {
                const product = new Product(
                    item.name,
                    item.price,
                    item.screen,
                    item.backCamera,
                    item.frontCamera,
                    item.img,
                    item.desc,
                    item.type,
                );
                // Assign id
                product.id = item.id;

                return product;
            });
            resolve(); 
        })
        .catch((error) => {
            console.log(error.response.data); 
            reject(error);
            alert("Cannot get product list");
        })
    });
};

ProductManager.prototype.getProductById = function (productID) {
    return axios.get(`https://625a7352cda73d132d1f54c3.mockapi.io/api/products/${productID}`)
};

ProductManager.prototype.createProduct = function (product) {
    return axios.post(
        "https://625a7352cda73d132d1f54c3.mockapi.io/api/products", 
        product
    ).then(() => {
        // Add success => call API
        return this.getProducts();
    });
};

ProductManager.prototype.updateProduct = function (productID, product) {
    return axios.put(`https://625a7352cda73d132d1f54c3.mockapi.io/api/products/${productID}`, product).then(() => {
        // update success => call API get list product
        return this.getProducts();
    });
};

ProductManager.prototype.deleteProduct = function (productID) {
    return axios.delete(`https://625a7352cda73d132d1f54c3.mockapi.io/api/products/${productID}`).then(() => {
        return this.getProducts();
    });

};



