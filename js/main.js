const url = './data-productos/productos.json';

let productos = [];

async function cargarProductosDesdeJSON() {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`Error al cargar los productos`);
        }
        productos = await respuesta.json();

        console.log('Productos cargados:', productos); // Verifica los datos en la consola

        cargarProductos(productos);
        asignarEventos();

        if (window.location.pathname === "/html/carrito.html") {
            actualizarDetalleCompra();
        }
    } catch (error) {
        console.error('Error al cargar los productos', error);
    }
}



function cargarProductos(productosSeleccionados) {
    const gridProductos = document.querySelector("#grilla-productos");
    const tituloBanner = document.querySelector("#titulo-banner");

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
    }
    actualizarNumeroCarrito();
}

function asignarEventos() {
    const btnCategorias = document.querySelectorAll(".btn-categoria");

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


    document.querySelectorAll(".btn-agregar-al-carrito").forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
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

    Swal.fire({
        toast: true,
        position: 'bottom-right',
        icon: 'success',
        title: `¡${productoAgregado.nombre} agregado al carrito!`,
        text: `Cantidad: ${productosEnCarrito.find(producto => producto.id === idBoton).cantidad}`,
        imageUrl: productoAgregado.imagenDestacada,
        imageWidth: 50,
        imageHeight: 50,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });
}

function actualizarNumeroCarrito() {
    let numeritoCarrito = document.querySelector("#numerito-carrito");
    if (numeritoCarrito) {
        let numeroCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numeritoCarrito.innerText = numeroCarrito;
    }
}

function paginaCarrito() {
    const contenedorCarrito = document.querySelector("#contenedor-grilla-carrito");

    if (window.location.pathname === "/html/carrito.html") {
        contenedorCarrito.innerHTML = '';
        if (productosEnCarrito.length > 0) {
            productosEnCarrito.forEach(producto => {
                let itemCarrito = document.createElement("div");
                itemCarrito.classList.add("item-carrito");
                itemCarrito.innerHTML = `
                    <div class="celda s"><img src="${producto.imagenDestacada}" alt="${producto.nombre}"></div>
                    <div class="titulo-en-carrito celda l">${producto.nombre}</div>
                    <div class="cantidad-en-carrito celda m">${producto.cantidad}</div>
                    <div class="precio-en-carrito celda l"><span>$</span> ${producto.precio * producto.cantidad}</div>
                    <div class="eliminar-del-carrito celda s">
                        <button class="button" id="${producto.id}">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 14" class="svgIcon bin-top">
        <g clip-path="url(#clip0_35_24)">
            <path fill="black"
                d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z">
            </path>
        </g>
        <defs>
            <clipPath id="clip0_35_24">
                <rect fill="white" height="14" width="69"></rect>
            </clipPath>
        </defs>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 57" class="svgIcon bin-bottom">
        <g clip-path="url(#clip0_35_22)">
            <path fill="black"
                d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z">
            </path>
        </g>
        <defs>
            <clipPath id="clip0_35_22">
                <rect fill="white" height="57" width="69"></rect>
            </clipPath>
        </defs>
    </svg>
</button>
                        
                    </div>
                `;
                contenedorCarrito.append(itemCarrito);
            });


            const botonesEliminar = document.querySelectorAll(".eliminar-del-carrito button");
            botonesEliminar.forEach(boton => {
                boton.addEventListener("click", eliminarDelCarrito);
            });
        } else {
            contenedorCarrito.innerHTML = `
                <div class="No hay productos en el carrito"><span>No hay productos en el carrito</span></div>
                <div class="div-volver-a-la-tienda"><a href="../index.html">Volver a la tienda</a></div>
            `;
        }
    }
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const producto = productosEnCarrito.find(producto => producto.id === idBoton);

    if (producto && producto.cantidad > 1) {
        producto.cantidad -= 1;
    }
    else {
        productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== idBoton);
    }

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    paginaCarrito();
    actualizarNumeroCarrito();
    actualizarDetalleCompra(); 
}

function actualizarDetalleCompra() {
    const contenedorDetalleCompra = document.querySelector(".div-detalle-compra");
    if (!contenedorDetalleCompra) return; // Verifica si el elemento existe
    
    contenedorDetalleCompra.innerHTML = '';

    if (productosEnCarrito.length > 0) {
        const subtotal = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        const divOpcionEnvio = document.createElement("div");
        divOpcionEnvio.classList.add("opcion-envio");
        divOpcionEnvio.innerHTML = `
            <label for="envio">Elige el tipo de envío:</label>
            <select id="envio" name="envio">
                <option value="local">Retiro por local</option>
                <option value="delivery">Envío a domicilio (+$3500)</option>
            </select>
        `;
        contenedorDetalleCompra.appendChild(divOpcionEnvio);
        const divDetalleMonto = document.createElement("div");
        divDetalleMonto.classList.add("detalle-monto");

        divDetalleMonto.innerHTML = `
            <div class="subtotal">
                <span>Subtotal:</span> <span>$${subtotal}</span>
            </div>
            <div class="envio">
                <span>Envío:</span> <span id="envio-costo">$0</span>
            </div>
            <div class="total">
                <span>Total:</span> <span id="total">$${subtotal}</span>
            </div>
        `;
        contenedorDetalleCompra.appendChild(divDetalleMonto);
        const divBotonFinalizar = document.createElement("div");
        divBotonFinalizar.classList.add("boton-finalizar");
        divBotonFinalizar.innerHTML = `
            <button id="finalizar-compra">Finalizar Compra</button>
        `;
        contenedorDetalleCompra.appendChild(divBotonFinalizar);

        const selectEnvio = document.querySelector("#envio");
        selectEnvio.addEventListener("change", (e) => {
            const costoEnvio = e.target.value === "delivery" ? 3500 : 0;
            document.querySelector("#envio-costo").innerText = `$${costoEnvio}`;
            document.querySelector("#total").innerText = `$${subtotal + costoEnvio}`;
        });

        document.querySelector("#finalizar-compra").addEventListener("click", mostrarPopupPago);
    }
}

cargarProductosDesdeJSON();

const body = document.querySelector('#body')
const preloader = document.querySelector('#preloader')

setTimeout(() => {
    body.classList.remove("noscroll")
    preloader.classList.add("oculto")

}, 1500);

function mostrarPopupPago() {
    Swal.fire({
        title: 'Datos de Pago',
        html: `
            <div class="form-pago">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" class="swal2-input" placeholder="Nombre" required>

                <label for="apellido">Apellido:</label>
                <input type="text" id="apellido" class="swal2-input" placeholder="Apellido" required>

                <label for="dni">DNI:</label>
                <input type="text" id="dni" class="swal2-input" placeholder="DNI" required>

                <label for="tarjeta">Número de Tarjeta:</label>
                <input type="text" id="tarjeta" class="swal2-input" placeholder="Número de tarjeta" maxlength="16" required>

                <label for="vencimiento">Fecha de Vencimiento:</label>
                <input type="text" id="vencimiento" class="swal2-input" placeholder="MM/AA" required>
            </div>
        `,
        confirmButtonText: 'Finalizar Pago',
        focusConfirm: false,
        preConfirm: () => {
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const dni = document.getElementById('dni').value.trim();
            const tarjeta = document.getElementById('tarjeta').value.trim();
            const vencimiento = document.getElementById('vencimiento').value.trim();

            if (!nombre || !apellido || !dni || !tarjeta || !vencimiento) {
                Swal.showValidationMessage('Por favor completa todos los campos.');
                return false;
            }

            if (!/^\d{16}$/.test(tarjeta)) {
                Swal.showValidationMessage('Número de tarjeta inválido. Deben ser 16 dígitos.');
                return false;
            }

            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento)) {
                Swal.showValidationMessage('Fecha de vencimiento inválida. Usa el formato MM/AA.');
                return false;
            }

            return { nombre, apellido, dni, tarjeta, vencimiento };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Guardar los datos de pago en localStorage
            localStorage.setItem('datosPago', JSON.stringify(result.value));

            // Mostrar mensaje de éxito con los datos de la compra
            mostrarResumenCompra(result.value);
        }
    });
}

function mostrarResumenCompra(datosPago) {
    const subtotal = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    const envioSeleccionado = document.querySelector("#envio").value;
    const costoEnvio = envioSeleccionado === "delivery" ? 3500 : 0;
    const total = subtotal + costoEnvio;

    const resumenProductos = productosEnCarrito.map(producto => `
        <li>${producto.nombre} - Cantidad: ${producto.cantidad} - Total: $${producto.precio * producto.cantidad}</li>
    `).join('');

    Swal.fire({
        icon: 'success',
        title: 'Compra Exitosa',
        html: `
            <h3>Detalles de la Compra</h3>
            <ul>
                <li><strong>Nombre:</strong> ${datosPago.nombre} ${datosPago.apellido}</li>
                <li><strong>DNI:</strong> ${datosPago.dni}</li>
                <li><strong>Productos:</strong></li>
                <ul>${resumenProductos}</ul>
                <li><strong>Envío:</strong> ${envioSeleccionado === "delivery" ? "A domicilio ($3500)" : "Retiro por local ($0)"}</li>
                <li><strong>Subtotal:</strong> $${subtotal}</li>
                <li><strong>Total:</strong> $${total}</li>
            </ul>
        `,
        confirmButtonText: 'Aceptar',
        preConfirm: () => {
          
            localStorage.removeItem('productos-en-carrito');
            localStorage.removeItem('datosPago');
            window.location.href = "/index.html";
        }
    });
}


