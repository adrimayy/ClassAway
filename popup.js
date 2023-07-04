// Cached class list
let classes = [];

// Get the elements
const classesDiv = document.getElementById('classes');
const newClassNameInput = document.getElementById('new-class-name');
const addClassButton = document.getElementById('add-class');

// Event listener for the enter button
addClassButton.addEventListener('click', () => {
    const newClassName = newClassNameInput.value;
    if (newClassName) {
        classes.push(newClassName);
        newClassNameInput.value = '';
        saveClasses();
    }
});

// Event listener for the enter key
newClassNameInput.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addClassButton.click();
    }
});

// Function to save the class list to storage
function saveClasses() {
    chrome.storage.sync.set({'classes': classes}, function() {
        loadClasses(); // Refresh the display after saving
    });
}

// Function to load the class list from storage
function loadClasses() {
    chrome.storage.sync.get('classes', function(data) {
        classes = data.classes || [];
        classesDiv.innerHTML = ''; // Clear the classes div

        for (let i = 0; i < classes.length; i++) {
            const classDiv = document.createElement('div');
            classDiv.className = 'class';

            // Create an input box for the class name
            const classInput = document.createElement('input');
            classInput.type = 'text';
            classInput.value = classes[i];
            classInput.addEventListener('change', function() {
                classes[i] = classInput.value;
                saveClasses();
            });

            // Create an edit button for the class name
            const editButton = document.createElement('img');
            editButton.src = 'images/edit.png';
            editButton.onclick = function() {
                classInput.focus();
            };

            // Create a delete button for the class name
            const deleteButton = document.createElement('img');
            deleteButton.src = 'images/delete.svg';
            deleteButton.onclick = function() {
                classes.splice(i, 1);
                saveClasses();
            };


            classDiv.appendChild(classInput);
            classDiv.appendChild(editButton);
            classDiv.appendChild(deleteButton);

            classesDiv.appendChild(classDiv);
        }
    });
}

// Load the class list when the popup is opened
loadClasses();
