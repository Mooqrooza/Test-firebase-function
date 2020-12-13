const fs = require('fs');
const storedDataJson = require('./lib/test-data/form-data.json');
const storedData = storedDataJson;

/* Emulate some data processing & their return */
const processRecivedData = (receivedData) => {
    let randomBoolean = Math.random() <= 0.5;
    const keysMatching = {
      qZh: 'Qж', wPr: '% воды', qH: 'Qh', nD: 'Нд',
      rLin: 'Рлин', rBuf: 'Рбуф', rZat: 'Рзатр',
    };
    const setToAgreePropsInStoredData = (value, name) => {
      name = keysMatching[name];
      storedData.numberParameters.forEach( item => {
        if (item.name === name) {
          item.agreeProps = value;
          item.valid = randomBoolean;
        }
      });
      randomBoolean = !randomBoolean;
    };
    for (let i = 0; i < receivedData.length; i++) {
      const name = Object.keys(receivedData[i])[0];
      const value = receivedData[i][name];
      switch (true) {
        case name === 'qZh':
          setToAgreePropsInStoredData(value, name);
          break;
        case name === 'wPr':
          setToAgreePropsInStoredData(value, name);
          break;
        case name === 'qH':
        case name === 'nD':
        case name === 'rLin':
        case name === 'rBuf':
        case name === 'rZat':
          setToAgreePropsInStoredData(value, name);
          break;
        case name === 'reasonsForRejec':
          storedData.reasonsForRejec.forEach( item => {
            item.name === value ? item.select = true : item.select = false;
          });
          break;
        case name === 'newRequestDate':
         storedData.newRequestDate.value = value;
      }
    }
    storedData.recoveryActivity.value = 'ОПЗ водой + ПАВ';
    fs.writeFileSync('./src/lib/test-data/form-data.json', JSON.stringify(storedData));
    return storedData;
};

/* Reset sotred data */
const resetStoredData = () => {
  storedData.newRequestDate.value = '';
  storedData.lastRequestDate.value = '08.08.2020';
  storedData.recoveryActivity.value = '';
  storedData.reasonsForRejec.forEach( item => item.select = false );
  storedData.numberParameters.forEach( item => {
    item.agreeProps = '';
    item.valid = true;
  });
};

module.exports = {
  processRecivedData,
  resetStoredData,
};
