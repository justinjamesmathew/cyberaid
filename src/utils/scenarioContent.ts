// Scenario-specific content generator for scripts, SMS, and emails

export interface ScenarioContent {
  callScript: string;
  smsTemplate: string;
  emailBody: string;
  immediateActions: string[];
  urgentKeywords: string[];
}

export const generateScenarioContent = (fraudScenario: string, caseDetails: any): ScenarioContent => {
  const scenario = fraudScenario.toLowerCase();

  // UPI QR Code Amount Manipulation
  if (scenario.includes("qr") && scenario.includes("amount manipulation")) {
    return {
      callScript: `Hello, I'm calling to report an URGENT UPI QR code fraud.

INCIDENT DETAILS:
• Fraud Type: QR Code Amount Manipulation
• What Happened: I scanned a QR code to pay a small amount, but a much larger amount was deducted
• Expected Amount: [Original amount]
• Actual Debited: ${caseDetails.amount || "₹_____"}
• Transaction ID: ${caseDetails.transactionId || "[From UPI app]"}
• Date & Time: ${caseDetails.dateTime || "Just now"}
• Merchant/Recipient: ${caseDetails.recipientUPI || "[Merchant UPI ID]"}
• My UPI App: [PhonePe/GPay/Paytm/Other]

URGENT REQUESTS:
1. Report this merchant UPI ID for fraud investigation
2. Request transaction reversal or chargeback for the excess amount
3. Block my UPI/card to prevent further unauthorized transactions
4. Provide me with a complaint reference number
5. Send email confirmation of this complaint

TIME CRITICAL: This happened within the last hour. Please act immediately to freeze the recipient account and recover funds.

My Details:
• Name: ${caseDetails.name || "[Your name]"}
• Mobile: ${caseDetails.mobile || "[Your number]"}
• Account Number: ${caseDetails.accountNumber || "[Your account]"}

Can you help me RIGHT NOW?`,

      smsTemplate: `URGENT: QR Code fraud reported. Transaction ID: ${caseDetails.transactionId || "___"}. Amount ${caseDetails.amount || "₹___"} debited via manipulated QR code. Request IMMEDIATE account freeze of recipient ${caseDetails.recipientUPI || "___"} and chargeback. Complaint ref: [REF from call]. ${caseDetails.name || "[Name]"}, ${caseDetails.mobile || "[Mobile]"}`,

      emailBody: `Subject: URGENT: QR Code Amount Manipulation - Transaction ID ${caseDetails.transactionId || "___"}

Dear ${caseDetails.bank || "Bank"} Fraud Team,

I am writing to report an URGENT fraudulent transaction involving QR code amount manipulation.

INCIDENT SUMMARY:
I scanned a UPI QR code at a merchant location to make a small payment. However, the QR code was manipulated to deduct a significantly higher amount from my account without my knowledge or consent.

TRANSACTION DETAILS:
• Transaction ID: ${caseDetails.transactionId || "[From UPI app]"}
• Date & Time: ${caseDetails.dateTime || "[Date/Time]"}
• Expected Amount: [Small amount, e.g., ₹50-500]
• Amount Actually Debited: ${caseDetails.amount || "₹_____"}
• Excess Amount: [Calculate difference]
• Recipient UPI ID: ${caseDetails.recipientUPI || "[Merchant UPI]"}
• UPI App Used: [PhonePe/Google Pay/Paytm]
• Merchant Location: [If known]

HOW THIS HAPPENED:
The merchant displayed a QR code for payment. I scanned it expecting to pay a small amount, but the QR code was pre-configured with a much higher amount. I was not shown the amount before the payment was processed, or it was processed too quickly for me to verify.

IMMEDIATE ACTIONS TAKEN:
• Called bank fraud helpline: ${new Date().toLocaleString()}
• Complaint Reference: [From call]
• Filed cybercrime complaint: [If done]
• Disabled UPI on all apps: [Yes/No]

URGENT REQUESTS:
1. Report this merchant UPI ID (${caseDetails.recipientUPI || "___"}) for fraud investigation and blacklisting
2. Initiate chargeback for the full fraudulent amount of ${caseDetails.amount || "₹___"}
3. Investigate this merchant for QR code manipulation
4. Block my UPI and cards to prevent further unauthorized transactions
5. Provide written acknowledgment of this complaint
6. Share the investigation timeline and expected resolution date
7. Assist in recovering the fraudulent amount

EVIDENCE ATTACHED:
• UPI transaction confirmation screenshot
• QR code photograph (if available)
• Merchant location details
• Payment app transaction history

LEGAL REFERENCE:
As per RBI guidelines on unauthorized digital transactions and the IT Act provisions on cyber fraud, I request immediate action within the stipulated timeline. This is a clear case of fraud through QR code manipulation.

CONTACT DETAILS:
Name: ${caseDetails.name || "[Your Name]"}
Account Number: ${caseDetails.accountNumber || "[Account]"}
Mobile: ${caseDetails.mobile || "[Mobile]"}
Email: ${caseDetails.email || "[Email]"}

This is an extremely time-sensitive matter. The golden window for fund recovery is very short. I expect immediate action and a response within 24 hours.

Thank you for your urgent attention.

Sincerely,
${caseDetails.name || "[Your Name]"}`,

      immediateActions: [
        "Call bank fraud helpline - report QR code manipulation",
        "Request immediate freeze of merchant/recipient account",
        "Disable UPI on all your apps (PhonePe, GPay, Paytm)",
        "Take photo of the QR code if still at location",
        "Note down merchant details (name, location, contact)"
      ],

      urgentKeywords: ["QR code manipulation", "wrong amount deducted", "merchant account freeze", "immediate chargeback"]
    };
  }

  // Account Takeover
  if (scenario.includes("account takeover") || scenario.includes("compromised")) {
    return {
      callScript: `Hello, this is an EMERGENCY. My account has been compromised and taken over.

CRITICAL SITUATION:
• Fraud Type: Account Takeover
• What Happened: ${scenario.includes("friend") ? "My friend's/family member's account was used to defraud me" : "Unauthorized access to my account"}
• Unauthorized Transactions: Yes
• Can Access Account: ${caseDetails.canAccess !== false ? "Yes, but suspicious activity" : "No, locked out"}
• Password Changed: ${caseDetails.passwordChanged || "Unknown"}

IMMEDIATE ACTIONS NEEDED:
1. FREEZE my account IMMEDIATELY - no transactions in or out
2. Block all cards linked to this account
3. Disable all UPI apps linked to this account
4. Change my mobile number registration if compromised
5. Reset all passwords and PINs

UNAUTHORIZED TRANSACTIONS:
• Transaction ID: ${caseDetails.transactionId || "[Multiple]"}
• Amount: ${caseDetails.amount || "₹_____"}
• Date/Time: ${caseDetails.dateTime || "[Multiple times]"}
• Recipient: ${caseDetails.recipientUPI || "[Unknown]"}

HOW IT HAPPENED:
${scenario.includes("otp") ? "I was tricked into sharing OTP/password" : "Unknown - possibly through phishing or data breach"}

I need you to:
1. Freeze account NOW
2. Reverse all unauthorized transactions
3. Secure my account
4. Provide complaint reference
5. Guide me on next steps

My Details:
• Name: ${caseDetails.name || "[Your name]"}
• Account: ${caseDetails.accountNumber || "[Account]"}
• Mobile: ${caseDetails.mobile || "[Mobile]"}

This is CRITICAL - please act IMMEDIATELY!`,

      smsTemplate: `EMERGENCY: Account takeover. Unauthorized transactions detected. Request IMMEDIATE account freeze. Amount: ${caseDetails.amount || "₹___"}. Transaction ID: ${caseDetails.transactionId || "Multiple"}. Block all cards and UPI. Complaint ref: [REF]. ${caseDetails.name || "[Name]"}`,

      emailBody: `Subject: EMERGENCY: Account Takeover - Immediate Freeze Required

Dear ${caseDetails.bank || "Bank"} Security Team,

This is an EMERGENCY. My account has been compromised and taken over by fraudsters.

CRITICAL INCIDENT:
Unauthorized individuals have gained access to my account and are making fraudulent transactions. Immediate action is required to prevent further loss.

UNAUTHORIZED ACCESS DETAILS:
• How Compromised: ${scenario.includes("otp") ? "OTP/Password sharing (social engineering)" : "Unknown - possibly phishing/data breach"}
• First Detected: ${caseDetails.dateTime || "[Date/Time]"}
• Current Status: ${caseDetails.canAccess !== false ? "I can still access but see unauthorized activity" : "Locked out of account"}
• Password Status: ${caseDetails.passwordChanged ? "Changed by fraudster" : "Unknown"}

UNAUTHORIZED TRANSACTIONS:
${caseDetails.transactionId ? `• Transaction ID: ${caseDetails.transactionId}` : "• Multiple unauthorized transactions"}
• Total Amount: ${caseDetails.amount || "₹_____"}
• Recipients: ${caseDetails.recipientUPI || "Multiple unknown accounts"}
• Transaction Method: ${caseDetails.paymentMethod || "UPI/Net Banking"}

IMMEDIATE EMERGENCY REQUESTS:
1. ⚠️ FREEZE account immediately - block all transactions
2. ⚠️ Block all cards (debit and credit) linked to this account
3. ⚠️ Disable all UPI apps linked to this account
4. ⚠️ Reverse all unauthorized transactions
5. ⚠️ Reset all authentication credentials
6. ⚠️ Change mobile number registration if compromised
7. ⚠️ Enable enhanced security monitoring

ACTIONS I'VE TAKEN:
• Called fraud helpline: ${new Date().toLocaleString()}
• Changed passwords on accessible accounts
• Disabled UPI apps where possible
• Filed cybercrime complaint: [If done]
• Blocked cards through app/website

EVIDENCE:
• Screenshots of unauthorized transactions
• Call/SMS logs from fraudsters (if applicable)
• Timeline of suspicious activities
• Device/IP logs showing unauthorized access

CONTACT DETAILS:
Name: ${caseDetails.name || "[Your Name]"}
Account: ${caseDetails.accountNumber || "[Account]"}
Mobile: ${caseDetails.mobile || "[Registered Mobile]"}
Email: ${caseDetails.email || "[Email]"}

This requires IMMEDIATE action. Every minute of delay increases my financial loss.

Urgently,
${caseDetails.name || "[Your Name]"}`,

      immediateActions: [
        "Call bank IMMEDIATELY - report account takeover",
        "Request complete account freeze",
        "Block all cards linked to account",
        "Change all passwords (banking, email, linked services)",
        "Enable 2-factor authentication everywhere"
      ],

      urgentKeywords: ["account takeover", "unauthorized access", "freeze account", "block cards", "password compromised"]
    };
  }

  // Card Cloning / Skimming
  if (scenario.includes("skimming") || scenario.includes("cloning")) {
    return {
      callScript: `Hello, I'm reporting card fraud - my card has been skimmed/cloned.

INCIDENT:
• Fraud Type: Card ${scenario.includes("skimming") ? "Skimming" : "Cloning"}
• Where: ${scenario.includes("atm") ? "ATM machine" : "Point of Sale (POS)"}
• When: ${caseDetails.dateTime || "[Date/Time]"}
• Suspicious Location: [ATM/Store address if known]

WHAT HAPPENED:
${scenario.includes("atm")
  ? "I used an ATM that looked tampered/suspicious. Now seeing unauthorized transactions."
  : "My card was swiped at a store, now seeing unauthorized charges."}

UNAUTHORIZED TRANSACTIONS:
• Card Number: ****${caseDetails.cardLast4 || "XXXX"}
• Amount Lost: ${caseDetails.amount || "₹_____"}
• Transaction Locations: ${caseDetails.txnLocations || "[Multiple/International]"}
• Transaction IDs: ${caseDetails.transactionId || "[Multiple]"}

IMMEDIATE ACTIONS NEEDED:
1. BLOCK this card immediately (****${caseDetails.cardLast4 || "XXXX"})
2. Issue new card with DIFFERENT number
3. Dispute all unauthorized transactions
4. Check if other cards are compromised
5. Investigate the ${scenario.includes("atm") ? "ATM" : "merchant"} location

SUSPICIOUS SIGNS:
${scenario.includes("atm")
  ? "• ATM had loose card slot / strange attachments\n• PIN pad felt unusual\n• Card took long to be returned"
  : "• Cashier took card away from sight\n• Multiple swipes for one transaction\n• Delay in returning card"}

My Details:
• Name: ${caseDetails.name || "[Your name]"}
• Card: ****${caseDetails.cardLast4 || "XXXX"}
• Mobile: ${caseDetails.mobile || "[Mobile]"}

Please block card NOW and start investigation.`,

      smsTemplate: `URGENT: Card fraud. Card ****${caseDetails.cardLast4 || "XXXX"} ${scenario.includes("skimming") ? "skimmed" : "cloned"}. Unauthorized transactions ${caseDetails.amount || "₹___"}. Request IMMEDIATE card block & new card issuance. Complaint ref: [REF]. ${caseDetails.name || "[Name]"}`,

      emailBody: `Subject: URGENT: Card ${scenario.includes("skimming") ? "Skimming" : "Cloning"} - Block Card & Dispute Transactions

Dear ${caseDetails.bank || "Bank"} Card Fraud Team,

I am reporting card fraud. My card has been ${scenario.includes("skimming") ? "skimmed" : "cloned"} and unauthorized transactions are being made.

INCIDENT DETAILS:
• Card Number: ****${caseDetails.cardLast4 || "XXXX"}
• Card Type: ${caseDetails.cardType || "[Debit/Credit]"}
• Fraud Type: ${scenario.includes("skimming") ? "Card Skimming" : "Card Cloning"}
• Location of Skimming: ${scenario.includes("atm") ? "ATM" : "Merchant POS"}
• Date of Original Transaction: ${caseDetails.dateTime || "[Date]"}
• Location: ${caseDetails.location || "[ATM/Store address]"}

UNAUTHORIZED TRANSACTIONS:
• First Detected: ${caseDetails.dateTime || "[Date/Time]"}
• Total Amount: ${caseDetails.amount || "₹_____"}
• Number of Transactions: ${caseDetails.txnCount || "[Count]"}
• Transaction Locations: ${caseDetails.txnLocations || "[Multiple locations/countries]"}
• Transaction IDs: ${caseDetails.transactionId || "[List all IDs]"}

HOW CARD WAS COMPROMISED:
${scenario.includes("atm")
  ? `I used an ATM that appeared to have skimming devices:
• Card slot had loose or unusual attachments
• PIN pad felt different or had overlay
• Card took unusually long to be returned
• ATM behavior was suspicious

ATM Details:
• Bank: [ATM Bank Name]
• Location: [Exact Address]
• ATM ID: [If visible]
• Date/Time Used: [Date/Time]`
  : `My card was used at a merchant where skimming likely occurred:
• Cashier took card out of my sight
• Card was swiped multiple times
• Unusual delay in transaction
• No chip reader used (magnetic strip)

Merchant Details:
• Store Name: [Merchant]
• Location: [Address]
• Date/Time: [Date/Time]`}

IMMEDIATE ACTIONS REQUESTED:
1. ⚠️ BLOCK card ****${caseDetails.cardLast4 || "XXXX"} immediately
2. ⚠️ Issue new card with DIFFERENT card number
3. ⚠️ Dispute and reverse ALL unauthorized transactions
4. ⚠️ Investigate the ${scenario.includes("atm") ? "ATM" : "merchant"} location for skimming devices
5. ⚠️ Check if my other cards are compromised
6. ⚠️ Enable enhanced fraud monitoring
7. ⚠️ Compensate for fraudulent charges as per bank policy

ACTIONS TAKEN:
• Blocked card via mobile app: [Yes/No]
• Called fraud helpline: ${new Date().toLocaleString()}
• Filed cybercrime complaint: [If done]
• Checked other cards: [Status]

EVIDENCE:
• Transaction receipts (original vs fraudulent)
• Card usage timeline showing impossible transactions
• Photos of suspicious ${scenario.includes("atm") ? "ATM" : "POS terminal"} (if available)
• Bank statements highlighting unauthorized transactions

CONTACT:
Name: ${caseDetails.name || "[Your Name]"}
Customer ID: ${caseDetails.customerId || "[Customer ID]"}
Mobile: ${caseDetails.mobile || "[Mobile]"}
Email: ${caseDetails.email || "[Email]"}

I request immediate action and zero liability for these fraudulent transactions as per RBI guidelines.

Sincerely,
${caseDetails.name || "[Your Name]"}`,

      immediateActions: [
        `Block card ****${caseDetails.cardLast4 || "XXXX"} immediately`,
        "Request new card with different number",
        "Dispute all unauthorized transactions",
        "Check all other cards for unauthorized activity",
        `Report ${scenario.includes("atm") ? "ATM" : "merchant"} location to bank`
      ],

      urgentKeywords: ["card skimming", "card cloning", "block card", "dispute transactions", "ATM fraud"]
    };
  }

  // Phishing
  if (scenario.includes("phishing")) {
    return {
      callScript: `Hello, I'm reporting a phishing attack where I was tricked into sharing my details.

INCIDENT:
• Fraud Type: ${scenario.includes("email") ? "Email Phishing" : scenario.includes("sms") ? "SMS Phishing" : "Voice Phishing (Vishing)"}
• How Contacted: ${scenario.includes("email") ? "Email" : scenario.includes("sms") ? "SMS/WhatsApp" : "Phone Call"}
• When: ${caseDetails.dateTime || "[Date/Time]"}
• What I Shared: ${caseDetails.sharedInfo || "[OTP/Password/Card Details]"}

WHAT HAPPENED:
I received a ${scenario.includes("email") ? "convincing email" : scenario.includes("sms") ? "text message" : "phone call"} that looked like it was from ${caseDetails.bank || "my bank"}. I was tricked into ${caseDetails.sharedInfo?.includes("otp") ? "sharing my OTP" : "providing my account details"}.

DAMAGE ASSESSMENT:
• Money Lost: ${caseDetails.amount || "₹_____ / Checking"}
• Information Shared: ${caseDetails.sharedInfo || "[OTP/Password/Card/Account details]"}
• Fraudster Details: ${caseDetails.fraudsterContact || "[Phone/Email/Link]"}

IMMEDIATE ACTIONS NEEDED:
1. Freeze my account/block cards immediately
2. Reset all passwords and PINs
3. Reverse any unauthorized transactions
4. Enable enhanced security (2FA)
5. Monitor account for suspicious activity

FRAUDSTER INFORMATION:
• Contact Method: ${scenario.includes("email") ? "Email address: " + (caseDetails.fraudsterEmail || "[Email]") : scenario.includes("sms") ? "Phone number: " + (caseDetails.fraudsterPhone || "[Number]") : "Caller ID: " + (caseDetails.fraudsterPhone || "[Number]")}
• Message/Call Content: [What they said]
• Link Clicked: ${caseDetails.linkClicked || "[If any]"}

My Details:
• Name: ${caseDetails.name || "[Your name]"}
• Account: ${caseDetails.accountNumber || "[Account]"}
• Mobile: ${caseDetails.mobile || "[Mobile]"}

Please secure my account immediately and reverse any fraudulent transactions.`,

      smsTemplate: `URGENT: Phishing attack. Shared ${caseDetails.sharedInfo || "credentials"} with fraudster. Request immediate account freeze, password reset. Loss: ${caseDetails.amount || "Checking"}. Fraudster: ${caseDetails.fraudsterContact || "___"}. Complaint ref: [REF]. ${caseDetails.name || "[Name]"}`,

      emailBody: `Subject: URGENT: Phishing Attack - Account Security Breach

Dear ${caseDetails.bank || "Bank"} Security Team,

I am reporting a phishing attack where I was socially engineered into sharing sensitive information.

PHISHING ATTACK DETAILS:
• Attack Type: ${scenario.includes("email") ? "Email Phishing" : scenario.includes("sms") ? "SMS Phishing (Smishing)" : "Voice Phishing (Vishing)"}
• Attack Vector: ${scenario.includes("email") ? "Fraudulent Email" : scenario.includes("sms") ? "Text Message/WhatsApp" : "Phone Call"}
• Date/Time: ${caseDetails.dateTime || "[Date/Time]"}
• Fraudster Impersonated: ${caseDetails.bank || "Bank"} / Official

HOW THE ATTACK HAPPENED:
${scenario.includes("email")
  ? `I received an email that appeared to be from ${caseDetails.bank || "the bank"}. The email:
• Had official-looking branding and logos
• Claimed there was an issue with my account
• Provided a link to "verify" my details
• Email address: ${caseDetails.fraudsterEmail || "[Fraudster email]"}
• Link clicked: ${caseDetails.linkClicked || "[If clicked]"}`
  : scenario.includes("sms")
  ? `I received a text message claiming to be from ${caseDetails.bank || "the bank"}:
• Message appeared official with sender ID mimicking bank
• Claimed urgent action needed on account
• Provided link or asked to call a number
• Sender: ${caseDetails.fraudsterPhone || "[Sender ID/Number]"}
• Message content: [Copy message text]`
  : `I received a phone call from someone claiming to be ${caseDetails.bank || "bank"} staff:
• Caller ID: ${caseDetails.fraudsterPhone || "[Spoofed number]"}
• Caller claimed to be from fraud department
• Used official-sounding language and procedures
• Created sense of urgency`}

INFORMATION COMPROMISED:
• ${caseDetails.sharedInfo?.includes("otp") ? "✓ OTP/PIN" : ""}
• ${caseDetails.sharedInfo?.includes("password") ? "✓ Password" : ""}
• ${caseDetails.sharedInfo?.includes("card") ? "✓ Card details (number, CVV, expiry)" : ""}
• ${caseDetails.sharedInfo?.includes("account") ? "✓ Account number" : ""}
• Other: ${caseDetails.otherInfo || "[List any other info]"}

FINANCIAL IMPACT:
• Unauthorized Transactions: ${caseDetails.transactionId ? "Yes" : "Checking"}
• Amount Lost: ${caseDetails.amount || "Under investigation"}
• Transaction Details: ${caseDetails.transactionId || "[Checking statement]"}

IMMEDIATE ACTIONS REQUESTED:
1. ⚠️ FREEZE account immediately
2. ⚠️ Block all cards
3. ⚠️ Reset passwords and PINs
4. ⚠️ Reverse unauthorized transactions
5. ⚠️ Enable 2-factor authentication
6. ⚠️ Add fraud alerts on account
7. ⚠️ Investigate and block fraudster contact details

ACTIONS I'VE TAKEN:
• Changed passwords on all accessible accounts
• Disabled UPI and mobile banking
• Called fraud helpline immediately
• Filed cybercrime complaint: [If done]
• Preserved evidence (screenshots, call logs, messages)

EVIDENCE ATTACHED:
• ${scenario.includes("email") ? "Phishing email with headers" : ""}
• ${scenario.includes("sms") ? "SMS screenshots with sender details" : ""}
• ${scenario.includes("call") ? "Call logs showing fraudster number" : ""}
• Timeline of events
• Any transaction confirmations

FRAUDSTER DETAILS:
• ${scenario.includes("email") ? `Email: ${caseDetails.fraudsterEmail || "[Email]"}` : ""}
• ${scenario.includes("sms") || scenario.includes("call") ? `Phone: ${caseDetails.fraudsterPhone || "[Number]"}` : ""}
• ${caseDetails.linkClicked ? `Phishing Link: ${caseDetails.linkClicked}` : ""}

CONTACT:
Name: ${caseDetails.name || "[Your Name]"}
Account: ${caseDetails.accountNumber || "[Account]"}
Mobile: ${caseDetails.mobile || "[Mobile]"}
Email: ${caseDetails.email || "[Email]"}

Please take immediate action to secure my account and prevent further unauthorized access.

Urgently,
${caseDetails.name || "[Your Name]"}`,

      immediateActions: [
        "Freeze account / Block all cards immediately",
        "Change all passwords (banking, email, linked services)",
        "Enable 2-factor authentication",
        "Check for unauthorized transactions",
        "Report fraudster contact details to bank"
      ],

      urgentKeywords: ["phishing attack", "shared OTP", "freeze account", "password compromise", "unauthorized access"]
    };
  }

  // E-commerce Fraud
  if (scenario.includes("e-commerce") || scenario.includes("online seller")) {
    return {
      callScript: `Hello, I'm reporting e-commerce fraud.

INCIDENT:
• Fraud Type: E-commerce / Online Shopping Fraud
• Platform: ${caseDetails.platform || "[Website/App name]"}
• Seller: ${caseDetails.seller || "[Seller name]"}
• Order ID: ${caseDetails.orderId || "[Order number]"}

WHAT HAPPENED:
I paid for a product online but ${caseDetails.issue === "not-delivered" ? "never received it" : "received fake/wrong product"}.

TRANSACTION DETAILS:
• Amount Paid: ${caseDetails.amount || "₹_____"}
• Payment Method: ${caseDetails.paymentMethod || "UPI/Card"}
• Transaction ID: ${caseDetails.transactionId || "[Transaction ID]"}
• Date of Payment: ${caseDetails.dateTime || "[Date]"}
• Expected Delivery: ${caseDetails.expectedDelivery || "[Date]"}

SELLER DETAILS:
• Seller Name: ${caseDetails.seller || "[Name]"}
• Contact: ${caseDetails.sellerContact || "[Phone/Email]"}
• Website/App: ${caseDetails.platform || "[Platform]"}
• Product: ${caseDetails.product || "[Product description]"}

REQUESTS:
1. Initiate chargeback for ${caseDetails.amount || "₹___"}
2. Help me get refund from platform
3. Report fraudulent seller
4. Provide complaint reference

My Details:
• Name: ${caseDetails.name || "[Your name]"}
• Payment from: ${caseDetails.paymentMethod || "[UPI/Card]"}
• Mobile: ${caseDetails.mobile || "[Mobile]"}

I need chargeback initiated immediately.`,

      smsTemplate: `E-commerce fraud report. Paid ${caseDetails.amount || "₹___"} to ${caseDetails.seller || "seller"}, no product received. Order: ${caseDetails.orderId || "___"}. Transaction: ${caseDetails.transactionId || "___"}. Request chargeback. Ref: [REF]. ${caseDetails.name || "[Name]"}`,

      emailBody: `Subject: Chargeback Request - E-commerce Fraud

Dear ${caseDetails.bank || "Bank"} Team,

I request a chargeback for an e-commerce fraud transaction.

TRANSACTION DETAILS:
• Amount: ${caseDetails.amount || "₹_____"}
• Transaction ID: ${caseDetails.transactionId || "[ID]"}
• Date: ${caseDetails.dateTime || "[Date]"}
• Payment Method: ${caseDetails.paymentMethod || "UPI/Card"}
• Merchant: ${caseDetails.seller || "[Seller]"}

FRAUD DETAILS:
Platform: ${caseDetails.platform || "[Platform]"}
Order ID: ${caseDetails.orderId || "[Order ID]"}
Product: ${caseDetails.product || "[Product]"}
Issue: ${caseDetails.issue === "not-delivered" ? "Product not delivered despite payment" : "Received counterfeit/wrong product"}

SELLER DETAILS:
Name: ${caseDetails.seller || "[Seller name]"}
Contact: ${caseDetails.sellerContact || "[Contact]"}
Status: Not responding / Disappeared

ATTEMPTS TO RESOLVE:
• Contacted seller: ${caseDetails.sellerAttempts || "Multiple times, no response"}
• Contacted platform: ${caseDetails.platformAttempt || "Yes, on [date]"}
• Platform response: ${caseDetails.platformResponse || "Not resolved"}

CHARGEBACK REQUEST:
I request immediate chargeback of ${caseDetails.amount || "₹___"} as per consumer protection guidelines.

EVIDENCE:
• Order confirmation
• Payment receipt
• Communication with seller/platform
• Delivery tracking (if any)
• Platform complaint ID

Contact:
${caseDetails.name || "[Your Name]"}
${caseDetails.mobile || "[Mobile]"}

Please process chargeback urgently.

Sincerely,
${caseDetails.name || "[Your Name]"}`,

      immediateActions: [
        "Contact seller - document all attempts",
        "Initiate chargeback via bank/payment app",
        "File complaint on platform",
        "File consumer complaint (consumer.gov.in)",
        "Report seller to platform"
      ],

      urgentKeywords: ["e-commerce fraud", "chargeback request", "product not delivered", "fraudulent seller"]
    };
  }

  // Default / Generic Fraud
  return {
    callScript: `Hello, I'm calling to report fraud on my account.

INCIDENT DETAILS:
• Fraud Type: ${fraudScenario}
• Date/Time: ${caseDetails.dateTime || "[When it happened]"}
• Amount: ${caseDetails.amount || "₹_____"}

WHAT HAPPENED:
${caseDetails.description || "[Describe the fraud]"}

TRANSACTION DETAILS:
• Transaction ID: ${caseDetails.transactionId || "[ID from app/SMS]"}
• Recipient/Merchant: ${caseDetails.recipientUPI || "[Where money went]"}
• Payment Method: ${caseDetails.paymentMethod || "UPI/Card/Net Banking"}

URGENT REQUESTS:
1. Report the recipient account for fraud investigation
2. Block my cards and freeze my account if needed to prevent further loss
3. Initiate transaction reversal or chargeback if possible
4. Provide complaint reference number
5. Guide me on next steps

MY DETAILS:
• Name: ${caseDetails.name || "[Your name]"}
• Account/Card: ${caseDetails.accountNumber || "[Account/Card]"}
• Mobile: ${caseDetails.mobile || "[Your number]"}

Please help me recover my money and secure my account.`,

    smsTemplate: `URGENT: Fraud reported. Type: ${fraudScenario}. Amount: ${caseDetails.amount || "₹___"}. Transaction: ${caseDetails.transactionId || "___"}. Request immediate action. Complaint ref: [REF from call]. ${caseDetails.name || "[Name]"}, ${caseDetails.mobile || "[Mobile]"}`,

    emailBody: `Subject: Fraud Report - ${fraudScenario}

Dear ${caseDetails.bank || "Bank"} Fraud Team,

I am reporting a fraudulent transaction on my account.

FRAUD TYPE: ${fraudScenario}

INCIDENT DETAILS:
• Date/Time: ${caseDetails.dateTime || "[Date/Time]"}
• Amount: ${caseDetails.amount || "₹_____"}
• Transaction ID: ${caseDetails.transactionId || "[Transaction ID]"}
• Recipient: ${caseDetails.recipientUPI || "[Recipient details]"}

DESCRIPTION:
${caseDetails.description || "[Detailed description of what happened]"}

ACTIONS TAKEN:
• Called fraud helpline: ${new Date().toLocaleString()}
• Complaint reference: [From call]
• Filed cybercrime complaint: [If done]

REQUESTS:
1. Report recipient account for fraud investigation
2. Request reversal of the fraudulent transaction if possible
3. Block my cards/UPI and secure my account
4. Investigate this fraud and track the recipient
5. Provide written acknowledgment

CONTACT:
Name: ${caseDetails.name || "[Your Name]"}
Mobile: ${caseDetails.mobile || "[Mobile]"}
Email: ${caseDetails.email || "[Email]"}

Please take immediate action to recover the funds.

Sincerely,
${caseDetails.name || "[Your Name]"}`,

    immediateActions: [
      "Call bank fraud helpline immediately",
      "Request account/card freeze if needed",
      "File cybercrime complaint",
      "Collect all evidence (screenshots, receipts)",
      "Note down all reference numbers"
    ],

    urgentKeywords: ["fraud report", "unauthorized transaction", "immediate action", "chargeback"]
  };
};
