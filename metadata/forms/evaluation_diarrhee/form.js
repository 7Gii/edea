/**
 * Formulaire « Évaluation diarrhée » (enfant de 0 à 5 ans).
 * Proposé dans le menu + d'un Enfant pas encore évalué, pour les rôles ASC et Superviseur.
 */

const isYes = (v) => v === true || v === 'true' || v === 'yes' || v === '1' || v === 1;

// Offert dans le menu + pour un enfant pas encore évalué, aux rôles ASC et Superviseur
export function showForm(app) {
  if (!app.person || app.person.personType !== 'enfant') return false;
  const role = app.currentUser && app.currentUser.role ? app.currentUser.role.name : null;
  if (role !== 'asc' && role !== 'superviseur') return false;
  // Déjà évalué : la suite passe par les tâches de suivi
  const dejaEvalue = app.getReports({ form: 'evaluation_diarrhee', targetId: app.person.id }).length > 0;
  return !dejaEvalue;
}

export function isRequired(app) {
  return true;
}

// Diarrhée présente : affiche le conseil et les questions SRO / zinc
export function hasDiarrhee(app) {
  return isYes(app.currentForm && app.currentForm.diarrhee_presente);
}

// La date de suivi ne peut pas être dans le passé
export function dateSuiviValide(app) {
  const v = app.currentForm && app.currentForm.date_prochain_suivi;
  if (!v) return true;
  const d = new Date(String(v).slice(0, 10) + 'T23:59:59');
  return d.getTime() >= app.now;
}
