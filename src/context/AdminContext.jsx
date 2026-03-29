import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext();
export const useAdmins = () => useContext(AdminContext);

// ⭐ DEMO ADMIN DATA FOR MOBILE FALLBACK
const DEMO_ADMINS = [
  {
    id: 1,
    employeeId: "ADM001",
    name: "System Admin",
    email: "admin@company.com",
    phone: "9876543200",
    department: "Administration",
    designation: "System Administrator",
    joiningDate: "2018-01-01",
    salary: 1200000,
    yearsOfExperience: 10,
    status: "Active",
    createdDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  },
];

export const AdminProvider = ({ children }) => {
  const [admins, setAdmins] = useState(() => {
    const saved = localStorage.getItem("admins");
    return saved ? JSON.parse(saved) : DEMO_ADMINS;
  });

  useEffect(() => {
    localStorage.setItem("admins", JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/admins", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          timeout: 5000,
        });

        if (!res.ok) {
          console.warn("⚠️ Failed to fetch admins from server, using demo data");
          if (admins.length === 0) {
            setAdmins(DEMO_ADMINS);
          }
          return;
        }

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setAdmins(data);
        }
      } catch (error) {
        console.warn("❌ Error fetching admins:", error.message);
        // Use demo data as fallback
        if (admins.length === 0) {
          setAdmins(DEMO_ADMINS);
        }
      }
    };

    fetchAdmins();
  }, []);

  const addAdmin = (admin) => {
    setAdmins((prev) => [
      ...prev,
      {
        ...admin,
        id: Date.now(),
        employeeId: admin.employeeId || `ADM${Date.now()}`,
        joiningDate: admin.joiningDate || new Date().toISOString().split('T')[0],
        salary: admin.salary || 0,
        yearsOfExperience: admin.yearsOfExperience || 0,
        status: "Active",
        createdDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      },
    ]);
  };

  const toggleStatus = (id) => {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "Active" ? "Inactive" : "Active" }
          : a
      )
    );
  };

  const deleteAdmin = (id) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AdminContext.Provider value={{ admins, addAdmin, toggleStatus, deleteAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
