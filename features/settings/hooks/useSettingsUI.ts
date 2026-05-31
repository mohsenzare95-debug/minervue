"use client";

import { useState } from "react";

export function useSettingsUI() {
  return {
    isEditing: useState(false),
    loginModal: useState(false),
    signupModal: useState(false),
    loginEmail: useState(""),
    loginPassword: useState(""),
    signupUsername: useState(""),
    signupEmail: useState(""),
    signupPassword: useState(""),
  };
}