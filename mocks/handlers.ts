import { http, HttpResponse } from 'msw';
import forms from './data/forms-data.json';

export const handlers = [
  http.get('https://api.briflify.com/forms/', ({}) => HttpResponse.json(forms)),
];
