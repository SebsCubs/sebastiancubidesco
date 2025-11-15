# 15/11/2025 — ¿Qué tan barato podría llegar a ser el transporte de carga con UAV?

En mi post anterior hablé de la idea de usar aeronaves de carga no tripuladas de tamaño medio para mover mercancía por Colombia de forma más rápida y flexible. 
Para entenderlo mejor, esta vez quiero desarmar todo eso y mirar solo el **corazón económico** del asunto:  
lo que cuesta, desde la **física, la ingeniería y las finanzas**, mover 1 tonelada durante 1 kilómetro.

Sin tasas gubernamentales.  
Sin Aerocivil.  
Sin impuestos.  
Solo combustible, mantenimiento, depreciación y operación básica.

---

# **1. ¿Cómo calculamos el costo por ton-km?**

La fórmula base no cambia:

$$
\text{Costo por ton-km} = 
\frac{\text{Costo total del vuelo}}{\text{Carga útil (ton)} \cdot \text{Distancia (km)}}
$$

Y para hacer el análisis más real, partimos de un ejemplo concreto: el **Poseidon Aero Egret**, un UAV de carga con alrededor de 1.5 toneladas de capacidad útil.

---

# **2. Supuestos técnicos clave**

- **Carga útil:**  
  $$
  M_{\text{payload}} = 1.5\ \text{ton}
  $$

- **Ruta de ejemplo:**  
  $$
  D = 1000\ \text{km}
  $$

- **Consumo de referencia (Cessna 208 Caravan):**  
  $$
  q_{\text{plane}} \approx 0.6\ \text{L/km}
  $$
  Fuentes:  
  - <https://www.aopa.org>  
  - <https://en.wikipedia.org/wiki/Cessna_208_Caravan>

- **Consumo estimado UAV (40% menos):**  
  $$
  q_{\text{UAV}} = 0.36\ \text{L/km}
  $$

- **Precio del Jet A-1:**  
  $$
  p_{\text{fuel}} \approx 0.56\ \text{USD/L}
  $$

Con esto ya podemos empezar a armar el modelo de costos variables.

---

# **3. Costos variables**

## **3.1 Consumo de combustible**

Para 1000 km:

$$
Q_{\text{fuel}} = 1000 \cdot 0.36 = 360\ \text{L}
$$

Costo:

$$
V_{\text{fuel}} = 360 \cdot 0.56 \approx 202\ \text{USD}
$$

---

## **3.2 Mantenimiento (por hora de vuelo)**

El mantenimiento aeronáutico incluye:

- Fondos de motor  
- Fondos de célula  
- Repuestos y desgaste  
- Inspecciones programadas  

Un turboprop mediano puede costar 300–500 USD/h, pero los UAV tienen motores más simples y menos sistemas.

Supongamos:

- **Velocidad de crucero:**  
  $$
  v = 250\ \text{km/h}
  $$

- **Tiempo de vuelo:**  
  $$
  t = 1000 / 250 = 4\ \text{h}
  $$

- **Reserva de mantenimiento:**  
  $$
  c_{\text{maint}} = 150\ \text{USD/h}
  $$

Entonces:

$$
V_{\text{maint}} = 4 \cdot 150 = 600\ \text{USD}
$$

---

## **3.3 Trabajo del operador remoto**

Incluso con autonomía avanzada como la de waymo, lo más probable es que aún se necesite supervisión humana.  
Un estimado conservador sería de **1 operador por cada 3–10 aeronaves**.

Tomemos una estimación conservadora:

- 1 operador por cada 3 UAV  
- Costo del operador: 30 USD/h  
- 4 horas de vuelo  
- Costo dividido entre 3 aeronaves

Entonces:

$$
V_{\text{labor}} = \frac{30 \cdot 4}{3} = 40\ \text{USD}
$$

---

# **4. Costos fijos (Capex e infraestructura)**

Aquí entran:

- Compra de aeronave  
- Aviónica y sistemas de autonomía  
- Centro de control  
- Comunicaciones  
- Espacio en hangar o taller  
- Seguros  
- Reservas para overhaul del motor

Vamos por partes.

---

## **4.1 Amortización del costo de la aeronave**

Supongamos:

- **Costo del UAV:**  
  $$
  C_{\text{aircraft}} = 900{,}000\ \text{USD}
  $$

Poseidon Aero no ha publicado el costo de cada aeronave, pero este se espera que sea un estimado conservador, comparando con el precio de aviones de este tamaño aproximado.

- **Vida útil:**  
  $$
  L = 10\ \text{años}
  $$

- **Horas de vuelo por año:**  
  6 h/día → ~1800 h/año  
  ~450 vuelos/año

Total de vuelos en su vida:

$$
N_{\text{life}} = 4500
$$

Amortización por vuelo:

$$
V_{\text{capex}} = 900{,}000 / 4500 = 200\ \text{USD}
$$

---

## **4.2 Infraestructura (hangar, centro de control, etc.)**

Asumamos:

- 150,000 USD en infraestructura  
- 15 años de vida  
- Soporta 6 aeronaves

Costo por aeronave:

$$
C_{\text{infra,aircraft}} = 25{,}000
$$

Amortización anual:

$$
2{,}500\ \text{USD/año}
$$

Por vuelo:

$$
V_{\text{infra}} = 2{,}500 / 450 \approx 5.5\ \text{USD}
$$

---

## **4.3 Seguro**

Supongamos:

- $$ C_{\text{insurance}} = 15{,}000\ \text{USD/año} $$

Por vuelo:

$$
V_{\text{ins}} = 15{,}000 / 450 \approx 33\ \text{USD}
$$

---

# **5. Modelo final de costos**

Vamos a sumar todo.

## **Costos variables**

| Componente | Valor (USD) |
|-----------|--------------|
| Combustible | 202 |
| Mantenimiento | 600 |
| Operador remoto | 40 |

Total variable:

$$
V_{\text{var}} = 842\ \text{USD}
$$

---

## **Costos fijos**

| Componente | Valor (USD) |
|-----------|--------------|
| Amortización (capex) | 200 |
| Infraestructura | 5.5 |
| Seguro | 33 |

Total fijo:

$$
V_{\text{fixed}} \approx 238.5\ \text{USD}
$$

---

## **Costo total por vuelo de 1000 km**

$$
V_{\text{total}} = 842 + 238.5 = 1081\ \text{USD}
$$

---

# **6. Costo por tonelada-kilómetro**

Tonelada-km movidas:

$$
\text{ton-km} = 1.5 \cdot 1000 = 1500
$$

Costo por ton-km:

$$
C_{\text{UAV}}^{\text{ton-km}} = \frac{1081}{1500} \approx 0.72\ \text{USD/ton-km}
$$

---

# **7. ¿Y cómo se compara con la carga aérea tradicional?**

El mercado de carga aérea publica sus precios como **USD/kg**, no como ton-km.  
Convertimos usando:

$$
C_{\text{ton-km}} = \frac{\text{tarifa (USD/kg)} \cdot 1000}{D}
$$

Fuentes generales:  
- <https://www.statista.com>  
- <https://www.worldacd.com>  
- <https://www.iata.org>

Valores típicos:

- **3–7 USD/kg** en rutas globales  
- **4–12 USD/kg** en rutas cortas o congestivas  

Ejemplo para 2000 km:

- 2.5 USD/kg → 1.25 USD/ton-km  
- 5 USD/kg → 2.5 USD/ton-km  
- 7 USD/kg → 3.5 USD/ton-km  

Para 4000 km:

- 3 USD/kg → 0.75 USD/ton-km  
- 5 USD/kg → 1.25 USD/ton-km  

---

# **8. Interpretación**

Quitando todas las tasas e impuestos, y sumando los costos reales de propiedad y operación, el costo final del UAV queda en:

## **≈ 0.7 USD/ton-km**

Esto es:

- Más barato que la carga aérea tripulada tradicional (0.75–3.5 USD/ton-km)  
- Mucho más barato que carga express (3–6 USD/ton-km)  

Pero lo más interesante es que:

### Con autonomía, producción a escala y la posibilidad de operar en pistas pequeñas cerca de los centros agrícolas, los UAV pueden convertirse en una alternativa seria y competitiva.

Este tipo de aeronaves resulta especialmente atractivo para:

- Logística remota  
- Operaciones con baja infraestructura  
- Redes regionales de carga en Colombia  
- Productos de bajo valor pero sensibles al tiempo  
- Conectividad rural  

Tecnologías como **Starlink**, sistemas avanzados de navegación autónoma y operaciones remotas permiten que pocos operadores humanos controlen grandes flotas desde un centro de comando.

Y lo más importante:  
su tamaño y simplicidad permiten operar en **pistas cortas, rios, llanos y zonas apartadas**, acercando la logística aérea a lugares donde hoy simplemente no llega.

### ¿Y cómo se compara con el transporte terrestre?

Según un análisis del Banco Mundial (citando a Allen et al., 2020), las tarifas promedio del transporte de carga por carretera en Colombia están alrededor de **0.20–0.21 USD por ton-km** (≈ **770 COP/ton-km** usando una tasa de 3,750 COP/USD).

Esto significa que, incluso en el escenario más optimista, el transporte de carga con UAV seguiría siendo aproximadamente **2 a 3 veces más costoso** que mover mercancía por carretera. Aun así, en el contexto colombiano este "sobrecosto" podría tener sentido, especialmente en zonas donde las necesidades de las comunidades remotas y los objetivos del Estado se alinean. La logística con UAV podría mejorar de forma drástica el acceso a territorios históricamente abandonados, reducir la dependencia de vías precarias y fortalecer la presencia del Estado en regiones aisladas o afectadas por la violencia.


