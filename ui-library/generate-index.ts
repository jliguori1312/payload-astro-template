import { readdirSync, existsSync, writeFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const BLOCKS_DIR = path.resolve(dirname, 'blocks');
const FRAMEWORKS = ['react', 'vue', 'astro'];
const OUTPUT_INDEX = path.resolve(dirname, 'index.ts');

const getExportName = (blockName: string) =>
  blockName.charAt(0).toUpperCase() + blockName.slice(1);

let indexFileContent = '';
const frameworkFiles: Record<string, string[]> = {
  react: [],
  vue: [],
  astro: [],
};
const configExports: string[] = [];

readdirSync(BLOCKS_DIR, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .forEach((blockDir) => {
    const blockName = blockDir.name;
    const blockPath = path.join(BLOCKS_DIR, blockName);

    // Config
    const configPath = path.join(blockPath, 'config.ts');
    if (existsSync(configPath)) {
      const exportName = `${getExportName(blockName)}Config`;
      configExports.push(
        `export { default as ${exportName} } from './blocks/${blockName}/config';`
      );
    }

    // Frameworks
    FRAMEWORKS.forEach((framework) => {
      const compPath = path.join(blockPath, framework, `${getExportName(blockName)}.${framework === 'vue' ? 'vue' : 'tsx'}`);
      if (existsSync(compPath)) {
        const exportName = getExportName(blockName);
        frameworkFiles[framework].push(
          `export { ${exportName} } from './blocks/${blockName}/${framework}/${exportName}';`
        );
      }
    });
  });

// Write index.ts
indexFileContent += `// AUTO-GENERATED INDEX FILE\n\n`;

// Config exports
indexFileContent += `// Configs\n${configExports.join('\n')}\n\n`;

// Framework exports
FRAMEWORKS.forEach((framework) => {
  indexFileContent += `// ${framework.charAt(0).toUpperCase() + framework.slice(1)} components\n`;
  indexFileContent += frameworkFiles[framework].join('\n') + '\n\n';
});

writeFileSync(OUTPUT_INDEX, indexFileContent.trim(), 'utf8');

// Write individual framework entry points
FRAMEWORKS.forEach((framework) => {
  const content = `// AUTO-GENERATED ${framework}.ts\n\n${frameworkFiles[framework].join('\n')}\n`;
  writeFileSync(path.resolve(dirname, `${framework}.ts`), content.trim(), 'utf8');
});

console.log('✅ Component exports generated!');
