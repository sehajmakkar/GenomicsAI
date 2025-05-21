import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const genome = searchParams.get('genome');
    
    if (!genome) {
      return NextResponse.json(
        { error: 'Genome parameter is required' },
        { status: 400 }
      );
    }
    
    const response = await fetch(`https://api.genome.ucsc.edu/list/chromosomes?genome=${genome}`);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch chromosome list: ${response.statusText}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching chromosome data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chromosome data' },
      { status: 500 }
    );
  }
}