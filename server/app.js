const elCatolog = document.querySelector(".catolog");
const elProduct = document.querySelector(".product");
const drowerBtn = document.querySelector(".drowerBtn")
import { getData } from "./server.js";

getData("catalog").then((data) => {
  data.map((item, index) => {
    elCatolog.innerHTML += `<button data-path=${
      index == 0
        ? "hotdishes"
        : index == 1
        ? "colddishes"
        : index == 2
        ? "soup"
        : index == 3
        ? "grill"
        : "dessert"
    }  class=" hover:text-[#e37f6d] font-semibold relative after:absolute after:bg-red-400 after:rounded-lg after:w-0 after:hover:w-full transition-all duration-500 ease-in-out after:transition-all after:duration-500 after:ease-in-out after:h-[4px] after:-bottom-2 after:left-0">${
      item.name
    }</button>
        `;
  });
});

async function render(path) {
  getData(path).then((data) => {
    elProduct.innerHTML = "";
    data.map((item) => {
      elProduct.innerHTML += `<div data-path="${path}/${item.id}" class="relative w-full h-[270px] rounded-md bg-[rgba(0,0,0,0.3)]">
    <img data-path="${path}/${item.id}" src="${item.img}" class="w-full h-[150px] object-cover" alt="">    
     <div data-path="${path}/${item.id}" class="flex flex-col px-4 text-center items-center">
     <h1 data-path="${path}/${item.id}" class="font-bold">${item.title}</h1>
     <h1 data-path="${path}/${item.id}" class="font-semibold">${item.price}</h1>
     <h1 data-path="${path}/${item.id}" class="text-gray-500">${item.text}</h1>
     </div>
    </div>`;
    });
  });
}

getData("hotdishes").then((data) => {
    elProduct.innerHTML =  data.map((item) => {
      return `<div data-path="hotdishes/${item.id}" class="relative w-full h-[270px] rounded-md bg-[rgba(0,0,0,0.3)]">
    <img data-path="hotdishes/${item.id}" src="${item.img}" class="w-full h-[150px] object-cover" alt="">    
    <div data-path="hotdishes/${item.id}" class="flex flex-col px-4 text-center items-center">
     <h1 data-path="hotdishes/${item.id}" class="font-bold">${item.title}</h1>
     <h1 data-path="hotdishes/${item.id}" class="font-semibold">${item.price}</h1>
     <h1 data-path="hotdishes/${item.id}" class="text-gray-500">${item.text}</h1>
     </div>
    </div>`;
    }).join("")
  });

elCatolog.addEventListener("click", (e) => {
  const path = e.target.dataset.path;
  console.log(path);
  if (path) {
    render(path.toLowerCase());
  }
});

elProduct.addEventListener("click", (e) => {
  const path = e.target.dataset.path;
  console.log(path);
  if (path) {
    getData(path).then((data) => saveLocalData(data));
    addLocasa()
  }
});

function saveLocalData(data) {
  const localData = JSON.parse(localStorage.getItem("data")) || [];
  localStorage.setItem("data", JSON.stringify([data, ...localData]));
}

drowerBtn.addEventListener("click", () => {
    document.querySelector(".drower").classList.toggle("translate-x-full");
  addLocasa()
    
  });
  

  function addLocasa() {
    const data = JSON.parse(localStorage.getItem("data")) || [];
  
    document.querySelector(".localCards").innerHTML = data.map((item) => {
     const cena = item.price * item.qty
        return `
      <div class="bg-[#1c1c24] p-6 rounded-xl max-w-md mx-auto">
        <div class="text-white text-lg font-semibold mb-4">
          Orders #34562
        </div>
        <div class="flex space-x-2 mb-4">
          <button class="bg-[#ff6e5e] text-white py-2 px-4 rounded-lg">Dine In</button>
          <button class="text-white py-2 px-4 rounded-lg border border-gray-600">To Go</button>
          <button class="text-white py-2 px-4 rounded-lg border border-gray-600">Delivery</button>
        </div>
      
        <div class="space-y-4">
          <div class="flex items-center justify-between text-white">
            <div class="flex items-center space-x-2">
              <img src="${item.img}" alt="${item.title}" class="w-12 h-12 rounded-full object-cover" />
              <div>
                <p class="font-semibold">${item.title}</p>
                <p class="text-sm text-gray-400">$${item.price}</p>
              </div>
            </div>
            <div class="flex items-center">
              <input type="number" value="${item.qty}" class="w-12 text-center bg-[#2c2c3c] rounded-lg text-white" />
              <p class="ml-4">$${cena.toFixed(2)}</p>
              <button class="ml-4 text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-1 12M6 19l-1-12M10 11h4M14 11V9a4 4 0 00-4-4v0a4 4 0 00-4 4v2H14z" />
                </svg>
              </button>
            </div>
          </div>
          <input placeholder="Order Note..." class="w-full bg-[#2c2c3c] text-sm text-white p-2 rounded-lg mt-1" />
        </div>
  
        <div class="flex justify-between text-white mt-6">
          <p>Discount</p>
          <p>$0</p>
        </div>
        <div class="flex justify-between text-white">
          <p>Sub total</p>
          <p>$${(item.price * item.qty).toFixed(2)}</p>
        </div>
  
        <button class="w-full mt-6 py-3 bg-[#ff6e5e] text-white rounded-lg">
          Continue to Payment
        </button>
      </div>
      `;
    }).join('');
  }