import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export default function MalosaHouseDemo() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'malosahouse_items'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    });
    return () => unsubscribe();
  }, []);

  // Helper para filtrar por categoría y excluir los no disponibles si se requiere (o mostrarlos con opacidad)
  const getItems = (category, defaultItems) => {
    const firebaseItems = items.filter(item => {
      const cat = (item.category || '').toLowerCase();
      return cat === category.toLowerCase() && item.available !== false;
    });
    // Si hay items en Firebase para esta categoría, úsalos; de lo contrario usa los por defecto.
    return firebaseItems.length > 0 ? firebaseItems : defaultItems;
  };

  const sortMenu = (a, b) => {
    const tA = (a.title || a.name || '').toLowerCase();
    const tB = (b.title || b.name || '').toLowerCase();
    const getWeight = (t) => {
      if (t.includes('5 ') || t.includes('8 ')) return 1;
      if (t.includes('12 ') || t.includes('16 ')) return 2;
      if (t.includes('papas')) return 3;
      return 4;
    };
    return getWeight(tA) - getWeight(tB);
  };

  const salsas = getItems('Salsas', [
    { title: "BBQ" }, { title: "Lemon Pepper" }, { title: "Ajo Parmesano" }, 
    { title: "Mango Habanero" }, { title: "Atomic", special: true }, { title: "Red Hot", special: true }
  ]);

  const alitas = getItems('Alitas', [
    { title: "5 PIEZAS", price: 85 }, { title: "12 PIEZAS", price: 160 }, { title: "CON PAPAS", price: 100 }
  ]).sort(sortMenu);

  const boneless = getItems('Boneless', [
    { title: "8 PIEZAS", price: 80 }, { title: "16 PIEZAS", price: 150 }, { title: "CON PAPAS", price: 100 }
  ]).sort(sortMenu);

  const papas = getItems('Papas', [
    { title: "Francesas" }, { title: "Lemon Pepper" }, { title: "Ajo Parmesano" }, { title: "Lokaz" }, { title: "Mango Habanero" }
  ]);
  // Extraer el item especial que define el precio base de las papas (si lo hay)
  const papaBase = items.find(i => (i.category || '').toLowerCase() === 'papas base' && i.available !== false);
  const papasBasePrice = papaBase ? papaBase.price : 60;

  const hamburguesas = getItems('Hamburguesas', [
    { title: "MaloBurguer", desc: "Doble carne de res smash, queso derretido, tocino crujiente y nuestro aderezo secreto en pan brioche artesanal.", price: 75, top: true },
    { title: "Arrachera", desc: "Fajitas de arrachera marinada, cebolla caramelizada y pimientos asados.", price: 75 },
    { title: "Pollo BBQ", desc: "Pechuga crujiente bañada en nuestra salsa BBQ ahumada, con ensalada de col.", price: 75 }
  ]);
  const hamburguesaCombo = items.find(i => (i.category || '').toLowerCase() === 'hamburguesas combo' && i.available !== false);
  const hamburguesaComboPrice = hamburguesaCombo ? hamburguesaCombo.price : 90;

  const hotdogs = getItems('Hot Dogs', [
    { title: "Sencillo", price: 20 }, { title: "Tocino", price: 25 }, { title: "Hawaiano", price: 35 }
  ]);

  const bebidas = getItems('Bebidas', [
    { title: "Michelada", price: 100 }, { title: "Mojito 1Lt", price: 85 }, { title: "Blue / Pink 1Lt", price: 80 },
    { title: "Sangría Preparada", price: 65 }, { title: "Tehuacán Preparado", price: 65 }, { title: "Té o Café", price: 25 }
  ]);

  const postres = getItems('Postres', [
    { title: "Plátanos Fritos", price: 50 }, { title: "Plátanos Árabes", price: 60 },
    { title: "Mangos c/ Queso", price: 45 }, { title: "Helado Frito", price: 60 }
  ]);

  const renderItemLine = (item) => (
    <div key={item.id || item.title} className="flex justify-between items-baseline text-lg">
      <span className="font-malosa font-medium uppercase text-malosa-text-light">{item.title || item.name}</span>
      <span className="malosa-dot-leader"></span>
      <span className="font-malosa font-normal pr-2 text-malosa-primary">${item.price}</span>
    </div>
  );

  return (
    <div className="text-malosa-primary selection:bg-malosa-secondary-container font-malosa min-h-screen bg-malosa-bg pb-12 text-lg">
      
      {/* Estilos inyectados */}
      <style>{`
        .malosa-dot-leader {
            flex-grow: 1;
            flex-shrink: 1;
            min-width: 12px;
            border-bottom: 2px dotted #f8b7a6;
            margin: 0 8px;
            position: relative;
            top: -4px;
        }
        .malosa-brutalist-border {
            border: 2px solid #f8b7a6;
        }
        .malosa-double-border {
            border: 4px double #f8b7a6;
        }
        .malosa-noise-overlay {
            position: fixed;
            inset: 0;
            z-index: 99;
            opacity: 0.03;
            pointer-events: none;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      <div className="malosa-noise-overlay"></div>

      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 h-20 bg-malosa-bg/95 backdrop-blur-sm border-b-2 border-malosa-primary flex justify-center items-center px-6 gap-3">
        <img src="/malosa-logo.png" alt="Malosa House" className="h-12 w-12 object-contain" />
        <h1 className="font-malosa text-[32px] uppercase tracking-tighter text-malosa-primary mt-1">MALOSA HOUSE</h1>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-28 pb-12 px-6 max-w-xl mx-auto">
        <div className="flex flex-col gap-10">
          <div className="space-y-10">
            
            {/* Section: Salsas */}
            {salsas.length > 0 && (
              <section className="relative overflow-hidden">
                <div className="malosa-double-border p-4 relative z-10">
                  <p className="font-malosa font-bold uppercase text-center mb-4 border-b border-malosa-primary pb-2">Nuestras Salsas</p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    {salsas.map((s, idx) => (
                      <span key={s.id || idx} className={`font-malosa font-medium uppercase ${s.special ? 'text-malosa-primary' : 'text-malosa-text-light'}`}>
                        {s.title || s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Section: Alitas & Boneless */}
            {(alitas.length > 0 || boneless.length > 0) && (
              <section className="relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 pointer-events-none z-0 flex items-center justify-center">
                  <img alt="Alitas background" className="max-w-[95%] max-h-full object-contain mix-blend-screen" src="/alitas.png" />
                </div>
                <div className="relative z-10">
                  
                  {alitas.length > 0 && (
                    <div className="mb-6">
                      <div className="py-2 flex items-end gap-4 mb-4 border-b-2 border-malosa-primary">
                        <h3 className="font-malosa text-4xl font-bold uppercase m-0 leading-none">Alitas</h3>
                        <div className="flex-grow border-b-4 border-malosa-primary mb-1"></div>
                      </div>
                      <div className="space-y-2">
                        {alitas.map(renderItemLine)}
                      </div>
                    </div>
                  )}

                  {boneless.length > 0 && (
                    <div className="mt-6">
                      <div className="py-2 flex items-end gap-4 mb-4 border-b-2 border-malosa-primary">
                        <h3 className="font-malosa text-4xl font-bold uppercase m-0 leading-none">Boneless</h3>
                        <div className="flex-grow border-b-4 border-malosa-primary mb-1"></div>
                      </div>
                      <div className="space-y-2">
                        {boneless.map(renderItemLine)}
                      </div>
                    </div>
                  )}

                </div>
              </section>
            )}

            {/* Section: Papas */}
            {papas.length > 0 && (
              <section className="bg-malosa-surface-dim p-6 malosa-brutalist-border">
                <div className="flex items-center gap-4 mb-4">
                  <span className="material-symbols-outlined text-3xl">lunch_dining</span>
                  <h3 className="font-malosa text-4xl font-bold uppercase">Papas</h3>
                  <span className="ml-auto font-malosa text-3xl text-malosa-primary">${papasBasePrice}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {papas.map((p, idx) => (
                    <p key={p.id || idx} className="font-malosa uppercase font-medium tracking-tight text-malosa-text-light">
                      {p.title || p.name}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {/* Section: Hamburguesas */}
            {hamburguesas.length > 0 && (
              <section className="relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 pointer-events-none z-0 flex items-center justify-center">
                  <img alt="Hamburguesas background" className="max-w-[95%] max-h-full object-contain mix-blend-screen" src="/Burguer.png" />
                </div>
                <div className="relative z-10">
                  <div className="py-2 flex items-end gap-4 mb-4 border-b-2 border-malosa-primary">
                    <h3 className="font-malosa text-4xl font-bold uppercase m-0 leading-none">Hamburguesas</h3>
                    <div className="flex-grow border-b-4 border-malosa-primary mb-1"></div>
                  </div>
                  <div className="mb-4">
                    <p className="font-malosa text-malosa-primary/70">(Todas van hawaiianas)</p>
                  </div>
                  <div className="space-y-2 mb-6">
                    {hamburguesas.map((h, idx) => (
                      <div key={h.id || idx} className="group p-2 -mx-2 hover:bg-malosa-primary hover:text-malosa-on-primary transition-all malosa-brutalist-border border-transparent hover:border-malosa-primary cursor-pointer">
                        <div className="flex justify-between items-baseline">
                          <div className="flex items-center gap-2">
                            <p className="font-malosa font-medium uppercase text-malosa-text-light">{h.title || h.name}</p>
                            {h.top && (
                              <span className="bg-malosa-primary text-malosa-on-primary group-hover:bg-malosa-bg group-hover:text-malosa-primary text-[10px] font-malosa font-bold px-1 py-0.5 uppercase tracking-wider border border-malosa-primary">🔥 Top</span>
                            )}
                          </div>
                          <span className="malosa-dot-leader group-hover:border-malosa-on-primary"></span>
                          <span className="font-malosa font-normal pr-2 text-malosa-primary">${h.price}</span>
                        </div>
                        {h.desc && (
                          <p className="text-sm font-malosa opacity-80 mt-1 text-malosa-text-light">{h.desc}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="malosa-brutalist-border p-4 flex justify-between items-center bg-transparent mt-4">
                    <span className="font-malosa font-bold uppercase text-malosa-text-light text-xl">Combo con papas</span>
                    <span className="font-malosa text-3xl text-malosa-primary">${hamburguesaComboPrice}</span>
                  </div>
                </div>
              </section>
            )}

            {/* Section: Hot Dogs */}
            {hotdogs.length > 0 && (
              <section>
                <h3 className="font-malosa text-4xl font-bold uppercase mb-4">Hot Dogs</h3>
                <div className="space-y-2">
                  {hotdogs.map(renderItemLine)}
                </div>
              </section>
            )}

            {/* Section: Bebidas */}
            {bebidas.length > 0 && (
              <section className="relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 pointer-events-none z-0 flex items-center justify-center">
                  <img alt="Bebidas background" className="max-w-[95%] max-h-full object-contain mix-blend-screen" src="/Drinks.png" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-malosa text-4xl font-bold uppercase">Bebidas</h3>
                    <div className="flex-grow border-t-2 border-malosa-primary"></div>
                    <span className="material-symbols-outlined text-3xl">local_bar</span>
                  </div>
                  <div className="space-y-2">
                    {bebidas.map(renderItemLine)}
                  </div>
                </div>
              </section>
            )}

            {/* Section: Postres */}
            {postres.length > 0 && (
              <section className="bg-malosa-surface-variant p-6 malosa-brutalist-border relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-malosa text-3xl font-bold uppercase mb-4">Postres</h3>
                  <div className="space-y-2">
                    {postres.map(renderItemLine)}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Contact Banner */}
        <div className="mt-10 malosa-brutalist-border bg-malosa-primary text-malosa-on-primary p-6 flex flex-col items-center text-center gap-4">
          <h4 className="font-malosa text-lg sm:text-2xl whitespace-nowrap">Haz tu pedido ahora</h4>
          <a className="font-malosa text-[32px] hover:underline transition-all font-bold" href="tel:5571491246">5571491246</a>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 mb-16 border-t-4 border-double border-malosa-primary flex flex-col items-center space-y-4 px-6 text-center bg-malosa-bg">
        <h2 className="font-malosa text-2xl text-malosa-primary">MALOSA HOUSE</h2>
        <div className="flex flex-col items-center gap-4 my-4">
          <a className="font-malosa text-malosa-primary opacity-90 hover:opacity-100 underline transition-all" href="https://www.facebook.com/malosa16" target="_blank" rel="noreferrer">Facebook: Malosa House</a>
          <a className="font-malosa text-malosa-primary opacity-90 hover:opacity-100 underline transition-all font-bold" href="https://maps.app.goo.gl/b73bW97w4iQDNVWc9" target="_blank" rel="noreferrer">Ubicación</a>
        </div>
        <p className="font-malosa text-malosa-primary mt-4">© 2024 Malosa House. Est. 2020.</p>
      </footer>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/525571491246" target="_blank" rel="noreferrer" className="fixed bottom-6 right-4 z-50 flex items-center justify-center group outline-none">
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></div>
        <div className="relative bg-[#25D366] text-white p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
          </svg>
        </div>
      </a>
    </div>
  );
}
