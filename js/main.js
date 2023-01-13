class Producto{
    constructor(id, nombre, precio, categoria, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.img = img;
    }
}

//lista de productos
const productos = [
    new Producto(2, "fernet", 100, "aperitivo", "./media/MENU/APERITIVOS/FERNET.png"),
    new Producto(1, "gancia", 100, "aperitivo", "./media/MENU/APERITIVOS/GANCIA.png"),
    new Producto(3, "aperol", 100, "aperitivo", "./media/MENU/APERITIVOS/APEROL.png"),
    new Producto(4, "cynar", 100, "aperitivo", "./media/MENU/APERITIVOS/CYNAR.png"),
    new Producto(5, "quilmes", 100, "cerveza", "./media/MENU/CERVEZAS/QUILMES.png"),
    new Producto(6, "patagonia", 100, "cerveza", "./media/MENU/CERVEZAS/PATAGONIA.png"),
    new Producto(7, "corona", 100, "cerveza", "./media/MENU/CERVEZAS/CORONA.png"),
    new Producto(8, "andes", 100, "cerveza", "./media/MENU/CERVEZAS/ANDES.png"),
    new Producto(9, "budweiser", 100, "cerveza", "./media/MENU/CERVEZAS/BUDWEISER.png"),
    new Producto(10, "vodka smirnoff", 100, "bebidaBlanca", "./media/MENU/BEBIDASBLANCAS/SMIRNOFF.png"),
    new Producto(11, "vodka skyy", 100, "bebidaBlanca", "./media/MENU/BEBIDASBLANCAS/SKYY.png"),
    new Producto(12, "gin bosque", 100, "bebidaBlanca", "./media/MENU/BEBIDASBLANCAS/BOSQUE.png"),
    new Producto(13, "gin beefeater", 100, "bebidaBlanca", "./media/MENU/BEBIDASBLANCAS/BEEFEATER.png"),
    new Producto(14, "malibu", 100, "bebidaBlanca", "./media/MENU/BEBIDASBLANCAS/MALIBU.png"),
    new Producto(15, "pepsi", 100, "gaseosa", "./media/MENU/GASEOSAS/PEPSI.png"),
    new Producto(16, "7up", 100, "gaseosa", "./media/MENU/GASEOSAS/7UP.png"),
    new Producto(17, "mirinda", 100, "gaseosa", "./media/MENU/GASEOSAS/MIRINDA.png"),
    new Producto(18, "paso de los toros", 100, "gaseosa", "./media/MENU/GASEOSAS/PASODELOSTOROS.png"),
    new Producto(19, "h2o", 100, "gaseosa", "./media/MENU/GASEOSAS/H2O.png"),
]

const productosAperitivo = productos.filter( (producto) => producto.categoria === "aperitivo");
const productosCerveza = productos.filter( (producto) => producto.categoria === "cerveza");
const productosBebidaBlanca = productos.filter( (producto) => producto.categoria === "bebidaBlanca");
const productosGaseosa = productos.filter( (producto) => producto.categoria === "gaseosa");

console.log(productosAperitivo);
console.log(productosCerveza);
console.log(productosBebidaBlanca);
console.log(productosGaseosa);


 const shopContent = document.getElementById("shopContent")

productos.forEach((productos) => {
   let content = document.createElement('div');
   content.classList.add("col-sm-12", "col-lg-4", "all");
   
   content.innerHTML =`
        <div class="box">
            <div>
                <div class="img-box">
                    <img src="${productos.img}" alt="">
                </div>
                <div class="detail-box">
                    <h5>${productos.nombre.toUpperCase()}</h5>
                    <h4>${productos.precio} $</h4>
                    <button class="button">  </button>
                </div>
            </div>
        </div>
    `
    ;

   shopContent.append(content);
})

/* switch () {
    case value:
        
        break;

    default:
        break;
}

 */