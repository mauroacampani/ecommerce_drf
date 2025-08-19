import { Link } from "react-router-dom";

export default function Banner() {
    return (
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden  shadow-lg">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16 lg:py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          ¡Bienvenido a <span className="text-gray-700">Tech</span><span className="text-yellow-400">Store</span>!
        </h1>
        
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          Los mejores productos de informática con ofertas exclusivas 🔥
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            to={"/shop"}
            className="px-6 py-3 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition"
          >
            Comprar ahora
          </Link>
          <Link
            to={"/compare_price"}
            className="px-6 py-3 rounded-xl border border-white text-white font-semibold hover:bg-white hover:text-indigo-700 transition"
          >
            Ver ofertas
          </Link>
        </div>
      </div>
    </div>
    )
  }
  