import { useState, useCallback } from "react";

interface UseFormSubmitOptions<T, R = void> {
  onSubmit: (values: T) => Promise<R>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
}

interface UseFormSubmitReturn {
  isSubmitting: boolean;
  handleSubmit: (values: unknown) => Promise<void>;
}

export function useFormSubmit<T>(
  options: UseFormSubmitOptions<T>,
): UseFormSubmitReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (values: unknown) => {
      try {
        setIsSubmitting(true);
        await options.onSubmit(values as T);
        options.onSuccess?.();
      } catch (error) {
        options.onError?.(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [options],
  );

  return {
    isSubmitting,
    handleSubmit,
  };
}
