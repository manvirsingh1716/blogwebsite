import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Fetch pages from the backend API directly
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000/api/v1';
    console.log('Testing backend connection to:', backendUrl);
    
    // Test connection to backend API
    const apiUrl = `${backendUrl}/page/all`;
    console.log('Fetching from:', apiUrl);
    
    const response = await fetch(apiUrl, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Backend API response:', data);
      return NextResponse.json({
        source: 'backend',
        status: 'success',
        data: data
      });
    } else {
      console.error('Backend API error:', response.status, response.statusText);
      return NextResponse.json({
        source: 'backend',
        status: 'error',
        error: `Backend API returned ${response.status}: ${response.statusText}`
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error testing API connection:', error);
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
