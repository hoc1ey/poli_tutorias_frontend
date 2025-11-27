export interface CancelRequestFormInputs {
  cancellationReason: AllowedReasons;
  cancellationMessage?: string;
}

export type AllowedReasons =
  "Imprevisto personal" |
  "Conflicto de horarios con otra tutoría" |
  "Otras opciones de tutorías" |
  "Otro"