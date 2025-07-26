// HOA Swim Meet Volunteer Manager – JavaScript Core
// =================================================
// Data Structures
// =================================================
const STORAGE_KEY = 'hoa_swim_meet_app_v2';

let appData = {
    volunteers: [],
    roles: [],
    meets: [],
    checkIns: []
};

// Load Data from localStorage
function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        appData = JSON.parse(stored);
    } else {
        saveData();
    }
}

// Save Data to localStorage
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function createElement(tag, classNames = [], text = '') {
    const el = document.createElement(tag);
    if (classNames.length) el.classList.add(...classNames);
    if (text) el.textContent = text;
    return el;
}

function uuid() {
    return crypto.randomUUID();
}

// Navigation
function setupNavigation() {
    const navLinks = $$('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.dataset.section;
            showSection(sectionId);
            navLinks.forEach(nl => nl.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function showSection(sectionId) {
    const sections = $$('.section');
    sections.forEach(sec => sec.classList.remove('active'));
    $('#' + sectionId).classList.add('active');
}

// Dashboard Rendering
function renderDashboard() {
    $('#total-volunteers').textContent = appData.volunteers.length;
    $('#total-meets').textContent = appData.meets.length;
    $('#total-roles').textContent = appData.roles.length;
    $('#total-checkins').textContent = appData.checkIns.length;

    // Upcoming Meets
    const upcomingEl = $('#upcoming-meets-list');
    upcomingEl.innerHTML = '';
    const upcoming = appData.meets
        .filter(m => new Date(m.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);
    if (!upcoming.length) {
        upcomingEl.innerHTML = '<p>No upcoming meets scheduled.</p>';
    } else {
        upcoming.forEach(meet => {
            const item = createElement('div', ['data-item', 'meet-item']);
            item.innerHTML = `<h4>${meet.name}</h4>
                <p class="meet-date">${meet.date} at ${meet.time}</p>
                <p>${meet.location}</p>`;
            upcomingEl.appendChild(item);
        });
    }

    // Recent Check-ins
    const recentEl = $('#recent-checkins');
    recentEl.innerHTML = '';
    const recent = appData.checkIns.sort((a,b)=> b.timestamp - a.timestamp).slice(0,5);
    if (!recent.length) {
        recentEl.innerHTML = '<p>No recent check-ins.</p>';
    } else {
        recent.forEach(ci => {
            const volunteer = appData.volunteers.find(v=>v.id===ci.volunteerId);
            const role = appData.roles.find(r=>r.id===ci.roleId);
            const item = createElement('div', ['scan-result-item']);
            item.innerHTML = `<h4>${volunteer.firstName} ${volunteer.lastName}</h4>
                <p>${role.name} – ${new Date(ci.timestamp).toLocaleString()}</p>`;
            recentEl.appendChild(item);
        });
    }
}

// Volunteer CRUD
function setupVolunteers() {
    $('#add-volunteer-btn').addEventListener('click', ()=>{
        $('#add-volunteer-form').style.display = 'block';
    });
    $('#cancel-volunteer').addEventListener('click', ()=>{
        $('#add-volunteer-form').style.display = 'none';
    });

    $('#volunteer-form').addEventListener('submit', (e)=>{
        e.preventDefault();
        const v = {
            id: uuid(),
            firstName: $('#volunteer-firstname').value.trim(),
            lastName: $('#volunteer-lastname').value.trim(),
            email: $('#volunteer-email').value.trim(),
            phone: $('#volunteer-phone').value.trim(),
            experience: $('#volunteer-experience').value,
            preferredRoles: Array.from($('#volunteer-preferred-roles').selectedOptions).map(o=>o.value)
        };
        appData.volunteers.push(v);
        saveData();
        $('#add-volunteer-form').reset();
        $('#add-volunteer-form').style.display = 'none';
        renderVolunteers();
        renderDashboard();
        populateSelects();
    });

    renderVolunteers();
}

function renderVolunteers() {
    const list = $('#volunteers-list');
    list.innerHTML = '';
    if (!appData.volunteers.length) {
        list.innerHTML = '<p>No volunteers added yet.</p>';
        return;
    }
    appData.volunteers.forEach(vol => {
        const item = createElement('div', ['data-item', 'volunteer-item']);
        item.innerHTML = `<h4>${vol.firstName} ${vol.lastName}</h4>
            <p class="volunteer-contact">${vol.email} ${vol.phone? '· '+vol.phone : ''}</p>
            <div class="role-meta">
                <span class="role-badge ${vol.experience.toLowerCase()}">${vol.experience}</span>
            </div>`;
        const actions = createElement('div', ['item-actions']);
        const delBtn = createElement('button', ['btn', 'btn-danger'], 'Delete');
        delBtn.addEventListener('click', ()=>{
            if (confirm('Delete this volunteer?')) {
                appData.volunteers = appData.volunteers.filter(v=>v.id!==vol.id);
                saveData();
                renderVolunteers();
                renderDashboard();
                populateSelects();
            }
        });
        actions.appendChild(delBtn);
        item.appendChild(actions);
        list.appendChild(item);
    });
}

// Roles CRUD
function setupRoles() {
    $('#add-role-btn').addEventListener('click', ()=>{
        $('#add-role-form').style.display = 'block';
    });
    $('#cancel-role').addEventListener('click', ()=>{
        $('#add-role-form').style.display = 'none';
    });

    $('#load-default-roles-btn').addEventListener('click', ()=>{
        if (confirm('Load standard swim meet roles? This will append default roles.')) {
            loadDefaultRoles();
            saveData();
            renderRoles();
            renderDashboard();
            populateSelects();
        }
    });

    $('#role-form').addEventListener('submit', (e)=>{
        e.preventDefault();
        const role = {
            id: uuid(),
            name: $('#role-name').value.trim(),
            description: $('#role-description').value.trim(),
            volunteersNeeded: parseInt($('#role-volunteers-needed').value),
            experienceRequired: $('#role-experience').value,
            trainingRequired: $('#role-training-required').checked
        };
        appData.roles.push(role);
        saveData();
        $('#role-form').reset();
        $('#add-role-form').style.display = 'none';
        renderRoles();
        renderDashboard();
        populateSelects();
    });

    renderRoles();
}

function renderRoles() {
    const list = $('#roles-list');
    list.innerHTML = '';
    if (!appData.roles.length) {
        list.innerHTML = '<p>No volunteer roles defined. Use "Load Standard Roles" or add your own.</p>';
        return;
    }
    appData.roles.forEach(role => {
        const item = createElement('div', ['data-item', 'role-item']);
        item.innerHTML = `<h4>${role.name}</h4>
            <p>${role.description}</p>
            <div class="role-meta">
                <span class="role-badge ${role.experienceRequired.toLowerCase()}">${role.experienceRequired}</span>
                <span class="role-badge">${role.volunteersNeeded} needed</span>
                ${role.trainingRequired ? '<span class="role-badge training-required">Training</span>': ''}
            </div>`;
        const actions = createElement('div', ['item-actions']);
        const delBtn = createElement('button', ['btn', 'btn-danger'], 'Delete');
        delBtn.addEventListener('click', ()=>{
            if (confirm('Delete this role?')) {
                appData.roles = appData.roles.filter(r=>r.id!==role.id);
                saveData();
                renderRoles();
                renderDashboard();
                populateSelects();
            }
        });
        actions.appendChild(delBtn);
        item.appendChild(actions);
        list.appendChild(item);
    });
}

function loadDefaultRoles() {
    const defaultRoles = [
        {name:'Timer',description:'Records swimmer times.',needed:18,exp:'Beginner',train:false},
        {name:'Head Timer',description:'Supervises timers.',needed:1,exp:'Experienced',train:true},
        {name:'Clerk of Course',description:'Organizes swimmers',needed:2,exp:'Intermediate',train:true},
        {name:'Assistant Clerk',description:'Assists Clerk of Course',needed:2,exp:'Beginner',train:false},
        {name:'Announcer',description:'Announces events',needed:1,exp:'Intermediate',train:false},
        {name:'Computer Operator',description:'Runs meet software',needed:1,exp:'Experienced',train:true},
        {name:'Runner',description:'Collects timing sheets',needed:3,exp:'Beginner',train:false},
        {name:'Scorer/Ribbons',description:'Processes results & ribbons',needed:3,exp:'Beginner',train:false},
        {name:'Heat Winner',description:'Awards heat winner ribbons',needed:2,exp:'Beginner',train:false},
        {name:'Concessions Staff',description:'Runs concessions',needed:6,exp:'Beginner',train:false},
        {name:'Hospitality',description:'Provides refreshments',needed:2,exp:'Beginner',train:false},
        {name:'Set Up Crew',description:'Sets up pool area',needed:5,exp:'Beginner',train:false},
        {name:'Clean Up Crew',description:'Breaks down equipment',needed:5,exp:'Beginner',train:false},
        {name:'Safety Marshal',description:'Ensures safety',needed:2,exp:'Intermediate',train:true},
        {name:'Meet Marshal',description:'Maintains deck order',needed:2,exp:'Intermediate',train:true},
        {name:'Referee',description:'Head official',needed:1,exp:'Expert',train:true},
        {name:'Starter',description:'Starts each race',needed:1,exp:'Expert',train:true},
        {name:'Stroke & Turn Judge',description:'Judges strokes & turns',needed:4,exp:'Expert',train:true},
        {name:'Administrative Official',description:'Processes DQs',needed:2,exp:'Experienced',train:true}
    ];
    defaultRoles.forEach(dr=>{
        if (!appData.roles.some(r=>r.name===dr.name)) {
            appData.roles.push({id:uuid(),name:dr.name,description:dr.description,volunteersNeeded:dr.needed,experienceRequired:dr.exp,trainingRequired:dr.train});
        }
    });
}

// Meets CRUD
function setupMeets() {
    $('#add-meet-btn').addEventirement: true