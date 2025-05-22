import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const genome = searchParams.get('genome');
    const chrom = searchParams.get('chrom');
    const start = searchParams.get('start');
    const end = searchParams.get('end');
    
    if (!genome || !chrom || start === null || end === null) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    const response = await fetch(
      `https://api.genome.ucsc.edu/getData/sequence?genome=${genome};chrom=${chrom};start=${start};end=${end}`
    );
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch sequence data: ${response.statusText}` },
        { status: response.status }
      );
    }
    
    const data = await response.json() as unknown;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching sequence data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sequence data' },
      { status: 500 }
    );
  }
}