let items = [];
const form = document.querySelector("form");
const clear = document.querySelector("#clear");
let i = document.querySelectorAll("i");
const ul = document.querySelector("ul");
const card = document.querySelector("#card");
const produto = document.querySelector("#produto-title");
let produtoQtd = 0;

const addNewItem = (item, qtd) => {
  if (!items.includes(item)) {
    items.push(item);
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    link.className = "delete-item secondary-content";
    if (!qtd || qtd === "0" || qtd === 0) {
      qtd = 1;
    }
    li.textContent = `${item} (${qtd})`;
    li.className = "collection-item";
    li.appendChild(link);
    ul.prepend(li);
  } else {
    --produtoQtd;
    alert("Esse item já foi adicionado");
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newItem = e.target.produto.value.toLowerCase().trim();
  let qtd = e.target.qtd.value;
  if (isNaN(newItem)) {
    if (newItem.length > 0) {
      addNewItem(newItem, qtd);
      e.target.qtd.value = "";
      e.target.produto.value = "";
      produto.innerHTML = `Produtos: ${++produtoQtd}`;
      card.classList.remove("hide");
    }
  } else {
    e.target.qtd.value = "";
    e.target.produto.value = "";
  }
  const input = e.target.produto;
  input.focus();
});

clear.addEventListener("click", () => {
  items = [];
  document.querySelector("ul").innerHTML = "";
  card.classList.add("hide");
  produto.innerHTML = `Produtos: ${(produtoQtd = 0)}`;
});

const removeLi = (li) => {
  produto.innerHTML = `Produtos: ${--produtoQtd}`;
  items.findIndex((item, index) => {
    if (li.includes(item)) {
      items.splice(index, 1);
    }
  });
  if (items.length === 0) {
    card.classList.add("hide");
  }
};

ul.addEventListener("click", (e) => {
  let li = e.target.parentElement;
  if (e.target.tagName === "I") {
    removeLi(li.parentElement.textContent);
    li.parentElement.remove();
  }
  if (!items.length) {
    card.classList.add("hide");
  }
});
