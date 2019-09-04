import moment from 'moment';

// import actions
import {
  CHANGE_MONTH,
  HANDLE_MONTH_VISIBLE,
  HANDLE_PANELS_EXPAND,
  COLLAPSE_ALL_PANELS_IN_MONTH,
  SHOW_ADD_CARD_FORM,
  HIDE_ADD_CARD_FORM,
  ADD_CARD,
  ADD_CARD_TO_DAY,
  REMOVE_CARD,
  REMOVE_CARD_FROM_DAY,
  EDIT_CARD,
  UPDATE_CARD,
} from 'actions/schedulerActions';

// Initial State
moment.locale('pl');
const initialActualMonth = moment().format('MMMM[ ]YYYY');

const initialState = {
  actualMonth: initialActualMonth,
  monthVisible: true,
  expandedDays: [],
  dialogOpened: false,
  dialogContent: '',
  activeDay: '',
  daysWithCards: [],
  cards: [],
  editedCardData: null,
};

export default function scheduler(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MONTH: {
      const newMonth = moment(state.actualMonth, 'MMMM[ ]YYYY')
        .add(action.val, 'months')
        .format('MMMM[ ]YYYY');
      console.log(newMonth);
      return { ...state, actualMonth: newMonth };
    }

    case HANDLE_MONTH_VISIBLE:
      return { ...state, monthVisible: action.bool };

    case HANDLE_PANELS_EXPAND: {
      const expandedDaysArray = [...state.expandedDays];
      const newExpandedDays = action.isExpanded
        ? [...expandedDaysArray, action.dayName]
        : expandedDaysArray.filter(item => item !== action.dayName);
      return { ...state, expandedDays: newExpandedDays };
    }

    case COLLAPSE_ALL_PANELS_IN_MONTH: {
      const newExpandedDays = [...state.expandedDays].filter(
        item => !item.includes(action.actualMonth)
      );
      return { ...state, expandedDays: newExpandedDays };
    }

    case SHOW_ADD_CARD_FORM:
      return {
        ...state,
        dialogOpened: true,
        dialogContent: 'CardInputForm',
        activeDay: action.dayName,
      };

    case HIDE_ADD_CARD_FORM:
      return {
        ...state,
        dialogOpened: false,
        dialogContent: '',
        activeDay: '',
      };

    case ADD_CARD:
      return { ...state, cards: [...state.cards, { ...action.values }] };

    case ADD_CARD_TO_DAY: {
      const daysWithCards = [...state.daysWithCards];
      const isDayInArray = daysWithCards.some(
        day => day.dayName === action.dayName
      );
      if (isDayInArray) {
        const newDaysWithCards = daysWithCards.map(day => {
          if (day.dayName === action.dayName) {
            return { ...day, cards: [...day.cards, action.cardId] };
          }
          return day;
        });
        return { ...state, daysWithCards: newDaysWithCards };
      } else {
        const newDay = {
          dayName: action.dayName,
          cards: [action.cardId],
        };
        return { ...state, daysWithCards: [...state.daysWithCards, newDay] };
      }
    }

    case REMOVE_CARD: {
      const newCards = [...state.cards].filter(
        card => card.id !== action.cardId
      );
      return { ...state, cards: newCards };
    }

    case REMOVE_CARD_FROM_DAY: {
      const newDaysWithCards = [...state.daysWithCards].map(day => {
        if (day.dayName === action.dayName) {
          const newCards = day.cards.filter(card => card !== action.cardId);

          return { ...day, cards: newCards };
        }
        return day;
      });
      return { ...state, daysWithCards: newDaysWithCards };
    }

    case EDIT_CARD:
      return { ...state, editedCardData: action.cardData };

    case UPDATE_CARD: {
      const updatedCards = [...state.cards].map(card => {
        if (card.id === state.editedCardData.id) {
          const updatedCard = { ...action.values };
          return updatedCard;
        }
        return card;
      });
      return { ...state, cards: updatedCards, editedCardData: null };
    }

    default:
      return state;
  }
}
