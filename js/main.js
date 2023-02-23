//FUNCIONES

function quitarProductoDelCarrito(nombre) {

    //encontramos el producto a eliminar
    const productoAEliminar =  carrito.find((producto) => producto.nombre === nombre);

    //filtramos el carrito
    carrito = carrito.filter((producto) => {
        return producto !== productoAEliminar;
    })
    //actualizamos el carrito sin el producto eliminado
    renderizarCarrito(carrito);
}

//-------------------------

function vaciarCarrito() {

    //limpiamos el LS
    localStorage.clear();

    //limpiamos el carrito
    carrito = [];

    //actualizamos el carrito vacío
    renderizarCarrito(carrito);
}

//--------------------------

function alertaElCarroEstaVacio() {

    swal("Su carrito se encuentra vacío!", "Agregue productos para continuar.", "warning");
}

//-------------------------------------

function alertaCompraFinalizada() {

    swal("Compra Exitosa", "Gracias por elegirnos.", "success");
}

//-----------------------------------

function alertaVaciarCarrito() {
    Toastify({
        text: "Carrito Vacio",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #ff8c00, #ff0000)",
        }
    }).showToast()
}

//---------------------------------------

function alertaEliminadoDelCarrito() {
    Toastify({
        text: "Producto Eliminado",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #ff8c00, #ff0000)",
        }
    }).showToast()
}

//-------------------------------

function alertaAgregadoAlCarrito() {
    Toastify({
        text: "Agregado al carrito",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast()
}

//---------------------------------------------

function editarCantidad(producto, nuevaCantidad) {

    //obtenemos el producto a editar
    const indiceProductoExiste = carrito.findIndex((productoCarrito) => {
        return productoCarrito.nombre === producto.nombre;
    });

    //cambiamos la cantidad agregada al carrito
    if (indiceProductoExiste !== -1) {

        carrito[indiceProductoExiste].cantidad = nuevaCantidad;

    }

    //actualizamos carrito
    renderizarCarrito(carrito);

    //guardamos carrito en LS
    agregarCarritoALS();
}

//-----------------------------

function renderizarTotal() {

    //calculamos el precio total del carrito
    const total = carrito.reduce((acc, productoCarrito) => {
        return acc + (productoCarrito.precioMasIVA * productoCarrito.cantidad);
    }, 0);
    precioFinal.innerHTML = `$${total}`;
}

//---------------------------------

function obtenerCarritoLS() {

    //obtenemos carrito de LS
    let carrito = [];
    const carritoLS = localStorage.getItem("carrito");

    //si habían datos en LS los parseamos
    if (carritoLS !== null) {
        carrito = JSON.parse(carritoLS);
    }

    return carrito;
}

//----------------------------------

function agregarCarritoALS() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//----------------------------------------------

function agregarAlCarrito(producto, cantidad) {

    //buscamos el producto dentro de nuestro carrito
    const productoExiste = carrito.findIndex((productoCarrito) => {
        return productoCarrito.nombre === producto.nombre;
    });

    //si el producto no existe en nuestro carrito lo agregamos
    if (productoExiste === -1) {

        carrito.push({
            nombre: producto.nombre,
            precio: producto.precio,
            img: producto.img,
            precioMasIVA: Math.round(producto.precio * 1.22),
            cantidad: cantidad
        })

        //alerta de agregado al carrito
        alertaAgregadoAlCarrito();

    //si el producto ya existe en nuestro carrito solo agregamos la cantidad
    } else {

        carrito[productoExiste].cantidad += cantidad;

        //alerta de agregado al carrito
        alertaAgregadoAlCarrito();
    }

    //actualizamos el carrito
    renderizarCarrito(carrito);

    //guardamos carrito en LS
    agregarCarritoALS();
}

//----------------------------------------

function renderizarCarrito(productos) {

    //limpiar carrito

    listadoCarrito.innerHTML = "";

    //recorremos el array
    for (const producto of productos) {

        //creamos un li por cada producto
        const li = document.createElement("li");
        li.className = "productoEnCarrito";

        //agregamos el boton para eliminar el producto
        const eliminarProducto = document.createElement("button");
        eliminarProducto.className = "btnEliminarProducto";
        eliminarProducto.innerHTML = "❌"

        //evento para boton de eliminar producto
        eliminarProducto.addEventListener("click", () => {

            //quitamos el producto del carrito
            quitarProductoDelCarrito(producto.nombre);

            //alerta de agregado al carrito
            alertaEliminadoDelCarrito();
        })

        //agregamos la img del producto
        const img = document.createElement("img");
        img.className = "imgCarrito";
        img.src = `${producto.img}`;
        img.alt = "Imagen Producto en Carrito";

        //el nombre del producto
        const h6 = document.createElement("h6");
        h6.innerHTML = `${producto.nombre}`;

        //el precio del producto IVA incluido por unidad
        const pPrecio = document.createElement("p");
        pPrecio.className = "precio"
        pPrecio.innerHTML = `$${producto.precioMasIVA}`;

        //el precio del producto sin IVA por unidad
        const pSinIva = document.createElement("p");
        pSinIva.className = "precioSinIVA";
        pSinIva.innerHTML = `$${producto.precio} S/ IVA`;

        //cantidad de productos en el carrito
        const cantidad = document.createElement("p");
        cantidad.className = "cantidad";
        //creamos un span para poder editar la cantidad mediante un input
        const spanCantidad = document.createElement("span");
        spanCantidad.innerHTML = `Cantidad: ${producto.cantidad}`;

        //agregamos el span a cantidad
        cantidad.append(spanCantidad);

        //agregamos el evento al span
        spanCantidad.addEventListener("click", () => {

            //ocultamos el span al hacer click
            spanCantidad.className = "ocultar";

            //creamos el input y le damos de valor inicial, la cantidad del producto
            const inputCantidad = document.createElement("input");
            inputCantidad.value = producto.cantidad;

            //evento del input
            inputCantidad.addEventListener("change", () => {

                //obtenemos la nueva cantidad
                const nuevaCantidad = inputCantidad.value;

                //volvemos a mostrar el span
                spanCantidad.className = "mostrar";

                //quitamos el input
                inputCantidad.remove();

                //editamos la cantidad del producto
                editarCantidad(producto, nuevaCantidad);
            });

            //agregamos el input al span
            cantidad.append(inputCantidad);
        });

        //sumamos el precio final del producto
        const total = document.createElement("p");
        total.className = "total";
        total.innerHTML = `Total: $${producto.precioMasIVA * producto.cantidad}`;

        //agregamos todo al li
        li.append(eliminarProducto, img, h6, pPrecio, pSinIva, cantidad, total);

        //agregamos a la lista
        listadoCarrito.append(li);
    }
    
    //actualizamos el precio final
    renderizarTotal();
}

//--------------------------------------------

function renderizarProductos(productos) {

    //limpiar lista de productos
    listadoProductos.innerHTML = "";

    //recorremos el array
    for (const producto of productos) {

        //creamos un li por cada producto
        const li = document.createElement("li");
        li.className = "producto";

        //le agregamos una img
        const img = document.createElement("img");
        img.className = "img";
        img.src = `${producto.img}`;
        img.alt = "Imagen Producto";

        //colocamos el nombre
        const h3 = document.createElement("h3");
        h3.className = "nombre";
        h3.innerHTML = `${producto.nombre}`;

        //agregamos el precio unitario IVA incluido
        const pPrecio = document.createElement("p");
        pPrecio.className = "precio"
        pPrecio.innerHTML = `$${Math.round(producto.precio * 1.22)}`;

        //mostramos el precio unitario sin IVA
        const pSinIva = document.createElement("p");
        pSinIva.className = "precioSinIVA";
        pSinIva.innerHTML = `$${producto.precio} S/ IVA`;

        //creamos un boton para agregar una unidad al carrito
        const btnUnidad = document.createElement("button");
        btnUnidad.className = "btn";
        btnUnidad.innerHTML = "Agregar unidad";

        //evento para agregar al carrito
        btnUnidad.addEventListener("click", () => {

            //llamamos a la función y le damos los parametros
            agregarAlCarrito(producto, 1);

        })

        //creamos una etiqueta br para hacer un salto de linea entre los botones
        const br = document.createElement("br");

        //creamos un boton para agregar una caja al carrito
        const btnCaja = document.createElement("button");
        btnCaja.className = "btn";
        btnCaja.innerHTML = "Agregar caja(12 u.)";

        //evento para agregar al carrito
        btnCaja.addEventListener("click", () => {

            //llamamos a la funcion y le damos los parametros
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

//evento para vaciar el carrito
btnVaciarCarrito.addEventListener("click", () => {

    //llamamos a la función para limpiar el carro
    vaciarCarrito();
    //mostramos una alerta para confirmar que se borro todo del carrito
    alertaVaciarCarrito();
})

//evento para comprar
btnFinalizarCompra.addEventListener("click", () => {

    //si el carrito tiene al menos un producto
    if (carrito.length >= 1) {
        //vaciamos el carrito
        vaciarCarrito();
        //alertamos que se ha completado la compra con éxito
        alertaCompraFinalizada();
    //si el carro se encuetra vacío
    } else {
        //mostramos una alerta porque no hay nada seleccionado
        alertaElCarroEstaVacio();
    }
})

//OBTENEMOS LOS PRODUCTOS JSON

fetch("./productos.json")
    .then((response) => {
        return response.json();
    })
    .then((responseProductos) => {
        renderizarProductos(responseProductos);
    });

//RENDERIZAR LOS PRODUCTOS
renderizarCarrito(carrito);