'use strict';

//change names to make more sense

var allProducts = [];
var randomImagesArray = [];
var dataChartCollection = [];

var imageContainer = document.getElementById('imageContainer');
var resultChart = document.getElementById('resultChart');

var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');

var displayVoteResults = document.getElementById('displayVoteResults');
var viewChart = document.getElementById('resultChart');
var viewChart = document.getElementById('draw-chart');
var votingChart;

//Place all 15 products objects into a constructor.
function Products(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.clickTotal = 0;
  this.views = 0;
  allProducts.push(this);
}

//Place all 15 into an array
//display products in console
console.log(allProducts);

var imgRandom = function () {
  return Math.floor(Math.random() * productImages.length);
};

var imageAppear = function(){
  left = imgRandom();
  productImageOne.src = productImages[left].filePath;
  productImageOne.alt = allProducts[left].name;
  productImages[left].timesDisplayed ++;
  right = imgRandom();
  while (left === right) {
    right = imgRandom();
  }
  productImageTwo.src = productImages[right].filePath;
  productImageTwo.alt = allProducts[right].name;
  productImages[right].timesDisplayed ++;
  center = imgRandom();
  while (left === right || right === center || center === left) {
    center = imgRandom();
  }
  productImageThree.src = productImages[center].filePath;
  productImageThree.alt = allProducts[center].name;
  productImages[center].timesDisplayed ++;
};

//Generating random array for the three images that will appear on the page at any given time.
function threeRandomImages() {
  var lastRoundsRandomImagesArray = randomImagesArray;
  randomImagesArray = [];
  //For every random number generated it will be multiplied by the 18 products above so that it can be pushed into the random array above.
  randomImagesArray.push(Math.floor(Math.random() * allProducts.length)); //[0]
  while (lastRoundsRandomImagesArray.indexOf(randomImagesArray[0]) !== -1) {
    console.log('duplicate detected with first element.', lastRoundsRandomImagesArray, 'generated number ' + randomImagesArray[0]);
    randomImagesArray[0] = (Math.floor(Math.random() * allProducts.length));
  }
  randomImagesArray.push(Math.floor(Math.random() * allProducts.length)); //[1]
  //If both random number arrays equal to one another array[1] will be generated again to reach a different outcome. Caught and fixed.
  while (randomImagesArray[0] === randomImagesArray[1] || lastRoundsRandomImagesArray.indexOf(randomImagesArray[1]) !== -1) {
    console.log('duplicate detected with second element.', lastRoundsRandomImagesArray, 'generated number ' + randomImagesArray[1]);
    randomImagesArray[1] = (Math.floor(Math.random() * allProducts.length));
  }
  randomImagesArray.push(Math.floor(Math.random() * allProducts.length)); //[2]
  //if duplicate detected another random number will be generated
  while (randomImagesArray[1] === randomImagesArray[2] || randomImagesArray[0] === randomImagesArray[2] || lastRoundsRandomImagesArray.indexOf(randomImagesArray[2]) !== -1) {
    console.log('duplicate detected with third element.', lastRoundsRandomImagesArray, 'generated number ' + randomImagesArray[2]);
    randomImagesArray[2] = (Math.floor(Math.random() * allProducts.length));
  }

  console.log(randomImagesArray);
}

//a function to display all three images on the page
function displayThreeImages(){
  threeRandomImages();

  //left
  left.src = allProducts[randomImagesArray[0]].filePath;
  left.alt = allProducts[randomImagesArray[0]].name;

  //center
  center.src = allProducts[randomImagesArray[1]].filePath;
  center.alt = allProducts[randomImagesArray[1]].name;

  //right
  right.src = allProducts[randomImagesArray[2]].filePath;
  right.alt = allProducts[randomImagesArray[2]].name;
}

var counter = 0;
function handleEventClick() {
  if (event.target.id === 'imageContainer') {
    alert('You need to click on a picture!');
  }
  if (event.target.id === 'left' || event.target.id === 'center' || event.target.id === 'right') {
    displayThreeImages();
  }
  if (counter < 25) {
    onclick = counter++;
    console.log(counter);
    displayThreeImages();
  } else {
    imageContainer.removeEventListener('click', handleEventClick);
  }
  for (var i = 0; i < allProducts.length; i++) {
    if (event.target.alt === allProducts[i].name) {
      console.log(allProducts[i].name);
      allProducts[i].clickTotal += 1;
    }
  }
  storeData();
}

function displayResults() {
  var productList = document.getElementById('displayList');
  var displayList = function() {
    productList.innerHTML = '';
    for (var i = 0; i < allProducts.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = allProducts[i].name + ' has been clicked ' + allProducts[i].clickTotal + ' times.';
      productList.appendChild(liEl);
    }
  };
  displayList();
}

function makeBarChart() {
  var dataArrayVotes = [];
  var dataArrayNames = [];
  for (var i = 0; i < allProducts.length; i++) {
    var clicksForCurrentProduct = allProducts[i].clickTotal;
    var nameOfCurrentProduct = allProducts[i].name;
    dataArrayNames.push(nameOfCurrentProduct);
    dataArrayVotes.push(clicksForCurrentProduct);
  }
  //chart
  var chartData = {
    labels: dataArrayNames,
    datasets: [
      {
        backgroundColor: [
          'grey',
          'deeppink',
          'grey',
          'deeppink',
          'grey',
          'deeppink',
          'grey',
          'deeppink',
          'grey',
          'deeppink',
          'grey',
          'deeppink',
          'grey',
          'deeppink',
          'grey',
          'deeppink',
          'grey',
          'deeppink',
          'grey',
          'deeppink'
        ],
        hoverBackgroundColor: [
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan',
          'cyan'
        ],
        data: dataArrayVotes,
      }
    ]
  };

  var ctx = document.getElementById('barChart').getContext('2d');
  barChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      responsive: false
    },
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 1
        }
      }]
    }
  }
);
};

function storeData() {
  console.log('storeData');
  var allProductsStringified = JSON.stringify(allProducts);
  localStorage.setItem('allProductsStringified', allProductsStringified);
}

if (localStorage.getItem('allProductsStringified')) {
  var allProductsRetrieved = localStorage.getItem('allProductsStringified');
  var allProductsParsed = JSON.parse(allProductsRetrieved);
  allProducts = allProductsParsed;
} else {
  new Products('bag', './img/bag.jpg');
  new Products('banana', './img/banana.jpg');
  new Products('bathroom', './img/bathroom.jpg');
  new Products('boots', './img/boots.jpg');
  new Products('breakfast', './img/breakfast.jpg');
  new Products('bubblegum', './img/bubblegum.jpg');
  new Products('cthulhu', './img/cthulhu.jpg');
  new Products('dog-duck', './img/dog-duck.jpg');
  new Products('dragon', './img/dragon.jpg');
  new Products('pen', './img/pen.jpg');
  new Products('pet-sweep', './img/pet-sweep.jpg');
  new Products('scissors', './img/scissors.jpg');
  new Products('shark', './img/shark.jpg');
  new Products('sweep', './img/sweep.jpg');
  new Products('tauntaun', './img/tauntaun.jpg');
  new Products('unicorn', './img/unicorn.jpg');
  new Products('usb', './img/usb.jpg');
  new Products('water-can', './img/water-can.jpg');
  new Products('wine-glass', './img/wine-glass.jpg');
}

displayResults();

imageContainer.addEventListener('click', handleEventClick);
displayVoteResults.addEventListener('click', displayResults);
resultChart.addEventListener('click', function() {
  makeBarChart();
});

displayThreeImages();
