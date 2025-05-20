import type { GeneFromSearch } from "~/utils/genome-api";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function GeneViewer({
  gene,
  genomeId,
  onClose,
}: {
  gene: GeneFromSearch;
  genomeId: string;
  onClose: () => void;
}) {
  return <div className="space-y-6">
    <Button variant="ghost" size="sm" className="cursor-pointer text-[#3c3f3d] hover:bg-[#f1f1f1]/70" onClick={onClose}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Results
    </Button>

  </div>
}