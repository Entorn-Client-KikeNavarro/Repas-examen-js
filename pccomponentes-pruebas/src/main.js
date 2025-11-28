import "material-icons/iconfont/material-icons.css";
import "./style.scss";

import { 
    loadCategories, 
    loadProducts, 
    setupContador, 
    setupForm
} from "./functions.js";

document.querySelector('#app').innerHTML = `
  <header class="bg-warning py-2 shadow-sm"> <div class="container px-4 px-lg-5 my-3">
        <div class="text-center text-dark">
            <h1 class="display-5 fw-bolder">Panel PcComponentes</h1>
            <h5>Productos validados: <span id="total" class="badge bg-dark">0</span> 
            <button id="btn-reset" class="btn btn-sm btn-outline-dark ms-2">Reset</button></h5>
        </div>
    </div>
</header>

<div id="messages" class="container mt-3"></div>

<div class="row m-0">
    <div class="col-sm-9">
        <section class="py-5">
            <div class="container">
                <h3 class="mb-4 border-bottom pb-2">Pendientes de Validar</h3>
                <div id="products" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"></div>
            </div>
        </section>
    </div>

    <div class="col-sm-3 bg-light border-start">
        <section class="py-5">
            <div class="container">
                <div class="row justify-content-center">
                    
                    <form id="form-product" class="sticky-top" style="top: 20px;" novalidate>
                        <div class="card shadow-sm">
                            <div class="card-header bg-dark text-white">
                                Editar Producto
                            </div>
                            <div class="card-body">
                                <div class="mb-2">
                                    <label for="id" class="form-label small">ID Referencia:</label>
                                    <input type="text" class="form-control form-control-sm" id="id" readonly>
                                </div>

                                <div class="mb-2">
                                    <label for="name" class="form-label small">Nombre Producto:</label>
                                    <input type="text" class="form-control form-control-sm" id="name" required minlength="5" maxlength="40">
                                </div>

                                <div class="mb-2">
                                    <label for="stock" class="form-label small">Stock (Uds):</label>
                                    <input type="number" class="form-control form-control-sm" id="stock" required min="0" step="1">
                                </div>

                                <div class="mb-2">
                                    <label class="form-label small">Estado:</label>
                                    <div class="d-flex gap-3">
                                        <div class="form-check">
                                            <input type="radio" class="form-check-input" name="refurbished" id="refurb-si" value="true">
                                            <label class="form-check-label small" for="refurb-si">Reaco.</label>
                                        </div>
                                        <div class="form-check">
                                            <input type="radio" class="form-check-input" name="refurbished" id="refurb-no" value="false" checked>
                                            <label class="form-check-label small" for="refurb-no">Nuevo</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-2">
                                    <label for="price" class="form-label small">Precio (€):</label>
                                    <input type="number" class="form-control form-control-sm" id="price" required min="1" step="0.01">
                                </div>

                                <div class="mb-2">
                                    <label for="category" class="form-label small">Categoría:</label>
                                    <select class="form-select form-select-sm" id="category" required></select>
                                </div>

                                <div class="mb-3">
                                    <label for="img" class="form-label small">Imagen (URL):</label>
                                    <input type="text" class="form-control form-control-sm" id="img" readonly>
                                </div>

                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-primary btn-sm">Guardar Cambios</button>
                                    <button type="reset" class="btn btn-secondary btn-sm">Limpiar</button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div id="errores" class="mt-3 text-danger fw-bold small text-center"></div>
                </div>
            </div>
        </section>
    </div>
</div>

<footer class="py-4 bg-dark mt-auto">
    <div class="container"><p class="m-0 text-center text-white">Simulacro Examen - Gestión Stock</p></div>
</footer>
`;

init();

async function init() {
    await loadCategories();
    await loadProducts(); 
    setupContador();
    setupForm();
}
