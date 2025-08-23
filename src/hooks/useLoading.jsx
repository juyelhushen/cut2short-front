import React, { useState, useCallback } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loading.json";
import LoadingErrorBoundary from "./LoadingErrorBoundary";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const LoadingComponent = useCallback(
    () =>
      isLoading && (
        <LoadingErrorBoundary>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-32 h-32">
              <Lottie
                animationData={loadingAnimation}
                loop={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </LoadingErrorBoundary>
      ),
    [isLoading]
  );

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  const withLoading = async (callback) => {
    startLoading();
    try {
      await callback();
    } finally {
      stopLoading();
    }
  };

  return {
    isLoading,
    LoadingComponent,
    startLoading,
    stopLoading,
    withLoading,
  };
};

export default useLoading;
