import React, { useState, useEffect } from 'react'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from './firebase';
import { proxy } from './utils/proxy';

export default function RestaurantDemo({ onBack, onAdmin }) {
  const [activeCategory, setActiveCategory] = useState('desayunos')

  const categories = [
    { id: 'desayunos', label: 'Desayunos', icon: 'sunny' },
    { id: 'entradas', label: 'Entradas', icon: 'restaurant_menu' },
    { id: 'comidas', label: 'Comidas', icon: 'lunch_dining' },
    { id: 'cenas', label: 'Cenas', icon: 'dinner_dining' },
    { id: 'postres', label: 'Postres', icon: 'icecream' },
    { id: 'bebidas', label: 'Bebidas', icon: 'local_bar' }
  ]

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "restaurant_items"), (snapshot) => {
      const itemsData = snapshot.docs.map(doc => doc.data());
      itemsData.sort((a,b) => a.id - b.id);
      setItems(itemsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching restaurant items:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredItems = items.filter(item => item.category === activeCategory && item.available !== false)

  return (
    <div className="bg-[#fbfbe2] font-body text-[#1b1d0e] min-h-screen antialiased flex justify-center">
      <div className="w-full max-w-[700px] bg-[#fbfbe2] relative shadow-2xl min-h-screen">
        {/* Header */}
        <header className="fixed top-0 max-w-[700px] w-full z-50 bg-[#fbfbe2]/90 backdrop-blur-md px-6 h-16 flex items-center justify-between border-b border-[#ddc0ba]/30 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-1 hover:bg-[#ddc0ba]/20 rounded-full transition-colors text-[#795c51]"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="font-headline text-xl font-bold tracking-tight text-[#1b1d0e]">Terracotta Brew</h1>
          </div>
        </header>

        <main className="pt-16 pb-0">
          {/* Hero */}
          <section className="relative h-[300px] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#fbfbe2] via-transparent to-transparent z-10"></div>
            <img 
              alt="Gourmet Experience" 
              className="w-full h-full object-cover" 
              src={proxy('https://images.unsplash.com/photo-1568901346375-23c9450c58cd')} 
            />
            <div className="absolute bottom-8 left-6 z-20">
              <span className="inline-block bg-[#9f402d] text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-2">Alta Cocina</span>
              <h2 className="text-4xl font-headline font-bold text-[#1b1d0e] leading-tight">Experiencia <br />Gastronómica</h2>
            </div>
          </section>

          {/* Categories */}
          <section className="py-8 px-6 sticky top-16 z-40 bg-[#fbfbe2]/95 backdrop-blur-sm shadow-sm flex overflow-x-auto gap-3 hide-scrollbar border-b border-[#ddc0ba]/20">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all text-xs font-bold font-label tracking-wide border ${
                  activeCategory === cat.id
                  ? 'bg-[#9f402d] text-white border-[#9f402d] shadow-md shadow-[#9f402d]/20'
                  : 'bg-white text-[#795c51] border-[#ddc0ba]/40 hover:border-[#9f402d]/50'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </section>

          {/* Menu Items */}
          <section className="px-6 py-10 space-y-8 min-h-[400px]">
            {loading ? (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 border-4 border-[#ddc0ba] border-t-[#9f402d] rounded-full animate-spin"></div>
                <p className="text-[#56423e] font-bold tracking-widest text-xs uppercase animate-pulse">Cargando Menú...</p>
              </div>
            ) : filteredItems.length > 0 ? filteredItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-start group">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-[#ddc0ba]/20 transition-transform group-hover:scale-105 duration-300">
                  <img alt={item.title} className="w-full h-full object-cover" src={proxy(item.img)} />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline font-bold text-base text-[#1b1d0e] leading-tight">{item.title}</h3>
                    <p className="text-xs text-[#56423e] mt-1 line-clamp-2">{item.desc}</p>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="font-headline font-bold text-[#9f402d]">${item.price}</span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="py-20 text-center text-[#56423e]">No hay platos en esta categoría todavía.</div>
            )}
          </section>

          {/* Footer */}
          <footer className="mt-12 text-center">
            <div className="bg-[#ddc0ba]/10 p-12 border-t border-[#ddc0ba]/30">
              <h4 className="font-headline text-2xl font-bold text-[#1b1d0e] tracking-tight mb-4 uppercase">Terracotta Brew</h4>
              <p className="text-[#56423e] text-sm mb-8 px-4 italic">Descubre el arte del sabor perfecto.</p>
              <div className="flex justify-center gap-6 mb-10">
                <SocialLink icon="chat" />
                <SocialLink icon="share" />
                <SocialLink icon="location_on" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9f402d] pb-4 flex justify-center items-center gap-4">
                <span>© 2024 Bistro Experience • Maestría Culinaria</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}

function SocialLink({ icon }) {
  return (
    <a className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-[#9f402d] hover:scale-110 transition-transform" href="#">
      <span className="material-symbols-outlined">{icon}</span>
    </a>
  )
}
