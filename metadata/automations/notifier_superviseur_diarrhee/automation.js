/**
 * Automatisation « Notifier le superviseur en cas de diarrhée ».
 * Déclencheur : soumission d'une « Évaluation diarrhée » ou d'un « Suivi diarrhée ».
 * Condition   : diarrhée présente.
 * Action      : notification aux utilisateurs de rôle « superviseur » affectés
 *               à la ville (niveau 2) de l'enfant.
 * NB : vérifier les noms de l'API du contexte d'automatisation (notify, find, lineage)
 *      avec la documentation de la console avant la mise en production.
 */

const isYes = (v) => v === true || v === 'true' || v === 'yes' || v === '1' || v === 1;

export function checkCondition(ctx) {
  const payload = (ctx.report && ctx.report.payload) || {};
  return isYes(payload.diarrhee_presente);
}

export async function runAction(ctx) {
  const report = ctx.report;
  const payload = report.payload || {};

  // Ville de l'enfant : l'unité de niveau 2 dans la lignée (famille -> ville -> pays)
  const lineage = ctx.lineage || [];
  const ville = lineage.find((ou) => ou.levelName === 'ville' || ou.level === 2);
  if (!ville) return { skipped: 'ville introuvable' };

  // Superviseurs affectés à cette ville
  const users = (await ctx.find('users', [{ field: 'orgUnitId', value: ville.id }])) || [];
  const superviseurs = users.filter((u) => u.role && u.role.name === 'superviseur');

  const enfant = (ctx.person && ctx.person.attributes && ctx.person.attributes.person_name) || 'Un enfant';
  const traitement = [
    isYes(payload.sro_propose) ? 'SRO proposé' : 'SRO non proposé',
    isYes(payload.zinc_propose) ? 'zinc proposé' : 'zinc non proposé',
  ].join(', ');

  for (const sup of superviseurs) {
    await ctx.notify({
      userId: sup.id,
      title: 'Cas de diarrhée',
      message: `${enfant} : diarrhée détectée (${traitement}). Prochain suivi : ${payload.date_prochain_suivi || 'non fixé'}.`,
      targetId: report.target_id,
    });
  }
  return { notified: superviseurs.length };
}
