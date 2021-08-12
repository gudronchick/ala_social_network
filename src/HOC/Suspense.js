import React, { Suspense } from "react";

export const withSuspense = (Component, initValues = {}) => {
  return (props) => {
    return (
      <Suspense fallback="">
        <Component {...props} initialValues={initValues} />
      </Suspense>
    );
  };
};
