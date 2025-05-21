import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.genome.ucsc.edu/list/ucscGenomes');
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch genome list: ${response.statusText}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching genome data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch genome data' },
      { status: 500 }
    );
  }
}