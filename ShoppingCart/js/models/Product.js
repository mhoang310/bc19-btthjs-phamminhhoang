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
        
    }
}

class CartItem {
    constructor(name, price, screen, backCamera, frontCamera, img, desc, type, id, quantity) {
        this.name = name;
        this.price = price;
        this.screen = screen;
        this.backCamera = backCamera;
        this.frontCamera = frontCamera;
        this.img = img;
        this.desc = desc;
        this.type = type;
        this.id = id;
        this.quantity = quantity;        
    }

    totalPrice() {
        return this.price * this.quantity
    }
}
