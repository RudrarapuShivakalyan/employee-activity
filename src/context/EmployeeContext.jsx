import { createContext, useContext, useEffect, useState } from "react";

const EmployeeContext = createContext();
export const useEmployees = () => useContext(EmployeeContext);

// ⭐ DEMO EMPLOYEE DATA FOR MOBILE FALLBACK
const DEMO_EMPLOYEES = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@company.com",
    department: "IT",
    designation: "Senior Developer",
    joiningDate: "2020-03-15",
    salary: 750000,
    yearsOfExperience: 5,
    status: "Active",
    phone: "9876543210",
    manager: "Priya Sharma",
    gender: "Male",
    dateOfBirth: "1995-06-20",
    address: "Bangalore, Karnataka",
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Priya Sharma",
    email: "priya.sharma@company.com",
    department: "IT",
    designation: "Manager",
    joiningDate: "2019-01-10",
    salary: 1000000,
    yearsOfExperience: 8,
    status: "Active",
    phone: "9876543211",
    manager: "Admin",
    gender: "Female",
    dateOfBirth: "1992-04-15",
    address: "Bangalore, Karnataka",
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Amit Patel",
    email: "amit.patel@company.com",
    department: "HR",
    designation: "HR Specialist",
    joiningDate: "2021-05-20",
    salary: 600000,
    yearsOfExperience: 3,
    status: "Active",
    phone: "9876543212",
    manager: "Priya Sharma",
    gender: "Male",
    dateOfBirth: "1998-09-10",
    address: "Bangalore, Karnataka",
  },
];

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("employees");
    return saved ? JSON.parse(saved) : DEMO_EMPLOYEES;
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/employees", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          timeout: 5000,
        });

        if (!res.ok) {
          console.warn("⚠️ Failed to fetch employees from server, using demo data");
          if (employees.length === 0) {
            setEmployees(DEMO_EMPLOYEES);
          }
          return;
        }

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setEmployees(data);
        }
      } catch (error) {
        console.warn("❌ Error fetching employees:", error.message);
        // Use demo data as fallback
        if (employees.length === 0) {
          setEmployees(DEMO_EMPLOYEES);
        }
      }
    };

    fetchEmployees();
  }, []);

  const addEmployee = (emp) => {
    setEmployees((prev) => [
      ...prev,
      {
        ...emp,
        id: Date.now(),
        employeeId: emp.employeeId || `EMP${Date.now()}`,
        joiningDate: emp.joiningDate || new Date().toISOString().split('T')[0],
        salary: emp.salary || 0,
        yearsOfExperience: emp.yearsOfExperience || 0,
        status: "Active",
        createdDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        // Personal Information
        dateOfBirth: emp.dateOfBirth || '',
        gender: emp.gender || '',
        maritalStatus: emp.maritalStatus || '',
        phone: emp.phone || '',
        emergencyPhone: emp.emergencyPhone || '',
        personalEmail: emp.personalEmail || '',
        address: emp.address || '',
        permanentAddress: emp.permanentAddress || '',
        // Employment Details
        employmentType: emp.employmentType || 'Full-time',
        manager: emp.manager || '',
        probationPeriod: emp.probationPeriod || 3,
        contractEndDate: emp.contractEndDate || '',
        // Compensation & Benefits
        payFrequency: emp.payFrequency || 'Monthly',
        benefits: emp.benefits || [],
        taxId: emp.taxId || '',
        bankAccount: emp.bankAccount || '',
        // Education & Experience
        highestQualification: emp.highestQualification || '',
        certifications: emp.certifications || [],
        previousEmployers: emp.previousEmployers || [],
        skills: emp.skills || [],
        // Emergency Contact
        emergencyContactName: emp.emergencyContactName || '',
        emergencyContactRelation: emp.emergencyContactRelation || '',
        // System
        accessLevel: emp.accessLevel || 'Employee',
        permissions: emp.permissions || ['basic_access']
      },
    ]);
  };

  const toggleStatus = (id) => {
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, status: e.status === "Active" ? "Inactive" : "Active" }
          : e
      )
    );
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, toggleStatus }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
