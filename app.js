let getComponentes = (data) => {
  let cardContainer = document.getElementById("cardContainer");
  data.forEach((item) => {
    cardContainer.innerHTML += `
      <div class="card-item m-5" style="width: 18rem">
          <img
          src="${item.img}"
          class="card-img-top"
          alt="..."
          />
          <div class="card-body">
          <h5 class="card-title">${item.component}</h5>
          <p class="card-text">
              ${item.price}
          </p>
          <a id=${item.id} class="btn btn-primary addBtn" >add to cart</a>
          </div>
      </div>`;
  });
};

let addItem = (id, data) => {
  let newItem = data.find((elem) => elem.id == id);
  let localData = localStorage.getItem("cart");
  let itemCarrito = localData ? JSON.parse(localData) : [];
  itemCarrito.push(newItem);
  localStorage.setItem("cart", JSON.stringify(itemCarrito));
  Swal.fire("Componente Agregado!", `${newItem.component}`, "success");
};

(() => {
  fetch("./data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      getComponentes(data);
      let cardIds = document.querySelectorAll(".addBtn");
      cardIds.forEach((addToCartButton) => {
        addToCartButton.addEventListener("click", function () {
          addItem(addToCartButton.id, data);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
})();
