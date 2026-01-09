import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import api from "../../services/api";

function ImageUpload({ value, onChange, label = "Profile Picture" }) {
  const [preview, setPreview] = useState(value || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Reset error
    setError(null);

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    // Create local preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update parent with Cloudinary URL
      onChange(response.data.data.url);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.message || "Failed to upload image");
      setPreview(value || null); // Revert to original on error
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    setError(null);
  };

  return (
    <div>
      <p className="text-sm font-medium mb-2">{label}</p>

      <div className="flex items-center gap-4">
        {/* Avatar Preview */}
        <div className="relative">
          <Avatar className="w-20 h-20 border-2 border-border">
            <AvatarImage src={preview} />
            <AvatarFallback className="text-lg">?</AvatarFallback>
          </Avatar>
          
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
          
          {preview && !uploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-1 -right-1 p-1 bg-background border border-border rounded-full shadow-sm hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Upload Button */}
        <div className="flex-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            asChild
          >
            <label className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              {uploading
                ? "Uploading..."
                : preview
                ? "Change Photo"
                : "Upload Photo"}
              <input
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleFileSelect}
                disabled={uploading}
              />
            </label>
          </Button>

          {error && (
            <p className="text-xs text-destructive mt-1">{error}</p>
          )}

          {!error && (
            <p className="text-xs text-muted-foreground mt-1">
              Max 5MB • JPG, PNG, WEBP
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
