import Options from './collection.js';

Options.getOption = function (optionName) {
  q = Options.findOne({optionName: optionName})
  if (q)
  return q.optionValue;
};
