import { UserProvider } from '@/context/context';
import { Slot } from 'expo-router';

export default function Root() {
  
  return (
      <UserProvider>
        <Slot/>
      </UserProvider> 
  );
}



