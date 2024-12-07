import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: ["./src/graphql/doc/*.graphql"],
  generates: {
    // 기본 타입 정의
    "./src/graphql/types.ts": {
      plugins: ["typescript"],
      config: {
        skipTypename: false,
      },
    },
    // 쿼리/뮤테이션 operations
    "./src/graphql/operations.ts": {
      preset: "import-types",
      presetConfig: {
        typesPath: "./types",
      },
      plugins: ["typescript-operations"],
      config: {
        skipTypename: false,
        dedupeFragments: true,
      },
    },
    // React hooks
    "./src/graphql/hooks.ts": {
      preset: "import-types",
      presetConfig: {
        typesPath: "./types",
      },
      plugins: ["typescript-react-apollo"],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
};

export default config;
