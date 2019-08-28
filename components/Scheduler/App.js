import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from './TopBar';
import Month from './Month';
import UniversalDialog from '../UniversalDialog';
import uuid from 'uuid/v1';

import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: '',
      actualMonth: '',
      daysInMonth: 0,
      monthDiff: 0,
      expandedDays: [],
      monthVisible: true,
      daysWithCards: [],
      cards: [],
      dialogOpened: false,
      activeDay: '',
      dialogContent: '',
      editedCardData: null,
    };
  }

  componentDidMount() {
    moment.locale('pl');
    this.setState({
      currentDate: moment().format('D[ ]MMMM[ ]YYYY'),
      actualMonth: moment().format('MMMM[ ]YYYY'),
    });
    this.setState(state => ({
      daysInMonth: moment(state.actualMonth, 'MMMM[ ]YYYY').daysInMonth(),
    }));
  }

  editCard = cardData => {
    this.setState({ editedCardData: cardData });
    this.handleDialogOpen('CardInputForm');
  };

  updateCard = values => {
    const updatedCards = this.state.cards.map(card => {
      if (card.id === this.state.editedCardData.id) {
        const updatedCard = { ...values };
        return updatedCard;
      }
      return card;
    });

    this.setState({ cards: [...updatedCards] });
    this.setState(() => ({ editedCardData: null }));
  };

  handleDialogOpen = content =>
    this.setState({ dialogOpened: true, dialogContent: content });

  handleDialogClose = () => this.setState({ dialogOpened: false });

  displayAddCardForm = dayName => {
    this.handleDialogOpen('CardInputForm');
    this.setState({ activeDay: dayName });
  };

  addCard = values => {
    const cardId = uuid();
    const newCard = {
      id: cardId,
      ...values,
    };
    this.setState({ cards: [...this.state.cards, newCard] });
    this.addCardToDay(this.state.activeDay, cardId);
  };

  removeCard = cardId => {
    const newCards = this.state.cards.filter(card => card.id !== cardId);
    this.setState({ cards: newCards });
  };

  removeCardFromDay = (dayName, cardId) => {
    const newDaysWithCards = this.state.daysWithCards.map(day => {
      if (day.dayName === dayName) {
        const newCards = day.cards.filter(card => card !== cardId);

        return { ...day, cards: newCards };
      }
      return day;
    });
    this.setState({ daysWithCards: newDaysWithCards });
    this.removeCard(cardId);
    // this.removeEmptyDayFromDayWithCards();
  };

  // removeEmptyDayFromDayWithCards = () => {
  //   const newDaysWithCards = this.state.daysWithCards.filter(
  //     day => day.cards !== 0
  //   );
  //   this.setState(() => ({ daysWithCards: newDaysWithCards }));
  // };

  addCardToDay = (dayName, cardId) => {
    const isDayInArray = this.state.daysWithCards.some(
      day => day.dayName === dayName
    );
    if (isDayInArray) {
      const newDaysWithCards = this.state.daysWithCards.map(day => {
        if (day.dayName === dayName) {
          return { ...day, cards: [...day.cards, cardId] };
        }
        return day;
      });
      this.setState({ daysWithCards: newDaysWithCards });
    } else {
      const newDay = {
        dayName,
        cards: [cardId],
      };
      this.setState({
        daysWithCards: [...this.state.daysWithCards, newDay],
      });
    }
  };

  handlePanelsExpand = panel => (event, expanded) => {
    this.setState({
      expandedDays: expanded
        ? [...this.state.expandedDays, panel]
        : this.state.expandedDays.filter(item => item !== panel),
    });
  };

  collapseAllPanels = month => {
    this.setState({
      expandedDays: this.state.expandedDays.filter(
        item => !item.includes(month)
      ),
    });
  };

  changeMonth = val => {
    this.setState({ monthVisible: false });
    setTimeout(() => {
      this.setState({
        monthDiff: this.state.monthDiff + val,
      });
      this.setState(state => ({
        actualMonth: moment()
          .add(state.monthDiff, 'months')
          .format('MMMM[ ]YYYY'),
      }));
      this.setState(state => ({
        daysInMonth: moment(state.actualMonth, 'MMMM[ ]YYYY').daysInMonth(),
      }));
    }, 150);
    setTimeout(() => {
      this.setState({ monthVisible: true });
    }, 300);
  };

  render() {
    return (
      <div>
        <TopBar
          changeMonth={this.changeMonth}
          collapseAllPanels={this.collapseAllPanels}
          {...this.state}
        />
        <Month
          {...this.state}
          handlePanelsExpand={this.handlePanelsExpand}
          removeCardFromDay={this.removeCardFromDay}
          displayAddCardForm={this.displayAddCardForm}
          handleDialogClose={this.handleDialogClose}
          editCard={this.editCard}
        />
        <UniversalDialog
          dialogOpened={this.state.dialogOpened}
          handleDialogClose={this.handleDialogClose}
          addCard={this.addCard}
          dialogContent={this.state.dialogContent}
          editedCardData={this.state.editedCardData}
          updateCard={this.updateCard}
        />
      </div>
    );
  }
}

export default App;
