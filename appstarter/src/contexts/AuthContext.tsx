import { createContext, useContext, ReactNode, useState } from 'react';

type User = {
  id?: string;
  email?: string;
} | null;

type AuthContextType = {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  // These functions are just placeholders and don't actually do anything
  // since the user only needs the UI without actual authentication for now
  const signIn = async (email: string, password: string) => {
    console.log('Sign in placeholder called with:', email);
    // Not setting user so the login UI will continue to show
  };

  const signOut = async () => {
    console.log('Sign out placeholder called');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}