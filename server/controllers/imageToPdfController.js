const { PDFDocument } = require("pdf-lib");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const File = require("../models/File");

const imageToPdf = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const pdfDoc = await PDFDocument.create();

    for (let file of files) {
     
      const imgBuffer = await sharp(file.path).jpeg().toBuffer();

      const img = await pdfDoc.embedJpg(imgBuffer);
      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }

    
    const outPath = path.join(__dirname, "../uploads/output.pdf");
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outPath, pdfBytes);

    res.json({
      success: true,
      downloadUrl: `http://localhost:5000/uploads/output.pdf`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error creating PDF" });
  }
};

module.exports = { imageToPdf };
