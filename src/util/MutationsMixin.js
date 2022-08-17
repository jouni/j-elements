/**
 * A mixin class that provides an easy way to react to DOM mutations
 */
export const MutationsMixin = superClass => class extends superClass {
  // Override this in subclasses
  observedMutations = {}

  // Override this in subclasses
  handleMutations(e) {}

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    if (!this.__mutationObserver) {
      this.__mutationObserver = new MutationObserver(this._onMutation.bind(this));
    }

    this.__mutationObserver.observe(this, this.observedMutations);

    requestAnimationFrame(() => this._onMutation());
  }

  disconnectedCallback() {
    this.__mutationObserver.disconnect();
    if (super.disconnectedCallback) super.disconnectedCallback();
  }

  _onMutation(e) {
    this.pauseMutations();
    this.handleMutations(e);
    this.resumeMutations();
  }

  pauseMutations() {
    this.__mutationObserver.disconnect();
  }

  resumeMutations() {
    requestAnimationFrame(() => this.__mutationObserver.observe(this, this.observedMutations));
  }
}
