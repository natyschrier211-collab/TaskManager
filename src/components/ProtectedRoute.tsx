import { Navigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import ROUTES from "../router/routes";
import { Box, CircularProgress } from "@mui/material";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user ,isAuthLoading} = useUser();
if (isAuthLoading) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
}

export default ProtectedRoute;