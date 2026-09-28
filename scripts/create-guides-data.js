import fs from 'fs';
import path from 'path';

const guidesDir = path.join(process.cwd(), 'public', 'guides');
const files = fs.readdirSync(guidesDir).filter(f => f.endsWith('.html') && f !== 'index.html').sort();

const list = files.map(file => {
  const content = fs.readFileSync(path.join(guidesDir, file), 'utf8');
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  let title = titleMatch ? titleMatch[1].replace(' - Sejda', '').replace(' - Sejda PDF & Document Intelligence', '').replace(' - Sejda PDF &amp; Document Intelligence', '') : file;
  const descMatch = content.match(/<meta name="description" content="(.*?)">/);
  const description = descMatch ? descMatch[1] : '';
  const text = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = text.split(' ').length;

  let category = 'Optimization & Standards';
  let toolId = 'compress';

  if (file.includes('sign') || file.includes('legal') || file.includes('form') || file.includes('mobile')) {
    category = 'Signatures & Forms';
    toolId = 'fill_sign';
  } else if (file.includes('security') || file.includes('password') || file.includes('redact') || file.includes('watermark') || file.includes('drm') || file.includes('metadata')) {
    category = 'Security & Encryption';
    toolId = 'protect';
  } else if (file.includes('merge') || file.includes('split') || file.includes('rotate') || file.includes('edit') || file.includes('bates')) {
    category = 'Editing & Assembly';
    toolId = file.includes('merge') ? 'merge' : (file.includes('split') ? 'split' : 'edit');
  } else if (file.includes('ocr') || file.includes('table') || file.includes('ai') || file.includes('handwriting') || file.includes('api')) {
    category = 'AI Intelligence & OCR';
    toolId = 'ai_chat';
  } else if (file.includes('jpg') || file.includes('compress') || file.includes('color') || file.includes('web') || file.includes('flatten') || file.includes('repair') || file.includes('pdf-a') || file.includes('accessib')) {
    category = 'Optimization & Archival';
    toolId = 'compress';
  }

  return {
    slug: file,
    title,
    description,
    category,
    wordCount: `${wordCount} Words`,
    url: `/guides/${file}`,
    toolId
  };
});

const tsContent = `export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  wordCount: string;
  url: string;
  toolId: string;
}

export const ALL_GUIDES: GuideArticle[] = ${JSON.stringify(list, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'guidesData.ts'), tsContent, 'utf8');
console.log(`Generated src/data/guidesData.ts with ${list.length} articles.`);
