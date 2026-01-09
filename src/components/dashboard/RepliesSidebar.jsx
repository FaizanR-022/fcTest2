import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const RepliesSidebar = ({
  replies,
  loading,
  onReplyClick,
  onViewAll,
}) => {
  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            💬 Recent Replies
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          💬 Recent Replies
        </CardTitle>
      </CardHeader>
      <CardContent>
        {replies && replies.length > 0 ? (
          <>
            <div className="space-y-3">
              {replies.slice(0, 5).map((reply) => (
                <div
                  key={reply.id}
                  onClick={() => onReplyClick(reply.postId)}
                  className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                >
                  <p className="text-sm line-clamp-2 mb-2">{reply.body}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>On:</span>
                    <span className="font-medium text-foreground truncate">
                      {reply.postTitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {replies.length > 5 && (
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={onViewAll}
              >
                View All Replies →
              </Button>
            )}
          </>
        ) : (
          <div className="text-center py-6 text-sm text-muted-foreground">
            <p>No replies yet.</p>
            <p className="mt-1">
              Start helping students by answering their questions!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
