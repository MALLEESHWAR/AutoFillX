import express from "express";
import { createServer as createViteServer } from "vite";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // This adds autoTable to jsPDF prototype or as a plugin

const app = express();
const PORT = 3000;

app.use(express.json());

// API Route for PDF Generation
app.post("/api/generate-pdf", async (req, res) => {
  const { template, formData } = req.body;

  if (!template || !formData) {
    return res.status(400).json({ error: "Missing template or formData" });
  }

  try {
    console.log(`[PDF Engine] Synthesizing: ${template.title}`);
    
    // Initialize jsPDF
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    
    // 1. Official Header
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Government of India", pageWidth / 2, 15, { align: "center" });
    doc.text("Citizen Service Center (Seva Kendra)", pageWidth / 2, 22, { align: "center" });
    
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(template.title, pageWidth / 2, 35, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(template.description, pageWidth / 2, 42, { align: "center" });

    doc.setDrawColor(0, 0, 0);
    doc.line(15, 48, pageWidth - 15, 48);

    // 2. Data Table
    const tableData = template.fields.map((field: any) => [
      field.label, 
      formData[field.id] || "Not Provided"
    ]);

    // Use autoTable plugin
    (doc as any).autoTable({
      startY: 55,
      head: [["Field Name", "Value"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [63, 81, 181], textColor: [255, 255, 255], fontStyle: "bold" },
      styles: { fontSize: 10, cellPadding: 4 },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 70 } },
      margin: { left: 15, right: 15 }
    });

    // 3. Footer & Declaration
    const lastTable = (doc as any).lastAutoTable;
    const finalY = lastTable ? lastTable.finalY + 20 : 80;

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Declaration:", 15, finalY);
    doc.setFont("helvetica", "normal");
    doc.text("I hereby confirm that all the information provided above is correct to the best of my knowledge and belief.", 15, finalY + 6, { maxWidth: pageWidth - 30 });

    const sigY = finalY + 40;
    doc.line(15, sigY, 80, sigY);
    doc.text("Signature of Applicant", 15, sigY + 5);
    doc.line(pageWidth - 80, sigY, pageWidth - 15, sigY);
    doc.text("Date and Time", pageWidth - 80, sigY + 5);

    // 4. Finalize & Send
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
    const safeFileName = "Official_Form.pdf";

    // CRITICAL: Production Headers for Forced Download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${safeFileName}"`);
    res.setHeader("Content-Length", pdfBuffer.length);
    res.setHeader("Cache-Control", "no-cache");
    
    res.status(200).send(pdfBuffer);
    console.log("[PDF Engine] Dispatch successful");
  } catch (error) {
    console.error("[PDF Engine] Critical Error:", error);
    res.status(500).json({ error: "Internal Server Error during PDF synthesis" });
  }
});

// Vite middleware for development
if (process.env.NODE_ENV !== "production") {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static("dist"));
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`AutoFillX Server running on http://localhost:${PORT}`);
});
