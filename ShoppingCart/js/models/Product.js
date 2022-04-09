// function Product(name, price, screen, backCamera, frontCamera, img, desc, type, id) {        
//     this.name = name;
//     this.price = price;
//     this.screen = screen;
//     this.backCamera = backCamera;
//     this.frontCamera = frontCamera;
//     this.img = img;
//     this.desc = desc;
//     this.type = type;
//     this.id = id;
// }

class Product {
    constructor(name, price, screen, backCamera, frontCamera, img, desc, type, id) {
        this.name = name;
        this.price = price;
        this.screen = screen;
        this.backCamera = backCamera;
        this.frontCamera = frontCamera;
        this.img = img;
        this.desc = desc;
        this.type = type;
        this.id = id;

        this.arrayCart = [this.name, this.price, this.img, this.id]
    }
}

function CartItem(id, quantity) {
    const productCart = new Object();
    productCart.id = id;        
    productCart.quantity = quantity;
    return productCart;
}

