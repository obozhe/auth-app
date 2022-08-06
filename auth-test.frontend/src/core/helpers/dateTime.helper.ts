import moment from 'moment';

import { DateFormats } from '../consts/DateFormats';

export const formatDate = (date: string, format = DateFormats.Grid) => moment(date).format(format);
