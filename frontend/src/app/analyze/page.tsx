// analysis page
"use client";
import { icons, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { set } from "zod/v4";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  type ChromosomeFromSearch,
  type GenomeAssemblyFromSearch,
  getAvailableGenomes,
  getGenomeChromosomes,
} from "~/utils/genome-api";

type Mode = "browse" | "search";

export default function AnalyzePage() {
  const [genomes, setGenomes] = useState<GenomeAssemblyFromSearch[]>([]);
  const [selectedGenome, setSelectedGenome] = useState<string>("hg38");
  const [selectedChromosome, setSelectedChromosome] = useState<string>("chr1");
  const [chromosomes, setChromosomes] = useState<ChromosomeFromSearch[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("search");

  useEffect(() => {
    const fetchGenomes = async () => {
      try {
        setIsLoading(true);
        const data = await getAvailableGenomes();

        if (data.genomes && data.genomes["Human"]) {
          setGenomes(data.genomes["Human"]);
        }
      } catch (error) {
        setError("Failed to fetch genomes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenomes();
  }, []);

  useEffect(() => {
    const fetchChromosomes = async () => {
      try {
        setIsLoading(true);
        const data = await getGenomeChromosomes(selectedGenome);
        setChromosomes(data.chromosomes);
        console.log(data.chromosomes);
        if (data.chromosomes.length > 0) {
          setSelectedChromosome(data.chromosomes[0]!.name);
        }
      } catch (error) {
        setError("Failed to fetch genomes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChromosomes();
  }, [selectedGenome]);

  const handleGenomeChange = (value: string) => {
    setSelectedGenome(value);
  };

  const switchMode = (newMode: Mode) => {
    if (newMode == mode) return;
    setMode(newMode);
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    // perform gene search
  };

  const loadBRCA1Example = () => {
    setMode("search");
    setSearchQuery("BRCA1");

    // handle search
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-[#e9eeea]">
      <header className="mb-5 border-b border-[#3c4f3d]/10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="relative">
              <h1 className="text-xl font-light tracking-wide text-[#3c4f3d]">
                <span className="font-normal">EVO</span>
                <span className="text-[#de8246]">2</span>
              </h1>
              <div className="absolute -bottom-1 left-0 h-[2px] w-12 bg-[#de8246]"></div>
            </div>
            <span className="text-sm font-light text-[#3c4f3d]/70">
              Variant Analysis
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="mb-6 gap-0 border-none bg-white py-0 shadow-sm">
          <CardHeader className="pt-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-normal text-[#3c4f3d]/70">
                Genome Assembly
              </CardTitle>
              <div className="text-xs text-[#3c4f3d]/60">
                Organism: <span className="font-medium">Human</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <Select
              value={selectedGenome}
              onValueChange={handleGenomeChange}
              disabled={isLoading}
            >
              <SelectTrigger className="h-9 w-full border-[#3c4f3d]/10">
                <SelectValue placeholder="Select a genome assembly" />
              </SelectTrigger>
              <SelectContent>
                {genomes.map((genome) => (
                  <SelectItem key={genome.id} value={genome.id}>
                    {genome.id} - {genome.name}
                    {genome.active ? " (active)" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedGenome && (
              <p className="mt-2 text-xs text-[#3c4f3d]/60">
                {
                  genomes.find((genome) => genome.id === selectedGenome)
                    ?.sourceName
                }
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="mt-6 gap-0 border-none bg-white py-0 shadow-sm">
          <CardHeader className="pt-4 pb-2">
            <CardTitle className="text-sm font-normal text-[#3c4f3d]/70">
              Browse
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <Tabs
              value={mode}
              onValueChange={(value) => switchMode(value as Mode)}
            >
              <TabsList className="mb-4 bg-[#e9eeea]">
                <TabsTrigger
                  className="data-[state=active]:bg-white data-[state=active]:text-[#3c4f3d]"
                  value="search"
                >
                  Search Genes
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-white data-[state=active]:text-[#3c4f3d]"
                  value="browse"
                >
                  Browse Chromosomes
                </TabsTrigger>
              </TabsList>
              <TabsContent value="search" className="mt-0">
                <div className="space-y-4">
                  <form
                    onSubmit={handleSearch}
                    className="flex flex-col gap-3 sm:flex-row"
                  >
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        placeholder="Enter gene symbol or name val"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-9 border-[#3c4f3b]/10 pr-10"
                      />
                      <Button
                        size="icon"
                        className="absolute top-0 right-0 h-full cursor-pointer rounded-sm bg-[#3c4f3d] px-4 py-2 text-sm text-white hover:bg-[@3c4f3d]/90"
                        disabled={isLoading || !searchQuery.trim()}
                        type="submit"
                      >
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Search</span>
                      </Button>
                    </div>
                  </form>
                  <Button
                    variant="link"
                    className="h-auto cursor-pointer p-0 text-[#de8246] hover:text-[#de8246]/80"
                    onClick={loadBRCA1Example}
                  >
                    Try BRCA1 Example
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="browse" className="mt-0">
                <div className="max-h-[150px] overflow-y-auto pr-1">
                  <div className="flex flex-wrap gap-2">
                    {chromosomes.map((chrom) => (
                      <Button
                        size="sm"
                        variant="outline"
                        className={`hover-text-[#3c4f3d] h-8 cursor-pointer border-[#3c4f3d]/10 hover:bg-[#e9eeea] ${selectedChromosome === chrom.name ? "bg-[#e9eeea] text-[#3c4f3d]" : ""}`}
                        key={chrom.name}
                        onClick={() => setSelectedChromosome(chrom.name)}
                      >
                        {chrom.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {isLoading && (
              <div className="flex items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent p-4 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center">
                <p className="text-sm text-red-600">Error: {error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
