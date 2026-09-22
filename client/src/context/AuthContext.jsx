import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const DEMO_USERS = {
  guest: {
    id: "usr_guest_01",
    name: "Sophia Laurent",
    email: "sophia.laurent@wanderlust.com",
    role: "guest",
    roleTitle: "Traveler / Guest",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
    tripsCount: 3,
    savedCount: 5,
    joinDate: "Jan 2024"
  },
  host: {
    id: "usr_host_01",
    name: "Eleni Vassiliou",
    email: "eleni.host@wanderlust.com",
    role: "host",
    roleTitle: "Verified Superhost",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
    listingsCount: 4,
    totalEarnings: 28450,
    rating: 4.98,
    joinDate: "Mar 2021"
  },
  admin: {
    id: "usr_admin_01",
    name: "Himanshu",
    email: "admin@wanderlust.com",
    role: "admin",
    roleTitle: "Platform SuperAdmin",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80",
    managedProperties: 8,
    platformRevenue: 148900,
    joinDate: "Dec 2020"
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("wanderlust_auth_user");
      return saved ? JSON.parse(saved) : DEMO_USERS.guest;
    } catch {
      return DEMO_USERS.guest;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("wanderlust_auth_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("wanderlust_auth_user");
    }
  }, [currentUser]);

  const quickLogin = (roleKey) => {
    const user = DEMO_USERS[roleKey] || DEMO_USERS.guest;
    setCurrentUser(user);
    toast.success(`Welcome, ${user.name}! Logged in as ${user.roleTitle}. 🌟`);
    setIsAuthModalOpen(false);
  };

  const login = (email, password, role = "guest") => {
    const user = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      role,
      roleTitle: role === "host" ? "Verified Host" : role === "admin" ? "Administrator" : "Traveler",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80",
      joinDate: "Just now"
    };
    setCurrentUser(user);
    toast.success(`Signed in as ${user.name} (${user.roleTitle})`);
    setIsAuthModalOpen(false);
  };

  const register = (name, email, password, role = "guest") => {
    const user = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role,
      roleTitle: role === "host" ? "Verified Host" : role === "admin" ? "Administrator" : "Traveler",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80",
      joinDate: "Just now"
    };
    setCurrentUser(user);
    toast.success(`Account created! Welcome to WanderLust, ${name}! 🎉`);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("wanderlust_auth_user");
    toast("Logged out of WanderLust", { icon: "👋" });
  };

  const switchRole = (newRole) => {
    if (currentUser) {
      const updated = {
        ...currentUser,
        role: newRole,
        roleTitle: newRole === "host" ? "Verified Superhost" : newRole === "admin" ? "Platform Administrator" : "Traveler / Guest"
      };
      setCurrentUser(updated);
      toast.success(`Switched role to ${updated.roleTitle} 🔄`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        role: currentUser?.role || "guest",
        isHost: currentUser?.role === "host" || currentUser?.role === "admin",
        isAdmin: currentUser?.role === "admin",
        login,
        register,
        logout,
        quickLogin,
        switchRole,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
