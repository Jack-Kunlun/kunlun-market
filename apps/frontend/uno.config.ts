// import transformerDirectives from "@unocss/transformer-directives";
import { unocssConfig } from "uno-config";
import { mergeConfigs, transformerDirectives } from "unocss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default mergeConfigs([unocssConfig, { rules: [], transformers: [transformerDirectives()] }]);
