import { configure } from '@storybook/react';
import './style.css';

const req = require.context('../src', true, /.stories.js$/);

const loadStories = () => {
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);