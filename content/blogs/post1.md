# 11/13/2025 Cheap air cargo for remote areas and microgrid management

Many regions in south and central america have been historically isolated because of its geographical features. As the push for progress and widespread adoption of technology and infrastructure we face two big challenges in the south american context: Limited resources and nature conservation. I will take an example from my own experience growing up: Colombia. 

Being a very mountainous country, with the largest amount of rainfall per year in the planet and a sizable seismic activity, building and maintaining roads is specially difficult and expensive. At the same time, a big percentage of the land is covered by valuable rainforests that we don't want to disrupt. In the experience of the neighbouring country of Brazil, building roads into the Amazon rainforest (although with the best of intentions) has exacerbated the rate of deforestation and ilegal activities in isolated regions. Things like ilegal mining, forestry and cattle breeding can be extremely harmful for the surrounding environment when done outside of regulatory frameworks.

It is not only problems though, it has been said that Colombia is inmune to dictatorships in part because of the big difficulty to control all the territory. And whether that statement is truth or not, Colombia is in fact one of the longest-standing democracies in South America. where many of the countries in the region went through decades-long autoritarian regimes, the only dictator in the country (Gustavo Rojas Pinilla) lasted for about 4 years before he gave up power, after kickstarting a meaningful technological modernization push in the country. 

As the country started modernizing, the airplanes arrived as well. And given the abrupt geography of Colombia, the airports gained popularity quickly. Being the third country with the most airports in South America and with a thriving domestic flight market, it has become one of the principal means of passenger transportation in the country. 

However, cargo tells a different story.

Although the El Dorado airport in Bogota is the most frequented airport for cargo transportation in the region, internal cargo is done mainly through large truck transportation. This resulted after a failed attempt of implementing and maintaining a rail network connection the center of the country with the caribbean coast and the proliferation of car roads around the country. 

This, as mentioned before has major infrastructure costs, given the instability of the land's surface in most of the populated territory. This has resulted in frequent landslides leaving small towns isolated for long stretches of time. Very hard to reach regions that have virtually no presence of the state forces and constant disruptions of major infrastructure projects. 

The list is almost endless, projects like the main highway to the oriental plains, hidroituango, the Chirajara bridge and so on. 

Another unfortunate side effect of this isolation and lack of state presence is a power vacuum in the isolated regions, which has always encouraged self-governing structures which operate as de-facto states in these parts of the country. Through all the Colombian history this has frequently erupted in waves of violence and territorial disputes that even today seem like an endless curse in our beautiful land. 

The arrival of narcotraffic only made the problem worse, empowering these violent structures even further by providing very profitable meanings of existence and ways of arm themselves. I won't touch too much on this, as the news and even Netflix have done more than enough explaining this problematic. 

The state has also made incountable mistakes that fueled this violence, but as the democratic process strenghtens, the ultimate hope is that we all build a state that can be trusted and acts with the best possible faith for the progress and protection of life. This is a whole tangent that is worth exploring later.

## Does that mean it is hopeless?

After this context, what I wanted to focus on is on how this could be improved through intelligent innovation. A simple idea becomes almost obvious after this: If the cost of flight mile-ton decreases to a level that makes it feasible for isolated communities to establish trade and surveillance in the vast, difficult territory, it could provide both economic alternatives to illegal activities and a mean for the state to enforce the law in hard-to-reach places. 

Iamgine pick-up truck-sized, unmanned cargo airships that can land on water bodies, or unpaved, 2000 ft long airways (Like the ones [poseidon aero](https://www.poseidonaero.com/aircraft) is trying to make). An autonomous system orchestrating a swarm of these already cheap hypotetical airplanes could enable towns like Landazuri, Santander to keep trading their cacao beans and other agricultural products without having to rely on the constantly-accidented main road connecting it with the center of the country. This road in particular has never had a year without landslides since its creation in the mid 20th century!

To be clear, this is not a replacement for traditional roads, and the struggle to create and maintain these ways will continue to be a national challenge, however, providing a solid option that can adapt to specific cases remains very interesting. 

## How much would it cost?

So in the end, this whole thing makes sense only if it has a competitive price compared to other transportation alternatives. 

How to calculate the cost of flight-Km-ton?

To calculate the cost of air cargo per ton-kilometer, you must first determine the total cost and then divide it by the total ton-kilometers, which is calculated by multiplying the total weight in tons by the distance in kilometers. The total cost is a combination of a base rate, fuel surcharges, security fees, and handling charges, all influenced by factors like the cargo's chargeable weight (actual or volumetric, whichever is greater) and the specific route. 


The main formula would be:

$$ \text{Cost per ton-km} = \frac{\text{Total transport cost}}{\text{Cargo mass (tons)} \times \text{Distance (km)}} $$

Taking as an example the Egret unmanned cargo plane from Poseidon Aero, and assuming we always use its full capacity:

$$ \text{Cargo mass} = 1.59 T$$

$$ \text{Max distance} = 3055 km $$

Then we need to make a couple of educated guesses to find the total cost of transportation, using a sample leg of say 1000 km (Which already covers a sizable number of territories in the country from Bogota or the ports in the coasts). The actual fuel usage of these unmanned planes is yet to be disclosed, therefore we'll take the fuel consumption of a similar size plane and apply the 40% fuel reduction claimed by Poseidon:

## **1. Key Assumptions**

- **Payload**:  
  $$M_{\text{payload}} = 1.5\ \text{ton}$$

- **Example route length**:  
  $$D = 1{,}000\ \text{km}$$

- **Reference aircraft fuel burn** (Cessna 208 Caravan):  
  $$q_{\text{plane}} \approx 0.6\ \text{L/km}$$  
  Sources:  
  - [AOPA Caravan Data](https://www.aopa.org)  
  - [Wikipedia – Cessna 208 Caravan](https://en.wikipedia.org/wiki/Cessna_208_Caravan)

- **Airship fuel consumption (40% reduction)**:  
  $$q_{\text{airship}} = 0.6\,q_{\text{plane}} \approx 0.36\ \text{L/km}$$

- **Jet A-1 fuel price in Colombia**:  
  0.558–0.562 USD/L  
  <https://jet-a1-fuel.com/jet-a1-price/colombia>

  So in COP:  
  $$p_{\text{fuel,COP}} \approx 2{,}100\ \text{COP/L}$$

- **Exchange rate**:  
  $$1\ \text{USD} \approx 3{,}750\ \text{COP}$$

- **MTOW (Maximum Takeoff Weight) for an unmanned airship of this class**

  For a **manned** Caravan-class aircraft, MTOW is around **4.0 ton**, which includes:
  - Structure  
  - Fuel  
  - Crew  
  - Payload  

  For an **unmanned** aircraft, **crew weight is zero**, so we approximate:

  $$\text{MTOW}_{\text{unmanned}} \approx 4.0\ \text{ton} - 0.2\ \text{ton} = 3.8\ \text{ton}$$

  (Assuming ~200 kg of crew that no longer exists in the design.)

  This **3.8 t** is the value used in the fee formulas below.


## **2. Cost Component Formulas**

### **2.1 Fuel Cost**

General formula:

$$
V_{\text{fuel}} = D \cdot q_{\text{airship}} \cdot p_{\text{fuel}}
$$

In COP:

$$
V_{\text{fuel,COP}} = D \cdot q_{\text{airship}} \cdot p_{\text{fuel,COP}}
$$

---

### **2.2 Navigation (En-Route) Fee — Aerocivil Colombia**

From *Resolución 00077 de 2025 (Aerocivil)*, the en-route navigation charge is:

$$
V_{\text{nav,USD}} = 0.051418 \cdot \sqrt{\text{MTOW}_{\text{ton}}} \cdot D
$$

For the **unmanned** airship:

$$
\text{MTOW}_{\text{ton}} = 3.8
$$

So:

$$
V_{\text{nav,USD}} = 0.051418 \cdot \sqrt{3.8} \cdot D
$$

Convert to COP:

$$
V_{\text{nav,COP}} = V_{\text{nav,USD}} \cdot 3{,}750
$$

Official info (tariffs & formulas):  
- Aerocivil: <https://www.aerocivil.gov.co>

---

### **2.3 Aerodrome (Landing/Takeoff) Fees**

Defined in Aerocivil regulations, e.g.:

- *Resolución 00077 de 2025 (tarifas)*  
- *Resolución 00003 de 2024*  
[Aerocivil's website](https://www.aerocivil.gov.co/atencion/participa/participacion/Proyecto%20de%20resoluciones/RESOLUCI%C3%93N%20000003%20DE%202024.pdf)


General form:

$$
V_{\text{aerod}} = f_{\text{aerod}}(\text{MTOW}, \text{airport}) \times N_{\text{movimientos}}
$$

For a small unmanned aircraft with **MTOW ≈ 3.8 t**, we approximate that the fee scales roughly with MTOW, so if a 4 t manned aircraft would pay about **10 USD per movement**, the unmanned one is slightly less:

$$
V_{\text{aerod,USD}} \approx 10 \cdot \frac{3.8}{4.0} \times 2 \approx 19\ \text{USD}
$$

(2 movements = takeoff + landing.)

In COP:

$$
V_{\text{aerod,COP}} \approx 19 \cdot 3{,}750 \approx 71{,}000\ \text{COP}
$$

> **Note:** You should replace this approximation with the exact band for MTOW = 3.8 t in the Aerocivil tariff table for the specific airports.

---

### **2.4 Carbon Tax (Impuesto al Carbono)**

From Colombia Compra Eficiente aviation fuel documentation: <https://www.colombiacompra.gov.co>

- Carbon tax on Jet A/A1: **148 COP/galón**  
- 1 gal ≈ 3.785 L → approx **39 COP/L**

So:

$$
V_{\text{CO2}} = D \cdot q_{\text{airship}} \cdot 39
$$

(in COP)

---

## **3. Worked Example (1,000 km Leg, Unmanned)**

Let:

- $$D = 1{,}000\ \text{km}$$  
- $$q_{\text{airship}} = 0.36\ \text{L/km}$$  
- $$p_{\text{fuel,COP}} = 2{,}100\ \text{COP/L}$$  
- $$\text{MTOW} = 3.8\ \text{ton}$$  
- $$\text{FX} = 3{,}750\ \text{COP/USD}$$  

---

### **3.1 Fuel**

Fuel volume:

$$
Q_{\text{fuel}} = D \cdot q_{\text{airship}}
= 1000 \cdot 0.36
= 360\ \text{L}
$$

Fuel cost:

$$
V_{\text{fuel,COP}} = 360 \cdot 2{,}100
\approx 756{,}000\ \text{COP}
$$

Using 0.56 USD/L:

$$
V_{\text{fuel,USD}} = 360 \cdot 0.56 \approx 202\ \text{USD}
$$

(You can round to ~201–202 USD.)

---

### **3.2 Navigation Charge (Unmanned MTOW)**

First compute navigation fee in USD:

$$
V_{\text{nav,USD}}
= 0.051418 \cdot \sqrt{3.8} \cdot 1000
\approx 100.23\ \text{USD}
$$

Then convert to COP:

$$
V_{\text{nav,COP}} \approx 100.23 \cdot 3{,}750
\approx 375{,}900\ \text{COP}
$$

(You can round to **≈ 376,000 COP**.)

---

### **3.3 Carbon Tax**

$$
V_{\text{CO2}} = 360 \cdot 39
\approx 14{,}000\ \text{COP}
$$

(≈ 3.7 USD; relatively small compared to fuel + nav.)

---

### **3.4 Aerodrome Fees (Unmanned MTOW)**

Approximate:

$$
V_{\text{aerod,USD}} \approx 19\ \text{USD}
$$

$$
V_{\text{aerod,COP}} \approx 19 \cdot 3{,}750
\approx 71{,}000\ \text{COP}
$$

---

## **4. Total Variable Cost (Unmanned Example)**

Ignoring minor items (handling, parking, etc.) and counting mainly fuel + nav + aerodrome:

In USD:

$$
V_{\text{total,USD}}
\approx V_{\text{fuel,USD}} + V_{\text{nav,USD}} + V_{\text{aerod,USD}}
$$

$$
\approx 202 + 100.23 + 19
\approx 321\ \text{USD}
$$

(In practice, you can quote **≈ 320 USD**.)

In COP:

$$
V_{\text{total,COP}} \approx 321 \cdot 3{,}750 \approx 1.20\times 10^6\ \text{COP}
$$

---

## **5. Cost per Ton-Kilometer (Unmanned)**

Ton-km transported:

$$
\text{ton-km} = M_{\text{payload}} \cdot D
= 1.5 \cdot 1000
= 1500\ \text{ton-km}
$$

Cost per ton-km in USD:

$$
C_{\text{total}}^{\text{ton-km}}
= \frac{V_{\text{total,USD}}}{\text{ton-km}}
\approx \frac{321}{1500}
\approx 0.214\ \text{USD/ton-km}
$$

Cost per ton-km in COP:

$$
0.214 \cdot 3{,}750 \approx 803\ \text{COP/ton-km}
$$

So, under these assumptions, the **unmanned 1.5-ton airship** flying a **1,000 km domestic leg in Colombia** has a direct variable cost of roughly:

- **≈ 0.21 USD/ton-km**, or  
- **≈ 800 COP/ton-km**

---

# **6. References**

### **Fuel Prices (Jet A-1 Colombia)**  
- Jet A-1 price reference: <https://jet-a1-fuel.com/jet-a1-price/colombia>  
- Colombia Compra Eficiente (framework contracts & tax structure): <https://www.colombiacompra.gov.co>  
- UPME petroleum chain studies: <https://www1.upme.gov.co>

### **Aerocivil Fees & Regulations**
- Aerocivil – main site: <https://www.aerocivil.gov.co>  
- Resolución 00077 de 2025 (tarifas de aeródromo, navegación, etc.)  
- Resolución 00003 de 2024 (tasas aeroportuarias, UVT, etc.):  
[Resolución](https://www.aerocivil.gov.co/atencion/participa/participacion/Proyecto%20de%20resoluciones/RESOLUCI%C3%93N%20000003%20DE%202024.pdf)
- AIP Colombia (GEN 4.1–4.2, derechos y tasas): <https://www.aerocivil.gov.co>

### **Aircraft Fuel Performance (Baseline)**
- AOPA – Caravan performance & fuel data: <https://www.aopa.org>  
- Cessna 208 Caravan – specs & performance: <https://en.wikipedia.org/wiki/Cessna_208_Caravan>

# How does this compare to traditional air cargo prices?

So, comparing with the previously computed value:

$$
C_{\text{airship}}^{\text{ton-km}} \approx 0.214\ \text{USD/ton-km}
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

- Example relevant to Latin America: **China → Brazil = 6.46 USD/kg**  
  - Source: [Statista – China–Brazil Air Freight Cost](https://www.statista.com/statistics/1347127/china-to-brazil-air-freight-price)

To compare, convert to ton-km:

$$
C_{\text{ton-km}} \approx 
\frac{\text{rate (USD/kg)} \times 1000}{D_{\text{km}}}
$$

---

# **3. Converted Benchmarks**

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

## **Example (China → Brazil)**  
Distance ~17,000 km, rate 6.46 USD/kg:

$$
C_{\text{ton-km}} \approx 
\frac{6.46 \times 1000}{17000}
\approx 0.38\ \text{USD/ton-km}
$$

Because very long-haul reduces ton-km cost, but rates per kg remain high.

Source:  
[Statista – China–Brazil Air Freight Cost](https://www.statista.com/statistics/1347127/china-to-brazil-air-freight-price)

---

# **4. Direct Comparison**

## **For our Unmanned Airship**  
$$
C_{\text{airship}}^{\text{ton-km}} \approx 0.214\ \text{USD/ton-km}
$$

## **Traditional Air Cargo**  
Typical range:

$$
C_{\text{trad}}^{\text{ton-km}} \approx 0.75 - 3.5\ \text{USD/ton-km}
$$

## **Multiplicative Difference**

- Compared to **low end** (0.75 USD/ton-km):  
  $$
  \frac{0.75}{0.214} \approx 3.5\times\ \text{more expensive}
  $$
- Compared to **mid-range** (1.25–2.5 USD/ton-km):  
  $$
  6\times - 12\times\ \text{more expensive}
  $$
- Compared to **premium LAM lanes** (high volatility):  
  $$
  up\ to\ 15\times\ higher
  $$

Thus, **This airship’s direct cost is an order of magnitude below many lanes**.

---

# **5. Important Contextual Notes**

1. However, the original cost of **0.214 USD/ton-km** is **only direct variable cost**  
   (fuel + navigation + aerodrome).

2. Traditional air cargo rates **include markup** for:
   - Aircraft CAPEX (financing, depreciation, leasing)
   - Crew salaries + training
   - Maintenance, heavy checks
   - Ground crew, warehouses, security
   - Insurance
   - Forwarder margin & airline margin

3. Since unmanned airships avoid:
   - Crew  
   - High fuel burn  
   - Large airport workflows  

   …their **variable cost floor** is extremely low relative to traditional air cargo.

---

# **6. Summary Table (Direct Comparison)**

| Mode | Cost per ton-km (USD/ton-km) | Notes |
|------|------------------------------|-------|
| **Our unmanned airship** | **0.214** | Based on Colombia costs; direct variable cost only |
| Short-haul regional air cargo (LATAM) | 1.0–3.5 | Often capacity-limited; many airports involve feeder aircraft |
| Global mid-range cargo | 0.75–2.0 | Typical world lanes |
| High-cost lanes (e.g., China→Brazil) | 1.5–4.0 | Reported 6–12 USD/kg in some periods |
| Express cargo (DHL/FedEx/UPS) | 3–6 | Not directly comparable |

---

# **7. Analysis**

This makes unmanned airships extremely attractive for:

- Remote logistics  
- Low-infrastructure cargo operations  
- Regional cargo networks in Colombia  
- Low-value but time-sensitive goods  
- Rural connectivity  

New technologies like starlink and autonomous navigation systems can enable a reduced number of remote operators handling the logistics from an office space. 
While the size of these aircraft allows for their operation on remote parts of the country with poor access to infrastructure. Smaller size, more artigianal airports can be built and use to provide easier cargo access to rural regions as well as bodys of water, like rivers and lakes that are plentyful in other regions. 