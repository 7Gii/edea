/**
 * Tâche « Suivi diarrhée (nouveau suivi) » : créée par un « Suivi diarrhée »
 * seulement si l'ASC y a fixé une nouvelle date de suivi.
 * Affichée 2 jours avant, expire 3 jours après.
 */

const toTime = (v) => (typeof v === 'number' ? v : new Date(v).getTime());

// Seulement si une nouvelle date de suivi a été saisie
export function appliesIf(app) {
  const d = app.report && app.report.payload && app.report.payload.date_prochain_suivi;
  return !!d && !isNaN(new Date(String(d).slice(0, 10)).getTime());
}

// Échéance = nouvelle date de suivi saisie par l'ASC
export function dueDate(app) {
  return new Date(String(app.report.payload.date_prochain_suivi).slice(0, 10) + 'T00:00:00');
}

// Résolue dès qu'un autre « Suivi diarrhée » est saisi pour l'enfant après celui-ci
export function resolvedIf(app) {
  const after = toTime(app.report.created_at);
  return app
    .getReports({ form: 'suivi_diarrhee', targetId: app.report.target_id })
    .some((r) => r.id !== app.report.id && toTime(r.created_at) > after);
}

export function priority(app) {
  return 1;
}
