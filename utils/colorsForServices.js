import theme from './theme';

export function colorsForServices(service) {
  const { common, serviceColor } = theme.palette;

  const style = {
    backgroundColor: serviceColor.lightGrey,
    color: service === 'Dostawa' ? common.white : common.black,
  };

  switch (service) {
    case 'Montaż PCV':
      style.backgroundColor = serviceColor.blue;
      break;

    case 'Montaż ALU':
      style.backgroundColor = serviceColor.red;
      break;

    case 'Montaż ZABUDOWA':
      style.backgroundColor = serviceColor.green;
      break;

    case 'Dostawa':
      style.backgroundColor = serviceColor.darkGrey;
  }
  return style;
}
