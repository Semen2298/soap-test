// script.js
document.addEventListener("DOMContentLoaded", () => {
    const catalog = [
        { title: "Лавандовое наслаждение", description: "Натуральное крафтовое мыло с ароматом лаванды. Идеально для расслабления и ухода за кожей.", image: "img/1.webp" },
        { title: "Цитрусовая свежесть", description: "Мыло с освежающим ароматом цитрусовых. Придает коже тонус и энергию.", image: "img/3.webp" },
        { title: "Мятное прохладное", description: "Освежающее мыло с экстрактом мяты. Отлично бодрит и освежает кожу.", image: "img/2.webp" },
        { title: "Овсяное утро", description: "Крафтовое мыло с овсяными хлопьями. Идеально подходит для мягкого очищения и ухода за чувствительной кожей.", image: "img/3.webp" },
        { title: "Медовый деликатес", description: "Натуральное мыло с добавлением меда. Питает и увлажняет кожу, придавая ей мягкость.", image: "img/1.webp" },
        { title: "Кофейное пробуждение", description: "Эксфолиирующее мыло с молотыми кофейными зернами. Идеально для утреннего пробуждения и мягкого пилинга.", image: "img/2.webp" },
        { title: "Травяной букет", description: "Мыло с экстрактами различных трав. Прекрасно ухаживает за кожей и придает ей природное сияние.", image: "img/3.webp" },
        { title: "Кокосовая мечта", description: "Увлажняющее мыло с кокосовым маслом. Делает кожу мягкой и гладкой.", image: "img/1.webp" },
    ];

    const catalogContainer = document.querySelector(".catalog__cards");
    const modal = document.getElementById("productModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.getElementById("closeModal");
    const addToCartButton = document.getElementById("addToCart");
    const counterElement = document.getElementById("counter");
    const cartModal = document.getElementById("cartModal");
    const closeCartModal = document.getElementById("closeCartModal");
    const cartItemsContainer = document.getElementById("cartItems");
    const clearCartButton = document.getElementById("clearCartButton");

    // Функция для обновления счетчика в корзине
    function updateCartCounter() {
        const cartCount = localStorage.getItem('cartCount') || 0;
        counterElement.textContent = cartCount;
    }

    // Функция для открытия модального окна
    function openModal(product) {
        modalTitle.textContent = product.title;
        modalDescription.textContent = product.description;
        modalImage.src = product.image;
        modal.style.display = "flex";

        // Устанавливаем текущий продукт для добавления в корзину
        addToCartButton.onclick = () => {
            const quantity = parseInt(document.getElementById("quantity").value);
            const cartCount = parseInt(localStorage.getItem('cartCount') || 0) + quantity;
            localStorage.setItem('cartCount', cartCount);
            
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const productInCart = cart.find(item => item.title === product.title);
            if (productInCart) {
                productInCart.quantity += quantity;
            } else {
                cart.push({ ...product, quantity });
            }
            localStorage.setItem('cart', JSON.stringify(cart));

            updateCartCounter();
            modal.style.display = "none";
        };
    }

    // Функция для создания карточек продуктов
    function createCard(product) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <button class="detailsButton">Подробнее</button>
        `;
        card.querySelector(".detailsButton").addEventListener("click", () => {
            openModal(product);
        });
        return card;
    }

    catalog.forEach(product => {
        const card = createCard(product);
        catalogContainer.appendChild(card);
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    // Обновляем счетчик при загрузке страницы
    updateCartCounter();

    // Функция для открытия модального окна корзины
    function openCartModal() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';

        if (cart.length > 0) {
            cart.forEach(item => {
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <span>${item.title} (${item.quantity})</span>
                    <span>${item.quantity * item.price} руб.</span>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        } else {
            cartItemsContainer.innerHTML = '<p>Корзина пуста.</p>';
        }

        cartModal.style.display = "flex";
    }

    document.querySelector('.header__btn').addEventListener('click', (event) => {
        event.preventDefault();
        openCartModal();
    });

    closeCartModal.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    // Функция для очистки корзины
    clearCartButton.addEventListener("click", () => {
        localStorage.removeItem('cart');
        localStorage.removeItem('cartCount');
        updateCartCounter();
        openCartModal();
    });
});