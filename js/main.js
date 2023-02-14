/* CONSTRUCTOR DE LOS PRODUCTOS */
class Producto {
    constructor(id, nombre, precio, categoria, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.img = img;
    }
}
/* ----------------- */

/* LISTA DE PRODUCTOS */
const productos = [
    new Producto(0, "cinzano", 710, "aperitivo", "./media/MENU/APERITIVOS/CINZANO.png"),
    new Producto(1, "gancia", 950, "aperitivo", "./media/MENU/APERITIVOS/GANCIA.png"),
    new Producto(2, "fernet", 2370, "aperitivo", "./media/MENU/APERITIVOS/FERNET.png"),
    new Producto(3, "aperol", 1490, "aperitivo", "./media/MENU/APERITIVOS/APEROL.png"),
    new Producto(4, "cynar", 1445, "aperitivo", "./media/MENU/APERITIVOS/CYNAR.png"),
    new Producto(5, "quilmes", 360, "cerveza", "./media/MENU/CERVEZAS/QUILMES.png"),
    new Producto(6, "patagonia", 870, "cerveza", "./media/MENU/CERVEZAS/PATAGONIA.png"),
    new Producto(7, "corona", 720, "cerveza", "./media/MENU/CERVEZAS/CORONA.png"),
    new Producto(8, "andes", 460, "cerveza", "./media/MENU/CERVEZAS/ANDES.png"),
    new Producto(9, "budweiser", 530, "cerveza", "./media/MENU/CERVEZAS/BUDWEISER.png"),
    new Producto(10, "vodka smirnoff", 1470, "bebidaBlanca", "./media/MENU/BEBIDASBLANCAS/SMIRNOFF.png"),
    new Producto(11, "vodka skyy", 1230, "bebidaBlanca", "./media/MENU/BEBIDASBLANCAS/SKYY.png"),
    new Producto(12, "gin bosque", 1650, "bebidaBlanca", "./media/MENU/BEBIDASBLANCAS/BOSQUE.png"),
    new Producto(13, "gin beefeater", 6300, "bebidaBlanca", "./media/MENU/BEBIDASBLANCAS/BEEFEATER.png"),
    new Producto(14, "malibu", 3250, "bebidaBlanca", "./media/MENU/BEBIDASBLANCAS/MALIBU.png"),
    new Producto(15, "pepsi", 490, "gaseosa", "./media/MENU/GASEOSAS/PEPSI.png"),
    new Producto(16, "7up", 390, "gaseosa", "./media/MENU/GASEOSAS/7UP.png"),
    new Producto(17, "mirinda", 420, "gaseosa", "./media/MENU/GASEOSAS/MIRINDA.png"),
    new Producto(18, "paso de los toros", 430, "gaseosa", "./media/MENU/GASEOSAS/PASODELOSTOROS.png"),
    new Producto(19, "h2o", 430, "gaseosa", "./media/MENU/GASEOSAS/H2O.png"),
]
/* ----------------- */

// Enviar y devolver lista de productos del almacenamiento local
localStorage.setItem("productos", JSON.stringify(productos));
const productosAlmacenados = JSON.parse(localStorage.getItem("productos"));

/* CREAR NODOS DE LOS PRODUCTOS Y PONERLOS EN EL DOM */
const shopContent = document.getElementById("shopContent")
productosAlmacenados.forEach((productos) => {
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
let counter = JSON.parse(localStorage.getItem("counter")) || 0;

// Agregar producto al carrito
cartButtons.forEach(cartButton => {
    cartButton.addEventListener("click", () => {
        const indexProductoSelec = Array.prototype.indexOf.call(cartButtons, cartButton);

        const productoAgregar = productos.filter((producto) => producto.id === indexProductoSelec)[0];
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