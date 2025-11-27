import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
    <div class="container">
  <header>
      <h1>Ciclos del centro</h1>
  </header>

  <!-- Zona para mostrar mensajes al usuario -->
  <div class="row" id="messages"></div>

  <div class="row">
      <div class="col-sm-8">
          <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-12" id="families">
                  <h2>Familias</h2>
                  <table class="table table-striped table-hover">
                      <thead class="thead-dark bg-primary">
                          <tr>
                              <th>Id</th>
                              <th>Descipción</th>
                              <th>Descripció</th>
                          </tr>
                      </thead>
                      <tbody>
                          <!-- Aquí insertaremos las familias-->
                      </tbody>
                  </table>
              </div>
          </div>

          <!-- Tabla de ciclos -->
          <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-12" id="courses">
                  <h2>Ciclos de <span id="nom-familia"></span></h2>
                  <table class="table table-striped table-hover">
                      <thead class="thead-dark bg-primary">
                          <tr>
                              <th>Ciclo</th>
                              <th>Descipción</th>
                              <th>Descipció</th>
                              <th>Grado</th>
                              <th>Acciones</th>
                          </tr>
                      </thead>
                      <tbody>
                          <!-- Aquí insertaremos los ciclos-->
                      </tbody>
                  </table>
                  <p class="lead float-right">Total de ciclos: <strong id="total">0</strong></p>
              </div>
          </div>
      </div>
      <div class="col-sm-4">
          <form>
              <fieldset>
                  <legend>Añadir ciclo</legend>
                  <div class="form-group">
                      <label>Nombre:</label>
                      <input type="text" class="form-control" id="form-course">
                      <span class="error">
                  </div>
                  <div class="form-group">
                      <label>Descripción:</label>
                      <input type="text" class="form-control" id="form-cliteral">
                      <span class="error">
                  </div>
                  <div class="form-group">
                      <label>Descripció:</label>
                      <input type="text" class="form-control" id="form-vliteral">
                      <span class="error">
                  </div>
                  <div class="form-group">
                      <label>Familia:</label>
                      <select class="form-control" id="form-idFamily">
                          <option value="">- Selecciona una familia -</option>
                      </select>
                      <span class="error">
                  </div>
                  <div class="form-check">
                    <label>Grado:</label>
                    <br>
                    <!-- Repetiremos las 3 líneas siguientes para cada grado -->
                    <input type="radio" class="form-check-input" ...>
                    <label>...</label>
                    <br>
                    <span class="error">
                  </div>
                  <br>
                  <button type="submit" class="btn btn-default btn-primary">Añadir</button>
                  <button type="reset" class="btn btn-danger">Reset</button>
              </fieldset>
          </form>
      </div>
  </div>

`