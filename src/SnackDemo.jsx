import React, { useState, useEffect } from 'react'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from './firebase';
import { proxy } from './utils/proxy';

export default function SnackDemo({ onBack, onAdmin }) {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "snack_items"), (snapshot) => {
      const itemsData = snapshot.docs.map(doc => doc.data());
      itemsData.sort((a,b) => a.id - b.id);
      setItems(itemsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching snack items:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
              <span className="material-symbols-outlined">close</span>
            </button>
            <h1 className="font-headline text-xl font-bold tracking-tight text-[#ff4b2b]">Snack Attack</h1>
          </div>
        </header>

        <main className="pt-16 pb-0">
          {/* Hero Section */}
          <section className="relative h-[250px] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#fbfbe2] via-transparent to-transparent z-10"></div>
            <img 
              alt="Snack Experience" 
              className="w-full h-full object-cover" 
              src={proxy('https://images.unsplash.com/photo-1544148103-0773bf10d330')} 
            />
            <div className="absolute bottom-6 left-6 z-20">
              <span className="inline-block bg-[#ff4b2b] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mb-1 shadow-lg shadow-red-500/30">Premium Snacks</span>
              <h2 className="text-3xl font-headline font-bold text-[#1b1d0e] leading-tight text-shadow-sm">Sabor Intenso <br />en Cada Bocado</h2>
            </div>
          </section>

          {/* Single List of Items */}
          <section className="px-6 py-8 space-y-6 min-h-[400px]">
            {loading ? (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 border-4 border-[#ddc0ba] border-t-[#ff4b2b] rounded-full animate-spin"></div>
                <p className="text-[#56423e] font-bold tracking-widest text-xs uppercase animate-pulse">Preparando Snacks...</p>
              </div>
            ) : items.filter(i => i.available !== false).map((item) => (
              <div key={item.id} className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-[#ddc0ba]/20 hover:border-[#ff4b2b]/30 transition-all group shadow-sm">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-sm transition-transform group-hover:scale-105 duration-300">
                  <img alt={item.title} className="w-full h-full object-cover" src={proxy(item.img)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-headline font-bold text-[#1b1d0e] group-hover:text-[#ff4b2b] transition-colors truncate">{item.title}</h3>
                    {item.tag && (
                      <span className="px-1.5 py-0.5 bg-red-100 text-[#ff4b2b] text-[8px] font-bold uppercase rounded leading-none">{item.tag}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#56423e] line-clamp-2 leading-relaxed">{item.desc}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-headline font-bold text-[#ff4b2b]">${item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Footer Simple */}
          <footer className="mt-12 text-center text-center">
            <div className="bg-[#ddc0ba]/10 p-12 border-t border-[#ddc0ba]/30">
              <h4 className="font-headline text-2xl font-black text-[#1b1d0e] tracking-tighter mb-4 uppercase italic">Snack Attack</h4>
              <p className="text-[#56423e] text-sm mb-8 italic">El antojo que no puede esperar.</p>
              
              <div className="flex justify-center gap-6 mb-10">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-[#ff4b2b] hover:scale-110 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-[#ff4b2b] hover:scale-110 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined">share</span>
                </div>
              </div>

              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff4b2b]/60 pb-4 flex justify-center items-center gap-4">
                <span>© 2024 Snack Attack • Calidad & Sabor</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
