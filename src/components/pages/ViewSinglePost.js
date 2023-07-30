/** @format */

import React, { useEffect, useState, useContext } from 'react';
import Page from './Page';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import LoadingDotsIcon from './LoadingDotsIcon';
import NotFound from './NotFound';
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';

function ViewSinglePost() {
  const navigate = useNavigate();
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchPost() {
      try {
        const response = await Axios.get(`http://localhost:8080/post/${id}`, {
          cancelToken: ourRequest.token
        });
        setPost(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log('There was a problem or the request was cancelled');
      }
    }
    fetchPost();

    /*
    For example, imagine this Axios request takes three or four seconds to complete,
    but during those three or four seconds, the user clicks away back to the homepage.
    Well then in another three or four seconds this code is still going to attempt to be executed, only,
    this component is not even in the picture any longer, right? So that's a waste of memory
    or a waste of computer resources. So to get around this problem
    anytime we perform an asynchronous action within use effect,
    well we just want to be sure to clean up after ourselves. What I mean by this is within use effect,
    or I should say within the function that we give use effect we can return a cleanup function.
    */
    return () => {
      ourRequest.cancel();
    };
  }, [id]);

  if (!isLoading && !post) {
    return <NotFound />;
  }

  if (isLoading)
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );

  const date = new Date(post.createdDate);
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  function isOwner() {
    if (appState.loggedIn) {
      return appState.user.username == post.author.username;
    }

    return false;
  }

  async function deleteHandler() {
    const areYouSure = window.confirm('Do you really wante to delete this post?');
    if (areYouSure) {
      try {
        const response = await Axios.delete(`/post/${id}`, {
          data: { token: appState.user.token }
        });
        if (response.data == 'Success') {
          // 1. display a flash message
          appDispatch({
            type: 'flashMessages',
            value: 'Post was successfully deleted.'
          });
          // 2. redirect back to the current user's profile
          navigate(`/profile/${appState.user.username}`);
        }
      } catch (error) {
        console.log('There was a problem');
      }
    }
  }

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        {isOwner() && (
          <span className="pt-2">
            <Link
              to={`/post/${post._id}/edit`}
              data-tooltip-content="Edit"
              data-tooltip-id="edit"
              className="text-primary mr-2">
              <i className="fas fa-edit"></i>
            </Link>
            <a
              onClick={deleteHandler}
              data-tooltip-content="Delete"
              data-tooltip-id="delete"
              className="delete-post-button text-danger">
              <i className="fas fa-trash"></i>
            </a>
          </span>
        )}
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} />
        </Link>
        Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on{' '}
        {dateFormatted}
      </p>

      <div className="body-content"></div>
    </Page>
  );
}

export default ViewSinglePost;
