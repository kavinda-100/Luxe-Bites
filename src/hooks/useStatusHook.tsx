"use client";

import React from "react";

export const useStatusHook = () => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null,
  );
  const [warningMessage, setWarningMessage] = React.useState<string | null>(
    null,
  );

  return {
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
    warningMessage,
    setWarningMessage,
  };
};
