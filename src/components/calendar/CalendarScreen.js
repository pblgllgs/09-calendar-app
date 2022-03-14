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
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFav } from '../ui/AddNewFav';
import { DeleteEventFav } from '../ui/DeleteEventFav';

moment.locale('es');

const localizer = momentLocalizer(moment);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlusHour = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlusHour.toDate(),
};

export const CalendarScreen = () => {
    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector((state) => state.calendar);

    const [formValues, setFormValues] = useState(initEvent);

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

    const onSelectSlot = (slotInfo) => {
        dispatch(eventClearActiveEvent());
        // const start = moment(slotInfo.start);
        // const end = moment(slotInfo.end);

        // const event = {
        //     title: '',
        //     description: '',
        //     start: start.toDate(),
        //     end: end.toDate(),
        // };
        
        // dispatch(uiOpenModal());
        // setFormValues(event);
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
