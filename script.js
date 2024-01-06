//Get DOM Elements
 const balance = document.getElementById('balance');
 const moneyCredit = document.getElementById('money-credit');
 const moneyDebit = document.getElementById('money-debit');
 const list = document.getElementById('list');
 const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');

//Temporary array of transaction to be replaced with local storage
const Transactions = [
    {id: 1, reason: 'salary', amount: 5000},
    {id: 2, reason: 'Breakfast', amount: -20},
    {id: 3, reason: 'lunch', amount: -30},
    {id: 4, reason: 'Dinner', amount: -60},
];

//Get transaction data from storage
let transactions = Transactions;

//Function to display transaction in DOM - Hitory section

function displayTransaction(transaction){
// Calculate if transactiion is Credit or Debit

const type = transaction.amount > 0 ? '+' : '-' 
//create a list item for the tranaction
const transactionLI = document.createElement('li');
//Determine calss based on transaction tyoe. If positive, then credit, oherwise debit

    transactionLI.classList.add(transaction.amount > 0 ? 'credit' : 'debit');
//Assign the inner HTML for the transaction li
    transactionLI.innerHTML = `
${transaction.reason} <span> ${transaction.amount} </span>
<button class= "delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>

`;
// Add the list item in the DOM under the transaction list 
list.appendChild(transactionLI);

};

//Function to update all balances
function updateBalance(){
    //Create a new array with just the amount from the transaction array
    const transactionAmounts = transactions.map( transaction => transaction.amount);
   // calculate total balance values
   const totalBalance = transactionAmounts.reduce( (acc, amount) => (acc += amount), 0);
   // calculate total credit balance value
   const creditBalance = transactionAmounts
                               .filter(amount => amount > 0)
                               .reduce( (acc,amount) => (acc += amount), 0);
// Calculate total debit balance value
  const debitBalance = transactionAmounts
                               .filter(amount => amount < 0)
                               .reduce( (acc,amount) => (acc += amount), 0);

//update values in the DOM
balance.innerText = `$${totalBalance}`;
moneyCredit.innerText = `$${creditBalance}`;
moneyDebit.innerText = `$${debitBalance} `;

};

//Function to create a random ID
function createID(){
    return Math.floor(Math.random() * 10000000000);
};

//Function to add a transaction from the form
function addTransaction(e){
    //Stop the page reload
    e.preventDefault();
    //check if form has valid data
    if(reason.value.trim()===''|| amount.value.trim()=== '') {
        // display error message if form is not complete
        alert('please provide a valid reason and transaction amount.')
    } else{
        //create an object for the transaction containing id, text for the reason and transaction amount
        const transaction = {
            id: createID(),
            reason: reason.value,
            amount: +amount.value
        }

        //push the new transaction into the transaction array
        transactions.push(transaction);
        // dispaly the new transaction in the DOM
        displayTransaction(transaction);
        //update all balances
        updateBalance();
        //clear form fields
        reason.value = '';
        amount.value = '';
    }

};

//Function to delete a transaction from the history
function deleteTransaction(id){
    //filer out the transaction with the provided id
    transactions = transactions.filter(transaction => transaction.id !== id);

    //Initialize the app again to update the DOM
init();
};      

//Function to Intialize the Application
function init(){
//Clear all tranaction history
list.innerHTML = '';
// Display all transaction in DB in the DOM
    transactions.forEach(displayTransaction);
    //update all balance values
    updateBalance();
};

//Event Listeners
//1. listen for form sumit to add a transaction
form.addEventListener('submit', addTransaction);


//Initialize the Appliacation
init();





