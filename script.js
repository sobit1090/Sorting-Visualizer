// Function to generate a delay for visualization
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let isPaused = false;

function togglePause() {
    const pauseButton = document.getElementById("pauseButton");
    isPaused = !isPaused;

    if (isPaused) {
        pauseButton.textContent = "Resume";
    } else {
        pauseButton.textContent = "Pause";
    }
}

async function sleep(ms) {
    // Keep checking the pause status while sleeping
    while (isPaused) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Check every 100ms
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Array generation
const arrayContainer = document.getElementById('arrayContainer');
const generateArrayBtn = document.getElementById('generateArray');
let array = [];

// Generate new array and display as bars
function generateArray(size = 50) {
    array = [];
    arrayContainer.innerHTML = ''; // Clear previous array

    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 100) + 5;  // Random values between 5 and 105
        array.push(value);

        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.width = `${100 / size}%`;
        bar.style.height = `${value * 3}px`;  // Set the height based on the value

        // Create a span to hold the number corresponding to the bar's height
        const barText = document.createElement('span');
        barText.classList.add('bar-text');
        barText.textContent = value;  // Set the text to the bar's value (length)

        // Append the text inside the bar
        bar.appendChild(barText);
        arrayContainer.appendChild(bar);
    }
}

//start

// end

// Add event listener for array generation
generateArrayBtn.addEventListener('click', () => generateArray());

// Event listener helper for sorting algorithms
function addSortEventListener(buttonId, sortingFunction) {
    document.getElementById(buttonId).addEventListener('click', sortingFunction);
}

// Function to update bar height and color
function updateBar(bar, height, color) {
    bar.style.height = `${height * 3}px`;
    bar.style.backgroundColor = color;
}
async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');  // Get all the bars
    
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            await sleep(50);  // Delay for visualization

            if (array[j] > array[j + 1]) {
                // Swap values in the array
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Swap bar heights visually
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;

                // Update the numbers inside the bars according to their new values
                bars[j].querySelector('.bar-text').textContent = array[j];
                bars[j + 1].querySelector('.bar-text').textContent = array[j + 1];
            }

            bars[j].style.backgroundColor = 'steelblue';
            bars[j + 1].style.backgroundColor = 'steelblue';
        }

        // Mark the last sorted element as green
        bars[array.length - i - 1].style.backgroundColor = 'green';
    }

    // Mark all elements as sorted (green) after sorting is complete
    for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = 'green';
    }
}
  

 async function insertionSort() {
    const bars = document.getElementsByClassName('bar');

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = 'red';

        await sleep(50);

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];

            bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            bars[j + 1].querySelector('.bar-text').textContent = array[j + 1];

            bars[j].style.backgroundColor = 'yellow';
            j--;

            await sleep(50);
        }

        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;
        bars[j + 1].querySelector('.bar-text').textContent = key;

        bars[i].style.backgroundColor = 'steelblue';

        for (let k = 0; k <= i; k++) {
            bars[k].style.backgroundColor = 'green';
        }
    }
}
 
async function selectionSort() {
    const bars = document.getElementsByClassName('bar');

    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = 'red';

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'yellow';

            await sleep(50);

            if (array[j] < array[minIndex]) {
                if (minIndex !== i) {
                    bars[minIndex].style.backgroundColor = 'steelblue';
                }
                minIndex = j;
                bars[minIndex].style.backgroundColor = 'red';
            } else {
                bars[j].style.backgroundColor = 'steelblue';
            }
        }

        if (minIndex !== i) {
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;

            bars[i].style.height = `${array[i] * 3}px`;
            bars[minIndex].style.height = `${array[minIndex] * 3}px`;

            bars[i].querySelector('.bar-text').textContent = array[i];
            bars[minIndex].querySelector('.bar-text').textContent = array[minIndex];
        }

        bars[minIndex].style.backgroundColor = 'steelblue';
        bars[i].style.backgroundColor = 'green';
    }
}
 
// ---- Quick Sort ----
  
// Reset Array Function - this will stop sorting and clear the array container
function resetArray() {
    // Stop the sorting process by clearing any timeouts
    isSorting = false;
    isPaused = false;
    
    // Clear all the sorting timeouts
    sortingTimeouts.forEach(timeout => clearTimeout(timeout));
    sortingTimeouts = []; // Reset the timeouts array
    
    // Clear the array container
    const container = document.getElementById('array-container');
    container.innerHTML = ''; // Clear bars from the container

    // Optionally, you can immediately generate a new array after reset
    // generateArray(); // Uncomment this if you want to generate a new array automatically
}

// Event listeners for sorting algorithms
addSortEventListener('bubbleSort', bubbleSort);
addSortEventListener('insertionSort', insertionSort);
addSortEventListener('selectionSort', selectionSort);
addSortEventListener('mergeSort', mergeSort);
addSortEventListener('quickSort', quickSort);
addSortEventListener('heapSort', heapSort);
addSortEventListener('shellSort', shellSort);

// Generate the initial array on page load
window.onload = generateArray;
