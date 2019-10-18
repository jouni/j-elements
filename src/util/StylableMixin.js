export const StylableMixin = superClass => class Stylable extends superClass {
  connectedCallback() {
    this.applyMatchingStyleRules();
    if (super.connectedCallback) super.connectedCallback();
  }

  disconnectedCallback() {
    this.cleanupStyles();

    if (super.disconnectedCallback) super.disconnectedCallback();
  }

  getMatchingStyleRules() {
    const matchingStyleRules = [];

    // Global style sheets
    for (let i = 0; i < document.styleSheets.length; i++) {
      gatherMatchingStyleRules(matchingStyleRules, document.styleSheets[i], this);
    }

    // Scoped style sheets
    if (this.getRootNode() != document) {
      const sheets = this.getRootNode().styleSheets;
      for (let i = 0; i < sheets.length; i++) {
        gatherMatchingStyleRules(matchingStyleRules, sheets[i], this);
      }
      // TODO should probably go through adoptedStyleSheets as well
    }

    return matchingStyleRules;
  }

  applyMatchingStyleRules() {
    const matchingStyleRules = this.getMatchingStyleRules();

    if (matchingStyleRules.length > 0) {
      // TODO should probably utilize adoptedStyleSheets when available
      const style = document.createElement('style');
      style.setAttribute('stylable-mixin', '');
      style.innerHTML = rulesToString(matchingStyleRules);
      this.shadowRoot.appendChild(style);
    }
  }

  cleanupStyleRules() {
    const styleSheets = this.shadowRoot.querySelectorAll('style[stylable-mixin]');
    for (let i = 0; i < styleSheets.length; i++) {
      this.shadowRoot.removeChild(styleSheets[i]);
    }
  }
}


// Recursively process a style sheet for matching rules
function gatherMatchingStyleRules(matchingStyleRules, styleSheet, element) {
  let match;
  if ((match = matchesElement(element, styleSheet.media)) !== undefined) {
    if (match) {
      matchingStyleRules.push(styleSheet.cssRules);
    }
  } else {
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      const rule = styleSheet.cssRules[i];
      if (rule.type == 3) {
        // @import
        if ((match = matchesElement(element, rule.media)) !== undefined) {
          if (match) {
            matchingStyleRules.push(rule.styleSheet.cssRules);
          }
        } else {
          gatherMatchingStyleRules(matchingStyleRules, rule.styleSheet, element);
        }
      } else if (rule.type == 4) {
        // @media
        if (matchesElement(element, rule.media)) {
          matchingStyleRules.push(rule.cssRules);
        }
      }
    }
  }
}

// Check if the media is a non-standard "element scoped selector"
function elementMedia(media) {
  // Firefox parses the escaping backward slash into a double backward slash: \ -> \\
  return media && media.mediaText.replace(/\\/, '').match(/^[\w]+-[\w.()\[\]"'=~*^$]+/);
}

// Check if the media is a non-standard "element scoped selector" and if it matches the given element
// Return undefined if the media query is a standard media query
function matchesElement(el, media) {
  if (elementMedia(media)) {
    // Firefox parses the escaping backward slash into a double backward slash: \ -> \\
    return matches(el, media.mediaText.replace(/\\/, ''));
  } else {
    return undefined;
  }
}

// Check if an element matches a given selector
function matches(el, selector) {
  try {
    return el.matches(selector);
  } catch (e) {
    // Not a valid selector (such as an empty string)
    return undefined;
  }
}

// Convert an array of CSSRuleList objects into a string of CSS
function rulesToString(ruleListArray) {
  let styleString = '';
  ruleListArray.forEach(ruleList => {
    for (let i = 0; i < ruleList.length; i++) {
      styleString += ruleList[i].cssText + '\n';
    }
  });
  return styleString;
}
