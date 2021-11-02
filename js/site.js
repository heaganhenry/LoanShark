// controller function
function getValues() {
    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let payments = parseFloat(document.getElementById("payments").value);
    let rate = parseFloat(document.getElementById("rate").value);

    let results = calculateLoan(loanAmount, payments, rate);
    displayLoan(results);
}

// logic function
function calculateLoan(loanAmount, payments, rate){
    // initialize values
    let monthlyPayment = (loanAmount * (rate / 1200)) / (1 - (1 + (rate / 1200)) ** -payments);
    let balance = loanAmount;
    let principal = 0;
    let interest = 0;
    let totalInterest = 0;

    let resultsObj = {};
    let resultsHtml = "";
    // loop from 1 to payments
    for (let i = 1; i <= payments; i++){
        //  calculate values
        let month = i;
        interest = balance * (rate / 1200);
        totalInterest += interest;
        principal = monthlyPayment - interest;
        balance = balance - principal;

        //  store values in html string
        resultsHtml += `<tr><td>${month}</td><td>${monthlyPayment.toFixed(2)}</td><td>${principal.toFixed(2)}</td>
        <td>${interest.toFixed(2)}</td><td>${totalInterest.toFixed(2)}</td><td>${balance.toFixed(2)}</td></tr>`;

        
    }
    
    //  store totals and html string in an object
    resultsObj.monthlyPayment = monthlyPayment;
    resultsObj.totalPrincipal = loanAmount;
    resultsObj.totalInterest = totalInterest;
    resultsObj.totalCost = loanAmount + totalInterest;
    resultsObj.resultsHtml = resultsHtml;
    
    // return object
    return resultsObj;
}

// display function
function displayLoan(resultsObj) {
    // clear table
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    // insert html 
    tableBody.innerHTML = resultsObj.resultsHtml;

    // insert totals
    document.getElementById("monthlyPayment").innerHTML = `$${resultsObj.monthlyPayment.toFixed(2)}`;
    document.getElementById("totalPrincipal").innerHTML = `$${resultsObj.totalPrincipal.toFixed(2)}`;
    document.getElementById("totalInterest").innerHTML = `$${resultsObj.totalInterest.toFixed(2)}`;
    document.getElementById("totalCost").innerHTML = `$${resultsObj.totalCost.toFixed(2)}`;
}