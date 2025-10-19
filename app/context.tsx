import { createContext, useContext, useState, type ReactNode } from 'react';

interface UserData {
  documentType: string;
  documentNumber: string;
  phone: string;
  name: string;
  age: number;
  selectedPlanName: string;
  selectedPlanCost: number;
}

interface UserContextType {
  userData: UserData;
  setPersonalData: (data: {
    documentType: string;
    documentNumber: string;
    phone: string;
    name: string;
    age: number;
  }) => void;
  setPlanData: (data: {
    selectedPlanName: string;
    selectedPlanCost: number;
  }) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialUserData: UserData = {
  documentType: '',
  documentNumber: '',
  phone: '',
  name: '',
  age: 0,
  selectedPlanName: '',
  selectedPlanCost: 0,
};

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useState<UserData>(initialUserData);

  const setPersonalData = (data: {
    documentType: string;
    documentNumber: string;
    phone: string;
    name: string;
    age: number;
  }) => {
    setUserData(prev => ({
      ...prev,
      ...data,
    }));
  };

  const setPlanData = (data: {
    selectedPlanName: string;
    selectedPlanCost: number;
  }) => {
    setUserData(prev => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <UserContext.Provider value={{ userData, setPersonalData, setPlanData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
}
