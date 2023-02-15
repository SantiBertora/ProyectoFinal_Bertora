//VARIABLES

const carrito = [];
let totalAPagar = 0;

//DOM

const listadoProductos = document.getElementById("listadoProductos");
const listadoCarrito = document.getElementById("listadoCarrito");
const precioFinal = document.getElementById("precioFinal");

//OBTENEMOS LOS PRODUCTOS JSON

fetch("/productos.json")
    .then((response) => {
        return response.json();
    })
    .then((responseProductos) => {
        renderizarProductos(responseProductos);
    });

//FUNCION RENDERIZAR PRODUCTOS

/*  <li class="producto">
        <img class="img" src="/img/productos-png/gin_bombay.png" alt="">
        <h3 class="nombre"><Bombay><strong>Gin Bombay</strong></Bombay></h3>
        <p class="precio">$900</p>
        <p class="precioSinIVA">$738 S/IVA</p>
        <button class="btn">Agregar Unidad</button><br>
        <button class="btn">Agregar Caja(12u.)</button>
    </li> */

function renderizarProductos(productos) {

    //limpiar lista de productos

    listadoProductos.innerHTML = "";

    for(const producto of productos) {

        const li = document.createElement("li");
        li.className = "producto";

        const img = document.createElement("img");
        img.className = "img";
        img.src = `${producto.img}`;
        img.alt = "Imagen Producto";

        const h3 = document.createElement("h3");
        h3.className = "nombre";
        h3.innerHTML = `${producto.nombre}`;

        const pPrecio = document.createElement("p");
        pPrecio.className = "precio"
        pPrecio.innerHTML = `$${ Math.round(producto.precio * 1.22)}`;

        const pSinIva = document.createElement("p");
        pSinIva.className = "precioSinIVA";
        pSinIva.innerHTML = `$${producto.precio} S/ IVA`;

        const btnUnidad = document.createElement("button");
        btnUnidad.className = "btn";
        btnUnidad.innerHTML = "Agregar unidad";

        btnUnidad.addEventListener("click", () => {

            agregarAlCarrito(producto, 1);

        })

        const br = document.createElement("br");

        const btnCaja = document.createElement("button");
        btnCaja.className = "btn";
        btnCaja.innerHTML = "Agregar caja(12 u.)";

        btnCaja.addEventListener("click", () => {

            agregarAlCarrito(producto, 12);

        })

        //agregamos todo al li

        li.append(img, h3, pPrecio, pSinIva, btnUnidad, br, btnCaja);

        //agregamos a la lista

        listadoProductos.append(li);
    }
}

//FUNCION RENDERIZAR CARRITO

/* <li class="productoEnCarrito">
    <img class="imgCarrito" src="/img/productos-png/gin_bombay.png" alt="Imagen Producto en Carrito">
    <h6>Gin Bombay</h6>
    <p class="precio">854</p>
    <p class="precioSinIVA">700</p>
    <p class="cantidad">5</p>
    <p class="total">4270</p>
</li> */

function renderizarCarrito(productos) {

    //limpiarcarrito

    listadoCarrito.innerHTML = "";

    for(const producto of productos) {

        const li = document.createElement("li");
        li.className = "productoEnCarrito";

        const img = document.createElement("img");
        img.className = "imgCarrito";
        img.src = `${producto.img}`;
        img.alt = "Imagen Producto en Carrito";

        const h6 = document.createElement("h6");
        h6.innerHTML = `${producto.nombre}`;

        const pPrecio = document.createElement("p");
        pPrecio.className = "precio"
        pPrecio.innerHTML = `$${producto.precioMasIVA}`;

        const pSinIva = document.createElement("p");
        pSinIva.className = "precioSinIVA";
        pSinIva.innerHTML = `$${producto.precio} S/ IVA`;

        const cantidad = document.createElement("p");
        cantidad.className = "cantidad";
        cantidad.innerHTML = `Cantidad: ${producto.cantidad}`;

        const total = document.createElement("p");
        total.className = "total";
        total.innerHTML = `Total: $${producto.precioMasIVA * producto.cantidad}`;
    
        //agregamos todo al li

        li.append(img, h6, pPrecio, pSinIva, cantidad, total);

        //agregamos a la lista

        listadoCarrito.append(li);

        totalAPagar = producto.precioMasIVA * producto.cantidad ;
        console.log(totalAPagar)
    
    }
}

//FUNCION AGREGAR AL CARRITO

function agregarAlCarrito(producto, cantidad) {

    const productoExiste = carrito.findIndex( (productoCarrito) => {
        return productoCarrito.nombre === producto.nombre;
    });

    if (productoExiste === -1) {

        carrito.push({
            nombre: producto.nombre,
            precio: producto.precio,
            img: producto.img,
            precioMasIVA: Math.round(producto.precio * 1.22),
            cantidad: cantidad
        })

    } else {

        carrito[productoExiste].cantidad += cantidad;
    }
    renderizarCarrito(carrito);
}