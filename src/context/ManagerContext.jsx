import { createContext, useContext, useEffect, useState } from "react";

const ManagerContext = createContext();
export const useManagers = () => useContext(ManagerContext);

// ⭐ DEMO MANAGER DATA FOR MOBILE FALLBACK
const DEMO_MANAGERS = [
  {
    id: 1,
    employeeId: "MGR001",
    name: "Priya Sharma",
    email: "priya.sharma@company.com",
    phone: "9876543211",
    department: "IT",
    designation: "Manager",
    joiningDate: "2019-01-10",
    salary: 1000000,
    yearsOfExperience: 8,
    status: "Active",
    createdDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  },
];

export const ManagerProvider = ({ children }) => {
  const [managers, setManagers] = useState(() => {
    const saved = localStorage.getItem("managers");
    return saved ? JSON.parse(saved) : DEMO_MANAGERS;
  });

  useEffect(() => {
    localStorage.setItem("managers", JSON.stringify(managers));
  }, [managers]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/managers", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          timeout: 5000,
        });

        if (!res.ok) {
          console.warn("⚠️ Failed to fetch managers from server, using demo data");
          if (managers.length === 0) {
            setManagers(DEMO_MANAGERS);
          }
          return;
        }

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setManagers(data);
        }
      } catch (error) {
        console.warn("❌ Error fetching managers:", error.message);
        // Use demo data as fallback
        if (managers.length === 0) {
          setManagers(DEMO_MANAGERS);
        }
      }
    };

    fetchManagers();
  }, []);

  const addManager = (manager) => {
    setManagers((prev) => [
      ...prev,
      {
        ...manager,
        id: Date.now(),
        employeeId: manager.employeeId || `MGR${Date.now()}`,
        joiningDate: manager.joiningDate || new Date().toISOString().split('T')[0],
        salary: manager.salary || 0,
        yearsOfExperience: manager.yearsOfExperience || 0,
        status: "Active",
        createdDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      },
    ]);
  };

  const toggleStatus = (id) => {
    setManagers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "Active" ? "Inactive" : "Active" }
          : m
      )
    );
  };

  const deleteManager = (id) => {
    setManagers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <ManagerContext.Provider value={{ managers, addManager, toggleStatus, deleteManager }}>
      {children}
    </ManagerContext.Provider>
  );
};
