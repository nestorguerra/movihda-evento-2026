/*
 * Datos de la II Reunión MoVIHda Andalucía 2026.
 *
 * CÓMO ACTUALIZAR:
 * - Edita los objetos de abajo directamente (son JS plano, sin build).
 * - Cada sesión tiene "status": "confirmed" o "provisional".
 *   Usa "provisional" para cualquier dato que no esté confirmado por
 *   Ivana / organización para las fechas de septiembre de 2026.
 * - No borres el campo "note" en las sesiones provisionales: es el
 *   aviso que se muestra al usuario.
 * - Guarda el archivo y recarga la app en el navegador, no hace falta
 *   ningún paso de compilación.
 */

const EVENT = {
  name: "II Reunión MoVIHda Andalucía 2026",
  subtitle: "IA, chemsex y aspectos ético-legales en la atención de las PVIH",
  datesLabel: "25–26 de septiembre de 2026",
  city: "Málaga",
  status: "confirmed",
  venue: {
    name: "Hotel Catalonia Molina Lario",
    address: "Calle Molina Lario, 20 · 29015 Málaga",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Hotel+Catalonia+Molina+Lario+Calle+Molina+Lario+20+29015+M%C3%A1laga",
    website: "https://www.cataloniahotels.com/es/hotel/catalonia-molina-lario",
    status: "confirmed",
  },
  agendaNotice:
    "Aún no hay una agenda final publicada para septiembre de 2026. Las sesiones marcadas como “Provisional” proceden del programa de abril y están pendientes de confirmación.",
};

const DAYS = [
  { id: "viernes", label: "Viernes", dateLabel: "25 de septiembre" },
  { id: "sabado", label: "Sábado", dateLabel: "26 de septiembre" },
];

const SESSIONS = [
  {
    id: "vie-intro",
    day: "viernes",
    start: "17:00",
    end: "17:30",
    title: "Introducción a la jornada. Programa y objetivos.",
    speakers: ["Alberto Romero", "Julián Olalla"],
    type: "apertura",
    status: "provisional",
    note: "Procede del programa provisional de abril. Pendiente de confirmación para septiembre.",
  },
  {
    id: "vie-ia-1",
    day: "viernes",
    start: "17:30",
    end: "18:30",
    title: "Bajando la IA a nuestro día a día I",
    speakers: ["Néstor Guerra"],
    type: "ponencia",
    status: "confirmed",
    note: "Horario confirmado por correo y llamada con Ivana.",
  },
  {
    id: "vie-coffee",
    day: "viernes",
    start: "18:30",
    end: "19:00",
    title: "Pausa café",
    speakers: [],
    type: "descanso",
    status: "confirmed",
    note: "Horario confirmado por correo y llamada con Ivana.",
  },
  {
    id: "vie-ia-2",
    day: "viernes",
    start: "19:00",
    end: "20:30",
    title: "Bajando la IA a nuestro día a día II",
    speakers: ["Néstor Guerra"],
    type: "taller",
    status: "confirmed",
    note: "Horario confirmado por correo y llamada con Ivana.",
  },
  {
    id: "sab-gilead",
    day: "sabado",
    start: "09:00",
    end: "09:40",
    title: "Ponencia Gilead",
    speakers: ["Ponente por confirmar"],
    type: "ponencia",
    status: "provisional",
    note: "Procede del programa provisional de abril. Pendiente de confirmación para septiembre.",
  },
  {
    id: "sab-chemsex",
    day: "sabado",
    start: "09:40",
    end: "11:00",
    title: "Taller manejo chemsex y estigma",
    speakers: ["Iván Zaro"],
    type: "taller",
    status: "provisional",
    note: "Procede del programa provisional de abril. Pendiente de confirmación para septiembre.",
  },
  {
    id: "sab-coffee",
    day: "sabado",
    start: "11:00",
    end: "11:20",
    title: "Descanso café",
    speakers: [],
    type: "descanso",
    status: "provisional",
    note: "Procede del programa provisional de abril. Pendiente de confirmación para septiembre.",
  },
  {
    id: "sab-etico-legal",
    day: "sabado",
    start: "11:20",
    end: "12:00",
    title: "Aspectos ético-legales en la atención de las personas con VIH e ITS",
    speakers: ["Miguel Ángel Ramiro"],
    type: "ponencia",
    status: "provisional",
    note: "Procede del programa provisional de abril. Pendiente de confirmación para septiembre.",
  },
  {
    id: "sab-proyecto",
    day: "sabado",
    start: "12:00",
    end: "13:00",
    title: "Del proyecto al estudio",
    speakers: ["Todos los ponentes"],
    type: "mesa",
    status: "provisional",
    note: "Procede del programa provisional de abril. Pendiente de confirmación para septiembre.",
  },
  {
    id: "sab-cierre",
    day: "sabado",
    start: "13:00",
    end: "13:15",
    title: "Conclusiones y cierre de las jornadas",
    speakers: ["Alberto Romero", "Julián Olalla"],
    type: "cierre",
    status: "provisional",
    note: "Procede del programa provisional de abril. Pendiente de confirmación para septiembre.",
  },
];

const SPEAKERS = [
  {
    id: "nestor-guerra",
    name: "Néstor Guerra",
    role: "Experto en innovación e IA",
    status: "confirmed",
  },
  {
    id: "alberto-romero",
    name: "Alberto Romero",
    role: "H.U. Puerto Real · Coordinador en el programa provisional",
    status: "provisional",
  },
  {
    id: "julian-olalla",
    name: "Julián Olalla",
    role: "H. Costa del Sol · Coordinador en el programa provisional",
    status: "provisional",
  },
  {
    id: "ivan-zaro",
    name: "Iván Zaro",
    role: "Director, Imagina Más (Madrid)",
    status: "provisional",
  },
  {
    id: "miguel-angel-ramiro",
    name: "Miguel Ángel Ramiro",
    role: "Profesor de Filosofía del Derecho, Universidad de Alcalá",
    status: "provisional",
  },
];

const MALAGA_LINKS = [
  {
    title: "Ayuntamiento de Málaga",
    desc: "Sitio institucional oficial",
    url: "https://www.malaga.eu/",
  },
  {
    title: "Turismo Málaga",
    desc: "Guía turística municipal oficial",
    url: "https://visita.malaga.eu/",
  },
  {
    title: "Alcazaba y Gibralfaro",
    desc: "Información oficial de los monumentos",
    url: "https://alcazabaygibralfaro.malaga.eu/",
  },
];
