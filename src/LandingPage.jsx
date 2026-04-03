import React from 'react'

function Navbar({ onOpenDemo }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-[0_12px_32px_rgba(25,28,29,0.04)] font-inter antialiased tracking-tight">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4">
        <div className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50">
          MenusClic
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a className="text-orange-600 dark:text-orange-500 font-semibold border-b-2 border-orange-500 pb-1" href="#benefits">Beneficios</a>
          <a className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="#demo">Demo</a>
          <a className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="#process">Proceso</a>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://wa.me/521234567890" 
            className="bg-primary-container text-white px-6 py-2 rounded-lg font-bold hover:bg-primary transition-colors text-sm"
          >
            Inicia tu proyecto
          </a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <span className="text-sm text-primary font-bold tracking-[0.1em] uppercase mb-4 block">La Evolución del Menú</span>
          <h1 className="text-5xl md:text-[4rem] font-extrabold text-on-surface leading-[1.1] tracking-[-0.02em] mb-6">
            Digitaliza tu menú <br /> <span className="text-primary-container">en un solo clic</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
            Elimina los costos de impresión para siempre. Actualiza precios y platos al instante desde tu móvil. Ofrece una experiencia segura y moderna a tus clientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#demo" className="btn-gradient text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg active:scale-95 transition-all text-center">
              Ver Demos en Vivo
            </a>
            <a href="#faq" className="bg-surface-container-high text-on-surface px-8 py-4 rounded-lg font-bold text-lg hover:bg-surface-container-highest transition-all text-center">
              Saber más
            </a>
          </div>
        </div>
        <div className="lg:col-span-6 relative flex justify-center py-0 lg:py-0">
          <img 
            src="/menusclic/menu-volcano.png" 
            className="w-full max-w-full h-auto rounded-[2rem]" 
            alt="Menu Portada" 
          />
        </div>
      </div>
    </section>
  )
}

function Benefits() {
  const benefits = [
    {
      icon: 'print_disabled',
      title: 'Ahorro en Impresión',
      description: 'Olvídate de reimprimir cartas cada vez que cambias un precio o se agota un ingrediente.'
    },
    {
      icon: 'sanitizer',
      title: 'Higiene y Seguridad',
      description: 'Un menú sin contacto físico reduce riesgos y aumenta la confianza de tus clientes más exigentes.'
    },
    {
      icon: 'update',
      title: 'Cambios en Tiempo Real',
      description: '¿Nuevo plato del día? Actualízalo en 30 segundos y será visible para todos tus comensales al instante.'
    }
  ]

  return (
    <section id="benefits" className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Eficiencia sin fronteras</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">Diseñamos herramientas que permiten a los restauradores centrarse en lo que importa: la cocina.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-surface-container-lowest p-8 rounded-xl transition-all hover:bg-surface-bright group">
              <div className="w-14 h-14 bg-primary-container/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-container group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">{benefit.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-on-surface-variant leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DemoGallery({ onOpenDemo }) {
  const demos = [
    {
      id: 'restaurant',
      title: 'Terracotta Bistro',
      description: 'Elegancia cálida y terrosa para restaurantes de autor, bistros y experiencias gastronómicas acogedoras.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCN29S16oxTL3638G_fulIzzjNvlZ8Th1Zq-s9X5l9T4R8OiU5OaHTOklKDvpYhDT5UKXmnOdXtZTttiHdUIHUobOztP_CXeq-EB2r7ZuGra1khZOqEVkeTYoYjEpiz5KeGa3vA9czC1kRE9jGy0EVKDNU3uFXywEfuEGgEjIw1u0Hh1WCY7DOLEDzixSONN4XKRPLfedKcFh0juuWu5K1NQw7EcmLCAdQtFU-z66BXcpTCTEaY0YPQGkKcoVGl1WTUYnmO3olwc8',
      dark: false
    },
    {
      id: 'snack',
      title: 'Snack Attack',
      description: 'Estética rústica y artesanal ideal para food trucks, snacks y locales de comida rápida de alta calidad.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKX7h9xyqBIlp9o-sSOcTcvXauqI69tTj9n6xNPGIhfhfPH49UxqM0nc9L36wNJBVxxQ6j2_ii6YFqPkaXRBUSX3Mvs-ltCXJUGZGTgU1W-U1vn5umvP3T-MRJ2XV3-vRf24redhKahUy7YSGyFy1WTRVv8LYDfPa4-sFKvFZKbzKLSDxrUVssiCLDkfr9OiL1tka9KL6g9l2fK8cINeN0ejOew3rm6jiU217mAhucFQgLiXfzDW7QtRzG6yhDOp0TiXbvwulQ3nw',
      dark: false
    },
    {
      id: 'bar',
      title: 'Bar - Modo Oscuro',
      description: 'Contraste alto y estética nocturna perfecta para coctelerías y locales de copas.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAELzNVjiBToFu6Hhl2AHjSMdBnkqcSZpOrVcTXw5V8ZOE8m7p3MKOw7IWqWrzrfg_MXLgcR1SeDCYFvJD2O29vnfxw30jkhMmziwrxurNL0kWe1Guc9hFXkAOhiJuSh2wgcNLdfHtCs3li8zfAlW_bceFdAkORo0VqyPKoZogTT6qiC5zXuJALvb_T3HUbZ--wzciEgx69ed0KZIv4cciYpfifkhpVVb0cKZqzc-qJ4pJ-TJ7uqpebakfgQYiJ6LG4nRw85lbbIkE',
      dark: true
    }
  ]

  return (
    <section id="demo" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Experiencias Visuales</h2>
            <p className="text-on-surface-variant">Elige el estilo que mejor se adapte a la personalidad de tu establecimiento.</p>
          </div>
          <div className="flex gap-2">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Muestra Gratuita</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demos.map((demo, idx) => (
            <div key={idx} className={`${demo.dark ? 'bg-zinc-900 text-white' : 'bg-surface-container-lowest'} rounded-xl overflow-hidden group border border-outline-variant/10 shadow-sm hover:shadow-xl transition-all duration-300`}>
              <div className="h-64 overflow-hidden relative">
                <img src={demo.img} alt={demo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-bold text-lg">Ver detalles</span>
                </div>
              </div>
              <div className="p-8">
                <h4 className={`text-2xl font-bold mb-2 ${demo.dark ? 'text-white' : ''}`}>{demo.title}</h4>
                <p className={`${demo.dark ? 'text-zinc-400' : 'text-on-surface-variant'} mb-6 text-sm leading-relaxed`}>{demo.description}</p>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenDemo(demo.id);
                  }}
                  className={`w-full font-bold py-3 px-6 rounded-lg transition-all relative z-20 cursor-pointer ${demo.dark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-primary/5 text-primary hover:bg-primary/10'} border border-transparent hover:border-current`}
                >
                  Probar Demo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    { icon: 'palette', title: 'Elige estilo', desc: 'Selecciona entre nuestras plantillas premium diseñadas por expertos en UX gastronómico.' },
    { icon: 'upload_file', title: 'Sube platos', desc: 'Carga tus fotos y descripciones de forma masiva o uno por uno. Nosotros organizamos el resto.' },
    { icon: 'qr_code_2', title: 'Recibe tus QR', desc: 'Descarga tus códigos únicos o solicita el envío de soportes físicos de alta calidad.' }
  ]

  return (
    <section id="process" className="py-24 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-container/5 -skew-x-12 transform translate-x-1/2"></div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-center">Tu menú listo en 3 pasos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center relative">
              <div className="text-8xl font-black text-primary/10 absolute -top-10 left-0 md:left-auto">{idx + 1}</div>
              <div className="w-20 h-20 bg-primary-container text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-xl z-10">
                <span className="material-symbols-outlined text-4xl">{step.icon}</span>
              </div>
              <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
              <p className="text-on-surface-variant">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    { q: '¿Es muy caro el servicio comparado con imprimir mis cartas?', a: 'Al contrario, MenusClic te hace ahorrar dinero. Una sola tanda de impresiones profesionales puede costar más que meses de nuestro servicio. Además, con nosotros no vuelves a gastar ni un peso cuando subas un precio o cambies un platillo; lo actualizas tú mismo en segundos sin volver a la imprenta.' },
    { q: 'No sé mucho de tecnología, ¿es difícil de usar?', a: 'Para nada. Si sabes enviar un mensaje por WhatsApp, sabes usar MenusClic. Nosotros configuramos todo por ti al principio y te entregamos un sistema tan sencillo que actualizar tu menú será tan fácil como cambiar tu foto de perfil.' },
    { q: '¿Qué pasa si se me agota un ingrediente o un platillo a mitad del día?', a: '¡Esa es la mayor ventaja! Entras a tu panel, haces un solo clic y el platillo desaparece de la vista de tus clientes al instante. Así evitas la molestia de que un cliente pida algo que ya no tienes disponible.' },
    { q: '¿A mis clientes les gustará usar un código QR?', a: '¡Les encanta! Es más higiénico (no tocan menús de papel que han pasado por muchas manos), es moderno y les permite ver fotos reales de tu comida. Un cliente que ve una foto apetitosa en su celular, pide más.' },
    { q: '¿Cuánto tiempo tardan en entregarme mi menú listo?', a: 'Somos MenusClic por una razón: la rapidez. Una vez que nos envías tu lista de precios y fotos, tenemos tu menú digital y tus códigos QR listos en menos de 24 horas. Tu negocio puede estar digitalizado mañana mismo.' }
  ]

  return (
    <section id="faq" className="py-24 bg-surface-container-low">
      <div className="max-w-3xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Preguntas Frecuentes</h2>
          <p className="text-on-surface-variant">Todo lo que necesitas saber para dar el salto digital.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="faq-item group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                <h4 className="text-lg font-bold pr-8">{faq.q}</h4>
                <span className="faq-icon material-symbols-outlined transition-transform duration-300">expand_more</span>
              </summary>
              <div className="p-6 pt-0 text-on-surface-variant leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900 w-full py-12 border-t border-zinc-200/10">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-center md:text-left">
          <div className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50">
            MenusClic
          </div>
          <p className="text-[12px] font-inter tracking-widest uppercase font-bold text-zinc-400 dark:text-zinc-600 max-w-sm leading-relaxed">
            © 2024 MENUSCLIC. DIGITALIZACIÓN MAESTRA PARA RESTAURANTES MODERNOS.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 md:justify-end">
          <a className="text-[12px] font-inter tracking-wide uppercase font-medium text-zinc-500 dark:text-zinc-400 hover:text-orange-500 transition-colors" href="#">Política de Privacidad</a>
          <a className="text-[12px] font-inter tracking-wide uppercase font-medium text-zinc-500 dark:text-zinc-400 hover:text-orange-500 transition-colors" href="#">Términos de Servicio</a>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage({ onOpenDemo }) {
  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        onOpenDemo('admin');
        window.location.hash = ''; // clear it
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [onOpenDemo]);

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary/20">
      <Navbar onOpenDemo={onOpenDemo} />
      <main>
        <Hero />
        <Benefits />
        <DemoGallery onOpenDemo={onOpenDemo} />
        <Process />
        <section className="py-24 bg-background">
          <div className="max-w-5xl mx-auto px-8">
            <div className="bg-on-surface text-surface-container-lowest rounded-2xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">¿Listo para modernizarte?</h2>
                <p className="text-surface-dim text-lg">Únete a más de 500 restaurantes que ya usan MenusClic.</p>
              </div>
              <div className="relative z-10 w-full md:w-auto">
                <a href="https://wa.me/521234567890" className="w-full md:w-auto btn-gradient text-white px-10 py-5 rounded-lg font-bold text-xl shadow-2xl hover:scale-105 transition-transform inline-block text-center">
                  Empieza Gratis Ahora
                </a>
              </div>
            </div>
          </div>
        </section>
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/521234567890" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 animate-whatsapp flex items-center justify-center border-2 border-green-400/30 whatsapp-circle"
      aria-label="Contactar por WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}
