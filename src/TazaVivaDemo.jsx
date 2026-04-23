import React from 'react'

export default function TazaVivaDemo({ onBack }) {
  const sections = [
    {
      title: 'Bebidas Calientes',
      icon: 'local_cafe',
      items: [
        { name: 'Espresso Intense', price: 1.50 },
        { name: 'Capuccino Clásico', price: 2.50 },
        { name: 'Té Verde Orgánico', price: 1.80 },
        { name: 'Chocolate Caliente', price: 3.00 },
        { name: 'Latte Vainilla', price: 2.80 },
        { name: 'Moka Blanco', price: 3.20 }
      ]
    },
    {
      title: 'Bebidas Frías',
      icon: 'glass_cup',
      items: [
        { name: 'Café Helado', price: 2.50 },
        { name: 'Limonada Natural', price: 1.50 },
        { name: 'Smoothie de Frutas', price: 3.50 },
        { name: 'Frappuccino', price: 3.00 },
        { name: 'Té Helado de Durazno', price: 2.20 },
        { name: 'Malteada de Oreo', price: 4.00 }
      ]
    },
    {
      title: 'Postres',
      icon: 'cake',
      items: [
        { name: 'Brownie', price: 1.50 },
        { name: 'Cheesecake', price: 2.50 },
        { name: 'Croissant', price: 1.00 },
        { name: 'Muffin de Blueberry', price: 2.00 },
        { name: 'Tarta de Manzana', price: 2.20 },
        { name: 'Galleta con Chips', price: 0.80 }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white text-black font-['Playfair_Display'] pb-20">
      {/* Botón Volver */}
      <button 
        onClick={onBack}
        className="fixed top-6 right-6 z-50 w-10 h-10 border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all rounded-full bg-white/50 backdrop-blur"
      >
        <span className="material-symbols-outlined">close</span>
      </button>

      {/* Header Estilo Boceto */}
      <header className="pt-20 pb-12 px-6 text-center border-b border-black/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10">
           <span className="material-symbols-outlined text-8xl">potted_plant</span>
        </div>
        <div className="absolute top-0 left-0 w-32 h-32 opacity-10 pointer-events-none transform -translate-x-10 -translate-y-10">
           <span className="material-symbols-outlined text-8xl">potted_plant</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-2">LA TAZA VIVA</h1>
        <p className="text-lg italic opacity-70">Coffee & Vibes</p>
        <div className="w-24 h-[1px] bg-black mx-auto mt-6 opacity-30"></div>
      </header>

      <main className="p-8 md:p-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {sections.map((section, idx) => (
            <section key={idx} className={`${idx === sections.length - 1 ? 'md:col-span-2 md:max-w-xl md:mx-auto w-full' : ''}`}>
              <div className="flex items-center gap-6 mb-8 group">
                {idx % 2 === 0 ? (
                  <>
                     <div className="w-32 h-32 border-2 border-black/10 p-4 rounded-3xl flex items-center justify-center bg-zinc-50 grayscale group-hover:bg-white transition-colors duration-500">
                        <span className="material-symbols-outlined text-6xl opacity-30">{section.icon}</span>
                     </div>
                     <div className="bg-black text-white px-6 py-2">
                        <h2 className="text-xl font-black uppercase tracking-widest">{section.title}</h2>
                     </div>
                  </>
                ) : (
                  <>
                     <div className="bg-black text-white px-6 py-2">
                        <h2 className="text-xl font-black uppercase tracking-widest">{section.title}</h2>
                     </div>
                     <div className="w-32 h-32 border-2 border-black/10 p-4 rounded-3xl flex items-center justify-center bg-zinc-50 grayscale group-hover:bg-white transition-colors duration-500">
                        <span className="material-symbols-outlined text-6xl opacity-30">{section.icon}</span>
                     </div>
                  </>
                )}
              </div>

              <div className="border border-black/10 p-6 rounded-sm bg-white shadow-sm hover:shadow-xl transition-shadow duration-500">
                <div className="space-y-4">
                  {section.items.map((item, idy) => (
                    <div key={idy} className="flex justify-between items-baseline group/item">
                      <h3 className="text-lg font-bold border-b border-transparent group-hover/item:border-black transition-all">{item.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-32 flex justify-center gap-8 opacity-20 hover:opacity-60 transition-opacity duration-700">
           <span className="material-symbols-outlined">chat_bubble</span>
           <span className="material-symbols-outlined">image</span>
           <span className="material-symbols-outlined">movie</span>
           <span className="material-symbols-outlined">share</span>
        </footer>
      </main>
    </div>
  )
}
