`use strict`;

const itemImage1 = document.getElementById("itemImage1");
const itemImage2 = document.getElementById("itemImage2");
const itemImage3 = document.getElementById("itemImage3");
const imageSection = document.getElementById("rightSectionDiv");
const buttonResult = document.getElementById("clickButtonResult");

const maxTry = 3; //as test will be 25 later
let tryChose = 0;

let chartItemNames = [];
let chartItemVoted = [];
let chartItemShown = [];

//let thisSeen = [];
let lastSeen = [];

function Items(itemName, ItemPath) {
  this.itemName = itemName;
  this.ItemPath = ItemPath;

  this.timesItemShown = 0;
  this.timesItemClicked = 0;
  Items.allItems.push(this);
  chartItemNames.push(this.itemName);
}

Items.allItems = [];

new Items("bag", "img/bag.jpg");
//console.log(allItems[0]);
new Items("banana", "img/banana.jpg");
new Items("bathroom", "img/bathroom.jpg");
new Items("boots", "img/boots.jpg");
new Items("breakfast", "img/breakfast.jpg");
new Items("bubblegum", "img/bubblegum.jpg");
new Items("chair", "img/chair.jpg");
new Items("cthulhu", "img/cthulhu.jpg");
new Items("dog-duck", "img/dog-duck.jpg");
new Items("dragon", "img/dragon.jpg");
new Items("pen", "img/pen.jpg");
new Items("pepsi-glass", "img/pepsi-glass.jpg");
new Items("pet-sweep", "img/pet-sweep.jpg");
new Items("scissors", "img/scissors.jpg");
new Items("shark", "img/shark.jpg");
new Items("sweep", "img/sweep.png");
new Items("tauntaun", "img/tauntaun.jpg");
new Items("unicorn", "img/unicorn.jpg");
new Items("water-can", "img/water-can.jpg");

//console.log(allItems);
//console.log("dddddd", chartItemNames);

function generateRandom() {
  return Math.floor(Math.random() * Items.allItems.length);
}

// rendered image

let itemImage1Index;
let itemImage2Index;
let itemImage3Index;

function renderImages() {
  itemImage1Index = generateRandom();
  itemImage2Index = generateRandom();
  itemImage3Index = generateRandom();
  console.log("befour", itemImage1Index, itemImage2Index, itemImage3Index);
  console.log("last seen befour while", lastSeen);

  while (
    itemImage1Index === itemImage2Index ||
    itemImage2Index === itemImage3Index ||
    itemImage3Index === itemImage1Index ||
    lastSeen.includes(itemImage1Index) ||
    lastSeen.includes(itemImage2Index) ||
    lastSeen.includes(itemImage3Index)
  ) {
    itemImage1Index = generateRandom();
    itemImage2Index = generateRandom();
    itemImage3Index = generateRandom();
  }
  lastSeen = [];

  lastSeen.push(itemImage1Index, itemImage2Index, itemImage3Index);
  console.log("last seen after", lastSeen);
  console.log("After", itemImage1Index, itemImage2Index, itemImage3Index);
  itemImage1.src = Items.allItems[itemImage1Index].ItemPath;
  itemImage2.src = Items.allItems[itemImage2Index].ItemPath;
  itemImage3.src = Items.allItems[itemImage3Index].ItemPath;

  Items.allItems[itemImage1Index].timesItemShown++;
  Items.allItems[itemImage2Index].timesItemShown++;
  Items.allItems[itemImage3Index].timesItemShown++;
  //console.log(Items.allItems[itemImage3Index]);
  console.log(Items.allItems);
}
renderImages();

imageSection.addEventListener("click", handlerOfClick);

function handlerOfClick(event) {
  tryChose++;

  if (tryChose <= maxTry) {
    // console.log(event.target.id);
    // console.log(tryChose + "this is     jh");

    if (event.target.id === "itemImage1") {
      Items.allItems[itemImage1Index].timesItemClicked++;
    } else if (event.target.id === "itemImage2") {
      Items.allItems[itemImage2Index].timesItemClicked++;
    } else if (event.target.id === "itemImage3") {
      Items.allItems[itemImage3Index].timesItemClicked++;
    } else {
      alert("please click on one of the Images");
      tryChose--;
    }

    renderImages();
    console.log(Items.allItems);
  } else {
    alert("click Show result to check result");
    imageSection.removeEventListener("click", handlerOfClick);
  }
}

let rendered = false;
buttonResult.addEventListener("click", renderResultList);

function renderResultList() {
  if (rendered == false) {
    const ul = document.getElementById("unOrderedListResult");
    for (let i = 0; i < Items.allItems.length; i++) {
      chartItemVoted.push(Items.allItems[i].timesItemClicked);
      chartItemShown.push(Items.allItems[i].timesItemShown);

      let li = document.createElement("li");
      ul.appendChild(li);

      li.textContent = `${Items.allItems[i].itemName} has shown ${Items.allItems[i].timesItemShown} times and voted ${Items.allItems[i].timesItemClicked} times`;
      li.setAttribute("class", "lis");
    }
    getChart();

    rendered = true;
  } else if (rendered == true) {
    imageSection.removeEventListener("click", handlerOfClick);
  }
}

function getChart() {
  let ctx = document.getElementById("myChart").getContext("2d");
  let myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: chartItemNames,
      datasets: [
        {
          label: "# of Votes",
          data: chartItemVoted,
          backgroundColor: ["rgba(255, 99, 132, 0.5)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
        {
          label: "# of shown",
          data: chartItemShown,
          backgroundColor: ["rgba(235, 183, 52, 0.5)"],
          borderColor: ["rgba(196, 158, 61, 1)"],
          borderWidth: 1,
        },
      ],
    },
  });
}
