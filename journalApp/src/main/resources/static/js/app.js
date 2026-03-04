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
async function loadJournals() {
    const response = await fetch('/Journal/journal', {
        headers: { 'Authorization': auth }
    });
    if (response.ok) {
        const journals = await response.json();
        displayJournals(journals);
    } else if (response.status === 401) {
        window.location.href = '/Journal/index.html'; // Redirect to login if unauthorized
    }
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