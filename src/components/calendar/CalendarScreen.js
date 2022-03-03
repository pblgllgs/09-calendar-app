import React, { useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { messages } from '../../helpers/calendar-messages-español';
import { CalendarModal } from './CalendarModal';
import { CalendarEvent } from './CalendarEvent';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

moment.locale('es');

const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Cloud Practitioner exam',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '3966FF',
        notes: 'Sacar hora',
        user: {
            _id: '123',
            name: 'Pablo',
        },
    },
];

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const [lastView, setLastView] = useState(
        localStorage.getItem('lastView') || 'month'
    );

    const onDoubleClick = (event) => {
        dispatch(uiOpenModal())
    };

    const onSelectEvent = () => {
        console.log('Selected');
    };

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#4a99ea',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        };
        return { style };
    };

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent,
                }}
            />
            <CalendarModal />
        </div>
    );
};
