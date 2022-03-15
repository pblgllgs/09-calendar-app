import React, { useEffect, useState } from 'react';
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
import {
    eventClearActiveEvent,
    eventSetActive,
    eventStartLoading,
} from '../../actions/events';
import { AddNewFav } from '../ui/AddNewFav';
import { DeleteEventFav } from '../ui/DeleteEventFav';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { uid } = useSelector((state) => state.auth);

    const [lastView, setLastView] = useState(
        localStorage.getItem('lastView') || 'month'
    );

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch]);

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
            backgroundColor: uid === event.user._id ? '#4a99ea' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        };
        return { style };
    };

    const onSelectSlot = (slotInfo) => {
        dispatch(eventClearActiveEvent());
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
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent,
                }}
            />
            {activeEvent !== null && <DeleteEventFav />}
            <AddNewFav />
            <CalendarModal />
        </div>
    );
};
