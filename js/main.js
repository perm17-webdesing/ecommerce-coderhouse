
// ----------PRODUCTOS
const productos = [
    {
        id: "combo01",
        nombre: "Combo Full",
        precio: 12500,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imagenDestacada: "",
        categoria: {
            id: "combos",
            nombreCategoria: "Combos"
        }
    },
    {
        id: "combo02",
        nombre: "Combo x2",
        precio: 12500,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imagenDestacada: "",
        categoria: {
            id: "combos",
            nombreCategoria: "Combos"
        }
    },
    {
        id: "combo03",
        nombre: "Combo x4",
        precio: 12500,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imagenDestacada: "",
        categoria: {
            id: "combos",
            nombreCategoria: "Combos"
        }
    },
    {
        id: "hamburguesa01",
        nombre: "Hamburguesa 01",
        precio: 12500,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imagenDestacada: "",
        categoria: {
            id: "para-comer",
            nombreCategoria: "Para Comer"
        }
    },
    {
        id: "papas-fritas01",
        nombre: "Papas Fritas",
        precio: 12500,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imagenDestacada: "",
        categoria: {
            id: "para-picar",
            nombreCategoria: "Para Picar"
        }
    },
    {
        id: "bebida01",
        nombre: "Gaseosa 01",
        precio: 12500,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imagenDestacada: "",
        categoria: {
            id: "para-tomar",
            nombreCategoria: "Para Tomar"
        }
    },

]

const gridProductos = document.querySelector("#grilla-productos");
const btnCategorias = document.querySelectorAll(".btn-categoria");
const tituloBanner = document.querySelector("#titulo-banner");
const numeritoCarrito = document.querySelector("#numerito-carrito")

let botonAgregarCarrito = document.querySelectorAll(".btn-agregar-al-carrito");




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

        })



    }
    actualizarBtnCarrito();
}

cargarProductos(productos);

btnCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        btnCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active")

        if (e.currentTarget.id != "todos") {

            const productosFiltrados = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosFiltrados);

            const titularBanner = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloBanner.innerText = titularBanner.categoria.nombreCategoria;

        }
        else {
            cargarProductos(productos);
            tituloBanner.innerText = "Todos Los Productos"
        }


    })
})

function actualizarBtnCarrito() {
    botonAgregarCarrito = document.querySelectorAll(".btn-agregar-al-carrito");

    botonAgregarCarrito.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
};

let productosEnCarrito = []

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


    actualizarNumeroCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}


let numeroCarrito = 0

function actualizarNumeroCarrito() {
    numeroCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeritoCarrito.innerText = numeroCarrito;

}

let productosAgregadosAlCarrito = []



let contenedorCarrito = document.querySelector("#contenedor-grilla-carrito");


function paginaCarrito() {
    if (window.location.pathname === "/html/carrito.html") {
        productosAgregadosAlCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

        if (productosAgregadosAlCarrito) {
            contenedorCarrito.innerHTML = `
                            <div class="contenedor-titulo-item-carrito">
                    <div class="celda s"></div>
                    <div class="celda l">Titulo</div>
                    <div class="cantidad-en-carrito celda m">Cantidad</div>
                    <div class="precio-en-carrito celda l">Precio</div>
                    <div class="celda s"></div>
                </div>
            `
            productosAgregadosAlCarrito.forEach(producto => {
                console.log(producto.nombre)
                let itemCarrito = document.createElement("div")
                itemCarrito.classList.add("item-carrito");
                itemCarrito.innerHTML = `
                <div class="celda s"><img src="${producto.imagen}" alt="${producto.nombre}"></div>
                <div class="titulo-en-carrito celda l">${producto.nombre}</div>
                <div class="cantidad-en-carrito celda m">${producto.cantidad}</div>
                <div class="precio-en-carrito celda l"><span>$</span> ${producto.precio * producto.cantidad}</div>
                <div class="eliminar-del-carrito celda s" "><button id="${producto.id}"><i class="bi bi-trash-fill"></i></button></div>
            `;

                contenedorCarrito.append(itemCarrito);

            })


            console.log("si hay");
        } else {
            contenedorCarrito.innerHTML = `
       <div class="No hay productos en el carrito"><span>No hay productos en el carrito</span></div>
        <div class="div-volver-a-la-tienda"><a href="../index.html">Volver a la tienda</a></div>
       `
        }

    }
}


paginaCarrito();
