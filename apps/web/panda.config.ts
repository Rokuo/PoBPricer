import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // v2 adds no presets on its own: base gives the utilities, panda the default scales.
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
  preflight: true,
  include: ["./src/**/*.{ts,tsx}"],
  exclude: [],
  jsxFramework: "react",
  outdir: "styled-system",

  theme: {
    extend: {
      // Raw palette from the "PoE Build Pricer" design canvas, named by what the colour is.
      // Names must not clash with preset-panda (it already has stone, amber, ...), or extend merges them.
      tokens: {
        colors: {
          ink: {
            950: { value: "#121110" },
            900: { value: "#1B1917" },
            700: { value: "#332E27" },
          },
          parchment: {
            100: { value: "#ECE6DA" },
            400: { value: "#A89F90" },
          },
          gold: {
            400: { value: "#D4A35A" },
          },
          white: { 100: { value: "#FFFFFF" } },
          citrine: { 300: { value: "#E8E07A" } },
          periwinkle: { 300: { value: "#9C9CFF" } },
          ember: { 400: { value: "#D98A45" } },
        },
        fonts: {
          display: { value: "Cinzel, Georgia, serif" },
          body: { value: '"IBM Plex Sans", system-ui, sans-serif' },
          mono: { value: '"IBM Plex Mono", ui-monospace, monospace' },
        },
      },

      // What each colour is *for*. Components should only ever use these names.
      semanticTokens: {
        colors: {
          bg: {
            ground: { value: "{colors.ink.950}" },
            surface: { value: "{colors.ink.900}" },
          },
          border: { value: "{colors.ink.700}" },
          fg: {
            DEFAULT: { value: "{colors.parchment.100}" },
            muted: { value: "{colors.parchment.400}" },
          },
          accent: { value: "{colors.gold.400}" },
          rarity: {
            normal: { value: "{colors.white.100}" },
            magic: { value: "{colors.periwinkle.300}" },
            rare: { value: "{colors.citrine.300}" },
            unique: { value: "{colors.ember.400}" },
          },
        },
      },
    },
  },
});
