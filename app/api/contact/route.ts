import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, projectType, message } = body

    // Validate required fields
    if (!name || !email || !projectType) {
      return NextResponse.json(
        { error: "Name, email, and project type are required." },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    // Log submission (in production, this would go to Airtable/CRM)
    console.log("\n═══════════════════════════════════════════")
    console.log("📨 New faja contact submission")
    console.log("───────────────────────────────────────────")
    console.log(`Name:         ${name}`)
    console.log(`Email:        ${email}`)
    console.log(`Project type: ${projectType}`)
    if (message) console.log(`Message:      ${message}`)
    console.log("═══════════════════════════════════════════\n")

    // TODO: Integrate with Airtable/CRM
    // await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     records: [{ fields: { Name: name, Email: email, ProjectType: projectType, Message: message } }],
    //   }),
    // })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
