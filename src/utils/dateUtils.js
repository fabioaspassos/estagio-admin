import moment from 'moment';

const convertDateStringFormat = (string, stringFormat, convertTo) => {
    const conversion = moment(string).format(stringFormat);
    return moment(conversion).format(convertTo);
}

const convertStringToDate = (string, stringFormat, converTo) => {
    return convertDateStringFormat(string, stringFormat, converTo).toDate();
}

const convertDate = (date, format) => {
    return moment(date).format(format);
}

export {convertDateStringFormat, convertStringToDate, convertDate};
