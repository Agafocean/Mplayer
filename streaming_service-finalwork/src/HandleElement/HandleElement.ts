export abstract class HandleElement {
  private element: Element = document.createElement('div');    

  abstract getTemplate(): string; 

  getElement(): Element {
    this.element.insertAdjacentHTML('beforeend', this.getTemplate());
    this.element = this.element.firstElementChild ? this.element.firstElementChild : this.element;
    return this.element
  }

  removeElement() {
    this.element.remove()   
  }
}
