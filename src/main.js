import './style.scss'
import './style.css'
import * as api from './api.js'

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
                      <input type="text" class="form-control" id="form-course" required minlength="10" maxlength="50">
                      <span class="error">
                  </div>
                  <div class="form-group">
                      <label>Descripción:</label>
                      <input type="text" class="form-control" id="form-cliteral" required maxlength="80">
                      <span class="error">
                  </div>
                  <div class="form-group">
                      <label>Descripció:</label>
                      <input type="text" class="form-control" id="form-vliteral" required maxlength="80">
                      <span class="error">
                  </div>
                  <div class="form-group">
                      <label>Familia:</label>
                      <select class="form-control" id="form-idFamily" required>
                          <option value="">- Selecciona una familia -</option>
                      </select>
                      <span class="error">
                  </div>
                  <div class="form-check">
                    <label>Grado:</label>
                    <br>
                    <!-- Repetiremos las 3 líneas siguientes para cada grado -->
                    <input type="radio" class="form-check-input" name="grade" value="B" required>
                    <label>Básico</label>
                    <br>
                    <input type="radio" class="form-check-input" name="grade" value="M">
                    <label>Medio</label>
                    <br>
                    <input type="radio" class="form-check-input" name="grade" value="S">
                    <label>Superior</label>
                    <br>
                    <input type="radio" class="form-check-input" name="grade" value="E">
                    <label>Especialización</label>
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

document.addEventListener('DOMContentLoaded', () => {
    init()
})

async function init() {
    document.querySelector('form').addEventListener('submit', async (ev) =>{
        ev.preventDefault();
        if(!isValidForm()) {
            return
        }
        const newCicle = {
            course: document.getElementById("form-course").value,
            cliteral: document.getElementById("form-cliteral").value,
            vliteral: document.getElementById("form-vliteral").value,
            idFamily: document.getElementById("form-idFamily").value,
            grade: document.querySelector('input[name=grade]:checked').value
        }
        try {
            const ciclo =  await api.addDBCiclo(newCicle)
            renderCiclo(ciclo)
        } catch (error) {
            renderMessage("error", error)
        }
    })
    try {
        const families = await api.getDBfamilies()
        families //.sort((a, b) => a.cliteral - b.cliteral)
        .forEach(family => {
            renderFamily(family)
            renderSelectFamilies(family)
        });
        
    } catch (error) {
        renderMessage('error', error)
    }
}

function renderMessage(type, message) {
    const newMessage = document.createElement("div")
    newMessage.className = type + " alert alert-danger alert-dismissible"
    newMessage.setAttribute("role", "alert")
    newMessage.innerHTML = `
  <span>${message}</span>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()"></button>
    `
    document.getElementById('messages').appendChild(newMessage)
}

function renderFamily(family) {
    const tbody = document.querySelector(`#families tbody`)
    const newTr = document.createElement("tr")
    newTr.innerHTML = `
    <td>${family.id}</td>
    <td>${family.cliteral}</td>
    <td>${family.vliteral}</td>
    `
    tbody.appendChild(newTr)

    newTr.addEventListener("click", async () => {
        try{
            document.querySelector(`#courses tbody`).innerHTML = "";
            const ciclos = await api.getDBItems(family.id)
            document.getElementById("total").textContent = ciclos.length
            document.getElementById("nom-familia").textContent = family.cliteral
            newTr.classList.add("selected")
            ciclos.forEach((ciclo) => {
                renderCiclo(ciclo)
                
            })
            
            
        }catch (error) {
            renderMessage('error', error)
        }
    })
}

async function renderSelectFamilies(family) {
    const select = document.getElementById("form-idFamily")
    const newOption = document.createElement("option")
    newOption.value = family.idFamily
    newOption.textContent = family.cliteral
    select.appendChild(newOption)
}

function renderCiclo(ciclo){
    const tbody = document.querySelector(`#courses tbody`)
    const newTr = document.createElement("tr")
    newTr.innerHTML = `
    <td title=${ciclo.id}>${ciclo.course}</td>
    <td>${ciclo.cliteral}</td>
    <td>${ciclo.vliteral}</td>
    <td>${ciclo.grade}</td>
    <td>
        <button>
            <span class="material-icons">edit</span>
        </button>
    </td>
    `   
    tbody.appendChild(newTr)
    

}

function isValidForm() {
    
}