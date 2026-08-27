import * as dotenv from "dotenv"
import path from "path"

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

import { getFreeBusy, ensureAuthenticated } from "./src/lib/googleCalendar"

async function test() {
    console.log("--- Starting Robust Auth Test ---")
    
    try {
        // 1. Initial Call (should trigger a refresh since we start with null expiry)
        console.log("\n1. First call (initial refresh)...")
        await getFreeBusy(new Date().toISOString(), new Date(Date.now() + 3600000).toISOString())
        
        // 2. Second Call (should REUSE the token, no "Refreshing..." log)
        console.log("\n2. Second call (should reuse)...")
        await getFreeBusy(new Date().toISOString(), new Date(Date.now() + 3600000).toISOString())
        
        console.log("\n--- Test Completed Successfully ---")
    } catch (err: any) {
        console.error("Test Failed:", err.message)
    }
}

test()
