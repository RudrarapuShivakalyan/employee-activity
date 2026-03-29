import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ActivityContext = createContext();
export const useActivities = () => useContext(ActivityContext);

// ⭐ DEMO ACTIVITIES FOR MOBILE FALLBACK
const DEMO_ACTIVITIES = [
  {
    id: 1,
    employeeName: "Rajesh Kumar",
    department: "IT",
    date: new Date().toISOString().split('T')[0],
    description: "Fixed critical bug in authentication module",
    projectName: "Employee Portal",
    projectDescription: "Internal employee management system",
    projectPhase: "Development",
    hoursWorked: 6,
    projectDeadline: "2026-04-30",
    status: "APPROVED",
    remarks: "Good work on the fix",
  },
  {
    id: 2,
    employeeName: "Rajesh Kumar",
    department: "IT",
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    description: "Code review and testing",
    projectName: "Employee Portal",
    projectDescription: "Internal employee management system",
    projectPhase: "Testing",
    hoursWorked: 4,
    projectDeadline: "2026-04-30",
    status: "APPROVED",
    remarks: "Approved",
  },
];

export const ActivityProvider = ({ children }) => {
  const { user } = useAuth();
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem("activities");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Load activities each time user logs in or changes
  useEffect(() => {
    const loadActivities = async () => {
      if (!user || !user.employeeId) {
        setActivities([]);
        localStorage.removeItem("activities");
        console.log("⏭️ No user logged in — clearing activities");
        return;
      }

      const token = localStorage.getItem("token");

      try {
        console.log("📥 Fetching activities for user:", user.name);
        const response = await fetch(
          `http://localhost:5000/api/employees/activities?employeeId=${encodeURIComponent(user.employeeId)}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            timeout: 5000,
          }
        );

        if (response.status === 401) {
          console.warn("⚠️ Unauthorized - user session may have expired");
          setActivities([]);
          return;
        }

        if (!response.ok) {
          console.warn("⚠️ Activities fetch failed", response.status);
          if (activities.length === 0) {
            setActivities(DEMO_ACTIVITIES);
          }
          return;
        }

        const data = await response.json();
        console.log("✅ Activities loaded:", data.length);
        setActivities(data);
      } catch (error) {
        console.warn("❌ Could not fetch activities from backend:", error.message);
        // Use demo data as fallback
        if (activities.length === 0) {
          setActivities(DEMO_ACTIVITIES);
        }
      }
    };

    loadActivities();
  }, [user]);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const addActivity = ({ employeeName, department, date, description, projectName, projectDescription, projectPhase, hoursWorked, projectDeadline }) => {
    setActivities((prev) => [
      ...prev,
      {
        id: Date.now(),
        employeeName,
        department,
        date,
        description,
        projectName,
        projectDescription,
        projectPhase,
        hoursWorked,
        projectDeadline,
        status: "PENDING",
        remarks: "",
      },
    ]);
  };

  const approveActivity = (id) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "APPROVED" } : a))
    );
  };

  const rejectActivity = (id, remarks) => {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "REJECTED", remarks } : a
      )
    );
  };

  return (
    <ActivityContext.Provider
      value={{ activities, addActivity, approveActivity, rejectActivity }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
