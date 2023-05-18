import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class GeneratePdfService {
  constructor() {}

  public exportPDF(head: Array<string[]>, data: any[], name: string) {
    const doc = new jsPDF('l', 'mm', 'a4');

    data = data.map((obj: any) => {
      return Object.keys(obj).map((key: string) => {
        if (key === 'students') {
          obj[key] = obj[key].map((student: any) => {
            return Object.keys(student).map((key: string) => {
              return student[key];
            });
          });
        }
        return obj[key];
      });
    });

    autoTable(doc, {
      body: data,
      head: head,
    });

    doc.save(name + '.pdf');
  }
}
