import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from 'react';
import { API_URL } from '../constants';

const localizer = dayjsLocalizer(dayjs);

function PersonalTrainer() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetch(API_URL + 'gettrainings')
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert('Something went wrong in GET request');
            })
            .then(data => {
                const events = data.map(training => ({
                    start: dayjs(training.date).toDate(),
                    end: dayjs(training.date).add(training.duration, 'm').toDate(),
                    title: training.activity
                }));
                setTrainings(events);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={trainings}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
}

export default PersonalTrainer;