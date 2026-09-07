import { Component } from '@theme/component';
import { CartAddEvent } from '@theme/events';
import { isMobileBreakpoint } from '@theme/utilities';

/**
 * A custom element that manages a cart drawer.
 *
 * Delegates actual showing/hiding to the ancestor `<theme-drawer>` (which owns the
 * `<dialog>` element) rather than being a `DialogComponent` itself — this component
 * lives *inside* that dialog, not around one, so it has no `dialog` ref of its own.
 *
 * @extends {Component}
 */
class CartDrawerComponent extends Component {
  /** @type {number} */
  #summaryThreshold = 0.5;

  /** @type {AbortController | null} */
  #historyAbortController = null;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(CartAddEvent.eventName, this.#handleCartAdd);
    this.addEventListener('theme-drawer:open', this.#updateStickyState);
    this.addEventListener('theme-drawer:open', this.#handleHistoryOpen);
    this.addEventListener('theme-drawer:close', this.#handleHistoryClose);

    if (history.state?.cartDrawerOpen) {
      history.replaceState(null, '');
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(CartAddEvent.eventName, this.#handleCartAdd);
    this.removeEventListener('theme-drawer:open', this.#updateStickyState);
    this.removeEventListener('theme-drawer:open', this.#handleHistoryOpen);
    this.removeEventListener('theme-drawer:close', this.#handleHistoryClose);
    this.#historyAbortController?.abort();
  }

  /**
   * @returns {(HTMLElement & { open(): void, close(): Promise<void>, isOpen: boolean, refs: any }) | null}
   */
  get #drawer() {
    return this.closest('theme-drawer');
  }

  #handleHistoryOpen = () => {
    if (!isMobileBreakpoint()) return;

    if (!history.state?.cartDrawerOpen) {
      history.pushState({ cartDrawerOpen: true }, '');
    }

    this.#historyAbortController = new AbortController();
    window.addEventListener('popstate', this.#handlePopState, { signal: this.#historyAbortController.signal });
  };

  #handleHistoryClose = () => {
    this.#historyAbortController?.abort();
    if (history.state?.cartDrawerOpen) {
      history.back();
    }
  };

  #handlePopState = async () => {
    if (this.#drawer?.isOpen) {
      await this.#drawer.close();
    }
  };

  #handleCartAdd = () => {
    if (this.hasAttribute('auto-open')) {
      this.open();
    }
  };

  open() {
    this.#drawer?.open();

    /**
     * Close cart drawer when installments CTA is clicked to avoid overlapping dialogs
     */
    customElements.whenDefined('shopify-payment-terms').then(() => {
      const installmentsContent = document.querySelector('shopify-payment-terms')?.shadowRoot;
      const cta = installmentsContent?.querySelector('#shopify-installments-cta');
      cta?.addEventListener('click', this.close, { once: true });
    });
  }

  close = () => {
    this.#drawer?.close();
  };

  #updateStickyState = () => {
    const dialog = this.#drawer?.refs?.panel;
    if (!dialog) return;

    const content = this.querySelector('.cart-drawer__content');
    const summary = this.querySelector('.cart-drawer__summary');

    if (!content || !summary) {
      // Ensure the dialog doesn't get stuck in "unsticky" mode when summary disappears (e.g., empty cart).
      dialog.setAttribute('cart-summary-sticky', 'false');
      return;
    }

    const drawerHeight = dialog.getBoundingClientRect().height;
    const summaryHeight = summary.getBoundingClientRect().height;
    const ratio = summaryHeight / drawerHeight;
    dialog.setAttribute('cart-summary-sticky', ratio > this.#summaryThreshold ? 'false' : 'true');
  };
}

if (!customElements.get('cart-drawer-component')) {
  customElements.define('cart-drawer-component', CartDrawerComponent);
}
