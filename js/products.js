import { getProducts, createProduct, deleteProduct } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const productContainer = document.querySelector('#productContainer');
    const noProductsMessage = document.querySelector('#noProductsMessage');

    async function renderProducts() {
        const products = await getProducts();
        productContainer.innerHTML = '';

        if (products.length === 0) {
            noProductsMessage.style.display = 'block';
        } else {
            noProductsMessage.style.display = 'none';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('productCard');
                productCard.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}" class="productImage">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                    <p class="productPrice">$${product.price.toFixed(2)}</p>
                    <button class="deleteBtn" data-id="${product.id}">Eliminar</button>
                `;
                productContainer.appendChild(productCard);
            });
        }
    }

    document.querySelector('#addProductForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.querySelector('#productName').value;
        const description = document.querySelector('#productDescription').value;
        const price = parseFloat(document.querySelector('#productPrice').value);
        const imageUrl = document.querySelector('#productImageUrl').value;

        const newProduct = {
            name,
            description,
            price,
            imageUrl
        };

        await createProduct(newProduct);
        renderProducts();
    });

    productContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('deleteBtn')) {
            const productId = event.target.getAttribute('data-id');
            await deleteProduct(productId);
            renderProducts();
        }
    });

    renderProducts();
});
