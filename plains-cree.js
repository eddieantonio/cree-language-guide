import {sro2syllabics, syllabics2sro} from 'cree-sro-syllabics';

class CreeText extends HTMLElement {
  constructor() {
    super();
    this._orig = null;

    let shadow = this.attachShadow({mode: 'open'});
    let wrapper = document.createElement('span');
    wrapper.setAttribute('lang', 'cr');
    wrapper.textContent = '<undefined>';
    shadow.appendChild(wrapper);
    this._wrapper = wrapper;
  }

  static get observedAttributes() {
    return ['orig'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'orig') {
      this.originalText = newValue;
    }
  }

  get originalText() {
    return this._orig;
  }

  set originalText(value) {
    this._orig = value;
    this._wrapper.textContent = `${this.sro}/${this.syllabics}`;
  }

  get sro() {
    return this._orig;
  }

  get syllabics() {
    return sro2syllabics(this._orig);
  }
}

customElements.define('cree-text', CreeText);
