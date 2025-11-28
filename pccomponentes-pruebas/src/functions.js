import { 
    getDBProducts,
    getDBCategories,
    changeDBValidated,
    removeDBProduct,
    updateDBProduct
} from "./api.js";

export const categoriesMap = new Map();
let draggedProduct = null;

// Muestra errores
export function renderErrorMessage(message) {
    const box = document.getElementById("messages");
    const alert = document.createElement("div");
    alert.className = "alert alert-danger alert-dismissible fade show shadow-sm";
    alert.innerHTML = `
        <strong>¡Ups!</strong> ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    box.appendChild(alert);
}

// ---------------------------------------
// Carga de Categorías
// ---------------------------------------
export async function loadCategories() {
    try {
        const cats = await getDBCategories();
        const select = document.getElementById("category");
        select.innerHTML = `<option value="">- Selecciona Categoría -</option>`;

        cats.forEach(c => {
            categoriesMap.set(c.id, c.descrip);
            const opt = document.createElement("option");
            opt.value = c.id;
            opt.textContent = c.descrip;
            select.appendChild(opt);
        });
    } catch (err) {
        renderErrorMessage(err);
    }
}

// ---------------------------------------
// Carga de Productos
// ---------------------------------------
export async function loadProducts() {
    try {
        const products = await getDBProducts();
        const container = document.getElementById("products");
        container.innerHTML = "";

        // Orden descendente por precio (lo más caro primero)
        products.sort((a, b) => b.price - a.price);

        products.forEach(p => {
            container.appendChild(createProductCard(p));
        });

    } catch (err) {
        renderErrorMessage(err);
    }
}

// ---------------------------------------
// Crea tarjeta de producto
// ---------------------------------------
function createProductCard(prod) {
    const card = document.createElement("div");
    card.className = "col card h-100 draggable border-0 shadow-sm mb-3";
    card.draggable = true;
    card.id = `prod-${prod.id}`;

    // Imagen por defecto si no tiene
    const imgUrl = prod.img ? `assets/photos/${prod.img}` : "https://via.placeholder.com/300?text=Sin+Foto";
    const catName = categoriesMap.get(prod.category) || "General";

    // Lógica visual para Reacondicionado vs Nuevo
    const badgeClass = prod.refurbished ? "bg-warning text-dark" : "bg-success text-white";
    const badgeText = prod.refurbished ? "Reacondicionado" : "Nuevo";

    card.innerHTML = `
        <div class="position-relative">
            <span class="position-absolute top-0 end-0 badge ${badgeClass} m-2">${badgeText}</span>
            <img class="card-img-top p-3" src="${imgUrl}" style="height: 200px; object-fit: contain;">
        </div>
        <div class="card-body text-center">
            <h6 class="fw-bold text-truncate" title="${prod.name}">${prod.name}</h6>
            <p class="text-muted small mb-1">${catName}</p>
            <h4 class="text-danger fw-bold mb-2">${prod.price}€</h4>
            <p class="small">Stock: <strong>${prod.stock} uds.</strong></p>

            <div class="d-flex justify-content-center gap-2 mt-3">
                <button class="btn btn-sm btn-outline-success btn-validar" title="Publicar"><span class="material-icons">check_circle</span></button>
                <button class="btn btn-sm btn-outline-primary btn-editar" title="Editar"><span class="material-icons">edit</span></button>
                <button class="btn btn-sm btn-outline-danger btn-eliminar" title="Borrar"><span class="material-icons">delete</span></button>
            </div>
        </div>
    `;

    card.addEventListener("dragstart", () => draggedProduct = prod);

    // Validar (Publicar)
    card.querySelector(".btn-validar").addEventListener("click", async () => {
        try {
            await changeDBValidated(prod.id);
            card.classList.add("border-success", "border-2"); // Feedback visual
            updateContador(1);
            setTimeout(() => card.remove(), 1000); // Animación rápida
        } catch (err) {
            renderErrorMessage(err);
        }
    });

    // Eliminar
    card.querySelector(".btn-eliminar").addEventListener("click", async () => {
        if (confirm(`¿Eliminar ${prod.name} permanentemente?`)) {
            try {
                await removeDBProduct(prod.id);
                card.remove();
            } catch (err) {
                renderErrorMessage(err);
            }
        }
    });

    // Editar
    card.querySelector(".btn-editar").addEventListener("click", () => {
        fillForm(prod);
    });

    return card;
}

// ---------------------------------------
// Rellenar formulario
// ---------------------------------------
function fillForm(prod) {
    document.getElementById("id").value = prod.id;
    document.getElementById("name").value = prod.name;
    document.getElementById("stock").value = prod.stock; // Antiguo KM
    document.getElementById("price").value = prod.price;
    document.getElementById("category").value = prod.category;
    document.getElementById("img").value = prod.img || "";

    document.getElementById(prod.refurbished ? "refurb-si" : "refurb-no").checked = true;
}

// ---------------------------------------
// Configuración Formulario y Drag&Drop
// ---------------------------------------
export function setupForm() {
    const form = document.getElementById("form-product");
    const errors = document.getElementById("errores");

    form.addEventListener("dragover", e => {
        e.preventDefault();
        form.classList.add("opacity-50");
    });

    form.addEventListener("drop", e => {
        e.preventDefault();
        form.classList.remove("opacity-50");
        if (draggedProduct) {
            fillForm(draggedProduct);
            draggedProduct = null;
        }
    });

    form.addEventListener("submit", async e => {
        e.preventDefault();
        errors.innerHTML = "";

        const id = document.getElementById("id").value;
        if (!id) return;

        const stock = parseInt(document.getElementById("stock").value);
        const refurbished = document.getElementById("refurb-si").checked;

        // --- NUEVA REGLA DE NEGOCIO PARA EXAMEN ---
        // Si es Reacondicionado, no deberíamos tener mucho stock (ej. max 10 unidades)
        if (refurbished && stock > 10) {
            errors.textContent = "Error: Los productos reacondicionados no pueden superar las 10 unidades de stock.";
            return;
        }

        const data = {
            name: document.getElementById("name").value,
            stock,
            price: parseFloat(document.getElementById("price").value),
            category: document.getElementById("category").value,
            refurbished,
            validated: false, // Al editar vuelve a requerir validación
            img: document.getElementById("img").value
        };

        try {
            const updatedProd = await updateDBProduct(id, data);
            const oldCard = document.getElementById(`prod-${id}`);
            if (oldCard) {
                oldCard.replaceWith(createProductCard(updatedProd));
            }
            form.reset();
            // Limpiar ID para evitar sobrescrituras accidentales
            document.getElementById("id").value = ""; 
        } catch (err) {
            renderErrorMessage(err);
        }
    });
}

// ---------------------------------------
// Contador (Igual que antes)
// ---------------------------------------
export function setupContador() {
    const span = document.getElementById("total");
    const total = localStorage.getItem("validatedCount") || 0;
    span.textContent = total;

    document.getElementById("btn-reset").addEventListener("click", () => {
        localStorage.setItem("validatedCount", 0);
        span.textContent = 0;
    });
}

export function updateContador(n) {
    const span = document.getElementById("total");
    let total = parseInt(localStorage.getItem("validatedCount") || 0) + n;
    localStorage.setItem("validatedCount", total);
    span.textContent = total;
}
