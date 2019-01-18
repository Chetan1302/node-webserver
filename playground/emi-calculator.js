// Calculating EMI
const yargs = require('yargs');

var argv = yargs.option({
    p:{
        demand:true,
        alias:'principle',
        description:'Principle Amount of homeloan',
    },
    r:{
        demand:true,
        alias:"rate",
        description:"rate of interest per annumv for home loan"
    },
    n:{
        demand:true,
        alias:'tenure',
        description:'duration of home loan'
    }
})
.help()
.alias('help','h')
.argv;


console.log(argv);
var principle = parseFloat(argv.p);
var rate_of_interest = parseFloat(argv.r);
var duration = parseInt(argv.n);
var duration_in_months = duration*12;
var rate_of_interest_per_month = rate_of_interest/1200;
console.log(`principle is ${principle} and rate of interest per month is ${rate_of_interest_per_month} and duration in month is ${duration_in_months}`);

var emi = ((principle*rate_of_interest_per_month)*(Math.pow(1+rate_of_interest_per_month ,duration_in_months)))
/(Math.pow((1 + rate_of_interest_per_month) , (duration_in_months-1)));

console.log(`EMI of first month is${emi}`);
/*for(var i = 0 ; i<360; i++ ){
var interest_per_month = principle * rate_of_interest_per_month;

console.log(`Duration \t EMI \t Interest \t Principle \t remaining principal`);

principle = principle - (emi - interest_per_month);
console.log(`${duration_in_months - i}\t${emi}\t${interest_per_month}\t${emi-interest_per_month}\t${principle}`);
}*/