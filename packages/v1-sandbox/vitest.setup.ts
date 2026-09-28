// https://github.com/jsdom/jsdom/issues/1695
window.HTMLElement.prototype.scrollIntoView = () => { }