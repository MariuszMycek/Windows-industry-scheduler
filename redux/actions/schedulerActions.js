// Export Constants
export const CHANGE_MONTH = 'CHANGE_MONTH';
export const HANDLE_MONTH_VISIBLE = 'HANDLE_MONTH_VISIBLE';
export const HANDLE_PANELS_EXPAND = 'HANDLE_PANEL_EXPAND';
export const COLLAPSE_ALL_PANELS_IN_MONTH = 'COLLAPSE_ALL_PANELS_IN_MONTH';
export const SHOW_ADD_CARD_FORM = 'SHOW_ADD_CARD_FORM';
export const HIDE_ADD_CARD_FORM = 'HIDE_ADD_CARD_FORM';
export const ADD_CARD = 'ADD_CARD';
export const ADD_CARD_TO_DAY = 'ADD_CARD_TO_DAY';
export const REMOVE_CARD = 'REMOVE_CARD';
export const REMOVE_CARD_FROM_DAY = 'REMOVE_CARD_FROM_DAY';
export const EDIT_CARD = 'EDIT_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';

// Export Actions
export function changeMonth(val) {
  return {
    type: CHANGE_MONTH,
    val,
  };
}

export function handleMonthVisible(bool) {
  return {
    type: HANDLE_MONTH_VISIBLE,
    bool,
  };
}

export function handlePanelsExpand(dayName, isExpanded) {
  return {
    type: HANDLE_PANELS_EXPAND,
    dayName,
    isExpanded,
  };
}

export function collapseAllPanelsInMonth(actualMonth) {
  return {
    type: COLLAPSE_ALL_PANELS_IN_MONTH,
    actualMonth,
  };
}

export function showAddCardForm(dayName) {
  return {
    type: SHOW_ADD_CARD_FORM,
    dayName,
  };
}

export function hideAddCardForm() {
  return {
    type: HIDE_ADD_CARD_FORM,
  };
}

export function addCard(values) {
  return {
    type: ADD_CARD,
    values,
  };
}

export function addCardToDay(dayName, cardId) {
  return {
    type: ADD_CARD_TO_DAY,
    dayName,
    cardId,
  };
}

export function removeCard(cardId) {
  return {
    type: REMOVE_CARD,
    cardId,
  };
}

export function removeCardFromDay(dayName, cardId) {
  return {
    type: REMOVE_CARD_FROM_DAY,
    dayName,
    cardId,
  };
}

export function editCard(cardData) {
  return {
    type: EDIT_CARD,
    cardData,
  };
}

export function updateCard(values) {
  return {
    type: UPDATE_CARD,
    values,
  };
}
