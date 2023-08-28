import moment from "moment";
import 'moment/locale/ru';

export const formatDate = (date:string):string => {
    return moment(date).format('DD-MM-YYYY');
}