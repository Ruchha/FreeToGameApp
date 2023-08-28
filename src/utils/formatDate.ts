import moment from "moment";
import 'moment/locale/ru';

export const formatDate = (date:string) => {
    return moment(date).format('D-MM-YYYY');
}