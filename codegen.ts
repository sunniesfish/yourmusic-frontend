import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql", // GraphQL 서버 엔드포인트
  documents: ["src/graphql/**/*.ts"],
  generates: {
    "./src/graphql/types/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true, // React Hook 생성
        withHOC: false,
        withComponent: false,
        skipTypename: false,
        dedupeFragments: true,
      },
    },
  },
};

export default config;
