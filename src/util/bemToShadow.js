/**
 * Transform a string of CSS from BEM style to shadow DOM style:
 *
 * - .block -> :host
 * - .block__element -> [part="element"]
 * - .block--modifier -> :host([modifier])
 * - .block--modifier-value -> :host([modifier~="value"])
 *
 * @param  {String} bemCss     BEM style CSS to transform
 * @param  {String} hostSelector Block selector which is used in the original CSS (e.g. `.button`)
 * @return {String}              Shadow DOM style CSS
 */
export default function bemToShadow(bemCss, hostSelector) {
  if (!hostSelector) {
    console.warn('No host selector specified. Skipping transformation.');
    return bemCss;
  }

  // Interpret the dot as a literal dot in the regexp
  const escapedHost = hostSelector.replace(/\./gm, '\\.');

  let shadowCss = bemCss;

  // Block-only and block pseudo elements:
  // .block -> :host
  // .block::before -> :host::before
  let regexp = new RegExp(escapedHost + '(\\s|:{2})', 'gm');
  shadowCss = shadowCss.replace(regexp, ':host$1');

  // Block modifiers:
  // .block--modifier-value -> :host([modifier~="value"])
  regexp = new RegExp(escapedHost + '--([^\\s(?=::|\\s|,|\\-)]+)-([^\\s(?=::|\\s|,|\\{|\\[)]+)', 'gm');
  shadowCss = shadowCss.replace(regexp, hostSelector + '[$1~="$2"]');
  // .block--modifier -> :host([modifier])
  regexp = new RegExp(escapedHost + '--([^\\s(?=::|\\s|,|\\-|\\{|\\[)]+)[(?=\\-)]*', 'gm');
  shadowCss = shadowCss.replace(regexp, hostSelector + '[$1]');

  // Elements:
  // .block__element -> [part="element"]
  regexp = new RegExp(escapedHost + '__([^\\s(?=::|\\s|,|\\{|\\[)]+)', 'gm');
  shadowCss = shadowCss.replace(regexp, '[part="$1"]');

  // Other block selector combinators, for example:
  // .block:hover -> :host(:hover)
  // .block[attribute] -> :host([attribute])
  regexp = new RegExp(escapedHost + '(\\S*?(?=::|\\s|,|\\{))', 'gm');
  shadowCss = shadowCss.replace(regexp, ':host($1)');

  // Direct descendants is assumed to be inside light DOM:
  // .block > label -> :host ::slotted(label)
  // Note: `.block >` has already been replace with `.host >`
  regexp = new RegExp(':host > (\\S*?(?=::|\\s|,|\\{))', 'gm');
  shadowCss = shadowCss.replace(regexp, ':host ::slotted($1)');

  return shadowCss;
}
