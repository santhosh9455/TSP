export interface StudentResDto {
  id: number;
  age: number;
  gender: string;
  email: string;
  phoneNumber: string;
  departmentName: string;
  departmentId: number;
  courseStatus: string;
  status: string;
  courseName: string;
  courseId: number;
  profileImagePath?: string; // Optional, as not all students may have a profile image
  marksheetImagePath12th?: string; // Optional
  subjectId: number[];
  subjectName: string[];
  username: string;
  dateOfBirth: string | Date; // Use string if API returns ISO date, Date if parsed
  city: string;
  pincode: string;
  district: string;
  admissionDate: string | Date; // Renamed for consistency (snake_case to camelCase)
  guardianName: string;
  guardianPhone: string;
  createdAt: string | Date; // Renamed for consistency
  updatedAt: string | Date; // Renamed for consistency
  enrollmentStatus: string;
  ugCertificate?: string; // Optional, as not all students may have this
  firstName: string;
  lastName: string;
  programmeLevel: string;
  aadharNumber: string;
  fatherName: string;
  fatherMobile: string;
  fatherOccupation: string;
  motherName: string;
  motherMobile: string;
  motherOccupation: string;
  street: string;
  taluk: string;
  schoolName: string;
  hostelBusService?: string; // Optional, as not all students may use this
  boardingPoint?: string; // Optional
  marksheetImagePath10th?: string; // Optional
  yearOfStudy: string;
}