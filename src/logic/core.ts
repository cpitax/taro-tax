interface tax {
  taxRate: number;
  deduction: number;
  rankIndex: number;
}

function AccurateAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}
//减法
function AccurateSubtract(arg1, arg2) {
  return AccurateAdd(arg1, -arg2);
}

//乘法
function AccurateMultiply(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}

//除法
function AccurateVivide(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

//保留两位小数
function getFloor(num) {
  return num.toFixed(2);
}

//正推得到税率和速算扣除数（工资,年终奖）
function getTax(preTax) {
  var taxRate, deduction;
  if (preTax >= 0 && preTax <= 1500) {
    taxRate = 0.03;
    deduction = 0;
  } else if (preTax > 1500 && preTax <= 4500) {
    taxRate = 0.1;
    deduction = 105;
  } else if (preTax > 4500 && preTax <= 9000) {
    taxRate = 0.2;
    deduction = 555;
  } else if (preTax > 9000 && preTax <= 35000) {
    taxRate = 0.25;
    deduction = 1005;
  } else if (preTax > 35000 && preTax <= 55000) {
    taxRate = 0.3;
    deduction = 2755;
  } else if (preTax > 55000 && preTax <= 80000) {
    taxRate = 0.35;
    deduction = 5505;
  } else if (preTax > 80000) {
    taxRate = 0.45;
    deduction = 13505;
  }
  return {
    taxRate: taxRate,
    deduction: deduction
  };
}

//反推得到税率和速算扣除数（工资）
function getRelativeTax(preTax) {
  var taxRate, deduction;
  if (preTax > 0 && preTax <= 1455) {
    taxRate = 0.03;
    deduction = 0;
  } else if (preTax > 1455 && preTax <= 4155) {
    taxRate = 0.1;
    deduction = 105;
  } else if (preTax > 4155 && preTax <= 7755) {
    taxRate = 0.2;
    deduction = 555;
  } else if (preTax > 7755 && preTax <= 27255) {
    taxRate = 0.25;
    deduction = 1005;
  } else if (preTax > 27255 && preTax <= 41255) {
    taxRate = 0.3;
    deduction = 2755;
  } else if (preTax > 41255 && preTax <= 57505) {
    taxRate = 0.35;
    deduction = 5505;
  } else if (preTax > 57505) {
    taxRate = 0.45;
    deduction = 13505;
  }
  return {
    taxRate: taxRate,
    deduction: deduction
  };
}

//正推得到税率和速算扣除数（工资,年终奖） NEW
function getTaxNew(preTax): tax {
  var taxRate, deduction, rankIndex;
  if (preTax >= 0 && preTax <= 3000) {
    taxRate = 0.03;
    deduction = 0;
    rankIndex = 1;
  } else if (preTax > 3000 && preTax <= 12000) {
    taxRate = 0.1;
    deduction = 210;
    rankIndex = 2;
  } else if (preTax > 12000 && preTax <= 25000) {
    taxRate = 0.2;
    deduction = 1410;
    rankIndex = 3;
  } else if (preTax > 25000 && preTax <= 35000) {
    taxRate = 0.25;
    deduction = 2660;
    rankIndex = 4;
  } else if (preTax > 35000 && preTax <= 55000) {
    taxRate = 0.3;
    deduction = 4410;
    rankIndex = 5;
  } else if (preTax > 55000 && preTax <= 80000) {
    taxRate = 0.35;
    deduction = 7160;
    rankIndex = 6;
  } else if (preTax > 80000) {
    taxRate = 0.45;
    deduction = 15160;
    rankIndex = 7;
  }
  return {
    taxRate: taxRate,
    deduction: deduction,
    rankIndex: rankIndex
  };
}

//反推得到税率和速算扣除数（工资,年终奖） NEW
function getRelativeTaxNew(preTax) {
  var taxRate, deduction, rankIndex;
  if (preTax >= 0 && preTax <= 2910) {
    taxRate = 0.03;
    deduction = 0;
    rankIndex = 1;
  } else if (preTax > 2910 && preTax <= 11010) {
    taxRate = 0.1;
    deduction = 210;
    rankIndex = 2;
  } else if (preTax > 11010 && preTax <= 21410) {
    taxRate = 0.2;
    deduction = 1410;
    rankIndex = 3;
  } else if (preTax > 21410 && preTax <= 28910) {
    taxRate = 0.25;
    deduction = 2660;
    rankIndex = 4;
  } else if (preTax > 28910 && preTax <= 42910) {
    taxRate = 0.3;
    deduction = 4410;
    rankIndex = 5;
  } else if (preTax > 42910 && preTax <= 59160) {
    taxRate = 0.35;
    deduction = 7160;
    rankIndex = 6;
  } else if (preTax > 59160) {
    taxRate = 0.45;
    deduction = 15160;
    rankIndex = 7;
  }
  return {
    taxRate: taxRate,
    deduction: deduction,
    rankIndex: rankIndex
  };
}

//根据缴纳的个税得到税率和速算扣除数
function getPretaxNew(tax) {
  var taxRate, deduction, rankIndex;
  if (tax >= 0 && tax <= 90) {
    taxRate = 0.03;
    deduction = 0;
    rankIndex = 1;
  } else if (tax > 90 && tax <= 990) {
    taxRate = 0.1;
    deduction = 210;
    rankIndex = 2;
  } else if (tax > 990 && tax <= 3590) {
    taxRate = 0.2;
    deduction = 1410;
    rankIndex = 3;
  } else if (tax > 3590 && tax <= 6090) {
    taxRate = 0.25;
    deduction = 2660;
    rankIndex = 4;
  } else if (tax > 6090 && tax <= 12090) {
    taxRate = 0.3;
    deduction = 4410;
    rankIndex = 5;
  } else if (tax > 12090 && tax <= 20840) {
    taxRate = 0.35;
    deduction = 7160;
    rankIndex = 6;
  } else if (tax > 20840) {
    taxRate = 0.45;
    deduction = 15160;
    rankIndex = 7;
  }
  return {
    taxRate: taxRate,
    deduction: deduction,
    rankIndex: rankIndex
  };
}
//计算工资
function calculationSalaryAct(type, income, five, rangeTemp) {
  // console.log("已知参数", type, income, five, rangeTemp);
  let preTax = 0; //应纳税所得额
  let money = 0; //税后工资
  let preTaxMoney = 0;
  let tax = 0; //应纳税额
  let taxRate = 0; //税率
  let rankIndex = 0; //处于第几档
  let deduction = 0; //速算扣除数
  let range = rangeTemp;
  let taxObj = {};
  let temp1 = 0;
  if (type == 0) {
    preTaxMoney = income;
    if (preTaxMoney <= AccurateAdd(range, five)) {
      return {
        preTax: getFloor(preTax),
        taxRate: taxRate,
        deduction: deduction,
        money: getFloor(AccurateSubtract(preTaxMoney, five)),
        tax: getFloor(tax),
        preTaxMoney: getFloor(preTaxMoney),
        five: five,
        rankIndex: rankIndex
      };
    }
    temp1 = AccurateAdd(range, five); //税前 - 五险一金
    preTax = AccurateSubtract(preTaxMoney, temp1); //税前 - 五险一金 - 范围
    if (range == 5000) {
      taxObj = getTaxNew(preTax); //得到税率和扣除数
    } else {
      taxObj = getTax(preTax); //得到税率和扣除数
    }
    taxRate = taxObj.taxRate;
    deduction = taxObj.deduction;
    rankIndex = taxObj.rankIndex;

    tax = AccurateMultiply(preTax, taxRate);
    tax = AccurateSubtract(tax, deduction);
    temp1 = AccurateAdd(tax, five);
    money = AccurateSubtract(income, temp1); //再减去五险一金
  } else {
    //输入税后工资 税前工资 = （税后工资 - 起征点*税率 - 速算扣除数）/(1-税率) + 五险一金
    var temp = 0;
    var rateTemp = 0;
    money = income;
    if (money <= range) {
      return {
        preTax: getFloor(preTax),
        taxRate: taxRate,
        deduction: deduction,
        money: getFloor(money),
        tax: getFloor(tax),
        preTaxMoney: getFloor(AccurateAdd(money, five)),
        five: five,
        rankIndex: rankIndex
      };
    }
    if (range == 5000) {
      taxObj = getRelativeTaxNew(AccurateSubtract(money, range)); //得到税率和扣除数
    } else {
      taxObj = getRelativeTax(AccurateSubtract(money, range)); //得到税率和扣除数
    }
    taxRate = taxObj.taxRate;
    deduction = taxObj.deduction;
    rankIndex = taxObj.rankIndex;
    temp = AccurateMultiply(range, taxRate); //起征点*税率
    temp = AccurateSubtract(money, temp); //（税后工资 - 起征点*税率)

    temp = AccurateSubtract(temp, deduction); //（税后工资 - 起征点*税率 - 速算扣除数）
    rateTemp = AccurateSubtract(1, taxRate); //(1-税率)
    temp = AccurateVivide(temp, rateTemp); //（税后工资 - 起征点*税率 - 速算扣除数）/(1-税率)
    preTaxMoney = AccurateAdd(temp, five); //+ 五险一金
    tax = AccurateSubtract(preTaxMoney, money); //（税后所得额 - 税后钱数）
    tax = AccurateSubtract(tax, five); //(税后所得额 - 税后钱数-五险一金）

    preTax = AccurateAdd(money, tax); //应纳税所得额 税前+应纳税额
  }

  return {
    preTax: getFloor(preTax),
    taxRate: taxRate,
    deduction: deduction,
    money: getFloor(money),
    tax: getFloor(tax),
    preTaxMoney: getFloor(preTaxMoney),
    five: five,
    rankIndex: rankIndex
  };
}
//通过应纳税额，计算结果 税前工资=（个税+速算扣除数）/税率+起征点+五险一金+专项扣除
function calculationSalaryTax(tax, five, rangeTemp) {
  let preTax = 0; //应纳税所得额
  let money = 0; //税后工资
  let preTaxMoney = 0; //税前工资
  let taxRate = 0; //税率
  let rankIndex = 0; //处于第几档
  let deduction = 0; //速算扣除数
  let range = rangeTemp;
  let taxObj = null;
  let temp = null;
  let fiveRangeTemp = null;
  taxObj = getPretaxNew(tax); //得到税率和扣除数
  taxRate = taxObj.taxRate;
  deduction = taxObj.deduction;
  rankIndex = taxObj.rankIndex;
  temp = AccurateAdd(tax, deduction); //（个税+速算扣除数）
  temp = AccurateVivide(temp, taxRate); //个税+速算扣除数）/税率
  fiveRangeTemp = AccurateAdd(five, range); //(起征点+五险一金)
  preTaxMoney = AccurateAdd(temp, fiveRangeTemp); //个税+速算扣除数）/税率+起征点+五险一金
  preTax = AccurateSubtract(preTaxMoney, fiveRangeTemp); //应纳个税所得额 = 税前工资 - （五险一金 +起征点)
  temp = AccurateSubtract(preTaxMoney, five);
  money = AccurateSubtract(temp, tax); //税后工资 = 税前工资 - 五险一金-缴纳的税额
  return {
    preTax: getFloor(preTax),
    taxRate: taxRate,
    deduction: deduction,
    money: getFloor(money),
    tax: getFloor(tax),
    preTaxMoney: getFloor(preTaxMoney),
    five: five,
    rankIndex: rankIndex
  };
}

export const calc = (income, insure, baseLine) => {
  return calculationSalaryAct(
    0,
    Number(income),
    Number(insure),
    Number(baseLine)
  );
};
export const calcReverse = (income, insure, baseLine) => {
  return calculationSalaryAct(
    1,
    Number(income),
    Number(insure),
    Number(baseLine)
  );
};
