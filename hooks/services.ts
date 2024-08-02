

 // const googleUser =await AsyncStorage.getItem('@user');
    //     if (loadedToken) {setToken(loadedToken)} 
    //     if (googleUser){setUserData(JSON.parse(googleUser))}


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

// const [request,response,promtAsync] = Google.useAuthRequest({
//     webClientId: '71316409857-njqh33dpopsa6c6thqioviehcp7dfcn8.apps.googleusercontent.com',
//     androidClientId: '71316409857-0vd4n2dem72jqf3rh247ggbq8733686v.apps.googleusercontent.com'
//   });


//   useEffect(() => {
//     console.log("ativou useEffect do loadStorage")
//     loadStorageData();
//   }, []);
  
// async signInWithGoogleOnWeb(){
//     promtAsync()
//   },


//   useEffect(()=>{
//     console.log("ativou o useEffect do handleSignIn Web")
//     handleSignInWithGoogleOnWeb(response)
//   },[response])

//   

//   async function handleSignInWithGoogleOnWeb(response:AuthSessionResult | null){
//     if(response?.type ==="success"){
//       if(!response.authentication?.accessToken) return;
//       try{
//         await Api.get("https://www.googleapis.com/userinfo/v2/me",{
//           headers:{Authorization:`Bearer ${response.authentication.accessToken}`},
//         })
//         .then((resp) =>{
//           AsyncStorage.setItem("@user",JSON.stringify(resp.data));
//           setUserData(resp.data);
//           router.replace('/')
//         })  
//       }catch(error){console.log(error)}
//     }else{}



// signOutonWeb:() =>{
//     setToken("");
//     setUserData(undefined)
//     AsyncStorage.removeItem('@AuthData');
//     AsyncStorage.removeItem('@user')
//     router.replace('/')
//   },

//   token,isLoading,userData