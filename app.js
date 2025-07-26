// HOA Swim Meet Volunteer Manager - Main JavaScript

// ======== Global Data Keys ========
const LS = {
    VOLUNTEERS: 'hoa_volunteers',
    MEETS: 'hoa_meets',
    ROLES: 'hoa_roles',
    CHECKINS: 'hoa_checkins'
};

// ======== Utility Functions ========
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function generateID() {
    return crypto.randomUUID();
}

function saveToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLS(key, fallback = []) {
    return JSON.parse(localStorage.getItem(key)) || fallback;
}

function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
}

function formatTime(timeStr) {
    const [hour, minute] = timeStr.split(':');
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ======== Application State ========
let volunteers = loadFromLS(LS.VOLUNTEERS);
let meets = loadFromLS(LS.MEETS);
let roles = loadFromLS(LS.ROLES);
let checkins = loadFromLS(LS.CHECKINS);

// ======== Navigation Handling ========
function showSection(sectionId) {
    $$('.section').forEach(sec => sec.classList.remove('active'));
    $(`#${sectionId}`).classList.add('active');
    $$('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.section === sectionId));
}

function setupNavigation() {
    $$('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => showSection(btn.dataset.section));
    });
}

// ======== Dashboard Rendering ========
function renderDashboard() {
    $('#total-volunteers').textContent = volunteers.length;
    $('#total-meets').textContent = meets.length;
    $('#total-roles').textContent = roles.length;

    // Today's Check-ins
    const today = new Date().toDateString();
    const todaysCheckins = checkins.filter(c => new Date(c.time).toDateString() === today);
    $('#total-checkins').textContent = todaysCheckins.length;

    // Upcoming Meets
    const upcomingContainer = $('#upcoming-meets-list');
    upcomingContainer.innerHTML = '';
    const upcoming = meets.filter(m => new Date(m.date) >= new Date()).sort((a, b) => new Date(a.date) - new Date(b.date));
    if (!upcoming.length) {
        upcomingContainer.innerHTML = '<div class="no-data">No upcoming meets scheduled</div>';
    } else {
        upcoming.slice(0, 3).forEach(meet => {
            const item = document.createElement('div');
            item.className = 'item-detail';
            item.innerHTML = `<strong>${meet.name}</strong> <span>${formatDate(meet.date)} at ${formatTime(meet.time)}</span>`;
            upcomingContainer.appendChild(item);
        });
    }

    // Recent Check-ins
    const recentContainer = $('#recent-checkins-list');
    recentContainer.innerHTML = '';
    if (!todaysCheckins.length) {
        recentContainer.innerHTML = '<div class="no-data">No recent check-ins</div>';
    } else {
        todaysCheckins.slice(-5).reverse().forEach(ci => {
            const volunteer = volunteers.find(v => v.id === ci.volunteerID);
            const meet = meets.find(m => m.id === ci.meetID);
            const div = document.createElement('div');
            div.className = 'item-detail';
            div.innerHTML = `<strong>${volunteer.firstName} ${volunteer.lastName}</strong> <span>${ci.roleName} – ${meet.name}</span>`;
            recentContainer.appendChild(div);
        });
    }
}

// ======== Volunteer Management ========
function renderVolunteers() {
    const container = $('#volunteers-container');
    container.innerHTML = '';
    if (!volunteers.length) {
        container.innerHTML = '<div class="no-data">No volunteers registered yet</div>';
        return;
    }

    volunteers.forEach(v => {
        const card = document.createElement('div');
        card.className = 'volunteer-item';
        card.innerHTML = `
            <div class="item-header">
                <div>
                    <div class="item-title">${v.firstName} ${v.lastName}</div>
                    <div class="item-subtitle">${v.email}</div>
                </div>
                <div class="item-actions">
                    <button class="btn-small btn-danger" data-id="${v.id}" onclick="deleteVolunteer('${v.id}')">Delete</button>
                </div>
            </div>
            <div class="item-details">
                <div class="item-detail"><strong>Phone:</strong> <span>${v.phone || '—'}</span></div>
                <div class="item-detail"><strong>Experience:</strong> <span class="badge badge-info">${v.experience}</span></div>
            </div>
        `;
        container.appendChild(card);
    });

    populateVolunteerSelects();
    renderDashboard();
}

function populateVolunteerSelects() {
    const vSelect = $('#qr-volunteer');
    vSelect.innerHTML = '<option value="">Choose a volunteer...</option>';
    volunteers.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.id;
        opt.textContent = `${v.firstName} ${v.lastName}`;
        vSelect.appendChild(opt);
    });
}

$('#add-volunteer-form').addEventListener('submit', e => {
    e.preventDefault();
    const v = {
        id: generateID(),
        firstName: $('#volunteer-first-name').value.trim(),
        lastName: $('#volunteer-last-name').value.trim(),
        email: $('#volunteer-email').value.trim(),
        phone: $('#volunteer-phone').value.trim(),
        experience: $('#volunteer-experience').value,
    };
    volunteers.push(v);
    saveToLS(LS.VOLUNTEERS, volunteers);
    e.target.reset();
    renderVolunteers();
    showToast('Volunteer added');
});

function deleteVolunteer(id) {
    if (!confirm('Delete this volunteer?')) return;
    volunteers = volunteers.filter(v => v.id !== id);
    saveToLS(LS.VOLUNTEERS, volunteers);
    renderVolunteers();
    showToast('Volunteer removed', 'danger');
}

// ======== Meet Management ========
function renderMeets() {
    const container = $('#meets-container');
    container.innerHTML = '';
    if (!meets.length) {
        container.innerHTML = '<div class="no-data">No meets scheduled yet</div>';
        return;
    }

    meets.forEach(m => {
        const card = document.createElement('div');
        card.className = 'meet-item';
        card.innerHTML = `
            <div class="item-header">
                <div>
                    <div class="item-title">${m.name}</div>
                    <div class="item-subtitle">${formatDate(m.date)} at ${formatTime(m.time)}</div>
                </div>
                <div class="item-actions">
                    <button class="btn-small btn-danger" onclick="deleteMeet('${m.id}')">Delete</button>
                </div>
            </div>
            <div class="item-details">
                <div class="item-detail"><strong>Location:</strong> <span>${m.location}</span></div>
                <div class="item-detail"><strong>Description:</strong> <span>${m.description || '—'}</span></div>
            </div>
        `;
        container.appendChild(card);
    });

    populateMeetSelects();
    renderDashboard();
}

function populateMeetSelects() {
    const mSelect = $('#qr-meet');
    mSelect.innerHTML = '<option value="">Choose a meet...</option>';
    meets.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = `${m.name} (${formatDate(m.date)})`;
        mSelect.appendChild(opt);
    });
}

$('#add-meet-form').addEventListener('submit', e => {
    e.preventDefault();
    const m = {
        id: generateID(),
        name: $('#meet-name').value.trim(),
        date: $('#meet-date').value,
        time: $('#meet-time').value,
        location: $('#meet-location').value.trim(),
        description: $('#meet-description').value.trim(),
    };
    meets.push(m);
    saveToLS(LS.MEETS, meets);
    e.target.reset();
    renderMeets();
    showToast('Meet added');
});

function deleteMeet(id) {
    if (!confirm('Delete this meet?')) return;
    meets = meets.filter(m => m.id !== id);
    saveToLS(LS.MEETS, meets);
    renderMeets();
    showToast('Meet removed', 'danger');
}

// ======== Role Management ========
function renderRoles() {
    const container = $('#roles-container');
    container.innerHTML = '';
    if (!roles.length) {
        container.innerHTML = '<div class="no-data">No roles defined yet. Click "Load Standard Swim Meet Roles" to get started.</div>';
        return;
    }

    roles.forEach(r => {
        const card = document.createElement('div');
        card.className = 'role-item';
        card.innerHTML = `
            <div class="item-header">
                <div>
                    <div class="item-title">${r.name}</div>
                    <div class="item-subtitle">${r.description || 'No description'}</div>
                </div>
                <div class="item-actions">
                    <button class="btn-small btn-danger" onclick="deleteRole('${r.id}')">Delete</button>
                </div>
            </div>
            <div class="item-details">
                <div class="item-detail"><strong>Needed:</strong> <span>${r.needed}</span></div>
                <div class="item-detail"><strong>Experience:</strong> <span>${r.experience}</span></div>
                <div class="item-detail"><strong>Training:</strong> <span>${r.training ? 'Yes' : 'No'}</span></div>
            </div>
        `;
        container.appendChild(card);
    });

    populateRoleSelects();
    renderDashboard();
}

function populateRoleSelects() {
    const rSelect = $('#qr-role');
    rSelect.innerHTML = '<option value="">Choose a role...</option>';
    roles.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.id;
        opt.textContent = r.name;
        rSelect.appendChild(opt);
    });
}

$('#add-role-form').addEventListener('submit', e => {
    e.preventDefault();
    const r = {
        id: generateID(),
        name: $('#role-name').value.trim(),
        needed: +$('#role-needed').value,
        description: $('#role-description').value.trim(),
        experience: $('#role-experience').value,
        training: $('#role-training').checked,
    };
    roles.push(r);
    saveToLS(LS.ROLES, roles);
    e.target.reset();
    renderRoles();
    showToast('Role added');
});

function deleteRole(id) {
    if (!confirm('Delete this role?')) return;
    roles = roles.filter(r => r.id !== id);
    saveToLS(LS.ROLES, roles);
    renderRoles();
    showToast('Role removed', 'danger');
}

$('#load-standard-roles').addEventListener('click', () => {
    if (!confirm('Load standard swim meet roles? This will add default roles.')) return;
    const standard = [
        { name: 'Timer', needed: 18, experience: 'beginner' },
        { name: 'Head Timer', needed: 1, experience: 'experienced' },
        { name: 'Clerk of Course', needed: 2, experience: 'intermediate' },
        { name: 'Announcer', needed: 1, experience: 'experienced' },
        { name: 'Computer Operator', needed: 2, experience: 'intermediate' },
        { name: 'Concessions Staff', needed: 6, experience: 'beginner' },
        { name: 'Set Up Crew', needed: 5, experience: 'beginner' },
        { name: 'Clean Up Crew', needed: 5, experience: 'beginner' },
        { name: 'Awards/Ribbons', needed: 3, experience: 'beginner' },
        { name: 'Meet Marshal', needed: 2, experience: 'experienced' },
    ];
    standard.forEach(s => {
        roles.push({ id: generateID(), ...s, training: false, description: '' });
    });
    saveToLS(LS.ROLES, roles);
    renderRoles();
    showToast('Standard roles loaded');
});

// ======== QR Generation ========
let currentQRData = null;

$('#qr-generator-form').addEventListener('submit', e => {
    e.preventDefault();
    generateIndividualQR();
});

function generateIndividualQR() {
    const vID = $('#qr-volunteer').value;
    const mID = $('#qr-meet').value;
    const rID = $('#qr-role').value;

    if (!vID || !mID || !rID) {
        alert('Please select volunteer, meet, and role');
        return;
    }

    // Build unique payload
    const payload = {
        volunteerID: vID,
        meetID: mID,
        roleID: rID,
        timestamp: Date.now(),
        nonce: Math.random().toString(36).slice(2)
    };
    currentQRData = payload;

    const qrContainer = $('#qr-code-container');
    qrContainer.innerHTML = '';               // clear previous code

    // ❶ stringify the payload  ❷ width option  ❸ callback adds canvas
    QRCode.toCanvas(
        JSON.stringify(payload),               // *** FIXED ***
        { width: 240 },
        (err, canvas) => {
            if (err) {
                alert('Error generating QR: ' + err);
                return;
            }
            qrContainer.appendChild(canvas);
            $('#download-qr').style.display = 'inline-block';
        }
    );
}

$('#download-qr').addEventListener('click', () => {
    if (!currentQRData) return;
    const canvas = $('#qr-code-container canvas');
    canvas.toBlob(blob => saveAs(blob, 'volunteer_qr.png'));
});

// Bulk QR Generation
$('#generate-all-qrs').addEventListener('click', async () => {
    if (!volunteers.length || !meets.length || !roles.length) return alert('Ensure volunteers, meets, and roles exist');
    $('#download-all-qrs').style.display = 'none';
    const zip = new JSZip();
    for (const v of volunteers) {
        for (const m of meets) {
            for (const r of roles) {
                const payload = {
                    volunteerID: v.id,
                    meetID: m.id,
                    roleID: r.id,
                    timestamp: Date.now(),
                    nonce: Math.random().toString(36).slice(2)
                };
                await new Promise(resolve => {
                    QRCode.toDataURL(JSON.stringify(payload), { width: 240 }, (err, url) => {
                        if (!err) zip.file(`${v.firstName}_${v.lastName}_${m.name}_${r.name}.png`, url.split(',')[1], { base64: true });
                        resolve();
                    });
                });
            }
        }
    }
    zip.generateAsync({ type: 'blob' }).then(blob => {
        saveAs(blob, 'all_qr_codes.zip');
        $('#download-all-qrs').style.display = 'inline-block';
    });
});

// ======== Scanner ========
let html5QrCode = null;
$('#start-scanner').addEventListener('click', () => {
    const readerDiv = $('#qr-reader');
    html5QrCode = new Html5Qrcode('qr-reader');
    $('#start-scanner').style.display = 'none';
    $('#stop-scanner').style.display = 'inline-block';

    html5QrCode.start({ facingMode: 'environment' }, { fps: 10, qrbox: 250 }, onScanSuccess)
        .catch(err => alert('Camera start error: ' + err));
});

$('#stop-scanner').addEventListener('click', stopScanner);

function stopScanner() {
    if (html5QrCode) html5QrCode.stop().then(() => {
        html5QrCode.clear();
        $('#start-scanner').style.display = 'inline-block';
        $('#stop-scanner').style.display = 'none';
    });
}

function onScanSuccess(decodedText) {
    try {
        const data = JSON.parse(decodedText);
        const v = volunteers.find(x => x.id === data.volunteerID);
        const m = meets.find(x => x.id === data.meetID);
        const r = roles.find(x => x.id === data.roleID);
        if (!v || !m || !r) throw new Error('Invalid QR');

        // Prevent duplicate for same meet+volunteer
        const exists = checkins.find(ci => ci.volunteerID === v.id && ci.meetID === m.id);
        if (exists) {
            showScanMessage('Already checked in', 'warning');
            return;
        }

        const ci = { id: generateID(), volunteerID: v.id, meetID: m.id, roleName: r.name, time: Date.now() };
        checkins.push(ci);
        saveToLS(LS.CHECKINS, checkins);
        showScanMessage(`Checked in ${v.firstName} ${v.lastName}`, 'success');
        renderCheckins();
        renderDashboard();
    } catch {
        showScanMessage('Invalid QR code', 'danger');
    }
}

function showScanMessage(msg, type) {
    const res = $('#scan-result');
    res.className = `scan-result scan-${type}`;
    res.innerHTML = `<div class="scan-message">${msg}</div>`;
    setTimeout(() => {
        res.className = 'scan-result';
        res.innerHTML = '<div class="scan-message">Scan a volunteer QR code to check them in</div>';
    }, 4000);
}

function renderCheckins() {
    const container = $('#checkins-container');
    container.innerHTML = '';
    const today = new Date().toDateString();
    const todays = checkins.filter(ci => new Date(ci.time).toDateString() === today).reverse();

    if (!todays.length) {
        container.innerHTML = '<div class="no-data">No check-ins recorded today</div>';
        return;
    }

    todays.forEach(ci => {
        const v = volunteers.find(v => v.id === ci.volunteerID);
        const m = meets.find(m => m.id === ci.meetID);
        const item = document.createElement('div');
        item.className = 'checkin-item';
        item.innerHTML = `
            <div class="checkin-info">
                <div class="checkin-name">${v.firstName} ${v.lastName}</div>
                <div class="checkin-details">${ci.roleName} – ${m.name}</div>
            </div>
            <div class="checkin-time">${new Date(ci.time).toLocaleTimeString()}</div>
        `;
        container.appendChild(item);
    });
}

// ======== Import CSV ========
$('#import-btn').addEventListener('click', () => $('#import-modal').classList.add('active'));
function closeImportModal() { $('#import-modal').classList.remove('active'); }

$('#import-form').addEventListener('submit', e => {
    e.preventDefault();
    const file = $('#csv-input').files[0];
    if (!file) return;
    Papa.parse(file, {
        header: true,
        complete: results => {
            importFromCSV(results.data);
            closeImportModal();
        },
        error: err => alert('CSV parse error: ' + err)
    });
});

function importFromCSV(rows) {
    let addedV = 0, addedM = 0;
    rows.forEach(row => {
        if (row.type === 'volunteer') {
            volunteers.push({
                id: generateID(),
                firstName: row.firstName || row.first_name,
                lastName: row.lastName || row.last_name,
                email: row.email,
                phone: row.phone,
                experience: row.experience || 'beginner'
            });
            addedV++;
        } else if (row.type === 'meet') {
            meets.push({
                id: generateID(),
                name: row.name,
                date: row.date,
                time: row.time,
                location: row.location,
                description: row.description
            });
            addedM++;
        }
    });
    saveToLS(LS.VOLUNTEERS, volunteers);
    saveToLS(LS.MEETS, meets);
    renderVolunteers();
    renderMeets();
    showToast(`Imported ${addedV} volunteers and ${addedM} meets`);
}

// ======== Clear Data ========
$('#clear-data-btn').addEventListener('click', () => {
    if (!confirm('This will erase ALL data. Continue?')) return;
    localStorage.clear();
    location.reload();
});

// ======== Initialization ========
function init() {
    setupNavigation();
    renderVolunteers();
    renderMeets();
    renderRoles();
    renderCheckins();
    renderDashboard();
}

document.addEventListener('DOMContentLoaded', init);
