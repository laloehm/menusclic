import React from 'react'

export default function HorangiMenuDemo({ onBack }) {
  const menu = {
    bebidasFrias: [
      { name: 'Frappé', price: 65, desc: 'Chocolate blanco, Oreo, Moka, Chocolate, Vainilla, Caramelo y Café Xtreme.', icon: 'icecream' },
      { name: 'Smothies', price: 65, desc: 'Fresa, Mora Azul, Mango, Piña Colada y Tizana Frutal.', icon: 'local_bar' },
      { name: 'Cafe Helado', price: 65, desc: 'Avellana, Canela, Moka, Almendra, Caramelo y Coco Vainilla.', icon: 'icecream' },
      { name: 'Soda Italiana', price: 60, desc: 'Manzana Verde, Fresa, Frambuesa, Mango, Cereza y mora azul.', icon: 'local_drink' },
      { name: 'Tizanas', price: 65, desc: 'Fria / Caliente. Fruta De La Pasión y Pasión Relajante.', icon: 'emergency_home' },
    ],
    bebidasCalientes: [
      { name: 'Capuccino', price: 70, icon: 'coffee' },
      { name: 'Americano', price: 40, icon: 'local_cafe' },
      { name: 'Expresso', price: 35, icon: 'coffee_maker' },
      { name: 'Té', price: 40, desc: 'Té de Manzanilla, Té verde, Té de jengibre y Té negro.', icon: 'emergency_home' },
    ],
    paninis: [
      { name: 'Italiano', price: 85, desc: 'Ragu, Peperoni, Queso Mozarella, Aceituna negra y Champiñones.', icon: 'bakery_dining' },
      { name: 'Panela', price: 85, desc: 'Queso Panela Asado, Jamón de Pavo, Lechuga y Manzana Verde.', icon: 'bakery_dining' },
    ],
    sandwiches: [
      { name: 'Club Sándwich', price: 80, desc: 'Queso Suizo, Jamón (Puerco o Pavo) Lechuga y Aguacate.', icon: 'lunch_dining' },
      { name: 'Pechuga De Pollo', price: 80, desc: 'Queso Provolone, Pechuga, Tomate, Lechuga y Pepino.', icon: 'lunch_dining' },
    ],
    postres: [
      { name: 'Galletas', price: 25, icon: 'cookie' },
      { name: 'Donas', price: 30, icon: 'donut_large' },
      { name: 'Rebanada de pastel', price: 60, icon: 'cake' },
      { name: 'Waffles', price: 100, icon: 'grid_view' },
    ]
  }

  return (
    <div className="min-h-screen bg-[#f3e9d8] text-[#2b59c3] font-['Plus_Jakarta_Sans'] pb-20">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-[#f3e9d8]/80 backdrop-blur-md border-b border-[#2b59c3]/10">
        <div className="flex justify-between items-center px-6 py-4 max-w-4xl mx-auto">
          <button onClick={onBack} className="text-[#2b59c3] p-2 hover:bg-[#2b59c3]/5 rounded-full transition-colors flex items-center">
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="text-center">
             <div className="text-[10px] uppercase font-black tracking-widest leading-none">호랑이</div>
             <div className="text-sm font-black uppercase tracking-wider leading-none">Horangi</div>
          </div>
          <div className="w-10"></div>
        </div>
      </nav>

      <main className="pt-24 px-6 md:px-12 max-w-4xl mx-auto">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-12">
           <div className="relative mb-4">
              <span className="material-symbols-outlined text-8xl opacity-20">pets</span>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="material-symbols-outlined text-5xl">local_cafe</span>
              </div>
           </div>
           <div className="text-center">
              <div className="text-xs uppercase font-bold tracking-[0.4em] mb-1">호랑이</div>
              <h1 className="text-2xl font-black uppercase tracking-tighter mb-1">Horangi Cafetería</h1>
              <div className="text-6xl md:text-8xl font-black uppercase tracking-tighter opacity-90 leading-none">Menú</div>
           </div>
        </div>

        {/* Dos columnas para Bebidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          
          {/* Bebidas Frías */}
          <section>
            <h2 className="text-3xl font-black uppercase mb-8 border-b-2 border-[#2b59c3]/20 pb-2">Bebidas Frías</h2>
            <div className="space-y-6">
              {menu.bebidasFrias.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-2xl opacity-80 group-hover:scale-110 transition-transform">{item.icon}</span>
                      <h3 className="text-xl font-extrabold">{item.name}</h3>
                    </div>
                    <span className="text-xl font-black">${item.price}</span>
                  </div>
                  {item.desc && <p className="text-xs font-semibold opacity-70 leading-relaxed ml-9">{item.desc}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* Bebidas Calientes */}
          <section>
            <h2 className="text-3xl font-black uppercase mb-8 border-b-2 border-[#2b59c3]/20 pb-2">Bebidas Calientes</h2>
            <div className="space-y-6">
              {menu.bebidasCalientes.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-2xl opacity-80 group-hover:scale-110 transition-transform">{item.icon}</span>
                      <h3 className="text-xl font-extrabold">{item.name}</h3>
                    </div>
                    <span className="text-xl font-black">${item.price}</span>
                  </div>
                  {item.desc && <p className="text-xs font-semibold opacity-70 leading-relaxed ml-9">{item.desc}</p>}
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Segunda Fila: Comida */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          
          {/* Paninis */}
          <section>
            <div className="flex justify-between items-center mb-8 border-b-2 border-[#2b59c3]/20 pb-2">
               <h2 className="text-3xl font-black uppercase">Paninis</h2>
               <span className="material-symbols-outlined text-3xl">bakery_dining</span>
            </div>
            <div className="space-y-6">
              {menu.paninis.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-extrabold">{item.name}</h3>
                    <span className="text-xl font-black">${item.price}</span>
                  </div>
                  <p className="text-xs font-semibold opacity-70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sándwiches */}
          <section>
            <div className="flex justify-between items-center mb-8 border-b-2 border-[#2b59c3]/20 pb-2">
               <h2 className="text-3xl font-black uppercase">Sándwiches</h2>
               <span className="material-symbols-outlined text-3xl">lunch_dining</span>
            </div>
            <div className="space-y-6">
              {menu.sandwiches.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-extrabold">{item.name}</h3>
                    <span className="text-xl font-black">${item.price}</span>
                  </div>
                  <p className="text-xs font-semibold opacity-70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Tercera Fila: Postres e Ilustración */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          
          {/* Postres */}
          <section>
            <h2 className="text-3xl font-black uppercase mb-8 border-b-2 border-[#2b59c3]/20 pb-2">Postres</h2>
            <div className="space-y-4">
              {menu.postres.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl opacity-60">{item.icon}</span>
                    <h3 className="text-lg font-extrabold">{item.name}</h3>
                  </div>
                  <span className="text-lg font-black">${item.price}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Ilustración Tiger (Simplified) */}
          <div className="relative flex justify-center md:justify-end pb-4">
             <div className="w-48 h-48 border-4 border-[#2b59c3] rounded-[3rem] flex flex-col items-center justify-center p-4 relative overflow-hidden group">
                <span className="material-symbols-outlined text-8xl transform group-hover:scale-110 transition-transform">pets</span>
                <div className="absolute top-2 right-4">
                   <div className="w-2 h-2 bg-[#2b59c3] rounded-full"></div>
                </div>
                <div className="absolute bottom-6 left-8">
                   <div className="w-4 h-4 border-2 border-[#2b59c3] rounded-full"></div>
                </div>
                <div className="absolute top-8 left-4">
                   <span className="material-symbols-outlined text-2xl">star</span>
                </div>
             </div>
          </div>

        </div>

        <footer className="mt-24 text-center border-t border-[#2b59c3]/10 pt-12">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Menusclic · Digital Premium Experience</p>
        </footer>
      </main>
    </div>
  )
}
