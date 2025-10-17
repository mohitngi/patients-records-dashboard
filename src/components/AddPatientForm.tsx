import { useState } from "react";
import { Patient } from "@/types/patient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface AddPatientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient: (patient: Omit<Patient, "id">) => void;
}

const AddPatientForm = ({ isOpen, onClose, onAddPatient }: AddPatientFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    email: "",
    address: "",
    bloodType: "",
    diagnosis: "",
    medications: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.contact) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newPatient: Omit<Patient, "id"> = {
      name: formData.name,
      age: parseInt(formData.age),
      contact: formData.contact,
      email: formData.email,
      address: formData.address,
      bloodType: formData.bloodType,
      lastVisit: new Date().toISOString().split('T')[0],
      diagnosis: formData.diagnosis,
      medications: formData.medications ? formData.medications.split(',').map(m => m.trim()) : [],
    };

    onAddPatient(newPatient);
    toast.success("Patient added successfully");
    
    setFormData({
      name: "",
      age: "",
      contact: "",
      email: "",
      address: "",
      bloodType: "",
      diagnosis: "",
      medications: "",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="contact">Contact *</Label>
              <Input
                id="contact"
                type="tel"
                value={formData.contact}
                onChange={(e) => {
                  // Only allow numbers and limit to 10 digits
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setFormData({ ...formData, contact: value });
                }}
                onKeyPress={(e) => {
                  // Only allow numbers
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                placeholder="9876543210"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="bloodType">Blood Type</Label>
              <select
                id="bloodType"
                value={formData.bloodType}
                onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select blood type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Input
                id="diagnosis"
                value={formData.diagnosis}
                onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor="medications">Medications (comma-separated)</Label>
            <Textarea
              id="medications"
              value={formData.medications}
              onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
              placeholder="Medicine 1, Medicine 2"
              rows={2}
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Patient</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientForm;
