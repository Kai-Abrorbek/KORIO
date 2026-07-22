import * as fs from 'fs';
import * as path from 'path';

const DIR = path.join(__dirname, 'data/section2');

// Fisher-Yates
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

for (const file of fs.readdirSync(DIR).filter((f) => f.startsWith('unit'))) {
  const p = path.join(DIR, file);
  let src = fs.readFileSync(p, 'utf8');

  // choices: [{...}, {...}] 블록 셔플
  src = src.replace(/choices: \[([\s\S]*?)\n(\s*)\]/g, (m, body, indent) => {
    const items = body.split(/\},\s*\n/).filter((s: string) => s.trim());
    if (items.length < 2) return m;
    const cleaned = items.map(
      (s: string) => s.trim().replace(/,$/, '').replace(/\}$/, '') + ' }',
    );
    return `choices: [\n${indent}  ${shuffle(cleaned).join(`,\n${indent}  `)},\n${indent}]`;
  });

  // options: ['a', 'b', ...] 셔플
  src = src.replace(/options: \[([^\]]*?)\]/g, (m, body) => {
    const items = body
      .split(',')
      .map((s: string) => s.trim())
      .filter(Boolean);
    if (items.length < 2) return m;
    return `options: [${shuffle(items).join(', ')}]`;
  });

  fs.writeFileSync(p, src);
  console.log(`✅ ${file}`);
}
