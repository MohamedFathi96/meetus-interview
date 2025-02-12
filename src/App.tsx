import { Outlet } from "@tanstack/react-router";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import "@mantine/core/styles.css";
import { AuthProvider } from "./stores/auth";

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
