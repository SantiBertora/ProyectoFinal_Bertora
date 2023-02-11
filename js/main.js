//OBTENEMOS LOS PRODUCTOS JSON

fetch("/productos.json")
    .then( (response) => {
        return response.json();
    })
    .then( (responseProductos) => {
        renderizarProductos(responseProductos);
    });

//FUNCION RENDERIZAR PRODUCTOS

