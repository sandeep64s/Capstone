//YYYY-MM-DD
import moment from 'moment';

const DateToHTML = (dateString: string) => {
    const date = new Date(dateString).toISOString();
    // console.log(date);
    // const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];
    // console.log(year, month, day)
    // var hTMLDate = "" + year;
    // if (month < 10)
    //     hTMLDate += "-0" + month
    // else
    //     hTMLDate += "-" + month
    // if (day < 10)
    //     hTMLDate += "-0" + day
    // else
    //     hTMLDate += "-" + day
    // const res = moment(date).format('YYYY-MM-DD');//format('MM/DD/YYYY');
    // console.log(date);
    return date.split("T")[0];
}

export default DateToHTML;