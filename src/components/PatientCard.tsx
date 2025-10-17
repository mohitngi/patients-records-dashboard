import { Patient } from "@/types/patient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, User, Calendar, Phone } from "lucide-react";

interface PatientCardProps {
  patient: Patient;
  onViewDetails: (patient: Patient) => void;
}

const PatientCard = ({ patient, onViewDetails }: PatientCardProps) => {

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer"
      onClick={() => onViewDetails(patient)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-primary" />
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                {patient.name}
              </h3>
              
              <div className="space-y-1 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{patient.age} years old</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="truncate">{patient.contact}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
