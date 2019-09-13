// TODO unfinished ideas/work

export function applyStyles(styleStr, component, scope) {
  if (scope) {
    styleStr = styleStr.replace('<style>', `<style type="global" for="${scope} ${component}, :host(${scope}) ${component}">`);
  } else {
    styleStr = styleStr.replace('<style>', `<style type="global" for="${component}">`);
  }
  // TODO this is probably a bad way to inject it
  document.body.innerHTML += styleStr;
}
