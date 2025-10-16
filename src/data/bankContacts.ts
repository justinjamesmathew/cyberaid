/**
 * Bank Contact Information Database
 *
 * Contains fraud helpline numbers, SMS numbers, and email addresses
 * for major Indian banks.
 */

export interface BankContactInfo {
  name: string;
  fraudHelpline: string;
  fraudHelplineDisplay: string;
  smsNumber: string;
  smsNumberDisplay: string;
  email: string;
  website?: string;
}

export const BANK_CONTACTS: Record<string, BankContactInfo> = {
  "HDFC Bank": {
    name: "HDFC Bank",
    fraudHelpline: "18002586161",
    fraudHelplineDisplay: "1800-258-6161",
    smsNumber: "5676712",
    smsNumberDisplay: "5676712",
    email: "phishing@hdfcbank.com",
    website: "https://www.hdfcbank.com"
  },
  "State Bank of India": {
    name: "State Bank of India",
    fraudHelpline: "18004253800",
    fraudHelplineDisplay: "1800-425-3800",
    smsNumber: "09223588888",
    smsNumberDisplay: "09223-588-888",
    email: "complaint@sbi.co.in",
    website: "https://www.onlinesbi.com"
  },
  "SBI": {
    name: "State Bank of India",
    fraudHelpline: "18004253800",
    fraudHelplineDisplay: "1800-425-3800",
    smsNumber: "09223588888",
    smsNumberDisplay: "09223-588-888",
    email: "complaint@sbi.co.in",
    website: "https://www.onlinesbi.com"
  },
  "ICICI Bank": {
    name: "ICICI Bank",
    fraudHelpline: "18002662",
    fraudHelplineDisplay: "1800-200-2662",
    smsNumber: "5676766",
    smsNumberDisplay: "5676766",
    email: "customer.care@icicibank.com",
    website: "https://www.icicibank.com"
  },
  "Axis Bank": {
    name: "Axis Bank",
    fraudHelpline: "18004195959",
    fraudHelplineDisplay: "1800-419-5959",
    smsNumber: "5676788",
    smsNumberDisplay: "5676788",
    email: "customer.care@axisbank.com",
    website: "https://www.axisbank.com"
  },
  "Kotak Mahindra Bank": {
    name: "Kotak Mahindra Bank",
    fraudHelpline: "18002090000",
    fraudHelplineDisplay: "1800-209-0000",
    smsNumber: "5676788",
    smsNumberDisplay: "5676788",
    email: "customer.care@kotak.com",
    website: "https://www.kotak.com"
    // Source: https://www.kotak.com/en/customer-service/contact-us.html
    // Verified: Fraud & unauthorized transactions reporting number
  },
  "Punjab National Bank": {
    name: "Punjab National Bank",
    fraudHelpline: "18001802222",
    fraudHelplineDisplay: "1800-180-2222",
    smsNumber: "5607040",
    smsNumberDisplay: "5607040",
    email: "complaint@pnb.co.in",
    website: "https://www.pnbindia.in"
  },
  "PNB": {
    name: "Punjab National Bank",
    fraudHelpline: "18001802222",
    fraudHelplineDisplay: "1800-180-2222",
    smsNumber: "5607040",
    smsNumberDisplay: "5607040",
    email: "complaint@pnb.co.in",
    website: "https://www.pnbindia.in"
  },
  "Bank of Baroda": {
    name: "Bank of Baroda",
    fraudHelpline: "18001024455",
    fraudHelplineDisplay: "1800-102-4455",
    smsNumber: "8468001111",
    smsNumberDisplay: "8468-001-111",
    email: "complaint@bankofbaroda.com",
    website: "https://www.bankofbaroda.in"
  },
  "Canara Bank": {
    name: "Canara Bank",
    fraudHelpline: "18004250018",
    fraudHelplineDisplay: "1800-425-0018",
    smsNumber: "09015483483",
    smsNumberDisplay: "09015-483-483",
    email: "complaints@canarabank.com",
    website: "https://www.canarabank.com"
  },
  "Union Bank of India": {
    name: "Union Bank of India",
    fraudHelpline: "18002082244",
    fraudHelplineDisplay: "1800-208-2244",
    smsNumber: "09278792787",
    smsNumberDisplay: "09278-792-787",
    email: "complaint@unionbankofindia.co.in",
    website: "https://www.unionbankofindia.co.in"
  },
  "Bank of India": {
    name: "Bank of India",
    fraudHelpline: "18001031906",
    fraudHelplineDisplay: "1800-103-1906",
    smsNumber: "09015135135",
    smsNumberDisplay: "09015-135-135",
    email: "customercare@bankofindia.co.in",
    website: "https://www.bankofindia.co.in"
  },
  "IDBI Bank": {
    name: "IDBI Bank",
    fraudHelpline: "18002094324",
    fraudHelplineDisplay: "1800-209-4324",
    smsNumber: "5676720",
    smsNumberDisplay: "5676720",
    email: "customer.care@idbibank.co.in",
    website: "https://www.idbibank.in"
  },
  "Yes Bank": {
    name: "Yes Bank",
    fraudHelpline: "18001200",
    fraudHelplineDisplay: "1800-1200",
    smsNumber: "09840909000",
    smsNumberDisplay: "09840-909-000",
    email: "customercare@yesbank.in",
    website: "https://www.yesbank.in"
  },
  "IndusInd Bank": {
    name: "IndusInd Bank",
    fraudHelpline: "18002094030",
    fraudHelplineDisplay: "1800-209-4030",
    smsNumber: "5676777",
    smsNumberDisplay: "5676777",
    email: "customer.care@indusind.com",
    website: "https://www.indusind.com"
  },
  "IDFC First Bank": {
    name: "IDFC First Bank",
    fraudHelpline: "18002700720",
    fraudHelplineDisplay: "1800-270-0720",
    smsNumber: "08062688888",
    smsNumberDisplay: "08062-688-888",
    email: "customer.care@idfcfirstbank.com",
    website: "https://www.idfcfirstbank.com"
  },
  "Paytm Payments Bank": {
    name: "Paytm Payments Bank",
    fraudHelpline: "18001800120",
    fraudHelplineDisplay: "1800-180-0120",
    smsNumber: "7738101111",
    smsNumberDisplay: "7738-101-111",
    email: "care@paytm.com",
    website: "https://www.paytm.com"
  }
};

/**
 * Get bank contact information by bank name
 * Returns default contact info if bank not found
 */
export function getBankContacts(bankName: string): BankContactInfo {
  const contacts = BANK_CONTACTS[bankName];

  if (contacts) {
    return contacts;
  }

  // Return default/generic contact info if bank not found
  return {
    name: bankName || "Your Bank",
    fraudHelpline: "1800XXXXX",
    fraudHelplineDisplay: "1800-XXXXX (Check your bank's website)",
    smsNumber: "XXXXX",
    smsNumberDisplay: "XXXXX (Check your bank's website)",
    email: "fraud@yourbank.com",
    website: ""
  };
}

/**
 * Get list of all supported banks
 */
export function getSupportedBanks(): string[] {
  return Object.keys(BANK_CONTACTS).sort();
}

/**
 * Check if bank is in database
 */
export function isBankSupported(bankName: string): boolean {
  return bankName in BANK_CONTACTS;
}
