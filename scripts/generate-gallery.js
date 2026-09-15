const fs = require('fs');
const path = require('path');

// Safe paths regardless of where the script is run from
const PUBLIC_DIR = path.join(__dirname, '../public');
const GALLERY_DIR = path.join(PUBLIC_DIR, 'gallery');
const OUTPUT_FILE = path.join(__dirname, '../src/data/auto-gallery.json');

// Map folder names to clean UI Categories
const categoryMapping = {
  'media-coverage': 'Media Coverage',
  'conference': 'Conference',
  'webinars': 'Webinar',
  'webinar': 'Webinar',
  'virtual-platform': 'Virtual Platform',
  '2d': 'Virtual Platform',
  '3d': 'Virtual Platform',
  'exhibition': 'Exhibitions',
  'exhibitions': 'Exhibitions',
  'exhibition22': 'Exhibitions',
  'pictures': 'Exhibitions'
};

// Intelligently find the category based on the folder path
function getCategoryFromPath(filePath) {
  const lowerPath = filePath.toLowerCase();
  for (const [key, cat] of Object.entries(categoryMapping)) {
    if (lowerPath.includes(key)) return cat;
  }
  return 'Exhibitions'; // Fallback
}

function walkDir(currentDir, fileList = []) {
  const files = fs.readdirSync(currentDir);
  
  files.forEach(file => {
    const fullPath = path.join(currentDir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath, fileList);
    } else {
      // Allow valid image extensions
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
        
        // SAFE: Cross-platform relative path generation (handles Windows "\" to Web "/")
        const relativeToPublic = path.relative(PUBLIC_DIR, fullPath);
        const webPath = '/' + relativeToPublic.split(path.sep).join('/');
        
        fileList.push(webPath);
      }
    }
  });

  return fileList;
}

function generateGalleryData() {
  if (!fs.existsSync(GALLERY_DIR)) {
    console.error('❌ Public gallery directory not found at:', GALLERY_DIR);
    return;
  }

  console.log('🔍 Scanning gallery directory for images...');
  const allImagePaths = walkDir(GALLERY_DIR);
  
  const galleryItems = allImagePaths.map((imgPath, index) => {
    const category = getCategoryFromPath(imgPath);
    
    // Clean up filename to use as title (removes hyphens, underscores, and extension)
    const fileName = path.basename(imgPath, path.extname(imgPath))
      .replace(/[-_]/g, ' ')
      .replace(/\.[^/.]+$/, '');

    return {
      id: `auto-img-${index + 1}`,
      category: category,
      title: fileName.charAt(0).toUpperCase() + fileName.slice(1),
      image: imgPath
    };
  });

  // Ensure output directory exists before writing
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(galleryItems, null, 2));
  console.log(`✅ Successfully mapped ${galleryItems.length} images into src/data/auto-gallery.json`);
}

generateGalleryData();