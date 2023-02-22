//FUNCIONES

function vaciarCarrito() {

    localStorage.clear();

    carrito = [];

    renderizarCarrito(carrito);
}

function alertaElCarroEstaVacio() {

    swal("Su carrito se encuentra vacío!", "Agregue productos para continuar.", "warning");
}

function alertaCompraFinalizada() {

    swal("Compra Exitosa", "Gracias por elegirnos.", "success");
}

function alertaVaciarCarrito() {
    Toastify({
        text: "Carrito Vacio",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #ff8c00, #ff0000)",
        }
    }).showToast()
}

function alertaEliminadoDelCarrito() {
    Toastify({
        text: "Producto Eliminado",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #ff8c00, #ff0000)",
        }
    }).showToast()
}

function alertaAgregadoAlCarrito() {
    Toastify({
        text: "Agregado al carrito",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast()
}

function editarCantidad(producto, nuevaCantidad) {

    const indiceProductoExiste = carrito.findIndex((productoCarrito) => {
        return productoCarrito.nombre === producto.nombre;
    });

    if (indiceProductoExiste !== -1) {

        carrito[indiceProductoExiste].cantidad = nuevaCantidad;

    }

    renderizarCarrito(carrito);

    agregarCarritoALS();
}

function renderizarTotal() {

    const total = carrito.reduce((acc, productoCarrito) => {
        return acc + (productoCarrito.precioMasIVA * productoCarrito.cantidad);
    }, 0);
    precioFinal.innerHTML = `$${total}`;
}

function obtenerCarritoLS() {

    let carrito = [];
    const carritoLS = localStorage.getItem("carrito");

    if (carritoLS !== null) {
        carrito = JSON.parse(carritoLS);
    }

    return carrito;
}

function agregarCarritoALS() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(producto, cantidad) {

    const productoExiste = carrito.findIndex((productoCarrito) => {
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

        alertaAgregadoAlCarrito();

    } else {

        carrito[productoExiste].cantidad += cantidad;

        alertaAgregadoAlCarrito();
    }
    renderizarCarrito(carrito);

    agregarCarritoALS();
}

function renderizarCarrito(productos) {

    //limpiar carrito

    listadoCarrito.innerHTML = "";

    for (const producto of productos) {

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
        const spanCantidad = document.createElement("span");
        spanCantidad.innerHTML = `Cantidad: ${producto.cantidad}`;

        cantidad.append(spanCantidad);

        spanCantidad.addEventListener("click", () => {

            spanCantidad.className = "ocultar";

            const inputCantidad = document.createElement("input");
            inputCantidad.value = producto.cantidad;

            inputCantidad.addEventListener("change", () => {

                const nuevaCantidad = inputCantidad.value;

                spanCantidad.className = "mostrar";

                inputCantidad.remove();

                editarCantidad(producto, nuevaCantidad);
            });

            cantidad.append(inputCantidad);

        });

        const total = document.createElement("p");
        total.className = "total";
        total.innerHTML = `Total: $${producto.precioMasIVA * producto.cantidad}`;

        //agregamos todo al li

        li.append(img, h6, pPrecio, pSinIva, cantidad, total);

        //agregamos a la lista

        listadoCarrito.append(li);
    }
    renderizarTotal();
}

function renderizarProductos(productos) {

    //limpiar lista de productos

    listadoProductos.innerHTML = "";

    for (const producto of productos) {

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
        pPrecio.innerHTML = `$${Math.round(producto.precio * 1.22)}`;

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

//INICIO DEL PROGRAMA

let carrito = obtenerCarritoLS();
const listadoProductos = document.getElementById("listadoProductos");
const listadoCarrito = document.getElementById("listadoCarrito");
const precioFinal = document.querySelector("#precioFinal span");
const btnVaciarCarrito = document.getElementById("vaciarCarrito");
const btnFinalizarCompra = document.getElementById("finalizarCompra");

//FUNCIONALIDAD BOTONES CARRITO

btnVaciarCarrito.addEventListener("click", () => {

    vaciarCarrito();
    alertaVaciarCarrito();
})

btnFinalizarCompra.addEventListener("click", () => {

    if (carrito.length >= 1) {
        vaciarCarrito();
        alertaCompraFinalizada();
    } else {
        alertaElCarroEstaVacio();
    }
})

//OBTENEMOS LOS PRODUCTOS JSON

fetch("/productos.json")
    .then((response) => {
        return response.json();
    })
    .then((responseProductos) => {
        renderizarProductos(responseProductos);
    });

//RENDERIZAR LOS PRODUCTOS
renderizarCarrito(carrito);