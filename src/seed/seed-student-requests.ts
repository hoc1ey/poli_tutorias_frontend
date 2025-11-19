import { PaginatedStudentRequests } from "@/interfaces";

export const studentRequestsSeedData: PaginatedStudentRequests = {
  totalItems: 10,
  limit: 10,
  currentPage: 1,
  totalPages: 1,
  requests: [
    {
      requestId: "REQ-001",
      date: new Date("2025-11-20T10:00:00Z"),
      hours: ["14:00", "15:00"],
      price: 30.00,
      paymentMethod: "transfer",
      status: "scheduled",
      offer: {
        id: "offer-001",
        slug: "calculo-diferencial-ingenieria-civil-ramos",
        subject: "Cálculo Diferencial",
        career: "Ingeniería Civil",
        description: "Tutorías intensivas para superar el examen de Cálculo I.",
        indications: "Clases grupales e individuales.",
        mode: "in-person",
        image: "/offers/default.jpg",
        createdAt: new Date("2025-10-25T22:22:06Z"),
        tutor: {
          name: "Daniela",
          primaryPhone: "0991234567",
          image: "/profiles/daniela_ramos.jpg",
          schedule: {
            days: [
              { name: "Lunes", slots: [{ hour: "08:00", state: "available" }] }
            ]
          }
        },
        price: 0
      }
    },
    {
      requestId: "REQ-002",
      date: new Date("2025-11-21T10:00:00Z"),
      hours: ["09:00"],
      price: 15.00,
      paymentMethod: "cash",
      status: "pending",
      offer: {
        id: "offer-002",
        slug: "poo-ingenieria-de-sistemas-mendoza",
        subject: "Programación Orientada a Objetos (POO)",
        career: "Ingeniería de Sistemas",
        description: "Curso práctico de Java para entender a fondo la POO.",
        indications: "Material de ejercicios incluido.",
        mode: "online",
        image: "/offers/default.jpg",
        createdAt: new Date("2025-10-25T22:22:07Z"),
        tutor: {
          name: "Andrés",
          primaryPhone: "0991234568",
          image: "/profiles/andres_mendoza.jpg",
          schedule: {
            days: [
              { name: "Miércoles", slots: [{ hour: "16:00", state: "occupied" }] }
            ]
          }
        },
        price: 0
      }
    },
    {
      requestId: "REQ-003",
      date: new Date("2025-11-22T10:00:00Z"),
      hours: ["18:00", "19:00"],
      price: 50.00,
      paymentMethod: "transfer",
      status: "conflict",
      offer: {
        id: "offer-003",
        slug: "fisica-general-ingenieria-electrica-perez",
        subject: "Física General",
        career: "Ingeniería Eléctrica",
        description: "Refuerzo en conceptos clave de Mecánica.",
        indications: "Énfasis en resolución de problemas tipo prueba.",
        mode: "in-person",
        image: "/offers/default.jpg",
        createdAt: new Date("2025-10-25T22:22:08Z"),
        tutor: {
          name: "Gabriela",
          primaryPhone: "0991234569",
          image: "/profiles/gabriela_perez.jpg",
          schedule: { days: [] }
        },
        price: 0
      }
    },
    {
      requestId: "REQ-004",
      date: new Date("2025-11-23T10:00:00Z"),
      hours: ["11:00"],
      price: 22.00,
      paymentMethod: "cash",
      status: "scheduled",
      offer: {
        id: "offer-004",
        slug: "termodinamica-ingenieria-mecanica-solis",
        subject: "Termodinámica",
        career: "Ingeniería Mecánica",
        description: "Análisis de ciclos de potencia y refrigeración.",
        indications: "Sesiones de 2 horas. Incluye material de referencia.",
        mode: "online",
        image: "/offers/default.jpg",
        createdAt: new Date("2025-10-25T22:22:09Z"),
        tutor: {
          name: "Javier",
          primaryPhone: "0991234570",
          image: "/profiles/javier_solis.jpg",
          schedule: { days: [{ name: "Jueves", slots: [{ hour: "18:00", state: "available" }] }] }
        },
        price: 0
      }
    },
    {
      requestId: "REQ-005",
      date: new Date("2025-11-24T10:00:00Z"),
      hours: ["10:00"],
      price: 20.00,
      paymentMethod: "transfer",
      status: "pending",
      offer: {
        id: "offer-005",
        slug: "quimica-organica-ingenieria-quimica-vasquez",
        subject: "Química Orgánica",
        career: "Ingeniería Química",
        description: "Clases de refuerzo en nomenclatura, reacciones y estereoquímica.",
        indications: "Se resuelven guías de laboratorio.",
        mode: "in-person",
        image: "/offers/default.jpg",
        createdAt: new Date("2025-10-25T22:22:11Z"),
        tutor: {
          name: "Carlos",
          primaryPhone: "0991234572",
          image: "/profiles/carlos_vasquez.jpg",
          schedule: { days: [{ name: "Lunes", slots: [{ hour: "19:00", state: "available" }] }] }
        },
        price: 0
      }
    },
    {
      requestId: "REQ-006",
      date: new Date("2025-11-25T10:00:00Z"),
      hours: ["16:00"],
      price: 22.00,
      paymentMethod: "cash",
      status: "scheduled",
      offer: {
        id: "offer-006",
        slug: "algebra-lineal-matematica-lopez",
        subject: "Álgebra Lineal",
        career: "Matemática",
        description: "Dominio de espacios vectoriales, transformaciones lineales.",
        indications: "Material de estudio adaptado al pénsum.",
        mode: "online",
        image: "/offers/default.jpg",
        createdAt: new Date("2025-10-25T22:22:12Z"),
        tutor: {
          name: "María",
          primaryPhone: "0991234573",
          image: "/profiles/maria_lopez.jpg",
          schedule: { days: [{ name: "Martes", slots: [{ hour: "09:00", state: "requested" }] }] }
        },
        price: 0
      }
    },
    {
      requestId: "REQ-007",
      date: new Date("2025-11-26T10:00:00Z"),
      hours: ["07:00", "08:00"],
      price: 36.00,
      paymentMethod: "transfer",
      status: "conflict",
      offer: {
        "id": "offer-007",
        slug: "analisis-financiero-administracion-empresas-flores",
        subject: "Análisis Financiero",
        career: "Administración de Empresas (FCA)",
        description: "Interpretación de estados financieros, ratios de liquidez.",
        indications: "Se trabaja con casos de estudio.",
        mode: "in-person",
        image: "/offers/default.jpg",
        createdAt: new Date("2025-10-25T22:22:13Z"),
        tutor: {
          name: "Ricardo",
          primaryPhone: "0991234574",
          image: "/profiles/ricardo_flores.jpg",
          schedule: { days: [{ name: "Miércoles", slots: [{ hour: "11:00", state: "available" }] }] }
        },
        price: 0
      }
    },
    {
      requestId: "REQ-008",
      date: new Date("2025-11-27T10:00:00Z"),
      hours: ["17:00"],
      price: 18.00,
      paymentMethod: "cash",
      status: "scheduled",
      offer: {
        "id": "offer-008",
        slug: "geologia-estructural-ingenieria-geologia-cajas",
        subject: "Geología Estructural",
        career: "Ingeniería en Geología y Petróleos",
        description: "Taller sobre la interpretación de mapas geológicos.",
        indications: "Incluye prácticas de campo virtuales.",
        mode: "online",
        image: "/offers/default.jpg",
        createdAt: new Date("2025-10-25T22:22:10Z"),
        tutor: {
          name: "Valeria",
          primaryPhone: "0991234571",
          image: "/profiles/valeria_cajas.jpg",
          schedule: { days: [{ name: "Viernes", slots: [{ hour: "10:00", state: "occupied" }] }] }
        },
        price: 2
      }
    },
    {
      requestId: "REQ-009",
      date: new Date("2025-11-28T10:00:00Z"),
      hours: ["14:00"],
      price: 25.00,
      paymentMethod: "transfer",
      status: "pending",
      offer: {
        "id": "offer-009",
        slug: "sistemas-operativos-ingenieria-de-sistemas-molina",
        subject: "Sistemas Operativos",
        career: "Ingeniería de Sistemas",
        description: "Manejo avanzado de comandos en Linux.",
        indications: "Prácticas intensivas en máquina virtual.",
        mode: "online",
        image: "/offers/default.jpg",
        createdAt: new Date("2025-10-25T22:22:14Z"),
        tutor: {
          name: "Adriana",
          primaryPhone: "0991234575",
          image: "/profiles/adriana_molina.jpg",
          schedule: { days: [{ name: "Jueves", slots: [{ hour: "17:00", state: "occupied" }] }] }
        },
        price: 12
      }
    },
    {
      requestId: "REQ-010",
      date: new Date("2025-11-29T10:00:00Z"),
      hours: ["19:00"],
      price: 27.00,
      paymentMethod: "cash",
      status: "scheduled",
      offer: {
        "id": "offer-010",
        slug: "senales-sistemas-ingenieria-electronica-gomez",
        subject: "Señales y Sistemas",
        career: "Ingeniería Electrónica",
        description: "Dominio de la transformada de Laplace y Fourier.",
        indications: "Uso de MATLAB para la simulación de señales.",
        mode: "online",
        image: "/offers/default.jpg",
        createdAt: new Date("2025-10-25T22:22:15Z"),
        tutor: {
          name: "Esteban",
          primaryPhone: "0991234576",
          image: "/profiles/esteban_gomez.jpg",
          schedule: { days: [{ name: "Viernes", slots: [{ hour: "16:00", state: "unavailable" }] }] }
        },
        price: 13
      }
    }
  ]
};