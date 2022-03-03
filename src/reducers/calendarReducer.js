import moment from "moment";
import { types } from "../types/types";


const initialState = {
    events:[{
        title: 'Cloud Practitioner exam',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '3966FF',
        notes: 'Sacar hora',
        user: {
            _id: '123',
            name: 'Pablo',
        }
    }],
    activeEvent: null
};



export const calendarReducer =  (state = initialState, action)=> {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload,
            };
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]
            };
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null,
            };
        default:
            return state;
    }
}