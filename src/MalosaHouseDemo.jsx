import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export default function MalosaHouseDemo() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Si quisieran renderizar la BD:
    const unsubscribe = onSnapshot(collection(db, 'malosahouse_items'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="text-malosa-primary selection:bg-malosa-secondary-container italic font-malosa min-h-screen bg-malosa-bg pb-12" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}>
      
      {/* Estilos inyectados que no son posibles con Tailwind nativo fácilmente */}
      <style>{`
        .malosa-dot-leader {
            flex-grow: 1;
            flex-shrink: 1;
            min-width: 12px;
            border-bottom: 2px dotted #000000;
            margin: 0 8px;
            position: relative;
            top: -4px;
        }
        .malosa-brutalist-border {
            border: 2px solid #000000;
        }
        .malosa-double-border {
            border: 4px double #000000;
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
      <header className="fixed top-0 w-full z-50 h-20 bg-malosa-bg/95 backdrop-blur-sm border-b-2 border-malosa-primary flex justify-center items-center px-6">
        <h1 className="font-malosa text-[32px] uppercase tracking-tighter text-malosa-primary">MALOSA HOUSE</h1>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-28 pb-12 px-6 max-w-xl mx-auto">
        <div className="flex flex-col gap-10">
          <div className="space-y-10">
            
            {/* Section: Salsas */}
            <section className="relative overflow-hidden">
              <div className="absolute inset-0 opacity-25 pointer-events-none z-0">
                <img alt="Salsas background" className="w-full h-full object-contain mix-blend-multiply opacity-70" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeduEulUWAG6RK1dW9k8AjQjiU5PUsxisDn5Q_t77NpUWxoFzco7bIbdM6UjNbd8d3OqGgnXVaKQ23C-vmJ4VabEcqQt77kJVGUvTtTcIv41q8dgPKc7AbIlCnwpizdQyMnW6adO9VHEoOjlTLcYIbH0sbIx2ScgYM6EAiVwiuTNOiVRNm_tVtNx8mUmJLAuYd0oQv9cZvDrTQlEMj-W2ExoPf-1fnx8HDOfmhxay7wVO_SLNgcxpy-g" />
              </div>
              <div className="malosa-double-border p-4 relative z-10">
                <p className="font-malosa font-bold uppercase text-center mb-4 border-b border-malosa-primary pb-2">Nuestras Salsas</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <span className="font-malosa font-medium uppercase">BBQ</span>
                  <span className="font-malosa font-medium uppercase">Lemon Pepper</span>
                  <span className="font-malosa font-medium uppercase">Ajo Parmesano</span>
                  <span className="font-malosa font-medium uppercase">Mango Habanero</span>
                  <span className="font-malosa font-medium uppercase text-red-600">Atomic</span>
                  <span className="font-malosa font-medium uppercase text-red-600">Red Hot</span>
                </div>
              </div>
            </section>

            {/* Section: Alitas & Boneless */}
            <section className="relative overflow-hidden">
              <div className="absolute inset-0 opacity-25 pointer-events-none z-0">
                <img alt="Alitas background" className="w-full h-full object-contain mix-blend-multiply opacity-70" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7vinJ7YXqvg2cuE02O4IH6EDmN-_ZQ5RmCoGYfrRye4af2D_rF-h7zqXMtAgA1NBLONWfCIKlPeTyO2nzN5-CLiGK6F4AF3DkBIK18nF-pIQYH7m2a8xl2YefcNX8hlz-wIxJmVyAVpBtUiyt6DoarRImtcMsgr8DnNDbxS2IhYJZn0zrN50Eplk-3zSeEDya7YkbHp0F_Mkyj7nWNKAFMjRLMOC5JBAJAxJ6ATfn-P-Ayyo7ePsIng" />
              </div>
              <div className="relative z-10">
                <div className="py-2 flex items-end gap-4 mb-4 border-b-2 border-malosa-primary">
                  <h3 className="font-malosa text-3xl font-bold uppercase italic m-0 leading-none">Alitas</h3>
                  <div className="flex-grow border-b-4 border-malosa-primary mb-1"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-malosa font-medium">5 PIEZAS</span>
                    <span className="malosa-dot-leader"></span>
                    <span className="font-malosa font-normal opacity-80 pr-2">$85</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-malosa font-medium">12 PIEZAS</span>
                    <span className="malosa-dot-leader"></span>
                    <span className="font-malosa font-normal opacity-80 pr-2">$160</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-malosa font-medium">CON PAPAS</span>
                    <span className="malosa-dot-leader"></span>
                    <span className="font-malosa font-normal opacity-80 pr-2">$100</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="py-2 flex items-end gap-4 mb-4 border-b-2 border-malosa-primary">
                    <h3 className="font-malosa text-3xl font-bold uppercase italic m-0 leading-none">Boneless</h3>
                    <div className="flex-grow border-b-4 border-malosa-primary mb-1"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="font-malosa font-medium">8 PIEZAS</span>
                      <span className="malosa-dot-leader"></span>
                      <span className="font-malosa font-normal opacity-80 pr-2">$80</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-malosa font-medium">16 PIEZAS</span>
                      <span className="malosa-dot-leader"></span>
                      <span className="font-malosa font-normal opacity-80 pr-2">$150</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-malosa font-medium">CON PAPAS</span>
                      <span className="malosa-dot-leader"></span>
                      <span className="font-malosa font-normal opacity-80 pr-2">$100</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Papas */}
            <section className="bg-malosa-surface-dim p-6 malosa-brutalist-border">
              <div className="flex items-center gap-4 mb-4">
                <span className="material-symbols-outlined text-3xl">lunch_dining</span>
                <h3 className="font-malosa text-3xl font-bold uppercase italic">Papas</h3>
                <span className="ml-auto font-malosa text-2xl">$60</span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-malosa uppercase font-medium tracking-tight">Francesas</p>
                <p className="font-malosa uppercase font-medium tracking-tight">Lemon Pepper</p>
                <p className="font-malosa uppercase font-medium tracking-tight">Ajo Parmesano</p>
                <p className="font-malosa uppercase font-medium tracking-tight">Lokaz</p>
                <p className="font-malosa uppercase font-medium tracking-tight">Mango Habanero</p>
              </div>
            </section>

            {/* Section: Hamburguesas */}
            <section className="relative overflow-hidden">
              <div className="absolute inset-0 opacity-25 pointer-events-none z-0">
                <img alt="Hamburguesas background" className="w-full h-full object-contain mix-blend-multiply opacity-70" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq_qCt42fEWuCmrjZrU8FN4-uyu6ylTDPy5cayYcC_ACdj-v5r2DrFZZz4rgSN9CFP0niBHug_cIAL77H_sCZSSvZX39KKOM9xIz8rUWlQuWRvO_r7boNs36Uz6GIuLnRxCgxj0GGN_snLHEwiYC8Nr0CFLftFM-T2bkUgMWylp6EZL5nbrwClkfJjMAN96oyWYHrSojYrF7tKKLCiAChVRTyJnuCtHNVRMVG2vY49Q_whIMqhVCVRCQ" />
              </div>
              <div className="relative z-10">
                <div className="py-2 flex items-end gap-4 mb-4 border-b-2 border-malosa-primary">
                  <h3 className="font-malosa text-3xl font-bold uppercase italic m-0 leading-none">Hamburguesas</h3>
                  <div className="flex-grow border-b-4 border-malosa-primary mb-1"></div>
                </div>
                <div className="mb-4">
                  <p className="font-malosa italic text-malosa-primary/70">(Todas van hawaiianas)</p>
                </div>
                <div className="space-y-2 mb-6">
                  {/* Menu Item */}
                  <div className="group p-2 -mx-2 hover:bg-malosa-primary hover:text-malosa-on-primary transition-all malosa-brutalist-border border-transparent hover:border-malosa-primary cursor-pointer">
                    <div className="flex justify-between items-baseline">
                      <div className="flex items-center gap-2">
                        <p className="font-malosa font-medium uppercase">MaloBurguer</p>
                        <span className="bg-malosa-primary text-malosa-on-primary group-hover:bg-malosa-bg group-hover:text-malosa-primary text-[10px] font-malosa font-bold px-1 py-0.5 uppercase tracking-wider border border-malosa-primary">🔥 Top</span>
                      </div>
                      <span className="malosa-dot-leader group-hover:border-malosa-on-primary"></span>
                      <span className="font-malosa font-normal opacity-80 pr-2">$75</span>
                    </div>
                    <p className="text-sm font-malosa opacity-80 mt-1 italic">Doble carne de res smash, queso derretido, tocino crujiente y nuestro aderezo secreto en pan brioche artesanal.</p>
                  </div>

                  {/* Menu Item */}
                  <div className="group p-2 -mx-2 hover:bg-malosa-primary hover:text-malosa-on-primary transition-all malosa-brutalist-border border-transparent hover:border-malosa-primary cursor-pointer">
                    <div className="flex justify-between items-baseline">
                      <p className="font-malosa font-medium uppercase">Arrachera</p>
                      <span className="malosa-dot-leader group-hover:border-malosa-on-primary"></span>
                      <span className="font-malosa font-normal opacity-80 pr-2">$75</span>
                    </div>
                    <p className="text-sm font-malosa opacity-80 mt-1 italic">Fajitas de arrachera marinada, cebolla caramelizada y pimientos asados.</p>
                  </div>

                  {/* Menu Item */}
                  <div className="group p-2 -mx-2 hover:bg-malosa-primary hover:text-malosa-on-primary transition-all malosa-brutalist-border border-transparent hover:border-malosa-primary cursor-pointer">
                    <div className="flex justify-between items-baseline">
                      <p className="font-malosa font-medium uppercase">Pollo BBQ</p>
                      <span className="malosa-dot-leader group-hover:border-malosa-on-primary"></span>
                      <span className="font-malosa font-normal opacity-80 pr-2">$75</span>
                    </div>
                    <p className="text-sm font-malosa opacity-80 mt-1 italic">Pechuga crujiente bañada en nuestra salsa BBQ ahumada, con ensalada de col.</p>
                  </div>
                </div>
                <div className="malosa-brutalist-border p-4 flex justify-between items-center bg-malosa-secondary-container">
                  <span className="font-malosa font-bold uppercase">Combo con papas</span>
                  <span className="font-malosa text-2xl">$90</span>
                </div>
              </div>
            </section>

            {/* Section: Hot Dogs */}
            <section>
              <h3 className="font-malosa text-3xl font-bold uppercase italic mb-4">Hot Dogs</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-malosa font-medium uppercase">Sencillo</span>
                  <span className="malosa-dot-leader"></span>
                  <span className="font-malosa font-normal opacity-80 pr-2">$20</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-malosa font-medium uppercase">Tocino</span>
                  <span className="malosa-dot-leader"></span>
                  <span className="font-malosa font-normal opacity-80 pr-2">$25</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-malosa font-medium uppercase">Hawaiano</span>
                  <span className="malosa-dot-leader"></span>
                  <span className="font-malosa font-normal opacity-80 pr-2">$35</span>
                </div>
              </div>
            </section>

            {/* Section: Bebidas */}
            <section className="relative overflow-hidden">
              <div className="absolute inset-0 opacity-25 pointer-events-none z-0">
                <img alt="Bebidas background" className="w-full h-full object-contain mix-blend-multiply opacity-70" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPs4Qe6mKa7Lq8BQzRso6iEtoRAVkczMVj-PPYGWVw3Pfgut7APIqZ27tCczWQEzASpNvdQqFish2ojdq1VpX0eK9KvWN1Kwxp4-S8zpayl8WV19aogGtzBa8vcXd1l4bNaf26b3TnjX6eCyxct_3MvXPQR3lqr8kznB77XdmEpD4su909n-0Lz4r89UwZTuDgdG1lubi0EqtYFkUAw-cyVUQWV4pAMEv_gH-03q-B26Ynbgu_vJW8qA" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="font-malosa text-3xl font-bold uppercase italic">Bebidas</h3>
                  <div className="flex-grow border-t-2 border-malosa-primary"></div>
                  <span className="material-symbols-outlined text-3xl">local_bar</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-malosa font-medium uppercase">Michelada</span>
                    <span className="malosa-dot-leader"></span>
                    <span className="font-malosa font-normal opacity-80 pr-2">$100</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-malosa font-medium uppercase">Mojito 1Lt</span>
                    <span className="malosa-dot-leader"></span>
                    <span className="font-malosa font-normal opacity-80 pr-2">$85</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-malosa font-medium uppercase">Blue / Pink 1Lt</span>
                    <span className="malosa-dot-leader"></span>
                    <span className="font-malosa font-normal opacity-80 pr-2">$80</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-malosa font-medium uppercase">Sangría Preparada</span>
                    <span className="malosa-dot-leader"></span>
                    <span className="font-malosa font-normal opacity-80 pr-2">$65</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-malosa font-medium uppercase">Tehuacán Preparado</span>
                    <span className="malosa-dot-leader"></span>
                    <span className="font-malosa font-normal opacity-80 pr-2">$65</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-malosa font-medium uppercase">Té o Café</span>
                    <span className="malosa-dot-leader"></span>
                    <span className="font-malosa font-normal opacity-80 pr-2">$25</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Postres */}
            <section className="bg-malosa-surface-variant p-6 malosa-brutalist-border relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-malosa text-3xl font-bold uppercase italic mb-4">Postres</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-malosa font-medium uppercase">Plátanos Fritos</span>
                    <span className="malosa-dot-leader"></span>
                    <span className="font-malosa font-normal opacity-80 pr-2">$50</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-malosa font-medium uppercase">Plátanos Árabes</span>
                    <span className="malosa-dot-leader"></span>
                    <span className="font-malosa font-normal opacity-80 pr-2">$60</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-malosa font-medium uppercase">Mangos c/ Queso</span>
                    <span className="malosa-dot-leader"></span>
                    <span className="font-malosa font-normal opacity-80 pr-2">$45</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-malosa font-medium uppercase">Helado Frito</span>
                    <span className="malosa-dot-leader"></span>
                    <span className="font-malosa font-normal opacity-80 pr-2">$60</span>
                  </div>
                </div>
              </div>
              <img className="absolute -top-10 -right-10 w-48 h-48 opacity-25 rotate-45 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKiF-uBIGdPXsoP9rP5E9c5siwYYEd0i_wttQQNnAosFp4zAwTJ-WAbk8xcUBQ2VwCbhMafgcSezTGooh5ESAFaNE3j7BO0z3sT-pmCcI8LWlyM0OoXdDArD-8tArJ38cnOQ3FKSIiJlJWmH4FvAxWjPOh05D2qWaubsX749FSv1kHnaDpVVTmAvPYAC90XD8LVEbWICa0aMrKd6Q8377u3-Aclqou54lb7SN4O5arv5gx1DfwG1A_Yg" />
            </section>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="mt-10 malosa-brutalist-border bg-malosa-primary text-malosa-on-primary p-6 flex flex-col items-center text-center gap-4">
          <h4 className="font-malosa text-lg sm:text-2xl whitespace-nowrap">Haz tu pedido ahora</h4>
          <a className="font-malosa text-[32px] hover:underline transition-all font-bold not-italic" href="tel:5571491246">5571491246</a>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 mb-16 border-t-4 border-double border-malosa-primary flex flex-col items-center space-y-4 px-6 text-center bg-malosa-bg">
        <h2 className="font-malosa text-2xl text-malosa-primary not-italic">MALOSA HOUSE</h2>
        <div className="flex flex-col items-center gap-4 my-4">
          <a className="font-malosa text-malosa-primary opacity-90 hover:opacity-100 underline transition-all" href="#">Instagram: @malosahouse</a>
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
