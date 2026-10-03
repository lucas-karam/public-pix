const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const mediaDir = path.join(__dirname, 'public', 'media');

async function compressImages() {
  if (!fs.existsSync(mediaDir)) return;
  
  const files = fs.readdirSync(mediaDir);
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i) && !file.startsWith('compressed_')) {
      const inputPath = path.join(mediaDir, file);
      const outputPath = path.join(mediaDir, `compressed_${file}`);
      
      try {
        await sharp(inputPath)
          .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 80, progressive: true })
          .toFile(outputPath);
        
        // Replace original with compressed
        fs.unlinkSync(inputPath);
        fs.renameSync(outputPath, inputPath);
        console.log(`Compressed: ${file}`);
      } catch (err) {
        console.error(`Error compressing ${file}:`, err);
      }
    }
  }
}

compressImages();
