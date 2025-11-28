const SERVER = "http://localhost:3000";

/**
 * Obtiene los productos NO validados (pendientes de revisar).
 */
export async function getDBProducts() {
    try {
        // Buscamos validated=false
        const response = await fetch(SERVER + "/products?validated=false");
        if (!response.ok) {
            throw `Error ${response.status}: ${response.statusText}`;
        }
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Añade un producto nuevo.
 */
export async function addDBProduct(product) {
    const response = await fetch(SERVER + "/products", {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw `Error ${response.status}: ${response.statusText}`;
    return await response.json();
}

/**
 * Actualiza un producto (PATCH).
 */
export async function updateDBProduct(id, productData) {
    const response = await fetch(SERVER + "/products/" + id, {
        method: "PATCH",
        body: JSON.stringify(productData),
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw `Error ${response.status}: ${response.statusText}`;
    return await response.json();
}

/**
 * Obtiene las categorías (antiguos origins).
 */
export async function getDBCategories() {
    try {
        const response = await fetch(SERVER + "/categories");
        if (!response.ok) throw `Error ${response.status}: ${response.statusText}`;
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Elimina un producto.
 */
export async function removeDBProduct(id) {
    const response = await fetch(SERVER + "/products/" + id, { method: "DELETE" });
    if (!response.ok) throw `Error ${response.status}: ${response.statusText}`;
    return await response.json();
}

/**
 * Valida un producto (Publicar en tienda).
 */
export async function changeDBValidated(id) {
    const response = await fetch(SERVER + "/products/" + id, {
        method: "PATCH",
        body: JSON.stringify({ validated: true }), 
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw `Error ${response.status}: ${response.statusText}`;
    return await response.json();
}
