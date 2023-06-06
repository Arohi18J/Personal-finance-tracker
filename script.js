// Define an array to store transactions
let transactions = [];

// Function to update the balance
function updateBalance() {
  const balanceAmount = document.getElementById("balanceAmount");
  const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  balanceAmount.textContent = `$${balance}`;
  balanceAmount.className = balance < 0 ? "negative" : "positive";
}

// Function to render the transactions list
function renderTransactions() {
  const transactionsList = document.getElementById("transactions");
  transactionsList.innerHTML = "";

  transactions.forEach((transaction, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${transaction.description} ($${transaction.amount})`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTransaction(index));

    listItem.appendChild(deleteButton);
    transactionsList.appendChild(listItem);
  });
}

// Function to add a new transaction
function addTransaction(description, amount) {
  const transaction = { description, amount };
  transactions.push(transaction);
  updateBalance();
  renderTransactions();
}

// Function to delete a transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateBalance();
  renderTransactions();
}

// Event listener for the transaction form submission
const transactionForm = document.getElementById("transactionForm");
transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  addTransaction(description, amount);
  transactionForm.reset();
});

// Initial rendering of transactions and balance
renderTransactions();
updateBalance();
