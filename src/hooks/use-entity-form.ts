import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { showError, showSuccess } from "@/components/feedback/app-alert";

interface UseEntityFormOptions<T> {
  onSubmit: (values: T) => Promise<void>;
  successMessage: string;
  errorMessage: string;
  redirectPath?: string;
  onSuccess?: () => void;
}

interface UseEntityFormReturn<T> {
  isSubmitting: boolean;
  handleSubmit: (values: T) => Promise<void>;
}

export function useEntityForm<T>(
  options: UseEntityFormOptions<T>,
): UseEntityFormReturn<T> {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (values: T) => {
      try {
        setIsSubmitting(true);
        await options.onSubmit(values);

        showSuccess(options.successMessage);
        options.onSuccess?.();

        if (options.redirectPath) {
          router.replace(options.redirectPath);
        }
      } catch {
        showError(options.errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [options, router],
  );

  return {
    isSubmitting,
    handleSubmit,
  };
}
