import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";  // ajusta path
// importa tu prisma u otros si necesitas comparar con DB

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log("🧪 [GBP DEBUG] SESSION", session);

  const accessToken = (session as any)?.accessToken;
  if (!accessToken) {
    return new Response(JSON.stringify({ error: "No access token" }), { status: 401 });
  }

  try {
    // 1. accounts.list
    const resAccounts = await fetch(
      "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const accountsData = await resAccounts.json();
    console.log("🧪 [GBP DEBUG] accounts:", accountsData);

    let locationsData = null;
    if (accountsData.accounts?.length) {
      const acctName = accountsData.accounts[0].name; // p.ej. "accounts/12345"
      // 2. locations list (Business Information API)
      const resLocations = await fetch(
        `https://mybusinessbusinessinformation.googleapis.com/v1/${acctName}/locations`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      locationsData = await resLocations.json();
      console.log("🧪 [GBP DEBUG] locations:", locationsData);
    }

    return new Response(JSON.stringify({ accounts: accountsData, locations: locationsData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("🧪 [GBP DEBUG] error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
}
