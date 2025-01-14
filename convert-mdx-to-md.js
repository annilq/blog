import { readFileSync, writeFileSync, readdirSync, statSync, unlinkSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const postsDir = join(__dirname, 'public/posts');

function convertMdxToMd(dir) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      convertMdxToMd(filePath);
    } else if (extname(file) === '.mdx') {
      const content = readFileSync(filePath, 'utf8');
      const newFilePath = filePath.replace(/\.mdx$/, '.md');
      
      writeFileSync(newFilePath, content);
      unlinkSync(filePath);
      console.log(`Converted ${filePath} to ${newFilePath}`);
    }
  });
}

convertMdxToMd(postsDir);
