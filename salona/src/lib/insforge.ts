import { createClient } from "@insforge/sdk"

const baseUrl = "https://p8msyq53.us-east.insforge.app"
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0OTYyMDh9.dDDfZSUDoNI3f7Su9WHSDWEApo0m1eCeUxOT5LYO4RM"

export const insforge = createClient({
    baseUrl,
    anonKey
})
