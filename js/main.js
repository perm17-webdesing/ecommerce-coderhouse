
// ----------PRODUCTOS
const productos = [
    {
        id: "combo01",
        nombre: "Combo Full",
        precio: 12500,
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at tincidunt arcu. Ut quis dolor leo. Sed id malesuada massa. Suspendisse aliquet faucibus commodo.",
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
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at tincidunt arcu. Ut quis dolor leo. Sed id malesuada massa. Suspendisse aliquet faucibus commodo.",
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
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at tincidunt arcu. Ut quis dolor leo. Sed id malesuada massa. Suspendisse aliquet faucibus commodo.",
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
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at tincidunt arcu. Ut quis dolor leo. Sed id malesuada massa. Suspendisse aliquet faucibus commodo.",
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
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at tincidunt arcu. Ut quis dolor leo. Sed id malesuada massa. Suspendisse aliquet faucibus commodo.",
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
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at tincidunt arcu. Ut quis dolor leo. Sed id malesuada massa. Suspendisse aliquet faucibus commodo.",
        imagenDestacada: "",
        categoria: {
            id: "para-tomar",
            nombreCategoria: "Para Tomar"
        }
    },

]

const gridProductos = document.querySelector("#grilla-productos");

function cargarProductos() {
    productos.forEach(producto => {
        let div = document.createElement("div");
        div = classList.add("producto");
        div.innerHTML = `
            <div class="producto-img">
                <div class="img-destacada-producto">
                    <img src="${productos.imagenDestacada}" alt="${productos.nombre}">
                </div>
            </div>
            <div class="titulo-producto">${productos.nombre}</div>
            <div class="subtitulo-producto">${productos.descripcion}</div>
            <hr class="divisor-producto">
            <div class="footer-producto">
            <div class="precio-producto"><span>$</span> ${productos.precio}</div>
            <button class="btn-agregar-al-carrito" id="${productos.id}">
            agregar al carrito
            </button>
            </div>
        
        `;
        gridProductos.append(div);

    })
}

cargarProductos();
alert("Este es un mensaje de alerta.");
// 
