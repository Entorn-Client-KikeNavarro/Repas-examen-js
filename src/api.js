const SERVER = "http://localhost:3000";
const TABLE = "courses"
// GET (Todos)
async function getDBItems() {
        const response = await fetch(`${SERVER}/${TABLE}`);
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const items = await response.json();
        return items;
}

async function getDBfamilies() {
        const response = await fetch(`${SERVER}/families`);
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const items = await response.json();
        return items;
}

// GET (Uno) - Acepta ID suelto u Objeto con id
async function getDBItem(collection, idOrObject) {
    const id = (typeof idOrObject === 'object') ? idOrObject.id : idOrObject;
    try {
        const response = await fetch(SERVER + "/" + collection + "/" + id);
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const item = await response.json();
        return item;
    } catch (err) {
        console.log(err);
    }
}

// POST (Añadir)
async function addDBItem(collection, item) {
    try {
        const response = await fetch(SERVER + "/" + collection, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const newItem = await response.json();
        return newItem;
    } catch (err) {
        console.log(err);
    }
}

// DELETE (Borrar) - Acepta ID suelto u Objeto con id
async function removeDBItem(collection, idOrObject) {
    const id = (typeof idOrObject === 'object') ? idOrObject.id : idOrObject;
    try {
        const response = await fetch(SERVER + "/" + collection + "/" + id, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const deletedItem = await response.json();
        return deletedItem;
    } catch (err) {
        console.log(err);
    }
}

// PUT (Modificar todo) - Acepta el objeto completo (debe tener id)
async function changeDBItem(collection, item) {
    try {
        const response = await fetch(SERVER + "/" + collection + "/" + item.id, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const changedItem = await response.json();
        return changedItem;
    } catch (err) {
        console.log(err);
    }
}

// PATCH (Editar parcial) - Acepta ID u Objeto + datos a cambiar
async function editDBItem(collection, idOrObject, changes) {
    const id = (typeof idOrObject === 'object') ? idOrObject.id : idOrObject;
    try {
        const response = await fetch(SERVER + "/" + collection + "/" + id, {
            method: 'PATCH',
            body: JSON.stringify(changes),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const editedItem = await response.json();
        return editedItem;
    } catch (err) {
        console.log(err);
    }
}

export {
    getDBfamilies,
    getDBItems,
    getDBItem,
    addDBItem,
    removeDBItem,
    changeDBItem,
    editDBItem
}