# Satvik Savor - UI/UX Design System

## Color Palette

### Primary Colors
- **Sage Green**: `#6B8E71` (Trust, Nature, Spirituality)
- **Saffron Orange**: `#E67E22` (Energy, Purity, Auspiciousness)
- **Deep Navy**: `#1F3A5D` (Professionalism, Stability)
- **Cream White**: `#F9F7F4` (Cleanliness, Purity)

### Secondary Colors
- **Mint Green**: `#A8D5BA` (Freshness, Health)
- **Gold**: `#D4AF37` (Premium, Quality)
- **Warm Red**: `#C75656` (Alert/Warning)
- **Soft Gray**: `#E8E8E8` (Dividers, Backgrounds)

### Functional Colors
- **Success**: `#27AE60` (Green)
- **Warning**: `#F39C12` (Amber)
- **Alert/Error**: `#E74C3C` (Red)
- **Info**: `#3498DB` (Blue)

### Accessibility
- WCAG AA compliant contrast ratios
- No reliance on color alone for information
- Colorblind-friendly palette

---

## Typography

### Font Family
- **Primary Font**: "Poppins" (Sans-serif) - Modern, Clean
- **Heading Font**: "Inter" (Sans-serif) - Professional, Geometric
- **Body Font**: "Open Sans" (Sans-serif) - Highly Readable
- **Code Font**: "JetBrains Mono" (Monospace)

### Font Sizes & Hierarchy
```
H1: 48px - Page Titles
H2: 36px - Section Headers
H3: 28px - Subsection Headers
H4: 24px - Card Headers
H5: 20px - Labels
Body: 16px - Regular Text
Small: 14px - Secondary Text
Meta: 12px - Timestamps, Meta Info
```

### Font Weights
- **Light**: 300 (Secondary info)
- **Regular**: 400 (Body text)
- **Medium**: 500 (Emphasis)
- **Semi-bold**: 600 (Section headers)
- **Bold**: 700 (Page titles, CTAs)

---

## Layout Structure

### Responsive Breakpoints
```
Mobile:    320px - 480px
Tablet:    481px - 768px
Desktop:   769px - 1024px
Wide:      1025px and above
```

### Grid System
- 12-column grid on desktop
- 6-column grid on tablet
- 1-column stack on mobile
- 20px-32px gutter spacing

### Spacing Scale
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
xxl: 48px
```

---

## Component Design

### Navigation Bar
- **Desktop**: Horizontal menu with sticky header
- **Mobile**: Hamburger menu with side drawer
- **Features**:
  - Logo on left
  - Navigation links (Home, About, Features, Dashboard, Contact)
  - CTA button (Get Started)
  - Dark background (#1F3A5D)
  - White/Cream text

### Hero Section
- **Layout**: Full viewport height, centered content
- **Background**: Gradient (Sage Green → Deep Navy)
- **Content**: Headline, Subheading, Two CTAs (Primary + Secondary)
- **Visual**: Illustration/Product mockup on right side
- **Typography**: H1 (48px), H2 (28px)

### Feature Cards
- **Design**: Minimal card with icon + text
- **Dimensions**: 300px width (responsive)
- **Elevation**: Subtle shadow on hover
- **Icon**: 64x64px, Saffron Orange
- **Typography**: H4 (24px) + Body (16px)
- **Hover**: Scale up slightly, shadow deepens

### Gauge Meter (For Dashboard)
- **Shape**: Circular gauge (0-360°)
- **Colors**: 
  - Low (Red): 0-33%
  - Ideal (Green): 34-66%
  - High (Orange): 67-100%
- **Display**: Central value + percentage
- **Animated**: Smooth needle animation

### Line Graph (For Dashboard)
- **Type**: Area chart with line overlay
- **Colors**: Sage Green fill, Deep Navy line
- **Axes**: Time (X), Value (Y)
- **Legends**: Show all metrics
- **Interactivity**: Hover for values, zoom capability

### Alert/Notification
- **Type**: Toast notification
- **Position**: Top-right corner
- **Duration**: 5 seconds auto-dismiss
- **Icons**: Check (success), Warning (alert), Info (info)
- **Background**: Color-coded (green, orange, blue)

### Button Styles

#### Primary Button
- **Background**: Saffron Orange (#E67E22)
- **Text**: White
- **Padding**: 12px 32px
- **Border Radius**: 8px
- **Hover**: Darker orange, slight scale

#### Secondary Button
- **Background**: Transparent
- **Border**: 2px Sage Green
- **Text**: Sage Green
- **Hover**: Sage Green background, white text

#### Tertiary Button
- **Background**: Light gray (#E8E8E8)
- **Text**: Deep Navy
- **Hover**: Slightly darker gray

### Input Fields
- **Border**: 1px solid #E8E8E8
- **Border Radius**: 6px
- **Padding**: 12px 16px
- **Font Size**: 16px
- **Focus**: Blue outline, shadow
- **Placeholder**: Light gray text (#999)

---

## Page-wise Design Details

### 1. Home Page
**Layout**: Hero + Features Grid + Stats + CTA + Newsletter
- **Hero**: Full viewport, gradient background, centered text
- **Features Grid**: 3 columns (desktop), 2 (tablet), 1 (mobile)
- **Stats Section**: 4 KPIs with numbers (centered)
- **CTA Section**: Dark background, two buttons side-by-side

### 2. About Page
**Layout**: Story + Problem/Solution + Team + Mission
- **Story Section**: Left text, right image
- **Problem/Solution**: Two columns comparison
- **Timeline**: Vertical on mobile, horizontal on desktop

### 3. Features Page
**Layout**: Feature cards grid + Feature matrix
- **Card Grid**: 3 columns, hover effects
- **Matrix Table**: Comprehensive feature list
- **Icons**: 2-color design (Sage + Saffron)

### 4. How It Works Page
**Layout**: Step-by-step guide + Sensor explanation
- **Steps**: Numbered cards (1-5) with arrows
- **Sensor Section**: Large illustration + detailed text
- **Data Flow**: Animated diagram showing process

### 5. Dashboard Page
**Layout**: Header + Sensor Grid + Graphs + Alerts
- **Sensor Grid**: 3x2 grid of gauge meters
- **Graphs**: Full-width trend lines
- **Alerts**: Right sidebar with recent alerts
- **Recipe Score**: Large card showing consistency percentage

### 6. Use Cases Page
**Layout**: Tabs/Cards for each vertical
- **Card Design**: Icon + Title + Description + Learn More
- **Each Case**:
  - Industry Icon
  - Problem statement
  - Solution highlight
  - Benefits list
  - Success metrics
  - CTA to contact

### 7. Contact Page
**Layout**: Contact form + Info cards + Map
- **Form**: Vertical layout, full-width inputs
- **Info Cards**: 3 cards (Email, Phone, Address)
- **Map**: Embedded location (if applicable)

---

## Animation & Interactions

### Entrance Animations
- **Fade In**: 0.6s ease-out
- **Slide Up**: 0.6s ease-out
- **Fade + Scale**: Combined for cards

### Hover Effects
- **Links**: Underline appears (2px Saffron)
- **Buttons**: Scale 1.05, shadow deepens
- **Cards**: Translate up 4px, shadow increases

### Scroll Effects
- **Lazy Load**: Images fade in on scroll
- **Counter Animation**: Numbers count up on reach
- **Parallax**: Hero background moves slower

### Loading States
- **Spinner**: Rotating Saffron circle
- **Skeleton**: Gray placeholder bars

---

## Dashboard-Specific Design

### Sensor Card Design
```
┌─────────────────────────┐
│  [ICON]  Spiciness      │
│                         │
│       ╭─────╮           │
│      ╱         ╲        │
│     │    65%    │        │
│      ╲         ╱        │
│       ╰─────╯           │
│                         │
│  ● Ideal  🔔 Alert     │
│  Updated: 2 min ago    │
└─────────────────────────┘
```

### Metrics on Each Card
- **Real-time Value**: Large, bold (e.g., 65%)
- **Status Indicator**: Color-coded dot (green/orange/red)
- **Trend Arrow**: Up/Down/Stable arrow with percentage
- **Last Updated**: Timestamp

### Alert Section Design
```
┌──────────────────────────────┐
│  🔔 Alerts (3)               │
├──────────────────────────────┤
│ ⚠️  Salt level too high       │
│    Just now                   │
├──────────────────────────────┤
│ ✓ Spice level normalized     │
│    5 mins ago                 │
├──────────────────────────────┤
│ 🔵 New batch started          │
│    15 mins ago                │
└──────────────────────────────┘
```

### Recipe Consistency Score
```
┌──────────────────────┐
│  Consistency Score   │
│       94%            │
│   [████████░░]       │
│   Excellent - Very   │
│   consistent batch   │
└──────────────────────┘
```

---

## Icon Design System

### Icon Library: Feather Icons + Custom Icons

### Standard Icons
- `Settings`: Gear icon (Sage Green)
- `Alert`: Warning triangle (Warm Red)
- `Success`: Check circle (Success Green)
- `Download`: Down arrow in box (Deep Navy)
- `Menu`: Three horizontal lines (Dark)
- `Close`: X symbol (Gray)
- `Search`: Magnifying glass (Saffron)

### Custom Icons (To Design)
- Spice meter icon
- Salt crystal icon
- Temperature thermometer
- Device illustration
- Mobile app mockup
- Data chart icon

---

## Accessibility Guidelines

### WCAG 2.1 Level AA Compliance
- **Contrast**: Minimum 4.5:1 for text
- **Focus**: Visible focus indicators (outline)
- **Alt Text**: All images have descriptive alt text
- **Keyboard**: All interactive elements keyboard accessible
- **ARIA**: Proper semantic HTML + ARIA labels

### Text Accessibility
- Line height: Minimum 1.5
- Letter spacing: Minimum 0.12em
- Max line length: 80 characters

---

## Mobile-First Design Approach

### Mobile Optimization
- **Touch Targets**: Minimum 44x44px
- **Font Size**: Minimum 16px (no zoom required)
- **Viewport**: Responsive meta tag
- **Layout**: Single column stacks
- **Forms**: One input per line

### Performance
- **Page Load**: Target < 3 seconds
- **Images**: Optimized, lazy-loaded
- **CSS**: Minified, inline critical CSS
- **JavaScript**: Defer non-critical scripts

---

## Design Files & Resources

### Figma/Design Tool Structure
```
Satvik Savor Design System
├── Colors & Tokens
├── Typography Scale
├── Components
│   ├── Buttons
│   ├── Cards
│   ├── Forms
│   └── Navigation
├── Layouts
│   ├── Desktop
│   ├── Tablet
│   └── Mobile
├── Pages
│   ├── Home
│   ├── Dashboard
│   └── [Other Pages]
└── Prototypes
    └── User Flows
```

