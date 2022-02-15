import React from "react";
import { combineComponents } from "../utils/combineComponents";
import { AuthProvider } from "./AuthContext/AuthContext";
import { UIProvider } from "./UIContext/UIContext";
const providers = [
    AuthProvider,
    UIProvider
]

export const AppContextProvider = combineComponents(...providers);