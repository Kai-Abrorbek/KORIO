"use client";

import { createContext } from "react";

/** The active target language, independent from UI and explanation languages. */
export const LearningLanguageContext = createContext<string>("ko");
