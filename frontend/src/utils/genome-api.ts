export interface GenomeAssemblyFromSearch{
  id: string;
  name: string;
  sourceName: string;
  active: boolean;
}

export interface ChromosomeFromSearch{
  name: string;
  size: number;
}

export async function getAvailableGenomes() {
  const api_url = "https://api.genome.ucsc.edu/list/ucscGenomes";
  const response = await fetch(api_url);

  if(!response.ok){
    throw new Error("Failed to fetch genome list data");
  }

  const genomeData = await response.json()
  if(!genomeData.ucscGenomes){
    throw new Error("UCSC API ERROR: missing ucscGenomes");
  }
  const genomes = genomeData.ucscGenomes;

  const structuredGenomes: Record<string, GenomeAssemblyFromSearch[]> ={}

  for(const genomeId in genomes){
    const genomeInfo = genomes[genomeId];
    const organism = genomeInfo.organism || "Others";
    
    if(!structuredGenomes[organism]){
      structuredGenomes[organism] = [];
    }
    structuredGenomes[organism].push({
      id: genomeId,
      name: genomeInfo.description || genomeId,
      sourceName: genomeInfo.sourceName || genomeId,
      active: !!genomeInfo.active // 1= true, 0= false
    });
  }

  return {
    genomes: structuredGenomes
  }
}

export async function getGenomeChromosomes(genomeId: string) {
  const api_url = `https://api.genome.ucsc.edu/list/chromosomes?genome=${genomeId}`;
  const response = await fetch(api_url);

  if(!response.ok){
    throw new Error("Failed to fetch chromosome list data");
  }

  const chromosomeData = await response.json()
  if(!chromosomeData.chromosomes){
    throw new Error("UCSC API ERROR: missing chromosomes");
  }
  
  const chromosomes: ChromosomeFromSearch[] = [];

  for(const chromosomeId in chromosomeData.chromosomes){
    if(chromosomeId.includes("_") || chromosomeId.includes("Un") || chromosomeId.includes("random")){
      continue;
    }

    chromosomes.push({
      name: chromosomeId,
      size: chromosomeData.chromosomes[chromosomeId]
    });
  }

  // sort by size
  chromosomes.sort((a, b) => {
    const anum = a.name.replace("chr", "");
    const bnum = b.name.replace("chr", "");
    const isNumA = /^\d+$/.test(anum);
    const isNumB = /^\d+$/.test(bnum);
    if(isNumA && isNumB){
      return Number(anum) - Number(bnum);
    }
    if(isNumA) return -1
    if(isNumB) return 1
    return anum.localeCompare(bnum);
  });

  return {
    chromosomes
  }
}