let addItem = document.getElementById("addItem");

function addItemsInList(event) {
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

  axios
    .post(
      "https://crudcrud.com/api/b8a29ad266d54119a60d366c7f81454d/shopData",
      newItems
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  document.getElementById("candyName").value = "";
  document.getElementById("description").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/b8a29ad266d54119a60d366c7f81454d/shopData")
    .then((response) => {
      console.log(response.data);
      for (var i = 0; i < response.data.length; i++) {
        showUserOnScreen(response.data[i]);
      }
    })
    .catch((err) => console.log(err));
});

function descreaseByOne(event) {
  event.preventDefault();
  if (event.target.classList.contains("button1")) {
    let li = event.target.parentElement;
    let dataId = li.getAttribute("data-id");
    axios
      .get(
        `https://crudcrud.com/api/b8a29ad266d54119a60d366c7f81454d/shopData/${dataId}`
      )
      .then((response) => {
        let currentData = response.data;
        if (currentData.quantity > 0) {
          currentData.quantity = currentData.quantity - 1;

          axios
            .put(
              `https://crudcrud.com/api/b8a29ad266d54119a60d366c7f81454d/shopData/${dataId}`,
              {
                candyName: currentData.candyName,
                description: currentData.description,
                quantity: currentData.quantity,
                price: currentData.price,
              }
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}
function descreaseByTwo(event) {
  event.preventDefault();
  if (event.target.classList.contains("button2")) {
    let li = event.target.parentElement;
    let dataId = li.getAttribute("data-id");
    console.log("Clicked Buy1 for item with data-id:", dataId);
  }
}
function descreaseByThree(event) {
  event.preventDefault();
  if (event.target.classList.contains("button3")) {
    let li = event.target.parentElement;
    let dataId = li.getAttribute("data-id");
    console.log("Clicked Buy1 for item with data-id:", dataId);
  }
}

function showUserOnScreen(newItems) {
  let items = document.getElementById("items-group");
  let item = document.createElement("li");
  let text = `Candy name: ${newItems.candyName} Description: ${newItems.description} Quantity left: ${newItems.quantity} Rs. ${newItems.price}`;

  // Buy button
  let buyButton1 = document.createElement("button");
  let buyButton2 = document.createElement("button");
  let buyButton3 = document.createElement("button");

  buyButton1.textContent = "Buy1";
  buyButton2.textContent = "Buy2";
  buyButton3.textContent = "Buy3";

  buyButton1.className = "button1";
  buyButton2.className = "button2";
  buyButton3.className = "button3";

  item.setAttribute("data-id", newItems._id);

  item.textContent = text;

  buyButton1.addEventListener("click", descreaseByOne);
  buyButton2.addEventListener("click", descreaseByTwo);
  buyButton3.addEventListener("click", descreaseByThree);

  item.appendChild(buyButton1);
  item.appendChild(buyButton2);
  item.appendChild(buyButton3);

  items.appendChild(item);
}
