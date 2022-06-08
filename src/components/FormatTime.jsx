import React, { useEffect, useState } from 'react'
import moment from 'moment';

export default function FormatTime(props) {
    const { date } = props;
    const [dateFormated, setDateFormated] = useState(null);

    useEffect(() => {
        formatDate();
    }, [])

    const formatDate = () => {
        // We split mongoDB default format - 2022-06-03T12:55:00.452Z
        const dateArr = date.split('T');
        // We take the hours
        const dateHour = dateArr[1].split('.');
        // Take the year-month-day and we took out the '-' chars      
        const dateCorrected = dateArr[0].split('-').join('') + dateHour[0];
        // We calculate the difference with the help of momentJS
        const difference = moment(dateCorrected, "YYYYMMDDHH:mm:ss").from(moment.utc().subtract(2, 'hours'));
        setDateFormated(difference);
    }
    return (
        <>{dateFormated}</>
    )
}