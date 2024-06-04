import AuthProvider from "./api/AuthProvider";
import SignIn from "./components/Signin";

function App() {
  return (
    <AuthProvider>
      <SignIn />
    </AuthProvider>
  );
}

export default App;
