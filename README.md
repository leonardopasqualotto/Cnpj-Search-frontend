<h1 align="center" style="font-weight: bold;">Cnpj Search - Frontend 💻</h1>

![Typescript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://shields.io/badge/react-black?logo=react&style=for-the-badge)
<img alt="Build with EAS" src="https://img.shields.io/badge/Build-000.svg?style=for-the-badge&logo=EXPO&labelColor=000&logoColor=FFF">

<p align="center"

<a href="#overview">Overview</a> • 
<a href="#arquitecture">Arquitecture</a> • 
<a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> 

</p>

<h2 id="overview">🔎 Overview </h2>

This is a frontend for CNPJ'S Search project developed with <b>TypeScript</b>, <b>React Native</b> and <b>Expo</b>. The application allows login with Google, Facebook or via  API connected to  <a href="https://github.com/leonardopasqualotto/Cnpj-Search-backend">CNPJ Search - Backend</a>.

<h2 id="architecture">📐 Project Structure </h2>

The project structure was designed according to the responsibilities of each files. This is how the folders were defined:

- <b>_Assets_</b>: Static image and icon files, representing non-dynamic sources.

- <b>_Components_</b>: Decoupled components that can be reused across app screens. 

- <b> _Context_</b>:  Responsible for managing the global state of the application using the Context API hook. `AuthContext.tsx` manages authentication and logged-in user state (token, user data, Facebook data, Google data, CNPJ, etc.).

- <b> _Utils_</b>: Utility functions such as data formatting (`format.ts`) and  `interfaces.ts` used in the context of typescript. It also contains the baseURL that connects (via axios) the API with the backend.

<h2 id="tech">💻 Technologies</h2>

<h4>TYPESCRIPT</h4> <img src="assets/images/Typescript.png" alt="React" width="30"/>
<h4>REACT NATIVE</h4><img src="assets/images/react-logo.png" alt="React" width="30"/> 
<h4>EXPO</h4><img src="assets/images/expo-go.png" alt="React" width="30"/> 
<h4>AXIOS</h4><img src="assets/images/axios.png" alt="React" width="30"/> 


<h2 id="started">🚀 Getting started</h2>

Here you describe how to run your project locally

<h3>Prerequisites</h3>

1) Clone and run the ETL process from repository [Dados_Publicos_CNPJ](https://github.com/leonardopasqualotto/Receita_Federal_do_Brasil_-_Dados_Publicos_CNPJ)

1) Clone and run  [CNPJ Search - Backend](https://github.com/leonardopasqualotto/Cnpj-Search-backend)

<h3>Starting</h3>

1) ```git clone https://github.com/leonardopasqualotto/Cnpj-Search-frontend```

2) Install dependencies

   ```bash
   npm install
   ```

3) Start the app

   ```bash
    npx expo start
   ```
