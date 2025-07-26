/* ===== HOA Swim Meet Volunteer Manager App ===== */

// Storage keys
const STORAGE_KEYS = {
  volunteers: 'hoa_volunteers',
  meets: 'hoa_meets',
  roles: 'hoa_roles',
  checkins: 'hoa_checkins',
  portalMembers: 'hoa_portal_members'
};

// ----- Utility functions -----
const uuid = () => crypto.randomUUID();

function loadData(key) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function $(selector, scope = document) {
  return scope.querySelector(selector);
}

function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

function setActiveSection(sectionId) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.querySelector(`#${sectionId}`).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.nav-btn[data-section="${sectionId}"]`).classList.add('active');
}

// ----- Navigation -----
function initNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-section');
      setActiveSection(target);
    });
  });
}

// ----- Volunteers -----
function renderVolunteers() {
  const volunteers = loadData(STORAGE_KEYS.volunteers);
  const container = $('#volunteers-container');
  container.innerHTML = '';
  if (!volunteers.length) {
    container.innerHTML = '<p class="no-data">No volunteers registered yet</p>';
    return;
  }
  volunteers.forEach(v => {
    const card = document.createElement('div');
    card.className = 'volunteer-card';
    card.innerHTML = `
      <h4>${v.firstName} ${v.lastName}</h4>
      <p>Email: ${v.email}</p>
      ${v.phone ? `<p>Phone: ${v.phone}</p>` : ''}
      <p>Experience: ${v.experience}</p>
      <div class="card-actions">
        <button class="danger-btn" data-id="${v.id}">Delete</button>
      </div>
    `;
    card.querySelector('button').addEventListener('click', () => {
      deleteVolunteer(v.id);
    });
    container.appendChild(card);
  });
}

function deleteVolunteer(id) {
  const volunteers = loadData(STORAGE_KEYS.volunteers).filter(v => v.id !== id);
  saveData(STORAGE_KEYS.volunteers, volunteers);
  renderVolunteers();
  updateDashboardStats();
  populateSelectOptions();
}

function addVolunteer(e) {
  e.preventDefault();
  const volunteer = {
    id: uuid(),
    firstName: $('#volunteer-first-name').value.trim(),
    lastName: $('#volunteer-last-name').value.trim(),
    email: $('#volunteer-email').value.trim(),
    phone: $('#volunteer-phone').value.trim(),
    experience: $('#volunteer-experience').value
  };
  const volunteers = loadData(STORAGE_KEYS.volunteers);
  volunteers.push(volunteer);
  saveData(STORAGE_KEYS.volunteers, volunteers);
  e.target.reset();
  renderVolunteers();
  updateDashboardStats();
  populateSelectOptions();
}

// ----- Meets -----
function renderMeets() {
  const meets = loadData(STORAGE_KEYS.meets);
  const container = $('#meets-container');
  container.innerHTML = '';
  if (!meets.length) {
    container.innerHTML = '<p class="no-data">No meets scheduled yet</p>';
    return;
  }
  meets.sort((a, b) => new Date(a.date) - new Date(b.date));
  meets.forEach(m => {
    const card = document.createElement('div');
    card.className = 'meet-card';
    card.innerHTML = `
      <h4>${m.name}</h4>
      <p>${formatDate(m.date)} at ${m.time}</p>
      <p>Location: ${m.location}</p>
      ${m.description ? `<p>${m.description}</p>` : ''}
      <div class="card-actions">
        <button class="danger-btn" data-id="${m.id}">Delete</button>
      </div>
    `;
    card.querySelector('button').addEventListener('click', () => deleteMeet(m.id));
    container.appendChild(card);
  });
}

function deleteMeet(id) {
  const meets = loadData(STORAGE_KEYS.meets).filter(m => m.id !== id);
  saveData(STORAGE_KEYS.meets, meets);
  renderMeets();
  updateDashboardStats();
  populateSelectOptions();
}

function addMeet(e) {
  e.preventDefault();
  const meet = {
    id: uuid(),
    name: $('#meet-name').value.trim(),
    date: $('#meet-date').value,
    time: $('#meet-time').value,
    location: $('#meet-location').value.trim(),
    description: $('#meet-description').value.trim()
  };
  const meets = loadData(STORAGE_KEYS.meets);
  meets.push(meet);
  saveData(STORAGE_KEYS.meets, meets);
  e.target.reset();
  renderMeets();
  updateDashboardStats();
  populateSelectOptions();
}

// ----- Roles -----
const STANDARD_ROLES = [
  { name: 'Timer', description: 'Responsible for timing swimmers in designated lane', volunteersNeeded: 18, experience: 'beginner', training: false },
  { name: 'Head Timer', description: 'Supervises all timers and provides backup timing', volunteersNeeded: 1, experience: 'intermediate', training: true },
  { name: 'Clerk of Course', description: 'Organizes swimmers before their events', volunteersNeeded: 2, experience: 'intermediate', training: true },
  { name: 'Announcer', description: 'Provides meet commentary and announcements', volunteersNeeded: 1, experience: 'experienced', training: false },
  { name: 'Computer Operator', description: 'Operates meet management software', volunteersNeeded: 1, experience: 'experienced', training: true },
  { name: 'Concessions', description: 'Handles food and beverage sales', volunteersNeeded: 4, experience: 'beginner', training: false },
  { name: 'Set Up Crew', description: 'Prepares pool deck and equipment', volunteersNeeded: 3, experience: 'beginner', training: false },
  { name: 'Clean Up Crew', description: 'Cleans up after the meet', volunteersNeeded: 3, experience: 'beginner', training: false },
  { name: 'Awards / Ribbons', description: 'Handles ribbons and awards', volunteersNeeded: 2, experience: 'beginner', training: false }
];

function renderRoles() {
  const roles = loadData(STORAGE_KEYS.roles);
  const container = $('#roles-container');
  container.innerHTML = '';
  if (!roles.length) {
    container.innerHTML = '<p class="no-data">No roles defined yet. Click "Load Standard Swim Meet Roles" to get started.</p>';
    return;
  }
  roles.forEach(r => {
    const card = document.createElement('div');
    card.className = 'role-card';
    card.innerHTML = `
      <h4>${r.name}</h4>
      <p>${r.description}</p>
      <p>Volunteers Needed: ${r.volunteersNeeded}</p>
      <p>Experience: ${r.experience}</p>
      <p>Training Required: ${r.training ? 'Yes' : 'No'}</p>
      <div class="card-actions"><button class="danger-btn" data-id="${r.id}">Delete</button></div>
    `;
    card.querySelector('button').addEventListener('click', () => deleteRole(r.id));
    container.appendChild(card);
  });
}

function deleteRole(id) {
  const roles = loadData(STORAGE_KEYS.roles).filter(r => r.id !== id);
  saveData(STORAGE_KEYS.roles, roles);
  renderRoles();
  updateDashboardStats();
  populateSelectOptions();
}

function addRole(e) {
  e.preventDefault();
  const role = {
    id: uuid(),
    name: $('#role-name').value.trim(),
    description: $('#role-description').value.trim(),
    volunteersNeeded: parseInt($('#role-needed').value, 10),
    experience: $('#role-experience').value,
    training: $('#role-training').checked
  };
  const roles = loadData(STORAGE_KEYS.roles);
  roles.push(role);
  saveData(STORAGE_KEYS.roles, roles);
  e.target.reset();
  renderRoles();
  updateDashboardStats();
  populateSelectOptions();
}

function loadStandardRoles() {
  if (!confirm('Load standard swim meet roles? This will add predefined roles.')) return;
  const roles = loadData(STORAGE_KEYS.roles);
  STANDARD_ROLES.forEach(sr => {
    roles.push({ id: uuid(), ...sr });
  });
  saveData(STORAGE_KEYS.roles, roles);
  renderRoles();
  updateDashboardStats();
  populateSelectOptions();
}

// ----- QR Code Generation -----
let generatedQRCode = null;

function populateSelectOptions() {
  // Volunteers
  const volunteerSelect = $('#qr-volunteer');
  volunteerSelect.innerHTML = '<option value="">Choose a volunteer…</option>';
  loadData(STORAGE_KEYS.volunteers).forEach(v => {
    const opt = document.createElement('option');
    opt.value = v.id;
    opt.textContent = `${v.firstName} ${v.lastName}`;
    volunteerSelect.appendChild(opt);
  });

  // Meets
  const meetSelect = $('#qr-meet');
  meetSelect.innerHTML = '<option value="">Choose a meet…</option>';
  loadData(STORAGE_KEYS.meets).forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.id;
    opt.textContent = `${m.name} (${formatDate(m.date)})`;
    meetSelect.appendChild(opt);
  });

  // Roles
  const roleSelect = $('#qr-role');
  roleSelect.innerHTML = '<option value="">Choose a role…</option>';
  loadData(STORAGE_KEYS.roles).forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.id;
    opt.textContent = r.name;
    roleSelect.appendChild(opt);
  });
}

function generateQRCode(e) {
  e.preventDefault();
  const volunteerId = $('#qr-volunteer').value;
  const meetId = $('#qr-meet').value;
  const roleId = $('#qr-role').value;
  if (!volunteerId || !meetId || !roleId) return;

  const payload = {
    volunteerId,
    meetId,
    roleId,
    ts: Date.now()
  };
  const qrData = JSON.stringify(payload);
  const qrContainer = $('#qr-code-container');
  qrContainer.innerHTML = '';
  QRCode.toCanvas(qrData, { width: 256 }, (err, canvas) => {
    if (err) {
      alert('Error generating QR code');
      return;
    }
    qrContainer.appendChild(canvas);
    $('#download-qr').style.display = 'inline-block';
    generatedQRCode = canvas;
  });
}

function downloadQRCode() {
  if (!generatedQRCode) return;
  const link = document.createElement('a');
  link.href = generatedQRCode.toDataURL('image/png');
  link.download = 'volunteer_qr.png';
  link.click();
}

// ----- QR Code Scanner -----
let html5QrScanner = null;

function startScanner() {
  if (html5QrScanner) return;
  html5QrScanner = new Html5Qrcode('qr-reader');
  html5QrScanner.start(
    { facingMode: 'environment' },
    { fps: 10, qrbox: 250 },
    onScanSuccess,
    onScanFailure
  ).then(() => {
    $('#start-scanner').style.display = 'none';
    $('#stop-scanner').style.display = 'inline-block';
  }).catch(err => {
    alert('Error starting camera: ' + err);
  });
}

function stopScanner() {
  if (!html5QrScanner) return;
  html5QrScanner.stop().then(() => {
    html5QrScanner.clear();
    html5QrScanner = null;
    $('#start-scanner').style.display = 'inline-block';
    $('#stop-scanner').style.display = 'none';
  });
}

function onScanSuccess(decodedText) {
  processCheckIn(decodedText);
}

function onScanFailure() {
  // Ignore failures silently
}

function processCheckIn(qrData) {
  let payload;
  try {
    payload = JSON.parse(qrData);
  } catch {
    showScanMessage('Invalid QR code', false);
    return;
  }
  // Validate
  const volunteers = loadData(STORAGE_KEYS.volunteers);
  const meets = loadData(STORAGE_KEYS.meets);
  const roles = loadData(STORAGE_KEYS.roles);
  const volunteer = volunteers.find(v => v.id === payload.volunteerId);
  const meet = meets.find(m => m.id === payload.meetId);
  const role = roles.find(r => r.id === payload.roleId);
  if (!volunteer || !meet || !role) {
    showScanMessage('QR code not recognized', false);
    return;
  }
  // Check for duplicate check-in
  const today = new Date().toDateString();
  const checkins = loadData(STORAGE_KEYS.checkins);
  const already = checkins.find(c => c.volunteerId === volunteer.id && c.meetId === meet.id && new Date(c.ts).toDateString() === today);
  if (already) {
    showScanMessage(`${volunteer.firstName} ${volunteer.lastName} already checked in`, false);
    return;
  }
  const checkin = {
    id: uuid(),
    volunteerId: volunteer.id,
    meetId: meet.id,
    roleId: role.id,
    ts: Date.now()
  };
  checkins.push(checkin);
  saveData(STORAGE_KEYS.checkins, checkins);
  renderCheckins();
  updateDashboardStats();
  showScanMessage(`${volunteer.firstName} ${volunteer.lastName} checked in!`, true);
}

function showScanMessage(msg, success) {
  const result = $('#scan-result');
  result.textContent = msg;
  result.className = 'scan-result ' + (success ? 'scan-success' : 'scan-error');
}

function renderCheckins() {
  const checkins = loadData(STORAGE_KEYS.checkins);
  const container = $('#checkins-container');
  container.innerHTML = '';
  if (!checkins.length) {
    container.innerHTML = '<p class="no-data">No check-ins recorded today</p>';
    return;
  }
  // Only show today
  const todayStr = new Date().toDateString();
  const volunteers = loadData(STORAGE_KEYS.volunteers);
  const meets = loadData(STORAGE_KEYS.meets);
  const roles = loadData(STORAGE_KEYS.roles);

  checkins.filter(c => new Date(c.ts).toDateString() === todayStr).forEach(c => {
    const volunteer = volunteers.find(v => v.id === c.volunteerId);
    const meet = meets.find(m => m.id === c.meetId);
    const role = roles.find(r => r.id === c.roleId);
    const card = document.createElement('div');
    card.className = 'checkin-card';
    card.innerHTML = `
      <h4>${volunteer.firstName} ${volunteer.lastName}</h4>
      <p>Meet: ${meet.name}</p>
      <p>Role: ${role.name}</p>
      <p>Time: ${new Date(c.ts).toLocaleTimeString()}</p>
    `;
    container.appendChild(card);
  });
}

// ----- Portal Members -----
function renderPortalMembers() {
  const members = loadData(STORAGE_KEYS.portalMembers);
  const container = $('#portal-members-container');
  container.innerHTML = '';
  if (!members.length) {
    container.innerHTML = '<p class="no-data">No portal members added yet</p>';
    return;
  }
  members.forEach(m => {
    const card = document.createElement('div');
    card.className = 'portal-member-card';
    card.innerHTML = `
      <h4>${m.firstName} ${m.lastName}</h4>
      <p>${m.email}</p>
      <div class="card-actions"><button class="danger-btn" data-id="${m.id}">Delete</button></div>
    `;
    card.querySelector('button').addEventListener('click', () => deletePortalMember(m.id));
    container.appendChild(card);
  });
}

function deletePortalMember(id) {
  const members = loadData(STORAGE_KEYS.portalMembers).filter(m => m.id !== id);
  saveData(STORAGE_KEYS.portalMembers, members);
  renderPortalMembers();
}

function addPortalMember(e) {
  e.preventDefault();
  const member = {
    id: uuid(),
    firstName: $('#portal-first-name').value.trim(),
    lastName: $('#portal-last-name').value.trim(),
    email: $('#portal-email').value.trim()
  };
  const members = loadData(STORAGE_KEYS.portalMembers);
  members.push(member);
  saveData(STORAGE_KEYS.portalMembers, members);
  e.target.reset();
  renderPortalMembers();
}

// ----- Dashboard -----
function updateDashboardStats() {
  $('#total-volunteers').textContent = loadData(STORAGE_KEYS.volunteers).length;
  $('#total-meets').textContent = loadData(STORAGE_KEYS.meets).length;
  $('#total-roles').textContent = loadData(STORAGE_KEYS.roles).length;
  const todayStr = new Date().toDateString();
  const checkinsToday = loadData(STORAGE_KEYS.checkins).filter(c => new Date(c.ts).toDateString() === todayStr);
  $('#total-checkins').textContent = checkinsToday.length;

  // Upcoming meets
  const upcomingContainer = $('#upcoming-meets-list');
  upcomingContainer.innerHTML = '';
  const upcomingMeets = loadData(STORAGE_KEYS.meets).filter(m => new Date(m.date) >= new Date());
  if (!upcomingMeets.length) upcomingContainer.innerHTML = '<p class="no-data">No upcoming meets scheduled</p>';
  upcomingMeets.slice(0, 5).forEach(m => {
    const p = document.createElement('p');
    p.textContent = `${m.name} - ${formatDate(m.date)}`;
    upcomingContainer.appendChild(p);
  });

  // Recent check-ins
  const recentContainer = $('#recent-checkins-list');
  recentContainer.innerHTML = '';
  if (!checkinsToday.length) recentContainer.innerHTML = '<p class="no-data">No recent check-ins</p>';
  checkinsToday.slice(-5).reverse().forEach(c => {
    const volunteer = loadData(STORAGE_KEYS.volunteers).find(v => v.id === c.volunteerId);
    const p = document.createElement('p');
    p.textContent = `${volunteer.firstName} ${volunteer.lastName} - ${new Date(c.ts).toLocaleTimeString()}`;
    recentContainer.appendChild(p);
  });
}

// ----- Initialization -----
function init() {
  initNavigation();
  renderVolunteers();
  renderMeets();
  renderRoles();
  renderPortalMembers();
  renderCheckins();
  populateSelectOptions();
  updateDashboardStats();

  // Event listeners
  $('#add-volunteer-form').addEventListener('submit', addVolunteer);
  $('#add-meet-form').addEventListener('submit', addMeet);
  $('#add-role-form').addEventListener('submit', addRole);
  $('#qr-generator-form').addEventListener('submit', generateQRCode);
  $('#download-qr').addEventListener('click', downloadQRCode);
  $('#start-scanner').addEventListener('click', startScanner);
  $('#stop-scanner').addEventListener('click', stopScanner);
  $('#add-portal-member-form').addEventListener('submit', addPortalMember);
  $('#load-standard-roles').addEventListener('click', loadStandardRoles);
}

document.addEventListener('DOMContentLoaded', init);
