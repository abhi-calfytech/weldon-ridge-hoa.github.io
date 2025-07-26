# Create the clean HTML template for GitHub upload
html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>HOA Volunteer Management System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
    <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
    <style>
        :root {
            --primary-color: #1f7a8c;
            --secondary-color: #022b3a;
            --accent-color: #e1f5fe;
            --text-color: #2c3e50;
            --success-color: #27ae60;
            --warning-color: #f39c12;
            --danger-color: #e74c3c;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
            color: var(--text-color);
        }

        .navbar {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            padding: 1rem 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .navbar-brand {
            color: white !important;
            font-weight: bold;
            font-size: 1.5rem;
        }

        .nav-pills .nav-link {
            color: white;
            margin: 0 0.25rem;
            border-radius: 25px;
            transition: all 0.3s ease;
        }

        .nav-pills .nav-link.active,
        .nav-pills .nav-link:hover {
            background-color: rgba(255,255,255,0.2);
            transform: translateY(-2px);
        }

        .main-content {
            padding: 2rem 0;
            min-height: 80vh;
        }

        .section {
            display: none;
        }

        .section.active {
            display: block;
            animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .stat-card {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            transition: transform 0.3s ease;
            border-left: 5px solid var(--primary-color);
        }

        .stat-card:hover {
            transform: translateY(-5px);
        }

        .stat-number {
            font-size: 3rem;
            font-weight: bold;
            color: var(--primary-color);
            margin: 1rem 0;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border: none;
            border-radius: 25px;
            padding: 0.75rem 2rem;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(31, 122, 140, 0.4);
        }

        .card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            transition: transform 0.3s ease;
        }

        .card:hover {
            transform: translateY(-3px);
        }

        .card-header {
            background: linear-gradient(135deg, var(--accent-color), white);
            border-bottom: 2px solid var(--primary-color);
            border-radius: 15px 15px 0 0 !important;
            font-weight: bold;
        }

        .qr-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }

        .qr-card {
            background: white;
            border-radius: 10px;
            padding: 1rem;
            text-align: center;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }

        .qr-canvas {
            max-width: 150px;
            height: auto;
            margin: 0.5rem 0;
        }

        .scanner-container {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .volunteer-item {
            background: white;
            border-radius: 10px;
            padding: 1rem;
            margin-bottom: 1rem;
            box-shadow: 0 3px 10px rgba(0,0,0,0.05);
            border-left: 4px solid var(--primary-color);
        }

        .meet-item {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            box-shadow: 0 3px 10px rgba(0,0,0,0.05);
            border-left: 4px solid var(--success-color);
        }

        .form-control:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 0.2rem rgba(31, 122, 140, 0.25);
        }

        .alert-custom {
            border-radius: 10px;
            border: none;
            padding: 1rem 1.5rem;
        }

        .table-custom {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .badge-custom {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
        }

        .progress-custom {
            height: 25px;
            border-radius: 15px;
            background-color: #ecf0f1;
        }

        .progress-bar-custom {
            background: linear-gradient(135deg, var(--success-color), #2ecc71);
            border-radius: 15px;
        }

        @media (max-width: 768px) {
            .stat-number {
                font-size: 2rem;
            }
            
            .qr-grid {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <span class="navbar-brand">🏊‍♀️ HOA Volunteer Manager</span>
            <ul class="nav nav-pills ms-auto">
                <li class="nav-item">
                    <button class="nav-link active" data-section="dashboard">Dashboard</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" data-section="meets">Meets</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" data-section="volunteers">Volunteers</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" data-section="qr-codes">QR Codes</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" data-section="scanner">Scanner</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" data-section="portal">My Portal</button>
                </li>
            </ul>
        </div>
    </nav>

    <main class="main-content">
        <!-- Dashboard Section -->
        <section id="dashboard" class="section active">
            <div class="container">
                <h1 class="mb-4">Admin Dashboard</h1>
                <div class="row mb-4">
                    <div class="col-md-3 mb-3">
                        <div class="stat-card">
                            <h5>Total Volunteers</h5>
                            <div class="stat-number" id="total-volunteers">0</div>
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <div class="stat-card">
                            <h5>Upcoming Meets</h5>
                            <div class="stat-number" id="upcoming-meets">0</div>
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <div class="stat-card">
                            <h5>Positions Filled</h5>
                            <div class="stat-number" id="positions-filled">0</div>
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <div class="stat-card">
                            <h5>Check-ins Today</h5>
                            <div class="stat-number" id="checkins-today">0</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Recent Activity</h5>
                            </div>
                            <div class="card-body">
                                <div id="recent-activity">
                                    <p class="text-muted">No recent activity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Quick Actions</h5>
                            </div>
                            <div class="card-body">
                                <button class="btn btn-primary mb-2 w-100" onclick="showSection('meets'); showAddMeetForm();">Add New Meet</button>
                                <button class="btn btn-primary mb-2 w-100" onclick="showSection('volunteers'); showAddVolunteerForm();">Add New Volunteer</button>
                                <button class="btn btn-primary w-100" onclick="exportData();">Export Data</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Meets Section -->
        <section id="meets" class="section">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h1>Swim Meets</h1>
                    <button class="btn btn-primary" onclick="showAddMeetForm()">Add New Meet</button>
                </div>

                <div id="add-meet-form" style="display: none;" class="card mb-4">
                    <div class="card-header">
                        <h5>Add New Meet</h5>
                    </div>
                    <div class="card-body">
                        <form id="meetForm">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Meet Name *</label>
                                    <input type="text" class="form-control" name="meetName" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Date *</label>
                                    <input type="date" class="form-control" name="meetDate" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Start Time *</label>
                                    <input type="time" class="form-control" name="meetTime" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Location *</label>
                                    <input type="text" class="form-control" name="meetLocation" required>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Description</label>
                                <textarea class="form-control" name="meetDescription" rows="3"></textarea>
                            </div>
                            <div class="d-flex gap-2">
                                <button type="submit" class="btn btn-primary">Save Meet</button>
                                <button type="button" class="btn btn-secondary" onclick="hideAddMeetForm()">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div id="meets-list">
                    <p class="text-muted">No meets scheduled yet. Click "Add New Meet" to get started.</p>
                </div>
            </div>
        </section>

        <!-- Volunteers Section -->
        <section id="volunteers" class="section">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h1>Volunteer Management</h1>
                    <button class="btn btn-primary" onclick="showAddVolunteerForm()">Add New Volunteer</button>
                </div>

                <div id="add-volunteer-form" style="display: none;" class="card mb-4">
                    <div class="card-header">
                        <h5>Add New Volunteer</h5>
                    </div>
                    <div class="card-body">
                        <form id="volunteerForm">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">First Name *</label>
                                    <input type="text" class="form-control" name="firstName" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Last Name *</label>
                                    <input type="text" class="form-control" name="lastName" required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Email *</label>
                                    <input type="email" class="form-control" name="email" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Phone</label>
                                    <input type="tel" class="form-control" name="phone">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Experience Level</label>
                                <select class="form-control" name="experience">
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="experienced">Experienced</option>
                                </select>
                            </div>
                            <div class="d-flex gap-2">
                                <button type="submit" class="btn btn-primary">Save Volunteer</button>
                                <button type="button" class="btn btn-secondary" onclick="hideAddVolunteerForm()">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div id="volunteers-list">
                    <p class="text-muted">No volunteers registered yet. Click "Add New Volunteer" to get started.</p>
                </div>
            </div>
        </section>

        <!-- QR Codes Section -->
        <section id="qr-codes" class="section">
            <div class="container">
                <h1 class="mb-4">QR Codes</h1>
                
                <div class="card mb-4">
                    <div class="card-header">
                        <h5>Generate QR Codes</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Select Meet</label>
                                <select class="form-control" id="qr-meet-select">
                                    <option value="">Choose a meet...</option>
                                </select>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Select Volunteer</label>
                                <select class="form-control" id="qr-volunteer-select">
                                    <option value="">Choose a volunteer...</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label class="form-label">Select Position</label>
                                <select class="form-control" id="qr-position-select">
                                    <option value="">Choose a position...</option>
                                </select>
                            </div>
                        </div>
                        <button class="btn btn-primary" onclick="generateQRCode()">Generate QR Code</button>
                        <button class="btn btn-secondary ms-2" onclick="generateAllQRCodes()">Generate All QR Codes</button>
                    </div>
                </div>

                <div id="qr-display">
                    <p class="text-muted">Select meet, volunteer, and position to generate QR codes.</p>
                </div>
            </div>
        </section>

        <!-- Scanner Section -->
        <section id="scanner" class="section">
            <div class="container">
                <h1 class="mb-4 text-center">QR Code Scanner</h1>
                
                <div class="scanner-container">
                    <div id="reader" style="width: 100%;"></div>
                    <div class="text-center mt-3">
                        <button id="start-scan-btn" class="btn btn-primary" onclick="startScanning()">Start Scanning</button>
                        <button id="stop-scan-btn" class="btn btn-danger" onclick="stopScanning()" style="display: none;">Stop Scanning</button>
                    </div>
                </div>

                <div id="scan-result" class="mt-4" style="display: none;">
                    <div class="card">
                        <div class="card-header bg-success text-white">
                            <h5 class="mb-0">✅ Check-in Successful!</h5>
                        </div>
                        <div class="card-body">
                            <div id="scan-details"></div>
                            <button class="btn btn-primary mt-3" onclick="resetScanner()">Scan Another Code</button>
                        </div>
                    </div>
                </div>

                <div class="card mt-4">
                    <div class="card-header">
                        <h5>Recent Check-ins</h5>
                    </div>
                    <div class="card-body">
                        <div id="recent-checkins">
                            <p class="text-muted">No check-ins yet today.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- My Portal Section -->
        <section id="portal" class="section">
            <div class="container">
                <h1 class="mb-4">My Portal</h1>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="card mb-4">
                            <div class="card-header">
                                <h5>Add Person to Portal</h5>
                            </div>
                            <div class="card-body">
                                <form id="portalPersonForm">
                                    <div class="mb-3">
                                        <label class="form-label">First Name *</label>
                                        <input type="text" class="form-control" name="firstName" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Last Name *</label>
                                        <input type="text" class="form-control" name="lastName" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Email *</label>
                                        <input type="email" class="form-control" name="email" required>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Add Person</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5>Portal Members</h5>
                            </div>
                            <div class="card-body">
                                <div id="portal-members-list">
                                    <p class="text-muted">No members added to portal yet.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mt-4">
                    <div class="card-header">
                        <h5>My Assignments</h5>
                    </div>
                    <div class="card-body">
                        <div id="my-assignments">
                            <p class="text-muted">No volunteer assignments yet.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <script src="app.js"></script>
</body>
</html>'''

# Save to file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("✅ index.html created successfully!")
print("File size:", len(html_content), "characters")