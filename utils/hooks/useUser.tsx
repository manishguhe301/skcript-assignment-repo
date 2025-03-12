import { User } from '@prisma/client';
import { useState, useEffect } from 'react';

export const useUser = () => {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener('storage', loadUser);

    return () => {
      window.removeEventListener('storage', loadUser);
    };
  }, []);

  const saveUser = (userData: Omit<User, 'password'>) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));

    window.dispatchEvent(new Event('storage'));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
  };

  return { user, saveUser, logout };
};
