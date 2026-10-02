/**
 * Formulaire « Suivi diarrhée » : ouvert uniquement par la tâche de suivi
 * (à la date fixée par l'ASC lors de l'évaluation ou du suivi précédent).
 */

const isYes = (v) => v === true || v === 'true' || v === 'yes' || v === '1' || v === 1;

// Jamais proposé dans le menu + : ouvert par la tâche uniquement
export function showForm(app) {
  return false;
}

export function isRequired(app) {
  return true;
}

// Diarrhée présente : affiche le conseil et les questions SRO / zinc
export function hasDiarrhee(app) {
  return isYes(app.currentForm && app.currentForm.diarrhee_presente);
}

// La nouvelle date de suivi (facultative) ne peut pas être dans le passé
export function dateSuiviValide(app) {
  const v = app.currentForm && app.currentForm.date_prochain_suivi;
  if (!v) return true;
  const d = new Date(String(v).slice(0, 10) + 'T23:59:59');
  return d.getTime() >= app.now;
}
