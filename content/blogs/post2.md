# 15/11/2025 — How Much Cheaper Could UAV Cargo Really Be?

In my previous post, I explored the idea of using medium-size unmanned cargo aircraft to move goods quickly and cheaply across Colombia. 

This time, I want to strip everything back and look at the **core economics** of these vehicles:  
the **pure physics + engineering + finance** behind what it *fundamentally* costs to fly 1 ton for 1 km.

No government fees.  
No Aerocivil.  
No taxes.  
Just fuel, maintenance, depreciation, and basic operations.

---

# **1. How do we calculate cost per ton-km?**

The core formula remains:

$$
\text{Cost per ton-km} = 
\frac{\text{Total flight cost}}{\text{Payload (tons)} \cdot \text{Distance (km)}}
$$

To keep the analysis grounded, we’ll base our assumptions on something close to a real platform: the **Poseidon Aero Egret**, a ~1.5-ton payload unmanned cargo aircraft.

---

# **2. Key Engineering Assumptions**

- **Payload:**  
  $$
  M_{\text{payload}} = 1.5\ \text{ton}
  $$

- **Sample route length:**  
  $$
  D = 1000\ \text{km}
  $$

- **Fuel burn baseline (Cessna 208 Caravan):**  
  $$
  q_{\text{plane}} \approx 0.6\ \text{L/km}
  $$  
  Sources:  
  - <https://www.aopa.org>  
  - <https://en.wikipedia.org/wiki/Cessna_208_Caravan>

- **Fuel burn for unmanned aircraft (claimed 40% reduction):**  
  $$
  q_{\text{UAV}} = 0.36\ \text{L/km}
  $$

- **Jet A-1 price:**  
  $$
  p_{\text{fuel}} \approx 0.56\ \text{USD/L}
  $$

With these, we can now build the **variable cost model**.

---

# **3. Variable Costs**

## **3.1 Fuel Consumption**

Total fuel for a 1000 km leg:

$$
Q_{\text{fuel}} = D \cdot q_{\text{UAV}}
= 1000 \cdot 0.36
= 360\ \text{L}
$$

Fuel cost:

$$
V_{\text{fuel}} = 360 \cdot 0.56
\approx 202\ \text{USD}
$$

---

## **3.2 Maintenance Costs (per flight-hour)**

Maintenance in aviation is normally expressed as **USD per flight hour** for:

- Engine reserves  
- Airframe reserves  
- Wear items  
- Scheduled inspections  

We need a rough model. Medium turboprops typically cost 300–500 USD/h in maintenance, but unmanned platforms with smaller engines and simpler avionics tend to cost less.

Let’s assume:

- **Cruise speed:**  
  $$
  v = 250\ \text{km/h}
  $$

- **Flight time:**  
  $$
  t = \frac{D}{v} = \frac{1000}{250} = 4\ \text{h}
  $$

- **Maintenance reserve:**  
  $$
  c_{\text{maint}} = 150\ \text{USD/h}
  $$

Then:

$$
V_{\text{maint}} = 4 \cdot 150 = 600\ \text{USD}
$$

---

## **3.3 Remote Operator Labor**

From autonomous driving we can expect that even unmanned systems have humans in the loop.  
Modern UAV cargo operators forecast about **1 operator per 3–10 aircraft**, thanks to autonomy and standardized routing.

Let’s assume conservatively:

- **1 operator per 3 aircraft**  
- Operator cost: 30 USD/h  
- 4 hours per flight  
- Operator load shared by 3 UAVs

Then labor per flight:

$$
V_{\text{labor}}
= \frac{30 \cdot 4}{3}
= 40\ \text{USD}
$$

---

# **4. Fixed Costs (Capex & Infrastructure)**

Fixed cost elements include:

- Airframe purchase  
- Avionics & autonomy stack  
- Ground control stations  
- Communication equipment  
- Hangar / shelter space  
- Insurance  
- Battery / engine overhaul reserves  

Let’s build a simple amortization model.

---

## **4.1 Aircraft Cost Amortization (Capex)**

Assume:

- **Aircraft cost:**  
  $$
  C_{\text{aircraft}} = 900{,}000\ \text{USD}
  $$  
  (Low for manned, realistic for UAV cargo.)

- **Useful life:**  
  $$
  L = 10\ \text{years}
  $$

- **Flights per year:**  
  One UAV flying 6 hours/day →  
  ~1800 hours/year →  
  roughly:
  $$
  N_{\text{flights}} \approx 450\ \text{flights/year}
  $$

Total flights over lifetime:

$$
N_{\text{life}} = 4500
$$

Aircraft amortization per flight:

$$
V_{\text{capex}} = \frac{900{,}000}{4500}
= 200\ \text{USD/flight}
$$

---

## **4.2 Hangar + Infrastructure Amortization**

Includes:

- Hangar or shelter  
- Charging station / fuel equipment  
- Ground control center share  
- Spare parts storage  

Assume:

- 150,000 USD infrastructure  
- 15-year life  
- Supports 6 aircraft  

Infrastructure cost per aircraft:

$$
C_{\text{infra,aircraft}} = \frac{150{,}000}{6}
= 25{,}000
$$

Amortized over 10 years:

$$
2{,}500\ \text{USD/year}
$$

Per flight (450 flights/year):

$$
V_{\text{infra}} = \frac{2{,}500}{450}
\approx 5.5\ \text{USD}
$$

---

## **4.3 Insurance**

Small cargo UAVs projected:  
10,000–20,000 USD per year.

Take:

$$
C_{\text{insurance}} = 15{,}000
$$

Per flight:

$$
V_{\text{ins}} = \frac{15{,}000}{450}
\approx 33\ \text{USD}
$$

---

# **5. Combined Cost Model**

Now we assemble all parts.

## **Variable costs**

| Component | Value (USD) |
|----------|-------------|
| Fuel | 202 |
| Maintenance | 600 |
| Remote operator | 40 |

Total variable:

$$
V_{\text{var}} = 202 + 600 + 40
= 842\ \text{USD}
$$

---

## **Fixed costs**

| Component | Value (USD) |
|----------|-------------|
| Capex amortization | 200 |
| Infrastructure | 5.5 |
| Insurance | 33 |

Total fixed:

$$
V_{\text{fixed}} \approx 238.5\ \text{USD}
$$

---

## **Total cost per 1000 km flight**

$$
V_{\text{total}} = V_{\text{var}} + V_{\text{fixed}}
= 842 + 238.5
\approx 1081\ \text{USD}
$$

---

# **6. Cost per Ton-Kilometer**

Ton-km transported:

$$
\text{ton-km} = 1.5 \cdot 1000 = 1500
$$

Cost per ton-km:

$$
C_{\text{UAV}}^{\text{ton-km}}
= \frac{1081}{1500}
\approx 0.72\ \text{USD/ton-km}
$$


---

## **What Does Traditional Air Cargo Cost?**

Traditional market air cargo rates are usually published as **USD per kg for the whole route**, not per km.

Recent data sources (global + regional):

- General global air cargo rates commonly range **3–7 USD/kg**  
  - Source example: [Statista – Global Air Freight Rates](https://www.statista.com)  
  - Source example: [WorldACD / TAC Index](https://www.worldacd.com)

- Shorter or capacity-constrained lanes: typically **4–12 USD/kg**  
  - Source example: [IATA Air Cargo Market Data](https://www.iata.org)


To compare, convert to ton-km:

$$
C_{\text{ton-km}} \approx 
\frac{\text{rate (USD/kg)} \times 1000}{D_{\text{km}}}
$$

Below are reference calculations for typical distances.

## **Distance = 2,000 km**  
(using 2.5–7 USD/kg)

- 2.5 USD/kg →  
  $$
  \approx 1.25\ \text{USD/ton-km}
  $$
- 5 USD/kg →  
  $$
  \approx 2.5\ \text{USD/ton-km}
  $$
- 7 USD/kg →  
  $$
  \approx 3.5\ \text{USD/ton-km}
  $$

## **Distance = 4,000 km**

- 3 USD/kg →  
  $$
  \approx 0.75\ \text{USD/ton-km}
  $$
- 5 USD/kg →  
  $$
  \approx 1.25\ \text{USD/ton-km}
  $$
- 7 USD/kg →  
  $$
  \approx 1.75\ \text{USD/ton-km}
  $$


# **7. Interpretation**

Removing government and regulatory fees, and adding real-world aircraft ownership costs, UAV cargo comes out around:

### **≈ 0.7 USD/ton-km**

This is:

- **Cheaper than traditional manned air cargo** (0.75–3.5 USD/ton-km typical)  
- **Far cheaper than express cargo** (3–6 USD/ton-km)

But the most important point is:

### UAV cargo becomes competitive with manned air cargo with scaled-up logistics

As autonomy, production scale, and flexibility of building runways in areas closer to the producers, the gains in time and autonomous granular logistics would make it a solid option agains the more traditional and in the case of Colombia unreliable ground transportation.

This makes unmanned airships extremely attractive for:

- Remote logistics  
- Low-infrastructure cargo operations  
- Regional cargo networks in Colombia  
- Low-value but time-sensitive goods  
- Rural connectivity  

New technologies like starlink and autonomous navigation systems can enable a reduced number of remote operators handling the logistics from an office space. 
While the size of these aircraft allows for their operation on remote parts of the country with poor access to infrastructure. Smaller size, more artisanal airports can be built and use to provide easier cargo access to rural regions as well as bodies of water, like rivers and lakes that are plentiful in other regions. 

### Compared with ground trucking?

According to World Bank analysis (citing Allen et al., 2020), average trucking freight rates in Colombia are around **0.20–0.21 USD por ton-km** (≈ **770 COP/ton-km** at 3,750 COP/USD).

This means that even in the most optimistic scenario, UAV cargo would still cost roughly **2–3 times more** than moving goods by road. However, in the Colombian context this premium could still make sense — especially for regions where the interests of the remote communities and the state align. UAV logistics could drastically improve access to areas that have been historically neglected, reduce dependence on vulnerable road networks, and strengthen the state’s presence and governance in territories that have long been isolated or affected by violence.
