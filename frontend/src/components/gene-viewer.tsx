"use client";
import { fetchGeneDetails, fetchGeneSequence as apiFetchGeneSequence, fetchClinvarVariants as apiFetchClinvarVariants, type ClinvarVariant, type GeneBounds, type GeneDetailsFromSearch, type GeneFromSearch } from "~/utils/genome-api";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GeneInformation } from "./gene-information";
import { GeneSequence } from "./gene-sequence";
import type { VariantAnalysisHandle } from "./variant-analysis";
import KnownVariants from "./known-variants";
import { VariantComparisonModal } from "./variant-comparison-modal";
import VariantAnalysis from "./variant-analysis";
import { Dna, Database, Brain, CheckCircle2, Loader2 } from 'lucide-react';

export default function GeneViewer({
  gene,
  genomeId,
  onClose,
}: {
  gene: GeneFromSearch;
  genomeId: string;
  onClose: () => void;
}) {

  const [geneSequence, setGeneSequence] = useState("");
  const [geneDetail, setGeneDetail] = useState<GeneDetailsFromSearch | null>(
    null,
  );
  const [geneBounds, setGeneBounds] = useState<GeneBounds | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [startPosition, setStartPosition] = useState<string>("");
  const [endPosition, setEndPosition] = useState<string>("");
  const [isLoadingSequence, setIsLoadingSequence] = useState(false);

  const [clinvarVariants, setClinvarVariants] = useState<ClinvarVariant[]>([]);
  const [isLoadingClinvar, setIsLoadingClinvar] = useState(false);
  const [clinvarError, setClinvarError] = useState<string | null>(null);

   const [actualRange, setActualRange] = useState<{
    start: number;
    end: number;
  } | null>(null);

  const [comparisonVariant, setComparisonVariant] =
    useState<ClinvarVariant | null>(null);

  const [activeSequencePosition, setActiveSequencePosition] = useState<
    number | null
  >(null);
  const [activeReferenceNucleotide, setActiveReferenceNucleotide] = useState<
    string | null
  >(null);

  const variantAnalysisRef = useRef<VariantAnalysisHandle>(null);

   const fetchGeneSequence = useCallback(
    async (start: number, end: number) => {
      try {
        setIsLoadingSequence(true);
        setError(null);

        const {
          sequence,
          actualRange: fetchedRange,
          error: apiError,
        } = await apiFetchGeneSequence(gene.chrom, start, end, genomeId);

        setGeneSequence(sequence);
        setActualRange(fetchedRange);

        if (apiError) {
          setError(apiError);
        }
        console.log(sequence);
      } catch {
        setError("Failed to load sequence data");
      } finally {
        setIsLoadingSequence(false);
      }
    },
    [gene.chrom, genomeId],
  );

  const LoadingTimeline = ({
    steps = [
      { id: 'gene-details', label: 'Fetching Gene Details', icon: Dna, duration: 1500 },
      { id: 'dna-sequence', label: 'Loading DNA Sequence', icon: Database, duration: 2000 },
      { id: 'clinvar-variants', label: 'Fetching ClinVar Variants', icon: Database, duration: 1800 },
      { id: 'evo2-analysis', label: 'Loading EVO2..', icon: Brain, duration: 2200 }
    ],
    onComplete,
  }: {
    steps?: {
      id: string;
      label: string;
      icon: React.ElementType;
      duration: number;
    }[];
    onComplete?: () => void;
  }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState(new Set());
  
    useEffect(() => {
      if (currentStep < steps.length) {
        const timer = setTimeout(() => {
          setCompletedSteps(prev => new Set([...prev, currentStep]));
          
          if (currentStep === steps.length - 1) {
            // All steps completed
            setTimeout(() => {
              onComplete?.();
            }, 500);
          } else {
            setCurrentStep(prev => prev + 1);
          }
        }, steps[currentStep]?.duration);
  
        return () => clearTimeout(timer);
      }
    }, [currentStep, steps, onComplete]);
  
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-md w-full mx-auto p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <Dna className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-semibold text-black mb-2">
              Loading Genetic Analysis
            </h2>
            <p className="text-gray-700">
              Preparing comprehensive gene data for analysis
            </p>
          </div>
  
          {/* Timeline */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300">
              <div 
                className="w-full bg-gradient-to-b from-orange-500 to-orange-600 transition-all duration-1000 ease-out"
                style={{
                  height: `${((completedSteps.size + (currentStep < steps.length ? 0.5 : 0)) / steps.length) * 100}%`
                }}
              />
            </div>
  
            {/* Steps */}
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.has(index);
              const isCurrent = index === currentStep;
              // const isPending = index > currentStep;
  
              return (
                <div key={step.id} className="relative flex items-center mb-6 last:mb-0">
                  {/* Step Icon */}
                  <div className={`
                    relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-500
                    ${isCompleted 
                      ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200' 
                      : isCurrent 
                      ? 'bg-black border-black text-white shadow-lg shadow-gray-400 animate-pulse' 
                      : 'bg-white border-gray-300 text-gray-500'
                    }
                  `}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-8 h-8" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
  
                  {/* Step Content */}
                  <div className="ml-6 flex-1">
                    <div className={`
                      font-semibold transition-all duration-300
                      ${isCompleted 
                        ? 'text-orange-700' 
                        : isCurrent 
                        ? 'text-black' 
                        : 'text-gray-500'
                      }
                    `}>
                      {step.label}
                    </div>
                    
                    {/* Progress indicator for current step */}
                    {isCurrent && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full animate-pulse" 
                                 style={{ width: '60%' }} />
                          </div>
                          <span className="text-xs text-gray-600">Processing...</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Completion message */}
                    {isCompleted && (
                      <div className="mt-1 text-sm text-orange-600 flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Complete
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
  
          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center text-sm text-gray-700">
              <Loader2 className="w-4 h-4 mr-2 animate-spin text-orange-500" />
              Step {Math.min(currentStep + 1, steps.length)} of {steps.length}
            </div>
          </div>
        </div>
      </div>
    );
  };
     
  useEffect(() => {
    const initializeGeneData = async () => {
      setIsLoading(true);

      if (!gene.gene_id) {
        setError("Gene ID is missing, cannot fetch details");
        setIsLoading(false);
        return;
      }

      try {
        const {
          geneDetails: fetchedDetail,
          geneBounds: fetchedGeneBounds,
          initialRange: fetchedRange,
        } = await fetchGeneDetails(gene.gene_id);

        setGeneDetail(fetchedDetail);
        setGeneBounds(fetchedGeneBounds);

        if (fetchedRange) {
          setStartPosition(String(fetchedRange.start));
          setEndPosition(String(fetchedRange.end));
          await fetchGeneSequence(fetchedRange.start, fetchedRange.end);
        }
      } catch {
        setError("Failed to load gene information. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    void initializeGeneData();
  }, [gene, genomeId, fetchGeneSequence]);

  const handleSequenceClick = useCallback(
    (position: number, nucleotide: string) => {
      setActiveSequencePosition(position);
      setActiveReferenceNucleotide(nucleotide);
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (variantAnalysisRef.current) {
        variantAnalysisRef.current.focusAlternativeInput();
      }
    },
    [],
  );

  const handleLoadSequence = useCallback(() => {
    const start = parseInt(startPosition);
    const end = parseInt(endPosition);
    let validationError: string | null = null;

    if (isNaN(start) || isNaN(end)) {
      validationError = "Please enter valid start and end positions";
    } else if (start >= end) {
      validationError = "Start position must be less than end position";
    } else if (geneBounds) {
      const minBound = Math.min(geneBounds.min, geneBounds.max);
      const maxBound = Math.max(geneBounds.min, geneBounds.max);
      if (start < minBound) {
        validationError = `Start position (${start.toLocaleString()}) is below the minimum value (${minBound.toLocaleString()})`;
      } else if (end > maxBound) {
        validationError = `End position (${end.toLocaleString()}) exceeds the maximum value (${maxBound.toLocaleString()})`;
      }

      if (end - start > 10000) {
        validationError = `Selected range exceeds maximum view range of 10.000 bp.`;
      }
    }

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    void fetchGeneSequence(start, end);
  }, [startPosition, endPosition, fetchGeneSequence, geneBounds]);

   const fetchClinvarVariants = async () => {
    if (!gene.chrom || !geneBounds) return;

    setIsLoadingClinvar(true);
    setClinvarError(null);

    try {
      const variants = await apiFetchClinvarVariants(
        gene.chrom,
        geneBounds,
        genomeId,
      );
      setClinvarVariants(variants);
      console.log(variants);
    } catch {
      setClinvarError("Failed to fetch ClinVar variants");
      setClinvarVariants([]);
    } finally {
      setIsLoadingClinvar(false);
    }
  };

  useEffect(() => {
    if (geneBounds) {
      void fetchClinvarVariants();
    }
  }, [geneBounds, fetchClinvarVariants]);

  const showComparison = (variant: ClinvarVariant) => {
    if (variant.evo2Result) {
      setComparisonVariant(variant);
    }
  };

  const updateClinvarVariant = (
    clinvar_id: string,
    updateVariant: ClinvarVariant,
  ) => {
    setClinvarVariants((currentVariants) =>
      currentVariants.map((v) =>
        v.clinvar_id == clinvar_id ? updateVariant : v,
      ),
    );
  };

  const [loadingState, setLoadingState] = useState({
    isLoading: true,
    currentStep: 0,
    completedSteps: new Set()
  });

  const loadingSteps = [
    { id: 'gene-details', label: 'Fetching Gene Details', icon: Dna, duration: 800 },
    { id: 'dna-sequence', label: 'Loading DNA Sequence', icon: Database, duration: 1200 },
    { id: 'clinvar-variants', label: 'Fetching ClinVar Variants', icon: Database, duration: 1000 },
    { id: 'evo2-analysis', label: 'Loading EVO2 Analysis', icon: Brain, duration: 1500 }
  ];

  const handleLoadingComplete = () => {
    setLoadingState(prev => ({ ...prev, isLoading: false }));
  };

  // Replace the simple loading check in your GeneViewer component
  if (loadingState.isLoading) {
    return (
      <div className="space-y-6">
        <button
          className="inline-flex items-center text-[#3c3f3d] hover:bg-[#f1f1f1]/70 px-3 py-2 rounded-md transition-colors"
          onClick={onClose}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results
        </button>
        <LoadingTimeline
          steps={loadingSteps}
          onComplete={handleLoadingComplete} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        size="sm"
        className="cursor-pointer text-[#3c3f3d] hover:bg-[#f1f1f1]/70"
        onClick={onClose}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Results
      </Button>

      <VariantAnalysis
        ref={variantAnalysisRef}
        gene={gene}
        genomeId={genomeId}
        chromosome={gene.chrom}
        clinvarVariants={clinvarVariants}
        referenceSequence={activeReferenceNucleotide}
        sequencePosition={activeSequencePosition}
        geneBounds={geneBounds}
      />

      <KnownVariants
        refreshVariants={fetchClinvarVariants}
        showComparison={showComparison}
        updateClinvarVariant={updateClinvarVariant}
        clinvarVariants={clinvarVariants}
        isLoadingClinvar={isLoadingClinvar}
        clinvarError={clinvarError}
        genomeId={genomeId}
        gene={gene}
      />

      <GeneSequence
        geneBounds={geneBounds}
        geneDetail={geneDetail}
        startPosition={startPosition}
        endPosition={endPosition}
        onStartPositionChange={setStartPosition}
        onEndPositionChange={setEndPosition}
        sequenceData={geneSequence}
        sequenceRange={actualRange}
        isLoading={isLoadingSequence}
        error={error}
        onSequenceLoadRequest={handleLoadSequence}
        onSequenceClick={handleSequenceClick}
        maxViewRange={10000}
      />

      <GeneInformation
        gene={gene}
        geneDetail={geneDetail}
        geneBounds={geneBounds}
      />

      <VariantComparisonModal
        comparisonVariant={comparisonVariant}
        onClose={() => setComparisonVariant(null)}
      />

    </div>
  );
}
