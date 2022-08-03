import moment from 'moment';

import { DateFormats } from '../consts/date-formats';

export const formatDate = (date: string, format = DateFormats.Grid) => moment(date).format(format);
