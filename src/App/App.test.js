import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Service from '../Service'

const fetch = jest.fn(() => new Promise(resolve => resolve()));
const e = {
  preventDefault: () => {},
  target: {
    type: 'text'
  }
};

it('renders without crashing', () => {
  const service = new Service('');
  const div = document.createElement('div');
  ReactDOM.render(<App service={service}/>, div);
});

it('searches for contacts', () => {
  const service = new Service('');
  const app = new App({service: service});
  app.searchChange(e);
  app.searchSubmit(e);
  app.updateContacts([{}]);
  app.reset();
});
