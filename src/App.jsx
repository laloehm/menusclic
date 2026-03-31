import React from 'react'

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-[0_12px_32px_rgba(25,28,29,0.04)] font-inter antialiased tracking-tight">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4">
        <div className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50">
          MenusClic
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a className="text-orange-600 dark:text-orange-500 font-semibold border-b-2 border-orange-500 pb-1" href="#benefits">Benefits</a>
          <a className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="#demo">Demo</a>
          <a className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="#process">Process</a>
          <a className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="#pricing">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn-gradient text-white px-6 py-2.5 rounded-lg font-semibold active:scale-95 transition-all duration-150">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="text-sm text-primary font-bold tracking-[0.1em] uppercase mb-4 block">La Evolución del Menú</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-[-0.02em] mb-6">
            Digitaliza tu menú <br /> <span className="text-primary-container">en un solo clic</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
            Elimina los costos de impresión para siempre. Actualiza precios y platos al instante desde tu móvil. Ofrece una experiencia segura y moderna a tus clientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-gradient text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg active:scale-95 transition-all">
              Ver Demos en Vivo
            </button>
            <button className="bg-surface-container-high text-on-surface px-8 py-4 rounded-lg font-bold text-lg hover:bg-surface-container-highest transition-all">
              Saber más
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-2">
            <img
              alt="Digital Menu Preview"
              className="w-full h-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOeOLuoX7wBm6ZEzJAc59pRwOAjPfcHoH4MEXvLDHUxi-RM3lVT6mVaMY-bFFwW0UNkAo0l_cilbEaKJTkm1RAzE4KdZioe_Rz6Ov1k9Ba5Hmo9NN1sGOba5J2CrTglHsvGyvk7yV9tvyYILFSA0rQiE8ECtEERcLF5LQIgXnP13elfpNsJ9GjZsCEpKRqwDspY63BD1aw3UFFbMOfZ2U45pPIpS-W8Tg--7EHpPYL4_C7LwBSicc9ePC2WzIPxpfGFmn8QKiQ5IQ"
            />
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary-container/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary-container/10 rounded-full blur-3xl"></div>
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

function DemoGallery() {
  const demos = [
    {
      title: 'Gourmet',
      description: 'Elegancia minimalista para restaurantes de alta cocina y experiencias exclusivas.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7Ydg4jBoTL_pN6mVd1iZEfnC1-Te5OpG7iSCb0JQWta-3HUOrNvGDET8tzBdNRSE28KGKD2T6FvEcLgYDIw9dsy17IvmIIjZ6ea-NxDsCh2fOuOM_aRjmJJXmcoPI2xVNcEojX_N95s6jq8nHgQd6IrvCjJX86Z7Mn_L6V1JrilEsaWl4UulU7WSE1fBcvg9ffK-7lybdpoA3qzy3oGThOqY4909NEPUDy74dxzUFwQXBywfVzjV58kHcKXVkOg-vXCidYrFS2VQ',
      dark: false
    },
    {
      title: 'Cafetería',
      description: 'Diseño fresco y vibrante ideal para brunch, desayunos y locales desenfadados.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8TZ7Z0ndzwk3zupwKZ4D3QRY9_AUHf_QBONAWoZjMFlo5y5YCKNmcYR9GNYc9zBfX4DZ4Gv55HsWk1UIWZNEgCHp_dT1TCfFszrsd42cEbuyb_pXz3FIdhMjhYhs8vAMKS50T4EG5d1rspaOERfHbo1Ma-IBOSUMygUBkkE9X56J1IVodfrufExy9Odfm18er3wKuEEiV_vkUGcnzIylwFsR5ofwNAw0oTusKYLXw-_LOwTGKAYzst8HaoJ5K7X5pEVANCIC_WY8',
      dark: false
    },
    {
      title: 'Bar-Dark Mode',
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
            <div key={idx} className={`${demo.dark ? 'bg-zinc-900 text-white' : 'bg-surface-container-lowest'} rounded-xl overflow-hidden group`}>
              <div className="h-64 overflow-hidden">
                <img src={demo.img} alt={demo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <h4 className={`text-2xl font-bold mb-2 ${demo.dark ? 'text-white' : ''}`}>{demo.title}</h4>
                <p className={`${demo.dark ? 'text-zinc-400' : 'text-on-surface-variant'} mb-6 text-sm`}>{demo.description}</p>
                <button className={`w-full border-b-2 font-bold py-2 transition-colors ${demo.dark ? 'border-primary-container text-primary-container hover:bg-white/5' : 'border-primary text-primary hover:bg-primary/5'}`}>
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
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-3xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Preguntas Frecuentes</h2>
          <p className="text-on-surface-variant">Todo lo que necesitas saber para dar el salto digital.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="faq-item group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
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
        <div>
          <div className="text-xl font-black text-zinc-900 dark:text-zinc-50 mb-4">MenusClic</div>
          <p className="text-sm font-inter tracking-wide uppercase font-medium text-zinc-500 dark:text-zinc-400">
            © 2024 MenusClic. The Precision Maître D' for Digital Dining.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 md:justify-end">
          <a className="text-sm font-inter tracking-wide uppercase font-medium text-zinc-500 dark:text-zinc-400 hover:text-orange-500 transition-colors" href="#">Privacy Policy</a>
          <a className="text-sm font-inter tracking-wide uppercase font-medium text-zinc-500 dark:text-zinc-400 hover:text-orange-500 transition-colors" href="#">Terms of Service</a>
          <a className="text-sm font-inter tracking-wide uppercase font-medium text-zinc-500 dark:text-zinc-400 hover:text-orange-500 transition-colors" href="#">Contact Support</a>
          <a className="text-sm font-inter tracking-wide uppercase font-medium text-zinc-500 dark:text-zinc-400 hover:text-orange-500 transition-colors" href="#">Instagram</a>
          <a className="text-sm font-inter tracking-wide uppercase font-medium text-zinc-500 dark:text-zinc-400 hover:text-orange-500 transition-colors" href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary/20">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <DemoGallery />
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
                <button className="w-full md:w-auto btn-gradient text-white px-10 py-5 rounded-lg font-bold text-xl shadow-2xl hover:scale-105 transition-transform">
                  Empieza Gratis Ahora
                </button>
              </div>
            </div>
          </div>
        </section>
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default App
