const SERVER = "http://localhost:3000";

// GET (Todos)
async function getDBItems(collection) {
    try {
        const response = await fetch(SERVER + "/" + collection);
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const items = await response.json();
        return items;
    } catch (err) {
        console.log(err);
    }
}

async function getDBCarsNotValidated() {
        const response = await fetch(SERVER + "/cars?validated=false");
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const items = await response.json();
        return items;
        console.log(err);
}

async function getDBOrigins() {
        const response = await fetch(`${SERVER}/origins`);
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const items = await response.json();
        return items;
}

async function validateDBCar(carId) {
        const response = await fetch(`${SERVER}/cars/${carId}`, {
            method: 'PATCH',
            body: JSON.stringify({ validated: true }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const editedItem = await response.json();
        return editedItem;
        console.log(err);
}

async function removeDBCar(carId) {
    try {
        const response = await fetch(`${SERVER}/cars/${id}`, {
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

async function changeDBCar(car) {
    try {
        const response = await fetch(`${SERVER}/cars/${car.id}`, {
            method: 'PATCH',
            body: JSON.stringify(car),
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
    changeDBCar,
    removeDBCar,
    validateDBCar,
    getDBCarsNotValidated,
    getDBOrigins,
    getDBItems,
    getDBItem,
    addDBItem,
    removeDBItem,
    changeDBItem,
    editDBItem
}