import { readdirSync, existsSync, writeFileSync, Dirent } from 'fs';
import * as path from 'path';
import { config } from 'process';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const BLOCKS_DIR = path.resolve(dirname, 'src/blocks');
const HERO_DIR = path.resolve(dirname, 'src/heros')
const FRAMEWORKS = [
  {
    name: 'react',
    ext: 'tsx'
  },
    {
      name: 'vue',
      ext: 'vue'
    },
    {
      name: 'astro',
      ext: 'astro'
    }
  ];
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

readdirSync(BLOCKS_DIR, { withFileTypes: true }) // for each dir in blocks (aka for each block)
  .filter((dirent) => dirent.isDirectory())
  .forEach((blockDir) => {
    const blockName = blockDir.name;
    const blockPath = path.join(BLOCKS_DIR, blockName); // Get name of block and path to it

    // Config
    const configPath = path.join(blockPath, 'config.ts'); // get path to config file
    if (existsSync(configPath)) {
      const exportName = `${getExportName(blockName)}Config`; //create the name for the named export
      configExports.push(
        `export { default as ${exportName} } from './src/blocks/${blockName}/config';` // add export line to configExports array
      );
    }

    // Frameworks
    FRAMEWORKS.forEach((framework) => {
      const compPath = path.join(blockPath, framework.name, `index.${framework.ext}`);
      console.log('computed', compPath)
      if (existsSync(compPath)) {
        console.log('actual', compPath)
        const exportName = getExportName(blockName);
        frameworkFiles[framework.name].push(
          `export { ${exportName} } from './src/blocks/${blockName}/${framework.name}';`// ADJUST here as needed per framework
        );
      }
    });
  });

  // hero components
  readdirSync(HERO_DIR, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .forEach((heroDir) => {
    const heroName = heroDir.name
    const heroPath = path.join(HERO_DIR, heroName)

    FRAMEWORKS.forEach((framework) => {
      const compPath = path.join(heroPath, framework.name, `index.${framework.ext}`)
      if (existsSync(compPath)) {
        const exportName = getExportName(heroName)
        frameworkFiles[framework.name].push(
          `export { ${exportName} } from './src/heros/${heroName}/${framework.name}'`
        )
      }
    })
  })
  // hero config
  const heroConfigPath = path.join(HERO_DIR, 'config.ts')
  if (existsSync(heroConfigPath)) {
    const exportName = `heroConfig`
    configExports.push(
      `export { hero } from './src/heros/config'`
    )
  } 

// Write index.ts
//indexFileContent += `// AUTO-GENERATED INDEX FILE\n\n`;

// Config exports
//indexFileContent += `// Configs\n${configExports.join('\n')}\n\n`;

const configContent = `// Configs\n${configExports.join('\n')}\n\n`
writeFileSync(path.resolve(dirname, 'config.ts'), configContent.trim(), 'utf8')


// Framework exports
/* FRAMEWORKS.forEach((framework) => {
  indexFileContent += `// ${framework.name.charAt(0).toUpperCase() + framework.name.slice(1)} components\n`;
  indexFileContent += frameworkFiles[framework.name].join('\n') + '\n\n';
}); */

//writeFileSync(OUTPUT_INDEX, indexFileContent.trim(), 'utf8');

// Write individual framework entry points
FRAMEWORKS.forEach((framework) => {
  console.log(framework.name, frameworkFiles[framework.name])
  const content = `// AUTO-GENERATED ${framework.name}.ts\n\n${frameworkFiles[framework.name].join('\n')}\n`;
  writeFileSync(path.resolve(dirname, `${framework.name}.ts`), content.trim(), 'utf8');
});

console.log('✅ Component exports generated!');
