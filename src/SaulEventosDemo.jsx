import React from 'react'

export default function SaulEventosDemo({ onBack }) {
  const desayunos = [
    { 
      name: 'HUEVOS REVUELTOS CON SALMÓN AHUMADO', 
      price: 89, 
      desc: 'Al estilo escandinavo, rodajas de salmón ahumado sobre huevos revueltos montados en panecillos crocantes con queso crema.',
      isFeatured: true
    },
    { 
      name: 'CROCANTES VERDES', 
      price: 85, 
      desc: '2 tostadas de maíz con pollo en salsa cremosa verde con un toque picante, gratinados con mozzarella y coronadas con huevos estrellados.' 
    },
    { 
      name: 'LA OMELETTE SAÚL', 
      price: 79, 
      desc: 'Omelette con queso Gruyère derretido, tocino, pimientos y hierbas aromáticas, acompañado de frijoles o papitas al romero.' 
    },
    { 
      name: 'LA OMELETTE HASS', 
      price: 75, 
      desc: 'Con queso Feta, aguacate y pimientos. Acompañado de frijoles o papas en mantequilla al romero.' 
    },
    { 
      name: 'LA OMELETTE FALAFEL', 
      price: 79, 
      desc: 'Tierna omelette rellena de yogur griego, tahini, verduras asadas y falafel.' 
    },
    { 
      name: 'GUATEMALTECO EN PARÍS', 
      price: 75, 
      desc: 'Un huevo estrellado sobre nuestra famosa Crépe Saúl, rellena de frijoles negros volteados, queso mozzarella y salsa Miltom.' 
    }
  ]

  const photos = [
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-149485981460c-38af4a0-53bc1?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=400'
  ]

  return (
    <div className="min-h-screen bg-white text-black font-serif pb-20">
      {/* Botón Volver */}
      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-50 w-10 h-10 border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all rounded-full bg-white/80 backdrop-blur"
      >
        <span className="material-symbols-outlined">close</span>
      </button>

      <header className="px-8 py-12 flex justify-between items-end border-b border-black/10">
        <h1 className="text-5xl font-black uppercase tracking-tighter">Menú</h1>
        <div className="text-right">
           <div className="text-2xl font-black tracking-tight leading-none mb-1 italic">Saúl</div>
           <div className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Eventos</div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Lado Izquierdo: Lista */}
        <div className="flex-1 p-8 md:p-16 border-r border-black/10">
          <div className="max-w-xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-4 italic">Desayunos</h2>
            <div className="text-center text-2xl mb-12">*</div>

            <div className="space-y-12">
              {desayunos.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline gap-4 mb-2">
                    <h3 className="text-xl font-black uppercase tracking-wide leading-tight flex-1">{item.name}</h3>
                    <span className="text-lg font-bold opacity-60">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm italic opacity-70 leading-relaxed font-sans">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-20 pt-10 border-t-2 border-black/20 text-center">
               <div className="text-xs font-bold uppercase tracking-[0.3em] text-red-500 mb-6">TODOS NUESTROS DESAYUNOS INCLUYEN</div>
               <div className="space-y-1 text-lg font-black italic">
                 <p>JUGO DE NARANJA</p>
                 <p>+ CAFÉ O TÉ</p>
                 <p>+ PANITOS DULCES TOSTADOS</p>
                 <p>+ CREPE PETITE DE MIEL</p>
                 <p>ORGÁNICA DE ABEJAS.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Imágenes */}
        <div className="lg:w-[45%] flex flex-col">
          <img src={photos[0]} alt="Featured" className="w-full h-[50vh] object-cover border-b border-black/10" />
          <div className="grid grid-cols-2 flex-1">
            <img src={photos[1]} alt="Gallery 1" className="w-full h-full object-cover border-r border-black/10" />
            <img src={photos[2]} alt="Gallery 2" className="w-full h-full object-cover" />
          </div>
          <div className="p-12 bg-black text-white text-center">
             <div className="text-sm font-bold uppercase tracking-[0.3em] mb-4">Reserva tu evento</div>
             <p className="text-xs opacity-60 font-sans tracking-wide">Tel: 2268-0123 / 5542-4786 // eventos.saul@saulmendez.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
