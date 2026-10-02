/**
 * Logic for the 'pays' org unit level: functions of its summary cards, computed offline on
 * the details view of each org unit (the target of app).
 * Every function receives one argument, app (the same keys everywhere):
 *   app.person     the target person { id, personTypeId, personType, orgUnitId, attributes }
 *   app.orgUnit    the target org unit { id, levelId, level, levelName, parentId, attributes }
 *                  (one of the two, the other null; both null when there is no target)
 *   app.currentUser  { id, username, name, role: { name, permissions }, orgUnitId } or null
 *   app.getReports(filter?)  every visible report, newest first, e.g.
 *       app.getReports({ form: 'child_registration' })          by form name or id
 *       app.getReports({ targetId: app.person.id })             the target only
 *       app.getReports({ orgUnitId: id })                        an org unit and everything below it
 *       app.getReports({ from: '2026-01-01', to: '2026-02-01' }) a period (to is excluded)
 *     each report: r.form_id, r.target_id, r.target_is_person, r.created_at, r.payload
 *     (form values are strings as entered: convert numbers with Number(...))
 *   app.find(table, [{ field, value }])  rows of persons, org_units, person_types,
 *     org_unit_levels (asynchronous: await it; not usable in a form field expression)
 *   app.lineage    org units above the target, nearest first (a person: its org unit
 *                  first), each { id, levelId, level, levelName, parentId, attributes };
 *                  synchronous, usable in form expressions (empty on the console)
 *   app.personsAt(orgUnitId)  persons of an org unit, synchronously (same shape as
 *                  app.person; empty on the console)
 *   app.utils      exports of the project utils
 *   app.now        current time of the app clock (epoch ms): the chosen day in deferred
 *                  collection on the mobile app; use it instead of new Date()
 *   app.option     in the optionFilter of a select field only: the option being
 *                  checked { value, name, properties }
 *
 * A card's displayExpression returns a boolean; a field's value returns a string or a
 * number (null or '' hides the field).
 */
