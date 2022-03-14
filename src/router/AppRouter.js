import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginScreen />
                </Route>
                <Route exact path="/">
                    <CalendarScreen />
                </Route>
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};
