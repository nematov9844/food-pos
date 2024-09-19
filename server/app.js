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
     <h1 data-path="${path}/${item.id}" class="font-semibold">$${item.price}</h1>
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
     <h1 data-path="hotdishes/${item.id}" class="font-semibold">$${item.price}</h1>
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
  if (path) {
    getData(path).then((data) => saveLocalData(data));
    addLocasa()
  }
});

function saveLocalData(data) {
  const localData = JSON.parse(localStorage.getItem("data")) || [];
  const newData = localData.filter((item) => item.id !== data.id);
  localStorage.setItem("data", JSON.stringify([data, ...newData]));
  addLocasa()
}


drowerBtn.addEventListener("click", () => {
    document.querySelector(".drower").classList.toggle("translate-x-full");
  addLocasa()
    
  });
  

  function addLocasa() {
    const data = JSON.parse(localStorage.getItem("data")) || [];
let sum = 0    
let qty = 1
    document.querySelector(".localCards").innerHTML = data.map((item) => {
      sum = sum + Number(item.price)
        return `
      <div class="bg-[#1c1c24]  rounded-xl max-w-md mx-auto">
      
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
              <input type="number" value="${qty}" class="w-12 text-center bg-[#2c2c3c] rounded-lg text-white" />
              <button data-deletepath=${item.id} class="ml-4 text-red-400">
              <i data-deletepath=${item.id} class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
          <input placeholder="Order Note..." class="w-full bg-[#2c2c3c] text-sm text-white p-2 rounded-lg mt-1" />
          </div>
        
      `;
    }).join('');
    
  document.querySelector(".localCards").innerHTML += `  
  
  <div class="flex justify-between text-white mt-6">
    <p>Discount</p>
    <p> <span class="text-red-500">-25%</span> $${(sum.toFixed(2) - (sum.toFixed(2) / 100 * 25)).toFixed(2)}</p>
  </div>
  <div class="flex justify-between text-white">
    <p>Sub total</p>
    <p>$${sum.toFixed(2)}</p>
  </div>

  <button class="w-full mt-6 py-3 bg-[#ff6e5e] text-white rounded-lg">
    Continue to Payment
  </button>
</div>`
  document.querySelector(".localCards").addEventListener("click",(e)=>{
    const pathId = e.target.dataset.deletepath
    console.log(pathId);
    if (pathId) {
      editDataLocal(pathId)
    }
  })
    
  }

  function editDataLocal(id) {
    const newId = Number(id)
    const localData = JSON.parse(localStorage.getItem("data")) || [];
  const newData = localData.filter((item) => item.id !== newId);
  localStorage.setItem("data", JSON.stringify(newData));
  addLocasa()
  }