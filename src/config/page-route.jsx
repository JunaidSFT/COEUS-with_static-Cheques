import React from 'react';
import { Redirect } from 'react-router';
import All from '../pages/all/all.js';
import Analytics from '../pages/analytics/analytics.js';
import Upload from '../pages/upload/upload.js';
import Login from '../pages/login/login.js';
import Messages from '../pages/messages/messages.js';
import Verification from '../pages/verification/verification.js';
import Detail from '../pages/detail/detail.js';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to='/login'/>
  },
  {
    path: '/login',
    title: 'Login',
    component: () => <Login />,
  },
  {
    path: '/all',
    exact: true,
    title: 'All',
    component: () => <All />
  },
  {
    path: '/detail',
    exact: true,
    title: 'Detail',
    component: () => <Detail />
  },
  {
    path: '/verification',
    exact: true,
    title: 'Verification',
    component: () => <Verification />
  },
  {
    path: '/messages',
    exact: true,
    title: 'Messages',
    component: () => <Messages />
  },
  {
    path: '/analytics',
    exact: true,
    title: 'Analytics',
    component: () => <Analytics />
  },
  {
    path: '/upload',
    exact: true,
    title: 'Upload',
    component: () => <Upload />
  },
  
];


export default routes;