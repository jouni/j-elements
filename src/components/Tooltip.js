import { positionPopup } from '../util/positionPopup.js';

// TODO accessibility (aria-describedby, make sure the elements are in the same DOM scope)

export const tooltipElement = document.createElement('j-tooltip');
tooltipElement.style.setProperty('position', 'fixed');
// TODO this feels correct, but accessibility guidelines perhaps advocate against this (i.e., tooltips should be selectable)
tooltipElement.style.setProperty('pointer-events', 'none');
tooltipElement.style.setProperty('z-index', 'var(--tooltip-z-index, 9999)');
tooltipElement.style.setProperty('top', '0');
tooltipElement.style.setProperty('left', '0');
tooltipElement.addEventListener('mouseenter', showTooltip);
tooltipElement.addEventListener('mouseleave', hideTooltip);
// Prefer to keep the tooltip element always in the DOM
// (and toggle the visibility instead) to avoid triggering
// the observer whenever the tooltip is shown
tooltipElement.style.setProperty('display', 'none');
document.body.append(tooltipElement);

export function startObservingTooltips(root) {
  if (!root.__tooltipObserver) {
    root.__tooltipObserver = new MutationObserver(queueMutations.bind(this));
  }

  // Handle elements (in the global scope) that already have a tooltip when we begin
  [...root.querySelectorAll('[tooltip]')].forEach(el => addTooltip(el));

  // Start observing for changes in the DOM
  root.__tooltipObserver.observe(root, { childList: true, attributes: true, attributeFilter: ['tooltip'], subtree: true });
}

export function stopObservingTooltips(root) {
  if (root.__tooltipObserver) {
    root.__tooltipObserver.disconnect();
  }
}

let queue = [];
let queueTimeout;

function queueMutations(mutations) {
  clearTimeout(queueTimeout);
  queue = queue.concat(mutations);
  queueTimeout = setTimeout(processMutations, 300);
}

function processMutations() {
  queue.forEach(mutation => {
    if (mutation.type == 'childList') {
      mutation.target.querySelectorAll('[tooltip]').forEach(el => addTooltip(el));
      [...mutation.removedNodes].forEach(node => {
        if (node.nodeType == 1) {
          if (node.hasAttribute('tooltip')) removeTooltip(node);
          [...node.querySelectorAll('[tooltip]')].forEach(el => removeTooltip(el));
        }
      });
    } else if (mutation.type == 'attributes') {
      updateTooltip(mutation.target);
    }
  });
  queue = [];
}

function updateTooltip(el) {
  if (el.hasAttribute('tooltip')) {
    addTooltip(el);
  } else {
    removeTooltip(el);
  }
}

function addTooltip(el) {
  el.addEventListener('mousemove', showTooltip);
  el.addEventListener('mouseleave', hideTooltip);
  el.addEventListener('focusin', showTooltip);
  el.addEventListener('focusout', hideTooltip);
  listenScrollOnAncestors(el);
}

function removeTooltip(el) {
  el.removeEventListener('mousemove', showTooltip);
  el.removeEventListener('mouseleave', hideTooltip);
  el.removeEventListener('focusin', showTooltip);
  el.removeEventListener('focusout', hideTooltip);
  unlistenScrollOnAncestors(el);
}

let hideTimeout;
let currentTarget;

function showTooltip() {
  clearTimeout(hideTimeout);
  if (currentTarget != this && this != tooltipElement) {
    currentTarget = this;

    // Move the tooltip element inside dialogs to make it visible on top of them
    // TODO apparently focus management gets a bit messed up in Safari when slotted content
    // is changed inside a <dialog> element, so consider if there should be a permanent
    // tooltip element inside all Popup components instead.
    const dialog = closestDialog(currentTarget);
    if (dialog && tooltipElement.parentNode !== dialog) {
      // Special case for Menu and OverflowMenu implementations
      let host = dialog.getRootNode().host;
      while (host && host.getRootNode().host) {
        host = host.getRootNode().host;
      }
      if (host) {
        tooltipElement.setAttribute('slot', 'tooltip');
        host.appendChild(tooltipElement);
      } else {
        // Let's hope the dialog element is not clipping its contents...
        tooltipElement.removeAttribute('slot');
        dialog.appendChild(tooltipElement);
      }
    } else if (tooltipElement.parentNode !== document.body) {
      // Otherwise move it back to body
      tooltipElement.removeAttribute('slot');
      document.body.appendChild(tooltipElement);
    }

    tooltipElement.textContent = this.getAttribute('tooltip');
    tooltipElement.style.removeProperty('display');
  }
  updateTooltipPosition();
}

function updateTooltipPosition() {
  if (currentTarget) {
    positionPopup(tooltipElement, currentTarget, tooltipElement.slot !== 'tooltip');
  }
}

function hideTooltip() {
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    tooltipElement.textContent = '';
    tooltipElement.style.setProperty('display', 'none');
    currentTarget = null;
  }, 500);
}

startObservingTooltips(document.body);

function getAncestorRoots(node) {
  const ancestors = [];

  while (node) {
    if (node.nodeType === Node.DOCUMENT_NODE) {
      ancestors.push(node);
      break;
    }

    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      ancestors.push(node);
      node = node.host;
      continue;
    }

    if (node.assignedSlot) {
      node = node.assignedSlot;
      continue;
    }

    node = node.parentNode;
  }

  return ancestors;
}

function listenScrollOnAncestors(target) {
  getAncestorRoots(target).forEach(root => {
    root.addEventListener('scroll', updateTooltipPosition, true);
  });
}

function unlistenScrollOnAncestors(target) {
  getAncestorRoots(target).forEach(root => {
    root.removeEventListener('scroll', updateTooltipPosition, true);
  });
}

function closestDialog(el) {
  if (!el || el === document || el === window) return null;
  if (el.localName === 'dialog') return el;
  if (el.assignedSlot) return closestDialog(el.assignedSlot);
  if (el.parentNode?.host) return closestDialog(el.parentNode.host);
  return closestDialog(el.parentNode);
}
