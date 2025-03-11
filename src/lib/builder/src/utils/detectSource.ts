export type SourceType = 'microsoft_office' | 'google_docs' | 'excel' | 'unknown';

const detectSource = (html: string): SourceType => {
  if (html.includes('mso-')) {
    return 'microsoft_office';
  }
  if (html.includes('docs.google.com')) {
    return 'google_docs';
  }
  if (html.includes('<table') && html.includes('Excel')) {
    return 'excel';
  }
  return 'unknown';
}

export default detectSource;