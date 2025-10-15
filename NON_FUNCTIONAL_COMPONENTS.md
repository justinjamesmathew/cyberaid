# Non-Functional Components & Features

## Overview
This document lists all components and features that are **NOT fully functional** in the current Figma export. These are either mock/simulated or have placeholder functionality.

---

## ❌ Non-Functional Features

### 1. Emergency Flow Screen - Input Methods

#### 🎤 Voice Input (Mock)
**File:** `src/components/EmergencyFlowScreen.tsx` (Lines 17-27)

**Current Behavior:**
- Shows "Recording..." animation for 2 seconds
- Returns hardcoded text: "Scammed via UPI QR code at a shop. Paid ₹5,000 but wrong amount was deducted."
- Uses `setTimeout()` to simulate recording

**What's Missing:**
- Real microphone access
- Actual voice recording
- Speech-to-text conversion
- Audio file storage

**To Implement:**
```tsx
// Need to add:
- navigator.mediaDevices.getUserMedia() for mic access
- Web Audio API or MediaRecorder API
- Speech Recognition API or cloud service (Google/OpenAI)
- Audio blob handling
```

---

#### 📸 Photo Capture (Mock)
**File:** `src/components/EmergencyFlowScreen.tsx` (Lines 29-35)

**Current Behavior:**
- Immediately returns placeholder text: "Screenshot captured with transaction details"
- No actual camera interaction

**What's Missing:**
- Camera access
- Photo capture functionality
- Image upload/storage
- OCR for text extraction

**To Implement:**
```tsx
// Need to add:
- navigator.mediaDevices.getUserMedia() for camera
- HTML5 File Input API
- Canvas API for photo manipulation
- OCR service (Tesseract.js, Google Vision API)
- Image storage (S3, Firebase Storage)
```

---

#### 📱 UPI App Import (Placeholder)
**File:** `src/components/EmergencyFlowScreen.tsx` (Lines 97-100)

**Current Behavior:**
- Just a button with no functionality
- Click does nothing

**What's Missing:**
- Deep linking to UPI apps (PhonePe, GPay, Paytm)
- Transaction data import
- App-to-app communication

**To Implement:**
```tsx
// Need to add:
- Deep link URLs (phonepe://, googlepay://, paytm://)
- URL scheme handling
- Transaction data parsing
- OAuth/permission flow for UPI apps
```

---

### 2. AI Analysis (Mock Data)

#### Data Extraction
**File:** `src/App.tsx` (Lines 16-26)

**Current Behavior:**
- Returns hardcoded data regardless of input:
  ```tsx
  fraudType: "UPI QR Code Scam",
  transactionId: "123456789012",
  amount: "₹5,000",
  dateTime: "Oct 12, 2025, 2:30 PM",
  recipientUPI: "scammer@paytm",
  bank: "HDFC Bank"
  ```
- No actual AI processing

**What's Missing:**
- Real NLP/AI analysis
- OCR for image text extraction
- Entity extraction from voice/text
- Confidence scoring
- Fraud type classification

**To Implement:**
```tsx
// Need to add:
- OpenAI API / Claude API for NLP
- Google Vision API / Tesseract.js for OCR
- Named Entity Recognition (NER) model
- Transaction pattern matching
- Real confidence scores
```

---

### 3. Action Dashboard - Follow-up Actions

#### ✅ Expandable Cards (NOW FUNCTIONAL!)
**Files:**
- `src/components/FollowUpActions.tsx`
- `src/components/UPIDisputeCard.tsx`
- `src/components/EvidenceCard.tsx`
- `src/components/EmailBankCard.tsx`

**Current Behavior:**
- ✅ Full expand/collapse functionality
- ✅ Cards for:
  - 4. File UPI Dispute (with step-by-step guides for 4 UPI apps)
  - 5. Add Evidence (with file upload and export functionality)
  - 6. Email Bank Formal Complaint (with email template generation)

**What Works:**
- ✅ Expand/collapse animations
- ✅ Step-by-step guidance for UPI apps (PhonePe, Google Pay, Paytm, Other)
- ✅ Progress tracking for dispute steps
- ✅ File upload interface (drag-and-drop, click, camera, voice)
- ✅ Evidence management (view, annotate, delete buttons)
- ✅ Email template generation
- ✅ Copy to clipboard and mailto: links
- ✅ Reference number collection
- ✅ Completion tracking

**What's Still Mock:**
- ⚠️ File storage (files not persisted)
- ⚠️ Evidence viewer/annotation tool (buttons present but no modal)
- ⚠️ Email sending (uses mailto: or clipboard, no SMTP)
- ⚠️ Evidence export (button shows alert, no actual ZIP/PDF generation)
- ⚠️ Deep linking may not work on desktop

**To Fully Implement:**
```tsx
// Backend needed for:
- File storage API (S3, Firebase Storage)
- Evidence viewer modal component
- Annotation tool with canvas
- Email sending API (SendGrid, Nodemailer)
- ZIP/PDF generation for evidence bundle
- Cloud storage integration (Google Drive API)
```

---

### 4. Action Dashboard - Escalation Actions

#### Reminder Setting (Non-Functional)
**File:** `src/components/ActionDashboard.tsx` (Lines 199-220)

**Current Behavior:**
- Shows "SET REMINDER" buttons but they don't work
- NPCI and RBI Ombudsman cards are locked (display only)

**What's Missing:**
- Reminder scheduling system
- Push notifications
- Calendar integration
- Date/time calculation for deadlines

**To Implement:**
```tsx
// Need to add:
- Browser Notification API
- Service Worker for background notifications
- Date calculation based on RBI/NPCI guidelines
- Notification permission handling
- Reminder storage (localStorage or database)
```

---

### 5. Bottom Navigation (Non-Functional)

#### Tab Navigation
**File:** `src/components/ActionDashboard.tsx` (Lines 225-240)

**Current Behavior:**
- Shows 3 tabs: Dashboard, Timeline, Evidence
- Clicking does nothing (no navigation)

**What's Missing:**
- Timeline screen component
- Evidence vault screen component
- Routing between screens
- Active state management

**To Implement:**
```tsx
// Need to add:
- Create TimelineScreen.tsx component
- Create EvidenceVaultScreen.tsx component
- Add routing logic in App.tsx
- Update active tab styling
```

---

### 6. Call & SMS Integration (Limited)

#### Call Functionality
**File:** `src/components/CallScriptModal.tsx` (Line 42-44)

**Current Behavior:**
- Opens dialer with `tel:` URL scheme
- **Works on mobile, but not on desktop**
- Placeholder phone number "1800-XXX-XXXX"

**What's Missing:**
- Real bank helpline numbers
- Click-to-call for desktop (via WebRTC or Twilio)
- Call logging
- Call duration tracking

**To Implement:**
```tsx
// Need to add:
- Real bank contact database
- WebRTC integration for desktop calling
- Twilio API or similar for VoIP
- Call history storage
- Automatic reference number extraction from call
```

---

#### SMS Functionality
**File:** `src/components/SMSPreviewModal.tsx`

**Current Behavior:**
- Opens SMS app with `sms:` URL scheme (mobile only)
- **Works on mobile, but not on desktop**
- Placeholder SMS number "XXXX"

**What's Missing:**
- Real bank SMS shortcodes
- SMS API for desktop
- SMS delivery confirmation
- Character count validation (160 limit)

**To Implement:**
```tsx
// Need to add:
- Real bank SMS numbers/shortcodes
- Twilio SMS API or similar
- SMS delivery status tracking
- Message queueing for offline scenarios
```

---

### 7. Cybercrime Portal Integration (Minimal)

#### Portal Filing
**File:** `src/components/ActionDashboard.tsx` (Line 138)

**Current Behavior:**
- Opens https://cybercrime.gov.in in new tab
- **No auto-fill or data passing**

**What's Missing:**
- Form auto-fill
- URL parameters with case data
- Evidence attachment
- Complaint ID extraction

**To Implement:**
```tsx
// Need to add:
- URL parameter construction with case data
- Browser extension for form auto-fill (complex)
- Or embedded iframe with form manipulation
- Complaint ID capture via user input
- API integration if cybercrime.gov.in provides one
```

---

### 8. Data Persistence (None)

#### Storage & Backend
**All Components**

**Current Behavior:**
- All data stored in React state (in-memory)
- **Data lost on page refresh**
- No user accounts or authentication

**What's Missing:**
- Backend API
- Database
- User authentication
- Case persistence
- Evidence storage
- Action history

**To Implement:**
```tsx
// Need to add:
- Backend API (Node.js + Express, or Firebase)
- Database (PostgreSQL, MongoDB, or Firebase)
- Authentication (JWT, OAuth, or Firebase Auth)
- API endpoints for:
  - POST /api/cases (create case)
  - GET /api/cases/:id (fetch case)
  - PATCH /api/cases/:id (update case)
  - POST /api/evidence (upload files)
  - GET /api/evidence/:caseId (fetch evidence)
```

---

### 9. Privacy & Security Features (Missing)

#### Encryption
**All Components**

**Current Behavior:**
- Privacy notice displayed but no actual encryption
- Data stored in plain text in browser memory

**What's Missing:**
- Client-side encryption
- Secure data transmission
- Evidence file encryption
- Secure deletion

**To Implement:**
```tsx
// Need to add:
- Web Crypto API for client-side encryption
- HTTPS for all API calls (SSL/TLS)
- Encrypted file storage (encrypt before upload)
- Secure key management
- Data wiping capabilities
```

---

### 10. Offline Mode (Not Implemented)

#### Service Worker
**Project Root**

**Current Behavior:**
- Requires internet connection
- No offline caching
- No background sync

**What's Missing:**
- Service Worker
- Cache strategies
- Offline queue
- Background sync

**To Implement:**
```tsx
// Need to add:
- Service Worker registration
- Cache API for offline assets
- IndexedDB for offline data storage
- Background Sync API for queued actions
- Network status detection
```

---

### 11. Multi-language Support (English Only)

#### Localization
**All Components**

**Current Behavior:**
- All text hardcoded in English
- No language switching

**What's Missing:**
- Internationalization (i18n)
- Translation files
- Language selector
- RTL support

**To Implement:**
```tsx
// Need to add:
- react-i18next or similar library
- Translation JSON files (Hindi, regional languages)
- Language detection and switching
- RTL CSS for Arabic/Hebrew
```

---

### 12. Responsive Design (Partially Complete)

#### Mobile Optimization
**All Components**

**Current Behavior:**
- Basic responsive styles with Tailwind breakpoints
- **May have issues on very small screens (< 375px)**
- Modal animations work on mobile

**What's Missing:**
- Touch gesture support (swipe, pinch)
- Mobile-specific optimizations
- PWA configuration
- App-like behavior

**To Implement:**
```tsx
// Need to add:
- Touch event handlers
- Swipe gestures (for modal dismiss, navigation)
- PWA manifest.json
- Service Worker for PWA
- Add to home screen prompt
- Native-like transitions
```

---

### 13. Error Handling (Minimal)

#### Error States
**All Components**

**Current Behavior:**
- No error boundaries
- No loading states during async operations
- No retry mechanisms
- No error messages

**What's Missing:**
- Error boundaries
- Loading spinners
- Toast notifications
- Retry buttons
- Offline error messages

**To Implement:**
```tsx
// Need to add:
- React Error Boundary component
- Toast library (sonner is installed but not used)
- Loading states for all async operations
- Try-catch blocks around API calls
- User-friendly error messages
- Retry logic for failed requests
```

---

### 14. Analytics & Tracking (None)

#### User Analytics
**All Components**

**Current Behavior:**
- No analytics
- No event tracking
- No performance monitoring

**What's Missing:**
- Google Analytics or similar
- Event tracking (button clicks, screen views)
- Error logging (Sentry, LogRocket)
- Performance monitoring

**To Implement:**
```tsx
// Need to add:
- Analytics library (GA4, Mixpanel, Amplitude)
- Event tracking hooks
- Error monitoring service (Sentry)
- Performance monitoring (Web Vitals)
```

---

### 15. Accessibility Enhancements (Partial)

#### A11y Features
**All Components**

**Current Behavior:**
- Basic semantic HTML
- Radix UI components (accessible by default)
- Keyboard navigation works for buttons

**What's Missing:**
- ARIA labels on many elements
- Screen reader testing
- Focus management in modals
- High contrast mode support
- Reduced motion support

**To Implement:**
```tsx
// Need to add:
- Comprehensive ARIA labels
- Focus trap in modals
- Skip navigation links
- Screen reader announcements
- Respect prefers-reduced-motion
- Keyboard shortcuts documentation
```

---

## ✅ What IS Functional

For reference, here's what actually works:

### Fully Functional:
1. ✅ **Screen Navigation** - All 4 main screens with proper routing
2. ✅ **Countdown Timer** - Real-time updates every second
3. ✅ **Text Input** - User can type incident description
4. ✅ **Field Editing** - Edit any field on confirmation screen
5. ✅ **Modal Display** - Call script and SMS preview modals work
6. ✅ **Copy to Clipboard** - Copy call script works
7. ✅ **Progress Tracking** - Mark actions as done, see progress bar
8. ✅ **Reference Numbers** - Input and store reference numbers
9. ✅ **Responsive Layout** - Works on mobile and desktop
10. ✅ **UI Components** - All 40+ shadcn/ui components functional
11. ✅ **Follow-Up Actions** - All 3 expandable cards with full UI ← NEW!
12. ✅ **UPI Dispute Guide** - Step-by-step guides for 4 UPI apps ← NEW!
13. ✅ **File Upload Interface** - Drag-and-drop and click upload ← NEW!
14. ✅ **Evidence Management** - Display and manage evidence items ← NEW!
15. ✅ **Email Template Generation** - Auto-generate complaint emails ← NEW!

### Partially Functional:
1. ⚠️ **Voice Input** - Button works but uses mock data
2. ⚠️ **Photo Capture** - Button works but uses mock data
3. ⚠️ **Call Dialer** - Works on mobile, not on desktop
4. ⚠️ **SMS App** - Works on mobile, not on desktop
5. ⚠️ **External Links** - Cybercrime portal opens but no auto-fill
6. ⚠️ **File Upload** - UI works but no storage/persistence ← NEW!
7. ⚠️ **Evidence Export** - UI present but no actual generation ← NEW!
8. ⚠️ **Email Sending** - Uses mailto:/clipboard, no SMTP ← NEW!
9. ⚠️ **Evidence Viewer** - Buttons present but no modal ← NEW!

---

## 🎯 Priority Implementation Order

### High Priority (Core Functionality)
1. **Backend API & Database** - Essential for data persistence
2. **Real AI Analysis** - Critical for accurate fraud detection
3. **File Storage Backend** - Store uploaded evidence (newly urgent!)
4. **Evidence Viewer/Annotation** - Complete the evidence workflow
5. **Camera & Voice Integration** - Key differentiator
6. **Timeline Tracker** - Helps users stay on track

### Medium Priority (Enhanced UX)
7. ~~**Follow-up Action Expansion**~~ - ✅ COMPLETED! Better guidance
8. **Evidence Export Implementation** - Generate ZIP/PDF bundles
9. **Email SMTP Integration** - Real email sending
10. **Reminder System** - Keep users engaged
11. **Tab Navigation** - Access timeline and evidence
12. **Error Handling** - Better user experience
13. **Offline Mode** - Reliability

### Low Priority (Nice to Have)
11. **Multi-language** - Expand reach
12. **Analytics** - Improve product
13. **PWA Configuration** - App-like experience
14. **Advanced A11y** - Broader accessibility
15. **Desktop Calling** - Convenience

---

## 📋 Testing Checklist

Before marking a feature as "functional":

- [ ] Works on mobile devices
- [ ] Works on desktop browsers
- [ ] Handles errors gracefully
- [ ] Provides user feedback
- [ ] Persists data correctly
- [ ] Works offline (if applicable)
- [ ] Accessible via keyboard
- [ ] Screen reader compatible
- [ ] Performs well (< 3s load)
- [ ] Security validated

---

## 💡 Quick Wins

Easy implementations that add value:

1. **localStorage** - Add basic data persistence (30 mins)
2. **Toast Notifications** - Use installed sonner library (1 hour)
3. **Loading States** - Add spinners during delays (1 hour)
4. **File Input** - Basic evidence upload without AI (2 hours)
5. **Real Phone Numbers** - Replace placeholder numbers (30 mins)

---

*Last Updated: October 13, 2025*
*Review Status: Follow-up actions implemented! Backend integration needed.*
