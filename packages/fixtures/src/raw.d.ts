// Vite (and so Vitest) turns `import x from "./file.txt?raw"` into the file's text at build time.
declare module "*?raw" {
  const content: string;
  export default content;
}
