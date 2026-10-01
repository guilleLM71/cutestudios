// Configuración exacta de cada subpágina de invitación de bodas.
// Replica la estructura, secciones, imágenes y animaciones de los modelos.
// Cada sección es opcional: si no existe, no se renderiza.
// Las rutas apuntan a los recursos locales en public/images/models/<slug>/.

const img = (slug, file) => `/images/models/${slug}/${file}`

export const invitationModels = {
  // ==================== PERLA ====================
  perla: {
    splash: { variant: 'standard', names: 'Camila & Alejandro', kicker: 'Nuestra Boda' },
    countdown: '2026-12-12T13:00:00',
    hero: {
      variant: 'script',
      names: ['Camila', 'y', 'Alejandro'],
      intro: 'Tenemos el honor de invitarte a Nuestra Boda',
      sub: '¡Nos casamos!',
      date: { day: '12', month: 'Diciembre', year: 'De 2026' },
    },
    message:
      'Hay momentos en la vida que se guardan para siempre en el corazón, pero se vuelven aún más especiales cuando los compartimos con la gente que amamos, y queremos que nos acompañes.',
    passes: { lead: 'Hemos reservado:', label: 'Pase (s) En tu honor' },
    blessing: {
      title: 'CON LA BENDICIÓN DE DIOS Y DE NUESTROS PADRES',
      groups: [
        { title: 'Padres del Novio', names: ['Lucio Martinez Guzman', 'Carol Vargas Siñani'] },
        { title: 'Padres de la Novia', names: ['Julio Lopez Castillo', 'Sonia Mendoza Quisbert'] },
        { title: 'Padrinos de Civil', names: ['Alex Montes Ulloa', 'Sara Herrera Conde'] },
      ],
    },
    locations: [
      { icon: img('perla', 'icono-iglesia-modelo-perla-boda.gif'), title: 'Ceremonia Religiosa', time: '13:00', place: 'Iglesia San Sebastian' },
      { icon: img('perla', 'icon-copas-modelo-perla-boda.gif'), title: 'Recepción Social', time: '15:00', place: 'Salón de eventos Castrillo' },
    ],
    dress: {
      icons: [img('perla', 'icono-dress-varon-blanco.gif'), img('perla', 'icono-dress-vestido-blanco.gif')],
      title: 'Dress Code',
      text: 'Formal',
    },
    itinerary: {
      title: 'Itinerario',
      decoration: img('perla', 'ciruclos.png'),
      items: [
        { icon: img('perla', 'icono-iglesia-cafe-dorado.gif'), time: '13:45', label: 'Ceremonia Religiosa' },
        { icon: img('perla', 'icono-recepcion-social-cafe-dorado.gif'), time: '16:00', label: 'Recepción Social' },
        { icon: img('perla', 'icono-baile-novios-vals.gif'), time: '17:00', label: 'Vals de los Novios' },
        { icon: img('perla', 'icono-cena-cafe.gif'), time: '19:00', label: 'Una deliciosa Cena' },
        { icon: img('perla', 'icono-torta-cafe-dorado.gif'), time: '21:00', label: 'Partimos la torta' },
        { icon: img('perla', 'icono-novios-cafe-dorado-3.gif'), time: '00:00', label: 'Felices para siempre' },
      ],
    },
    gallery: {
      title: 'Nosotros',
      photos: [1, 2, 3, 4, 5, 6].map((n) => img('perla', `fotos-ejemplo-modelo-perla-${n}.jpg`)),
    },
    share: {
      icon: img('perla', 'icono-camara-fotos-verde.gif'),
      text: 'Te invitamos a compartir los momentos mas especiales de nuestro evento a través de tus fotografías.',
    },
    kids: {
      icon: img('perla', 'nino-o-sin-ninos-icono-verde.gif'),
      text: 'Aunque amamos a sus pequeños este día especial es solo para adultos les pedimos que nos acompañen sin niños.',
    },
    gifts: {
      title: 'Sugerencia de Regalos',
      text: 'Si deseas hacernos un obsequio, agradeceremos de corazón una contribución para nuestra luna de miel y comenzar esta nueva etapa',
      options: [
        { icon: img('perla', 'icono-sobre-cerrado-blanco-2.gif'), text: 'Efectivo en sobres (Habrá un buzón)' },
        { text: 'Cuenta bancaria BCP 10000888888888' },
      ],
    },
    rsvp: {
      title: 'Confirma tu Asistencia',
      texts: ['Será de mucha alegría para nosotros contar con tu compañía en este día tan importante.'],
      signature: ['Camila', 'y', 'Alejandro'],
    },
    footer: '¿Te gustó el diseño?',
  },

  // ==================== MARMOL ====================
  marmol: {
    splash: { variant: 'standard', kicker: 'Nuestra Boda', names: 'Carlos & Carmen' },
    countdown: '2026-10-25T13:00:00',
    hero: {
      variant: 'photo-names',
      kicker: 'Nuestra Boda',
      names: ['Carlos', '&', 'Carmen'],
      photo: img('marmol', 'foto-principal-marmol-boda.png'),
      frame: img('marmol', 'orma-1.png'),
      sub: '¡Nos casamos!',
    },
    quote: {
      text: '“Uno solo puede ser vencido, pero dos pueden resistir. ¡La cuerda de tres hilos no se rompe fácilmente!”',
      source: 'Eclesiastés 4:12',
      decoration: img('marmol', 'orma-1.png'),
    },
    dateBlock: {
      weekday: 'Domingo',
      day: '25',
      month: 'Octubre 2026',
      time: '13:00 hrs.',
      decoration: img('marmol', 'orma-1.png'),
    },
    passes: { lead: 'Querido (a)', passLead: 'Hemos Reservado', label: 'Pase (s) En tu honor' },
    divider: img('marmol', 'rama.png'),
    blessing: {
      title: 'Agradecidos a Nuestros Padres',
      groups: [
        { title: 'PADRES DE LA NOVIA', names: ['José Hernan Saavedra', 'Lizeth del Carmen Osinaga'] },
        { title: 'PADRES DEL NOVIO', names: ['Julio Maldonado Apaza', 'Ruth Quispe Honorio'] },
        { title: 'CONSEJEROS MATRIMONIALES', names: ['Raúl Tancara Huarachi', 'Mónica Laura Fuentes'] },
      ],
    },
    locations: [
      { icon: img('marmol', 'icono-iglesia-cafe-dorado.gif'), title: 'Ceremonia Religiosa', time: '13:00', place: 'Iglesia San Sebastian' },
      { icon: img('marmol', 'icono-dorado-anillo-animado.gif'), title: 'Recepción Social', time: '16:00', place: 'Salón de eventos Castrillo' },
    ],
    itinerary: {
      title: 'Cronograma',
      items: [
        { icon: img('marmol', 'icono-iglesia-cafe-dorado.gif'), time: '13:00', label: 'Ceremonia Religiosa' },
        { icon: img('marmol', 'icono-recepcion-social-cafe-dorado.gif'), time: '16:00', label: 'Recepción Social' },
        { icon: img('marmol', 'icono-baile-novios-vals.gif'), time: '17:00', label: 'vals de los novios' },
        { icon: img('marmol', 'icono-cena-cafe.gif'), time: '18:00', label: 'Una deliciosa Cena' },
        { icon: img('marmol', 'icono-torta-cafe-dorado.gif'), time: '19:00', label: 'Partimos la torta' },
        { icon: img('marmol', 'icono-novios-cafe-dorado-3.gif'), time: '20:00', label: 'Nos vamos a casa' },
      ],
    },
    gallery: {
      title: 'Nosotros',
      photos: [1, 2, 3, 4, 5, 6].map((n) => img('marmol', `foto-ejemplo-marmol-boda-${n}.jpg`)),
    },
    share: {
      icon: img('marmol', 'icono-fotos-camara-dorado.gif'),
      title: 'Comparte tus Fotos',
      text: 'Te invitamos a compartir los momentos mas especiales de nuestro evento a través de tus fotografías.',
    },
    gifts: {
      title: 'Sugerencia de Regalos',
      texts: [
        'Tu presencia es un regalo de Dios para nosotros',
        'Si deseas hacernos un obsequio, agradeceremos de corazón una contribución para nuestra luna de miel y comenzar esta nueva etapa.',
      ],
      options: [
        { icon: img('marmol', 'icono-sobre-cerrado-blanco-2.gif'), text: 'Efectivo en sobres (habrá un buzón)' },
        { text: 'Cuenta bancaria BCP 10000889888888' },
      ],
    },
    kids: {
      decoration: img('marmol', 'orma-1.png'),
      text: 'Aunque amamos a sus pequeños, este día especial es solo para adultos, les pedimos que nos acompañen sin niños.',
    },
    dress: {
      icons: [img('marmol', 'icono-dress-vestido-dorado.gif'), img('marmol', 'icono-dress-varon-dorado.gif')],
      title: 'Código de Vestimenta',
      text: 'Formal – Elegante',
      palette: { label: 'Colores Sugeridos', img: img('marmol', 'colores.png') },
    },
    rsvp: {
      title: 'Confirma tu Asistencia',
      texts: ['Será de mucha alegría para nosotros contar con su compañía en este día tan importante.', '¡Te esperamos!'],
      signature: ['Carlos y Carmen'],
      divider: img('marmol', 'rama.png'),
    },
    footer: '¿Te gustó el diseño?',
  },

  // ==================== TERRA ====================
  terra: {
    splash: {
      variant: 'seal',
      image: img('terra', '274-sello-de-cera-mn-terra.png'),
      hint: 'Dale clic al sello para ingresar a la invitación',
      signoff: 'Atentamente:',
      names: 'Julio y Adriana',
    },
    countdown: '2026-12-26T16:00:00',
    hero: {
      variant: 'seal-hero',
      names: ['Julio y Adriana'],
      sub: '¡Nos casamos!',
      icon: img('terra', 'icono-dorado-anillo-animado.gif'),
      intro:
        'El amor es el acto más valiente, elegir a alguien no solo para caminar juntos, sino para construir sentido en cada paso, mientras convertimos nuestro amor en promesa de vida.',
      intro2: 'Queremos que nos acompañes en nuestro día',
    },
    dateBlock: {
      month: 'Diciembre 2026',
      day: '26',
      time: '16:00 hrs.',
      weekday: 'Sábado',
      icon: img('terra', 'icono-calendario-dorado-animado.gif'),
    },
    message:
      'Nuestro gran día se aproxima y nos encantaría que formaras parte de él. Nos hace mucha ilusión invitarlos a nuestra boda.',
    passes: { lead: 'Para lo que hemos reservado:', label: 'Pase(s) en tu honor' },
    blessing: {
      title: 'CON LA BENDICIÓN DE DIOS Y DE NUESTROS PADRES',
      groups: [
        { title: 'Padres del Novio', names: ['Jose Luis Torrez', 'Andrea Monzon Claure'] },
        { title: 'Padres de la Novia', names: ['Fabio Chura Soliz', 'María López Antesana'] },
      ],
    },
    message2:
      'Contamos los días con el corazón rebosante de ilusión y gratitud, tras un camino lleno de amor, aprendizajes y sueños compartidos. Hoy, con el alma llena de esperanza, aguardamos el momento de unir nuestras vidas ante Dios y celebrar este paso sagrado junto a quienes han sido parte de nuestra historia. Con todo nuestro cariño, los esperamos.',
    locations: [
      { icon: img('terra', 'ca-iconos-animados-1.gif'), title: 'Ceremonia Religiosa', time: '16:00', place: 'Iglesia Macarena' },
      { icon: img('terra', 'ca-iconos-animados-4.gif'), title: 'Recepción Social', time: '18:30', place: 'Salón de Eventos Elianne 2' },
    ],
    dress: {
      title: 'Dress Code',
      items: [
        { icon: img('terra', 'icono-dress-vestido-blanco.gif'), label: 'Damas', text: 'Vestido Largo' },
        { icon: img('terra', 'icono-dress-varon-blanco.gif'), label: 'Varones', text: 'Traje con corbata' },
      ],
      note: 'Les recordamos que el color blanco está reservado para la novia.',
    },
    itinerary: {
      title: 'Itinerario',
      items: [
        { icon: img('terra', 'ca-iconos-animados-1.gif'), label: 'Ceremonia Religiosa', time: '18:00' },
        { icon: img('terra', 'ca-iconos-animados-4.gif'), label: 'Recepción Social', time: '18:30' },
        { icon: img('terra', 'icono-torta-cafe-dorado.gif'), label: 'Partimos la torta', time: '19:00' },
        { icon: img('terra', 'iconos-dorados-un-2.gif'), label: 'Fin de la fiesta', time: '20:00' },
      ],
      noteIcon: img('terra', 'icono-reloj-dorado-animado.gif'),
      note: 'La fiesta comenzará puntualmente, y queremos que disfrutes con nosotros de cada detalle. ¡Te agradeceríamos que llegues a tiempo!',
    },
    gallery: { title: 'Nosotros', photos: [1, 2, 3, 4, 5, 6].map((n) => img('terra', `fotos-modelos-terra-boda-${n}.jpg`)) },
    share: {
      icon: img('terra', 'icono-jb-rr-2.gif'),
      text: 'Te invitamos a compartir los momentos más especiales de nuestro evento a través de tus fotografías.',
    },
    kids: {
      icon: img('terra', 'icono-nino-dorado-animado.gif'),
      text: 'Aunque amamos a los mas pequeños y forman parte de nuestras vidas, deseamos que esta celebración sea solo para adultos. agradecemos su comprensión y cariño.',
    },
    gifts: {
      title: 'Sugerencia de Regalos',
      text: 'Si desean acompañarnos con un detalle, les compartimos las siguientes opciones que hemos preparado:',
      options: [{ icon: img('terra', 'icono-regalo-blanco-mtb.gif'), text: 'Lluvia de sobres en la recepción' }],
    },
    rsvp: {
      title: 'Confirma tu Asistencia',
      texts: [
        'Celebrar nuestro amor es un sueño hecho realidad, y para que sea perfecto, nos encantaría contar contigo en nuestra lista de invitados.',
        'Confírmanos tu asistencia hasta el 30 de Julio de 2026',
      ],
      signature: ['Julio y Adriana'],
      divider: img('terra', 'rama.png'),
    },
    footer: '¿Te gustó el diseño?',
  },

  // ==================== SOBRE ====================
  sobre: {
    splash: {
      variant: 'seal',
      image: img('sobre', '138-sello-de-cera-azul-vj.png'),
      hint: 'Dale click para ingresar',
      names: 'Mateo y Tatiana',
      kicker: 'Nuestra Boda',
    },
    countdown: '2026-12-12T15:00:00',
    hero: {
      variant: 'envelope-hero',
      photo: img('sobre', 'sobre-abierto-foto-principal-modelo-sobre.png'),
      kicker: 'Guarda la fecha',
      date: { day: '12', month: 'Diciembre', year: '2026' },
      kicker2: 'Celebremos Juntos',
      sub: '¡Nos casamos!',
      names: ['Mateo', 'y', 'Tatiana'],
    },
    passes: { lead: 'Hemos reservado un lugar para ti', label: 'Pase (s)' },
    locations: [
      { icon: img('sobre', 'icono-iglesia-ff.png'), title: 'Ceremonia', time: '15:00', place: 'Iglesia San Sebastián' },
      { icon: img('sobre', 'icono-anillos-ff.png'), title: 'Recepción', time: '16:30', place: 'Salón Castrillo' },
    ],
    dividerSeal: img('sobre', '138-sello-de-cera-azul-vj.png'),
    blessing: {
      title: 'Nuestros Padres',
      groups: [
        { title: 'Padres de la novia', names: ['Julio Luciano Martinez', 'Guadalupe Escobar'] },
        { title: 'Padres del novio', names: ['Efrain Pereyra Nuñez', 'Amanda Plata Chaco'] },
        { title: 'Padrinos', names: ['Alexander Revollo Rossi Almendras'] },
      ],
    },
    gallery: { photos: [img('sobre', 'foto-modelo-sobre-boda-3.jpg'), img('sobre', 'foto-modelo-sobre-boda-4.jpg')] },
    itinerary: {
      title: 'ITINERARIO',
      items: [
        { icon: img('sobre', 'icono-iglesia-ff.png'), label: 'Ceremonia', time: '15:00' },
        { icon: img('sobre', 'icono-anillos-ff.png'), label: 'Recepción', time: '16:30' },
        { icon: img('sobre', 'icono-recepcion-ff.png'), label: 'Brindis', time: '17:00' },
        { icon: img('sobre', 'icono-cena-ff.png'), label: 'Cena', time: '18:00' },
        { icon: img('sobre', 'icono-fiesta-musica-ff.png'), label: 'Fiesta y Baile', time: '20:00' },
        { icon: img('sobre', 'icono-corazon-ff.png'), label: 'Despedida', time: '22:00' },
      ],
    },
    dress: {
      title: 'Dress Code',
      text: 'Formal – Elegante',
      details: [
        { img: img('sobre', 'traje-hombres-wl.png'), label: 'Ellos', text: '· Traje Formal · NO Azul Marino · Corbata · Zapatos' },
        { img: img('sobre', 'mujeres-wl.png'), label: 'Ellas', text: '· Vestido largo, sobre o bajo la rodilla · Accesorios a gusto · Tacones' },
        { img: img('sobre', 'colores-sugeridos-wl.png'), label: 'Colores', text: 'No venir de rojo, blanco o beige' },
      ],
    },
    gifts: {
      title: 'Sugerencia de Regalos',
      text: 'Si deseas hacernos un regalo agradeceremos tu aporte para nuestra luna de miel.',
      options: [{ icon: img('sobre', 'multicenter-logo-yc.png'), text: 'Luna de miel' }],
    },
    gallery2: [img('sobre', 'foto-modelo-sobre-boda-5.jpg'), img('sobre', 'foto-modelo-sobre-boda-1.jpg')],
    kids: {
      text: 'Aunque amamos a sus pequeños este día especial es solo para Adultos, les pedimos que nos acompañen SIN NIÑOS.',
    },
    share: { icon: img('sobre', 'icono-camara-ff.png'), title: 'Comparte tus Fotos', text: 'Te invitamos a compartir tus fotografías de nuestra boda' },
    rsvp: {
      title: 'CONFIRMA TU ASISTENCIA',
      texts: ['Será de mucha alegría para nosotros contar con su compañía en este día tan importante.'],
      divider: img('sobre', '138-sello-de-cera-azul-vj.png'),
    },
    footer: '¿Te gustó el diseño?',
  },

  // ==================== CARMESI ====================
  carmesi: {
    splash: { variant: 'standard', names: 'José y Ruth', kicker: 'Nuestra Boda' },
    countdown: '2026-11-25T13:00:00',
    hero: {
      variant: 'photo-names',
      names: ['José y Ruth'],
      photo: img('carmesi', 'foto-principal-modelo-carmesi-boda.png'),
      frame: img('carmesi', 'rosa-lineal-carmesi.png'),
      sub: '¡Nos casamos!',
    },
    calendar: {
      date: '25 · 07 · 26',
      month: 'Noviembre',
      year: '2026',
      highlight: 25,
      weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    },
    message:
      'Casarse es de locos, pero es que nos queremos con locura. Por eso, lo vamos a celebrar con una fiesta y queremos que nos acompañes.',
    passes: { lead: 'Hemos reservado', label: 'Pase (s) En su honor' },
    divider: img('carmesi', 'flores-unidas-carmesi.png'),
    blessing: {
      title: 'CON LA BENDICIÓN DE DIOS Y DE NUESTROS PADRES',
      groups: [
        { title: 'Padres de la Novia', names: ['Lucio Martinez Guzman', 'Carol Vargas Siñani'] },
        { title: 'Padres del Novio', names: ['Julio Lopez Castillo', 'Sonia Mendoza Quisbert'] },
        { title: 'Padrinos', names: ['Alex Montes Ulloa', 'Sara Herrera Conde'] },
      ],
    },
    locations: [
      { icon: img('carmesi', 'iglessia-carmesi.png'), title: 'Ceremonia Religiosa', time: '13:00', place: 'Iglesia San Sebastián' },
      { icon: img('carmesi', 'recepcion-carmesi.png'), title: 'Recepción Social', time: '16:00', place: 'Salón de eventos Castrillo' },
    ],
    itinerary: {
      title: 'Itinerario',
      line: img('carmesi', 'linea-punto-carmesi.png'),
      items: [
        { icon: img('carmesi', 'icono-iglesia-cafe-dorado.gif'), time: '13:00', label: 'Ceremonia religiosa' },
        { icon: img('carmesi', 'icono-dorado-anillo-animado.gif'), time: '16:00', label: 'Recepción social' },
        { icon: img('carmesi', 'icono-torta-cafe-dorado.gif'), time: '19:00', label: 'Partimos la torta' },
        { icon: img('carmesi', 'icono-novios-cafe-dorado-3.gif'), time: '20:00', label: 'Nos vamos a casa' },
      ],
    },
    gallery: {
      title: 'Nosotros',
      photos: [1, 3, 5, 2, 4, 6].map((n) => img('carmesi', `foto-ejemplo-modelo-carmesi-boda-${n}.jpg`)),
    },
    dress: {
      icon: img('carmesi', 'icono-dress-code-modelo-carmesi-boda.png'),
      title: 'Dress Code',
      text: 'Formal – elegante',
      palette: { img: img('carmesi', 'colores-carmesi.png') },
    },
    gifts: {
      title: 'Sugerencia de Regalos',
      text: 'Si deseas hacernos un obsequio, agradeceremos de corazón una contribución para nuestra luna de miel y comenzar esta nueva etapa.',
      options: [
        { icon: img('carmesi', 'sobre.png'), text: 'Efectivo en sobres', sub: '(Habrá un buzón)' },
        { text: 'Cuenta bancaria 0000000000000' },
      ],
    },
    kids: {
      icon: img('carmesi', 'nino-no-carmesi.png'),
      title: 'Con respeto',
      text: 'Aunque amamos a sus pequeños este día especial es solo para ADULTOS, les pedimos que nos acompañen SIN NIÑOS.',
    },
    share: {
      icon: img('carmesi', 'camara-carmesi.png'),
      title: 'Comparte tus Fotos',
      text: 'Te invitamos a compartir los momentos especiales de nuestra boda a través de tus fotografías. Apreciamos que compartan sus recuerdos para que todos podamos revivir esta ocasión tan especial.',
    },
    rsvp: {
      title: 'Confirma tu Asistencia',
      texts: ['¡Te esperamos!', 'Con mucho cariño'],
      signature: ['José y Ruth'],
      divider: img('carmesi', 'flores-unidas-carmesi.png'),
    },
    footer: '¿Te gustó el diseño?',
  },

  // ==================== GERBERA ====================
  gerbera: {
    splash: { variant: 'standard', kicker: 'NUESTRA BODA', names: 'N & A' },
    countdown: '2026-10-24T16:00:00',
    hero: {
      variant: 'initials',
      kicker: 'NUESTRA BODA',
      initialsTop: img('gerbera', 'iniciales-na-blanco.png'),
      flower: img('gerbera', 'flor-roja.png'),
      sub: '¡Nos Casamos!',
      initialsBottom: img('gerbera', 'iniciales-na-cafe.png'),
      photo: img('gerbera', 'mgb-2-modelo.png'),
    },
    dateBlock: { weekday: 'Sábado', day: '24', month: 'Octubre', city: 'Santa Cruz' },
    quote: { text: 'El que no ama, no ha conocido a Dios; porque Dios es Amor.', source: '1 Juan 4:8' },
    passes: { lead: 'Querido (a)', passLead: 'Hemos Reservado', label: 'PASE(S) En tu honor' },
    divider: img('gerbera', 'grupo-de-flore-na.png'),
    blessing: {
      title: 'Con la Bendición de Dios y Nuestros padres',
      groups: [
        { title: 'Padres del Novio', names: ['Liliana Góngora', 'Julio Albarez'] },
        { title: 'Padres de la Novia', names: ['Gabriela Angulo Castro Pizarro'] },
        { title: 'Padrinos', names: ['Sandra Castillo', 'Cristian Caso'] },
      ],
    },
    locations: [
      { icon: img('gerbera', 'iglesia-icono-na.png'), title: 'Ceremonia Religiosa', time: '16:00', place: 'Iglesia San Sebastián' },
      { icon: img('gerbera', 'brindis-icono-na.png'), title: 'Recepción Social', time: '18:00', place: 'Salón de eventos Castrillo' },
    ],
    screensNote:
      'Nuestro anhelo es que este día quede grabado en sus corazones y no en las pantallas. Agradecemos de corazón su comprensión y su complicidad para proteger la esencia y el resguardo de este momento único.',
    itinerary: {
      title: 'Time Line',
      items: [
        { icon: img('gerbera', 'iglesia-icono-na.png'), label: 'Iglesia', time: '16:00' },
        { icon: img('gerbera', 'anillos-icono-na.png'), label: 'Civil', time: '17:30' },
        { icon: img('gerbera', 'vals-icono-na.png'), label: 'Vals', time: '18:00' },
        { icon: img('gerbera', 'brindis-icono-na.png'), label: 'Brindis', time: '18:30' },
        { icon: img('gerbera', 'cena-icono-na.png'), label: 'Cena', time: '19:30' },
        { icon: img('gerbera', 'fiesta-icono-na.png'), label: 'Baile', time: '20:30' },
        { icon: img('gerbera', 'torta-icono-na.png'), label: 'Torta', time: '22:00' },
        { icon: img('gerbera', 'camara-icono-na.png'), label: 'Fotos', time: '23:00' },
        { icon: img('gerbera', 'corazon.png'), label: 'Fin', time: '02:00' },
      ],
    },
    dress: {
      title: 'Código de Vestimenta',
      text: 'Formal',
      note: 'Por favor respetar el código de vestimenta.',
      icon: img('gerbera', 'vestimenta-icono-na.png'),
      palette: {
        label: 'Damas y caballeros por favor eviten los siguientes colores:',
        text: 'Blanco, beige, crema, hueso y caqui',
        img: img('gerbera', 'paleta-de-colores-na.png'),
      },
    },
    divider2: img('gerbera', 'grupo-de-flore-na.png'),
    kids: { icon: img('gerbera', 'icono-jb-r3.png'), title: 'Con Respeto', text: 'Aunque amamos a nuestros pequeños, este día especial es solo para adultos. Les pedimos que nos acompañen sin niños.' },
    gifts: { title: 'Sugerencia de Regalos', text: 'Si desean hacernos un regalo en efectivo será bienvenido en el día del evento.' },
    share: {
      icon: img('gerbera', 'camara-icono-na.png'),
      title: 'Compartir Fotos',
      text: 'Te invitamos a compartir los momentos mas especiales de nuestro boda a través de tus fotografías.',
    },
    rsvp: {
      title: 'Confirma tu Asistencia',
      texts: ['Será de mucha alegría para nosotros contar con tu compañía en este día tan importante.'],
      divider: img('gerbera', 'iniciales-na-cafe.png'),
      divider2: img('gerbera', 'grupo-de-flore-na.png'),
    },
    footer: '¿Te gustó el diseño?',
  },

  // ==================== CARTA ====================
  carta: {
    splash: {
      variant: 'envelope',
      left: img('carta', 'sobre-mitad-izquierda.png'),
      right: img('carta', 'sobre-mitad-derecha.png'),
      seal: img('carta', '98-sello-ramas-boda-cyj-3.png'),
      hint: 'Dale clic al sello para abrir el sobre',
      names: 'Caleb & Judith',
      kicker: 'Nuestra Boda',
    },
    countdown: '2027-08-26T16:30:00',
    hero: {
      variant: 'letter',
      kickerTop: 'HEMOS DECIDIDO DECIR SI PARA TODA LA VIDA',
      initials: img('carta', '98-monograma-cj-blanco-1.png'),
      names: ['CALEB', '&', 'JUDITH'],
      intro: 'TENEMOS EL HONOR DE INVITARLOS A CELEBRAR NUESTRA UNIÓN',
      date: { month: 'AGOSTO', day: '26', year: '2027' },
      heart: img('carta', 'icono-corazon-verde-olivo-modelo-carta-lineal.png'),
    },
    quote: {
      text: '“Y si alguno prevalece contra el que está solo, dos estarán contra él, pues cordón de tres dobleces no se rompe pronto.”',
      source: 'Eclesiastés 4:12',
      initials: img('carta', '98-monograma-cj-blanco-1.png'),
    },
    passes: { lead: 'CON MUCHO CARIÑO HEMOS RESERVADO UN LUGAR PARA TI' },
    divider: img('carta', '98-rosa-bordado-cyj.png'),
    blessing: {
      title: 'Nuestros Padres',
      seal: img('carta', '98-sello-ramas-boda-cyj-3.png'),
      groups: [
        { title: 'PADRES DE LA NOVIA', names: ['Jose Richard Costas Quiroz', 'Sandra Aracely Antezana de Costas'] },
        { title: 'PADRES DEL NOVIO', names: ['Rogelio Rodriguez Padilla', 'Lilian Castro de Rodriguez'] },
      ],
    },
    gallery: { photos: [img('carta', 'foto-plantilla-carta-novios-1.jpg')] },
    locations: [
      { icon: img('carta', 'icono-iglesia-lineal-modelo-carta-verde-olivo.png'), title: 'CEREMONIA', time: '16:30', place: 'IGLESIA MACARENA' },
      { icon: img('carta', '98-icono-recepcion-ceremonia-ubicacion-blanco-cyj.png'), title: 'RECEPCIÓN', time: '16:30', place: 'FRATERNIDAD JARUBICHIS' },
    ],
    dress: {
      title: 'dress code',
      text: 'FORMAL - ELEGANTE',
      icon: img('carta', '98-icono-dress-code-cyj-3.png'),
      note: 'Nos reservamos el color Blanco para la Novia',
    },
    gallery15: [img('carta', 'foto-plantilla-carta-novios-3.jpg')],
    itinerary: {
      title: 'ITINERARIO',
      dashed: true,
      items: [
        { icon: img('carta', '98-icono-novios-cyj.png'), label: 'Ceremonia Religiosa', time: '16:30' },
        { icon: img('carta', '98-icono-recepcion-plomocyj.png'), label: 'Recepción Social', time: '18:00' },
        { icon: img('carta', '98-icono-cena-cyj.png'), label: 'Cena', time: '20:00' },
        { icon: img('carta', '98-icono-fiesta-cyj.png'), label: 'Comienza la fiesta', time: '21:00' },
      ],
    },
    gallery2: [img('carta', 'foto-plantilla-carta-novios-6.jpg'), img('carta', 'foto-plantilla-carta-novios-2.jpg'), img('carta', 'foto-plantilla-carta-novios-7.jpg')],
    kids: { title: 'IMPORTANTE', text: 'Aunque amamos a sus pequeños este día especial es solo para Adultos, les pedimos que nos acompañen SIN NIÑOS.' },
    gifts: {
      icon: img('carta', '98-icono-regalo-blanco-cyj.png'),
      title: 'SUGERENCIA DE REGALOS',
      text: 'NUESTRO MEJOR REGALO ES DISFRUTAR ESTE DÍA CONTIGO, PERO SI QUIERES TENER UN DETALLE CON NOSOTROS PREPARAMOS LAS SIGUIENTES OPCIONES.',
      options: [{ text: 'Lluvia de sobres en la recepción' }],
    },
    gallery3: [img('carta', 'foto-plantilla-carta-novios-5.jpg')],
    cta: { title: '¡PREPARATE!', text: 'NOS VEMOS DENTRO DE' },
    share: {
      icon: img('carta', 'icono-camara-lineal-modelo-carta-blanco.png'),
      title: 'Comparte tus Fotos',
      text: 'Te invitamos a compartir tus fotografias de nuestra boda',
    },
    rsvp: {
      title: 'CONFIRMA TU ASISTENCIA',
      texts: ['Será de mucha alegría para nosotros contar con su compañía en este día tan importante.'],
      divider: img('carta', '98-monograma-cj-blanco-1.png'),
    },
    footer: '¿Te gustó el diseño?',
  },

  // ==================== PASAPORTE ====================
  pasaporte: {
    splash: { variant: 'standard', kicker: 'PASAPORTE', sub: 'A Nuestra Boda', names: 'J & A', initials: img('pasaporte', '56-ja-monograma.png') },
    countdown: '2026-12-27T09:45:00',
    hero: {
      variant: 'passport',
      kicker: 'NOS CASAMOS',
      photo: img('pasaporte', 'modelo-plantilla-pasaporte-foto-pareja-2.jpg'),
      card: [
        { label: 'TIPO:', value: 'MATRIMONIO' },
        { label: 'NÚMERO DE PASAPORTE:', value: '27.12.26' },
      ],
      date: { month: 'DICIEMBRE', day: '27', time: '9:45 AM.' },
      fields: [
        { label: 'NOVIO:', value: 'Javier Alvarez' },
        { label: 'NOVIA:', value: 'Anahí Lobo' },
        { label: 'DESTINO:', value: '¡A la Felicidad!' },
      ],
      quote: 'Habrán miles de personas en el mundo, pero yo te elijo a ti.',
    },
    message: {
      title: 'NUESTRA BODA',
      text: '¡ Nuestro amor no tiene fronteras, hoy sellamos el viaje de nuestras vidas !',
      initials: img('pasaporte', '56-ja-monograma.png'),
      text2: 'TE INVITAMOS A SER PARTE DE NUESTRA TAN ANHELADA BODA.',
    },
    blessing: {
      title: 'Agradecimientos',
      intro: 'Con amor y gratitud, agradecemos a nuestros padres por acompañarnos en este paso tan importante de nuestras vidas.',
      groups: [
        { title: 'PADRES DEL NOVIO', names: ['Fabian Alvarez', 'Laura García'] },
        { title: 'PADRES DE LA NOVIA', names: ['Pedro Alfonso', 'Juana Lobo'] },
      ],
    },
    passportStamp: img('pasaporte', 'brujula-icono-azul-celeste-ja.png'),
    passes: { lead: 'PRIMERA CLASE', label: 'TU ASISTENCIA ES MUY IMPORTATE PARA NOSOTROS', nameLead: 'Sr.(a):' },
    locations: [
      { icon: img('pasaporte', '149-templo-sarco-ar.png'), title: 'CEREMONIA DE UNIÓN', place: 'Iglesia Nuestra Señora de la Merced Templo Sarco' },
      { icon: img('pasaporte', '149-salon-la-casona-ar.png'), title: 'RECEPCIÓN', place: "Salón La Casona d'Isale" },
    ],
    itinerary: {
      title: 'Itinerario',
      items: [
        { icon: img('pasaporte', 'icono-azul-iglesia-ja.png'), label: 'CEREMONIA DE UNIÓN', time: '09:45' },
        { icon: img('pasaporte', 'icono-azul-recepcion-ja.png'), label: 'RECEPCIÓN SOCIAL', time: '15:00' },
        { icon: img('pasaporte', 'icono-azul-brindis-ja.png'), label: 'ACTO CENTRAL', time: '17:00' },
        { icon: img('pasaporte', 'icono-cena-azul-dibujo-ja.png'), label: 'CENA', time: '19:00' },
        { icon: img('pasaporte', 'icono-azul-dibujo-ja.png'), label: 'SIGAMOS CELEBRANDO', time: '20:00' },
        { icon: img('pasaporte', 'icono-azul-despedida-dibujo-ja.png'), label: 'FELICES POR SIEMPRE', time: '00:00' },
      ],
    },
    gallery: {
      photos: [1, 2, 3, 4].map((n) => img('pasaporte', `modelo-plantilla-pasaporte-foto-pareja-${n}.jpg`)),
    },
    gifts: {
      icon: img('pasaporte', 'regalo-icono-ilustracion-ja.png'),
      title: 'Sugerencia de Regalos',
      text: 'El mejor regalo es contar con su presencia en este día tan especial. Si desean tener un detalle, con cariño recibiremos sus obsequios o, si lo prefieren, pueden hacerlo mediante depósito en nuestra cuenta QR.',
      options: [{ text: 'BANCO BISA', sub: 'Cta. 7777777777' }],
    },
    final: {
      kicker: 'NOS VEMOS PRONTO',
      title: 'Bienvenido a Bordo',
      text: '¡El único equipaje que necesitas son las ganas de pasarla bien!',
      image: img('pasaporte', '56-maleta-boda-ja.png'),
    },
    rsvp: {
      title: 'Confirma tu Asistencia',
      texts: ['Tu asistencia es muy importante para nosotros.'],
      signature: ['Javier y Anahí'],
    },
    footer: '¿Te gustó el diseño?',
  },
}

export function getModel(slug) {
  return invitationModels[slug] || null
}
