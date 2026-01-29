# Satvik Savor - Technical Explanation

## Overview
Satvik Savor is an IoT-enabled flavor consistency device that measures taste parameters in food and provides real-time feedback to ensure uniform quality across batches.

---

## 1. HOW THE SENSORS MEASURE FLAVOR

### A. Salt Detection (Sodium Ion Sensor)
**Sensor Type**: Ion-Selective Electrode (ISE)

**How it Works**:
- Food sample contains sodium ions (Na+)
- ISE creates electrical potential between reference electrode and measurement electrode
- Potential difference is proportional to sodium concentration
- Formula: E = E₀ + (RT/nF) × ln([Na+])
- Microcontroller converts voltage to ppm (parts per million)

**Technical Details**:
- Range: 0-5% sodium concentration
- Accuracy: ±2%
- Response time: 2-3 seconds
- Requires calibration: Daily (2-point calibration)
- Calibration solutions: 0.1% and 1% NaCl

**Output**:
- Raw voltage: 0-1000mV
- Converted value: 0-5% (displayed as percentage)
- Status: Low (<0.5%), Ideal (0.5-2%), High (>2%)

---

### B. Sweetness Measurement (Optical Refractive Index Sensor)
**Sensor Type**: Refractometer (Optical)

**How it Works**:
- Sugar in food changes light's refractive index
- Light beam passes through sample at precise angle
- Detector measures light deflection
- Deflection correlates to sugar concentration (Brix units)
- Formula: Brix = (n - 1.3330) / 0.00145
  where n = refractive index

**Technical Details**:
- Range: 0-30 Brix (0% to 30% sugar equivalent)
- Accuracy: ±0.5 Brix
- Response time: 1-2 seconds
- Requires calibration: Per batch (water baseline)
- LED wavelength: 589nm (sodium D-line)

**Output**:
- Raw refractive index: 1.3330-1.5500
- Converted value: 0-30 Brix
- Status: Low (<2), Ideal (2-15), High (>15)

---

### C. Sourness Detection (pH Sensor)
**Sensor Type**: pH Electrode (Hydrogen Ion Sensitive)

**How it Works**:
- Acidic compounds release hydrogen ions (H+)
- pH electrode potential depends on [H+] concentration
- Nernst equation: E = E₀ - (2.303RT/F) × pH
- Microcontroller measures voltage and calculates pH
- Formula: pH = -log₁₀[H+]

**Technical Details**:
- Range: pH 0-14 (typical food: pH 3-6.5)
- Accuracy: ±0.1 pH
- Response time: 3-5 seconds
- Requires calibration: Daily (2-point: pH 4.0 and 7.0 buffers)
- Electrode material: Glass bulb with internal reference

**Output**:
- Raw voltage: 0-900mV (inverse relationship with pH)
- Converted value: pH 0-14
- Status: Low pH (<3.5 = very sour), Ideal (3.5-6.5), High pH (>6.5 = alkaline)

---

### D. Spice Level Measurement (Electrochemical Gas Sensor)
**Sensor Type**: Electrochemical Sensor for Capsaicin Detection

**How it Works**:
- Capsaicin (spice compound) is detected at molecular level
- Electrochemical cell measures oxidation current from capsaicin
- Current is proportional to capsaicin concentration
- Current converted to Scoville Heat Units (SHU)
- Formula: SHU = (current μA - baseline) × calibration factor

**Technical Details**:
- Range: 0-50,000 Scoville Units
- Accuracy: ±5%
- Response time: 3-4 seconds
- Requires calibration: Per recipe (using known spice level)
- Sensor working electrode material: Carbon

**Output**:
- Raw current: 0-100 μA
- Converted value: 0-50,000 SHU
- Status: Mild (<5,000), Medium (5,000-25,000), Hot (>25,000)

---

### E. Temperature Monitoring (Thermistor)
**Sensor Type**: NTC Thermistor (Negative Temperature Coefficient)

**How it Works**:
- Resistance of thermistor decreases as temperature increases
- Steinhart-Hart equation converts resistance to temperature:
- 1/T = A + B×ln(R) + C×[ln(R)]³
- Microcontroller measures voltage across thermistor using ADC
- Calculates resistance, then applies equation for temperature

**Technical Details**:
- Range: 0°C to 100°C
- Accuracy: ±1°C
- Response time: 1-2 seconds
- No calibration needed
- Thermistor specifications: 10kΩ @ 25°C, β = 3950K

**Output**:
- Raw ADC value: 0-1023 (10-bit)
- Converted value: 0-100°C
- Status: Cold (<40°C), Ideal (40-80°C), Hot (>80°C)

---

## 2. DATA PROCESSING SYSTEM

### Data Collection Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    MEASUREMENT CYCLE (5 seconds)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  SECOND 1: Sampling (100 Hz frequency)                          │
│  ├─ Collect 500 raw readings from each of 5 sensors             │
│  └─ Total data points: 2,500 raw measurements                   │
│                                                                   │
│  SECOND 2-3: Signal Processing                                  │
│  ├─ Remove electrical noise (median filter)                     │
│  ├─ Apply moving average (window = 50)                          │
│  ├─ Calibrate against baseline                                  │
│  └─ Normalize to 0-100 scale                                    │
│                                                                   │
│  SECOND 3-4: Feature Extraction                                 │
│  ├─ Calculate mean, median, std deviation                       │
│  ├─ Detect outliers/anomalies                                   │
│  ├─ Compare against recipe target values                        │
│  └─ Generate consistency score                                  │
│                                                                   │
│  SECOND 5: Results Finalization                                 │
│  ├─ Format final readings                                       │
│  ├─ Generate alerts (if thresholds exceeded)                    │
│  ├─ Prepare for transmission                                    │
│  └─ Log to onboard storage                                      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Signal Filtering Algorithm

```
Raw Sensor Data (500 points)
        ↓
  [Median Filter: Remove spikes]
        ↓
  [Moving Average: 50-point window]
        ↓
  [Baseline Calibration: Subtract reference]
        ↓
  [Normalization: Scale to 0-100]
        ↓
  Processed Data (Clean signal)
```

**Median Filter**:
- Removes electrical noise and outliers
- Preserves edges better than average
- Formula: output = median(x[i-n], ..., x[i], ..., x[i+n])

**Moving Average**:
- Smooths processed data
- Window size: 50 points
- Formula: MA = (1/N) × Σ x[i]

**Baseline Calibration**:
- Subtract reference measurement (water)
- Removes sensor drift
- Formula: calibrated = raw - baseline

**Normalization**:
- Scales to percentage (0-100%)
- Formula: normalized = (calibrated / max_value) × 100

---

### Feature Extraction

For each sensor reading, calculate:

1. **Mean Value** (μ)
   - Average of all processed readings
   - Formula: μ = (1/n) × Σ x[i]

2. **Standard Deviation** (σ)
   - Measures consistency/variability
   - Formula: σ = √[(1/n) × Σ(x[i] - μ)²]

3. **Confidence Score** (based on σ)
   - Higher σ = lower confidence
   - Formula: confidence = 100 × e^(-σ/10)

4. **Deviation from Target** (Δ)
   - How far from recipe target value
   - Formula: Δ = |actual_value - target_value|

5. **Consistency Index** (CI)
   - Combines confidence and deviation
   - Formula: CI = confidence × (1 - Δ/100)

---

### Consistency Score Calculation

**Overall Consistency Score** = Weighted average of individual parameter scores

```
Score = (w₁ × salt_score + w₂ × sweet_score + w₃ × sour_score 
         + w₄ × spice_score + w₅ × temp_score) / Σ weights
```

Where:
- Weights (w₁...w₅) are configurable per recipe
- Default: Equal weights (20% each)
- Each parameter score = CI (Consistency Index) of that sensor

**Interpretation**:
- 90-100%: Excellent (Perfect batch)
- 80-89%: Good (Acceptable quality)
- 70-79%: Fair (Minor adjustments needed)
- Below 70%: Poor (Significant modifications needed)

---

### Anomaly Detection

**Z-Score Method**:
- If |z| > 3: Outlier detected
- Formula: z = (x - μ) / σ
- Action: Remove and recalculate

**Rate of Change**:
- Monitor how fast value changes
- If rate > threshold: Alert user
- Formula: rate = |Δvalue| / Δtime

---

## 3. MOBILE APP CONNECTIVITY

### Device-to-App Communication

```
┌──────────────┐                    ┌──────────────┐
│   DEVICE     │ ←─── Bluetooth ────→ MOBILE APP   │
│  (Hardware)  │      5.0 (BLE)    │  (User UI)   │
└──────────────┘                    └──────────────┘
       ↓                                    ↓
  WiFi 5GHz                        Cloud Storage
       │                                 (AWS)
       └──────────────→ ☁️ ←──────────────┘
                   Cloud Server
```

### Bluetooth Data Transfer

**Protocol**: BLE (Bluetooth Low Energy) 5.0

**Connection Process**:
1. Device advertises: "SatvikSavor_[ID]"
2. Mobile app scans and discovers device
3. App initiates pairing (16-digit PIN)
4. Both devices exchange encryption keys
5. Secure connection established

**Data Packet Structure**:
```
┌─────────┬────────┬───────┬───────┬───────┬───────┬────────┐
│ Header  │ Salt % │Sweet  │ Sour  │ Spice │ Temp  │ Checksum
│ (2B)    │ (2B)   │ (2B)  │ (2B)  │ (2B)  │ (2B)  │ (1B)
├─────────┴────────┴───────┴───────┴───────┴───────┴────────┤
│                    Total: 13 Bytes                         │
└─────────────────────────────────────────────────────────────┘
```

**Transmission Frequency**:
- Real-time mode: Every 1 second
- Battery save mode: Every 5 seconds
- Sleep mode: Every 30 seconds

**Latency**: <200ms (guaranteed)

---

### Cloud Data Synchronization

**Architecture**:
```
Mobile App
    ↓
REST API (HTTPS)
    ↓
Load Balancer (AWS ELB)
    ↓
API Gateway (AWS API Gateway)
    ↓
Lambda Functions (Data processors)
    ↓
Database (PostgreSQL on RDS)
    ↓
S3 Storage (Historical archives)
```

**Sync Protocol**:
1. App detects internet connection
2. Queues unsync'd data (offline tolerance: 7 days)
3. Establishes HTTPS connection
4. Sends encrypted data payload
5. Server validates and stores data
6. Returns confirmation
7. App clears local queue

**Data Encryption**:
- Encryption: AES-256-GCM
- Key exchange: TLS 1.3
- Certificate: Let's Encrypt (auto-renewed)

---

### Real-Time Data Streaming

**Technology**: Firebase Realtime Database

**Features**:
- Live updates across all devices
- Sub-second latency
- Automatic sync on connection
- Offline persistence

**Stream Structure**:
```
/batches/{batchId}/readings/{timestamp}/
├─ salt: 1.5
├─ sweetness: 8.2
├─ sourness: 4.5
├─ spice: 12000
├─ temperature: 65
└─ consistency_score: 94%
```

---

## 4. FEEDBACK LOOP & ALERTS

### Real-Time Alerts System

**Alert Types**:

1. **Threshold Alerts**
   - Triggered when value exceeds target ±tolerance
   - Example: "Salt level 2.5% (target: 1.5%, tolerance: ±0.5%)"
   - Action: Adjust seasoning immediately

2. **Trend Alerts**
   - Triggered when value drifts slowly over time
   - Example: "Temperature declining at 2°C/minute"
   - Action: Check heat source

3. **Anomaly Alerts**
   - Triggered when sudden unexpected changes occur
   - Example: "Spice level jumped 50% in 5 seconds"
   - Action: Stir mixture, investigate source

4. **Consistency Alerts**
   - Triggered when consistency drops below threshold
   - Example: "Batch consistency 65% (target: >80%)"
   - Action: Check all parameters, adjust

### Alert Configuration

Users can set:
- Alert thresholds (min/max for each parameter)
- Alert sensitivity (strict/medium/lenient)
- Alert methods (push/email/SMS)
- Quiet hours (do not disturb)
- Escalation rules

### Alert Actions

**User Actions**:
1. Dismiss alert
2. View detailed parameter
3. View recipe target
4. Get AI recommendation
5. Start batch adjustment
6. Log notes about deviation

**Automatic Actions** (optional):
- Log deviation with timestamp
- Capture photo of food
- Record user's correction action
- Suggest recipe adjustment for next batch

---

### AI-Powered Recommendations

**Machine Learning Model**: TensorFlow-based prediction

**Input Features**:
- Current sensor readings
- Recipe target values
- Historical batch data (50 previous batches)
- Ingredient list
- Cooking time
- Chef ID
- Environmental conditions

**Output**: Recommended action
- "Add 0.3% more salt"
- "Reduce heat to 70°C"
- "Stir for 2 minutes to distribute spices"
- "Add squeeze of lemon for sourness"

**Model Training**:
- Trained on 50,000+ batch records
- Updated monthly with new data
- 95% accuracy in recommendations

---

## 5. REAL-TIME ALERTS FLOW

### Alert Generation Pipeline

```
┌─ Sensor Reading (e.g., Salt = 2.5%)
│
├─ Compare with Target (Target = 1.5%, Tolerance = 0.5%)
│
├─ Check Threshold: 2.5% > 2.0% (1.5% + 0.5%) ?
│  └─ YES → Create Alert
│
├─ Set Alert Severity:
│  ├─ Minor (within 10% of max deviation) → Yellow
│  ├─ Major (10-20% over) → Orange
│  └─ Critical (>20% over) → Red
│
├─ Generate Alert Message:
│  └─ "⚠️ Salt level high: 2.5% (target: 1.5%)"
│
├─ Select Notification Channels:
│  ├─ Push notification to app
│  ├─ In-app alert popup
│  ├─ Email summary (if enabled)
│  └─ SMS (if enabled)
│
├─ Log Alert:
│  ├─ Timestamp
│  ├─ Severity level
│  ├─ Parameter
│  ├─ Value & deviation
│  └─ User action (if any)
│
└─ AI Generates Recommendation:
   └─ "Consider reducing salt. Current: 2.5%, Target: 1.5%"
```

---

### Notification Delivery

**Channels**:
1. **Push Notification** (Primary)
   - Service: Firebase Cloud Messaging
   - Delivery: <1 second
   - Display: Alert with action buttons

2. **In-App Notification**
   - Toast message in app
   - Alert details panel
   - Historical log

3. **Email** (Optional)
   - Daily/weekly digest
   - Summary of all alerts
   - Charts and recommendations

4. **SMS** (Premium)
   - Critical alerts only
   - Direct SMS to phone
   - Recipient: Chef/Head Chef

---

## 6. DATA STORAGE & ANALYTICS

### Data Models

**Batch Record**:
```json
{
  "batchId": "batch_20241209_001",
  "recipeId": "recipe_temple_khichdi",
  "startTime": "2024-12-09T10:00:00Z",
  "endTime": "2024-12-09T10:15:00Z",
  "readings": [
    {
      "timestamp": "2024-12-09T10:00:05Z",
      "sensors": {
        "salt": 1.5,
        "sweetness": 8.2,
        "sourness": 4.5,
        "spice": 12000,
        "temperature": 65
      },
      "consistencyScore": 94
    }
    // ... more readings
  ],
  "overallScore": 94,
  "alerts": [/* array of alerts */],
  "notes": "Perfect batch",
  "chef": "chef_001"
}
```

### Analytics Queries

**Query 1: Monthly Consistency Trend**
```sql
SELECT DATE_TRUNC('day', timestamp) as day,
       AVG(consistencyScore) as avg_score,
       COUNT(*) as batches
FROM batches
WHERE timestamp >= NOW() - INTERVAL '30 days'
GROUP BY day
ORDER BY day DESC;
```

**Query 2: Top Recipes by Consistency**
```sql
SELECT recipeId, AVG(overallScore) as avg_score,
       COUNT(*) as batches
FROM batches
WHERE timestamp >= NOW() - INTERVAL '90 days'
GROUP BY recipeId
ORDER BY avg_score DESC
LIMIT 10;
```

**Query 3: Chef Performance**
```sql
SELECT chef, AVG(overallScore) as avg_score,
       STDDEV(overallScore) as consistency_std
FROM batches
WHERE timestamp >= NOW() - INTERVAL '30 days'
GROUP BY chef;
```

---

## 7. SYSTEM ARCHITECTURE SUMMARY

### Hardware Stack
- **Processor**: ARM Cortex-M7 (200 MHz)
- **Memory**: 256 KB RAM, 1 MB Flash
- **Sensors**: 5 electrochemical + thermal
- **Connectivity**: WiFi 5GHz + BLE 5.0
- **Power**: Li-ion 3000mAh battery

### Software Stack
- **Firmware**: C/C++ (FreeRTOS)
- **Mobile**: React Native (iOS + Android)
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL
- **ML**: TensorFlow
- **Cloud**: AWS (EC2, S3, Lambda)

### Communication Stack
- **Device ↔ App**: Bluetooth 5.0 (BLE)
- **Device ↔ Cloud**: WiFi 5GHz + HTTPS
- **App ↔ Cloud**: HTTPS/REST + Firebase

---

## 8. PERFORMANCE METRICS

### Response Times
- Sensor measurement: 5 seconds
- Data processing: 1-2 seconds
- Bluetooth transmission: <200ms
- Cloud sync: 1-3 seconds
- Alert notification: <2 seconds
- **Total latency**: <12 seconds

### Accuracy Guarantees
- Salt detection: ±2%
- Sweetness: ±0.5 Brix
- Sourness: ±0.1 pH
- Spice: ±5%
- Temperature: ±1°C

### Reliability
- Uptime: 99.9% (device)
- Uptime: 99.95% (cloud services)
- Data loss risk: <0.01%
- Sensor failure rate: <1% per year

---

## 9. SECURITY & PRIVACY

### Data Security
- **Encryption in Transit**: AES-256-GCM over TLS 1.3
- **Encryption at Rest**: AES-256 on database
- **Key Management**: AWS KMS
- **Access Control**: RBAC (Role-Based Access Control)

### Privacy Compliance
- **GDPR**: Full compliance
- **Data Retention**: Configurable (default: 5 years)
- **Data Anonymization**: PII removal for analytics
- **Audit Logs**: All access logged and monitored

---

## 10. FUTURE ENHANCEMENTS

### Phase 2 (Q2 2025)
- Multi-language support
- Advanced ML recommendations
- Integration with recipe databases
- Batch comparison AI

### Phase 3 (Q3 2025)
- Autonomous seasoning dosage recommendation
- Integration with kitchen automation
- Blockchain-based audit trail
- Offline ML inference on device

---

