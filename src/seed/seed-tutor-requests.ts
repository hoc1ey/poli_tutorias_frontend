export const tutorRequestsSeedData = {
  totalItems: 15,
  limit: 6,
  currentPage: 1,
  totalPages: 1,
  requests: [
    {
      requestId: "req-1a2b3c4d5e",
      createdAt: new Date("2025-10-18T10:15:00.000Z"),
      date: new Date("2025-10-21T00:00:00.000Z"),
      hours: ["11:00", "12:00"],
      price: 15.00,
      paymentMethod: 'transfer',
      status: 'pending',
      student: {
        studentName: "Patricio Chancusig",
        studentEmail: "patricio.c@example.com",
        studentPhone: "0991234567",
        studentMessage: "Necesito ayuda con límites y derivadas."
      },
      subjectName: "Cálculo en una variable",
      isReviewed: false
    },
    {
      requestId: "req-2b3c4d5e6f",
      createdAt: new Date("2025-10-15T14:03:00.000Z"),
      date: new Date("2025-10-23T00:00:00.000Z"),
      hours: ["11:00", "12:00"],
      price: 20.00,
      paymentMethod: 'cash',
      status: 'pending',
      student: {
        studentName: "Anthony Morales",
        studentEmail: "anthony.m@example.com",
        studentPhone: "0987654321"
      },
      subjectName: "Álgebra Lineal",
      isReviewed: false
    },
    {
      requestId: "req-3c4d5e6f7g",
      createdAt: new Date("2025-10-14T19:45:00.000Z"),
      date: new Date("2025-10-23T00:00:00.000Z"),
      hours: ["12:00", "13:00"],
      price: 18.50,
      paymentMethod: 'transfer',
      status: 'conflict',
      student: {
        studentName: "Juan Pérez",
        studentEmail: "juan.p@example.com",
        "studentPhone": "0965432109"
      },
      subjectName: "Mecánica de Fluidos",
      isReviewed: true
    },
    {
      requestId: "req-4d5e6f7g8h",
      createdAt: new Date("2025-10-12T07:11:00.000Z"),
      date: new Date("2025-10-23T00:00:00.000Z"),
      hours: ["12:00", "13:00"],
      price: 16.00,
      paymentMethod: 'cash',
      status: 'conflict',
      student: {
        studentName: "David Rocha",
        studentEmail: "david.r@example.com",
        studentPhone: "0978901234"
      },
      subjectName: "Probabilidad y Estadística",
      isReviewed: false
    },
    {
      requestId: "req-5e6f7g8h9i",
      createdAt: new Date("2025-10-07T09:21:00.000Z"),
      date: new Date("2025-10-10T00:00:00.000Z"),
      hours: ["10:00", "11:00"],
      price: 17.50,
      paymentMethod: 'transfer',
      status: 'expired',
      student: {
        studentName: "Mateo Rocha",
        studentEmail: "mateo.r@example.com",
        studentPhone: "0954321098"
      },
      subjectName: "Mecánica de Suelos",
      isReviewed: true
    },
    {
      requestId: "req-6f7g8h9i0j",
      createdAt: new Date("2025-11-20T15:30:00.000Z"),
      date: new Date("2025-12-01T00:00:00.000Z"),
      hours: ["14:00", "15:00", "16:00"],
      price: 25.00,
      paymentMethod: 'cash',
      status: 'pending',
      student: {
        studentName: "Sofía Cárdenas",
        studentEmail: "sofia.c@example.com",
        studentPhone: "0911223344"
      },
      subjectName: "Física Moderna",
      isReviewed: true // Nueva, pendiente de revisión
    }
  ]
}