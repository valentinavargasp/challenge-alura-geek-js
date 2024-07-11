// js/api.js
const apiUrl = 'http://localhost:3000/products';

export async function getProducts() {
    const response = await fetch(apiUrl);
    return await response.json();
}

export async function createProduct(product) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    return await response.json();
}

export async function deleteProduct(productId) {
    const response = await fetch(`${apiUrl}/${productId}`, {
        method: 'DELETE'
    });
    return await response.json();
}
