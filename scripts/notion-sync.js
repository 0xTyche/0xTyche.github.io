const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');
const fs = require('fs');
const path = require('path');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

const DATABASE_ID = process.env.NOTION_DATABASE_ID;
const POSTS_DIR = path.join(__dirname, '..', '_posts');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[一-龥]+/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 40) || 'note';
}

function extractText(richTextArr) {
  if (!Array.isArray(richTextArr)) return '';
  return richTextArr.map(t => t.plain_text).join('');
}

function stripEmoji(str) {
  return str.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
}

async function fetchAllPages() {
  const pages = [];
  let cursor;
  do {
    const res = await notion.databases.query({
      database_id: DATABASE_ID,
      start_cursor: cursor,
      page_size: 100,
      sorts: [{ timestamp: 'created_time', direction: 'descending' }],
    });
    pages.push(...res.results);
    cursor = res.next_cursor;
  } while (cursor);
  return pages;
}

async function main() {
  if (fs.existsSync(POSTS_DIR)) {
    for (const file of fs.readdirSync(POSTS_DIR)) {
      if (file !== '.gitkeep') {
        fs.unlinkSync(path.join(POSTS_DIR, file));
      }
    }
  } else {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  const pages = await fetchAllPages();
  console.log(`Found ${pages.length} pages in Notion database`);

  for (const page of pages) {
    const props = page.properties;

    const task = extractText(props.Task?.title) || 'Untitled';

    const classSelect = props.Classification?.select?.name;
    const classMulti = (props.Classification?.multi_select || []).map(s => s.name).join(', ');
    const classification = classSelect || classMulti || '';

    const lastDate = props['Last Date']?.date?.start
      || page.created_time.split('T')[0];

    const priority = stripEmoji(props.Priority?.select?.name || '');
    const status = props.Status?.status?.name || props.Status?.select?.name || '';

    let bodyContent = '';
    try {
      const mdBlocks = await n2m.pageToMarkdown(page.id);
      bodyContent = n2m.toMarkdownString(mdBlocks).parent || '';
    } catch (e) {
      console.warn(`  ! Could not fetch body for "${task}": ${e.message}`);
    }

    const slug = slugify(task);
    const filename = `${lastDate}-${slug}.md`;
    const filepath = path.join(POSTS_DIR, filename);

    const frontmatter = [
      '---',
      `layout: post`,
      `title: "${task.replace(/"/g, '\\"')}"`,
      `date: ${lastDate}`,
      classification ? `classification: "${classification}"` : null,
      priority ? `priority: "${priority}"` : null,
      status ? `status: "${status}"` : null,
      `notion_id: "${page.id}"`,
      '---',
    ].filter(Boolean).join('\n');

    fs.writeFileSync(filepath, `${frontmatter}\n\n${bodyContent}`.trimEnd() + '\n', 'utf8');
    console.log(`  ✓ ${filename}`);
  }

  console.log(`\nDone. ${pages.length} posts written to _posts/`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
