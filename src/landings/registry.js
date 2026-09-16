/**
 * Dynamic Landing Page Registry
 * Automatically imports all landing pages in the src/landings/ directory.
 * 
 * Supports:
 * - Single file pages: e.g., src/landings/LuxuryWatch.jsx
 * - Directory pages: e.g., src/landings/01-nexus-ai/index.jsx
 * 
 * To add a new landing page:
 * Simply drop a new .jsx file into `src/landings/` (e.g. `MyCryptoLanding.jsx`)!
 * It will be auto-detected and added to the floating switcher.
 */

// Import all top-level .jsx files and subfolder index.jsx files
const singleFileModules = import.meta.glob('./*.jsx', { eager: true });
const folderModules = import.meta.glob('./*/index.jsx', { eager: true });

function formatTitle(id) {
  return id
    .replace(/^\d+-/, '') // Remove leading numbers like 01-
    .replace(/[-_]/g, ' ') // Replace dashes and underscores with spaces
    .replace(/\b\w/g, char => char.toUpperCase()); // Title Case
}

export function getAllLandings() {
  const pages = [];

  // Process folder-based pages (e.g. ./01-nexus-ai/index.jsx)
  for (const [path, module] of Object.entries(folderModules)) {
    const folderMatch = path.match(/\.\/([^/]+)\/index\.jsx$/);
    if (folderMatch && module.default) {
      const id = folderMatch[1];
      const metadata = module.metadata || {};
      pages.push({
        id,
        title: metadata.title || formatTitle(id),
        description: metadata.description || 'Modern single-page landing experience',
        category: metadata.category || 'Landing Page',
        tag: metadata.tag || 'Featured',
        component: module.default,
        path,
        isFolder: true,
      });
    }
  }

  // Process single-file pages (e.g. ./StarterTemplate.jsx)
  for (const [path, module] of Object.entries(singleFileModules)) {
    // Skip this registry file or files starting with _
    if (path.includes('registry') || path.includes('_')) continue;

    const fileMatch = path.match(/\.\/([^/]+)\.jsx$/);
    if (fileMatch && module.default) {
      const id = fileMatch[1].toLowerCase().replace(/\s+/g, '-');
      const metadata = module.metadata || {};
      pages.push({
        id,
        title: metadata.title || formatTitle(fileMatch[1]),
        description: metadata.description || 'Standalone landing page template',
        category: metadata.category || 'Template',
        tag: metadata.tag || 'Component',
        component: module.default,
        path,
        isFolder: false,
      });
    }
  }

  return pages;
}
