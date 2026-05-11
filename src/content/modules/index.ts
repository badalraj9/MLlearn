import type { Module } from "@/types";
import { mathModule } from "./math";
import { mlTheoryModule } from "./ml-theory";
import { deepLearningModule } from "./deep-learning";
import { generativeModule } from "./generative";
import { deepResearchModule } from "./deep-research";
import { appliedMlModule } from "./applied-ml";

export const modules: Module[] = [
  mathModule,
  mlTheoryModule,
  deepLearningModule,
  generativeModule,
  deepResearchModule,
  appliedMlModule,
];
