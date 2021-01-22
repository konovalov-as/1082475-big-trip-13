import InfoView from '../view/info';

import {render, remove, RenderPosition} from '../utils/render';
import {createInfo} from '../utils/info';

import {UpdateType} from '../const';

export default class Info {
  constructor(infoContainer, pointsModel) {
    this._infoContainer = infoContainer;
    this._pointsModel = pointsModel;
    this._infoComponent = null;

    this._onModelEvent = this._onModelEvent.bind(this);

    this._pointsModel.addObserver(this._onModelEvent);
  }

  init() {
    this._info = createInfo(this._pointsModel.getPoints());

    this._infoComponent = new InfoView(this._info);

    render(this._infoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _onModelEvent(updateType) {
    if (updateType === UpdateType.MINOR || updateType === UpdateType.MAJOR || updateType === UpdateType.INIT) {
      remove(this._infoComponent);
      this.init();
    }
  }
}
