import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { createPostSchema } from "@/utils/postValidationSchemas";

export const CreatePost = ({ open, onClose, onSubmit, loading }) => {
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createPostSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const handleClose = () => {
    reset();
    setError("");
    onClose();
  };

  const handleFormSubmit = async (data) => {
    try {
      setError("");
      await onSubmit(data);
      reset();
      handleClose();
    } catch (err) {
      setError(err.message || "Failed to create post");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">Ask a Question</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Share your question with the community and get expert advice from alumni
          </p>
        </DialogHeader>

        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Question Title</Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="title"
                  placeholder="e.g., How to prepare for technical interviews?"
                  className={errors.title ? "border-destructive" : ""}
                />
              )}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Question Details</Label>
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="body"
                  rows={6}
                  placeholder="Provide more context about your question..."
                  className={`resize-none ${errors.body ? "border-destructive" : ""}`}
                />
              )}
            />
            {errors.body && (
              <p className="text-xs text-destructive">{errors.body.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting || loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || loading}>
              {isSubmitting || loading ? "Posting..." : "Post Question"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
