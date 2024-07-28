import { UserProvider } from '@/hooks/context';
import { Redirect, Slot } from 'expo-router';

export default function Root() {
 
  return (
    <UserProvider>
        <Slot  />
    </UserProvider>
  );
}