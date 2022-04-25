const productManager = new ProductManager();
init();

// Function run first
function init() {
    // Get list to display    
    productManager.getProducts().then(() => {        
        // Display products to table
        console.log(productManager.products);
        display(productManager.products);
    })
}

function display(products) {    
    
    const html = products.reduce((result, product, index) => {     
        
        return result + `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.screen}</td>
                <td>${product.backCamera}</td>
                <td>${product.frontCamera}</td>                
                <td>
                    <img src="${product.img}" width="50" height="50"/>
                </td>
                <td>${product.desc}</td>
                <th>${product.type}</th>
                <td>
                    <button class="btn btn-primary" data-id="${product.id}" data-type="update" data-toggle="modal" data-target="#myModal">Update</button>
                    <button class="btn btn-danger" data-id="${product.id}" data-type="delete">Delete</button>
                </td>
            </tr>
        `
    }, "");
    
    document.getElementById('tblDanhSachSP').innerHTML = html;
}

// Resolve button Add product
document.getElementById('btnThemSP').addEventListener("click", () => {
    // Resolve change heading & add button
    document.querySelector(".modal-title").innerHTML = "Add product";
    document.querySelector(".modal-footer").innerHTML = `
        <button class="btn btn-danger" data-dismiss="modal">Close</button>
        <button id="btnCreate" class="btn btn-success">Add</button>
    `;
});

// Resolve Dom modal-footer to listen button Add/Update
document.querySelector(".modal-footer").addEventListener("click", (event) => {
    // Dom input to get value
    const name = document.getElementById('TenSP').value;
    const price = +document.getElementById('GiaSP').value;
    const screen = document.getElementById('ManSP').value;
    const backCamera = document.getElementById('BackSP').value;
    const frontCamera = document.getElementById('FrontSP').value;
    const img = document.getElementById('HinhSP').value;
    const desc = document.getElementById('MotaSP').value;
    const type = document.getElementById('LoaiSP').value;
    

    const product = new Product(name, price, screen, backCamera, frontCamera, img, desc, type);
     
    const targetEl = event.target;
    if(targetEl.id === "btnCreate") {
        // console.log(targetEl);
        productManager.createProduct(product).then(() => {
            // Get product success => display
            display(productManager.products);
            // Close modal
            $('#myModal').modal('hide')
        });
    }

    if(targetEl.id === "btnUpdate") {
        const productID = document.getElementById('MaSP').value;
        productManager.updateProduct(productID, product).then(() => {
            display(productManager.products);
            // Close modal
            $('#myModal').modal('hide')
        });
    }

});

// Resolve Dom tbody to listen button Update/Delete
document.getElementById('tblDanhSachSP').addEventListener("click", (event) => {
    const targetEl = event.target;

    const id = targetEl.getAttribute('data-id');
    const type = targetEl.getAttribute('data-type');

    if(type === 'delete') {
        productManager.deleteProduct(id).then(() => {
            // then call API delete success & call again api get list product success 
            display(productManager.products)
        });
    }

    if(type === 'update') {
        // update display
        document.querySelector(".modal-title").innerHTML = "Add product";
        document.querySelector(".modal-footer").innerHTML = `
        <button class="btn btn-danger" data-dismiss="modal">Close</button>
        <button id="btnUpdate" class="btn btn-success">Update</button>
        `;

        // Put data of product
        productManager.getProductById(id).then(result => {
            // Put data of product
            document.getElementById('MaSP').value = id;
            document.getElementById('TenSP').value = result.data.name;
            document.getElementById('GiaSP').value = result.data.price;
            document.getElementById('ManSP').value = result.data.screen;
            document.getElementById('BackSP').value = result.data.backCamera;
            document.getElementById('FrontSP').value = result.data.frontCamera;
            document.getElementById('HinhSP').value = result.data.img;
            document.getElementById('MotaSP').value = result.data.desc;
            document.getElementById('LoaiSP').value = result.data.type;
        });
    }
});



