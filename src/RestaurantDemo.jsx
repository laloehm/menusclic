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
  
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderName, setOrderName] = useState('');
  const [orderType, setOrderType] = useState('llevar'); // 'restaurante', 'llevar', 'domicilio'
  const [orderDetail, setOrderDetail] = useState(''); // Mesa o Dirección
  
  const [itemToAdd, setItemToAdd] = useState(null);
  const [itemNotes, setItemNotes] = useState('');
  
  const [toastMessage, setToastMessage] = useState('');

  const addToCart = (item, notes = '') => {
    const cartId = `${item.id}-${notes.trim().toLowerCase()}`;
    setCart(prev => {
      const existing = prev.find(i => i.cartId === cartId);
      if (existing) {
        return prev.map(i => i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, cartId, notes: notes.trim(), qty: 1 }];
    });
    setToastMessage(`Añadido: ${item.title}`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const removeFromCart = (cartId) => {
    setCart(prev => {
      const existing = prev.find(i => i.cartId === cartId);
      if (existing.qty > 1) {
        return prev.map(i => i.cartId === cartId ? { ...i, qty: i.qty - 1 } : i);
      }
      return prev.filter(i => i.cartId !== cartId);
    });
  };

  const handleSendWhatsApp = () => {
    if (cart.length === 0 || !orderName.trim()) return;
    if ((orderType === 'restaurante' || orderType === 'domicilio') && !orderDetail.trim()) return;
    
    const total = cart.reduce((sum, item) => sum + (parseFloat(item.price || 0) * item.qty), 0);
    
    let tipoTexto = "";
    if (orderType === 'restaurante') tipoTexto = `🍽️ *Para comer aquí* (Mesa: ${orderDetail.trim()})`;
    if (orderType === 'llevar') tipoTexto = `🛍️ *Para pasar a recoger*`;
    if (orderType === 'domicilio') tipoTexto = `🛵 *Para enviar a domicilio* (Dirección: ${orderDetail.trim()})`;

    let text = `Hola, soy *${orderName.trim()}*.\n${tipoTexto}\n\nMe gustaría ordenar lo siguiente:\n\n`;
    cart.forEach(item => {
      text += `- ${item.qty}x *${item.title}* - $${parseFloat(item.price || 0) * item.qty}\n`;
      if (item.notes) text += `  📝 _Notas: ${item.notes}_\n`;
    });
    text += `\n*Total: $${total}*\n\nGracias!`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/525518083608?text=${encoded}`, '_blank');
  };

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
            {/* Botón de cerrar eliminado para que sea una ruta independiente */}
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
          <section className="sticky top-16 z-40 bg-[#fbfbe2]/95 backdrop-blur-sm shadow-sm border-b border-[#ddc0ba]/20">
            <div className="py-8 px-6 flex overflow-x-auto gap-3 hide-scrollbar">
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
            </div>
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
                    <button 
                      onClick={() => { setItemToAdd(item); setItemNotes(''); }}
                      className="bg-[#9f402d] hover:bg-[#795c51] text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
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
        {/* Floating Cart Button */}
        {cart.length > 0 && (
          <button 
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-[#9f402d] text-white w-14 h-14 rounded-full shadow-xl hover:scale-105 transition-transform flex items-center justify-center group"
          >
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
              <span className="absolute -top-3 -right-3 bg-white text-[#9f402d] border border-[#9f402d] text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cart.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            </div>
          </button>
        )}

        {/* Cart Modal */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex justify-end">
            <div className="bg-[#fbfbe2] w-full max-w-sm h-full flex flex-col shadow-2xl">
              <div className="p-6 border-b border-[#ddc0ba]/30 flex justify-between items-center bg-white">
                <h2 className="font-headline text-2xl font-bold text-[#1b1d0e]">Tu Pedido</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-[#795c51] hover:text-[#1b1d0e] bg-gray-100 p-2 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-[#56423e] mt-10">Tu carrito está vacío.</p>
                ) : (
                  cart.map(item => (
                    <div key={item.cartId} className="flex justify-between items-start bg-white p-3 rounded-lg shadow-sm border border-[#ddc0ba]/20">
                      <div className="flex-1 pr-2">
                        <h4 className="font-bold text-[#1b1d0e] text-sm leading-tight">{item.title}</h4>
                        {item.notes && <p className="text-[#9f402d] text-xs italic mt-1">{item.notes}</p>}
                        <span className="text-[#9f402d] font-bold text-xs inline-block mt-1">${parseFloat(item.price || 0) * item.qty}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-[#fbfbe2] rounded-full px-2 py-1 shadow-inner mt-1">
                        <button onClick={() => removeFromCart(item.cartId)} className="text-[#795c51] hover:text-[#9f402d] flex items-center justify-center"><span className="material-symbols-outlined text-sm">remove</span></button>
                        <span className="font-bold text-xs w-4 text-center">{item.qty}</span>
                        <button onClick={() => addToCart(item, item.notes)} className="text-[#795c51] hover:text-[#9f402d] flex items-center justify-center"><span className="material-symbols-outlined text-sm">add</span></button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-[#ddc0ba]/30 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex flex-col gap-4 overflow-y-auto max-h-[55vh]">
                  
                  {/* Order Type Selector */}
                  <div>
                    <label className="block text-xs font-bold text-[#795c51] uppercase tracking-wide mb-2">Tipo de Pedido:</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button onClick={() => setOrderType('restaurante')} className={`py-2 px-1 text-[10px] font-bold rounded-lg border ${orderType === 'restaurante' ? 'bg-[#9f402d] text-white border-[#9f402d]' : 'bg-[#fbfbe2] text-[#795c51] border-[#ddc0ba]/50'}`}>Comer Aquí</button>
                      <button onClick={() => setOrderType('llevar')} className={`py-2 px-1 text-[10px] font-bold rounded-lg border ${orderType === 'llevar' ? 'bg-[#9f402d] text-white border-[#9f402d]' : 'bg-[#fbfbe2] text-[#795c51] border-[#ddc0ba]/50'}`}>Para Llevar</button>
                      <button onClick={() => setOrderType('domicilio')} className={`py-2 px-1 text-[10px] font-bold rounded-lg border ${orderType === 'domicilio' ? 'bg-[#9f402d] text-white border-[#9f402d]' : 'bg-[#fbfbe2] text-[#795c51] border-[#ddc0ba]/50'}`}>A Domicilio</button>
                    </div>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-bold text-[#795c51] uppercase tracking-wide mb-1">Nombre para el pedido:</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Juan Pérez" 
                      value={orderName}
                      onChange={(e) => setOrderName(e.target.value)}
                      className="w-full bg-[#fbfbe2] border border-[#ddc0ba]/50 rounded-lg p-2.5 text-[#1b1d0e] text-sm font-medium outline-none focus:border-[#9f402d] focus:ring-1 focus:ring-[#9f402d] transition-all"
                    />
                  </div>

                  {/* Dynamic Field (Table or Address) */}
                  {orderType === 'restaurante' && (
                    <div>
                      <label className="block text-xs font-bold text-[#795c51] uppercase tracking-wide mb-1">Número de Mesa:</label>
                      <input type="text" placeholder="Ej. Mesa 4" value={orderDetail} onChange={(e) => setOrderDetail(e.target.value)} className="w-full bg-[#fbfbe2] border border-[#ddc0ba]/50 rounded-lg p-2.5 text-[#1b1d0e] text-sm font-medium outline-none focus:border-[#9f402d] focus:ring-1 focus:ring-[#9f402d] transition-all" />
                    </div>
                  )}
                  {orderType === 'domicilio' && (
                    <div>
                      <label className="block text-xs font-bold text-[#795c51] uppercase tracking-wide mb-1">Dirección de Entrega:</label>
                      <textarea placeholder="Calle, número, colonia, referencias..." rows="2" value={orderDetail} onChange={(e) => setOrderDetail(e.target.value)} className="w-full bg-[#fbfbe2] border border-[#ddc0ba]/50 rounded-lg p-2.5 text-[#1b1d0e] text-sm font-medium outline-none focus:border-[#9f402d] focus:ring-1 focus:ring-[#9f402d] transition-all resize-none"></textarea>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-lg font-bold mt-2">
                    <span>Total:</span>
                    <span className="text-[#9f402d]">${cart.reduce((sum, item) => sum + (parseFloat(item.price || 0) * item.qty), 0)}</span>
                  </div>
                  <button 
                    disabled={!orderName.trim() || ((orderType === 'restaurante' || orderType === 'domicilio') && !orderDetail.trim())}
                    onClick={handleSendWhatsApp} 
                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 transition-colors shadow-lg"
                  >
                    <span className="material-symbols-outlined">chat</span>
                    Pedir por WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Item Modifiers Modal */}
        {itemToAdd && (
          <div className="fixed inset-0 bg-black/60 z-[110] flex justify-center items-end sm:items-center">
            <div className="bg-[#fbfbe2] w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-slide-in sm:animate-none">
              <div className="relative h-48 w-full">
                <img src={proxy(itemToAdd.img)} alt={itemToAdd.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fbfbe2] to-transparent"></div>
                <button onClick={() => setItemToAdd(null)} className="absolute top-4 right-4 bg-white/80 backdrop-blur text-[#1b1d0e] w-8 h-8 flex justify-center items-center rounded-full shadow-sm">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
              <div className="px-6 pb-6 pt-2 bg-[#fbfbe2] relative z-10">
                <h3 className="font-headline font-bold text-xl text-[#1b1d0e]">{itemToAdd.title}</h3>
                <p className="text-[#9f402d] font-bold text-lg mt-1">${itemToAdd.price}</p>
                <p className="text-[#56423e] text-sm mt-2">{itemToAdd.desc}</p>
                
                <div className="mt-6">
                  <label className="block text-xs font-bold text-[#795c51] uppercase tracking-wide mb-2">Notas especiales (opcional):</label>
                  <textarea 
                    placeholder="Ej. Sin cebolla, extra aderezo..." 
                    rows="2"
                    value={itemNotes}
                    onChange={(e) => setItemNotes(e.target.value)}
                    className="w-full bg-white border border-[#ddc0ba]/50 rounded-lg p-3 text-[#1b1d0e] text-sm font-medium outline-none focus:border-[#9f402d] focus:ring-1 focus:ring-[#9f402d] transition-all resize-none shadow-inner"
                  ></textarea>
                </div>
                
                <button 
                  onClick={() => { addToCart(itemToAdd, itemNotes); setItemToAdd(null); }}
                  className="w-full mt-6 bg-[#9f402d] hover:bg-[#795c51] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[120] bg-[#1b1d0e] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined text-[#25D366] text-sm">check_circle</span>
            <span className="text-sm font-bold">{toastMessage}</span>
          </div>
        )}
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
