const access_key = "fc8beca7dc4aa94ebf302223f7bd846f";

export const currencyApi = (path, date) => {
  let suffix = '';

  if (path == 'live') {
    suffix = '';
  } else if (path == 'historical') {
    suffix = `&date=${date}`;
  }

  return fetch(`http://api.currencylayer.com/${path}?access_key=${access_key}${suffix}&currencies=USD,GBP,HKD,JPY,MXN,AUD&format=1`)
    .then(response => response.json())
  // .then(response => {
  //   console.log("response", response);
  // })
  // .catch(err => {
  //   console.log("error", err);
  // });
}
