import { UserData, UserProvider } from '@/hooks/context';
import { ClerkProvider, useAuth, useUser  } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router, Slot } from 'expo-router';
import { useEffect, useState } from 'react';


function InitialLayout(){
  console.log("vai pro Initial Layout")
  const {isSignedIn,isLoaded} = useAuth();
  console.log("is SignedIn é "+ isSignedIn)
  console.log("is Loaded é "+ isLoaded)
  const [userData,setUserData] = useState<UserData>()
  const {user} = useUser()
  console.log("User é "+ user?.firstName)
  
  
    if(!isLoaded) return
    if(isSignedIn){
      if(user){
        const loggedUser: UserData = {
          email: user.primaryEmailAddress?.emailAddress,
          family_name: user.lastName,
          given_name: user.username,
          id: user.id,
          name: user.firstName,
          picture: user.imageUrl,
          verified_email: user.hasVerifiedEmailAddress
        };
        AsyncStorage.setItem("@user",JSON.stringify(loggedUser));
        router.replace("/");
      }
    }
  
  console.log("vai pra Slot")
  return <Slot/>
}


export default function Root() {

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string 
  console.log("vai pro Root")
  
  return (
   
    <ClerkProvider publishableKey={publishableKey}>
      <UserProvider>
        <InitialLayout/>
      </UserProvider> 
    </ClerkProvider>
    
  );
}



