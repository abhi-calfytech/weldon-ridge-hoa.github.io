// HOA Volunteer Management System JavaScript

// Global variables
let volunteers = [];
let meets = [];
let portalMembers = [];
let checkins = [];
let html5QrCode = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('HOA Volunteer Management System initialized');

    // Clear any existing data and start fresh
    clearAllData();

    // Load data from localStorage
    loadData();

    // Update dashboard
    updateDashboard();

    // Set up form event listeners
    setupEventListeners();

    // Set up navigation
    setupNavigation();

    // Update dropdowns
    updateDropdowns();
});

// Clear all data for fresh start
function clearAllData() {
    localStorage.removeItem('hoa_volunteers');
    localStorage.removeItem('hoa_meets');
    localStorage.removeItem('hoa_portal_members');
    localStorage.removeItem('hoa_checkins');

    volunteers = [];
    meets = [];
    portalMembers = [];
    checkins = [];
}

// Load data from localStorage
function loadData() {
    volunteers = JSON.parse(localStorage.getItem('hoa_volunteers')) || [];
    meets = JSON.parse(localStorage.getItem('hoa_meets')) || [];
    portalMembers = JSON.parse(localStorage.getItem('hoa_portal_members')) || [];
    checkins = JSON.parse(localStorage.getItem('hoa_checkins')) || [];
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('hoa_volunteers', JSON.stringify(volunteers));
    localStorage.setItem('hoa_meets', JSON.stringify(meets));
    localStorage.setItem('hoa_portal_members', JSON.stringify(portalMembers));
    localStorage.setItem('hoa_checkins', JSON.stringify(checkins));
}

// Set up navigation system
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);

            // Update active nav link
            navLinks.forEach(nl => nl.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Show section function
function showSection(sectionId) {
    console.log('Showing section:', sectionId);

    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update dropdowns when showing QR generator
    if (sectionId === 'qr-generator') {
        updateDropdowns();
    }
}

// Set up event listeners
function setupEventListeners() {
    // Add volunteer form
    document.getElementById('add-volunteer-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addVolunteer();
    });

    // Add meet form
    document.getElementById('add-meet-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addMeet();
    });

    // Add portal member form
    document.getElementById('add-portal-member-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addPortalMember();
    });

    // QR Generator
    document.getElementById('generate-qr-btn').addEventListener('click', generateQRCode);
    document.getElementById('download-qr-btn').addEventListener('click', downloadQRCode);

    // Scanner
    document.getElementById('start-scanner-btn').addEventListener('click', startScanner);
    document.getElementById('stop-scanner-btn').addEventListener('click', stopScanner);
}

// Add volunteer function
function addVolunteer() {
    const firstName = document.getElementById('volunteer-first-name').value.trim();
    const lastName = document.getElementById('volunteer-last-name').value.trim();
    const email = document.getElementById('volunteer-email').value.trim();
    const phone = document.getElementById('volunteer-phone').value.trim();
    const experience = document.getElementById('volunteer-experience').value;

    if (!firstName || !lastName || !email || !experience) {
        alert('Please fill in all required fields');
        return;
    }

    const volunteer = {
        id: Date.now().toString(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        experience: experience,
        dateAdded: new Date().toISOString()
    };

    volunteers.push(volunteer);
    saveData();

    // Clear form
    document.getElementById('add-volunteer-form').reset();

    // Update displays
    updateVolunteersList();
    updateDashboard();
    updateDropdowns();

    showAlert('Volunteer added successfully!', 'success');
}

// Add meet function
function addMeet() {
    const name = document.getElementById('meet-name').value.trim();
    const date = document.getElementById('meet-date').value;
    const time = document.getElementById('meet-time').value;
    const location = document.getElementById('meet-location').value.trim();
    const description = document.getElementById('meet-description').value.trim();

    if (!name || !date || !time || !location) {
        alert('Please fill in all required fields');
        return;
    }

    const meet = {
        id: Date.now().toString(),
        name: name,
        date: date,
        time: time,
        location: location,
        description: description,
        dateAdded: new Date().toISOString()
    };

    meets.push(meet);
    saveData();

    // Clear form
    document.getElementById('add-meet-form').reset();

    // Update displays
    updateMeetsList();
    updateDashboard();
    updateDropdowns();

    showAlert('Meet added successfully!', 'success');
}

// Add portal member function
function addPortalMember() {
    const firstName = document.getElementById('portal-first-name').value.trim();
    const lastName = document.getElementById('portal-last-name').value.trim();
    const email = document.getElementById('portal-email').value.trim();

    if (!firstName || !lastName || !email) {
        alert('Please fill in all required fields');
        return;
    }

    const member = {
        id: Date.now().toString(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        dateAdded: new Date().toISOString()
    };

    portalMembers.push(member);
    saveData();

    // Clear form
    document.getElementById('add-portal-member-form').reset();

    // Update displays
    updatePortalMembersList();
    updateDashboard();

    showAlert('Portal member added successfully!', 'success');
}

// Update volunteers list
function updateVolunteersList() {
    const volunteersList = document.getElementById('volunteers-list');

    if (volunteers.length === 0) {
        volunteersList.innerHTML = '<p class="text-muted">No volunteers registered yet</p>';
        return;
    }

    let html = '';
    volunteers.forEach(volunteer => {
        html += `
            <div class="volunteer-item">
                <div class="item-header">${volunteer.firstName} ${volunteer.lastName}</div>
                <div class="item-details">
                    <div>Email: ${volunteer.email}</div>
                    <div>Phone: ${volunteer.phone || 'Not provided'}</div>
                    <div>Experience: ${volunteer.experience}</div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-danger btn-sm" onclick="removeVolunteer('${volunteer.id}')">Remove</button>
                </div>
            </div>
        `;
    });

    volunteersList.innerHTML = html;
}

// Update meets list
function updateMeetsList() {
    const meetsList = document.getElementById('meets-list');

    if (meets.length === 0) {
        meetsList.innerHTML = '<p class="text-muted">No meets scheduled yet</p>';
        return;
    }

    let html = '';
    meets.forEach(meet => {
        const meetDate = new Date(meet.date);
        const today = new Date();
        const isUpcoming = meetDate >= today;
        const statusClass = isUpcoming ? 'text-success' : 'text-muted';

        html += `
            <div class="meet-item">
                <div class="item-header">${meet.name}</div>
                <div class="item-details">
                    <div class="${statusClass}">Date: ${meet.date} at ${meet.time}</div>
                    <div>Location: ${meet.location}</div>
                    <div>Description: ${meet.description || 'No description'}</div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-danger btn-sm" onclick="removeMeet('${meet.id}')">Remove</button>
                </div>
            </div>
        `;
    });

    meetsList.innerHTML = html;
}

// Update portal members list
function updatePortalMembersList() {
    const portalMembersList = document.getElementById('portal-members-list');

    if (portalMembers.length === 0) {
        portalMembersList.innerHTML = '<p class="text-muted">No portal members added yet</p>';
        return;
    }

    let html = '';
    portalMembers.forEach(member => {
        html += `
            <div class="portal-member-item">
                <div class="item-header">${member.firstName} ${member.lastName}</div>
                <div class="item-details">
                    <div>Email: ${member.email}</div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-danger btn-sm" onclick="removePortalMember('${member.id}')">Remove</button>
                </div>
            </div>
        `;
    });

    portalMembersList.innerHTML = html;
}

// Remove functions
function removeVolunteer(id) {
    if (confirm('Are you sure you want to remove this volunteer?')) {
        volunteers = volunteers.filter(v => v.id !== id);
        saveData();
        updateVolunteersList();
        updateDashboard();
        updateDropdowns();
    }
}

function removeMeet(id) {
    if (confirm('Are you sure you want to remove this meet?')) {
        meets = meets.filter(m => m.id !== id);
        saveData();
        updateMeetsList();
        updateDashboard();
        updateDropdowns();
    }
}

function removePortalMember(id) {
    if (confirm('Are you sure you want to remove this portal member?')) {
        portalMembers = portalMembers.filter(m => m.id !== id);
        saveData();
        updatePortalMembersList();
        updateDashboard();
    }
}

// Update dashboard
function updateDashboard() {
    // Update stats
    document.getElementById('total-volunteers').textContent = volunteers.length;
    document.getElementById('total-meets').textContent = meets.length;
    document.getElementById('total-checkins').textContent = checkins.length;
    document.getElementById('open-positions').textContent = calculateOpenPositions();

    // Update upcoming meets
    updateUpcomingMeets();

    // Update recent checkins
    updateRecentCheckins();
}

function calculateOpenPositions() {
    // Standard positions per meet
    const positionsPerMeet = 10; // Timer, Head Timer, Clerk, Announcer, etc.
    const totalPositions = meets.length * positionsPerMeet;
    const filledPositions = checkins.length;
    return Math.max(0, totalPositions - filledPositions);
}

function updateUpcomingMeets() {
    const upcomingMeetsDiv = document.getElementById('upcoming-meets');
    const today = new Date();

    const upcomingMeets = meets.filter(meet => new Date(meet.date) >= today)
                              .sort((a, b) => new Date(a.date) - new Date(b.date))
                              .slice(0, 3);

    if (upcomingMeets.length === 0) {
        upcomingMeetsDiv.innerHTML = '<p class="text-muted">No upcoming meets scheduled</p>';
        return;
    }

    let html = '';
    upcomingMeets.forEach(meet => {
        html += `
            <div class="mb-2">
                <strong>${meet.name}</strong><br>
                <small class="text-muted">${meet.date} at ${meet.time}</small>
            </div>
        `;
    });

    upcomingMeetsDiv.innerHTML = html;
}

function updateRecentCheckins() {
    const recentCheckinsDiv = document.getElementById('recent-checkins');

    if (checkins.length === 0) {
        recentCheckinsDiv.innerHTML = '<p class="text-muted">No recent check-ins</p>';
        return;
    }

    const recentCheckins = checkins.slice(-5).reverse();

    let html = '';
    recentCheckins.forEach(checkin => {
        const volunteer = volunteers.find(v => v.id === checkin.volunteerId);
        const meet = meets.find(m => m.id === checkin.meetId);

        if (volunteer && meet) {
            html += `
                <div class="mb-2">
                    <strong>${volunteer.firstName} ${volunteer.lastName}</strong><br>
                    <small class="text-muted">${meet.name} - ${checkin.position}</small>
                </div>
            `;
        }
    });

    recentCheckinsDiv.innerHTML = html || '<p class="text-muted">No recent check-ins</p>';
}

// Update dropdowns
function updateDropdowns() {
    // Update meet dropdown
    const meetSelect = document.getElementById('qr-meet-select');
    meetSelect.innerHTML = '<option value="">Choose a meet...</option>';
    meets.forEach(meet => {
        meetSelect.innerHTML += `<option value="${meet.id}">${meet.name} - ${meet.date}</option>`;
    });

    // Update volunteer dropdown
    const volunteerSelect = document.getElementById('qr-volunteer-select');
    volunteerSelect.innerHTML = '<option value="">Choose a volunteer...</option>';
    volunteers.forEach(volunteer => {
        volunteerSelect.innerHTML += `<option value="${volunteer.id}">${volunteer.firstName} ${volunteer.lastName}</option>`;
    });
}

// QR Code Generation
function generateQRCode() {
    const meetId = document.getElementById('qr-meet-select').value;
    const volunteerId = document.getElementById('qr-volunteer-select').value;
    const position = document.getElementById('qr-position-select').value;

    if (!meetId || !volunteerId || !position) {
        alert('Please select meet, volunteer, and position');
        return;
    }

    const qrData = {
        meetId: meetId,
        volunteerId: volunteerId,
        position: position,
        timestamp: new Date().toISOString()
    };

    const qrString = JSON.stringify(qrData);
    const qrDisplay = document.getElementById('qr-code-display');

    // Clear previous QR code
    qrDisplay.innerHTML = '';

    // Generate QR code
    QRCode.toCanvas(qrString, { width: 200, height: 200 }, function (error, canvas) {
        if (error) {
            console.error(error);
            qrDisplay.innerHTML = '<p class="text-danger">Error generating QR code</p>';
            return;
        }

        qrDisplay.appendChild(canvas);
        document.getElementById('download-qr-btn').style.display = 'block';

        // Store canvas for download
        window.currentQRCanvas = canvas;
    });
}

// Download QR Code
function downloadQRCode() {
    if (window.currentQRCanvas) {
        const link = document.createElement('a');
        link.download = 'volunteer-qr-code.png';
        link.href = window.currentQRCanvas.toDataURL();
        link.click();
    }
}

// Scanner functions
function startScanner() {
    const qrReader = document.getElementById('qr-reader');

    if (html5QrCode) {
        console.log('Scanner already running');
        return;
    }

    html5QrCode = new Html5Qrcode("qr-reader");

    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 }
    };

    html5QrCode.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanError
    ).then(() => {
        document.getElementById('start-scanner-btn').style.display = 'none';
        document.getElementById('stop-scanner-btn').style.display = 'inline-block';
    }).catch(error => {
        console.error('Error starting scanner:', error);
        alert('Error starting scanner. Please check camera permissions.');
    });
}

function stopScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            html5QrCode = null;
            document.getElementById('start-scanner-btn').style.display = 'inline-block';
            document.getElementById('stop-scanner-btn').style.display = 'none';
            document.getElementById('qr-reader').innerHTML = '<p class="text-muted">Click "Start Scanner" to begin scanning</p>';
        }).catch(error => {
            console.error('Error stopping scanner:', error);
        });
    }
}

function onScanSuccess(decodedText, decodedResult) {
    console.log('QR Code scanned:', decodedText);

    try {
        const qrData = JSON.parse(decodedText);
        processCheckin(qrData);
    } catch (error) {
        console.error('Invalid QR code format:', error);
        displayScanResult('Invalid QR code format', 'error');
    }
}

function onScanError(error) {
    // Ignore scan errors (they happen frequently during scanning)
    console.log('Scan error (normal):', error);
}

function processCheckin(qrData) {
    const { meetId, volunteerId, position } = qrData;

    // Find volunteer and meet
    const volunteer = volunteers.find(v => v.id === volunteerId);
    const meet = meets.find(m => m.id === meetId);

    if (!volunteer || !meet) {
        displayScanResult('Invalid volunteer or meet information', 'error');
        return;
    }

    // Check if already checked in
    const existingCheckin = checkins.find(c => 
        c.volunteerId === volunteerId && 
        c.meetId === meetId && 
        c.position === position
    );

    if (existingCheckin) {
        displayScanResult(`${volunteer.firstName} ${volunteer.lastName} already checked in for ${position}`, 'error');
        return;
    }

    // Create checkin record
    const checkin = {
        id: Date.now().toString(),
        volunteerId: volunteerId,
        meetId: meetId,
        position: position,
        checkinTime: new Date().toISOString()
    };

    checkins.push(checkin);
    saveData();
    updateDashboard();

    displayScanResult(`✅ ${volunteer.firstName} ${volunteer.lastName} checked in successfully for ${position} at ${meet.name}`, 'success');

    // Stop scanner after successful scan
    setTimeout(stopScanner, 2000);
}

function displayScanResult(message, type) {
    const scanResult = document.getElementById('scan-result');
    const className = type === 'success' ? 'scan-success' : 'scan-error';

    scanResult.innerHTML = `<div class="${className}">${message}</div>`;
}

// Show alert function
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Insert at top of current active section
    const activeSection = document.querySelector('.section.active');
    if (activeSection) {
        activeSection.insertBefore(alertDiv, activeSection.firstChild);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 3000);
    }
}

// Initialize display updates
function initializeDisplays() {
    updateVolunteersList();
    updateMeetsList();
    updatePortalMembersList();
    updateDashboard();
    updateDropdowns();
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDisplays);