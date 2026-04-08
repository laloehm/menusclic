import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, deleteDoc, setDoc, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from './firebase';

export default function AdminDashboard({ onBack, domain }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const allCollections = [
    { id: 'restaurant_items', label: 'Restaurante', domain: 'restaurant' },
    { id: 'snack_items', label: 'Snacks', domain: 'snack' },
    { id: 'bar_items', label: 'Menú del Bar', domain: 'bar' }
  ];

  const collections = allCollections.filter(c => c.domain === domain);
  const [activeTab, setActiveTab] = useState(collections.length > 0 ? collections[0].id : '');

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !activeTab) return;
    
    setLoading(true);
    const q = collection(db, activeTab);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
      // Sort by id if available to maintain order
      data.sort((a,b) => (a.id || 0) - (b.id || 0));
      setItems(data);
      setLoading(false);
    }, (error) => {
      console.error(error);
      alert('Error sincronizando datos');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeTab, isAuthenticated]);

  const handleDelete = async (docId) => {
    if (window.confirm('¿Seguro que deseas eliminar este elemento?')) {
      try {
        await deleteDoc(doc(db, activeTab, docId));
      } catch (e) {
        console.error(e);
        alert('Error eliminando');
      }
    }
  };

  const handleSave = async (itemData) => {
    try {
      if (isAdding) {
        // assign a fake max ID just to keep ordering
        const maxId = items.reduce((max, i) => Math.max(max, i.id || 0), 0) + 1;
        itemData.id = maxId;
        await addDoc(collection(db, activeTab), itemData);
      } else {
        const { docId, ...updateData } = itemData;
        await setDoc(doc(db, activeTab, docId), updateData);
      }
      setEditingItem(null);
      setIsAdding(false);
    } catch (e) {
      console.error(e);
      alert('Error guardando');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-inter">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-xl max-w-sm w-full">
          <div className="flex justify-center mb-8">
            <img src="./Logo-Menusclic.png" alt="MenusClic Logo" className="h-12 w-auto" />
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <button type="button" onClick={onBack} className="text-gray-400 hover:text-gray-800"><span className="material-symbols-outlined">close</span></button>
          </div>
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-white text-black border p-3 rounded mb-4"
          />
          <button type="submit" className="w-full bg-orange-600 text-white font-bold py-3 rounded">Ingresar</button>
        </form>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 font-inter antialiased">
      {/* Header */}
      <header className="bg-white shadow px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50 gap-4 md:gap-0">
        <div className="flex items-center justify-center md:justify-start w-full relative">
          <button onClick={onBack} className="absolute left-0 md:static w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex items-center gap-3 ml-2">
            <img src="./Logo-Menusclic.png" alt="Logo" className="h-8 w-auto hidden md:block" />
            <div className="md:w-[2px] md:h-6 md:bg-gray-200 hidden md:block"></div>
            <h1 className="text-xl md:text-2xl font-black text-center w-full md:w-auto">Panel Admin</h1>
          </div>
        </div>
        <button onClick={() => { setIsAdding(true); setEditingItem({}); }} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center justify-center gap-1 transition-colors shadow-sm w-full sm:w-auto">
          <span className="material-symbols-outlined text-[24px] leading-none flex items-center justify-center mt-[-1px]">add</span> 
          <span className="leading-none pt-[1px]">Nuevo Platillo</span>
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 md:p-6 flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* Sidebar Nav - Horizontal on mobile, vertical on desktop */}
        {collections.length > 1 && (
          <nav className="w-full md:w-64 flex-shrink-0 flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar snap-x">
            {collections.map(col => (
              <button 
                key={col.id}
                onClick={() => setActiveTab(col.id)}
                className={`flex-shrink-0 snap-start text-left px-4 py-3 rounded font-bold transition-colors whitespace-nowrap md:whitespace-normal ${activeTab === col.id ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200 shadow-sm'}`}
              >
                {col.label}
              </button>
            ))}
          </nav>
        )}

        {/* Main Content */}
        <main className="flex-1 bg-transparent md:bg-white md:rounded-xl md:shadow-sm md:p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6 hidden md:flex">
            <h2 className="text-2xl font-bold text-gray-800">{collections.find(c => c.id === activeTab).label}</h2>
          </div>
          
          {loading ? (
            <div className="py-20 text-center text-gray-500 font-medium">Sincronizando con la nube...</div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(item => {
                const itemIsLiquor = ['tequilas', 'whisky', 'ron'].includes(item.category);
                return (
                <div key={item.docId} className="bg-white border md:border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                  
                  {itemIsLiquor ? (
                     <div className="flex-1 flex flex-col gap-1">
                       <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                       <div className="flex gap-4 text-sm font-medium">
                         <span className="text-orange-600">Copa: ${item.cup}</span>
                         <span className="text-orange-600">Botella: ${item.bottle}</span>
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 w-max px-2 py-0.5 rounded mt-1">{item.category}</span>
                     </div>
                  ) : (
                    <div className="flex items-start sm:items-center gap-4 flex-1">
                      {item.img && <img src={item.img} alt={item.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0 shadow-sm" />}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">{item.title || item.name}</h3>
                        <p className="text-orange-600 font-black mb-1">${item.price}</p>
                        <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-none">{item.desc}</p>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 w-max px-2 py-0.5 rounded mt-2 block">{item.category || 'Snack'}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 justify-end w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <button onClick={() => { setIsAdding(false); setEditingItem(item); }} className="flex-1 sm:flex-none p-3 sm:p-2 bg-blue-50 text-blue-600 rounded-lg sm:rounded flex justify-center items-center gap-2 hover:bg-blue-100 transition-colors">
                      <span className="material-symbols-outlined text-[20px] sm:text-sm">edit</span> <span className="sm:hidden text-sm font-bold">Editar</span>
                    </button>
                    <button onClick={() => handleDelete(item.docId)} className="flex-1 sm:flex-none p-3 sm:p-2 bg-red-50 text-red-600 rounded-lg sm:rounded flex justify-center items-center gap-2 hover:bg-red-100 transition-colors">
                      <span className="material-symbols-outlined text-[20px] sm:text-sm">delete</span> <span className="sm:hidden text-sm font-bold">Borrar</span>
                    </button>
                  </div>

                </div>
              )})}
              
              {items.length === 0 && (
                <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed">
                  No hay platos en esta categoría
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Editor Modal */}
      {(editingItem !== null || isAdding) && (
        <div className="fixed inset-0 bg-black/60 z-[90] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">{isAdding ? 'Añadir Nuevo' : 'Editar Elemento'}</h3>
            <ItemForm 
              item={editingItem} 
              domain={domain}
              onSave={handleSave} 
              onCancel={() => { setEditingItem(null); setIsAdding(false); }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ItemForm({ item, domain, onSave, onCancel }) {
  const [formData, setFormData] = useState(item || (domain === 'restaurant' ? {category: 'desayunos'} : domain === 'bar' ? {category: 'destacados'} : {}));
  const [uploading, setUploading] = useState(false);
  
  const isLiquor = ['tequilas', 'whisky', 'ron'].includes(formData.category);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileRef = ref(storage, `menusclic/${domain}/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setFormData(prev => ({ ...prev, img: url }));
    } catch (error) {
      console.error(error);
      alert('Error al subir imagen. Ve a tu consola de Firebase > Storage > Rules y asegurate de tener: allow read, write: if true;');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {domain === 'restaurant' && (
         <div>
           <label className="block text-sm font-bold text-gray-700 mb-1">Categoría</label>
           <select required name="category" value={formData.category || 'desayunos'} onChange={handleChange} className="w-full bg-white text-black border p-2 rounded text-sm">
             <option value="desayunos">Desayunos</option>
             <option value="entradas">Entradas</option>
             <option value="comidas">Comidas</option>
             <option value="cenas">Cenas</option>
             <option value="postres">Postres</option>
             <option value="bebidas">Bebidas</option>
           </select>
         </div>
      )}
      {domain === 'bar' && (
         <div>
           <label className="block text-sm font-bold text-gray-700 mb-1">Categoría del Bar</label>
           <select required name="category" value={formData.category || 'destacados'} onChange={handleChange} className="w-full bg-white text-black border p-2 rounded text-sm">
             <option value="destacados">Destacados / Cócteles</option>
             <option value="cervezas">Cervezas</option>
             <option value="tequilas">Tequilas</option>
             <option value="whisky">Whisky</option>
             <option value="ron">Ron</option>
             <option value="sin-alcohol">Sin Alcohol</option>
           </select>
         </div>
      )}

      {isLiquor ? (
        <>
          <div><label className="block text-sm font-bold text-gray-700 mb-1">Nombre</label><input required type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-white text-black border p-2 rounded" /></div>
          <div className="flex gap-4">
            <div className="w-1/2"><label className="block text-sm font-bold text-gray-700 mb-1">Precio Copa</label><input type="number" name="cup" value={formData.cup || ''} onChange={handleChange} className="w-full bg-white text-black border p-2 rounded" /></div>
            <div className="w-1/2"><label className="block text-sm font-bold text-gray-700 mb-1">Precio Botella</label><input type="number" name="bottle" value={formData.bottle || ''} onChange={handleChange} className="w-full bg-white text-black border p-2 rounded" /></div>
          </div>
        </>
      ) : (
        <>
          <div><label className="block text-sm font-bold text-gray-700 mb-1">Título / Nombre</label><input required type="text" name="title" value={formData.title || formData.name || ''} onChange={handleChange} className="w-full bg-white text-black border p-2 rounded" /></div>
          <div className="flex gap-4">
            <div className="w-1/2"><label className="block text-sm font-bold text-gray-700 mb-1">Precio</label><input required type="number" name="price" value={formData.price || ''} onChange={handleChange} className="w-full bg-white text-black border p-2 rounded" /></div>
            {domain !== 'restaurant' && (
              <div className="w-1/2"><label className="block text-sm font-bold text-gray-700 mb-1">Etiqueta/Tag</label><input type="text" name="tag" placeholder="ej. Nuevo" value={formData.tag || formData.badge || ''} onChange={(e) => setFormData({...formData, tag: e.target.value, badge: e.target.value})} className="w-full bg-white text-black border p-2 rounded text-sm" /></div>
            )}
          </div>
          <div><label className="block text-sm font-bold text-gray-700 mb-1">Descripción / Info</label><textarea required name="desc" value={formData.desc || formData.origin || ''} onChange={(e) => setFormData({...formData, desc: e.target.value, origin: e.target.value})} className="w-full bg-white text-black border p-2 rounded h-24" /></div>
          
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <label className="block text-sm font-bold text-gray-700 mb-3">Fotografía del Platillo</label>
            <div className="flex items-center gap-4 mb-3">
              {formData.img ? (
                <img src={formData.img} alt="Preview" className="w-16 h-16 object-cover rounded-lg shadow-sm border border-gray-200" />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                  <span className="material-symbols-outlined text-gray-400">image</span>
                </div>
              )}
              <div className="flex-1 flex flex-col gap-2">
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="w-full text-sm text-gray-500 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 transition-colors" />
                {uploading && <p className="text-xs text-orange-600 font-bold animate-pulse flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">cloud_upload</span> Subiendo instantáneamente...</p>}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true"><div className="w-full border-t border-gray-300"></div></div>
              <div className="relative flex justify-center"><span className="bg-gray-50 px-2 text-[10px] uppercase tracking-wider text-gray-500 font-bold">O usa un enlace de internet</span></div>
            </div>
            <input type="url" name="img" value={formData.img || ''} onChange={handleChange} placeholder="https://..." className="w-full bg-white text-black border p-2 rounded text-xs mt-3" />
          </div>
        </>
      )}
      <div className="flex justify-end gap-2 pt-4 border-t mt-6">
        <button type="button" onClick={onCancel} className="px-4 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded">Cancelar</button>
        <button type="submit" className="px-4 py-2 font-bold bg-orange-600 text-white rounded">Guardar Cambios</button>
      </div>
    </form>
  );
}
