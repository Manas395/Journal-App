const auth = localStorage.getItem('journal_auth');

const rolesString = localStorage.getItem('journal_roles');
if (rolesString) {
    const roles = JSON.parse(rolesString);
    if (roles.includes('ADMIN')) {
        // Remove the 'd-none' (display: none) class from Bootstrap
        document.getElementById('adminPanelBtn').classList.remove('d-none');
    }
}

// 1. READ: Fetch all journals
// This function runs on page load and when the user clicks "Apply Filter"
function loadJournals() {
    const authHeader = localStorage.getItem('journal_auth'); // Or however you store your Basic Auth string
    const datePicker = document.getElementById('journalDatePicker');
    const selectedDate = datePicker ? datePicker.value : ""; // Captures "YYYY-MM-DD"

    // 1. Construct the URL dynamically based on whether a date is selected
    let url = '/Journal/journal';
    if (selectedDate) {
        url += `?date=${selectedDate}`;
    }

    // 2. Fire the fetch request to your single backend endpoint
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch journal entries');
        }
        return response.json();
    })
    .then(journals => {
        // 3. Pass the array (either full or filtered) to your rendering function
        displayJournals(journals);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Could not load journals.');
    });
}

// Helper function to clear the input and refresh back to "show all"
function clearDateFilter() {
    document.getElementById('journalDatePicker').value = "";
    loadJournals(); // Calling this with an empty input loads everything
}

function displayJournals(journals) {
    const container = document.getElementById('journal-container');
    container.innerHTML = journals.map(j => `
        <div class="col-md-4 mb-3">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title">${j.title}</h5>
                    <p class="card-text text-muted small">${new Date(j.date).toLocaleDateString()}</p>
                    <p class="card-text text-truncate">${j.content}</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-outline-primary" onclick="openEditModal('${j.id}', '${j.title}', '${escape(j.content)}')">Edit</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteEntry('${j.id}')">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// 2. DELETE: Remove an entry
async function deleteEntry(id) {
    if (confirm("Are you sure you want to delete this memory?")) {
        const response = await fetch(`/Journal/journal/id/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': auth }
        });
        if (response.ok) loadJournals(); // Refresh the list
    }
}

// 3. UPDATE: Open Modal and Populate
function openEditModal(id, title, content) {
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-title').value = title;
    document.getElementById('edit-content').value = unescape(content);
    new bootstrap.Modal(document.getElementById('editModal')).show();
}

async function updateEntry() {
    const id = document.getElementById('edit-id').value;
    const updatedData = {
        title: document.getElementById('edit-title').value,
        content: document.getElementById('edit-content').value
    };

    const response = await fetch(`/Journal/journal/id/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        },
        body: JSON.stringify(updatedData)
    });

    if (response.ok) {
        location.reload(); // Refresh to see changes
    }
}

function logout() {
    localStorage.removeItem('journal_auth');
    window.location.href = '/Journal/index.html';
}

window.onload = loadJournals;