const access_key = "fc8beca7dc4aa94ebf302223f7bd846f";
path = 'live'

export const currencyAPI = (path) => {

  return fetch(
    'http://api.currencylayer.com/${path}?access_key=${access_key}'
  ).then(response => response.json());
};