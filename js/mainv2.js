// ----------PRODUCTOS
const productos = [
    {
        id: "combo01",
        nombre: "Combo Mega Delicia",
        precio: 12500,
        descripcion: "El combo perfecto para los que lo quieren todo: ¡hamburguesa, papas y bebida en un solo pack!",
        imagenDestacada: "../img/assets/combo01.png",
        categoria: {
            id: "combos",
            nombreCategoria: "Combos"
        }
    },
    {
        id: "combo02",
        nombre: "Combo Doble Placer",
        precio: 12500,
        descripcion: "Ideal para compartir, con el doble de sabor en cada bocado. ¡Perfecto para una cita o entre amigos!",
        imagenDestacada: "../img/assets/combo02.png",
        categoria: {
            id: "combos",
            nombreCategoria: "Combos"
        }
    },
    {
        id: "combo03",
        nombre: "Combo Familiar x4",
        precio: 12500,
        descripcion: "El combo completo para que nadie se quede con hambre. Cuatro porciones cargadas de sabor y buena compañía.",
        imagenDestacada: "../img/assets/combo03.png",
        categoria: {
            id: "combos",
            nombreCategoria: "Combos"
        }
    },
    {
        id: "hamburguesa01",
        nombre: "Hamburguesa Clásica de la Casa",
        precio: 12500,
        descripcion: "La hamburguesa estrella, con ingredientes frescos y el sabor irresistible que nos distingue.",
        imagenDestacada: "../img/assets/hamburguesa01.png",
        categoria: {
            id: "para-comer",
            nombreCategoria: "Para Comer"
        }
    },
    {
        id: "papas-fritas01",
        nombre: "Papas Fritas Crunchy",
        precio: 12500,
        descripcion: "Papas doradas y crujientes, servidas calientes y con el toque perfecto de sal. ¡Una explosión de sabor en cada bocado!",
        imagenDestacada: "../img/assets/papas-fritas01.png",
        categoria: {
            id: "para-picar",
            nombreCategoria: "Para Picar"
        }
    },
    {
        id: "bebida01",
        nombre: "Gaseosa Refrescante",
        precio: 12500,
        descripcion: "La bebida burbujeante que acompaña todas tus comidas con el frescor que necesitas.",
        imagenDestacada: "../img/assets/bebida01.png",
        categoria: {
            id: "para-tomar",
            nombreCategoria: "Para Tomar"
        }
    }
];


const gridProductos = document.querySelector("#grilla-productos");
const btnCategorias = document.querySelectorAll(".btn-categoria");
const tituloBanner = document.querySelector("#titulo-banner");
const numeritoCarrito = document.querySelector("#numerito-carrito");

let botonesEliminar = document.querySelectorAll(".btn-eliminar");

let botonAgregarCarrito = document.querySelectorAll(".btn-agregar-al-carrito");


let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];


actualizarNumeroCarrito();


function cargarProductos(productosSeleccionados) {
    if (window.location.pathname === "/index.html") {
        gridProductos.innerHTML = "";
        productosSeleccionados.forEach(producto => {
            let div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <div class="producto-img">
                    <div class="img-destacada-producto">
                        <img src="${producto.imagenDestacada}" alt="${producto.nombre}">
                    </div>
                </div>
                <div class="titulo-producto">${producto.nombre}</div>
                <div class="subtitulo-producto">${producto.descripcion}</div>
                <hr class="divisor-producto">
                <div class="footer-producto">
                    <div class="precio-producto"><span>$</span> ${producto.precio}</div>
                    <button class="btn-agregar-al-carrito" id="${producto.id}">
                        <i class="bi bi-cart-plus-fill"></i>
                    </button>
                </div>
            `;
            gridProductos.append(div);
        });
        actualizarBtnCarrito();
    }
}

cargarProductos(productos);


btnCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        btnCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id !== "todos") {
            const productosFiltrados = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosFiltrados);
            const titularBanner = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloBanner.innerText = titularBanner.categoria.nombreCategoria;
        } else {
            cargarProductos(productos);
            tituloBanner.innerText = "Todos Los Productos";
        }
    });
});


function actualizarBtnCarrito() {
    botonAgregarCarrito = document.querySelectorAll(".btn-agregar-al-carrito");
    botonAgregarCarrito.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad += 1;
    } else {
        const nuevoProducto = { ...productoAgregado, cantidad: 1 };
        productosEnCarrito.push(nuevoProducto);
    }


    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    actualizarNumeroCarrito();
}


function actualizarNumeroCarrito() {
    const numeroCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeritoCarrito.innerText = numeroCarrito;
}


function paginaCarrito() {
    if (window.location.pathname === "/html/carrito.html") {
        productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

        function actualizarCargarProductosCarrito(){
            if (productosEnCarrito.length > 0) {
                contenedorCarrito.innerHTML = `
                    <div class="contenedor-titulo-item-carrito">
                        <div class="celda s"></div>
                        <div class="celda l">Titulo</div>
                        <div class="cantidad-en-carrito celda m">Cantidad</div>
                        <div class="precio-en-carrito celda l">Precio</div>
                        <div class="celda s"></div>
                    </div>
                `;
                productosEnCarrito.forEach(producto => {
                    let itemCarrito = document.createElement("div");
                    itemCarrito.classList.add("item-carrito");
                    itemCarrito.innerHTML = `
                        <div class="celda s"><img src="${producto.imagenDestacada}" alt="${producto.nombre}"></div>
                        <div class="titulo-en-carrito celda l">${producto.nombre}</div>
                        <div class="cantidad-en-carrito celda m">${producto.cantidad}</div>
                        <div class="precio-en-carrito celda l"><span>$</span> ${producto.precio * producto.cantidad}</div>
                        <div class="eliminar-del-carrito celda s"><button class="btn-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button></div>
                    `;
                    contenedorCarrito.append(itemCarrito);
    
                    
    
                });

            } else {
                contenedorCarrito.innerHTML = `
                    <div class="No hay productos en el carrito"><span>No hay productos en el carrito</span></div>
                    <div class="div-volver-a-la-tienda"><a href="../index.html">Volver a la tienda</a></div>
                `;
            }

        }

        actualizarCargarProductosCarrito();

        function actualizarBtnEliminar() {
            console.log("pruebaaaaaaaaa");

        }
        
        actualizarBtnEliminar();






    }
};









paginaCarrito();

console.log("prueba");