import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FormTemplate } from "../constants";

/**
 * Generates and triggers a download for an official verified PDF.
 * Styled to match the official Government of India / Seva Kendra format.
 */
export const generateOfficialPDF = (
  template: FormTemplate,
  formData: Record<string, string>
) => {
  console.log("AutoFillX: Synthesizing Official PDF for", template.title);
  
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // 1. Official Header
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text("Government of India", pageWidth / 2, 15, { align: "center" });
    doc.text("Citizen Service Center (Seva Kendra)", pageWidth / 2, 22, { align: "center" });
    
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(template.title, pageWidth / 2, 35, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(template.description, pageWidth / 2, 42, { align: "center" });

    // 2. Divider Line
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(15, 48, pageWidth - 15, 48);

    // 3. Data Table
    const tableData = template.fields.map((field) => [
      field.label, 
      formData[field.id] || "Not Provided"
    ]);

    autoTable(doc, {
      startY: 55,
      head: [["Field Name", "Value"]],
      body: tableData,
      theme: "grid",
      headStyles: { 
        fillColor: [63, 81, 181], // Indigo/Blue
        textColor: [255, 255, 255], 
        fontSize: 11,
        fontStyle: 'bold',
        cellPadding: 4
      },
      styles: { 
        fontSize: 10, 
        cellPadding: 4, 
        font: "helvetica",
        lineColor: [200, 200, 200],
        lineWidth: 0.1
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 70 },
        1: { cellWidth: "auto" },
      },
      margin: { left: 15, right: 15 }
    });

    // 4. Declaration Section
    const lastTable = (doc as any).lastAutoTable;
    let finalY = lastTable ? lastTable.finalY + 20 : 80;

    if (finalY > pageHeight - 60) {
      doc.addPage();
      finalY = 20;
    }

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Declaration:", 15, finalY);
    doc.setFont("helvetica", "normal");
    doc.text(
      "I hereby confirm that all the information provided above is correct to the best of my knowledge and belief.",
      15,
      finalY + 6,
      { maxWidth: pageWidth - 30 }
    );

    // 5. Signature Section
    const sigY = finalY + 40;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    
    // Left Signature
    doc.line(15, sigY, 80, sigY);
    doc.setFontSize(9);
    doc.text("Signature of Applicant", 15, sigY + 5);

    // Right Signature
    doc.line(pageWidth - 80, sigY, pageWidth - 15, sigY);
    doc.text("Date and Time", pageWidth - 80, sigY + 5);
    
    // Add current timestamp below right signature
    doc.setFontSize(8);
    const now = new Date();
    const timestamp = now.toLocaleString();
    doc.text(timestamp, pageWidth - 80, sigY + 10);

    // 6. Robust Download Trigger
    const fileName = `${template.id.replace(/[^a-z0-9]/gi, '_')}_official_form.pdf`;
    
    try {
      console.log("AutoFillX: Generating PDF Blob...");
      const blob = doc.output("blob");
      const url = window.URL.createObjectURL(blob);
      
      // Create a hidden link
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.download = fileName;
      
      // Append to body
      document.body.appendChild(link);
      
      // Force click
      console.log("AutoFillX: Triggering download via link click...");
      link.click();
      
      // Fallback: If the link click is silently ignored (common in some iframes),
      // we also try to open the URL in a new window/tab.
      // We do this after a short delay to not interfere with the download if it started.
      setTimeout(() => {
        try {
          // Only attempt window.open if we're still in the same context
          // and the user might need a secondary way to see the PDF.
          window.open(url, '_blank');
          console.log("AutoFillX: Secondary window.open triggered as fallback");
        } catch (e) {
          console.warn("AutoFillX: Secondary window.open fallback failed", e);
        }
        
        // Cleanup
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        // We don't revoke immediately to allow the window.open to work
        setTimeout(() => window.URL.revokeObjectURL(url), 10000);
      }, 500);

      // Also try the standard save as a third parallel attempt
      try {
        doc.save(fileName);
        console.log("AutoFillX: doc.save() also executed");
      } catch (e) {
        console.warn("AutoFillX: Parallel doc.save() failed", e);
      }

      return true;
    } catch (e) {
      console.error("AutoFillX: Primary download methods failed", e);
      // Method 3: Data URI as absolute last resort
      try {
        const dataUri = doc.output('datauristring');
        window.location.href = dataUri;
        return true;
      } catch (dataUriError) {
        console.error("AutoFillX: Emergency fallback failed", dataUriError);
        throw new Error("All PDF download methods failed. Please check browser permissions.");
      }
    }
  } catch (error) {
    console.error("AutoFillX: PDF Synthesis Error", error);
    throw error;
  }
};
