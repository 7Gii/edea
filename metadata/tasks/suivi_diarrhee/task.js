/**
 * Tâche « Suivi diarrhée » : créée par chaque « Évaluation diarrhée »,
 * due à la date du prochain suivi fixée par l'ASC.
 * Affichée 2 jours avant, expire 3 jours après.
 */

const toTime = (v) => (typeof v === 'number' ? v : new Date(v).getTime());

// Une date de suivi valide a été saisie dans l'évaluation
export function appliesIf(app) {
  const d = app.report && app.report.payload && app.report.payload.date_prochain_suivi;
  return !!d && !isNaN(new Date(String(d).slice(0, 10)).getTime());
}

// Échéance = date du prochain suivi saisie par l'ASC
export function dueDate(app) {
  return new Date(String(app.report.payload.date_prochain_suivi).slice(0, 10) + 'T00:00:00');
}

// Résolue dès qu'un « Suivi diarrhée » est saisi pour l'enfant après l'évaluation
export function resolvedIf(app) {
  const after = toTime(app.report.created_at);
  return app
    .getReports({ form: 'suivi_diarrhee', targetId: app.report.target_id })
    .some((r) => toTime(r.created_at) > after);
}

// Premier dans l'onglet Tâches
export function priority(app) {
  return 1;
}
