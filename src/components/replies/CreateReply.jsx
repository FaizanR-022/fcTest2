import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { createReplySchema } from "@/utils/postValidationSchemas";

export const CreateReply = ({ currentUser, onSubmit, loading }) => {
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createReplySchema),
    defaultValues: {
      body: "",
    },
  });

  const isAlumni = currentUser?.role === "alumni";

  const handleFormSubmit = async (data) => {
    try {
      setError("");
      await onSubmit(data);
      reset();
    } catch (err) {
      setError(err.message || "Failed to post reply");
    }
  };

  if (!isAlumni) {
    return (
      <div className="flex items-start gap-3 p-4 mb-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800 dark:text-amber-200">
          Only alumni can reply to posts. As a student, you can ask questions by
          creating your own posts!
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-card border border-primary/50 rounded-lg">
      {error && (
        <div className="p-3 mb-4 text-sm text-destructive bg-destructive/10 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Controller
            name="body"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                id="reply-body"
                rows={4}
                placeholder="Share your insights and help answer this question..."
                className={`resize-none ${errors.body ? "border-destructive" : ""}`}
              />
            )}
          />
          {errors.body && (
            <p className="text-xs text-destructive">{errors.body.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || loading}>
            {isSubmitting || loading ? "Posting..." : "Post Reply"}
          </Button>
        </div>
      </form>
    </div>
  );
};
