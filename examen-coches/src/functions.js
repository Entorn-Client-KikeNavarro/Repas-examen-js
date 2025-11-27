import * as api from "./api/api.js";

export default async function init() {
  try {
    if (!localStorage.validatedCars) localStorage.validatedCars = 0
    document.getElementById('total').textContent = localStorage.validatedCars
    const origins = await api.getDBOrigins();
    renderOriginsInSelect(origins);
    const cars = await api.getDBCarsNotValidated();
    cars.sort((a, b) => a.price - b.price)
    .map(car => {
        return {
            ...car,
            originDescrip: origins.find(origin => origin.id === car.origin)?.descrip
        }
    })
    .forEach((car) => renderCar(car));
  } catch (error) {
    console.error(error);
  }
}

function renderOriginsInSelect(origins) {
  const select = document.getElementById("origin");
  select.innerHTML = '<option value="">- Elija una opción -</option>';
  origins.forEach((origin) => {
    const newOption = document.createElement("option");
    newOption.value = origin.id;
    newOption.textContent = origin.descrip;
    select.appendChild(newOption);
  });
}

function renderCar(car) {
  const carDiv = document.createElement("div");
  carDiv.className = "card h-100";
  carDiv.innerHTML = `
    <img class="card-img-top" src="/public/assets/photos/${car.img ? car.img : 'nofoto.jpg'}" alt="${car.name}" />
<div class="card-body p-4">
  <div class="text-center">
    <h5 class="fw-bolder">${car.name}</h5>
    <p>${car.price}</p>
    <p>${car.originDescrip}</p>
    <p>${car.km}</p>
    <p class="bg-${car.motor ? 'secondary' : 'danger'}">${car.motor ? 'Revisado' : 'NO Revisado'}</p>
  </div>
  <button class="validate btn btn-sm  btn-success"><span class="material-icons">check</span></button>
  <button class="edit btn btn-sm  btn-warning"><span class="material-icons">edit</span></button>
  <button class="delete btn btn-sm  btn-danger"><span class="material-icons">delete</span></button>
</div>
`

    document.getElementById('cars').appendChild(carDiv)
    carDiv.querySelector('button.validate').addEventListener('click', async () => {
        try {
            await api.validateDBCar(car.id)
            carDiv.classList.add('bg-success')
            localStorage.validatedCars = localStorage.validatedCars + 1
            document.getElementById('total').textContent = localStorage.validatedCars
            setTimeout(() => carDiv.remove(), 3000)
        }catch (error){
            console.error(error)
        }
    })

    carDiv.querySelector('button.edit').addEventListener('click', () => renderCarInForm(car))
    carDiv.querySelector('button.delete').addEventListener('click', async () => {
        if (confirm('¿Quieres borrar el coche ' + car.name + '?')) {
            try {
                await api.removeDBCar(car.id)
                carDiv.remove()
            } catch (error) {
                
            }
        }
    })
}

function renderCarInForm(car) {
    document.getElementById('id').value = car.id
    document.getElementById('name').value = car.name
    document.getElementById('km').value = car.km
    document.getElementById('price').value = car.price
    document.querySelector(`#form-car input[name="motor"][value="${car.motor}"`).checked = true
    document.getElementById('origin').value = car.origin
    document.getElementById('img').value = car.img
}   
