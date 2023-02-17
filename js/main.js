// Productos almacenados en archivo JSON
const url = "./js/productos.json";

fetch(url)
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('productos', JSON.stringify(data.productos));
  })
  .catch(error => console.error(error));


// Enviar y devolver lista de productos del almacenamiento local
const productosAlmacenados = localStorage.getItem('productos');
const misProductos = JSON.parse(productosAlmacenados);


/* CREAR NODOS DE LOS PRODUCTOS Y PONERLOS EN EL DOM */
const shopContent = document.getElementById("shopContent")
misProductos.forEach((productos) => {
    let content = document.createElement('div');
    content.classList.add("col-sm-12", "col-lg-4", "all", `${productos.categoria}`);
    content.innerHTML = `
        <div class="box">
            <div>
                <div class="img-box">
                    <img src="${productos.img}" alt="">
                </div>
                <div class="detail-box">
                    <h5>${productos.nombre.toUpperCase()}</h5>
                    <h4>${productos.precio} $</h4>
                    <button class="button cartButton${productos.id}">  </button>
                </div>
            </div>
        </div>
    `
        ;
    shopContent.append(content);
});
/* ----------------- */

/* FILTRO DE BOTONES */
const filterButtons = document.querySelectorAll('.filter');
const items = document.querySelectorAll('.all');

filterButtons.forEach(filterButton => {
    filterButton.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        filterButton.classList.add("active");
        const filter = filterButton.dataset.filter;
        items.forEach(item => {
            if (filter === 'all') {
                item.classList.remove("hidden");
            } else if (!item.classList.contains(filter)) {
                item.classList.add("hidden");
            } else {
                item.classList.remove("hidden");
            }
        });
    });
});
/* ----------------- */


// CARRITO DE COMPRAS
// Mostrar/dejar de mostrar carrito
const cartMain = document.getElementById(`carritoMain`)

const carritoBtn = document.getElementById('carrito')
carritoBtn.addEventListener('click', () => {
    cartMain.classList.toggle("hidden");
});

const cerrarCarrito = document.getElementById(`cerrarCarrito`)
cerrarCarrito.addEventListener('click', () => {
    cartMain.classList.add("hidden");
});


// Inicializar carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

const guardarContador = () => {
    localStorage.setItem("counter", JSON.stringify(counter));
    counterDisplay.innerHTML = JSON.parse(localStorage.getItem("counter"));

};

const cartButtons = document.querySelectorAll(`.button`);
const counterDisplay = document.querySelector('#numero');
let counter = JSON.parse(localStorage.getItem("counter"));


// Agregar producto al carrito
cartButtons.forEach(cartButton => {
    cartButton.addEventListener("click", () => {
        const indexProductoSelec = Array.prototype.indexOf.call(cartButtons, cartButton);

        const productoAgregar = misProductos.filter((producto) => producto.id === indexProductoSelec)[0];
        // contador del carrito

        counter++;
        guardarContador();

        // si hay producto existente, agregar la cantidad
        const productoExistente = carrito.find(p => p.id === productoAgregar.id);
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({
                ...productoAgregar,
                cantidad: 1
                
            });
        }

        alertaProductAgregadoAlCarrito();
        renderizarCarrito();
        renderizarPrecioTotal();
        guardarCarrito();
    });
});

// Agregar objetos al dom
const cartContent = document.getElementById("carritoItems");
function renderizarCarrito() {
    cartContent.innerHTML = '';
    carrito.forEach((producto) => {
        let item = document.createElement('div');
        item.classList.add(`carritoBox`);
        item.innerHTML = `
                <div class="carritoImg">
                    <img src="${producto.img}" alt="">
                </div>
                <div class="carritoProducto">
                    <h3><strong>${producto.nombre.toUpperCase()} | $${producto.precio} </strong> </h3>
                    <div>
                    <button class="carritoBtn buttonMenosUno"></button>
                    <h2>x${producto.cantidad}</h2>
                    <button class="carritoBtn buttonMasUno"></button>
                    <button class="carritoBtn buttonEliminar"></button>
                    </div>
                </div>`
        ;
        cartContent.append(item);

        // Boton sumar un elemento
        let sumar = item.querySelector(".buttonMasUno");
        sumar.addEventListener("click", () => {
            producto.cantidad++;
            pintarCarrito();
            counter++;
            guardarContador();
        });

        // Boton restar un elemento
        let restar = item.querySelector(".buttonMenosUno");
        restar.addEventListener("click", () => {
            if(producto.cantidad !== 1){
                producto.cantidad--;
                pintarCarrito();
                counter--;
                guardarContador();
            }
        });

        let eliminar = item.querySelector(".buttonEliminar");
        eliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
            counter = counter - producto.cantidad;
            guardarContador();
        });

    });
}

// Agregar el precio total al dom
function renderizarPrecioTotal() {
    let precioTotalCarrito = document.querySelector('.General');
    let totalCarrito = sumarTotalCarrito(carrito);
    precioTotalCarrito.innerHTML = `<h2>Total: <span>$ ${totalCarrito}</span></h2>`;
}

// Sumar precio total
function sumarTotalCarrito(carrito) {
    return carrito.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad;
    }, 0);
}

// Mostrar carrito en pantalla
function pintarCarrito(){
    renderizarCarrito();
    renderizarPrecioTotal();
    sumarTotalCarrito(carrito);
}

// Eliminar Producto
function eliminarProducto(id){
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    guardarCarrito();
    pintarCarrito();
    alertaProductEliminadoDelCarrito();
};

// Vaciar carrito
const clearButton = document.getElementById('vaciarCarrito');
clearButton.addEventListener("click", () => {
    while (carrito.length) {
        carrito.pop();
    }
    // contador del carrito

    counter = 0;
    counterDisplay.innerHTML = counter;
    localStorage.setItem("counter", JSON.stringify(counter));


    guardarCarrito();
    renderizarCarrito();
    renderizarPrecioTotal();
    cartMain.classList.add("hidden");
    alertaCarritoVaciado();
});


// Alertas
// Agragar producto al carrito
function alertaProductAgregadoAlCarrito() {
    Toastify({
      text: "Producto agregado al carrito!",
      duration: 3000,
      close: true,
      gravity: "bottom",
      position: "left",
      stopOnFocus: false,
      style: {
        background: "linear-gradient(0deg, #14a73e 0%, hsl(125, 90%, 68%) 100%)",
      },
  }).showToast();
}

// Producto eliminado del carrito
function alertaProductEliminadoDelCarrito() {
    Toastify({
      text: "Producto eliminado del carrito!",
      duration: 1000,
      close: true,
      gravity: "bottom",
      position: "center",
      stopOnFocus: false,
      style: {
        background: "linear-gradient(0deg, #a71414 0%, #f76464 100%)",
      },
  }).showToast();
}

// Carrito vaciado
function alertaCarritoVaciado() {
    Toastify({
      text: "Vaciaste el carrito",
      duration: 2000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: false,
      style: {
        background: "linear-gradient(0deg, #a71414 0%, #f76464 100%)",
      },
  }).showToast();
}