document.getElementById("expForm").addEventListener("submit", Submit);
function Submit(e) {
  e.preventDefault();
  // get type, name, date, and amount
  let type = document.getElementById("type").value;
  let name = document.getElementById("name").value;
  let amount = document.getElementById("amount").value;
  if (type != "ChooseOne" && name.length > 0 && amount > 0) {
    const expense = {
      type,
      name,
      amount,
    };
    axios
      .post(
        "https://crudcrud.com/api/de8fd2413da04f4bbe2e9f8fb04ddec8/expenseData",
        expense
      )
      .then((res) => {
        console.log(res.data);
      });
  }
  document.getElementById("expForm").reset();
  showExpenses();
}

const showExpenses = () => {
  const expenseTable = document.getElementById("expenseTable");
  expenseTable.innerHTML = "";
  axios
    .get(
      "https://crudcrud.com/api/de8fd2413da04f4bbe2e9f8fb04ddec8/expenseData"
    )
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        expenseTable.innerHTML += `
            <tr>
                <td>${response.data[i].type}</td>
                <td>${response.data[i].name}</td>
                <td>₹ ${response.data[i].amount}</td>
                <td><a class="editButton" onclick="editExpense('${response.data[i]._id}','${response.data[i].type}','${response.data[i].name}','${response.data[i].amount}')">Edit</a> <a class="deleteButton" onclick="deleteExpense('${response.data[i]._id}')">
                  Delete</a></td>
            </tr>
        `;
      }
    });
};
const editExpense = (_id, type, name, amount) => {
  axios
    .put(
      `https://crudcrud.com/api/de8fd2413da04f4bbe2e9f8fb04ddec8/expenseData/${_id}`,
      (document.getElementById("type").value = type),
      (document.getElementById("name").value = name),
      (document.getElementById("amount").value = amount)
    )
    .then((res) => {
      console.log(res.data);
    });
};
const deleteExpense = (_id) => {
  axios
    .delete(
      `https://crudcrud.com/api/de8fd2413da04f4bbe2e9f8fb04ddec8/expenseData/${_id}`
    )
    .then((res) => {
      console.log(res.data);
    });
  showExpenses();
};
showExpenses();