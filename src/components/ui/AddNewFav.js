import React from 'react';
import { useDispatch } from 'react-redux';
import { eventClearActiveEvent } from '../../actions/events';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFav = () => {
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(uiOpenModal());
        dispatch(eventClearActiveEvent());
    };

    return (
        <button className="btn btn-primary fab" onClick={handleOpenModal}>
            <i className="fas fa-plus"></i>
        </button>
    );
};
