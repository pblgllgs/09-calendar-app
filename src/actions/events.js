import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/preapare-events';
import { types } from '../types/types';

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {
        const { uid, name } = getState().auth;
        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();
            console.log(body)
            if (body.ok) {
                event.id = body.eventoDB.id;
                event.user = {
                    _id: uid,
                    name: name,
                };
                dispatch(eventAddNew(event));
                Swal.fire('Success', 'Evento creado con exito!!', 'success');
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event,
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event,
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent,
});

export const eventStartUpdated = (event) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(
                `events/${event.id}`,
                event,
                'PUT'
            );
            const body = await resp.json();
            if (body.ok) {
                dispatch(eventUpdated(event));
                Swal.fire(
                    'Success',
                    'Evento actualizado con exito!!',
                    'success'
                );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event,
});

export const eventStartDeleted = () => {
    return async (dispatch, getState) => {
        const { id } = getState().calendar.activeEvent;
        try {
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();
            if (body.ok) {
                dispatch(eventDeleted());
                Swal.fire('Success', 'Evento eliminado con exito!!', 'success');
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const eventDeleted = () => ({
    type: types.eventDeleted,
});

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('events');
            const body = await resp.json();
            const events = prepareEvents(body.eventos);
            dispatch(eventLoaded(events));
        } catch (error) {
            console.log(error);
        }
    };
};

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events,
});

export const eventClearAll = () => ({
    type: types.eventClearAll,
});
