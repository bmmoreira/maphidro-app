import React, { useState, useEffect, useContext } from 'react';
import Page from './Page';
import Axios from 'axios';
import Image from 'react-bootstrap/Image';
import { useImmerReducer } from 'use-immer';
import DispatchContext from '../../DispatchContext';
import { CSSTransition } from 'react-transition-group';

/*
Adding validation and automatically log in a successfully registered user
*/

function HomeGuest() {
  const appDispatch = useContext(DispatchContext);

  /*
  Essentially, before we let the user actually submit and send a request to the server
  we want to first make sure that whatever username they entered is unique, meaning it's not already
  in use by another user in our database. So we'd wanna keep track of that, either true or false.
  And then while we're at it let's have another property named checkCcount and set that to just the number zero.
  Essentially, when we increment this, we can watch it for changes to go run an Axios request to actually see
  if the username is unique or not.
  */
  const initialState = {
    username: {
      value: '',
      hasErrors: false,
      message: '',
      isUnique: false,
      checkCount: 0
    },
    email: {
      value: '',
      hasErrors: false,
      message: '',
      isUnique: false,
      checkCount: 0
    },
    password: {
      value: '',
      hasErrors: false,
      message: ''
    },
    submitCount: 0
  };

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  function ourReducer(draft, action) {
    switch (action.type) {
      /*
      Let's have a case for usernameIimmediately, we can dispatch this type of action
      after every keystroke. Essentially on this element, this field here we would just add an 
      onChange event or onChange prop and we would just dispatch that username immediately
      with the latest value from this field. And then we could check for basic things in that case,
      such as for characters that are not alpha numeric or if the length is over 30 characters long.
      */
      case 'usernameImmediately':
        /* Because if this is going to run after every field value change well we'd want a clean slate each time.
           We'd want to first assume that there are no errors and then after this line of code
           we can begin to check for any potential errors. 
        */
        draft.username.hasErrors = false;
        draft.username.value = action.value;
        if (draft.username.value.length > 30) {
          draft.username.hasErrors = true;
          /* 
            if there is error we want animated the message Now I would want to animate or transition or
             fade the red warning box into view gradually. So up at the very top of our file importing 
             CSS transition.
          */
          draft.username.message = 'Username cannot exceed 30 characters.';
        }
        /*
          let's first make sure that the value isn't empty. So draft.username.value, just if it exists at all.
          So if it's not empty. And now this is where we can check to see if it contains non alpha numeric characters.
        */
        if (draft.username.value && !/^([a-zA-Z0-9]+)$/.test(draft.username.value)) {
          draft.username.hasErrors = true;
          draft.username.message = 'Username can only contain number and letters.';
        }
        break;
      /*
      Let's have another case, so case named usernameAfterDelay,
      and this is where we can check for things that would otherwise be annoying if you checked immediately.
      For example, imagine you started to choose a username and the very millisecond you typed in
      just your first keystroke. Imagine if there was already a warning saying,
      Hey your username must be at least three characters. That would be super annoying, right?
      So instead we'd probably wanna wait maybe 750 milliseconds or 800 milliseconds
      after the user has stopped typing all together.
      */
      case 'usernameAfterDelay':
        if (draft.username.value.length < 3) {
          draft.username.hasErrors = true;
          draft.username.message = 'Username must be at least 3 characters';
        }
        /*
         At this point I would also check to see if the username you've entered is unique
          or if someone in this app has already used it. So imagine someone types in myusername.
          We wouldn't want to check the server to see if that exists
          after every keystroke, right? We wouldn't wanna flood our server with a request
          for m, my, myu, myus, myuse, myuser, mysern, myuserna...
          Instead, our delay is perfect here. We'd wanna wait 800 milliseconds
          after they've stopped typing and then check to see if that is unique or not.
          *### the action.noRequest ### is used when the user clicks on the submit button
          to avoid to make the checks agains, because it was already done when the user
          filled thoses fiels
        */
        if (!draft.username.hasErrors && !action.noRequest) {
          /*
					if there are no existing errors, then I would want to increment the check count
					that will trigger an Axios request. So the if condition is draft dot has errors,
					and then to check for the opposite of that, just include an exclamation at the start.
					I'm doing this because if there's something wrong with the username,
					if it has a character that you're not allowed to have, obviously that's not going 
					to exist in the database yet so there's no reason to check for that.
					If it's not a valid username, we don't even need to check the database.
					So only if there are no errors then we would just increment the check count.
					**## Now we can just set up a use effect that watches this piece of state for changes, 
					and when it detects that, we just send off an Axios request.
					*/
          draft.username.checkCount++;
        }
        break;
      /*
      So imagine if the user types in a name and then we wait however many milliseconds
      we would want to check to see using Axios if this username has already been taken or not.
      Is this username unique?
      So if the server sent back a value of true, well, that means we have a problem.
      That means the username is already being used. It already exists.
      */
      case 'usernameUniqueResults':
        if (action.value) {
          draft.username.hasErrors = true;
          draft.username.isUnique = false;
          draft.username.message = 'That username is already taken';
        } else {
          draft.username.isUnique = true;
        }
        break;
      case 'emailImmediately':
        draft.email.hasErrors = false;
        draft.email.value = action.value;
        break;
      case 'emailAfterDelay':
        if (!/^\S+@\S+$/.test(draft.email.value)) {
          draft.email.hasErrors = true;
          draft.email.message = 'You must provide a valid email address';
        }
        if (!draft.email.hasErrors && !action.noRequest) {
          draft.email.checkCount++;
        }
        break;
      case 'emailUniqueResults':
        // if response is false
        if (action.value) {
          draft.email.hasErrors = true;
          draft.email.isUnique = false;
          draft.email.message = 'That email is already being used';
        } else {
          draft.email.isUnique = true;
        }
        break;
      case 'passwordImmediately':
        draft.password.hasErrors = false;
        draft.password.value = action.value;
        if (draft.password.value.length > 50) {
          draft.password.hasErrors = true;
          draft.password.message = 'Password cannot exceed 50 characters.';
        }
        break;
      case 'passwordAfterDelay':
        if (draft.password.value.length < 12) {
          draft.password.hasErrors = true;
          draft.password.message = 'Password must be at least 12 characters.';
        }
        break;
      case 'submitForm':
        if (
          !draft.username.hasErrors &&
          draft.username.isUnique &&
          !draft.email.hasErrors &&
          draft.email.isUnique &&
          !draft.password.hasErrors
        ) {
          draft.submitCount++;
        }
        return;
    }
  }

  /* 
    To to create that delay to check errors after users stopped typing for 800 milliseconds,
    just set up a use effect where I watch username dot value for changes.
    The depedndecy array has just one item to watch for changes: [state.username.value]
  */
  useEffect(() => {
    /*make sure username.value is not blank
        Because we don't wanna run this when the component first renders,
        but only if you've actually made a change to it. So if the value exists
        we can dispatch it. Right below that, then we would want to give this use effect function
        a cleanup function. So to do that, you just return a function and in the cleanup function,
        I would just want to clear this timeout. So clear timeout, that's a web browser function.
        In the parenthesis, you tell it which one to clear (delay)
        - First parameter is the fucntion we want to run, in this case 
        our reducer is where we would include any of our actual validation rules and logic.
        - Second parameter is the dealy
      */
    if (state.username.value) {
      const delay = setTimeout(() => dispatch({ type: 'usernameAfterDelay' }), 800);
      return () => clearTimeout(delay);
    }
  }, [state.username.value]);

  /* ## Now we can just set up a use effect that watches this piece of state for changes, 
          and when it detects that, we just send off an Axios request.
    */

  useEffect(() => {
    if (state.username.checkCount) {
      const ourRequest = Axios.CancelToken.source();
      const fResults = async function fetchResults() {
        try {
          const response = await Axios.post(
            'https://mh-api.maphidro.com/doesUsernameExist',
            { username: state.username.value },
            { cancelToken: ourRequest.token }
          );
          //server will respond with a value of true or false and we will pass to dispatch
          dispatch({
            type: 'usernameUniqueResults',
            value: response.data
          });
        } catch (error) {
          console.log('There was a problem or the request was cancel');
        }
      };
      fResults();
      return () => ourRequest.cancel();
    }
  }, [state.username.checkCount]);

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => dispatch({ type: 'emailAfterDelay' }), 800);
      return () => clearTimeout(delay);
    }
  }, [state.email.value]);

  useEffect(() => {
    if (state.password.value) {
      const delay = setTimeout(() => dispatch({ type: 'passwordAfterDelay' }), 800);
      return () => clearTimeout(delay);
    }
  }, [state.password.value]);

  useEffect(() => {
    if (state.email.checkCount) {
      const ourRequest = Axios.CancelToken.source();
      const fResults = async function fetchResults() {
        try {
          const response = await Axios.post(
            'https://mh-api.maphidro.com/doesEmailExist',
            { username: state.email.value },
            { cancelToken: ourRequest.token }
          );
          //server will respond with a value of true or false aand we will pass to dispatch
          dispatch({
            type: 'emailUniqueResults',
            value: response.data
          });
        } catch (error) {
          console.log('There was a problem or the request was cancel');
        }
      };
      fResults();
      return () => ourRequest.cancel();
    }
  }, [state.email.checkCount]);

  /* 
    At this point, we just need to set things up so that if you came to the page and left the fields blank
    but tried to submit the form, well, before we actually send a request to the back end,
    we would want to trigger and run all of our validation rules. Essentially, we want to make sure that
    we're happy with the values before we even bother our server.
    On our handle submit we can just call all our different rules
     -
    Now before we go into our reducer and set up the logic for this case, I do want to take care
    of a detail first, which is when the user clicks submit and we want to run our logic.
    I don't necessarily want to run the Axios is unique checks because if a user left either
    of these fields blank well the minimum length or other validation rules will catch
    that when you click submit. And if they actually did enter a name as soon
    as they stopped typing we've already checked to see if that's unique or not.
    So we wouldn't need to run the unique checks again if you click submit.
    So what I would do on the username after delay line here I would just give 
    it comma another property named no request. I just made up this name and set it to true.
    And let's do the same thing on the email after delay line.
  */

  function handleSubmit(e) {
    // prevent form from sending result when a web browser sees you submitting a form
    e.preventDefault();
    dispatch({ type: 'usernameImmediately', value: state.username.value });
    dispatch({
      type: 'usernameAfterDelay',
      value: state.username.value,
      noRequest: true
    });

    dispatch({ type: 'emailImmediately', value: state.email.value });
    dispatch({
      type: 'emailAfterDelay',
      value: state.email.value,
      noRequest: true
    });

    dispatch({ type: 'passwordImmediately', value: state.password.value });
    dispatch({ type: 'passwordAfterDelay', value: state.password.value });

    dispatch({ type: 'submitForm' });
  }

  useEffect(() => {
    if (state.submitCount) {
      const ourRequest = Axios.CancelToken.source();
      const fResult = async function fetchResults() {
        try {
          const response = await Axios.post(
            '/register',
            {
              username: state.username.value,
              email: state.email.value,
              password: state.password.value
            },
            { cancelToken: ourRequest.token }
          );
          appDispatch({ type: 'login', data: response.data });
          appDispatch({
            type: 'flashMessages',
            value: 'Congrats! Welcome to your new account'
          });
        } catch (error) {
          console.log('There was a problem or the request was cancel');
        }
      };
      fResult();
      return () => ourRequest.cancel();
    }
  }, [state.submitCount]);

  return (
    <Page wide={true} title="Welcome to Maphidro!">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5 text-center">
          <h1 className="display-3">Register to access</h1>
          <p className="lead text-muted">
            Dissertation project for MSc in Informatics Engineering and Web Technology UAB/UTAD
          </p>
          <Image src="./images/modals/logo_uab.png" alt="Uab_Logo" rounded />
        </div>
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Username</small>
              </label>
              <input
                onChange={(e) =>
                  dispatch({
                    type: 'usernameImmediately',
                    value: e.target.value
                  })
                }
                id="username-register"
                name="username"
                className="form-control"
                type="text"
                placeholder="Create your username"
                autoComplete="off"
              />
              {/*  Giving a logic so when CSSTransition should exist or not in the DOM
                    if username.has Errors plays the animation
              */}
              <CSSTransition
                in={state.username.hasErrors}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">
                  {state.username.message}
                </div>
              </CSSTransition>
            </div>
            <div className="form-group">
              <label htmlFor="email-register" className="text-muted mb-1">
                <small>Email</small>
              </label>
              <input
                onChange={(e) =>
                  dispatch({
                    type: 'emailImmediately',
                    value: e.target.value
                  })
                }
                id="email-register"
                name="email"
                className="form-control"
                type="text"
                placeholder="you@example.com"
                autoComplete="off"
              />
              <CSSTransition
                in={state.email.hasErrors}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">
                  {state.email.message}
                </div>
              </CSSTransition>
            </div>
            <div className="form-group">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>Password</small>
              </label>
              <input
                onChange={(e) =>
                  dispatch({
                    type: 'passwordImmediately',
                    value: e.target.value
                  })
                }
                id="password-register"
                name="password"
                className="form-control"
                type="password"
                placeholder="Create a password"
              />
              <CSSTransition
                in={state.password.hasErrors}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">
                  {state.password.message}
                </div>
              </CSSTransition>
            </div>
            <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
              Sign up for MapHidro
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
}

export default HomeGuest;
