import { UserProvider } from '@/hooks/context';
import { ClerkProvider,ClerkLoaded  } from '@clerk/clerk-expo';
import { Redirect, Slot } from 'expo-router';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}


export default function Root() {
 
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
        <UserProvider>
          <Slot/>
        </UserProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}