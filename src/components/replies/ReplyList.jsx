import { MessageCircle, Loader2 } from "lucide-react";
import ReplyCard from "./ReplyCard";

export const ReplyList = ({
  replies,
  loading,
  error,
  currentUser,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-lg font-semibold text-destructive mb-2">
          Error Loading Replies
        </h3>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!replies || replies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <MessageCircle className="w-12 h-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold mb-2">No replies yet</h3>
        <p className="text-sm text-muted-foreground">
          Be the first alumni to share your insights!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Replies</h3>
        <span className="text-sm text-muted-foreground">
          {replies.length} {replies.length === 1 ? "reply" : "replies"}
        </span>
      </div>

      <div className="space-y-4">
        {replies.map((reply) => (
          <ReplyCard
            key={reply.id}
            reply={reply}
            currentUser={currentUser}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
