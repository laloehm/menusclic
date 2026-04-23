import React from 'react'

export default function SanRemoDemo({ onBack }) {
  const cocktails = [
    { name: 'Margarita Clásica', desc: 'Tequila reposado, jugo de limón fresco,\ntriple sec, sal de gusano', icon: '🍹' },
    { name: 'Mezcal Negroni', desc: 'Mezcal artesanal, campari, vermut rojo,\ntoque de naranja', icon: '🌵' },
    { name: 'Paloma Rosa', desc: 'Tequila blanco, toronja rosada,\nsoda premium, sal rosa', icon: '🍸' },
    { name: 'Michelada Luxe', desc: 'Cerveza, clamato, salsa inglesa,\nchamoy, limón, morita', icon: '⭐' },
    { name: 'Espresso Mezcal', desc: 'Mezcal, licor de café, espresso,\nazúcar de piloncillo', icon: '🌟' },
    { name: 'Bloody María', desc: 'Vodka, jugo de tomate, apio,\nsalsa picante (12-3pm only)', icon: '🥃' },
  ]

  return (
    <div className="min-h-screen bg-[#f5ede0] text-[#0057b8] font-['Barlow_Condensed'] py-10 px-4 flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full max-w-[680px] mb-4">
         <button onClick={onBack} className="text-[#0057b8] p-2 hover:bg-[#0057b8]/5 rounded-full transition-colors flex items-center shadow-sm">
            <span className="material-symbols-outlined">close</span>
          </button>
      </div>

      <div className="menu-card bg-[#f5ede0] border-[4px] border-[#0057b8] max-w-[680px] w-full p-9 shadow-[8px_8px_0px_#0057b8] animate-slide-up relative">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up { animation: slide-up .5s ease both; }
        `}} />

        {/* CABECERA */}
        <h1 className="font-['Anton'] text-7xl md:text-9xl text-center leading-none tracking-wider uppercase">San Remo</h1>
        <div className="flex justify-center items-center gap-2 md:gap-3 my-4">
          <div className="w-2 h-2 bg-[#0057b8] rounded-full"></div>
          <span className="font-extrabold text-xl md:text-3xl uppercase tracking-widest">House</span>
          <div className="w-2 h-2 bg-[#0057b8] rounded-full"></div>
          <span className="font-extrabold text-xl md:text-3xl uppercase tracking-widest">Drinks</span>
          <div className="w-2 h-2 bg-[#0057b8] rounded-full"></div>
          <span className="font-extrabold text-xl md:text-3xl uppercase tracking-widest">Menu</span>
          <div className="w-2 h-2 bg-[#0057b8] rounded-full"></div>
        </div>
        <hr className="border-none border-t-[3px] border-[#0057b8] my-2" />

        {/* ENCABEZADO COCKTAILS */}
        <div className="flex items-center gap-3 my-4">
          <span className="font-['Anton'] text-3xl uppercase tracking-widest">Cocktails</span>
          <div className="bg-[#0057b8] text-[#f5ede0] font-['Anton'] text-xl rounded-full w-10 h-10 flex items-center justify-center">ALL</div>
          <span className="font-['Anton'] text-4xl ml-auto">$130</span>
        </div>

        {/* GRID DE CÓCTELES */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3px_1fr] gap-0 md:gap-x-4">
          {/* Col 1 */}
          <div className="space-y-4">
            {cocktails.slice(0, 3).map((item, idx) => (
              <DrinkItem key={idx} {...item} />
            ))}
          </div>

          {/* Divisor Vertical */}
          <div className="hidden md:block bg-[#0057b8] h-full mx-2"></div>

          {/* Col 2 */}
          <div className="space-y-4">
            {cocktails.slice(3).map((item, idx) => (
              <DrinkItem key={idx} {...item} />
            ))}
          </div>
        </div>

        {/* SECCIÓN SHOT */}
        <div className="border-y-[3px] border-[#0057b8] my-6 py-3 flex items-center gap-4">
          <div className="flex-1">
            <h3 className="font-['Anton'] text-2xl md:text-4xl uppercase tracking-wider">Flor de Cactus</h3>
          </div>
          <div className="[writing-mode:vertical-rl] rotate-180 font-['Anton'] text-sm tracking-[0.2em] border-x-2 border-[#0057b8] px-2 py-1">SHOT</div>
          <div className="flex-[2] font-semibold text-sm uppercase tracking-wide leading-tight">
            Tequila El Jimador, jarabe de hibisco<br />
            <em className="text-[10px] opacity-70">Salsa picante opcional</em>
          </div>
          <div className="font-['Anton'] text-3xl">$59</div>
        </div>

        {/* EXTRAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-4">
          <ExtraItem name="Vodka Redbull / Spirit & Mixer" prices={[{s:'Sgl', v:'90'}, {s:'Dbl', v:'120'}]} />
          <ExtraItem name="Tropical Rumbull" prices={[{s:'Sgl', v:'90'}, {s:'Dbl', v:'120'}]} />
          <ExtraItem name="Brothers Cider" prices={[{s:'Half', v:'50'}, {s:'Pint', v:'67'}]} />
          <ExtraItem name="Vino" note="Tinto / Blanco / Rosé 175ml" prices={[{v:'75'}]} />
          <ExtraItem name="Corona / Victoria" prices={[{s:'Half', v:'50'}, {s:'Pint', v:'70'}]} />
          <ExtraItem name="Energéticas / Agua" prices={[{v:'30'}]} />
        </div>

        <div className="mt-8 text-center font-bold text-xs uppercase tracking-[0.3em] opacity-60">
          Menusclic · Tu menú digital · menusclic.com
        </div>
      </div>
    </div>
  )
}

function DrinkItem({ name, desc, icon }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-transparent hover:bg-[#0057b8]/5 transition-colors group">
      <div className="flex-1">
        <h4 className="font-extrabold text-xl md:text-2xl uppercase tracking-wider leading-none mb-1">{name}</h4>
        <p className="text-xs font-medium uppercase tracking-[0.05em] leading-tight opacity-80 whitespace-pre-line">{desc}</p>
      </div>
      <span className="text-3xl ml-2 opacity-80 filter grayscale sepia brightness-50">{icon}</span>
    </div>
  )
}

function ExtraItem({ name, note, prices }) {
  return (
    <div className="py-2 border-b border-[#0057b8]/20">
      <div className="font-['Anton'] text-lg uppercase tracking-wider flex flex-wrap items-baseline gap-2">
        {name}
        {note && <span className="font-['Barlow_Condensed'] font-semibold text-[10px] opacity-60 tracking-normal">{note}</span>}
      </div>
      <div className="flex gap-4 mt-1">
        {prices.map((p, i) => (
          <div key={i} className="flex items-baseline gap-1 font-bold text-sm uppercase">
            {p.s && <span className="text-[10px] opacity-60">{p.s}</span>}
            <span className="text-lg">${p.v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
