# Lead Generation Components

Complete suite of lead generation components for your real estate website.

## Components Overview

### 1. Newsletter Popup (`newsletter-popup.tsx`)
- **Triggers**: Exit-intent, time-based, scroll-based
- **Features**: Session storage to prevent multiple shows
- **Usage**: Automatically shows based on user behavior

### 2. Newsletter Signup (`newsletter-signup.tsx`)
- **Variants**: Inline, compact, card
- **Features**: Email validation, success states
- **Usage**: Embed anywhere on your site

### 3. Consultation Booking (`consultation-booking.tsx`)
- **Features**: Date/time picker, property linking, form validation
- **Usage**: Modal dialog for booking free consultations

### 4. Quote Request (`quote-request.tsx`)
- **Features**: Property type selection, budget ranges, requirements
- **Usage**: Comprehensive form for getting personalized quotes

### 5. Testimonials (`testimonials.tsx`)
- **Features**: Carousel navigation, star ratings, avatar support
- **Usage**: Social proof with rotating testimonials

### 6. Social Proof (`social-proof.tsx`)
- **Variants**: Default, compact, inline
- **Features**: Stats display (buyers, properties sold, agents, etc.)
- **Usage**: Build trust with numbers

### 7. Floating CTA (`floating-cta.tsx`)
- **Features**: Scroll-triggered visibility, phone button, consultation button
- **Usage**: Always-visible call-to-action buttons

### 8. Cookie Consent (`cookie-consent.tsx`)
- **Features**: GDPR compliance, localStorage persistence
- **Usage**: Required for EU visitors

### 9. Promotional Banner (`promotional-banner.tsx`)
- **Variants**: Default, warning, success
- **Features**: Dismissible, customizable messaging
- **Usage**: Top-of-page promotional messages

### 10. Quick Contact (`quick-contact.tsx`)
- **Variants**: Default, inline, minimal
- **Features**: Multiple layout options
- **Usage**: Fast contact forms

## Integration

All components are integrated via `components/lead-generation/index.tsx` which is included in the root layout.

## Customization

Each component accepts props for customization:
- Colors, text, behavior
- Show/hide triggers
- Form fields
- Styling variants

## Data Collection

All forms log to console - replace with your CRM/email service integration:
- Email services (Mailchimp, ConvertKit, etc.)
- CRM systems (HubSpot, Salesforce, etc.)
- Webhook integrations
- Database storage

