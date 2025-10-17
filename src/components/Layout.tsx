import { Link, useLocation } from "react-router-dom";
import { Activity } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 font-semibold text-xl text-primary">
              <Activity className="h-6 w-6" />
              <span>Jarurat Care</span>
            </Link>
            
            <div className="flex gap-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                to="/patients"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/patients") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Patients
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/about") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main>{children}</main>
    </div>
  );
};

export default Layout;
