function FgetAllProducts() {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(console.log);
}

function FgetSingleProduct() {
    fetch('https://dummyjson.com/products/1')
    .then(res => res.json())
    .then(console.log);
}

function FaddProduct() {
    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'BMW Pencil',
        })
    })
    .then(res => res.json())
    .then(console.log);
}

function FupdateProduct() {
    fetch('https://dummyjson.com/products/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'iPhone Galaxy +1'
        })
    })
    .then(res => res.json())
    .then(console.log);
}

function FdeleteProduct() {
    fetch('https://dummyjson.com/products/1', {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(console.log);
}