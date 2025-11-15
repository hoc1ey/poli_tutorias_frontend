import { AvailableCareers } from "../interfaces";

export const CareerSubjectSeedData: AvailableCareers = {
  faculty: "Facultad de Ingeniería en Sistemas", // <-- campo requerido por la interfaz
  careers: [
    {
      careerId: "1",
      careerName: "Ingeniería de Software",
      subjects: [
        {
          subjectId: "CS101",
          code: "CS101",
          name: "Fundamentos de Programación",
        },
        { subjectId: "CS203", code: "CS203", name: "Estructura de Datos" },
        {
          subjectId: "SE301",
          code: "SE301",
          name: "Ingeniería de Requerimientos de Software",
        },
      ],
    },
    {
      careerId: "2",
      careerName: "Ingeniería Eléctrica",
      subjects: [
        { subjectId: "EE101", code: "EE101", name: "Análisis de Circuitos" },
        {
          subjectId: "EE205",
          code: "EE205",
          name: "Dispositivos Electrónicos",
        },
        {
          subjectId: "EE302",
          code: "EE302",
          name: "Fundamentos de Electromagnetismo",
        },
      ],
    },
    {
      careerId: "3",
      careerName: "Ingeniería Civil",
      subjects: [
        {
          subjectId: "CV103",
          code: "CV103",
          name: "Estática y Resistencia de Materiales",
        },
        { subjectId: "CV201", code: "CV201", name: "Mecánica de Fluidos" },
        { subjectId: "CV310", code: "CV310", name: "Estructuras Hidráulicas" },
      ],
    },
    {
      careerId: "4",
      careerName: "Ingeniería Química",
      subjects: [
        { subjectId: "CH101", code: "CH101", name: "Química General" },
        { subjectId: "CH205", code: "CH205", name: "Química Inorgánica" },
        { subjectId: "CH304", code: "CH304", name: "Termodinámica" },
      ],
    },
    {
      careerId: "5",
      careerName: "Administración de Empresas",
      subjects: [
        {
          subjectId: "BA101",
          code: "BA101",
          name: "Principios de Administración",
        },
        { subjectId: "BA205", code: "BA205", name: "Contabilidad Financiera" },
        { subjectId: "BA310", code: "BA310", name: "Microeconomía" },
        { subjectId: "AA310", code: "AA310", name: "XD" },
      ],
    },
  ],
};
