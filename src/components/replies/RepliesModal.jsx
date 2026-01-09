import { useState } from "react";
import { Heart, MessageCircle, Trash2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader } from "@/components/ui/loader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getInitials } from "@/utils/userInfoHelpers";
import { formatRelativeTime } from "@/utils/dateHelpers";

export function RepliesModal({
  open,
  onClose,
  post,
  replies,
  repliesLoading,
  repliesError,
  currentUser,
  onCreateReply,
  onDeleteReply,
}) {
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    try {
      await onCreateReply({ text: replyText });
      setReplyText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canReply = currentUser?.role === "alumni";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Post Details</DialogTitle>
        </DialogHeader>

        {post ? (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Post Content */}
            <div className="p-4 border rounded-lg mb-4">
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.author?.profilePicture} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {getInitials(post.author?.firstName, post.author?.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {post.author?.firstName} {post.author?.lastName}
                    </p>
                    <Badge
                      variant={
                        post.author?.role === "student" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {post.author?.role === "student" ? "Student" : "Alumni"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatRelativeTime(post.createdAt)}
                  </p>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-muted-foreground">{post.body}</p>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Heart className="w-4 h-4" />
                  {post.likeCount || 0} likes
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MessageCircle className="w-4 h-4" />
                  {post.replyCount || 0} replies
                </span>
              </div>
            </div>

            {/* Replies Section */}
            <div className="flex-1 overflow-hidden">
              <h4 className="font-medium mb-3">
                Replies ({replies?.length || 0})
              </h4>

              {repliesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader />
                </div>
              ) : repliesError ? (
                <p className="text-center text-destructive py-4">
                  {repliesError}
                </p>
              ) : replies?.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No replies yet. Be the first to respond!
                </p>
              ) : (
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {replies?.map((reply) => (
                      <div
                        key={reply.id}
                        className="p-4 border rounded-lg bg-muted/30"
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={reply.author?.profilePicture} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {getInitials(
                                reply.author?.firstName,
                                reply.author?.lastName
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">
                                  {reply.author?.firstName}{" "}
                                  {reply.author?.lastName}
                                </p>
                                <Badge variant="secondary" className="text-xs">
                                  Alumni
                                </Badge>
                              </div>
                              {reply.author?.id === currentUser?.id && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onDeleteReply(reply.id)}
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {formatRelativeTime(reply.createdAt)}
                            </p>
                            <p className="text-sm">{reply.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>

            {/* Reply Input (Alumni only) */}
            {canReply && (
              <div className="pt-4 border-t mt-4">
                <div className="flex gap-2">
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply..."
                    rows={2}
                    className="resize-none"
                  />
                  <Button
                    onClick={handleSubmitReply}
                    disabled={!replyText.trim() || isSubmitting}
                    size="icon"
                    className="h-auto"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center py-8">
            <Loader />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
