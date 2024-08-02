import { UserProvider } from '@/hooks/context';
import { ClerkProvider, } from '@clerk/clerk-expo';
import { Slot } from 'expo-router';

export default function Root() {
console.log("inicio")
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string 
  
  return (
   
    <ClerkProvider publishableKey={publishableKey}>
      <UserProvider>
        <Slot/>
      </UserProvider> 
    </ClerkProvider>
    
  );
}



