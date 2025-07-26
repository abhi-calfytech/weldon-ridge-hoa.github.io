// Application State
let appData = {
    volunteers: [],
    meets: [],
    positions: [
        {id: "pos1", name: "Timer", needed: 6, description: "Time swimmers in designated lanes"},
        {id: "pos2", name: "Head Timer", needed: 1, description: "Supervise timing operations"},
        {id: "pos3", name: "Clerk of Course", needed: 2, description: "Manage swimmer check-in and organization"},
        {id: "pos4", name: "Announcer", needed: 1, description: "Provide meet commentary and updates"},
        {id: "pos5", name: "Computer Operator", needed: 1, description: "Manage meet software and results"},
        {id: "pos6", name: "Concessions Staff", needed: 4, description: "Food and beverage service"},
        {id: "pos7", name: "Setup Crew", needed: 3, description: "Equipment setup before meet"},
        {id: "pos8", name: "Cleanup Crew", needed: 3, description: "Equipment cleanup after meet"},
        {id: "pos9", name: "Awards/Ribbons", needed: 2, description: "Results processing and distribution"}
    ],
    assignments: [],
    checkIns: [],
    portalPeople: []
};

let qrScanner = null;
let scannerActive = false;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    loadData();
    initializeNavigation();
    initializeForms();
    updateDashboard();
    updateAllViews();
    
    // Set dashboard as active by default
    showSection('dashboard');
});

// Data Management
function saveData() {
    localStorage.setItem('hoaVolunteerData', JSON.stringify(appData));
}

function loadData() {
    const saved = localStorage.getItem('hoaVolunteerData');
    if (saved) {
        const parsedData = JSON.parse(saved);
        // Ensure all arrays exist
        appData = {
            volunteers: parsedData.volunteers || [],
            meets: parsedData.meets || [],
            positions: appData.positions, // Keep default positions
            assignments: parsedData.assignments || [],
            checkIns: parsedData.checkIns || [],
            portalPeople: parsedData.portalPeople || []
        };
    }
}

function generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// Navigation
function initializeNavigation() {
    console.log('Initializing navigation...');
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    console.log('Found nav items:', navItems.length);
    
    navItems.forEach(item => {
        const section = item.getAttribute('data-section');
        console.log('Adding listener for section:', section);
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav item clicked:', section);
            showSection(section);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Set dashboard as active initially
    const dashboardNav = document.querySelector('.nav-item[data-section="dashboard"]');
    if (dashboardNav) {
        dashboardNav.classList.add('active');
    }
}

function showSection(sectionName) {
    console.log('Showing section:', sectionName);
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Section activated:', sectionName);
    } else {
        console.error('Section not found:', sectionName);
    }
    
    // Update views when switching sections
    if (sectionName === 'qr-codes') {
        renderQRCodes();
    } else if (sectionName === 'scanner') {
        initializeScanner();
    } else if (sectionName === 'portal') {
        renderPortalPeople();
        renderPortalAssignments();
    } else if (sectionName === 'meets') {
        renderMeets();
    } else if (sectionName === 'volunteers') {
        renderVolunteers();
    }
}

// Forms Initialization
function initializeForms() {
    console.log('Initializing forms...');
    
    // Meet Form
    const meetForm = document.getElementById('meet-form');
    if (meetForm) {
        meetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addMeet();
        });
    }
    
    // Volunteer Form
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addVolunteer();
        });
    }
    
    // Person Form (Portal)
    const personForm = document.getElementById('person-form');
    if (personForm) {
        personForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addPerson();
        });
    }
    
    // Assignment Form
    const assignmentForm = document.getElementById('assignment-form');
    if (assignmentForm) {
        assignmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            assignVolunteer();
        });
    }
}

// Meet Management
function showAddMeetForm() {
    console.log('Showing add meet form...');
    const form = document.getElementById('add-meet-form');
    if (form) {
        form.classList.remove('hidden');
    }
}

function hideAddMeetForm() {
    const form = document.getElementById('add-meet-form');
    if (form) {
        form.classList.add('hidden');
    }
    const meetForm = document.getElementById('meet-form');
    if (meetForm) {
        meetForm.reset();
    }
}

function addMeet() {
    const meet = {
        id: generateId(),
        name: document.getElementById('meet-name').value,
        date: document.getElementById('meet-date').value,
        time: document.getElementById('meet-time').value,
        location: document.getElementById('meet-location').value,
        description: document.getElementById('meet-description').value,
        createdAt: new Date().toISOString()
    };
    
    appData.meets.push(meet);
    saveData();
    updateAllViews();
    hideAddMeetForm();
    showNotification('Meet added successfully!', 'success');
}

function deleteMeet(meetId) {
    if (confirm('Are you sure you want to delete this meet? This will also remove all related assignments.')) {
        appData.meets = appData.meets.filter(meet => meet.id !== meetId);
        appData.assignments = appData.assignments.filter(assignment => assignment.meetId !== meetId);
        appData.checkIns = appData.checkIns.filter(checkIn => checkIn.meetId !== meetId);
        saveData();
        updateAllViews();
        showNotification('Meet deleted successfully!', 'success');
    }
}

function renderMeets() {
    const container = document.getElementById('meets-list');
    if (!container) return;
    
    if (appData.meets.length === 0) {
        container.innerHTML = '<p class="no-data">No meets scheduled. Click "Add New Meet" to get started.</p>';
        return;
    }
    
    container.innerHTML = appData.meets.map(meet => `
        <div class="meet-item">
            <div class="meet-item-header">
                <div>
                    <h3 class="meet-item-title">${meet.name}</h3>
                    <p class="meet-item-date">${formatDate(meet.date)} at ${meet.time}</p>
                    <p class="meet-item-location">${meet.location}</p>
                    ${meet.description ? `<p class="meet-item-description">${meet.description}</p>` : ''}
                </div>
                <div class="item-actions">
                    <button class="btn btn--outline btn--sm" onclick="viewMeetPositions('${meet.id}')">View Positions</button>
                    <button class="btn btn--outline btn--sm" onclick="deleteMeet('${meet.id}')">Delete</button>
                </div>
            </div>
            <div id="positions-${meet.id}" class="positions-container" style="display: none;">
                <div class="positions-grid">
                    ${renderMeetPositions(meet.id)}
                </div>
            </div>
        </div>
    `).join('');
}

function viewMeetPositions(meetId) {
    const container = document.getElementById(`positions-${meetId}`);
    if (!container) return;
    
    if (container.style.display === 'none') {
        container.style.display = 'block';
        container.innerHTML = `<div class="positions-grid">${renderMeetPositions(meetId)}</div>`;
    } else {
        container.style.display = 'none';
    }
}

function renderMeetPositions(meetId) {
    return appData.positions.map(position => {
        const assignments = appData.assignments.filter(a => a.meetId === meetId && a.positionId === position.id);
        const assignedVolunteers = assignments.map(a => {
            const volunteer = appData.volunteers.find(v => v.id === a.volunteerId);
            return volunteer ? `${volunteer.firstName} ${volunteer.lastName}` : 'Unknown';
        });
        
        return `
            <div class="position-item">
                <div class="position-header">
                    <h4 class="position-name">${position.name}</h4>
                    <span class="position-count">${assignments.length}/${position.needed}</span>
                </div>
                <p class="position-description">${position.description}</p>
                <ul class="position-volunteers">
                    ${assignedVolunteers.length > 0 
                        ? assignedVolunteers.map(name => `<li>${name}</li>`).join('')
                        : '<li class="no-volunteers">No volunteers assigned</li>'
                    }
                </ul>
            </div>
        `;
    }).join('');
}

// Volunteer Management
function showAddVolunteerForm() {
    console.log('Showing add volunteer form...');
    const form = document.getElementById('add-volunteer-form');
    if (form) {
        form.classList.remove('hidden');
    }
}

function hideAddVolunteerForm() {
    const form = document.getElementById('add-volunteer-form');
    if (form) {
        form.classList.add('hidden');
    }
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.reset();
    }
}

function addVolunteer() {
    const volunteer = {
        id: generateId(),
        firstName: document.getElementById('volunteer-first-name').value,
        lastName: document.getElementById('volunteer-last-name').value,
        email: document.getElementById('volunteer-email').value,
        phone: document.getElementById('volunteer-phone').value || '',
        createdAt: new Date().toISOString()
    };
    
    appData.volunteers.push(volunteer);
    saveData();
    updateAllViews();
    hideAddVolunteerForm();
    showNotification('Volunteer added successfully!', 'success');
}

function deleteVolunteer(volunteerId) {
    if (confirm('Are you sure you want to delete this volunteer? This will also remove all their assignments.')) {
        appData.volunteers = appData.volunteers.filter(volunteer => volunteer.id !== volunteerId);
        appData.assignments = appData.assignments.filter(assignment => assignment.volunteerId !== volunteerId);
        appData.checkIns = appData.checkIns.filter(checkIn => checkIn.volunteerId !== volunteerId);
        saveData();
        updateAllViews();
        showNotification('Volunteer deleted successfully!', 'success');
    }
}

function showAssignmentModal(volunteerId) {
    document.getElementById('assignment-volunteer-id').value = volunteerId;
    
    // Populate meets dropdown
    const meetSelect = document.getElementById('assignment-meet');
    meetSelect.innerHTML = '<option value="">Select a meet</option>' + 
        appData.meets.map(meet => `<option value="${meet.id}">${meet.name} - ${formatDate(meet.date)}</option>`).join('');
    
    // Populate positions dropdown
    const positionSelect = document.getElementById('assignment-position');
    positionSelect.innerHTML = '<option value="">Select a position</option>' + 
        appData.positions.map(position => `<option value="${position.id}">${position.name}</option>`).join('');
    
    document.getElementById('assignment-modal').classList.remove('hidden');
}

function hideAssignmentModal() {
    document.getElementById('assignment-modal').classList.add('hidden');
    const form = document.getElementById('assignment-form');
    if (form) {
        form.reset();
    }
}

function assignVolunteer() {
    const volunteerId = document.getElementById('assignment-volunteer-id').value;
    const meetId = document.getElementById('assignment-meet').value;
    const positionId = document.getElementById('assignment-position').value;
    
    // Check if assignment already exists
    const existingAssignment = appData.assignments.find(a => 
        a.volunteerId === volunteerId && a.meetId === meetId && a.positionId === positionId
    );
    
    if (existingAssignment) {
        showNotification('This volunteer is already assigned to this position for this meet.', 'error');
        return;
    }
    
    const assignment = {
        id: generateId(),
        volunteerId,
        meetId,
        positionId,
        createdAt: new Date().toISOString()
    };
    
    appData.assignments.push(assignment);
    saveData();
    updateAllViews();
    hideAssignmentModal();
    showNotification('Volunteer assigned successfully!', 'success');
}

function renderVolunteers() {
    const container = document.getElementById('volunteers-list');
    if (!container) return;
    
    if (appData.volunteers.length === 0) {
        container.innerHTML = '<p class="no-data">No volunteers registered. Click "Add New Volunteer" to get started.</p>';
        return;
    }
    
    container.innerHTML = appData.volunteers.map(volunteer => {
        const assignments = appData.assignments.filter(a => a.volunteerId === volunteer.id);
        return `
            <div class="volunteer-item">
                <div class="volunteer-item-header">
                    <div>
                        <h3 class="volunteer-item-name">${volunteer.firstName} ${volunteer.lastName}</h3>
                        <p class="volunteer-item-email">${volunteer.email}</p>
                        ${volunteer.phone ? `<p class="volunteer-item-phone">${volunteer.phone}</p>` : ''}
                        <p class="volunteer-assignments">${assignments.length} assignment(s)</p>
                    </div>
                    <div class="item-actions">
                        <button class="btn btn--primary btn--sm" onclick="showAssignmentModal('${volunteer.id}')">Assign</button>
                        <button class="btn btn--outline btn--sm" onclick="deleteVolunteer('${volunteer.id}')">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// QR Code Management
function generateAllQRCodes() {
    renderQRCodes();
    showNotification('QR codes generated successfully!', 'success');
}

function renderQRCodes() {
    const container = document.getElementById('qr-codes-grid');
    if (!container) return;
    
    if (appData.assignments.length === 0) {
        container.innerHTML = '<p class="no-data">No QR codes generated. Assign volunteers to meets first, then click "Generate QR Codes".</p>';
        return;
    }
    
    container.innerHTML = appData.assignments.map(assignment => {
        const volunteer = appData.volunteers.find(v => v.id === assignment.volunteerId);
        const meet = appData.meets.find(m => m.id === assignment.meetId);
        const position = appData.positions.find(p => p.id === assignment.positionId);
        
        if (!volunteer || !meet || !position) return '';
        
        return `
            <div class="qr-item">
                <div class="qr-code-container">
                    <canvas class="qr-code" id="qr-${assignment.id}"></canvas>
                </div>
                <div class="qr-info">
                    <h4>${volunteer.firstName} ${volunteer.lastName}</h4>
                    <p>${meet.name}</p>
                    <p>${position.name}</p>
                    <p>${formatDate(meet.date)} at ${meet.time}</p>
                </div>
            </div>
        `;
    }).filter(html => html !== '').join('');
    
    // Generate QR codes after DOM update
    setTimeout(() => {
        appData.assignments.forEach(assignment => {
            const canvas = document.getElementById(`qr-${assignment.id}`);
            if (canvas && typeof QRCode !== 'undefined') {
                const qrData = {
                    assignmentId: assignment.id,
                    volunteerId: assignment.volunteerId,
                    meetId: assignment.meetId, 
                    positionId: assignment.positionId,
                    timestamp: new Date().toISOString()
                };
                
                QRCode.toCanvas(canvas, JSON.stringify(qrData), {
                    width: 150,
                    margin: 1,
                    color: {
                        dark: '#134252',
                        light: '#FFFFFF'
                    }
                }).catch(err => console.error('QR Code generation error:', err));
            }
        });
    }, 100);
}

function printQRCodes() {
    window.print();
}

// QR Scanner
function initializeScanner() {
    const startBtn = document.getElementById('start-scan');
    const stopBtn = document.getElementById('stop-scan');
    
    if (startBtn && !startBtn.hasAttribute('data-listener-added')) {
        startBtn.addEventListener('click', startScanner);
        startBtn.setAttribute('data-listener-added', 'true');
    }
    
    if (stopBtn && !stopBtn.hasAttribute('data-listener-added')) {
        stopBtn.addEventListener('click', stopScanner);
        stopBtn.setAttribute('data-listener-added', 'true');
    }
}

function startScanner() {
    if (scannerActive || typeof Html5Qrcode === 'undefined') {
        if (typeof Html5Qrcode === 'undefined') {
            showNotification('QR Scanner library not loaded', 'error');
        }
        return;
    }
    
    qrScanner = new Html5Qrcode("qr-reader");
    
    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 }
    };
    
    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            const cameraId = devices[0].id;
            
            qrScanner.start(cameraId, config, (decodedText, decodedResult) => {
                processQRScan(decodedText);
            })
            .then(() => {
                scannerActive = true;
                document.getElementById('start-scan').style.display = 'none';
                document.getElementById('stop-scan').style.display = 'inline-block';
            })
            .catch(err => {
                console.error('Error starting scanner:', err);
                showNotification('Error starting camera. Please check permissions.', 'error');
            });
        } else {
            showNotification('No cameras found on this device.', 'error');
        }
    }).catch(err => {
        console.error('Error getting cameras:', err);
        showNotification('Error accessing cameras.', 'error');
    });
}

function stopScanner() {
    if (qrScanner && scannerActive) {
        qrScanner.stop().then(() => {
            scannerActive = false;
            document.getElementById('start-scan').style.display = 'inline-block';
            document.getElementById('stop-scan').style.display = 'none';
        }).catch(err => {
            console.error('Error stopping scanner:', err);
        });
    }
}

function resetScanner() {
    document.getElementById('scan-result').classList.add('hidden');
    if (!scannerActive) {
        startScanner();
    }
}

function processQRScan(qrData) {
    try {
        const data = JSON.parse(qrData);
        
        // Validate QR data structure
        if (!data.assignmentId || !data.volunteerId || !data.meetId || !data.positionId) {
            throw new Error('Invalid QR code format');
        }
        
        // Find assignment
        const assignment = appData.assignments.find(a => a.id === data.assignmentId);
        if (!assignment) {
            throw new Error('Assignment not found');
        }
        
        // Check if already checked in
        const existingCheckIn = appData.checkIns.find(c => c.assignmentId === data.assignmentId);
        if (existingCheckIn) {
            throw new Error('Already checked in');
        }
        
        // Get volunteer, meet, and position info
        const volunteer = appData.volunteers.find(v => v.id === data.volunteerId);
        const meet = appData.meets.find(m => m.id === data.meetId);
        const position = appData.positions.find(p => p.id === data.positionId);
        
        // Create check-in record
        const checkIn = {
            id: generateId(),
            assignmentId: data.assignmentId,
            volunteerId: data.volunteerId,
            meetId: data.meetId,
            positionId: data.positionId,
            checkedInAt: new Date().toISOString()
        };
        
        appData.checkIns.push(checkIn);
        saveData();
        updateDashboard();
        
        // Stop scanner and show result
        stopScanner();
        
        document.getElementById('scan-details').innerHTML = `
            <p><strong>Volunteer:</strong> ${volunteer.firstName} ${volunteer.lastName}</p>
            <p><strong>Meet:</strong> ${meet.name}</p>
            <p><strong>Position:</strong> ${position.name}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        `;
        
        document.getElementById('scan-result').classList.remove('hidden');
        showNotification('Check-in successful!', 'success');
        
    } catch (error) {
        showNotification(`Scan Error: ${error.message}`, 'error');
    }
}

// Portal Management
function showAddPersonForm() {
    console.log('Showing add person form...');
    const form = document.getElementById('add-person-form');
    if (form) {
        form.classList.remove('hidden');
    }
}

function hideAddPersonForm() {
    const form = document.getElementById('add-person-form');
    if (form) {
        form.classList.add('hidden');
    }
    const personForm = document.getElementById('person-form');
    if (personForm) {
        personForm.reset();
    }
}

function addPerson() {
    const person = {
        id: generateId(),
        firstName: document.getElementById('person-first-name').value,
        lastName: document.getElementById('person-last-name').value,
        email: document.getElementById('person-email').value,
        createdAt: new Date().toISOString()
    };
    
    appData.portalPeople.push(person);
    saveData();
    renderPortalPeople();
    hideAddPersonForm();
    showNotification('Person added successfully!', 'success');
}

function deletePerson(personId) {
    if (confirm('Are you sure you want to delete this person?')) {
        appData.portalPeople = appData.portalPeople.filter(person => person.id !== personId);
        saveData();
        renderPortalPeople();
        showNotification('Person deleted successfully!', 'success');
    }
}

function renderPortalPeople() {
    const container = document.getElementById('portal-people-list');
    if (!container) return;
    
    if (appData.portalPeople.length === 0) {
        container.innerHTML = '<p class="no-data">No people added. Click "Add Person" to get started.</p>';
        return;
    }
    
    container.innerHTML = appData.portalPeople.map(person => `
        <div class="person-item">
            <div class="person-item-header">
                <div>
                    <h3 class="person-item-name">${person.firstName} ${person.lastName}</h3>
                    <p class="person-item-email">${person.email}</p>
                </div>
                <div class="item-actions">
                    <button class="btn btn--outline btn--sm" onclick="deletePerson('${person.id}')">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderPortalAssignments() {
    const container = document.getElementById('portal-assignments');
    if (!container) return;
    
    if (appData.assignments.length === 0) {
        container.innerHTML = '<p class="no-data">No assignments found.</p>';
        return;
    }
    
    // For now, show all assignments - in a real app, this would be filtered by user
    const assignmentHtml = appData.assignments.map(assignment => {
        const volunteer = appData.volunteers.find(v => v.id === assignment.volunteerId);
        const meet = appData.meets.find(m => m.id === assignment.meetId);
        const position = appData.positions.find(p => p.id === assignment.positionId);
        const checkIn = appData.checkIns.find(c => c.assignmentId === assignment.id);
        
        if (!volunteer || !meet || !position) return '';
        
        return `
            <div class="assignment-item card">
                <div class="card__body">
                    <h4>${volunteer.firstName} ${volunteer.lastName}</h4>
                    <p><strong>Meet:</strong> ${meet.name}</p>
                    <p><strong>Position:</strong> ${position.name}</p>
                    <p><strong>Date:</strong> ${formatDate(meet.date)} at ${meet.time}</p>
                    <p><strong>Status:</strong> ${checkIn ? 
                        `<span class="status status--success">Checked In</span>` : 
                        `<span class="status status--info">Not Checked In</span>`
                    }</p>
                </div>
            </div>
        `;
    }).filter(html => html !== '').join('');
    
    container.innerHTML = assignmentHtml || '<p class="no-data">No assignments found.</p>';
}

// Dashboard Updates
function updateDashboard() {
    const totalVolunteersEl = document.getElementById('total-volunteers');
    const upcomingMeetsEl = document.getElementById('upcoming-meets');
    const positionsFilledEl = document.getElementById('positions-filled');
    const totalCheckinsEl = document.getElementById('total-checkins');
    
    if (totalVolunteersEl) totalVolunteersEl.textContent = appData.volunteers.length;
    if (upcomingMeetsEl) upcomingMeetsEl.textContent = appData.meets.length;
    
    if (positionsFilledEl) {
        const totalPositionsNeeded = appData.meets.length * appData.positions.reduce((sum, pos) => sum + pos.needed, 0);
        const totalAssignments = appData.assignments.length;
        positionsFilledEl.textContent = `${totalAssignments}/${totalPositionsNeeded}`;
    }
    
    if (totalCheckinsEl) totalCheckinsEl.textContent = appData.checkIns.length;
    
    updateActivityFeed();
}

function updateActivityFeed() {
    const container = document.getElementById('activity-list');
    if (!container) return;
    
    const activities = [];
    
    // Add recent check-ins
    appData.checkIns.slice(-5).reverse().forEach(checkIn => {
        const volunteer = appData.volunteers.find(v => v.id === checkIn.volunteerId);
        if (volunteer) {
            activities.push({
                text: `${volunteer.firstName} ${volunteer.lastName} checked in`,
                time: checkIn.checkedInAt,
                type: 'checkin'
            });
        }
    });
    
    // Add recent assignments
    appData.assignments.slice(-3).reverse().forEach(assignment => {
        const volunteer = appData.volunteers.find(v => v.id === assignment.volunteerId);
        const meet = appData.meets.find(m => m.id === assignment.meetId);
        if (volunteer && meet) {
            activities.push({
                text: `${volunteer.firstName} ${volunteer.lastName} assigned to ${meet.name}`,
                time: assignment.createdAt,
                type: 'assignment'
            });
        }
    });
    
    if (activities.length === 0) {
        container.innerHTML = '<p class="no-data">No recent activity</p>';
        return;
    }
    
    // Sort by time and take most recent
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    container.innerHTML = activities.slice(0, 5).map(activity => `
        <div class="activity-item">
            <p>${activity.text}</p>
            <small>${formatDateTime(activity.time)}</small>
        </div>
    `).join('');
}

function updateAllViews() {
    updateDashboard();
    renderMeets();
    renderVolunteers();
    renderQRCodes();
    renderPortalPeople();
    renderPortalAssignments();
}

// Data Export
function exportData() {
    const csvData = [];
    
    // Headers
    csvData.push(['Type', 'Name', 'Email', 'Meet', 'Position', 'Date', 'Status']);
    
    // Add volunteer data
    appData.assignments.forEach(assignment => {
        const volunteer = appData.volunteers.find(v => v.id === assignment.volunteerId);
        const meet = appData.meets.find(m => m.id === assignment.meetId);
        const position = appData.positions.find(p => p.id === assignment.positionId);
        const checkIn = appData.checkIns.find(c => c.assignmentId === assignment.id);
        
        if (volunteer && meet && position) {
            csvData.push([
                'Assignment',
                `${volunteer.firstName} ${volunteer.lastName}`,
                volunteer.email,
                meet.name,
                position.name,
                meet.date,
                checkIn ? 'Checked In' : 'Not Checked In'
            ]);
        }
    });
    
    // Convert to CSV string
    const csvString = csvData.map(row => 
        row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
    
    // Download file
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hoa-volunteer-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully!', 'success');
}

// Utility Functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

function formatDateTime(dateString) {
    return new Date(dateString).toLocaleString();
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification status status--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 12px 16px;
        border-radius: 8px;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Make functions globally available for onclick handlers
window.showSection = showSection;
window.showAddMeetForm = showAddMeetForm;
window.hideAddMeetForm = hideAddMeetForm;
window.showAddVolunteerForm = showAddVolunteerForm;
window.hideAddVolunteerForm = hideAddVolunteerForm;
window.showAddPersonForm = showAddPersonForm;
window.hideAddPersonForm = hideAddPersonForm;
window.showAssignmentModal = showAssignmentModal;
window.hideAssignmentModal = hideAssignmentModal;
window.deleteMeet = deleteMeet;
window.deleteVolunteer = deleteVolunteer;
window.deletePerson = deletePerson;
window.viewMeetPositions = viewMeetPositions;
window.generateAllQRCodes = generateAllQRCodes;
window.printQRCodes = printQRCodes;
window.resetScanner = resetScanner;
window.exportData = exportData;