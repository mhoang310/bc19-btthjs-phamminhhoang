const productManager = new ProductManager();
init();
jsonProduct(); // get list products
jsonCart(); // get list casts

// Default function
function init() {
    // Get list products
    productManager.getProducts().then(() => {                
        // Display products        
        display(productManager.products);
        displayCart(cartList);
        
        // resolve sum quantity 
        let sumQuantity = cartList.reduce((result, item) => {
            return result += item.quantity;
        }, 0);
        displayQuantity(sumQuantity);

        // resolve total price
        let total = cartList.reduce((result, item) => {
            return result += item.totalPrice();
        }, 0);
        displayTotal(total);
    });
}

// get list products
function jsonProduct() {
    // Get data from localStorage to set variable productList
    const data = JSON.parse(localStorage.getItem("products")) || [];
    // When get list products, then need to browse the list & new again object productList to get methods of Object
    const productList = data.map(item => {
        return new Product(item.name, item.price, item.screen, item.backCamera, item.frontCamera, item.img, item.desc, item.type, item.id)        
    })
    this.productList = productList;    
}

const cartProducts = productList.map(item => item);
let carts = [];

console.log(cartProducts);

// Resolve search product
document.getElementById('cardSearch').addEventListener('click', () => {
    const searchValue = document.getElementById('inputGroupSelect04').value;
    // Use filter to search
    productManager.getProducts().then(() => {
        const arrayProduct = productManager.products.filter(product => product.type === searchValue);
        // console.log(arrayProduct);        
        display(arrayProduct);
    })    
})

// Resolve button Home
document.getElementById('cardHome').addEventListener('click', () => {
    init();
})

function display(products) {
    const cards = document.getElementById("cardList");
    const html = products.reduce((result, product, index) => {        
        return result + `
            <div class="cardd">
                <div class="top-bar">
                    <i class="fab fa-gitlab"></i>                    
                    <em class="stocks">In Stock</em>
                </div>
                <div class="img-container">
                    <img class="product-img" src="${product.img}" alt>
                    <div class="out-of-stock-cover">
                        <span>Out Of Stock</span>
                    </div>
                </div>
                <div class="details">
                    <div class="name-fav">
                        <strong class="product-name">${product.name}</strong>
                        <button onclick="this.classList.toggle('fav')" class="heart">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                    <div class="wrapper">
                        <h5>${product.screen}</h5>                        
                        <p>${product.backCamera}</p>
                        <p>Phụ: ${product.frontCamera}</p>
                        <p>${product.desc}</p>
                        <h5>${product.type}</h5>
                    </div>
                    <div class="purchase">
                        <p class="product-price">$ ${product.price}</p>
                        <span class="btn-add">
                            <div>
                                <button class="add-btn" data-id="${product.id}" data-type="addCart">
                                    Add 
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        `
    }, "");

    cards.innerHTML = html;
}

// Resolve button "addCart"
document.getElementById('cardList').addEventListener("click", (event) => {
    const targetEl = event.target;    
    
    const id = targetEl.getAttribute('data-id');
    const type = targetEl.getAttribute('data-type');
    if(type === 'addCart') {
        addToCart(id);                        
    }    
})

function addToCart(id) {
    const isExisted = carts.findIndex((item) => item.id === id) !== -1;

    if (isExisted) {
        // product is existed
        for (let i = 0; i < carts.length; i++) {
            const itemCart = carts[i];
            if (itemCart.id === id) {
                carts[i].quantity++;                
            }
        }        
    } else {
        // product is not existed
        const cardItem = productById(id)        
        carts.push(cardItem);
    }    
    // console.log(carts);    
    displayCart(carts);

    // resolve sum quantity 
    let sumQuantity = carts.reduce((result, item) => {
        return result += item.quantity;
    }, 0);
    displayQuantity(sumQuantity);

    // resolve total price
    let total = carts.reduce((result, item) => {
        return result += item.totalPrice();
    }, 0);
    displayTotal(total);

    localStorage.setItem("carts", JSON.stringify(carts));                    
}

function productById(id) {    
    let cardItem = {};

    for (let i = 0; i < cartProducts.length; i++) {
        if(cartProducts[i].id === id) {
            cardItem = cartProducts[i];
        }
    }
    cardItem = new CartItem(cardItem.name, cardItem.price, cardItem.screen, cardItem.backCamera, cardItem.frontCamera, cardItem.img, cardItem.desc, cardItem.type, id, 1);
    return cardItem; 
}

function jsonCart() {
    // Get data from localStorage to set variable cartList
    const data = JSON.parse(localStorage.getItem("carts")) || [];
    // When get list products, then need to browse the list & new again object productList to get methods of Object
    const cartList = data.map(item => {
        return new CartItem(item.name, item.price, item.screen, item.backCamera, item.frontCamera, item.img, item.desc, item.type, item.id, item.quantity);        
    })
    this.cartList = cartList;    
}

// Resolve decrease/increase/delete 1 product
document.getElementById('cardTbody').addEventListener("click", (event) => {
    const targetEl = event.target;
    // console.log(targetEl);
    const id = targetEl.getAttribute('data-id');
    const type = targetEl.getAttribute('data-type');
    if(type === "increase") {
        handleIncrease(id);
        displayCart(carts);
        // resolve sum quantity 
        let sumQuantity = carts.reduce((result, item) => {
            return result += item.quantity;
        }, 0);
        displayQuantity(sumQuantity);

        // resolve total price
        let total = carts.reduce((result, item) => {
            return result += item.totalPrice();
        }, 0);
        displayTotal(total);        
    }
    if(type === "decrease") {        
        handleDecrease(id);
        displayCart(carts);
        // resolve sum quantity 
        let sumQuantity = carts.reduce((result, item) => {
            return result += item.quantity;
        }, 0);
        displayQuantity(sumQuantity);

        // resolve total price
        let total = carts.reduce((result, item) => {
            return result += item.totalPrice();
        }, 0);
        displayTotal(total);
    }

    if(type === "delete") {        
        handleDelete(id);
        displayQuantity(0);
        displayTotal(0);
    }
})

// Resolve clear carts
document.getElementById('deleteEL').addEventListener("click", () => {
    callUser("You want to clear products");
    removeCarts();
    displayCart(carts);
    displayQuantity(0);
    displayTotal(0);
});

// Resolve buy carts
document.getElementById('buyEl').addEventListener("click", () => {    
    removeCarts();
    displayCart(carts);
    displayQuantity(0);
    displayTotal(0);
});

function handleIncrease(id) {
    const item = carts.find((item) => item.id === id);    
    if(item.id === id); {
        item.quantity++;
    }                  
}

function handleDecrease(id) {
    let item = carts.find((item) => item.id === id);
    if(item.quantity <= 1) {
        return item = carts.filter((item) => item.id !== id);
        // return carts = [];                
    }
    if(item.id === id); {
        item.quantity--;
    }                  
}

function handleDelete(id) {        
    const removeCart = carts.filter((item) => item.id !== id);  
    displayCart(removeCart);                      
}

function removeCarts() {
    return carts = [];
}

function displayCart(carts) {
    const cartShops = document.getElementById("cardTbody");
    const html = carts.reduce((result, product) => {
        return result + `
            <tr>
                <th>${product.id}</th>
                <th>${product.name}</th>
                <th><img src="${product.img}" width="50" height="50"></th>                
                <th>
                    <button class="btn" data-id="${product.id}" data-type="decrease">-</button>                    
                    ${product.quantity}
                    <button class="btn" data-id="${product.id}" data-type="increase">+</button>                    
                </th>                
                <th>$ ${product.totalPrice()}</th>
                <th>
                    <button class="btn btn-danger" data-id="${product.id}" data-type="delete">x</button>
                </th>
            </tr>            
        `
    }, "")
    cartShops.innerHTML = html;
}

function displayQuantity(result) {
    const spanEL = document.getElementById('total-qtyy');
    spanEL.innerHTML = `${result}`;
}

function displayTotal(total) {
    const spanEL = document.getElementById('totalEl');
    spanEL.innerHTML = `${total}`;
}

function callUser(request) {
    alert(request);    
}

