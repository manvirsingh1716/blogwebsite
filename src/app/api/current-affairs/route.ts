import { NextResponse } from "next/server";
import { env } from "@/config/env";

export async function GET() {
  try {
    // The backend endpoint for getting all current affairs by type is /type/:type
    // We need to fetch all types (daily, monthly, yearly)
    // The backend routes are registered as /currentAffair/... not /current-affair/...
    const dailyResponse = await fetch(`${env.API}/currentAffair/type/daily`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store' // Don't cache the response
    });

    const monthlyResponse = await fetch(`${env.API}/currentAffair/type/monthly`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store'
    });

    const yearlyResponse = await fetch(`${env.API}/currentAffair/type/yearly`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store'
    });

    // Combine all the responses
    const allSections = [];
    
    if (dailyResponse.ok) {
      const dailyData = await dailyResponse.json();
      if (dailyData.status === 'success' && dailyData.data) {
        allSections.push(...dailyData.data);
      }
    }
    
    if (monthlyResponse.ok) {
      const monthlyData = await monthlyResponse.json();
      if (monthlyData.status === 'success' && monthlyData.data) {
        allSections.push(...monthlyData.data);
      }
    }
    
    if (yearlyResponse.ok) {
      const yearlyData = await yearlyResponse.json();
      if (yearlyData.status === 'success' && yearlyData.data) {
        allSections.push(...yearlyData.data);
      }
    }

    return NextResponse.json({
      success: true,
      data: allSections
    });
  } catch (error) {
    console.error("Error fetching current affairs:", error);
    // Return empty data array on error
    return NextResponse.json({
      success: false,
      data: []
    }, { status: 500 });
  }
}
