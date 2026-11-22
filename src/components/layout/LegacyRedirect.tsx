import { Navigate, useLocation } from "react-router-dom";

/** Przekierowanie starego adresu na nowy — z zachowaniem query i kotwicy, bez wpisu w historii. */
const LegacyRedirect = ({ to }: { to: string }) => {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: to, search, hash }} replace />;
};

export default LegacyRedirect;
