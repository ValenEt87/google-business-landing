export const mockLocations = {
  locations: [
    {
      name: "mock-1",
      title: "Pizzería Don Pepe",
      phoneNumbers: {
        primaryPhone: "+54 11 5555 5555",
      },
      storefrontAddress: {
        addressLines: ["Av. Siempre Viva 123"],
      },
      websiteUri: "https://pizzeriadonpepe.com",
      regularHours: {
        periods: [
          { openDay: "MONDAY", openTime: "11:00", closeTime: "23:00" },
          { openDay: "TUESDAY", openTime: "11:00", closeTime: "23:00" },
          { openDay: "WEDNESDAY", openTime: "11:00", closeTime: "23:00" },
        ],
      },
    },
    {
      name: "mock-2",
      title: "Panadería La Espiga",
      phoneNumbers: {
        primaryPhone: "+54 11 4444 4444",
      },
      storefrontAddress: {
        addressLines: ["Calle Falsa 456"],
      },
      websiteUri: "https://panaderialaespiga.com",
      regularHours: {
        periods: [
          { openDay: "THURSDAY", openTime: "07:00", closeTime: "20:00" },
          { openDay: "FRIDAY", openTime: "07:00", closeTime: "20:00" },
          { openDay: "SATURDAY", openTime: "08:00", closeTime: "14:00" },
        ],
      },
    },
  ],
}
