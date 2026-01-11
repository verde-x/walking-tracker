import { createContext, useContext, ReactNode } from 'react';
import { useWalking } from '@/hooks/useWalking';

type WalkingContextType = ReturnType<typeof useWalking>;

const WalkingContext = createContext<WalkingContextType | null>(null);

export function WalkingProvider({ children }: { children: ReactNode }) {
  const walking = useWalking();
  return (
    <WalkingContext.Provider value={walking}>
      {children}
    </WalkingContext.Provider>
  );
}

export function useWalkingContext() {
  const context = useContext(WalkingContext);
  if (!context) {
    throw new Error('useWalkingContext must be used within a WalkingProvider');
  }
  return context;
}
