// Indicateur : nombre d'évaluations diarrhée soumises (données visibles par l'utilisateur)
export function showIndicator(app) {
  return true;
}

export function calculateValue(app) {
  return app.getReports({ form: 'evaluation_diarrhee' }).length;
}

export function priority(app) {
  return 1;
}
