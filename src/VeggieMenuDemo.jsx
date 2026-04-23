import React from 'react'

export default function VeggieMenuDemo({ onBack }) {
  const items = [
    { name: 'Crema de tomate', desc: 'Sopa cremosa con albahaca fresca y crutones.', price: 50, img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=300' },
    { name: 'Crema de Ahuyama', desc: 'Dulce toque de calabaza ahumada con pepitas.', price: 80, img: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&q=80&w=300' },
    { name: 'Sopa de lentejas', desc: 'Receta tradicional con vegetales de temporada.', price: 90, img: 'https://images.unsplash.com/photo-1603048297172-c9254479895a?auto=format&fit=crop&q=80&w=300' },
    { name: 'Ensalada La Frida', desc: 'Mix de lechugas, aguacate, fresas y nuez caramelizada.', price: 100, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300' },
    { name: 'Ensalada Borcelle', desc: 'Quinoa, garbanzos, pepino y aderezo cítrico.', price: 120, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300' },
  ]

  return (
    <div className="min-h-screen bg-[#d9c99e] flex font-['Plus_Jakarta_Sans']">
      {/* Botón Volver */}
      <button 
        onClick={onBack}
        className="fixed top-6 right-6 z-50 w-10 h-10 bg-[#173e21] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <span className="material-symbols-outlined">close</span>
      </button>

      {/* Franja Izquierda Vertical */}
      <div className="w-24 md:w-32 bg-[#173e21] flex flex-col items-center py-12 relative overflow-hidden shrink-0">
        <div className="w-16 h-16 bg-[#d9c99e] rounded-full flex items-center justify-center mb-12">
          <span className="material-symbols-outlined text-[#173e21] text-3xl">eco</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-black text-[#d9c99e] transform -rotate-180 uppercase tracking-widest whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
            MENÚ VEGGIE
          </h1>
        </div>
        <div className="mt-12 text-[#d9c99e]/40 text-[10px] uppercase font-bold tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>
          @sitioincreible
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 p-8 md:p-16 max-w-3xl overflow-y-auto">
        <div className="space-y-12">
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-6 items-center group">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#173e21] mb-2 uppercase">{item.name}</h2>
                <p className="text-sm text-[#173e21]/70 font-medium mb-4">{item.desc}</p>
                <div className="bg-[#173e21] text-[#d9c99e] px-8 py-1 inline-block font-black text-xl">
                  ${item.price}
                </div>
              </div>
              <div className="w-24 h-24 md:w-32 md:h-32 border-4 border-[#173e21] rounded-full overflow-hidden shrink-0 shadow-xl group-hover:scale-105 transition-transform duration-500">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}

          {/* Banner Promo */}
          <div className="bg-[#5c7255] p-6 rounded-2xl flex items-center gap-6 text-white shadow-2xl relative overflow-hidden mt-16">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border-2 border-white/20">
              <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-[0.3em] mb-1">Promo del día</div>
              <h3 className="text-3xl font-black uppercase mb-1 leading-none">martes 2x1</h3>
              <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest leading-none">De 8:00 a.m. a 3:00 p.m.</p>
              <div className="mt-2 text-xs font-black bg-white/20 px-3 py-1 inline-block rounded-full">
                (55) 1234 - 5678
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-20 pt-8 border-t border-[#173e21]/10">
          <p className="text-xs font-bold text-[#173e21]/40 uppercase tracking-widest">
            Calle cualquiera 123, cualquier lugar
          </p>
        </footer>
      </div>
    </div>
  )
}
