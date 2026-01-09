import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex justify-center items-center">
      <Loader2 className="h-14 w-14 animate-spin text-primary" />
    </div>
  );
};

export default Loader;
