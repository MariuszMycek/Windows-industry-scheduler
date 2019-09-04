import moment from 'moment';

// Initial State
moment.locale('pl');
const currentDate = moment().format('D[ ]MMMM[ ]YYYY');

const initialState = { currentDate };

export default function app(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
