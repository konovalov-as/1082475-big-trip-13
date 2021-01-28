import Abstract from '../view/abstract.js';

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
  BEFOREBEGIN: `beforebegin`,
};

export const render = (container, child, place) => {
  let receivedContainer = container;
  let receivedChild = child;

  if (container instanceof Abstract) {
    receivedContainer = container.getElement();
  }

  if (child instanceof Abstract) {
    receivedChild = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      receivedContainer.prepend(receivedChild);
      break;
    case RenderPosition.BEFOREEND:
      receivedContainer.append(receivedChild);
      break;
    case RenderPosition.AFTEREND:
      receivedContainer.after(receivedChild);
      break;
    case RenderPosition.BEFOREBEGIN:
      receivedContainer.before(receivedChild);
      break;
    default:
      throw new Error(`Unknown place of insert a DOM-element: '${place}'!`);
  }
};

export const renderTemplate = (container, template, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
