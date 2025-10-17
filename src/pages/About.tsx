import { Card, CardContent } from "@/components/ui/card";
import { Activity, Heart, Target, Award } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Activity className="h-4 w-4" />
          <span>About Us</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Jarurat Care</h1>
        <p className="text-xl text-muted-foreground">
          Revolutionizing Healthcare Management
        </p>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Jarurat Care is a comprehensive patient records management system designed to streamline 
              healthcare operations for modern medical practices. Our platform combines intuitive design 
              with powerful functionality to help healthcare professionals provide better patient care.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We understand the critical importance of efficient patient data management in healthcare. 
              That's why we've built a system that prioritizes security, accessibility, and ease of use, 
              allowing healthcare providers to focus on what matters most – their patients.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-muted-foreground">
              To provide healthcare professionals with the tools they need to deliver exceptional 
              patient care through efficient and secure data management.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <p className="text-muted-foreground">
              Privacy, security, and user experience are at the core of everything we do. 
              We're committed to protecting patient data while making it easily accessible.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality First</h3>
            <p className="text-muted-foreground">
              Built with modern technologies and best practices to ensure reliability, 
              performance, and scalability for healthcare organizations of all sizes.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              Continuously evolving our platform with the latest healthcare technology standards 
              and user feedback to meet the changing needs of medical practices.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
