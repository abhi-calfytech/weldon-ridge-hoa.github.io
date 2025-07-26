// Application Data
const appData = {
  "meets": [
    {
      "id": "meet001",
      "name": "Valley Swim Club vs Riverside Dolphins",
      "date": "2025-07-30",
      "time": "18:00",
      "location": "Valley Community Pool",
      "status": "upcoming",
      "volunteersNeeded": 20,
      "volunteersAssigned": 18,
      "volunteersCheckedIn": 3
    },
    {
      "id": "meet002", 
      "name": "Championship Preliminaries",
      "date": "2025-08-02",
      "time": "17:30",
      "location": "Aquatic Center",
      "status": "upcoming",
      "volunteersNeeded": 25,
      "volunteersAssigned": 22,
      "volunteersCheckedIn": 0
    },
    {
      "id": "meet003",
      "name": "End of Season Championship",
      "date": "2025-08-05",
      "time": "16:00", 
      "location": "Regional Aquatic Center",
      "status": "upcoming",
      "volunteersNeeded": 30,
      "volunteersAssigned": 28,
      "volunteersCheckedIn": 0
    }
  ],
  "volunteers": [
    {
      "id": "vol001",
      "name": "Sarah Johnson",
      "email": "sarah.johnson@email.com",
      "phone": "(555) 123-4567",
      "totalHours": 45,
      "experience": "experienced",
      "preferences": ["Timer", "Concessions"]
    },
    {
      "id": "vol002",
      "name": "Mike Chen",
      "email": "mike.chen@email.com", 
      "phone": "(555) 234-5678",
      "totalHours": 28,
      "experience": "intermediate",
      "preferences": ["Computer Operator", "Announcer"]
    },
    {
      "id": "vol003",
      "name": "Lisa Rodriguez",
      "email": "lisa.rodriguez@email.com",
      "phone": "(555) 345-6789", 
      "totalHours": 62,
      "experience": "experienced",
      "preferences": ["Head Timer", "Clerk of Course"]
    },
    {
      "id": "vol004",
      "name": "David Wilson",
      "email": "david.wilson@email.com",
      "phone": "(555) 456-7890",
      "totalHours": 15,
      "experience": "beginner",
      "preferences": ["Set Up Crew", "Clean Up Crew"]
    },
    {
      "id": "vol005",
      "name": "Emma Thompson",
      "email": "emma.thompson@email.com",
      "phone": "(555) 567-8901",
      "totalHours": 38,
      "experience": "intermediate", 
      "preferences": ["Concessions", "Awards/Ribbons"]
    },
    {
      "id": "vol006",
      "name": "James Brown",
      "email": "james.brown@email.com",
      "phone": "(555) 678-9012",
      "totalHours": 55,
      "experience": "experienced",
      "preferences": ["Timer", "Head Timer"]
    },
    {
      "id": "vol007",
      "name": "Amanda Davis",
      "email": "amanda.davis@email.com",
      "phone": "(555) 789-0123",
      "totalHours": 22,
      "experience": "intermediate",
      "preferences": ["Clerk of Course", "Awards/Ribbons"]
    },
    {
      "id": "vol008",
      "name": "Robert Martinez",
      "email": "robert.martinez@email.com",
      "phone": "(555) 890-1234",
      "totalHours": 41,
      "experience": "experienced",
      "preferences": ["Announcer", "Computer Operator"]
    }
  ],
  "roles": [
    {
      "id": "role001",
      "name": "Timer",
      "description": "Use stopwatch to time races and record results for assigned lane",
      "needed": 6,
      "experienceRequired": "beginner"
    },
    {
      "id": "role002", 
      "name": "Head Timer",
      "description": "Supervise timers and maintain backup stopwatches for all events",
      "needed": 1,
      "experienceRequired": "experienced"
    },
    {
      "id": "role003",
      "name": "Concessions",
      "description": "Serve food and beverages to meet attendees",
      "needed": 4, 
      "experienceRequired": "beginner"
    },
    {
      "id": "role004",
      "name": "Clerk of Course",
      "description": "Check in swimmers and organize them for their events",
      "needed": 2,
      "experienceRequired": "intermediate"
    },
    {
      "id": "role005",
      "name": "Announcer", 
      "description": "Announce events and provide meet updates over PA system",
      "needed": 1,
      "experienceRequired": "experienced"
    },
    {
      "id": "role006",
      "name": "Computer Operator",
      "description": "Operate meet management software and input results",
      "needed": 1,
      "experienceRequired": "intermediate"
    },
    {
      "id": "role007",
      "name": "Set Up Crew",
      "description": "Arrive early to set up lane lines, timing equipment, and facilities",
      "needed": 3,
      "experienceRequired": "beginner"
    },
    {
      "id": "role008",
      "name": "Clean Up Crew", 
      "description": "Stay after meet to clean and pack up equipment",
      "needed": 3,
      "experienceRequired": "beginner"
    },
    {
      "id": "role009",
      "name": "Awards/Ribbons",
      "description": "Organize and distribute ribbons and awards to swimmers",
      "needed": 2,
      "experienceRequired": "beginner"
    }
  ],
  "assignments": [
    {
      "id": "assign001",
      "volunteerId": "vol001",
      "meetId": "meet001", 
      "roleId": "role001",
      "qrCode": "QR_vol001_meet001_role001_12345",
      "status": "checked-in",
      "checkInTime": "2025-07-30T17:45:00Z"
    },
    {
      "id": "assign002",
      "volunteerId": "vol002",
      "meetId": "meet001",
      "roleId": "role006", 
      "qrCode": "QR_vol002_meet001_role006_12346",
      "status": "assigned",
      "checkInTime": null
    },
    {
      "id": "assign003",
      "volunteerId": "vol003",
      "meetId": "meet001",
      "roleId": "role002",
      "qrCode": "QR_vol003_meet001_role002_12347", 
      "status": "checked-in",
      "checkInTime": "2025-07-30T17:30:00Z"
    },
    {
      "id": "assign004",
      "volunteerId": "vol004",
      "meetId": "meet001",
      "roleId": "role007",
      "qrCode": "QR_vol004_meet001_role007_12348",
      "status": "checked-in",
      "checkInTime": "2025-07-30T16:15:00Z"
    },
    {
      "id": "assign005",
      "volunteerId": "vol005",
      "meetId": "meet001",
      "roleId": "role003", 
      "qrCode": "QR_vol005_meet001_role003_12349",
      "status": "assigned",
      "checkInTime": null
    },
    {
      "id": "assign006",
      "volunteerId": "vol006",
      "meetId": "meet002",
      "roleId": "role002",
      "qrCode": "QR_vol006_meet002_role002_12350",
      "status": "assigned",
      "checkInTime": null
    },
    {
      "id": "assign007",
      "volunteerId": "vol007",
      "meetId": "meet002",
      "roleId": "role004",
      "qrCode": "QR_vol007_meet002_role004_12351",
      "status": "assigned",
      "checkInTime": null
    },
    {
      "id": "assign008",
      "volunteerId": "vol008",
      "meetId": "meet003",
      "roleId": "role005",
      "qrCode": "QR_vol008_meet003_role005_12352",
      "status": "assigned",
      "checkInTime": null
    }
  ]
};

// Global variables
let qrScanner = null;
let currentPendingCheckIn = null;
let activityFeed = [];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    updateDashboard();
    renderMeets();
    renderVolunteers();
    setupVolunteerPortal();
    initializeActivityFeed();
    setupEventListeners();
});

// Navigation System
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = btn.dataset.section;
            
            // Update active nav button
            navButtons.forEach(navBtn => navBtn.classList.remove('active'));
            btn.classList.add('active');
            
            // Show target section
            sections.forEach(section => section.classList.remove('active'));
            const target = document.getElementById(targetSection);
            if (target) {
                target.classList.add('active');
            }
            
            // Initialize section-specific functionality
            if (targetSection === 'qr-scanner') {
                initializeQRScanner();
            } else if (targetSection === 'volunteer-portal') {
                updateVolunteerPortal();
            }
        });
    });
}

// Dashboard Functions
function updateDashboard() {
    const totalVolunteers = appData.volunteers.length;
    const checkedInToday = appData.assignments.filter(a => a.status === 'checked-in').length;
    const upcomingMeets = appData.meets.filter(m => m.status === 'upcoming').length;
    const totalHours = appData.volunteers.reduce((sum, v) => sum + v.totalHours, 0);
    
    document.getElementById('total-volunteers').textContent = totalVolunteers;
    document.getElementById('checked-in-today').textContent = checkedInToday;
    document.getElementById('upcoming-meets').textContent = upcomingMeets;
    document.getElementById('total-hours').textContent = totalHours;
    
    updateCheckInStatus();
    updateActivityFeed();
}

function updateCheckInStatus() {
    const container = document.getElementById('checkin-status-list');
    const todayAssignments = appData.assignments.filter(a => {
        const meet = appData.meets.find(m => m.id === a.meetId);
        return meet && meet.date === '2025-07-30'; // Today's assignments
    });
    
    if (todayAssignments.length === 0) {
        container.innerHTML = '<p class="text-center">No volunteer assignments for today.</p>';
        return;
    }
    
    container.innerHTML = todayAssignments.map(assignment => {
        const volunteer = appData.volunteers.find(v => v.id === assignment.volunteerId);
        const role = appData.roles.find(r => r.id === assignment.roleId);
        const meet = appData.meets.find(m => m.id === assignment.meetId);
        
        return `
            <div class="checkin-item">
                <div class="checkin-volunteer">
                    <div class="checkin-volunteer-name">${volunteer.name}</div>
                    <div class="checkin-volunteer-role">${role.name} - ${meet.name}</div>
                </div>
                <div class="status-indicator status-${assignment.status.replace('-', '')}">
                    <div class="status-dot"></div>
                    ${assignment.status === 'checked-in' ? 'Checked In' : 'Not Checked In'}
                </div>
            </div>
        `;
    }).join('');
}

function refreshCheckInStatus() {
    updateCheckInStatus();
    showToast('success', 'Status Updated', 'Check-in status refreshed successfully');
}

// QR Scanner Functions
function initializeQRScanner() {
    const startBtn = document.getElementById('start-scanner');
    const stopBtn = document.getElementById('stop-scanner');
    const statusEl = document.getElementById('scanner-status');
    
    startBtn.addEventListener('click', startScanning);
    stopBtn.addEventListener('click', stopScanning);
}

function startScanning() {
    const qrReaderEl = document.getElementById('qr-reader');
    const startBtn = document.getElementById('start-scanner');
    const stopBtn = document.getElementById('stop-scanner');
    const statusEl = document.getElementById('scanner-status');
    
    qrScanner = new Html5Qrcode("qr-reader");
    
    const config = {
        fps: 10,
        qrbox: { width: 200, height: 200 },
        aspectRatio: 1.0
    };
    
    qrScanner.start(
        { facingMode: "environment" },
        config,
        (decodedText, decodedResult) => {
            onQRCodeScanned(decodedText);
        },
        (errorMessage) => {
            // Handle scan errors silently
        }
    ).then(() => {
        startBtn.classList.add('hidden');
        stopBtn.classList.remove('hidden');
        statusEl.textContent = 'Scanning...';
        statusEl.className = 'scanner-status text-success';
    }).catch(err => {
        console.error('Failed to start scanner:', err);
        statusEl.textContent = 'Camera access denied';
        statusEl.className = 'scanner-status text-error';
        showToast('error', 'Scanner Error', 'Failed to access camera. Please allow camera permissions.');
    });
}

function stopScanning() {
    if (qrScanner) {
        qrScanner.stop().then(() => {
            const startBtn = document.getElementById('start-scanner');
            const stopBtn = document.getElementById('stop-scanner');
            const statusEl = document.getElementById('scanner-status');
            
            startBtn.classList.remove('hidden');
            stopBtn.classList.add('hidden');
            statusEl.textContent = 'Ready to scan';
            statusEl.className = 'scanner-status';
        });
    }
}

function onQRCodeScanned(qrCodeText) {
    // Find assignment by QR code
    const assignment = appData.assignments.find(a => a.qrCode === qrCodeText);
    
    if (!assignment) {
        showToast('error', 'Invalid QR Code', 'This QR code is not recognized in the system.');
        return;
    }
    
    const volunteer = appData.volunteers.find(v => v.id === assignment.volunteerId);
    const role = appData.roles.find(r => r.id === assignment.roleId);
    const meet = appData.meets.find(m => m.id === assignment.meetId);
    
    if (assignment.status === 'checked-in') {
        showToast('warning', 'Already Checked In', `${volunteer.name} is already checked in for this assignment.`);
        return;
    }
    
    // Stop scanning and show confirmation
    stopScanning();
    showCheckInConfirmation(assignment, volunteer, role, meet);
}

function showCheckInConfirmation(assignment, volunteer, role, meet) {
    currentPendingCheckIn = assignment;
    
    const confirmationPanel = document.getElementById('confirmation-panel');
    const volunteerDetails = document.getElementById('volunteer-details');
    
    volunteerDetails.innerHTML = `
        <div class="volunteer-confirmation">
            <h4>✓ QR Code Verified</h4>
            <div class="confirmation-details">
                <p><strong>Volunteer:</strong> ${volunteer.name}</p>
                <p><strong>Role:</strong> ${role.name}</p>
                <p><strong>Meet:</strong> ${meet.name}</p>
                <p><strong>Date:</strong> ${formatDate(meet.date)} at ${meet.time}</p>
                <p><strong>Location:</strong> ${meet.location}</p>
            </div>
            <div class="role-instructions">
                <h5>Role Instructions:</h5>
                <p>${role.description}</p>
            </div>
        </div>
    `;
    
    confirmationPanel.classList.remove('hidden');
}

function confirmCheckIn() {
    if (!currentPendingCheckIn) return;
    
    // Update assignment status
    currentPendingCheckIn.status = 'checked-in';
    currentPendingCheckIn.checkInTime = new Date().toISOString();
    
    const volunteer = appData.volunteers.find(v => v.id === currentPendingCheckIn.volunteerId);
    const role = appData.roles.find(r => r.id === currentPendingCheckIn.roleId);
    
    // Add to activity feed
    addToActivityFeed({
        icon: '✅',
        title: `${volunteer.name} checked in`,
        description: `${role.name} assignment confirmed`,
        time: new Date()
    });
    
    // Update dashboard
    updateDashboard();
    
    // Show success message
    showToast('success', 'Check-In Successful', `${volunteer.name} has been checked in for ${role.name}`);
    
    // Hide confirmation panel
    cancelCheckIn();
}

function cancelCheckIn() {
    currentPendingCheckIn = null;
    document.getElementById('confirmation-panel').classList.add('hidden');
}

// QR Code Generation
function showQRGenerationModal() {
    const modal = document.getElementById('qr-generation-modal');
    const meetSelect = document.getElementById('qr-meet-select');
    
    // Populate meet options
    meetSelect.innerHTML = '<option value="">Choose a meet</option>' +
        appData.meets.map(meet => 
            `<option value="${meet.id}">${meet.name} - ${formatDate(meet.date)}</option>`
        ).join('');
    
    modal.classList.remove('hidden');
}

function generateAllQRCodes() {
    const meetId = document.getElementById('qr-meet-select').value;
    if (!meetId) {
        showToast('warning', 'Select Meet', 'Please select a meet first.');
        return;
    }
    
    const meetAssignments = appData.assignments.filter(a => a.meetId === meetId);
    const resultsContainer = document.getElementById('qr-generation-results');
    
    if (meetAssignments.length === 0) {
        resultsContainer.innerHTML = '<p>No volunteer assignments found for this meet.</p>';
        return;
    }
    
    resultsContainer.innerHTML = `
        <h4>Generated QR Codes</h4>
        <div class="qr-codes-list">
            ${meetAssignments.map(assignment => {
                const volunteer = appData.volunteers.find(v => v.id === assignment.volunteerId);
                const role = appData.roles.find(r => r.id === assignment.roleId);
                
                return `
                    <div class="qr-result-item">
                        <div class="qr-result-info">
                            <div class="qr-result-name">${volunteer.name}</div>
                            <div class="qr-result-details">${role.name}</div>
                        </div>
                        <div class="qr-actions">
                            <button class="btn btn--sm btn--secondary" onclick="showQRCode('${assignment.id}')">
                                📱 View QR
                            </button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function showQRCode(assignmentId) {
    const assignment = appData.assignments.find(a => a.id === assignmentId);
    const volunteer = appData.volunteers.find(v => v.id === assignment.volunteerId);
    const role = appData.roles.find(r => r.id === assignment.roleId);
    const meet = appData.meets.find(m => m.id === assignment.meetId);
    
    const modal = document.getElementById('qr-display-modal');
    const content = document.getElementById('qr-display-content');
    
    content.innerHTML = `
        <div class="qr-code-display">
            <div class="qr-code-info text-center">
                <h4>${volunteer.name}</h4>
                <p><strong>${role.name}</strong></p>
                <p>${meet.name}</p>
                <p>${formatDate(meet.date)} at ${meet.time}</p>
            </div>
            <div class="qr-code-canvas">
                <canvas id="qr-canvas-${assignmentId}"></canvas>
            </div>
            <div class="qr-code-text text-center">
                <p><small>QR Code: ${assignment.qrCode}</small></p>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    
    // Generate QR code using a simple text-to-canvas approach
    setTimeout(() => {
        generateQRCodeCanvas(`qr-canvas-${assignmentId}`, assignment.qrCode);
    }, 100);
}

function generateQRCodeCanvas(canvasId, text) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    
    // Simple QR code representation (placeholder)
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 200, 200);
    
    ctx.fillStyle = '#000';
    ctx.font = '12px monospace';
    
    // Create a simple pattern to represent QR code
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            if (Math.random() > 0.5) {
                ctx.fillRect(i * 10, j * 10, 10, 10);
            }
        }
    }
    
    // Add corner squares (typical QR code pattern)
    ctx.fillRect(0, 0, 60, 60);
    ctx.fillRect(140, 0, 60, 60);
    ctx.fillRect(0, 140, 60, 60);
    
    ctx.fillStyle = '#fff';
    ctx.fillRect(10, 10, 40, 40);
    ctx.fillRect(150, 10, 40, 40);
    ctx.fillRect(10, 150, 40, 40);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(20, 20, 20, 20);
    ctx.fillRect(160, 20, 20, 20);
    ctx.fillRect(20, 160, 20, 20);
}

function printQRCode() {
    window.print();
}

function emailQRCode() {
    showToast('info', 'Email Feature', 'Email functionality would be implemented with backend integration.');
}

// Volunteer Portal Functions
function setupVolunteerPortal() {
    const volunteerSelector = document.getElementById('volunteer-selector');
    
    volunteerSelector.innerHTML = '<option value="">Select your name</option>' +
        appData.volunteers.map(volunteer => 
            `<option value="${volunteer.id}">${volunteer.name}</option>`
        ).join('');
    
    volunteerSelector.addEventListener('change', (e) => {
        const volunteerId = e.target.value;
        if (volunteerId) {
            showVolunteerInfo(volunteerId);
        } else {
            document.getElementById('volunteer-info').classList.add('hidden');
        }
    });
}

function showVolunteerInfo(volunteerId) {
    const volunteer = appData.volunteers.find(v => v.id === volunteerId);
    const volunteerAssignments = appData.assignments.filter(a => a.volunteerId === volunteerId);
    
    // Show volunteer info section
    document.getElementById('volunteer-info').classList.remove('hidden');
    
    // Update profile
    const profileDetails = document.getElementById('volunteer-profile-details');
    profileDetails.innerHTML = `
        <div class="volunteer-stats">
            <p><strong>Experience:</strong> ${volunteer.experience.charAt(0).toUpperCase() + volunteer.experience.slice(1)}</p>
            <p><strong>Total Hours:</strong> ${volunteer.totalHours} hours</p>
            <p><strong>Email:</strong> ${volunteer.email}</p>
            <p><strong>Phone:</strong> ${volunteer.phone}</p>
            <p><strong>Preferences:</strong> ${volunteer.preferences.join(', ')}</p>
        </div>
    `;
    
    // Update assignments
    const assignmentsContainer = document.getElementById('volunteer-assignments');
    if (volunteerAssignments.length === 0) {
        assignmentsContainer.innerHTML = '<p>No current assignments.</p>';
    } else {
        assignmentsContainer.innerHTML = volunteerAssignments.map(assignment => {
            const meet = appData.meets.find(m => m.id === assignment.meetId);
            const role = appData.roles.find(r => r.id === assignment.roleId);
            
            return `
                <div class="assignment-item">
                    <div class="assignment-header">
                        <h5>${meet.name}</h5>
                        <div class="status-indicator status-${assignment.status.replace('-', '')}">
                            <div class="status-dot"></div>
                            ${assignment.status.replace('-', ' ').toUpperCase()}
                        </div>
                    </div>
                    <p><strong>Role:</strong> ${role.name}</p>
                    <p><strong>Date:</strong> ${formatDate(meet.date)} at ${meet.time}</p>
                    <p><strong>Location:</strong> ${meet.location}</p>
                    ${assignment.checkInTime ? 
                        `<p><strong>Checked in:</strong> ${formatDateTime(assignment.checkInTime)}</p>` : 
                        '<p class="text-warning">Not checked in yet</p>'
                    }
                </div>
            `;
        }).join('');
    }
    
    // Update QR codes
    const qrCodesContainer = document.getElementById('volunteer-qr-codes');
    qrCodesContainer.innerHTML = volunteerAssignments.map(assignment => {
        const meet = appData.meets.find(m => m.id === assignment.meetId);
        const role = appData.roles.find(r => r.id === assignment.roleId);
        
        return `
            <div class="qr-code-item">
                <div class="qr-code-info">
                    <div class="qr-code-title">${meet.name}</div>
                    <div class="qr-code-details">${role.name} - ${formatDate(meet.date)}</div>
                </div>
                <button class="btn btn--sm btn--primary" onclick="showQRCode('${assignment.id}')">
                    View QR
                </button>
            </div>
        `;
    }).join('');
    
    // Update history
    const historyContainer = document.getElementById('volunteer-history');
    const checkedInAssignments = volunteerAssignments.filter(a => a.status === 'checked-in');
    
    if (checkedInAssignments.length === 0) {
        historyContainer.innerHTML = '<p>No check-in history yet.</p>';
    } else {
        historyContainer.innerHTML = checkedInAssignments.map(assignment => {
            const meet = appData.meets.find(m => m.id === assignment.meetId);
            const role = appData.roles.find(r => r.id === assignment.roleId);
            
            return `
                <div class="history-item">
                    <div class="activity-item">
                        <div class="activity-icon">✅</div>
                        <div class="activity-content">
                            <div class="activity-title">${meet.name} - ${role.name}</div>
                            <div class="activity-time">${formatDateTime(assignment.checkInTime)}</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function updateVolunteerPortal() {
    const selectedVolunteerId = document.getElementById('volunteer-selector').value;
    if (selectedVolunteerId) {
        showVolunteerInfo(selectedVolunteerId);
    }
}

// Meet Management
function renderMeets() {
    const container = document.getElementById('meets-grid');
    
    container.innerHTML = appData.meets.map(meet => {
        const meetAssignments = appData.assignments.filter(a => a.meetId === meet.id);
        const checkedIn = meetAssignments.filter(a => a.status === 'checked-in').length;
        
        return `
            <div class="meet-card">
                <div class="meet-header">
                    <div class="meet-date">${formatDate(meet.date)}</div>
                    <button class="btn btn--sm btn--secondary" onclick="generateMeetQRCodes('${meet.id}')">
                        📱 QR Codes
                    </button>
                </div>
                <h3 class="meet-title">${meet.name}</h3>
                <div class="meet-details">
                    <p><strong>Time:</strong> ${meet.time}</p>
                    <p><strong>Location:</strong> ${meet.location}</p>
                </div>
                <div class="meet-stats">
                    <div class="meet-stat">
                        <div class="meet-stat-number">${checkedIn}</div>
                        <div class="meet-stat-label">Checked In</div>
                    </div>
                    <div class="meet-stat">
                        <div class="meet-stat-number">${meetAssignments.length}</div>
                        <div class="meet-stat-label">Assigned</div>
                    </div>
                    <div class="meet-stat">
                        <div class="meet-stat-number">${meet.volunteersNeeded}</div>
                        <div class="meet-stat-label">Needed</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function generateMeetQRCodes(meetId) {
    document.getElementById('qr-meet-select').value = meetId;
    showQRGenerationModal();
    generateAllQRCodes();
}

// Volunteer Management
function renderVolunteers() {
    const container = document.getElementById('volunteers-grid');
    
    container.innerHTML = appData.volunteers.map(volunteer => {
        const volunteerAssignments = appData.assignments.filter(a => a.volunteerId === volunteer.id);
        const checkedInCount = volunteerAssignments.filter(a => a.status === 'checked-in').length;
        
        return `
            <div class="volunteer-card">
                <div class="volunteer-header">
                    <div>
                        <h3 class="volunteer-name">${volunteer.name}</h3>
                        <p>${volunteer.email}</p>
                    </div>
                    <div class="experience-badge experience-${volunteer.experience}">
                        ${volunteer.experience.charAt(0).toUpperCase() + volunteer.experience.slice(1)}
                    </div>
                </div>
                <div class="volunteer-stats">
                    <p><strong>Total Hours:</strong> ${volunteer.totalHours}</p>
                    <p><strong>Current Assignments:</strong> ${volunteerAssignments.length}</p>
                    <p><strong>Checked In:</strong> ${checkedInCount}</p>
                    <p><strong>Preferences:</strong> ${volunteer.preferences.join(', ')}</p>
                </div>
                <div class="volunteer-actions">
                    <button class="btn btn--sm btn--primary" onclick="viewVolunteerQRCodes('${volunteer.id}')">
                        View QR Codes
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function viewVolunteerQRCodes(volunteerId) {
    document.getElementById('volunteer-selector').value = volunteerId;
    
    // Switch to volunteer portal
    document.querySelector('.nav-btn[data-section="volunteer-portal"]').click();
    
    // Show volunteer info
    setTimeout(() => {
        showVolunteerInfo(volunteerId);
    }, 100);
}

// Activity Feed
function initializeActivityFeed() {
    // Initialize with recent activity based on checked-in assignments
    const checkedInAssignments = appData.assignments.filter(a => a.status === 'checked-in');
    
    checkedInAssignments.forEach(assignment => {
        const volunteer = appData.volunteers.find(v => v.id === assignment.volunteerId);
        const role = appData.roles.find(r => r.id === assignment.roleId);
        
        addToActivityFeed({
            icon: '✅',
            title: `${volunteer.name} checked in`,
            description: `${role.name} assignment`,
            time: new Date(assignment.checkInTime)
        });
    });
}

function addToActivityFeed(activity) {
    activityFeed.unshift(activity);
    
    // Keep only last 10 activities
    if (activityFeed.length > 10) {
        activityFeed = activityFeed.slice(0, 10);
    }
    
    updateActivityFeed();
}

function updateActivityFeed() {
    const container = document.getElementById('activity-feed');
    
    if (activityFeed.length === 0) {
        container.innerHTML = '<p class="text-center">No recent activity.</p>';
        return;
    }
    
    container.innerHTML = activityFeed.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${formatRelativeTime(activity.time)}</div>
            </div>
        </div>
    `).join('');
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatRelativeTime(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}

function showToast(type, title, message) {
    const container = document.getElementById('toast-container');
    const toastId = 'toast-' + Date.now();
    
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        const toastElement = document.getElementById(toastId);
        if (toastElement) {
            toastElement.remove();
        }
    }, 5000);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Event Listeners
function setupEventListeners() {
    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.add('hidden');
        }
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal:not(.hidden)');
            modals.forEach(modal => modal.classList.add('hidden'));
        }
    });
}

// Mock functions for add/edit functionality
function showAddMeetModal() {
    showToast('info', 'Feature Coming Soon', 'Add meet functionality would be implemented with form handling.');
}

function showAddVolunteerModal() {
    showToast('info', 'Feature Coming Soon', 'Add volunteer functionality would be implemented with form handling.');
}

// Make functions globally available
window.refreshCheckInStatus = refreshCheckInStatus;
window.showQRGenerationModal = showQRGenerationModal;
window.generateAllQRCodes = generateAllQRCodes;
window.showQRCode = showQRCode;
window.printQRCode = printQRCode;
window.emailQRCode = emailQRCode;
window.confirmCheckIn = confirmCheckIn;
window.cancelCheckIn = cancelCheckIn;
window.closeModal = closeModal;
window.generateMeetQRCodes = generateMeetQRCodes;
window.viewVolunteerQRCodes = viewVolunteerQRCodes;
window.showAddMeetModal = showAddMeetModal;
window.showAddVolunteerModal = showAddVolunteerModal;