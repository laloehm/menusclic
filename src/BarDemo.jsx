import React, { useState, useEffect } from 'react'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from './firebase';

export default function BarDemo({ onBack, onAdmin }) {
  const proxy = (url) => {
    if (url.includes('unsplash.com')) {
      return `${url}?auto=format&fit=crop&w=1000&q=80`;
    }
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=1000&fit=cover`;
  }
  const [activeTab, setActiveTab] = useState('cervezas')
  const [featuredItems, setFeaturedItems] = useState([]);
  const [tequilas, setTequilas] = useState([]);
  const [whisky, setWhisky] = useState([]);
  const [cervezas, setCervezas] = useState([]);
  const [sinAlcohol, setSinAlcohol] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bar_items"), snap => {
      const itemsData = snap.docs.map(doc => doc.data()).filter(i => i.available !== false);
      itemsData.sort((a,b) => a.id - b.id);
      
      setFeaturedItems(itemsData.filter(i => i.category === 'destacados'));
      setTequilas(itemsData.filter(i => i.category === 'tequilas'));
      setWhisky(itemsData.filter(i => i.category === 'whisky'));
      setRon(itemsData.filter(i => i.category === 'ron'));
      setCervezas(itemsData.filter(i => i.category === 'cervezas'));
      setSinAlcohol(itemsData.filter(i => i.category === 'sin-alcohol'));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="font-['Inter'] selection:bg-[#A5D0B9]/30 bg-[#0D0F0E] text-[#F3F4F1] min-h-screen antialiased flex justify-center">
      <div className="w-full max-w-[700px] bg-[#0D0F0E] relative shadow-[0_0_50px_rgba(0,0,0,0.5)] min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 max-w-[700px] w-full z-50 bg-[#0D0F0E]/80 backdrop-blur-xl border-b border-[#1B4332]/20">
          <div className="flex justify-between items-center w-full px-6 py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="text-[#A5D0B9] hover:bg-[#1B4332]/30 transition-colors duration-300 p-2 rounded-lg active:scale-95 ease-in-out flex items-center"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <span className="text-xl font-extrabold tracking-tighter text-[#E9C176] uppercase font-['Plus_Jakarta_Sans']">The Reserve</span>
            </div>
            <button className="text-[#A5D0B9] hover:bg-[#1B4332]/30 transition-colors duration-300 p-2 rounded-lg active:scale-95 ease-in-out">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </nav>

        <main className="pt-16 pb-0">
          {/* Banner */}
          <section className="relative h-[380px] flex items-end px-6 pb-8 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                alt="Selección de Autor" 
                className="w-full h-full object-cover grayscale-[10%] brightness-90" 
                src={proxy("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b")} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F0E] via-[#0D0F0E]/40 to-transparent"></div>
            </div>
            <div className="relative z-10 bg-[#121413]/60 backdrop-blur-md p-6 rounded-xl border border-[#1B4332]/30 w-full shadow-2xl">
              <h1 className="font-['Plus_Jakarta_Sans'] text-3xl font-extrabold text-[#F3F4F1] tracking-tight leading-tight mb-1">
                Cócteles y <br /><span className="text-[#E9C176]">Destilados</span>
              </h1>
              <p className="text-[#A5D0B9]/60 text-[10px] font-medium tracking-widest uppercase">Excelencia Curada desde 1924</p>
            </div>
          </section>

          {/* Featured Section */}
          <section className="mt-8 min-h-[300px]">
            <div className="px-6 flex items-center justify-between mb-4">
              <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#A5D0B9]">Cócteles Clásicos</h2>
              <span className="text-[10px] text-[#A5D0B9]/40 uppercase tracking-widest">Desliza para explorar</span>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-44">
                <div className="w-8 h-8 border-4 border-[#1B4332]/30 border-t-[#E9C176] rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 px-6 pb-4">
                {featuredItems.map((item, idx) => (
                  <div key={idx} className="flex-none w-64 snap-start group">
                    <div className="bg-[#121413] rounded-xl overflow-hidden flex flex-col border border-[#1B4332]/20 h-full shadow-xl">
                      <div className="h-44 relative overflow-hidden">
                        <img alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={proxy(item.img)} />
                        {item.badge && (
                          <div className="absolute top-2 right-2">
                            <span className="bg-[#0D0F0E]/80 backdrop-blur-md text-[#E9C176] text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border border-[#E9C176]/20">
                              {item.badge}
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0D0F0E]/90 to-transparent">
                          <div className="flex justify-between items-center">
                            <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#F3F4F1]">{item.title}</h3>
                            <span className="text-[#E9C176] font-bold text-sm">${item.price}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <p className="text-[#A5D0B9]/60 text-xs leading-relaxed mb-1 line-clamp-2">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Dynamic Menu Tabs */}
          <section className="mt-8 px-6">
            <div className="relative">
              <div className="flex border-b border-[#1B4332]/20 mb-6 overflow-x-auto hide-scrollbar gap-6">
                {[
                  { id: 'cervezas', label: 'Cervezas' },
                  { id: 'tequilas', label: 'Tequilas' },
                  { id: 'whisky', label: 'Whisky' },
                  { id: 'ron', label: 'Ron' },
                  { id: 'sin-alcohol', label: 'Sin Alcohol' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-1 transition-all text-[10px] font-bold uppercase tracking-widest border-b-2 whitespace-nowrap ${
                      activeTab === tab.id 
                      ? 'border-[#E9C176] text-[#E9C176]' 
                      : 'border-transparent text-[#A5D0B9]/40'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="space-y-4">
                {activeTab === 'cervezas' && (
                  <div className="bg-[#121413] rounded-xl border border-[#1B4332]/20 divide-y divide-[#1B4332]/10">
                    {cervezas.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 group hover:bg-[#1B4332]/5 transition-colors">
                        <div>
                          <p className="font-bold text-[#F3F4F1] text-sm">{item.name || item.title}</p>
                          <p className="text-[#A5D0B9]/40 text-[10px] uppercase tracking-widest font-medium">{item.desc || item.origin}</p>
                        </div>
                        <p className="font-['Plus_Jakarta_Sans'] font-bold text-[#E9C176] text-sm">${item.price}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {['tequilas', 'whisky', 'ron'].includes(activeTab) && (
                  <div className="bg-[#121413] rounded-xl border border-[#1B4332]/20 overflow-hidden shadow-lg min-h-[150px]">
                    <div className="grid grid-cols-3 bg-[#E9C176]/5 p-3 border-b border-[#1B4332]/20">
                      <span className="text-[9px] uppercase font-bold text-[#A5D0B9]/50 tracking-widest col-span-1">Etiqueta</span>
                      <span className="text-[9px] uppercase font-bold text-[#E9C176] tracking-widest text-center">Copa</span>
                      <span className="text-[9px] uppercase font-bold text-[#E9C176] tracking-widest text-center">Botella</span>
                    </div>
                    {loading ? (
                      <div className="flex justify-center items-center py-10">
                        <div className="w-6 h-6 border-2 border-[#1B4332]/30 border-t-[#E9C176] rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <div className="divide-y divide-[#1B4332]/10">
                        {(activeTab === 'tequilas' ? tequilas : activeTab === 'whisky' ? whisky : ron).map((item, idx) => (
                          <div key={idx} className="grid grid-cols-3 p-4 items-center hover:bg-[#1B4332]/5 transition-colors">
                            <p className="font-bold text-[#F3F4F1] text-xs leading-tight">{item.name}</p>
                            <p className="font-['Plus_Jakarta_Sans'] font-bold text-[#F3F4F1] text-center text-xs">${item.cup}</p>
                            <p className="font-['Plus_Jakarta_Sans'] font-bold text-[#E9C176] text-center text-xs">${item.bottle}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'sin-alcohol' && (
                  <div className="bg-[#121413] rounded-xl border border-[#1B4332]/20 divide-y divide-[#1B4332]/10">
                    {sinAlcohol.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 hover:bg-[#1B4332]/5 transition-colors">
                        <div>
                          <p className="font-bold text-[#F3F4F1] text-sm">{item.name || item.title}</p>
                          <p className="text-[#A5D0B9]/40 text-[10px] uppercase tracking-widest font-medium">{item.desc}</p>
                        </div>
                        <span className="font-bold text-[#E9C176]">${item.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-20 px-6 pt-12 pb-16 bg-[#121413] border-t border-[#1B4332]/30 w-full">
            <div className="flex flex-col items-center text-center">
              <span className="text-2xl font-extrabold tracking-tighter text-[#E9C176] uppercase font-['Plus_Jakarta_Sans'] mb-4">The Reserve</span>
              <p className="text-[#A5D0B9]/60 text-sm mb-8 max-w-xs">Elevando el arte de servir, un invitado a la vez.</p>
              <div className="flex gap-6 mb-10">
                <SocialLink icon="chat" />
                <SocialLink icon="share" />
                <SocialLink icon="location_on" />
              </div>
              <div className="flex flex-col gap-2 pb-8 items-center">
                <p className="text-[10px] uppercase tracking-widest text-[#A5D0B9]/20">Powered by</p>
                <div className="flex items-center gap-2">
                  <img src="./Logo-Menusclic.png" alt="MenusClic" className="h-6 w-auto opacity-50 hover:opacity-100 transition-opacity" />
                </div>
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
    <a className="w-12 h-12 flex items-center justify-center rounded-full bg-[#333534] text-[#e9c176] hover:bg-[#e9c176] hover:text-[#412d00] transition-all" href="#">
      <span className="material-symbols-outlined">{icon}</span>
    </a>
  )
}


