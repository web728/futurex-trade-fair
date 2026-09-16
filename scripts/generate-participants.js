const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const PARTICIPANTS_DIR = path.join(PUBLIC_DIR, 'gallery/participants');
const OUTPUT_FILE = path.join(__dirname, '../src/data/auto-participants.json');

// Map actual folder names (including mixed case) to clean UI Categories
const categoryFolderMapping = {
  'our-partners': 'Our Partners',
  'supporting-association': 'Supporting Associations',
  'participants': 'Participants',
  'our-associates': 'Our Associates',
  'Our-Associates': 'Our Associates' // Exact match for your folder name
};

function getCategoryFromPath(filePath) {
  // Check path segments to precisely match folder names
  const lowerPath = filePath.toLowerCase();
  if (lowerPath.includes('our-associates')) return 'Our Associates';
  if (lowerPath.includes('our-partners')) return 'Our Partners';
  if (lowerPath.includes('supporting-association')) return 'Supporting Associations';
  if (lowerPath.includes('participants')) return 'Participants';
  
  return 'Participants';
}

function walkDir(currentDir, fileList = []) {
  if (!fs.existsSync(currentDir)) return fileList;
  const files = fs.readdirSync(currentDir);
  
  files.forEach(file => {
    const fullPath = path.join(currentDir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'].includes(ext)) {
        const relativeToPublic = path.relative(PUBLIC_DIR, fullPath);
        const webPath = '/' + relativeToPublic.split(path.sep).join('/');
        fileList.push(webPath);
      }
    }
  });

  return fileList;
}

function generateParticipantsData() {
  if (!fs.existsSync(PARTICIPANTS_DIR)) {
    console.error('❌ Participants directory not found at:', PARTICIPANTS_DIR);
    return;
  }

  console.log('🔍 Scanning participants directory for logos...');
  const allLogoPaths = walkDir(PARTICIPANTS_DIR);
  
  const participantItems = allLogoPaths.map((logoPath, index) => {
    const category = getCategoryFromPath(logoPath);
    const fileName = path.basename(logoPath, path.extname(logoPath))
      .replace(/[-_]/g, ' ')
      .replace(/\.[^/.]+$/, '');

    return {
      id: `auto-part-${index + 1}`,
      name: fileName.charAt(0).toUpperCase() + fileName.slice(1),
      category: category,
      logo: logoPath
    };
  });

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(participantItems, null, 2));
  console.log(`✅ Successfully mapped ${participantItems.length} participant logos into src/data/auto-participants.json`);
}

generateParticipantsData();