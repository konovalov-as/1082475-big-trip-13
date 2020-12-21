import {FilterType} from '../const';
import {isPointExpired, isPointUnexpired} from './point';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointUnexpired(point.dateTimeStartEvent)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointExpired(point.dateTimeEndEvent))
};
