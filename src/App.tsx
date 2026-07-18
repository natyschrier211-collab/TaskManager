import Router from "./router/Router";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { ProjectThemeProvider } from "./providers/ProjectThemeProvider";
import { SnackProvider } from "./providers/SnackProvider";
import { UserProvider } from "./providers/UserProvider";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


const queryClient = new QueryClient();
function App() {
  return (
    <>
  
<QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <SnackProvider>
      <UserProvider>
        <ProjectThemeProvider>
          <Layout>
            <Router />
          </Layout>
        </ProjectThemeProvider>
      </UserProvider>
    </SnackProvider>
  </BrowserRouter>
</QueryClientProvider>
    </>
  );
}

export default App;
