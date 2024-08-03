
// async function signInWithGoogleOnMobile(){

//     WebBrowser.maybeCompleteAuthSession()

//     useEffect(()=>{
//         WebBrowser.warmUpAsync()
//         return () => {
//             WebBrowser.coolDownAsync()       
//         }
//     },[])

//     const googleOAuth = useOAuth({strategy:'oauth_google'})
//     try {
//         const redirectURL = Linking.createURL('/')
//         const oAuthFlow = await googleOAuth.startOAuthFlow({redirectUrl:redirectURL})
//         console.log("aqui eu cheguei")
//         if(oAuthFlow.authSessionResult?.type === "success"){
//             if(oAuthFlow.setActive){
//             await oAuthFlow.setActive({session:oAuthFlow.createdSessionId}) 
//             }     
//         } 
//     } catch (error) {console.log(error)} 
// }



  
   



// signOutonWeb:() =>{
//     setToken("");
//     setUserData(undefined)
//     AsyncStorage.removeItem('@AuthData');
//     AsyncStorage.removeItem('@user')
//     router.replace('/')
//   },

//   token,isLoading,userData