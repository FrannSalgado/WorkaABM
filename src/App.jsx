import { AuthProvider } from "./context/AuthContext";
import AppRounter from "./routers/AppRounter";

function App() {
  return (
    <AuthProvider>
      <AppRounter />
    </AuthProvider>
  );
}

export default App;
