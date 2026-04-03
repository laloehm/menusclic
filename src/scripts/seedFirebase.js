import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGbD0R3bnfFpxNd18yG7Frx4chBcwdmKk",
  authDomain: "menusclic.firebaseapp.com",
  projectId: "menusclic",
  storageBucket: "menusclic.firebasestorage.app",
  messagingSenderId: "805313627940",
  appId: "1:805313627940:web:8be60d3c390b474b2ad5b1",
  measurementId: "G-K7S4G9BCLP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const restaurantItems = [
  { id: 1, category: 'desayunos', title: 'Chilaquiles Verdes', price: 120, desc: 'Con pollo deshebrado, crema, queso fresco y cebolla morada.', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38' },
  { id: 2, category: 'desayunos', title: 'Huevos Motuleños', price: 115, desc: 'Sobre tortilla frita con frijoles, salsa roja, jamón, chícharos y plátano macho.', img: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543' },
  { id: 3, category: 'desayunos', title: 'Omelette de Espinacas', price: 130, desc: 'Con queso de cabra y una guarnición de espárragos al grill.', img: 'https://images.unsplash.com/photo-1493770348161-369560ae357d' },
  { id: 4, category: 'desayunos', title: 'Pan Francés', price: 95, desc: 'Brioche artesanal con frutos rojos frescos y miel de maple pura.', img: 'https://images.unsplash.com/photo-1493770348161-369560ae357d' },
  { id: 5, category: 'desayunos', title: 'Molletes Tradicionales', price: 85, desc: 'Birote crujiente con frijoles refritos, queso fundido y pico de gallo.', img: 'https://images.unsplash.com/photo-1599307767316-776533bb941c' },
  { id: 6, category: 'desayunos', title: 'Enchiladas Suizas', price: 140, desc: 'Rellenas de pollo, bañadas en salsa verde cremosa y queso gratinado.', img: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f' },
  { id: 7, category: 'entradas', title: 'Guacamole Premium', price: 95, desc: 'Aguacate hass machacado con totopos de maíz azul y queso cotija.', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38' },
  { id: 8, category: 'entradas', title: 'Calamares Fritos', price: 140, desc: 'Aros de calamar crujientes acompañados de alioli de ajo rostizado.', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d' },
  { id: 9, category: 'entradas', title: 'Carpaccio de Res', price: 165, desc: 'Láminas finas de solomillo con alcaparras, parmesano y aceite de trufa.', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288' },
  { id: 10, category: 'entradas', title: 'Tabla de Quesos', price: 280, desc: 'Selección de quesos maduros y carnes frías con frutos secos.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591' },
  { id: 11, category: 'entradas', title: 'Bruschettas Tomate', price: 90, desc: 'Pan rústico tostado con tomate concassé, albahaca fresca y olivo.', img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371' },
  { id: 12, category: 'entradas', title: 'Empanadas Argentinas', price: 85, desc: 'Dos piezas: una de carne cortada a cuchillo y una de elote con queso.', img: 'https://images.unsplash.com/photo-1599307767316-776533bb941c' },
  { id: 13, category: 'comidas', title: 'Pollo al Grill', price: 180, desc: 'Pechuga marinada en finas hierbas con verduras salteadas al wok.', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d' },
  { id: 14, category: 'comidas', title: 'Pescado a la Talla', price: 220, desc: 'Filete fresco del día marinado en adobo de chiles secos, asado a las brasas.', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288' },
  { id: 15, category: 'comidas', title: 'Pasta Alfredo', price: 195, desc: 'Fettuccine en salsa cremosa de parmesano con camarones salteados.', img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601' },
  { id: 16, category: 'comidas', title: 'Hamburguesa Wagyu', price: 250, desc: '200g de carne Wagyu, queso cheddar añejo y papas trufadas.', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd' },
  { id: 17, category: 'comidas', title: 'Arrachera Norteña', price: 280, desc: 'Corte suave de 300g con chiles toreados, cebollitas y guacamole.', img: 'https://images.unsplash.com/photo-1544025162-d76694265947' },
  { id: 18, category: 'comidas', title: 'Lasaña de Carne', price: 165, desc: 'Capas de pasta fresca con boloñesa tradicional y mezcla de quesos.', img: 'https://images.unsplash.com/photo-1619895092538-128341789043' },
  { id: 19, category: 'cenas', title: 'Pizza Prosciutto', price: 210, desc: 'Base delgada con salsa de tomate italiana, mozzarella, prosciutto y rúcula.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591' },
  { id: 20, category: 'cenas', title: 'California Roll', price: 185, desc: 'Sushi de cangrejo premium, pepino, aguacate y masago.', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c' },
  { id: 21, category: 'cenas', title: 'Risotto de Hongos', price: 230, desc: 'Arroz arborio cremoso con variedad de hongos silvestres y parmesano.', img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371' },
  { id: 22, category: 'cenas', title: 'Ensalada de Salmón', price: 175, desc: 'Mix de lechugas, salmón ahumado, alcaparras y aderezo de eneldo.', img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601' },
  { id: 23, category: 'cenas', title: 'Tacos de Rib Eye', price: 190, desc: 'Tres tacos de rib eye prime en tortilla de harina con costra de queso.', img: 'https://images.unsplash.com/photo-1544025162-d76694265947' },
  { id: 24, category: 'cenas', title: 'Sopa de Cebolla', price: 110, desc: 'Receta francesa clásica con costrón de pan y queso Gruyère gratinado.', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd' },
  { id: 25, category: 'postres', title: 'Pastel Chocolate', price: 90, desc: 'Intenso bizcocho de chocolate al 70% con núcleo fundido.', img: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e' },
  { id: 26, category: 'postres', title: 'Cheesecake NY', price: 85, desc: 'Clásica receta neoyorquina con coulis de frutos rojos.', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad' },
  { id: 27, category: 'postres', title: 'Tiramisú Clásico', price: 95, desc: 'Bizcocho soletilla embebido en café expresso y crema de mascarpone.', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9' },
  { id: 28, category: 'postres', title: 'Helado Artesanal', price: 65, desc: 'Tres bolas a elegir: Vainilla de Papantla, Chocolate Belga o Fresa Natural.', img: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f' },
  { id: 29, category: 'postres', title: 'Flan Napolitano', price: 60, desc: 'Suave flan casero con caramelo artesanal y nuez picada.', img: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e' },
  { id: 30, category: 'postres', title: 'Brownie con Helado', price: 75, desc: 'Brownie tibio con nueces y una bola de helado de vainilla.', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad' },
  { id: 31, category: 'bebidas', title: 'Limonada con Chía', price: 45, desc: 'Refrescante limonada natural con semillas de chía hidratadas.', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd' },
  { id: 32, category: 'bebidas', title: 'Café Americano', price: 40, desc: 'Grano de altura 1organico recién molido.', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93' },
  { id: 33, category: 'bebidas', title: 'Vino Tinto (Copa)', price: 120, desc: 'Nuestra selección de la casa, tinto joven equilibrado.', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3' },
  { id: 34, category: 'bebidas', title: 'Cerveza Artesanal', price: 85, desc: 'Estilo Pale Ale local, con notas cítricas y refrescantes.', img: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13' },
  { id: 35, category: 'bebidas', title: 'Té Helado Durazno', price: 45, desc: 'Infusión en frío de té negro con extracto natural de durazno.', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd' },
  { id: 36, category: 'bebidas', title: 'Jugo Naranja', price: 55, desc: '100% natural, recién exprimido del día.', img: 'https://images.unsplash.com/photo-1542336391-ae2936d8efe4' }
];

const snackItems = [
  { id: 1, title: 'Alitas de Pollo', price: '145', tag: 'Crujientes', desc: 'Alitas bañadas en salsa búfalo artesanal, servidas con apio y aderezo ranch.', img: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2' },
  { id: 2, title: 'Nuggets de Pollo', price: '99', desc: 'Nuggets de pechuga de pollo premium con un empanizado dorado y crujiente.', img: 'https://images.unsplash.com/photo-1562967914-608f82629710' },
  { id: 3, title: 'Banderillas', price: '75', desc: 'Clásicas banderillas de salchicha con una masa dulce y crujiente, servidas con mostaza y kértchup.', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d' },
  { id: 4, title: 'Salchipulpos', price: '89', desc: 'Divertidas salchichas en forma de pulpo fritas a la perfección sobre una cama de papas fritas.', img: 'https://images.unsplash.com/photo-1521305916504-4a1121188589' },
  { id: 5, title: 'Nachos con Queso', price: '110', tag: 'Clásico', desc: 'Nachos de maíz crujientes bañados en deliciosa salsa de queso cheddar caliente y rodajas de jalapeño.', img: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d' },
  { id: 6, title: 'Papas a la Francesa', price: '65', desc: 'Papas corte delgado, fritas al momento y sazonadas con sal de mar.', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd' }
];

const barFeatured = [
  { id: 1, title: 'Old Fashioned', price: 140, desc: 'Bourbon, amargos, azúcar y un toque cítrico. Servido sobre una esfera de hielo tallada a mano.', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', badge: 'Selección The Reserve', category: 'destacados' },
  { id: 2, title: 'Dry Martini', price: 160, desc: 'Ginebra London Dry, vermut seco y amargos de naranja. Agitado o revuelto a la perfección.', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd', badge: 'Premium', category: 'destacados' },
  { id: 3, title: 'Negroni', price: 150, desc: 'Partes iguales de ginebra, vermut dulce y Campari. Un equilibrio amargo-dulce de excelencia botánica.', img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87', badge: 'Clásico', category: 'destacados' }
];

const barTequilas = [
  { id: 4, name: 'Don Julio 70', cup: 180, bottle: 2800, category: 'tequilas' },
  { id: 5, name: 'Jose Cuervo Tradicional', cup: 120, bottle: 1600, category: 'tequilas' },
  { id: 6, name: 'Casa Dragones Blanco', cup: 210, bottle: 3200, category: 'tequilas' },
  { id: 7, name: 'Maestro Dobel Diamante', cup: 170, bottle: 2600, category: 'tequilas' }
];

const barWhisky = [
  { id: 8, name: 'Johnnie Walker Black Label', cup: 160, bottle: 2400, category: 'whisky' },
  { id: 9, name: 'Jack Daniel\'s', cup: 130, bottle: 1800, category: 'whisky' },
  { id: 10, name: 'Buchanan\'s 12', cup: 150, bottle: 2100, category: 'whisky' },
  { id: 11, name: 'Macallan 12', cup: 240, bottle: 3800, category: 'whisky' }
];

const barRon = [
  { id: 12, name: 'Bacardí Blanco', cup: 90, bottle: 1100, category: 'ron' },
  { id: 13, name: 'Captain Morgan', cup: 100, bottle: 1300, category: 'ron' },
  { id: 14, name: 'Zacapa 23', cup: 220, bottle: 3200, category: 'ron' },
  { id: 15, name: 'Matusalem Platino', cup: 110, bottle: 1500, category: 'ron' }
];

const cervezas = [
  { id: 16, name: 'Corona Extra', origin: '355ml', price: 45, category: 'cervezas' },
  { id: 17, name: 'Modelo Especial', origin: '355ml', price: 50, category: 'cervezas' },
  { id: 18, name: 'Victoria', origin: '355ml', price: 45, category: 'cervezas' },
  { id: 19, name: 'Artesanal IPA', origin: 'Boutique Brew', price: 85, category: 'cervezas' },
  { id: 20, name: 'Stella Artois', origin: '330ml Importada', price: 65, category: 'cervezas' }
];

const sinAlcohol = [
  { id: 21, name: 'Limonada Natural', desc: 'Recién exprimida', price: 45, category: 'sin-alcohol' },
  { id: 22, name: 'Naranjada', desc: 'Con agua mineral o natural', price: 45, category: 'sin-alcohol' },
  { id: 23, name: 'Refrescos Variados', desc: '355ml', price: 35, category: 'sin-alcohol' },
  { id: 24, name: 'Agua Mineral Perrier', desc: '330ml', price: 65, category: 'sin-alcohol' },
  { id: 25, name: 'Mocktail Frutos Rojos', desc: 'Mezcla cítrica artesanal', price: 85, category: 'sin-alcohol' }
];

const barItems = [...barFeatured, ...barTequilas, ...barWhisky, ...barRon, ...cervezas, ...sinAlcohol];

async function seed() {
  console.log("Seeding started...");
  
  for (const item of restaurantItems) {
    await setDoc(doc(db, "restaurant_items", `item_${item.id}`), item);
  }
  console.log("Restaurant items seeded.");

  for (const item of snackItems) {
    await setDoc(doc(db, "snack_items", `item_${item.id}`), item);
  }
  console.log("Snack items seeded.");

  for (const item of barItems) {
    await setDoc(doc(db, "bar_items", `item_${item.id}`), item);
  }
  console.log("Bar unified items seeded.");
  
  console.log("Seeding complete! You can exit (Ctrl+C).");
  process.exit(0);
}

seed().catch(console.error);
