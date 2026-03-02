export interface FormField {
  id: string;
  label: string;
  type: "text" | "date" | "select" | "textarea";
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface FormTemplate {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

export const FORM_TEMPLATES: FormTemplate[] = [
  {
    id: "caste-certificate",
    title: "Caste Certificate Application",
    description: "Application for issuance of Caste/Community Certificate.",
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "fatherName", label: "Father's Name", type: "text", required: true },
      { id: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"], required: true },
      { id: "address", label: "Permanent Address", type: "textarea", required: true },
      { id: "idNumber", label: "Aadhaar Number", type: "text", required: true },
      { id: "caste", label: "Caste/Sub-Caste", type: "text", required: true },
    ],
  },
  {
    id: "income-certificate",
    title: "Income Certificate Application",
    description: "Application for assessment of annual family income.",
    fields: [
      { id: "fullName", label: "Applicant Name", type: "text", required: true },
      { id: "fatherName", label: "Father/Husband Name", type: "text", required: true },
      { id: "address", label: "Residential Address", type: "textarea", required: true },
      { id: "idNumber", label: "Identity Proof Number", type: "text", required: true },
      { id: "annualIncome", label: "Total Annual Income (INR)", type: "text", required: true },
      { id: "purpose", label: "Purpose of Certificate", type: "text", required: true },
    ],
  },
  {
    id: "voter-id-new",
    title: "New Voter ID Registration (Form 6)",
    description: "Application for inclusion of name in Electoral Roll.",
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"], required: true },
      { id: "address", label: "Current Address", type: "textarea", required: true },
      { id: "fatherName", label: "Relative's Name (Father/Mother/Spouse)", type: "text", required: true },
    ],
  },
  {
    id: "birth-certificate",
    title: "Birth Certificate Application",
    description: "Application for registration of birth and issuance of certificate.",
    fields: [
      { id: "fullName", label: "Child's Name", type: "text", required: true },
      { id: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"], required: true },
      { id: "fatherName", label: "Father's Name", type: "text", required: true },
      { id: "motherName", label: "Mother's Name", type: "text", required: true },
      { id: "placeOfBirth", label: "Place of Birth (Hospital/Home Address)", type: "textarea", required: true },
      { id: "address", label: "Permanent Address of Parents", type: "textarea", required: true },
    ],
  },
  {
    id: "death-certificate",
    title: "Death Certificate Application",
    description: "Application for registration of death and issuance of certificate.",
    fields: [
      { id: "fullName", label: "Deceased Person's Name", type: "text", required: true },
      { id: "dateOfDeath", label: "Date of Death", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"], required: true },
      { id: "age", label: "Age at Time of Death", type: "text", required: true },
      { id: "placeOfDeath", label: "Place of Death", type: "textarea", required: true },
      { id: "fatherName", label: "Father/Husband Name", type: "text", required: true },
      { id: "address", label: "Permanent Address", type: "textarea", required: true },
    ],
  },
  {
    id: "driving-license",
    title: "Driving License Application (Form 4)",
    description: "Application for issuance of a fresh Driving License.",
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "fatherName", label: "Father/Husband Name", type: "text", required: true },
      { id: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"], required: true },
      { id: "bloodGroup", label: "Blood Group", type: "select", options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], required: true },
      { id: "address", label: "Permanent Address", type: "textarea", required: true },
      { id: "idNumber", label: "Learner's License Number", type: "text", required: true },
      { id: "vehicleType", label: "Class of Vehicle", type: "select", options: ["MCWG", "MCWOG", "LMV", "HMV"], required: true },
    ],
  },
  {
    id: "aadhaar-update",
    title: "Form 1: Aadhaar Enrolment and Update",
    description: "Official form for Aadhaar enrolment and update for residents and NRIs (18+ years).",
    fields: [
      { id: "purpose", label: "Purpose", type: "select", options: ["Enrolment", "Update"], required: true },
      { id: "residentStatus", label: "Resident Status", type: "select", options: ["Resident Indian", "Non-Resident Indian (NRI)"], required: true },
      { id: "idNumber", label: "Aadhaar Number (for Update)", type: "text", required: false },
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Third Gender / Transgender"], required: true },
      { id: "dateOfBirth", label: "Date of Birth (DDMMYYYY)", type: "date", required: true },
      { id: "email", label: "Email ID", type: "text", required: false },
      { id: "mobileNumber", label: "Mobile Number", type: "text", required: true },
      { id: "houseNo", label: "House/Bldg/Flat No.", type: "text", required: true },
      { id: "street", label: "Street/Road/Lane", type: "text", required: false },
      { id: "landmark", label: "Landmark", type: "text", required: false },
      { id: "area", label: "Area/Locality/Sector", type: "text", required: true },
      { id: "village", label: "Village/Town/City", type: "text", required: true },
      { id: "postOffice", label: "Post Office", type: "text", required: true },
      { id: "pinCode", label: "PIN Code", type: "text", required: true },
      { id: "district", label: "District", type: "text", required: true },
      { id: "state", label: "State", type: "text", required: true },
      { id: "updateFields", label: "Information to be Updated", type: "text", placeholder: "e.g. Name, Address, Mobile", required: false },
    ],
  },
  {
    id: "pan-card",
    title: "Form 49A: PAN Card Application",
    description: "Application for allotment of Permanent Account Number (PAN) for Indian Citizens.",
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "fatherName", label: "Father's Name", type: "text", required: true },
      { id: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
      { id: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Transgender"], required: true },
      { id: "idNumber", label: "Aadhaar Number", type: "text", required: true },
      { id: "address", label: "Residential Address", type: "textarea", required: true },
      { id: "phoneNumber", label: "Mobile Number", type: "text", required: true },
      { id: "email", label: "Email ID", type: "text", required: true },
      { id: "sourceOfIncome", label: "Source of Income", type: "select", options: ["Salary", "Business", "Profession", "House Property", "Other"], required: true },
    ],
  },
  {
    id: "passport-fresh",
    title: "Passport Application (Fresh)",
    description: "Application for issuance of a fresh Indian Passport.",
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
      { id: "placeOfBirth", label: "Place of Birth", type: "text", required: true },
      { id: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Transgender"], required: true },
      { id: "maritalStatus", label: "Marital Status", type: "select", options: ["Single", "Married", "Divorced", "Widowed"], required: true },
      { id: "fatherName", label: "Father's Name", type: "text", required: true },
      { id: "motherName", label: "Mother's Name", type: "text", required: true },
      { id: "address", label: "Present Residential Address", type: "textarea", required: true },
      { id: "idNumber", label: "Aadhaar Number", type: "text", required: true },
      { id: "employmentType", label: "Employment Type", type: "select", options: ["Government", "Private", "Self Employed", "Student", "Retired", "Homemaker"], required: true },
    ],
  },
  {
    id: "ration-card",
    title: "New Ration Card Application",
    description: "Application for issuance of a new Ration Card (NFSA/Non-NFSA).",
    fields: [
      { id: "fullName", label: "Head of Family Name", type: "text", required: true },
      { id: "fatherName", label: "Father/Husband Name", type: "text", required: true },
      { id: "address", label: "Residential Address", type: "textarea", required: true },
      { id: "idNumber", label: "Aadhaar Number of Head", type: "text", required: true },
      { id: "numberOfMembers", label: "Total Number of Family Members", type: "text", required: true },
      { id: "annualIncome", label: "Total Annual Family Income", type: "text", required: true },
      { id: "category", label: "Category", type: "select", options: ["BPL", "APL", "AAY"], required: true },
      { id: "gasConnection", label: "LPG Connection Status", type: "select", options: ["Yes", "No"], required: true },
    ],
  },
  {
    id: "marriage-certificate",
    title: "Marriage Registration Application",
    description: "Application for registration of marriage and issuance of certificate.",
    fields: [
      { id: "husbandName", label: "Husband's Full Name", type: "text", required: true },
      { id: "wifeName", label: "Wife's Full Name", type: "text", required: true },
      { id: "dateOfMarriage", label: "Date of Marriage", type: "date", required: true },
      { id: "placeOfMarriage", label: "Place of Marriage", type: "textarea", required: true },
      { id: "husbandDob", label: "Husband's Date of Birth", type: "date", required: true },
      { id: "wifeDob", label: "Wife's Date of Birth", type: "date", required: true },
      { id: "husbandAddress", label: "Husband's Address", type: "textarea", required: true },
      { id: "wifeAddress", label: "Wife's Address", type: "textarea", required: true },
      { id: "witness1", label: "Witness 1 Name", type: "text", required: true },
      { id: "witness2", label: "Witness 2 Name", type: "text", required: true },
    ],
  },
];
