import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from './TopBar';
import Month from './Month';
import uuid from 'uuid/v1';

import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actualDate: '',
      actualMonth: '',
      daysInMonth: 0,
      monthDiff: 0,
      expandedDays: [],
      monthVisible: true,
      daysWithCards: [],
      cards: [],
    };
  }

  componentDidMount() {
    moment.locale('pl');
    this.setState({
      actualDate: moment().format('MMMM[ ]YYYY'),
      actualMonth: moment().format('MMMM[ ]YYYY'),
    });
    this.setState(state => ({
      daysInMonth: moment(state.actualMonth, 'MMMM[ ]YYYY').daysInMonth(),
    }));
  }

  addCard = dayName => {
    const cardId = uuid();
    const newCard = {
      id: cardId,
      title: 'new Card',
    };
    this.setState({ cards: [...this.state.cards, newCard] });
    this.addCardToDay(dayName, cardId);
  };

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
          addCard={this.addCard}
        />
      </div>
    );
  }
}

export default App;
