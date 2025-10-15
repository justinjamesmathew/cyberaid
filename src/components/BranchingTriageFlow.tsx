import { useState } from "react";
import { ChevronRight, Clock, AlertCircle, CreditCard, Shield, CheckCircle } from "lucide-react";
import { buttons, cards, layouts, typography, progress, animations } from "../styles/designSystem";

interface BranchingTriageFlowProps {
  onComplete: (result: TriageResult) => void;
}

export interface TriageResult {
  fraudScenario: string;
  urgencyLevel: "critical" | "urgent" | "high" | "standard";
  actions: ActionItem[];
  recoveryProbability: number;
  path: string[];
  answers: Record<string, string>;
}

export interface ActionItem {
  id: string;
  priority: "immediate" | "within-1h" | "within-4h" | "within-24h" | "follow-up";
  title: string;
  description: string;
  timeframe: string;
  icon: string;
}

interface Question {
  id: string;
  text: string;
  subtitle: string;
  icon: React.ReactNode;
  options: QuestionOption[];
}

interface QuestionOption {
  value: string;
  label: string;
  icon?: string;
  nextQuestion?: string | ((answers: Record<string, string>) => string);
  endpoint?: boolean;
}

export function BranchingTriageFlow({ onComplete }: BranchingTriageFlowProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState("Q1_TIME");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [path, setPath] = useState<string[]>([]);
  const [urgencyLevel, setUrgencyLevel] = useState<"critical" | "urgent" | "high" | "standard">("standard");

  // Question Database with Branching Logic
  const questions: Record<string, Question> = {
    // ===== LEVEL 1: TIME ASSESSMENT =====
    Q1_TIME: {
      id: "Q1_TIME",
      text: "When did this happen?",
      subtitle: "This determines how urgently we need to act",
      icon: <Clock className="w-8 h-8 text-red-600" />,
      options: [
        {
          value: "just-now",
          label: "Just now (less than 30 minutes ago)",
          icon: "🔥",
          nextQuestion: "Q2_MONEY_STATUS"
        },
        {
          value: "recent",
          label: "30 minutes to 4 hours ago",
          icon: "⚡",
          nextQuestion: "Q2_MONEY_STATUS"
        },
        {
          value: "today",
          label: "4 to 24 hours ago (today)",
          icon: "⚠️",
          nextQuestion: "Q2_MONEY_STATUS"
        },
        {
          value: "older",
          label: "More than 24 hours ago",
          icon: "📅",
          nextQuestion: "Q2_MONEY_STATUS"
        }
      ]
    },

    // ===== LEVEL 2: MONEY STATUS =====
    Q2_MONEY_STATUS: {
      id: "Q2_MONEY_STATUS",
      text: "Has money already left your account?",
      subtitle: "This helps us determine if we're recovering money or preventing loss",
      icon: <AlertCircle className="w-8 h-8 text-orange-600" />,
      options: [
        {
          value: "yes-lost",
          label: "Yes, money has been debited/transferred",
          icon: "💸",
          nextQuestion: "Q3_PAYMENT_METHOD"
        },
        {
          value: "prevented",
          label: "No, I stopped it or it failed",
          icon: "✋",
          nextQuestion: "Q3_PREVENTED"
        },
        {
          value: "not-sure",
          label: "I'm not sure, need to check",
          icon: "❓",
          nextQuestion: "Q3_CHECK"
        }
      ]
    },

    // ===== BRANCH A: LOSS PATH =====
    Q3_PAYMENT_METHOD: {
      id: "Q3_PAYMENT_METHOD",
      text: "How did the payment happen?",
      subtitle: "This identifies which accounts and services we need to secure",
      icon: <CreditCard className="w-8 h-8 text-purple-600" />,
      options: [
        {
          value: "upi",
          label: "UPI (PhonePe, Google Pay, Paytm, etc.)",
          icon: "📱",
          nextQuestion: "Q4_UPI_ACTIVITY"
        },
        {
          value: "card",
          label: "Debit or Credit card",
          icon: "💳",
          nextQuestion: "Q4_CARD_WHERE"
        },
        {
          value: "netbanking",
          label: "Net banking / Internet banking",
          icon: "🌐",
          nextQuestion: "Q4_NETBANK_ACCESS"
        },
        {
          value: "atm",
          label: "ATM / Cash withdrawal",
          icon: "🏧",
          nextQuestion: "Q4_ATM_ISSUE"
        },
        {
          value: "transfer",
          label: "Bank transfer (NEFT/RTGS/IMPS)",
          icon: "🏦",
          nextQuestion: "Q4_TRANSFER_TYPE"
        }
      ]
    },

    // ===== UPI BRANCH =====
    Q4_UPI_ACTIVITY: {
      id: "Q4_UPI_ACTIVITY",
      text: "What were you doing when this happened?",
      subtitle: "Understanding the activity helps us identify the exact scam type",
      icon: <AlertCircle className="w-8 h-8 text-blue-600" />,
      options: [
        {
          value: "scanning-qr",
          label: "Scanning a QR code at a shop or location",
          icon: "📷",
          nextQuestion: "Q5_QR_ISSUE"
        },
        {
          value: "sending-money",
          label: "Sending money to someone",
          icon: "💸",
          nextQuestion: "Q5_SENDING_WHO"
        },
        {
          value: "received-request",
          label: "Received a payment request (collect request)",
          icon: "📥",
          nextQuestion: "Q5_REQUEST_FROM"
        },
        {
          value: "using-app",
          label: "Installing or using an app",
          icon: "📱",
          nextQuestion: "Q5_APP_TYPE"
        }
      ]
    },

    Q5_QR_ISSUE: {
      id: "Q5_QR_ISSUE",
      text: "What went wrong with the QR code payment?",
      subtitle: "This pinpoints the exact manipulation technique used",
      icon: <AlertCircle className="w-8 h-8 text-orange-600" />,
      options: [
        {
          value: "wrong-amount",
          label: "Wrong amount was deducted (more than expected)",
          icon: "💰",
          endpoint: true
        },
        {
          value: "multiple-charges",
          label: "I was charged multiple times",
          icon: "🔄",
          endpoint: true
        },
        {
          value: "fake-merchant",
          label: "The merchant/shop was fake or suspicious",
          icon: "🎭",
          endpoint: true
        },
        {
          value: "different-recipient",
          label: "Money went to different recipient than expected",
          icon: "👤",
          endpoint: true
        }
      ]
    },

    Q5_SENDING_WHO: {
      id: "Q5_SENDING_WHO",
      text: "Who were you sending money to?",
      subtitle: "This helps identify if it's impersonation, e-commerce fraud, or other types",
      icon: <AlertCircle className="w-8 h-8 text-blue-600" />,
      options: [
        {
          value: "friend-family-compromised",
          label: "Friend or family member (but their account may be compromised)",
          icon: "👥",
          endpoint: true
        },
        {
          value: "online-seller",
          label: "Online seller or marketplace vendor",
          icon: "🛒",
          endpoint: true
        },
        {
          value: "contacted-me",
          label: "Someone who contacted me (call/SMS/social media)",
          icon: "📞",
          endpoint: true
        },
        {
          value: "investment-job",
          label: "Investment opportunity or job offer",
          icon: "💼",
          endpoint: true
        }
      ]
    },

    Q5_REQUEST_FROM: {
      id: "Q5_REQUEST_FROM",
      text: "Who sent you the payment request?",
      subtitle: "Payment request scams often impersonate trusted entities",
      icon: <AlertCircle className="w-8 h-8 text-purple-600" />,
      options: [
        {
          value: "unknown-number",
          label: "Unknown number or contact",
          icon: "❓",
          endpoint: true
        },
        {
          value: "looked-like-bank",
          label: "Looked like my bank, app, or official service",
          icon: "🏦",
          endpoint: true
        },
        {
          value: "friend-suspicious",
          label: "Friend's account but request seemed suspicious",
          icon: "👤",
          endpoint: true
        }
      ]
    },

    Q5_APP_TYPE: {
      id: "Q5_APP_TYPE",
      text: "What type of app was this?",
      subtitle: "Malicious apps come in different forms with different risks",
      icon: <AlertCircle className="w-8 h-8 text-red-600" />,
      options: [
        {
          value: "loan-app",
          label: "Loan or credit app",
          icon: "💰",
          endpoint: true
        },
        {
          value: "trading-app",
          label: "Investment or trading app",
          icon: "📈",
          endpoint: true
        },
        {
          value: "game-reward",
          label: "Game, rewards, or earning app",
          icon: "🎮",
          endpoint: true
        },
        {
          value: "screen-share",
          label: "Screen sharing or remote access app",
          icon: "📺",
          endpoint: true
        }
      ]
    },

    // ===== CARD BRANCH =====
    Q4_CARD_WHERE: {
      id: "Q4_CARD_WHERE",
      text: "Where did you use your card?",
      subtitle: "The location helps identify skimming, fake websites, or other card fraud",
      icon: <CreditCard className="w-8 h-8 text-purple-600" />,
      options: [
        {
          value: "physical-store",
          label: "Physical store or POS machine",
          icon: "🏪",
          nextQuestion: "Q5_CARD_PHYSICAL_ISSUE"
        },
        {
          value: "atm",
          label: "ATM machine",
          icon: "🏧",
          nextQuestion: "Q5_ATM_SUSPICIOUS"
        },
        {
          value: "online",
          label: "Online purchase or payment",
          icon: "🌐",
          nextQuestion: "Q5_CARD_ONLINE_ISSUE"
        },
        {
          value: "didnt-use",
          label: "Didn't use it / Lost or stolen card",
          icon: "❌",
          nextQuestion: "Q5_CARD_LOST_WHEN"
        }
      ]
    },

    Q5_CARD_PHYSICAL_ISSUE: {
      id: "Q5_CARD_PHYSICAL_ISSUE",
      text: "What happened at the store?",
      subtitle: "Physical card fraud often involves skimming or manipulation",
      icon: <AlertCircle className="w-8 h-8 text-orange-600" />,
      options: [
        {
          value: "extra-charges",
          label: "Extra or higher charges appeared later",
          icon: "💰",
          endpoint: true
        },
        {
          value: "card-stuck",
          label: "Card got stuck or retained by machine",
          icon: "🚫",
          endpoint: true
        },
        {
          value: "taken-away",
          label: "Cashier took card away from my sight",
          icon: "👀",
          endpoint: true
        }
      ]
    },

    Q5_ATM_SUSPICIOUS: {
      id: "Q5_ATM_SUSPICIOUS",
      text: "What seemed wrong at the ATM?",
      subtitle: "ATM fraud includes skimming devices and fake ATMs",
      icon: <AlertCircle className="w-8 h-8 text-red-600" />,
      options: [
        {
          value: "looked-suspicious",
          label: "ATM had loose parts or looked tampered",
          icon: "🔧",
          endpoint: true
        },
        {
          value: "pin-multiple-times",
          label: "Asked for PIN multiple times or seemed slow",
          icon: "🔑",
          endpoint: true
        },
        {
          value: "card-captured",
          label: "Card was captured or not returned",
          icon: "🎯",
          endpoint: true
        },
        {
          value: "wrong-amount",
          label: "Wrong amount dispensed or debited",
          icon: "💸",
          endpoint: true
        }
      ]
    },

    Q5_CARD_ONLINE_ISSUE: {
      id: "Q5_CARD_ONLINE_ISSUE",
      text: "What went wrong with the online purchase?",
      subtitle: "Online card fraud includes fake websites and data breaches",
      icon: <AlertCircle className="w-8 h-8 text-blue-600" />,
      options: [
        {
          value: "site-suspicious",
          label: "Website looked suspicious or unprofessional",
          icon: "⚠️",
          endpoint: true
        },
        {
          value: "no-product",
          label: "No product was delivered",
          icon: "📦",
          endpoint: true
        },
        {
          value: "international-charge",
          label: "Unexpected international transaction appeared",
          icon: "🌍",
          endpoint: true
        },
        {
          value: "multiple-unauthorized",
          label: "Multiple unauthorized charges from different places",
          icon: "🔄",
          endpoint: true
        }
      ]
    },

    Q5_CARD_LOST_WHEN: {
      id: "Q5_CARD_LOST_WHEN",
      text: "When did you lose the card?",
      subtitle: "Timeline helps determine if it's physical theft or data breach",
      icon: <AlertCircle className="w-8 h-8 text-purple-600" />,
      options: [
        {
          value: "recently",
          label: "Lost or stolen recently (last few days)",
          icon: "🕐",
          endpoint: true
        },
        {
          value: "long-ago",
          label: "Lost it weeks or months ago",
          icon: "📅",
          endpoint: true
        },
        {
          value: "never-lost",
          label: "Never lost it, still have the card",
          icon: "✋",
          endpoint: true
        }
      ]
    },

    // ===== NET BANKING BRANCH =====
    Q4_NETBANK_ACCESS: {
      id: "Q4_NETBANK_ACCESS",
      text: "How did the fraudster get access?",
      subtitle: "Understanding the attack method helps secure your account properly",
      icon: <Shield className="w-8 h-8 text-red-600" />,
      options: [
        {
          value: "clicked-link",
          label: "I clicked on a link",
          icon: "🔗",
          nextQuestion: "Q5_LINK_SOURCE"
        },
        {
          value: "shared-otp",
          label: "I shared OTP, password, or bank details",
          icon: "🔐",
          nextQuestion: "Q5_SHARED_WITH"
        },
        {
          value: "device-access",
          label: "Someone accessed my device or computer",
          icon: "💻",
          nextQuestion: "Q5_DEVICE_HOW"
        },
        {
          value: "dont-know",
          label: "I don't know how they got access",
          icon: "❓",
          nextQuestion: "Q5_BREACH_NOTICE"
        }
      ]
    },

    Q5_LINK_SOURCE: {
      id: "Q5_LINK_SOURCE",
      text: "Where did the link come from?",
      subtitle: "Phishing links arrive through various channels",
      icon: <AlertCircle className="w-8 h-8 text-orange-600" />,
      options: [
        {
          value: "sms-whatsapp",
          label: "SMS or WhatsApp message",
          icon: "💬",
          endpoint: true
        },
        {
          value: "email",
          label: "Email",
          icon: "📧",
          endpoint: true
        },
        {
          value: "social-media",
          label: "Social media post or ad",
          icon: "📱",
          endpoint: true
        }
      ]
    },

    Q5_SHARED_WITH: {
      id: "Q5_SHARED_WITH",
      text: "Who did you share your details with?",
      subtitle: "Identifying the impersonation helps in reporting",
      icon: <AlertCircle className="w-8 h-8 text-red-600" />,
      options: [
        {
          value: "caller-bank",
          label: "Caller claiming to be from my bank",
          icon: "📞",
          endpoint: true
        },
        {
          value: "customer-care",
          label: "Customer care number I found online",
          icon: "🎧",
          endpoint: true
        },
        {
          value: "tech-support",
          label: "Tech support or IT helpdesk",
          icon: "💻",
          endpoint: true
        }
      ]
    },

    Q5_DEVICE_HOW: {
      id: "Q5_DEVICE_HOW",
      text: "How did they access your device?",
      subtitle: "Device compromise can happen in multiple ways",
      icon: <AlertCircle className="w-8 h-8 text-purple-600" />,
      options: [
        {
          value: "remote-app",
          label: "I installed a remote access app (AnyDesk, TeamViewer, etc.)",
          icon: "📺",
          endpoint: true
        },
        {
          value: "physical",
          label: "Someone physically used my device",
          icon: "👤",
          endpoint: true
        },
        {
          value: "public-wifi",
          label: "I used public WiFi",
          icon: "📶",
          endpoint: true
        }
      ]
    },

    Q5_BREACH_NOTICE: {
      id: "Q5_BREACH_NOTICE",
      text: "What made you notice the unauthorized access?",
      subtitle: "The symptoms help identify the type of breach",
      icon: <AlertCircle className="w-8 h-8 text-blue-600" />,
      options: [
        {
          value: "small-test-txn",
          label: "Small test transactions (₹1, ₹2, etc.)",
          icon: "💰",
          endpoint: true
        },
        {
          value: "large-transfers",
          label: "Large unauthorized transfers",
          icon: "💸",
          endpoint: true
        },
        {
          value: "account-changes",
          label: "Account details were changed",
          icon: "⚙️",
          endpoint: true
        }
      ]
    },

    // ===== ATM BRANCH =====
    Q4_ATM_ISSUE: {
      id: "Q4_ATM_ISSUE",
      text: "What happened at the ATM?",
      subtitle: "ATM fraud includes various manipulation techniques",
      icon: <AlertCircle className="w-8 h-8 text-orange-600" />,
      options: [
        {
          value: "card-trapped",
          label: "Card got stuck or trapped",
          icon: "🎯",
          endpoint: true
        },
        {
          value: "wrong-amount-atm",
          label: "Wrong amount was dispensed or debited",
          icon: "💰",
          endpoint: true
        },
        {
          value: "unauthorized-withdrawal",
          label: "Unauthorized withdrawals appeared",
          icon: "🔄",
          endpoint: true
        }
      ]
    },

    // ===== TRANSFER BRANCH =====
    Q4_TRANSFER_TYPE: {
      id: "Q4_TRANSFER_TYPE",
      text: "What type of transfer was this?",
      subtitle: "Understanding the context helps determine the fraud type",
      icon: <AlertCircle className="w-8 h-8 text-blue-600" />,
      options: [
        {
          value: "job-payment",
          label: "Payment for job, business, or investment opportunity",
          icon: "💼",
          endpoint: true
        },
        {
          value: "online-purchase-transfer",
          label: "Payment for online purchase",
          icon: "🛒",
          endpoint: true
        },
        {
          value: "authorized-by-someone",
          label: "Someone authorized the transfer (but not me)",
          icon: "👤",
          endpoint: true
        }
      ]
    },

    // ===== BRANCH B: PREVENTED PATH =====
    Q3_PREVENTED: {
      id: "Q3_PREVENTED",
      text: "What made you realize something was wrong?",
      subtitle: "Good catch! Let's secure your account and prevent future attempts",
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      options: [
        {
          value: "suspicious-message",
          label: "Received suspicious message or call",
          icon: "📞",
          nextQuestion: "Q4_PREVENTED_ASKED"
        },
        {
          value: "transaction-failed",
          label: "Transaction failed or was declined",
          icon: "❌",
          endpoint: true
        },
        {
          value: "access-attempt-alert",
          label: "Got alert about access attempt",
          icon: "🔔",
          endpoint: true
        },
        {
          value: "warning-received",
          label: "Saw warning or someone alerted me",
          icon: "⚠️",
          endpoint: true
        }
      ]
    },

    Q4_PREVENTED_ASKED: {
      id: "Q4_PREVENTED_ASKED",
      text: "What did they ask you for?",
      subtitle: "Knowing their tactics helps us report and prevent",
      icon: <AlertCircle className="w-8 h-8 text-orange-600" />,
      options: [
        {
          value: "otp-details",
          label: "Bank details, OTP, or password",
          icon: "🔐",
          endpoint: true
        },
        {
          value: "click-link-prevented",
          label: "To click a link",
          icon: "🔗",
          endpoint: true
        },
        {
          value: "download-app-prevented",
          label: "To download or install an app",
          icon: "📱",
          endpoint: true
        },
        {
          value: "transfer-money-prevented",
          label: "To transfer money",
          icon: "💸",
          endpoint: true
        }
      ]
    },

    // ===== BRANCH C: CHECK PATH =====
    Q3_CHECK: {
      id: "Q3_CHECK",
      text: "Can you check your bank account right now?",
      subtitle: "Let's verify together if any money was lost",
      icon: <AlertCircle className="w-8 h-8 text-blue-600" />,
      options: [
        {
          value: "checking-now",
          label: "Yes, let me check now",
          icon: "👀",
          nextQuestion: "Q4_CHECK_RESULT"
        },
        {
          value: "cannot-access",
          label: "I can't access my account",
          icon: "🔒",
          nextQuestion: "Q4_ACCESS_ISSUE"
        },
        {
          value: "check-later",
          label: "I'll check later",
          icon: "⏰",
          endpoint: true
        }
      ]
    },

    Q4_CHECK_RESULT: {
      id: "Q4_CHECK_RESULT",
      text: "What do you see in your account?",
      subtitle: "This determines our next steps",
      icon: <AlertCircle className="w-8 h-8 text-purple-600" />,
      options: [
        {
          value: "unauthorized-found",
          label: "Yes, there are unauthorized transactions",
          icon: "❌",
          nextQuestion: (answers) => "Q3_PAYMENT_METHOD" // Route to loss path
        },
        {
          value: "no-suspicious",
          label: "No suspicious activity",
          icon: "✅",
          endpoint: true
        },
        {
          value: "account-locked",
          label: "Account is locked or frozen",
          icon: "🔒",
          endpoint: true
        }
      ]
    },

    Q4_ACCESS_ISSUE: {
      id: "Q4_ACCESS_ISSUE",
      text: "Why can't you access your account?",
      subtitle: "Account access issues can indicate compromise",
      icon: <AlertCircle className="w-8 h-8 text-red-600" />,
      options: [
        {
          value: "password-not-working",
          label: "Password not working / OTP not coming",
          icon: "🔐",
          endpoint: true
        },
        {
          value: "app-not-working",
          label: "App or website not working",
          icon: "📱",
          endpoint: true
        },
        {
          value: "shows-locked",
          label: "Account shows as locked or suspended",
          icon: "🔒",
          endpoint: true
        }
      ]
    }
  };

  const handleAnswer = (questionId: string, value: string, option: QuestionOption) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    setPath([...path, `${questionId}:${value}`]);

    // Set urgency level from Q1
    if (questionId === "Q1_TIME") {
      if (value === "just-now") setUrgencyLevel("critical");
      else if (value === "recent") setUrgencyLevel("urgent");
      else if (value === "today") setUrgencyLevel("high");
      else setUrgencyLevel("standard");
    }

    // Check if endpoint
    if (option.endpoint) {
      generateResult(newAnswers, path, value);
      return;
    }

    // Get next question
    if (option.nextQuestion) {
      const nextId = typeof option.nextQuestion === "function"
        ? option.nextQuestion(newAnswers)
        : option.nextQuestion;

      setTimeout(() => {
        setCurrentQuestionId(nextId);
      }, 300);
    }
  };

  const generateResult = (finalAnswers: Record<string, string>, finalPath: string[], endpointValue: string) => {
    const scenario = getFraudScenario(finalAnswers, endpointValue);
    const actions = getActions(scenario, urgencyLevel);
    const recovery = getRecoveryProbability(scenario, urgencyLevel);

    const result: TriageResult = {
      fraudScenario: scenario.name,
      urgencyLevel,
      actions,
      recoveryProbability: recovery,
      path: finalPath,
      answers: finalAnswers
    };

    onComplete(result);
  };

  const getFraudScenario = (answers: Record<string, string>, endpoint: string) => {
    // UPI QR Code Scams
    if (answers.Q4_UPI_ACTIVITY === "scanning-qr" && endpoint === "wrong-amount") {
      return { name: "UPI QR Code Amount Manipulation", category: "UPI" };
    }
    if (answers.Q4_UPI_ACTIVITY === "scanning-qr" && endpoint === "multiple-charges") {
      return { name: "UPI QR Code Duplicate Charging", category: "UPI" };
    }
    if (answers.Q4_UPI_ACTIVITY === "scanning-qr" && endpoint === "fake-merchant") {
      return { name: "Fake Merchant QR Code Scam", category: "UPI" };
    }

    // UPI Transfer Scams
    if (answers.Q4_UPI_ACTIVITY === "sending-money" && endpoint === "friend-family-compromised") {
      return { name: "Account Takeover (Friend/Family)", category: "UPI" };
    }
    if (answers.Q4_UPI_ACTIVITY === "sending-money" && endpoint === "online-seller") {
      return { name: "E-commerce Fraud (UPI Payment)", category: "UPI" };
    }
    if (answers.Q4_UPI_ACTIVITY === "sending-money" && endpoint === "contacted-me") {
      return { name: "Impersonation Scam", category: "UPI" };
    }
    if (answers.Q4_UPI_ACTIVITY === "sending-money" && endpoint === "investment-job") {
      return { name: "Investment/Job Fraud", category: "UPI" };
    }

    // UPI Collect Request
    if (answers.Q4_UPI_ACTIVITY === "received-request" && endpoint === "unknown-number") {
      return { name: "Random UPI Collect Scam", category: "UPI" };
    }
    if (answers.Q4_UPI_ACTIVITY === "received-request" && endpoint === "looked-like-bank") {
      return { name: "Phishing UPI Collect Request", category: "UPI" };
    }

    // Malicious Apps
    if (answers.Q4_UPI_ACTIVITY === "using-app" && endpoint === "loan-app") {
      return { name: "Predatory Loan App Fraud", category: "UPI" };
    }
    if (answers.Q4_UPI_ACTIVITY === "using-app" && endpoint === "trading-app") {
      return { name: "Fake Trading/Investment App", category: "UPI" };
    }
    if (answers.Q4_UPI_ACTIVITY === "using-app" && endpoint === "screen-share") {
      return { name: "Remote Access Scam", category: "UPI" };
    }

    // Card Fraud - Physical
    if (answers.Q4_CARD_WHERE === "physical-store" && endpoint === "extra-charges") {
      return { name: "POS Manipulation Fraud", category: "Card" };
    }
    if (answers.Q4_CARD_WHERE === "physical-store" && endpoint === "card-stuck") {
      return { name: "Card Trapping Scam", category: "Card" };
    }
    if (answers.Q4_CARD_WHERE === "physical-store" && endpoint === "taken-away") {
      return { name: "Card Skimming", category: "Card" };
    }

    // ATM Fraud
    if (answers.Q4_CARD_WHERE === "atm" && endpoint === "looked-suspicious") {
      return { name: "ATM Skimming Device", category: "Card" };
    }
    if (answers.Q4_CARD_WHERE === "atm" && endpoint === "pin-multiple-times") {
      return { name: "Fake/Compromised ATM", category: "Card" };
    }
    if (answers.Q4_CARD_WHERE === "atm" && endpoint === "card-captured") {
      return { name: "ATM Card Capture Scam", category: "Card" };
    }

    // Card Online
    if (answers.Q4_CARD_WHERE === "online" && endpoint === "site-suspicious") {
      return { name: "Fake Website Fraud", category: "Card" };
    }
    if (answers.Q4_CARD_WHERE === "online" && endpoint === "no-product") {
      return { name: "E-commerce Fraud (Card Payment)", category: "Card" };
    }
    if (answers.Q4_CARD_WHERE === "online" && endpoint === "international-charge") {
      return { name: "Card Data Breach", category: "Card" };
    }
    if (answers.Q4_CARD_WHERE === "online" && endpoint === "multiple-unauthorized") {
      return { name: "Card Cloning", category: "Card" };
    }

    // Card Lost/Stolen
    if (answers.Q4_CARD_WHERE === "didnt-use" && endpoint === "recently") {
      return { name: "Stolen Card Fraud", category: "Card" };
    }
    if (answers.Q4_CARD_WHERE === "didnt-use" && endpoint === "never-lost") {
      return { name: "Online Card Data Theft", category: "Card" };
    }

    // Net Banking - Phishing
    if (answers.Q4_NETBANK_ACCESS === "clicked-link" && endpoint === "sms-whatsapp") {
      return { name: "SMS/WhatsApp Phishing", category: "NetBanking" };
    }
    if (answers.Q4_NETBANK_ACCESS === "clicked-link" && endpoint === "email") {
      return { name: "Email Phishing", category: "NetBanking" };
    }
    if (answers.Q4_NETBANK_ACCESS === "clicked-link" && endpoint === "social-media") {
      return { name: "Social Media Phishing", category: "NetBanking" };
    }

    // Vishing/Social Engineering
    if (answers.Q4_NETBANK_ACCESS === "shared-otp" && endpoint === "caller-bank") {
      return { name: "Vishing (Voice Phishing)", category: "NetBanking" };
    }
    if (answers.Q4_NETBANK_ACCESS === "shared-otp" && endpoint === "customer-care") {
      return { name: "Fake Customer Care Fraud", category: "NetBanking" };
    }
    if (answers.Q4_NETBANK_ACCESS === "shared-otp" && endpoint === "tech-support") {
      return { name: "Tech Support Scam", category: "NetBanking" };
    }

    // Device Compromise
    if (answers.Q4_NETBANK_ACCESS === "device-access" && endpoint === "remote-app") {
      return { name: "Remote Access Scam", category: "NetBanking" };
    }

    // Unknown Breach
    if (answers.Q4_NETBANK_ACCESS === "dont-know" && endpoint === "small-test-txn") {
      return { name: "Data Breach (Testing Phase)", category: "NetBanking" };
    }
    if (answers.Q4_NETBANK_ACCESS === "dont-know" && endpoint === "large-transfers") {
      return { name: "Account Takeover", category: "NetBanking" };
    }

    // Prevention Cases
    if (answers.Q2_MONEY_STATUS === "prevented" && endpoint === "otp-details") {
      return { name: "Phishing Attempt (Prevented)", category: "Prevention" };
    }
    if (answers.Q2_MONEY_STATUS === "prevented" && endpoint === "transaction-failed") {
      return { name: "Failed Fraud Attempt", category: "Prevention" };
    }

    // Check Path
    if (answers.Q3_CHECK === "checking-now" && endpoint === "no-suspicious") {
      return { name: "False Alarm / No Fraud Detected", category: "Prevention" };
    }
    if (answers.Q4_ACCESS_ISSUE && endpoint === "password-not-working") {
      return { name: "Account Takeover (Password Changed)", category: "NetBanking" };
    }

    // Default
    return { name: "Financial Fraud", category: "General" };
  };

  const getActions = (scenario: { name: string; category: string }, urgency: string): ActionItem[] => {
    // This would be a comprehensive action generator
    // For now, returning template actions
    const baseActions: ActionItem[] = [
      {
        id: "call-bank",
        priority: urgency === "critical" ? "immediate" : "within-1h",
        title: "Call Bank Fraud Helpline",
        description: `Report ${scenario.name} immediately`,
        timeframe: urgency === "critical" ? "0-5 minutes" : "Within 1 hour",
        icon: "📞"
      },
      {
        id: "block-payment",
        priority: "immediate",
        title: scenario.category === "UPI" ? "Disable UPI" : scenario.category === "Card" ? "Block Card" : "Freeze Account",
        description: "Prevent further unauthorized transactions",
        timeframe: "0-5 minutes",
        icon: "🔒"
      },
      {
        id: "cybercrime",
        priority: urgency === "critical" ? "within-1h" : "within-4h",
        title: "File Cybercrime Complaint",
        description: "Register complaint on cybercrime.gov.in",
        timeframe: urgency === "critical" ? "Within 1 hour" : "Within 4 hours",
        icon: "🚨"
      }
    ];

    // Add category-specific actions
    if (scenario.category === "UPI") {
      baseActions.push({
        id: "upi-dispute",
        priority: "within-4h",
        title: "File UPI Dispute",
        description: "Report transaction in your UPI app",
        timeframe: "Within 4 hours",
        icon: "📱"
      });
    }

    if (scenario.category === "Card") {
      baseActions.push({
        id: "chargeback",
        priority: "within-24h",
        title: "Request Chargeback",
        description: "Dispute unauthorized card transactions",
        timeframe: "Within 24 hours",
        icon: "💳"
      });
    }

    baseActions.push({
      id: "evidence",
      priority: "within-4h",
      title: "Collect Evidence",
      description: "Screenshots, receipts, and communication records",
      timeframe: "Within 4 hours",
      icon: "📸"
    });

    return baseActions;
  };

  const getRecoveryProbability = (scenario: { name: string }, urgency: string): number => {
    let baseProb = 50;

    // Urgency factor
    if (urgency === "critical") baseProb += 25;
    else if (urgency === "urgent") baseProb += 15;
    else if (urgency === "high") baseProb += 5;
    else baseProb -= 20;

    // Scenario-specific adjustments
    if (scenario.name.includes("QR Code")) baseProb += 10;
    if (scenario.name.includes("Card Cloning")) baseProb -= 15;
    if (scenario.name.includes("Prevention")) baseProb = 100;
    if (scenario.name.includes("Investment")) baseProb -= 30;

    return Math.max(0, Math.min(100, baseProb));
  };

  const currentQuestion = questions[currentQuestionId];
  const totalSteps = path.length + 1;
  const progress = (path.length / 10) * 100; // Estimate max 10 questions

  return (
    <div className={layouts.screenGradient + " py-8 px-4"}>
      {/* Progress */}
      <div className={`${layouts.container} mb-6`}>
        <div className={`${layouts.flexBetween} ${typography.body.small} mb-2`}>
          <span className="font-semibold">Smart Assessment</span>
          <span>Question {totalSteps}</span>
        </div>
        <div className={progress.container}>
          <div
            className={progress.barOrange}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className={layouts.container}>
        <div className={cards.primary + " " + animations.slideUp}>
          <div className="flex items-start gap-4 mb-6">
            {currentQuestion.icon}
            <div>
              <h2 className={typography.heading.h2 + " mb-2"}>{currentQuestion.text}</h2>
              <p className={typography.body.small}>{currentQuestion.subtitle}</p>
            </div>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQuestion.id, option.value, option)}
                className={buttons.option}
              >
                <div className="flex items-center gap-3">
                  {option.icon && <span className="text-2xl">{option.icon}</span>}
                  <span className="font-semibold text-gray-900 group-hover:text-orange-900 flex-1">
                    {option.label}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      {path.length > 0 && (
        <div className={`${layouts.container} mt-4`}>
          <button
            onClick={() => {
              const lastQuestion = path[path.length - 1].split(":")[0];
              setPath(path.slice(0, -1));
              const newAnswers = { ...answers };
              delete newAnswers[currentQuestionId];
              setAnswers(newAnswers);
              setCurrentQuestionId(lastQuestion);
            }}
            className={buttons.text}
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}
