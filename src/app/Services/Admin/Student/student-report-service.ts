import { Injectable } from '@angular/core';
import { StudentResDto } from '../../../Interface/studentResDto';


@Injectable({
  providedIn: 'root'
})
export class StudentReportService {
  
   exportToCSV(students: StudentResDto[], fileName: string = 'students-report.csv') {
    if (!students || students.length === 0) {
      console.warn("No student data available to export");
      return;
    }

    // Define headers
    const headers = Object.keys(students[0]);

    // Map students into CSV rows
    const rows = students.map(student =>
      headers.map(header => {
        const value = (student as any)[header];
        if (Array.isArray(value)) {
          return `"${value.join(", ")}"`; // Join arrays
        }
        return `"${value !== null && value !== undefined ? value : ''}"`;
      }).join(",")
    );

    // Combine headers + rows
    const csvContent = [headers.join(","), ...rows].join("\n");

    // Create blob & download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
