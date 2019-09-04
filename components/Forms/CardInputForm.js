import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  hideAddCardForm,
  addCard,
  addCardToDay,
  updateCard,
} from 'actions/schedulerActions';
import uuid from 'uuid/v1';
import { SERVICES, MONTAGES_PCV, MONTAGES_ALU } from 'utils/constants';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  actionsRoot: {
    justifyContent: 'flex-end',
  },
  errorInfo: {
    flex: 'auto',
    paddingLeft: 8,
    color: theme.palette.error.main,
  },
}));

const CardInputForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { activeDay, editedCardData, dialogOpened } = useSelector(
    state => state.scheduler
  );

  const [values, setValues] = useState(() => {
    if (editedCardData) {
      return { ...editedCardData };
    }
    return {
      name: '',
      address: '',
      phone: '',
      service: '',
      additional: '',
      montage: '',
      label: '',
      confirmed: false,
      reserved: false,
    };
  });

  const [error, setError] = useState(false);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === 'service') {
      setValues(values => ({
        ...values,
        montage: '',
      }));
    }
  };

  const handleCheckboxChange = event => {
    setValues({
      ...values,
      [event.target.name]: !values[event.target.name],
    });
  };

  const isValid = () =>
    values.name && values.address && values.service ? true : false;

  const handleSubmit = () => {
    if (dialogOpened && isValid()) {
      if (editedCardData) {
        dispatch(updateCard({ ...values }));
      } else {
        const cardId = uuid();
        dispatch(addCard({ ...values, id: cardId }));
        dispatch(addCardToDay(activeDay, cardId));
      }
      dispatch(hideAddCardForm());
    } else {
      setError(true);
    }
  };

  return (
    <Card>
      <form autoComplete="off" noValidate>
        <CardHeader
          subheader="Pola oznaczone gwiazdką * są wymagane"
          title="Formularz dodawania/edycji karty"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.reserved}
                    onChange={handleCheckboxChange}
                    value={values.reserved}
                    color="primary"
                    name="reserved"
                  />
                }
                label="Rezerwacja terminu"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.confirmed}
                    onChange={handleCheckboxChange}
                    value={values.confirmed}
                    color="secondary"
                    name="confirmed"
                  />
                }
                label="Termin potwierdzony"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Klient / Nazwa"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                error={error && !values.name}
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adres"
                margin="dense"
                name="address"
                onChange={handleChange}
                required
                error={error && !values.address}
                value={values.address}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Nr telefonu"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                error={error && !values.service}
                margin="dense"
                name="service"
                select
                label="Rodzaj usługi"
                value={values.service}
                onChange={handleChange}
                variant="outlined"
              >
                {SERVICES.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="dense"
                name="montage"
                select
                disabled={
                  values.service !== 'Montaż PCV' &&
                  values.service !== 'Montaż ALU'
                }
                label="Rodzaj montażu"
                value={values.montage}
                onChange={handleChange}
                variant="outlined"
              >
                {(values.service === 'Montaż PCV'
                  ? MONTAGES_PCV
                  : MONTAGES_ALU
                ).map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dodatkowe informacje"
                name="additional"
                multiline
                rowsMax="4"
                value={values.additional}
                onChange={handleChange}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Etykieta"
                margin="dense"
                name="label"
                onChange={handleChange}
                value={values.label}
                variant="outlined"
                helperText="Wyświetlana gdy widok dnia jest zwinięty"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions classes={{ root: classes.actionsRoot }}>
          {error && !isValid() ? (
            <span className={classes.errorInfo}>
              Proszę uzupełnić pola zaznaczone na czerwono
            </span>
          ) : null}
          <Button
            variant="contained"
            onClick={() => dispatch(hideAddCardForm())}
          >
            Anuluj
          </Button>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Zapisz
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

CardInputForm.propTypes = {
  className: PropTypes.string,
};

export default CardInputForm;
