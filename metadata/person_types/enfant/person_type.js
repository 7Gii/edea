/**
 * Logique du type de personne « Enfant » (0 à 5 ans).
 * app.currentForm contient les valeurs en cours de saisie, par clé de champ.
 */

// Date de naissance : pas dans le futur, et âge strictement inférieur à 60 mois
export function ageMoins5Ans(app) {
  const v = app.currentForm && app.currentForm.birthdate;
  if (!v) return true;
  const naissance = new Date(String(v).slice(0, 10) + 'T00:00:00');
  const now = new Date(app.now);
  if (isNaN(naissance.getTime()) || naissance.getTime() > now.getTime()) return false;
  let mois = (now.getFullYear() - naissance.getFullYear()) * 12 + (now.getMonth() - naissance.getMonth());
  if (now.getDate() < naissance.getDate()) mois -= 1;
  return mois >= 0 && mois < 60;
}
