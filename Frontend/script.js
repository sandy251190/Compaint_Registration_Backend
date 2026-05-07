const API_URL = 'http://localhost:5000/complaints';

/**
 * Tab Switching Logic
 */
function switchTab(tab) {
    const formSec = document.getElementById('section-form');
    const listSec = document.getElementById('section-list');
    const formBtn = document.getElementById('tab-btn-form');
    const listBtn = document.getElementById('tab-btn-list');

    if (tab === 'form') {
        formSec.classList.remove('hidden');
        listSec.classList.add('hidden');
        formBtn.classList.add('active');
        listBtn.classList.remove('active');
    } else {
        formSec.classList.add('hidden');
        listSec.classList.remove('hidden');
        formBtn.classList.remove('active');
        listBtn.classList.add('active');
        loadComplaints();
    }
}

/**
 * Handle Form Submission
 */
document.getElementById('complaintForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('successMessage');
    const originalText = submitBtn.innerText;
    
    // UI Feedback
    submitBtn.innerText = 'Processing...';
    submitBtn.disabled = true;
    successMsg.classList.add('hidden'); // Hide if it was already showing

    const data = {
        name: document.getElementById('name').value,
        city: document.getElementById('city').value,
        mobile: document.getElementById('mobile').value,
        complaint: document.getElementById('complaint').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            // Show persistent success message
            successMsg.classList.remove('hidden');
            
            // NOTE: We do NOT reset the form or switch tabs as per user request
            // submitBtn.innerText = 'Submitted!';
        } else {
            alert('Error: ' + result.message);
        }
    } catch (err) {
        console.error(err);
        alert('Server connection failed. Is the backend running?');
    } finally {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    }
});

/**
 * Load Complaints from API
 */
async function loadComplaints() {
    const container = document.getElementById('complaintsContainer');
    
    try {
        const response = await fetch(API_URL);
        const res = await response.json();
        const complaints = res.data;

        if (complaints.length === 0) {
            container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 3rem;">No complaints found. Be the first to report!</p>`;
            return;
        }

        container.innerHTML = complaints.reverse().map(item => `
            <div class="complaint-card">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div>
                        <h3 style="color: #fff; margin-bottom: 4px;">${item.name}</h3>
                        <p style="font-size: 0.85rem; color: var(--text-dim);">${item.city} | ${item.mobile}</p>
                    </div>
                </div>
                <p style="color: var(--text-dim); font-size: 0.95rem; line-height: 1.6;">${item.complaint}</p>
                <p style="margin-top: 1.5rem; font-size: 0.75rem; color: var(--text-muted); text-align: right;">
                    Submitted on: ${new Date(item.submittedAt).toLocaleDateString()}
                </p>
            </div>
        `).join('');

    } catch (err) {
        container.innerHTML = `<p style="text-align: center; color: var(--error); padding: 3rem;">Error loading data. Is the backend running?</p>`;
    }
}
