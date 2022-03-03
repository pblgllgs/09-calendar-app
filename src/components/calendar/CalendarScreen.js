import React, { useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { messages } from '../../helpers/calendar-messages-español';
import { CalendarModal } from './CalendarModal';
import { CalendarEvent } from './CalendarEvent';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { AddNewFav } from '../ui/AddNewFav';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    const dispatch = useDispatch();

    const { events } = useSelector((state) => state.calendar);

    const [lastView, setLastView] = useState(
        localStorage.getItem('lastView') || 'month'
    );

    const onDoubleClick = (event) => {
        dispatch(uiOpenModal());
    };

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
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
            <AddNewFav />
            <CalendarModal />
        </div>
    );
};
