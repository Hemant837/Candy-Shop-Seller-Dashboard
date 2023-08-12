let addItem = document.getElementById("addItem");

async function addItemsInList(event) {
  event.preventDefault();
  let candyName = document.getElementById("candyName").value;
  let description = document.getElementById("description").value;
  let quantity = document.getElementById("quantity").value;
  let price = document.getElementById("price").value;

  let newItems = {
    candyName: candyName,
    description: description,
    quantity: quantity,
    price: price,
  };

  try {
    const response = await axios.post(
      "https://crudcrud.com/api/f8285dbc2dbd4a9181ff3407491b9598/shopData",
      newItems
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  document.getElementById("candyName").value = "";
  document.getElementById("description").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";
}

async function fetchAndDisplayData() {
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/f8285dbc2dbd4a9181ff3407491b9598/shopData"
    );
    console.log(response.data);
    response.data.forEach(showUserOnScreen);
  } catch (error) {
    console.log(error);
  }
}

// Function to decrease the amount of candy left in the stock.
async function decreaseQuantity(dataId, decrementAmount) {
  try {
    const response = await axios.get(
      `https://crudcrud.com/api/f8285dbc2dbd4a9181ff3407491b9598/shopData/${dataId}`
    );
    let currentData = response.data;

    if (currentData.quantity >= decrementAmount) {
      currentData.quantity -= decrementAmount;

      await axios.put(
        `https://crudcrud.com/api/f8285dbc2dbd4a9181ff3407491b9598/shopData/${dataId}`,
        {
          candyName: currentData.candyName,
          description: currentData.description,
          quantity: currentData.quantity,
          price: currentData.price,
        }
      );

      console.log("Quantity updated successfully.");
    } else {
      console.log("Insufficient quantity.");
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to decrease the amount by 1 of candy left in the stock.
async function decreaseByOne(event) {
  event.preventDefault();
  if (event.target.classList.contains("button1")) {
    let li = event.target.parentElement;
    let dataId = li.getAttribute("data-id");
    await decreaseQuantity(dataId, 1);
  }
}

// Function to decrease the amount by 2 of candy left in the stock.
async function decreaseByTwo(event) {
  event.preventDefault();
  if (event.target.classList.contains("button2")) {
    let li = event.target.parentElement;
    let dataId = li.getAttribute("data-id");
    await decreaseQuantity(dataId, 2);
  }
}

// Function to decrease the amount by 3 of candy left in the stock.
async function decreaseByThree(event) {
  event.preventDefault();
  if (event.target.classList.contains("button3")) {
    let li = event.target.parentElement;
    let dataId = li.getAttribute("data-id");
    await decreaseQuantity(dataId, 3);
  }
}

// This function is created to display the the candies present in the store.
async function showUserOnScreen(newItems) {
  let items = document.getElementById("items-group");
  let item = document.createElement("li");
  let text = `Candy name: ${newItems.candyName} Description: ${newItems.description} Quantity left: ${newItems.quantity} Rs. ${newItems.price}`;

  // Buy buttons
  let buyButton1 = createBuyButton("Buy1", "button1", decreaseByOne);
  let buyButton2 = createBuyButton("Buy2", "button2", decreaseByTwo);
  let buyButton3 = createBuyButton("Buy3", "button3", decreaseByThree);

  // Setting data-id attribute to the newly created li, which is created by the crudcrud.com to fetch the exact li when needed.
  item.setAttribute("data-id", newItems._id);
  item.textContent = text;

  item.appendChild(buyButton1);
  item.appendChild(buyButton2);
  item.appendChild(buyButton3);

  items.appendChild(item);
}

// Function for creating Buttons

function createBuyButton(text, className, clickHandler) {
  let button = document.createElement("button");
  button.textContent = text;
  button.className = className;
  button.addEventListener("click", clickHandler);
  return button;
}

// To Display Data on Screen Load/Refresh.
window.addEventListener("DOMContentLoaded", fetchAndDisplayData);
