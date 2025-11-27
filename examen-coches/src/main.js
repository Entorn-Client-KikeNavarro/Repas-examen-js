
import "material-icons/iconfont/material-icons.css";
import "./style.scss";

import init from './functions'


document.querySelector("#app").innerHTML = `
<header class="bg-dark py-1">
    <div class="container px-4 px-lg-5 my-5">
        <div class="text-center text-white">
            <h1 class="display-4 fw-bolder">Coches POP</h1>
            <h5>Total de coches validados: <span id="total">0</span> <button>Reiniciar contador</button></h5>
            </div>
    </div>
</header>
<!-- Messages -->
<div id="messages"></div>
<div class="row">
    <div class="col-sm-9">
        <section class="py-5">
            <div class="container px-4 px-lg-5 mt-5">
                <div id="cars" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <!-- Aquí los coches -->
                </div>
            </div>
        </section>
    </div>
    <div class="col-sm-3">
        <section class="py-5">
            <div class="container">
                <div class="row justify-content-center">
                    <!-- Aquí los coches -->
                    <form id="form-car">
                        <fieldset class="border">
                            <legend>Modificar anuncio</legend>
                            <!-- Aquí los inputs y botones del form -->
                            <div class="mb-3 row">
                                <label for="id" class="col-sm-4 form-label">
                                    Id:
                                </label>
                                <div class="col-sm-8">
                                    <input type="number" class="form-control" id="id">
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="name" class="col-sm-4 form-label">
                                    Nombre:
                                </label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="name">
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="km" class="col-sm-4 form-label">
                                    Kms.:
                                </label>
                                <div class="col-sm-8">
                                    <input type="number" class="form-control" id="km">
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="motor" class="col-sm-4 form-label">
                                    Motor revisado:
                                </label>
                                <div class="col-sm-8">
                                    <input type="radio" class="form-check-input" name="motor" value="true">
                                    <label class="form-check-label">Sí</label>
                                    <input type="radio" class="form-check-input" name="motor" value="false">
                                    <label class="form-check-label">No</label>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="price" class="col-sm-4 form-label">
                                    Precio:
                                </label>
                                <div class="col-sm-8">
                                    <input type="number" class="form-control" id="price">
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="origin" class="col-sm-4 form-label">
                                    Procedencia:
                                </label>
                                <div class="col-sm-8">
                                    <select class="form-control" id="origin"></select>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="name" class="col-sm-4 form-label">
                                    Foto:
                                </label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="img">
                                </div>
                            </div>

                            <button type="submit" class="btn btn-default btn-primary">Cambiar</button>
                            <button type="reset" class="btn btn-danger">Reset</button>
                        </fieldset>
                    </form>
                    <!-- Errores del formulario-->
                    <div id="errores" class="error"></div>
                </div>
            </div>
        </section>
    </div>
</div>
<footer class="py-5 bg-dark">
    <div class="container"><p class="m-0 text-center text-white">CIP FP Batoi - Examen Javascript 2024</p></div>
</footer>`;

document.addEventListener('DOMContentLoaded', init)