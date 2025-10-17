import { useState, useMemo, useEffect } from "react";
import { Patient } from "@/types/patient";
import PatientCard from "@/components/PatientCard";
import PatientDetailsModal from "@/components/PatientDetailsModal";
import AddPatientForm from "@/components/AddPatientForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const diagnoses = [
  "Hypertension",
  "Type 2 Diabetes", 
  "Seasonal Allergies",
  "Asthma",
  "Migraine",
  "Vitamin D Deficiency"
];
const medicationSets = [
  ["Amlodipine 5mg", "Metformin 500mg"],
  ["Cetirizine 10mg", "Fluticasone nasal spray"],
  ["Glimepiride 2mg", "Metformin 1000mg"],
  ["Salbutamol inhaler", "Montelukast 10mg"],
  ["Sumatriptan 50mg", "Propranolol 40mg"],
  ["Vitamin D3 60000 IU weekly"]
];

// Define the shape of the JSON Placeholder user object
interface JsonPlaceholderUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

// Transform JSON Placeholder user data to Patient format
const transformToPatient = (user: JsonPlaceholderUser): Patient => {
  const age = 25 + Math.floor(Math.random() * 40); // Random age 25-65
  const diagnosisIndex = parseInt(user.id) % diagnoses.length;
  
  return {
    id: user.id.toString(),
    name: user.name,
    age,
    contact: user.phone,
    email: user.email,
    address: `${user.address.street}, ${user.address.city}`,
    bloodType: bloodTypes[parseInt(user.id) % bloodTypes.length],
    lastVisit: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    diagnosis: diagnoses[diagnosisIndex],
    medications: medicationSets[diagnosisIndex]
  };
};

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch patients from JSON Placeholder API
  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch patient data');
        }
        
        const users = await response.json();
        const transformedPatients = users.map(transformToPatient);
        setPatients(transformedPatients);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching patients';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Error fetching patients:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    if (!searchQuery.trim()) return patients;
    
    const query = searchQuery.toLowerCase();
    return patients.filter(patient => 
      patient.name.toLowerCase().includes(query) ||
      patient.contact.includes(query) ||
      patient.email.toLowerCase().includes(query)
    );
  }, [patients, searchQuery]);

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailsModalOpen(true);
  };

  const handleAddPatient = (newPatient: Omit<Patient, "id">) => {
    const patient: Patient = {
      ...newPatient,
      id: (patients.length + 1).toString(),
    };
    setPatients([...patients, patient]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading patients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Patient Records</h1>
            <p className="text-muted-foreground">
              Manage and view all patient information
            </p>
          </div>
          
          <Button onClick={() => setIsAddFormOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Patient
          </Button>
        </div>
        
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, contact, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredPatients.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No patients found</p>
          {searchQuery && (
            <Button
              variant="link"
              onClick={() => setSearchQuery("")}
              className="mt-2"
            >
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      <PatientDetailsModal
        patient={selectedPatient}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedPatient(null);
        }}
      />

      <AddPatientForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onAddPatient={handleAddPatient}
      />
    </div>
  );
};

export default Patients;
