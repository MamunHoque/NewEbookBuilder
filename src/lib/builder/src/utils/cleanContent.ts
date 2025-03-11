import sanitizeHtml from 'sanitize-html';
import { SourceType } from './detectSource';

const cleanContent = (html: string, source: SourceType, keepFormatting: boolean): string => {
  if (!keepFormatting) {
    // Strip all tags and return plain text
    return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });
  }

  // Define allowed tags and attributes
  let allowedTags: string[] = [
    'p', 'b', 'i', 'strong', 'em', 'ul', 'ol', 'li', 'br',
    'span', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
  ];

  let allowedAttributes: { [key: string]: string[] } = {
    '*': ['style', 'class'],
    'a': ['href', 'name', 'target'],
    'img': ['src', 'alt'],
    'table': ['border', 'cellpadding', 'cellspacing'],
  };

  // Customize based on source if needed
  if (source === 'microsoft_office') {
    // Remove mso-specific styles
    html = html.replace(/style="[^"]*mso-[^"]*"/g, '');
  }

  if (source === 'google_docs') {
    // Remove Google Docs specific classes
    html = html.replace(/class="[^"]*"/g, '');
  }

  return sanitizeHtml(html, {
    allowedTags,
    allowedAttributes,
    allowedStyles: {
      '*': {
        'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
        'background-color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
        'text-align': [/^left$/, /^right$/, /^center$/],
        'font-size': [/^\d+(?:px|em|%)$/],
        'font-weight': [/^normal$/, /^bold$/, /^\d+$/],
        'font-style': [/^normal$/, /^italic$/],
        'font-family': [/.+/],
        'line-height': [/^normal$/, /^\d+(?:px|em|%)$/],
      },
    },
  });
};

export default cleanContent;