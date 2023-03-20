import { SelectOption } from '../../components/public/input/type.SelectOption';
import optionsFunctions from '../../functions/optionsFunctions';

const sideOptions = optionsFunctions.getArrayOptions(['A', 'B']);

const illuminationOptions: SelectOption[] = [
  {
    display: 'Yra apšvietimas',
    key: 'true',
  },
  {
    display: 'Nėra apšvietimo',
    key: 'false',
  },
];

const premiumOptions: SelectOption[] = [
  {
    display: 'Tik premium',
    key: 'true',
  },
  {
    display: 'Tik ne premium',
    key: 'false',
  },
];

const objectOptions = {
  sideOptions,
  premiumOptions,
  illuminationOptions,
};

export default objectOptions;
