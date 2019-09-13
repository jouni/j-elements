const MutationAnimationMixin = superClass => class JMutationAnimationMixin extends superClass {
  _initAnimationMutationObserver() {
    this._insertClassName = this._insertClassName || 'j-ma-insert';
    this._removeClassName = this._removeClassName || 'j-ma-remove';
    this._insertAnimationName = this._insertAnimationName || 'j-ma-animation';
    this._removeAnimationName = this._removeAnimationName || 'j-ma-animation';

    // TODO this only handles first added/removed element in the mutation
    this._mutationAnimationObserver = new MutationObserver(e => {
      e.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          if (mutation.addedNodes[0].nodeType != 1 || mutation.addedNodes[0].classList.contains(this._removeClassName)) {
            return;
          }
          const inserted = mutation.addedNodes[0];
          inserted.style.width = inserted.offsetWidth + 'px';
          inserted.style.height = inserted.offsetHeight + 'px';
          inserted.classList.add(this._insertClassName);
          const insertListener = (e) => {
            if (e.animationName == this._insertAnimationName) {
              inserted.style.width = '';
              inserted.style.height = '';
              inserted.classList.remove(this._insertClassName);
              inserted.removeEventListener('animationend', insertListener);
            }
          }
          inserted.addEventListener('animationend', insertListener);
        }

        if (mutation.removedNodes.length > 0) {
          if (mutation.removedNodes[0].nodeType != 1 || mutation.removedNodes[0].classList.contains(this._removeClassName)) {
            return;
          }
          const clone = mutation.removedNodes[0].cloneNode(true);
          clone.classList.add(this._removeClassName);
          clone.classList.remove(this._insertClassName);
          mutation.target.insertBefore(clone, mutation.nextSibling);
          clone.style.width = clone.offsetWidth + 'px';
          clone.style.height = clone.offsetHeight + 'px';
          clone.addEventListener('animationend', e => {
            if (e.animationName == this._removeAnimationName) {
              e.target.parentNode.removeChild(clone);
            }
          });
        }
      });
    });
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this._mutationAnimationObserver) this._initAnimationMutationObserver();
    this._mutationAnimationObserver.observe(this, {childList: true});
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this._mutationAnimationObserver.disconnect();
  }
}

export default MutationAnimationMixin;
