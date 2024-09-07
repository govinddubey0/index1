document.addEventListener("DOMContentLoaded", function() {
    // Function to update the queue timestamp and patient count
    function updateQueue() {
        const queueTimestamp = document.getElementById('queue-timestamp');
        const queueCount = document.querySelector('.opd-queue .card p:nth-child(1)');
        const estimatedWaitTime = document.querySelector('.opd-queue .card p:nth-child(2)');

        // Simulating a new queue count and wait time
        const newQueueCount = Math.floor(Math.random() * 20) + 1;  // Random count between 1 and 20
        const newWaitTime = Math.floor(newQueueCount * 1.5);  // Assume 1.5 minutes per patient

        queueCount.textContent = `Current Queue: ${newQueueCount} Patients`;
        estimatedWaitTime.textContent = `Estimated Wait Time: ${newWaitTime} minutes`;

        // Update timestamp
        const now = new Date();
        queueTimestamp.textContent = now.toLocaleTimeString();
    }

    // Handle queue update button click
    const updateQueueButton = document.querySelector('.btn-update');
    updateQueueButton.addEventListener('click', updateQueue);

    // Dark mode toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');

        // Change icon on toggle
        const icon = darkModeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Admit patient button interaction
    const admitPatientButton = document.querySelector('.btn-admit');
    admitPatientButton.addEventListener('click', function() {
        alert('Patient admitted successfully!');
    });

    // Initial call to set queue info on page load
    updateQueue();
});
// Bed data for different hospitals and departments
const bedData = {
    hospital1: {
        general: generateBeds(100),
        icu: generateBeds(50),
        critical: generateBeds(50)
    },
    hospital2: {
        general: generateBeds(100),
        icu: generateBeds(50),
        critical: generateBeds(50)
    },
    hospital3: {
        general: generateBeds(100),
        icu: generateBeds(50),
        critical: generateBeds(50)
    }
};

// Function to generate bed data with random statuses
function generateBeds(numBeds) {
    const statuses = ['available', 'occupied', 'reserved'];
    const beds = [];
    for (let i = 1; i <= numBeds; i++) {
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        beds.push({ id: i, status: randomStatus });
    }
    return beds;
}

// Function to update bed layout based on selected hospital and department
function updateBeds() {
    const hospitalSelect = document.getElementById('hospital-select').value;
    const departmentSelect = document.getElementById('department-select').value;
    const bedGrid = document.getElementById('bed-grid');

    // Clear current bed layout
    bedGrid.innerHTML = '';

    // Get bed data for selected hospital and department
    const beds = bedData[hospitalSelect][departmentSelect];

    // Render bed layout
    beds.forEach(bed => {
        const bedElement = document.createElement('div');
        bedElement.classList.add('bed', bed.status);
        bedElement.textContent = `Bed ${bed.id}`;
        bedGrid.appendChild(bedElement);
    });
}

// Add event listener to "View Beds" button
document.getElementById('view-beds-button').addEventListener('click', updateBeds);
