import { useState, useEffect } from "react";
import SidebarCategorias from "../components/SidebarCategorias";
import BarraOrdenamiento from "../components/BarraOrdenamiento";
import ProductoCard from "../components/ProductoCard";
import styles from "../styles/Catalogo.module.css";

export default function Catalogo() {
  // 1. Estados para almacenar los datos de MongoDB y la pantalla de carga
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [categoria, setCategoria] = useState("todo");
  const [orden, setOrden] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // 2. Petición al backend al montar el componente
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;
        const respuesta = await fetch(`${url}/products`);
        const data = await respuesta.json();

        // Guardamos el array que llega del backend
        setProductos(data.products);
      } catch (error) {
        console.error("Error al conectar con el backend:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  // CERRAR ASIDE MOBILE AL CLICKEAR FUERA
  useEffect(() => {
    const handleClickFuera = (e) => {
      if (
        mobileOpen &&
        !e.target.closest(`.${styles.asideMobile}`) &&
        !e.target.closest(`.${styles.btnAbrirMobile}`)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("click", handleClickFuera);
    return () => document.removeEventListener("click", handleClickFuera);
  }, [mobileOpen]);

  // FILTRO POR CATEGORÍA (Ahora filtra el estado nuevo)
  const productosFiltrados = productos.filter(
    (prod) => categoria === "todo" || prod.categoria.includes(categoria),
  );

  // ORDEN POR PRECIO
  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    if (orden === "menor") return a.precio - b.precio;
    if (orden === "mayor") return b.precio - a.precio;
    return 0;
  });

  // 3. Renderizado de espera para evitar errores antes de que llegue la data
  if (cargando) {
    return (
      <div className={styles.layout}>
        <h2
          style={{ margin: "auto", gridColumn: "1 / -1", textAlign: "center" }}
        >
          Cargando catálogo...
        </h2>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      {/* ASIDE DESKTOP */}
      <aside className={styles.asideDesktop}>
        <SidebarCategorias categoria={categoria} setCategoria={setCategoria} />
      </aside>

      {/* BOTÓN MOBILE */}
      <button
        className={styles.btnAbrirMobile}
        onClick={() => setMobileOpen(true)}
      >
        Categorías
      </button>

      {/* ASIDE MOBILE */}
      <div
        className={`${styles.overlayMobile} ${
          mobileOpen ? styles.overlayVisible : ""
        }`}
      >
        <div
          className={`${styles.asideMobile} ${
            mobileOpen ? styles.asideVisible : ""
          }`}
        >
          <button
            className={styles.btnCerrar}
            onClick={() => setMobileOpen(false)}
          >
            X
          </button>

          <SidebarCategorias
            categoria={categoria}
            setCategoria={(cat) => {
              setCategoria(cat);
              setMobileOpen(false);
            }}
          />
        </div>
      </div>

      {/* CONTENIDO */}
      <main className={styles.contenido}>
        <div className={styles.barraSuperior}>
          <h2 className={styles.nombreCategoria}>
            {categoria === "todo"
              ? "Todos los productos"
              : categoria.charAt(0).toUpperCase() + categoria.slice(1)}
          </h2>
          <BarraOrdenamiento setOrden={setOrden} />
        </div>

        <div className={styles.grid}>
          {productosOrdenados.map((prod) => (
            // 4. CAMBIO CLAVE: Usamos prod._id en lugar de prod.id
            <ProductoCard key={prod._id} producto={prod} />
          ))}
        </div>
      </main>
    </div>
  );
}
