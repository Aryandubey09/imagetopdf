const { PDFDocument } = require("pdf-lib");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// ✅ Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const imageToPdf = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of files) {
      try {
        // Convert any image format to PNG
        const imgBuffer = await sharp(file.path).png().toBuffer();
        const img = await pdfDoc.embedPng(imgBuffer);

        const page = pdfDoc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      } catch (err) {
        console.error("Sharp/image error:", err);
        return res.status(400).json({ success: false, message: "Unsupported image format" });
      }
    }

    // Save PDF in uploads folder
    const outputFileName = `output-${Date.now()}.pdf`;
    const outputPath = path.join(uploadDir, outputFileName);
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);

  
    const baseUrl = "https://imagetopdf-1.onrender.com" || "http://localhost:5000";
    return res.json({ success: true, downloadUrl: `${baseUrl}/uploads/${outputFileName}` });
  } catch (err) {
    console.error("PDF creation error:", err);
    return res.status(500).json({ success: false, message: "Error creating PDF" });
  }
};

module.exports = { imageToPdf };
