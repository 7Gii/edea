// Indicateur : nombre d'évaluations et de suivis où la diarrhée est présente
const isYes = (v) => v === true || v === 'true' || v === 'yes' || v === '1' || v === 1;

export function showIndicator(app) {
  return true;
}

export function calculateValue(app) {
  const reports = [
    ...app.getReports({ form: 'evaluation_diarrhee' }),
    ...app.getReports({ form: 'suivi_diarrhee' }),
  ];
  return reports.filter((r) => isYes(r.payload && r.payload.diarrhee_presente)).length;
}
