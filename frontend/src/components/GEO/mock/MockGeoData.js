// src/mock/mockGeoData.js

export const offerPoints = [
  // Netherlands
  {
    id: "SO-001",
    countryCode: "NL",
    latitude: 52.0907,
    longitude: 5.1214,
    status: "Pending",
    offerValue: 55000,
    customerName: "Truck Dealer BV",
  },
  {
    id: "SO-002",
    countryCode: "NL",
    latitude: 51.9244,
    longitude: 4.4777,
    status: "Confirmed",
    offerValue: 76000,
    customerName: "Rotterdam Transportgroep",
  },
  {
    id: "SO-003",
    countryCode: "NL",
    latitude: 50.8514,
    longitude: 5.6910,
    status: "Draft",
    offerValue: 49000,
    customerName: "Limburg Logistics BV",
  },

  // Amsterdam region
  { id: "SO-001", countryCode: "NL", latitude: 52.3702, longitude: 4.8952, status: "Pending", offerValue: 54000, customerName: "Amsterdam Truck Center" },
  { id: "SO-002", countryCode: "NL", latitude: 52.3680, longitude: 4.9036, status: "Draft", offerValue: 47000, customerName: "Holland Fleet Services" },
  { id: "SO-003", countryCode: "NL", latitude: 52.3791, longitude: 4.9123, status: "Confirmed", offerValue: 61000, customerName: "City Logistics BV" },
  { id: "SO-004", countryCode: "NL", latitude: 52.3650, longitude: 4.8884, status: "Canceled", offerValue: 35000, customerName: "Metro Transportgroep" },
  { id: "SO-005", countryCode: "NL", latitude: 52.3861, longitude: 4.8744, status: "Pending", offerValue: 82000, customerName: "Noord-Holland Vehicles" },

  // Rotterdam region
  { id: "SO-006", countryCode: "NL", latitude: 51.9244, longitude: 4.4777, status: "Pending", offerValue: 76000, customerName: "Rotterdam Transportgroep" },
  { id: "SO-007", countryCode: "NL", latitude: 51.9271, longitude: 4.4824, status: "Draft", offerValue: 42000, customerName: "Haven Fleet Services" },
  { id: "SO-008", countryCode: "NL", latitude: 51.9198, longitude: 4.4741, status: "Confirmed", offerValue: 94000, customerName: "Maas Logistics BV" },
  { id: "SO-009", countryCode: "NL", latitude: 51.9302, longitude: 4.4532, status: "Pending", offerValue: 58000, customerName: "Port Trucks Holland" },
  { id: "SO-010", countryCode: "NL", latitude: 51.9382, longitude: 4.5060, status: "Confirmed", offerValue: 69000, customerName: "Rijnmond Transport" },

  // Utrecht region
  { id: "SO-011", countryCode: "NL", latitude: 52.0907, longitude: 5.1214, status: "Pending", offerValue: 55000, customerName: "Utrecht Mobility BV" },
  { id: "SO-012", countryCode: "NL", latitude: 52.0952, longitude: 5.1139, status: "Draft", offerValue: 48000, customerName: "Domstad Vehicles" },
  { id: "SO-013", countryCode: "NL", latitude: 52.0862, longitude: 5.1303, status: "Confirmed", offerValue: 87000, customerName: "Central Transport Group" },
  { id: "SO-014", countryCode: "NL", latitude: 52.1012, longitude: 5.0902, status: "Canceled", offerValue: 33000, customerName: "Holland Trailer Services" },
  { id: "SO-015", countryCode: "NL", latitude: 52.0780, longitude: 5.1280, status: "Pending", offerValue: 72000, customerName: "Utrecht Trucks & More" },

  // Eindhoven region
  { id: "SO-016", countryCode: "NL", latitude: 51.4416, longitude: 5.4697, status: "Pending", offerValue: 62000, customerName: "Eindhoven Truck Services" },
  { id: "SO-017", countryCode: "NL", latitude: 51.4503, longitude: 5.4795, status: "Draft", offerValue: 39000, customerName: "Brainport Logistics Group" },
  { id: "SO-018", countryCode: "NL", latitude: 51.4320, longitude: 5.4592, status: "Confirmed", offerValue: 91000, customerName: "Kempen Transportcentrum" },
  { id: "SO-019", countryCode: "NL", latitude: 51.4444, longitude: 5.5033, status: "Pending", offerValue: 55000, customerName: "Zuidoost Fleet BV" },
  { id: "SO-020", countryCode: "NL", latitude: 51.4349, longitude: 5.4561, status: "Confirmed", offerValue: 78000, customerName: "EHV Logistics" },

  // Groningen region
  { id: "SO-021", countryCode: "NL", latitude: 53.2194, longitude: 6.5665, status: "Draft", offerValue: 41000, customerName: "Groningen Freight BV" },
  { id: "SO-022", countryCode: "NL", latitude: 53.2161, longitude: 6.5802, status: "Pending", offerValue: 60000, customerName: "Noord Transportbedrijf" },
  { id: "SO-023", countryCode: "NL", latitude: 53.2305, longitude: 6.5688, status: "Confirmed", offerValue: 72000, customerName: "Groninger Trucks" },
  { id: "SO-024", countryCode: "NL", latitude: 53.2098, longitude: 6.5634, status: "Canceled", offerValue: 29000, customerName: "City North Vehicles" },
  { id: "SO-025", countryCode: "NL", latitude: 53.2400, longitude: 6.5550, status: "Pending", offerValue: 81000, customerName: "Wadden Logistics" },

  // Zwolle region
  { id: "SO-026", countryCode: "NL", latitude: 52.5168, longitude: 6.0830, status: "Pending", offerValue: 58000, customerName: "Zwolle Truck Service" },
  { id: "SO-027", countryCode: "NL", latitude: 52.5120, longitude: 6.0950, status: "Draft", offerValue: 42000, customerName: "IJssel Fleet Group" },
  { id: "SO-028", countryCode: "NL", latitude: 52.5252, longitude: 6.0973, status: "Confirmed", offerValue: 67000, customerName: "Overijssel Transportbedrijf" },
  { id: "SO-029", countryCode: "NL", latitude: 52.4983, longitude: 6.0771, status: "Pending", offerValue: 73000, customerName: "Zwolle Mobility BV" },
  { id: "SO-030", countryCode: "NL", latitude: 52.5350, longitude: 6.1100, status: "Canceled", offerValue: 31000, customerName: "Truck Solutions IJsselland" },

  // Maastricht region
  { id: "SO-031", countryCode: "NL", latitude: 50.8514, longitude: 5.6910, status: "Draft", offerValue: 39000, customerName: "Limburg Logistics BV" },
  { id: "SO-032", countryCode: "NL", latitude: 50.8543, longitude: 5.6970, status: "Pending", offerValue: 51000, customerName: "Maastricht Mobility Services" },
  { id: "SO-033", countryCode: "NL", latitude: 50.8610, longitude: 5.7035, status: "Confirmed", offerValue: 76000, customerName: "Zuid NL Transport" },
  { id: "SO-034", countryCode: "NL", latitude: 50.8431, longitude: 5.6804, status: "Pending", offerValue: 81000, customerName: "Europoort Freight BV" },
  { id: "SO-035", countryCode: "NL", latitude: 50.8575, longitude: 5.7101, status: "Canceled", offerValue: 27000, customerName: "Limburg Heavy Transport" },

  // Arnhem / Nijmegen
  { id: "SO-036", countryCode: "NL", latitude: 51.9851, longitude: 5.8987, status: "Pending", offerValue: 62000, customerName: "Arnhem Logistics Group" },
  { id: "SO-037", countryCode: "NL", latitude: 51.9894, longitude: 5.9223, status: "Draft", offerValue: 45000, customerName: "Gelderland Fleet BV" },
  { id: "SO-038", countryCode: "NL", latitude: 51.8126, longitude: 5.8372, status: "Confirmed", offerValue: 90000, customerName: "Nijmegen Trucks & Trailers" },
  { id: "SO-039", countryCode: "NL", latitude: 51.8203, longitude: 5.8702, status: "Pending", offerValue: 71000, customerName: "Waal Transport Services" },
  { id: "SO-040", countryCode: "NL", latitude: 51.8014, longitude: 5.8480, status: "Canceled", offerValue: 32000, customerName: "Oost Nederland Trucking" },

  // Tilburg / Breda
  { id: "SO-041", countryCode: "NL", latitude: 51.5555, longitude: 5.0913, status: "Pending", offerValue: 68000, customerName: "Tilburg Freight BV" },
  { id: "SO-042", countryCode: "NL", latitude: 51.5870, longitude: 4.7759, status: "Confirmed", offerValue: 75000, customerName: "Breda Transportbedrijf" },
  { id: "SO-043", countryCode: "NL", latitude: 51.5630, longitude: 5.0800, status: "Draft", offerValue: 44000, customerName: "Brabant Vehicle Group" },
  { id: "SO-044", countryCode: "NL", latitude: 51.5950, longitude: 4.7800, status: "Pending", offerValue: 83000, customerName: "West-Brabant Logistics" },
  { id: "SO-045", countryCode: "NL", latitude: 51.6001, longitude: 4.8200, status: "Canceled", offerValue: 36000, customerName: "Kempenland Transport" },

  // The Hague region
  { id: "SO-046", countryCode: "NL", latitude: 52.0705, longitude: 4.3007, status: "Pending", offerValue: 59000, customerName: "Den Haag Mobility Group" },
  { id: "SO-047", countryCode: "NL", latitude: 52.0801, longitude: 4.3169, status: "Draft", offerValue: 41000, customerName: "Hofstad Fleet Services" },
  { id: "SO-048", countryCode: "NL", latitude: 52.0617, longitude: 4.3246, status: "Confirmed", offerValue: 91000, customerName: "Randstad Transport" },
  { id: "SO-049", countryCode: "NL", latitude: 52.0938, longitude: 4.2836, status: "Pending", offerValue: 64000, customerName: "South Holland Vehicles" },
  { id: "SO-050", countryCode: "NL", latitude: 52.0550, longitude: 4.3015, status: "Canceled", offerValue: 28000, customerName: "Haaglanden Trucks BV" },

  // Germany
  {
    id: "SO-004",
    countryCode: "DE",
    latitude: 52.5200,
    longitude: 13.4050,
    status: "Pending",
    offerValue: 82000,
    customerName: "Berlin Nutzfahrzeuge GmbH",
  },
  {
    id: "SO-005",
    countryCode: "DE",
    latitude: 48.1351,
    longitude: 11.5820,
    status: "Confirmed",
    offerValue: 91000,
    customerName: "München Trucks & Service",
  },
  {
    id: "SO-006",
    countryCode: "DE",
    latitude: 53.5511,
    longitude: 9.9937,
    status: "Canceled",
    offerValue: 30000,
    customerName: "Hamburg Fleet Services",
  },

  // Belgium
  {
    id: "SO-007",
    countryCode: "BE",
    latitude: 50.8503,
    longitude: 4.3517,
    status: "Draft",
    offerValue: 42000,
    customerName: "Benelux Trucks NV",
  },
  {
    id: "SO-008",
    countryCode: "BE",
    latitude: 51.2194,
    longitude: 4.4025,
    status: "Pending",
    offerValue: 69000,
    customerName: "Antwerp Transport Solutions",
  },

  // Italy
  {
    id: "SO-009",
    countryCode: "IT",
    latitude: 45.4642,
    longitude: 9.1900,
    status: "Confirmed",
    offerValue: 61000,
    customerName: "Autocarri Milano SRL",
  },
  {
    id: "SO-010",
    countryCode: "IT",
    latitude: 41.9028,
    longitude: 12.4964,
    status: "Pending",
    offerValue: 78000,
    customerName: "Roma Logistics Group",
  },

  // France
  {
    id: "SO-011",
    countryCode: "FR",
    latitude: 48.8566,
    longitude: 2.3522,
    status: "Pending",
    offerValue: 80000,
    customerName: "Paris Transport Solutions",
  },
  {
    id: "SO-012",
    countryCode: "FR",
    latitude: 45.7640,
    longitude: 4.8357,
    status: "Draft",
    offerValue: 52000,
    customerName: "Lyon Freight Company",
  },
  {
    id: "SO-013",
    countryCode: "FR",
    latitude: 43.6047,
    longitude: 1.4442,
    status: "Confirmed",
    offerValue: 93000,
    customerName: "Toulouse Vehicle Group",
  },

  // Spain
  {
    id: "SO-014",
    countryCode: "ES",
    latitude: 40.4168,
    longitude: -3.7038,
    status: "Pending",
    offerValue: 70000,
    customerName: "Madrid Cargo SL",
  },
  {
    id: "SO-015",
    countryCode: "ES",
    latitude: 41.3874,
    longitude: 2.1686,
    status: "Canceled",
    offerValue: 38000,
    customerName: "Barcelona Fleet Services",
  },

  // UK
  {
    id: "SO-016",
    countryCode: "UK",
    latitude: 51.5074,
    longitude: -0.1278,
    status: "Pending",
    offerValue: 82000,
    customerName: "London Commercial Vehicles Ltd",
  },
  {
    id: "SO-017",
    countryCode: "UK",
    latitude: 53.4808,
    longitude: -2.2426,
    status: "Draft",
    offerValue: 47000,
    customerName: "Manchester Transport Co",
  },

  // Poland
  {
    id: "SO-018",
    countryCode: "PL",
    latitude: 52.2297,
    longitude: 21.0122,
    status: "Confirmed",
    offerValue: 64000,
    customerName: "Warsaw Truck Group",
  },
  {
    id: "SO-019",
    countryCode: "PL",
    latitude: 50.0647,
    longitude: 19.9450,
    status: "Pending",
    offerValue: 72000,
    customerName: "Krakow Logistics Sp.z.o.o",
  },

  // Denmark
  {
    id: "SO-020",
    countryCode: "DK",
    latitude: 55.6761,
    longitude: 12.5683,
    status: "Confirmed",
    offerValue: 87000,
    customerName: "Copenhagen Transport AS",
  },

  // Sweden
  {
    id: "SO-021",
    countryCode: "SE",
    latitude: 59.3293,
    longitude: 18.0686,
    status: "Pending",
    offerValue: 75000,
    customerName: "Stockholm Vehicle AB",
  },

  // Norway
  {
    id: "SO-022",
    countryCode: "NO",
    latitude: 59.9139,
    longitude: 10.7522,
    status: "Draft",
    offerValue: 54000,
    customerName: "Oslo Transportfirma",
  },
];
