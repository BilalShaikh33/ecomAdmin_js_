document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Toggle for Mobile
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Active Link Highlight
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-item');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});

// Mock Data Utilities (to be used across pages)
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

// Generic Delete Function
const deleteItem = (btn, message = 'Are you sure you want to delete this item?') => {
    if (confirm(message)) {
        // Find closest row (tr) or card
        const item = btn.closest('tr') || btn.closest('.card');
        if (item) {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
                item.remove();
            }, 300);
        }
    }
};

// Edit Category
let currentEditingRow = null;

// Modal Helpers
const openModal = () => {
    const modal = document.getElementById('categoryModal');
    if (modal) modal.classList.add('active');
};

const closeModal = () => {
    const modal = document.getElementById('categoryModal');
    if (modal) modal.classList.remove('active');
    currentEditingRow = null; // Clear editing state on close
};

const prepareAddCategory = () => {
    const modal = document.getElementById('categoryModal');
    if (modal) {
        const title = modal.querySelector('h2');
        if (title) title.textContent = 'Add New Category';
        const nameInput = modal.querySelector('input[type="text"]');
        const descInput = modal.querySelector('textarea');
        if (nameInput) nameInput.value = '';
        if (descInput) descInput.value = '';
        currentEditingRow = null;
        openModal();
    }
};

// Edit Category
const editCategory = (btn) => {
    const modal = document.getElementById('categoryModal');
    if (modal) {
        // Update modal title
        const title = modal.querySelector('h2');
        if (title) title.textContent = 'Edit Category';

        // Save reference to the row
        currentEditingRow = btn.closest('tr');

        if (currentEditingRow) {
            const name = currentEditingRow.children[0].innerText;
            const desc = currentEditingRow.children[1].innerText;
            // Status is in the 4th column (index 3)
            const status = currentEditingRow.children[3].innerText.trim(); // Trim to remove newlines

            const nameInput = modal.querySelector('input[type="text"]');
            const descInput = modal.querySelector('textarea');
            const statusSelect = modal.querySelector('select');

            if (nameInput) nameInput.value = name;
            if (descInput) descInput.value = desc;
            if (statusSelect) statusSelect.value = status;
        }

        openModal();
    }
};

const saveCategory = () => {
    const modal = document.getElementById('categoryModal');
    const nameInput = modal.querySelector('input[type="text"]');
    const descInput = modal.querySelector('textarea');
    const statusSelect = modal.querySelector('select');

    if (currentEditingRow) {
        // Update existing row
        currentEditingRow.children[0].innerText = nameInput.value;
        currentEditingRow.children[1].innerText = descInput.value;

        const statusCell = currentEditingRow.children[3];
        // Re-create badge
        let badgeClass = 'badge-danger';
        if (statusSelect.value === 'Active') badgeClass = 'badge-success';
        if (statusSelect.value === 'Draft') badgeClass = 'badge-warning';

        statusCell.innerHTML = `<span class="badge ${badgeClass}">${statusSelect.value}</span>`;

        // Reset
        currentEditingRow = null;
    } else {
        // Add new category
        const tableBody = document.querySelector('tbody');
        if (tableBody) {
            const newRow = document.createElement('tr');
            let badgeClass = 'badge-danger';
            if (statusSelect.value === 'Active') badgeClass = 'badge-success';
            if (statusSelect.value === 'Draft') badgeClass = 'badge-warning';

            newRow.innerHTML = `
                <td>${nameInput.value}</td>
                <td style="color: var(--text-muted);">${descInput.value}</td>
                <td>0</td>
                <td><span class="badge ${badgeClass}">${statusSelect.value}</span></td>
                <td>
                    <button class="btn btn-sm" style="color: var(--primary-color);" onclick="editCategory(this)"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn btn-sm" style="color: var(--danger);" onclick="deleteItem(this)"><i class="fa-solid fa-trash"></i></button>
                </td>
             `;
            tableBody.appendChild(newRow);
        }
    }

    closeModal();

    // Clear inputs
    if (nameInput) nameInput.value = '';
    if (descInput) descInput.value = '';
};

// Generic View/Edit Details (for placeholders)
const viewItem = (btn, type) => {
    alert(`Viewing details for ${type}. This feature is mocked for this UI.`);
};

const editItemGeneric = (btn, type) => {
    alert(`Editing ${type}. This functionality would open a form.`);
};

