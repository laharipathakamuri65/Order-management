console.log("Hi, we are in callBack");
export function getCallback() {
  let myHusband = "";

  //conditional statements
  console.log('Conditional Statements ==============');
  if (myHusband == "dirty fellow") {
    console.log(" My husband is very dirty fellow");
  } else if (myHusband == "naughty fellow") {
    console.log("My husband is very naughty fellow");
  } else {
    console.log("My husband is very stupid fellow");
  }

  //ternary operator
  console.log('Ternary Operator ==============');
  myHusband == "dirty fellow"
    ? console.log(" My husband is very dirty fellow")
    : myHusband == "naughty fellow"
      ? console.log("My husband is very naughty fellow")
      : console.log("My husband is very stupid fellow");
}
