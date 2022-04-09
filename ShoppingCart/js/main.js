const productManager = new ProductManager();
init();
// handleSelect();
jsonProduct();
jsonCart();


// Default function
function init() {
    // Get list products
    productManager.getProducts().then(() => {                
        // Display products        
        display(productManager.products);                        
    });
}

function jsonProduct() {
    // lấy data từ localStorage lên để set vào biến students
    const data = JSON.parse(localStorage.getItem("products")) || [];
    // console.log(data);

    // Khi lấy danh sách students lên ta cần duyệt qua danh sách và new lại đối tượng Student để có được những phương thức của đối tượng
    const productList = data.map(item => {
        return new Product(item.name, item.price, item.screen, item.backCamera, item.frontCamera, item.img, item.desc, item.type, item.id)        
    })

    this.productList = productList;    
}

const cartProducts = productList.map(item => item);

console.log(cartProducts);

// function handleSelect() {
//     productManager.getProducts().then(() => {
//         const arraySamsung = productManager.products.filter(product => product.type === "Samsung");
//         console.log(arraySamsung)
//     })
    
// }

// Solve search product
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
    productManager.getProducts().then(() => {        
        // Display products        
        display(productManager.products);                        
    });
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

// Resolve button cart
document.getElementById('cardBox').addEventListener("click", () => {
    document.querySelector('.modal-footer').innerHTML = `
        <button onclick="buy(1)" class="btnn buy">
            Purchase 
            <i class="fas fa-credit-card" style="color:#6665dd;"></i>
        </button>
        <button onclick="clearCart()" class="btnn clear">
            Clear Cart 
            <i class="fas fa-trash" style="color:#bb342f;"></i>
        </button>
    `
})

const cart = [];
document.getElementById('cardList').addEventListener("click", (event) => {
    const targetEl = event.target;    
    
    const id = targetEl.getAttribute('data-id');
    const type = targetEl.getAttribute('data-type');
    if(type === 'addCart') {
        addCart(id);
        // console.log(cart);        
    }    
})

function addCart(id) {      
    let isExisted = false;    

    for (i = 0; i < cart.length; i++) {
        const itemCart = cart[i];

        if (itemCart.id === id) {
            cart[i].quantity++;
            isExisted = true;
        }
    }
    if (isExisted === false) {        
        const productCart = CartItem(id, 1);
        cart.push(productCart);        
    }
    displayCart(cart);    
    localStorage.setItem("cart", JSON.stringify(cart));    
}

function jsonCart() {
    // lấy data từ localStorage lên để set vào biến students
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    // console.log(data);

    // Khi lấy danh sách students lên ta cần duyệt qua danh sách và new lại đối tượng Student để có được những phương thức của đối tượng
    const cartID = data.map(item => {
        return new CartItem(item.id, item.quantity);        
    })

    this.cartID = cartID;    
}


function displayCart(cart) {    
    const cards = document.getElementById("cardTbody");
    const html = cart.reduce((result, product) => {
        return result + `
            <tr>
                <th>${product.id}</th>
                <th>${product.name}</th>
                <th><img src="${product.img}" width="50" height="50"></th>
                <th>${product.price}</th>
                <th>${product.quantity}</th>                
                <th></th>
            </tr>
        `
    }, "")
    cards.innerHTML = html;
}

var newProduct = new Product();