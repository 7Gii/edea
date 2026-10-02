// Indicateur : pourcentage des cas de diarrhée ayant reçu SRO et zinc
const isYes = (v) => v === true || v === 'true' || v === 'yes' || v === '1' || v === 1;

export function showIndicator(app) {
  return true;
}

export function calculateValue(app) {
  const cas = [
    ...app.getReports({ form: 'evaluation_diarrhee' }),
    ...app.getReports({ form: 'suivi_diarrhee' }),
  ].filter((r) => isYes(r.payload && r.payload.diarrhee_presente));
  const traites = cas.filter((r) => isYes(r.payload.sro_propose) && isYes(r.payload.zinc_propose));
  return { numerator: traites.length, denominator: cas.length };
}
