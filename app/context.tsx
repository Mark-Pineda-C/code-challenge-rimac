import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface UserData {
  documentType: string;
  documentNumber: string;
  phone: string;
  name: string;
  lastname: string;
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
    lastname: string;
    age: number;
  }) => void;
  setPlanData: (data: {
    selectedPlanName: string;
    selectedPlanCost: number;
  }) => void;
  clearUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'userData';

const initialUserData: UserData = {
  documentType: '',
  documentNumber: '',
  phone: '',
  name: '',
  lastname: '',
  age: 0,
  selectedPlanName: '',
  selectedPlanCost: 0,
};

// Función para cargar datos desde localStorage
const loadUserDataFromStorage = (): UserData => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Validar que los datos tengan la estructura correcta
      return {
        documentType: parsedData.documentType || '',
        documentNumber: parsedData.documentNumber || '',
        phone: parsedData.phone || '',
        name: parsedData.name || '',
        lastname: parsedData.lastname || '',
        age: parsedData.age || 0,
        selectedPlanName: parsedData.selectedPlanName || '',
        selectedPlanCost: parsedData.selectedPlanCost || 0,
      };
    }
  } catch (error) {
    console.error('Error al cargar datos desde localStorage:', error);
  }
  return initialUserData;
};

// Función para guardar datos en localStorage
const saveUserDataToStorage = (userData: UserData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Error al guardar datos en localStorage:', error);
  }
};

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useState<UserData>(loadUserDataFromStorage);

  // Efecto para guardar datos en localStorage cuando cambien
  useEffect(() => {
    saveUserDataToStorage(userData);
  }, [userData]);

  const setPersonalData = (data: {
    documentType: string;
    documentNumber: string;
    phone: string;
    name: string;
    lastname: string;
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

  const clearUserData = () => {
    setUserData(initialUserData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error al limpiar datos del localStorage:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userData, setPersonalData, setPlanData, clearUserData }}>
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
