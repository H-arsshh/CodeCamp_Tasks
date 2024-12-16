function checkCashRegister(price, cash, cid) {
  const CURRENCY_UNIT = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
  ];

  let changeDue = cash - price;

 
  let totalCid = cid.reduce((sum, curr) => sum + curr[1], 0);
  totalCid = Math.round(totalCid * 100) / 100; 
  
  if (totalCid === changeDue) {
    return { status: "CLOSED", change: cid };
  }

  
  if (totalCid < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }


  let changeArray = [];
  let changeDueRemaining = changeDue;


  for (let i = CURRENCY_UNIT.length - 1; i >= 0; i--) {
    const currencyName = CURRENCY_UNIT[i][0];
    const currencyValue = CURRENCY_UNIT[i][1];
    const cidAmount = cid[i][1];

    let amountFromThisCurrency = 0;

    while (changeDueRemaining >= currencyValue && cidAmount - amountFromThisCurrency >= currencyValue) {
      amountFromThisCurrency += currencyValue;
      changeDueRemaining -= currencyValue;
      changeDueRemaining = Math.round(changeDueRemaining * 100) / 100; 
    }

    if (amountFromThisCurrency > 0) {
      changeArray.push([currencyName, amountFromThisCurrency]);
    }
  }

  if (changeDueRemaining > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: changeArray };
}