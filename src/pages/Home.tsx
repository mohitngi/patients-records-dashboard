import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Users, Shield, Clock } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Activity className="h-4 w-4" />
            <span>Healthcare Management System</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to Jarurat Care
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your healthcare practice with our comprehensive patient records management system. 
            Secure, efficient, and designed for modern healthcare professionals.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/patients">
              <Button size="lg" className="text-lg px-8">
                View Patients
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Patient Management</h3>
                <p className="text-muted-foreground">
                  Comprehensive patient records with detailed medical history, contact information, and treatment plans.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                <p className="text-muted-foreground">
                  Your patient data is protected with industry-standard security measures and privacy protocols.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Access</h3>
                <p className="text-muted-foreground">
                  Find patient information instantly with powerful search and filtering capabilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
