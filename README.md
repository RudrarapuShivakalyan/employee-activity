 # Employee Activity Management System 

This is a role-based Employee Activity Management System built using "React", "Tailwind CSS", and "LocalStorage".  
It allows Admins, Managers, and Employees to track and manage daily work activities efficiently.

---

# Features

# Authentication
- Login with **Name, Password, Department, and Role**
- Password-based authentication for secure login
- Roles supported:
  - Admin
  - Manager
  - Employee
- User data is stored permanently in `localStorage` and synced via SQLite database
- Cross-PC data synchronization for edits and activities

---

# Employee
- View own profile
- Add daily activity
- View activity history
- See approval status:
  - Pending
  - Approved
  - Rejected
- View manager remarks if rejected

---

# Manager
- View activities only from own department
- Approve or reject employee activities
- Add rejection remarks

---

# Admin
- View all employee activities
- Filter by:
  - Department
  - Status
- Pagination
- Employee Management:
  - View all Admins, Managers, and Employees
  - Search by name or department
  - Filter by role
  - Edit name, department, role, and status

---

# Employee Data Fields

The system includes comprehensive employee profiles with **48 detailed fields** across multiple categories:

## 📋 Complete Field Categories

### Basic Information (8 fields)
- **ID**: Unique numeric identifier
- **Employee ID**: Unique organizational identifier (EMP001, EMP002, etc.)
- **Name**: Full legal name
- **Email**: Company email address
- **Job Title**: Professional position/specialization
- **Department**: IT, HR, Sales, Finance, Support, Marketing
- **Role**: Employee/Manager/Administrator
- **Status**: Active/Inactive employment status

### Personal Information (8 fields)
- **Date of Birth**: YYYY-MM-DD format
- **Gender**: Male/Female/Non-binary/Prefer not to say
- **Marital Status**: Single/Married/Divorced/Widowed
- **Phone**: Primary contact number (+91-XXXXXXXXXX)
- **Emergency Phone**: Emergency contact number
- **Personal Email**: Personal email address
- **Current Address**: Present residential address
- **Permanent Address**: Permanent residential address

### Employment Information (6 fields)
- **Joining Date**: Official employment start date
- **Employment Type**: Full-time/Part-time/Contract
- **Manager**: Direct reporting manager name
- **Probation Period**: Length in months
- **Years of Experience**: Total professional experience
- **Contract End Date**: For contract employees (if applicable)

### Compensation & Benefits (5 fields)
- **Salary**: Monthly/annual compensation (₹)
- **Pay Frequency**: Monthly/Bi-weekly/Weekly
- **Benefits**: Health Insurance, Dental, Provident Fund, Paid Time Off, etc.
- **Tax ID**: Tax identification number (masked for security)
- **Bank Account**: Banking information (masked for security)

### Education & Professional Experience (4 fields)
- **Highest Qualification**: Bachelor's/Master's/PhD with field of study
- **Certifications**: Professional certifications list
- **Previous Employers**: Employment history
- **Skills**: Technical and professional competencies

### Emergency Contact (2 fields)
- **Emergency Contact Name**: Emergency contact person
- **Emergency Contact Relation**: Relationship to employee

### System & Access (4 fields)
- **Access Level**: Employee/Manager/Super Admin
- **Permissions**: Array of access permissions
- **Created Date**: Record creation timestamp
- **Last Updated**: Last modification timestamp

### Project Details (6 fields) ⭐
- **Project Name**: Current assigned project
- **Project Phase**: Development/Testing/Deployment/Maintenance
- **Project Description**: Project scope and objectives
- **Total Hours Worked**: Cumulative hours on project
- **Project Deadline**: Scheduled completion date
- **Project Status**: On Track/Delayed/Completed

### Activity History (5 fields) ⭐
- **Date**: Activity log date
- **Project Name**: Associated project
- **Description**: Activity details
- **Hours**: Hours worked on activity
- **Status**: Approved/Pending/Rejected

---

## 👥 Employee Database

The system includes **30 total members** with complete profiles:
- **20 Employees** across 6 departments
- **5 Managers** with team management capabilities
- **5 Admins** with system-wide access

### Department Distribution
- **IT Department**: 6 members (Frontend, Backend, DevOps, Cloud, etc.)
- **HR Department**: 3 members (Recruitment, Training, OD)
- **Sales Department**: 3 members (Executive, Account Manager, Enterprise)
- **Finance Department**: 3 members (Analyst, Risk Analyst, Accountant)
- **Support Department**: 2 members (Technical Support, Customer Service)
- **Marketing Department**: 3 members (Digital Marketing, Content, Analytics)

---

## 🔍 Advanced Features

- **Comprehensive Search**: Search by name, department, job title
- **Role-Based Access**: Different permissions for Employee/Manager/Admin
- **Activity Tracking**: Daily activity logging with approval workflow
- **Project Management**: Project assignment and progress tracking
- **Real-time Updates**: Live activity status and manager feedback
- **Data Security**: Masked sensitive information (bank accounts, tax IDs)

---

## 🛠 Technology Stack

- **Frontend**: React 19, Tailwind CSS 4, React Router
- **Backend**: Node.js, Express.js
- **Database**: LocalStorage (with JSON data files)
- **Build Tool**: Vite
- **Package Manager**: npm

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Access Application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 📁 Project Structure

```
employee_activity_management_system/
├── src/                    # React frontend source
├── backend/               # Node.js backend
├── data/                  # JSON data files
├── public/                # Static assets
└── package.json          # Dependencies and scripts
```

---

# Data Persistence
- All users, employees, and activities are stored in localStorage
- Data is preserved even after logout or refresh

---

# Tech Stack

- React
- React Router
- Context API
- Tailwind CSS
- LocalStorage

---

# How to Run the Project

## Prerequisites
- Node.js (v16 or higher)
- npm (Node Package Manager)

## Running Both Frontend and Backend

### Option 1: Run Frontend Only (Using LocalStorage)
```bash
cd c:\Users\SHIVA\OneDrive\Desktop\employee_activity_management_system-main
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`

### Option 2: Run Frontend and Backend (Recommended)

**Terminal 1 - Start Backend:**
```bash
node "c:\Users\SHIVA\OneDrive\Desktop\employee_activity_management_system-main\backend\server.js"
```
Backend API runs on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd c:\Users\SHIVA\OneDrive\Desktop\employee_activity_management_system-main
npm run dev
```
Frontend runs on `http://localhost:5173`

### Option 3: Test Backend API via Terminal

```bash
# Health check
Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing

# Get all employees
Invoke-WebRequest -Uri "http://localhost:5000/api/employees" -UseBasicParsing

# Get all managers
Invoke-WebRequest -Uri "http://localhost:5000/api/managers" -UseBasicParsing

# Get all admins
Invoke-WebRequest -Uri "http://localhost:5000/api/admins" -UseBasicParsing
```

---

# Backend API Endpoints

## Employee Endpoints
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get specific employee
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/employees/stats/overview` - Get employee statistics

## Manager Endpoints
- `GET /api/managers` - Get all managers
- `GET /api/managers/:id` - Get specific manager
- `POST /api/managers` - Create new manager
- `PUT /api/managers/:id` - Update manager
- `DELETE /api/managers/:id` - Delete manager
- `GET /api/managers/:id/employees` - Get employees under a manager

## Admin Endpoints
- `GET /api/admins` - Get all admins
- `GET /api/admins/:id` - Get specific admin
- `POST /api/admins` - Create new admin
- `PUT /api/admins/:id` - Update admin
- `DELETE /api/admins/:id` - Delete admin
- `GET /api/admins/stats/system` - Get system statistics

## Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user
- `POST /api/auth/change-password` - Change password
- `GET /api/auth/verify` - Verify JWT token

---

# System Users Details

## Employees (20 total)
| Name | Job Title | Department |
|------|-----------|------------|
| Aditya Kapoor | Full Stack Lead Developer | IT |
| Amit Sharma | Senior Backend Developer | IT |
| Anjali Verma | HR Training Coordinator | HR |
| Arjun Mehta | Senior Finance Analyst | Finance |
| Divya Nair | Technical Support Specialist | Support |
| Karan Yadav | Junior Frontend Developer | IT |
| Kavita Rao | Customer Support Technician | Support |
| Manoj Thakur | Enterprise Account Executive | Sales |
| Meera Joshi | Digital Marketing Specialist | Marketing |
| Nisha Agarwal | Account Manager | Sales |
| Pooja Tiwari | Investment Risk Analyst | Finance |
| Priya Singh | HR Recruitment Specialist | HR |
| Rajesh Kumar | Frontend Developer | IT |
| Ravi Jain | Backend Infrastructure Engineer | IT |
| Ritu Pandey | Organizational Development Specialist | HR |
| Rohit Saxena | DevOps Engineer | IT |
| Sandeep Chauhan | Content Producer | Marketing |
| Sneha Patel | Cloud Solutions Architect | IT |
| Swati Mishra | Junior Accountant | Finance |
| Vikram Gupta | Senior Sales Executive | Sales |

## Managers (5 total)
| Name | Job Title | Department |
|------|-----------|------------|
| David Brown | HR Manager | HR |
| John Manager | Finance Manager | Finance |
| Lisa Davis | Sales Director | Sales |
| Michael Operations | Operations Manager | Support |
| Sarah Wilson | IT Department Manager | IT |

## Admins (5 total)
| Name | Job Title | Department |
|------|-----------|------------|
| Christopher Database | Database Administrator | IT |
| Emily Rodriguez | HR Administrator | HR |
| James Security | Security Administrator | IT |
| Patricia Accounts | Finance Administrator | Finance |
| Robert Chen | Chief Information Security Officer | IT |

## System Statistics
- **Total Users**: 30
- **Employees**: 20 (across IT, HR, Finance, Support, Sales, Marketing)
- **Managers**: 5 (one per department)
- **Admins**: 5 (administrative roles)

---

# Test Credentials (Password: `pass123` for all users)

## 🔐 Admin Test Accounts
| Name | Department | Password | Access Level |
|------|-----------|----------|---|
| Robert Chen | IT | pass123 | Super Admin |
| Emily Rodriguez | HR | pass123 | HR Admin |
| James Security | IT | pass123 | Security Admin |
| Patricia Accounts | Finance | pass123 | Finance Admin |
| Christopher Database | IT | pass123 | DB Admin |

## 👔 Manager Test Accounts
| Name | Department | Password | Team Size |
|------|-----------|----------|---|
| Sarah Wilson | IT | pass123 | 12 members |
| David Brown | HR | pass123 | 8 members |
| Lisa Davis | Sales | pass123 | 10 members |
| John Manager | Finance | pass123 | 6 members |
| Michael Operations | Support | pass123 | 14 members |

## 👥 Employee Test Accounts (Sample)
| Name | Department | Job Title | Password |
|------|-----------|---|---|
| Amit Sharma | IT | Senior Backend Developer | pass123 |
| Rajesh Kumar | IT | Frontend Developer | pass123 |
| Priya Singh | HR | HR Recruitment Specialist | pass123 |
| Rahul Verma | Finance | Senior Finance Analyst | pass123 |
| Vikram Singh | Sales | Senior Sales Executive | pass123 |

**Note**: All 20 employees use the same password pattern: `pass123`

---

# Feature Highlights

## 1. Activity Tracking
- Employees log daily work hours and project activities
- Managers review and approve/reject activities with remarks
- Admins can view all activities across departments
- Activity history persists across PC logins via SQLite

## 2. Employee Profile Management
- 48-field comprehensive employee profiles
- Personal, employment, education, and skills information
- Admin-only edit capability (employees see read-only profiles)
- Real-time data sync across multiple PCs

## 3. Loan Management System
- Employees can apply for loans with auto-populated details
- Admin approval/rejection workflow with remarks
- Complete application history with status tracking
- Database persistence for loan records

## 4. Role-Based Access Control
- **Employee**: View own profile (read-only), add activities, apply for loans
- **Manager**: Approve/reject activities from own department
- **Admin**: Full system access, employee management, loan approvals
- Protected routes prevent unauthorized access

## 5. Data Persistence
- SQLite database as primary data store
- LocalStorage as secondary backup
- Automatic sync on login
- Edit changes sync across all logged-in devices

---
