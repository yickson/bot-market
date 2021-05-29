### Disclaimer

Antes de comenzar recuerda que este es un programa realizado con fines autodidactas sobre
el mundo de la inversión y el trading con criptomonedas, por lo tanto no es un consejo financiero
a seguir y todos los riesgos y consideraciones a tomar en cuenta son asumidas de quien use dicho
algoritmo.

### BOT of trading in NodeJS

Es un bot simple que hace operaciones de trading automático en el exchange de CryptoMkt
usando por debajo la API Client directamente de CryptoMKT para poder conectar con todos los
servicios correspondientes.

### TradingView

Lamentablemente no tenemos acceso a realizar TA mediante TradingView ya que no tenemos existencia 
de la API correspondiente para realizar dicha operación.

### ¿Cómo funciona?

El bot va haciendo análisis de la variación de precios cada cierto tiempo para comparar si existe 
entrada de compra inmediata, para luego proceder a realizar la venta correspondiente con un margen
de porcentaje para generar la ganancia en base a la operación.

Debes configurar tu API en CryptoMKT para poder realizar la conexión correspondiente, también debes
generar un bot en Telegram para que te lleguen las notificaciones.

Para correr solo el módulo de operaciones de trading:
```
node src/trading/operation.js
```
Para correr el funcionamiento en modo API para conectar y consumir las rutas en el puerto *3001*
```
node src/index.js
```

### Stack tecnológico
* NodeJs
* SQLite
* Express

### Base de datos

El bot cuenta con una base de datos compuesta de 2 tablas, en la cual una se maneja los mercados en
este caso las variantes de ETH, XLM, EOS, la otra tabla maneja todas las ordenes que tenemos abiertas
en cryptomkt en donde se dispara una lógica en caso de cerrarse alguna orden correspondiente.

#### Tabla Markets

| Campo | Tipo | Comentario |
|-------|:-----|-----------:|
| name  | varchar  | nombre del mercado, ej. ETHCLP |
| value | integer  | valor promedio entre el ask y bid |
| ask  | float  | valor del precio de venta |
| bid  | float  | valor del precio de compra |
| d1 | float | porcentaje de cambio en 24 horas |
| d7 | float | porcentaje de cambio en 7 días |

#### Tabla Trades (En construcción)

| Campo | Tipo | Comentario |
|-------|:-----|-----------:|
| name  | varchar  | nombre del mercado, ej. ETHCLP |

### Configuración del bot

Las variables de entorno deben ser configurada en un archivo ".env" te puedes basar en el ".env.example"
en donde tienes que ir reemplazando cada una de las variables con los valores correspondiente para que te
funcione el bot sin problema.

### Telegram

El bot cuenta con Telegram para ir notificando al usuario cuando realice ordenes de compra y venta en el
exchange.

### Te gusta el BOT

Puedes brindarme una chela en esta wallet:

* XLM WALLET: *GDMXNQBJMS3FYI4PFSYCCB4XODQMNMTKPQ5HIKOUWBOWJ2P3CF6WASBE*
* MEMO: *164647*

La idea es seguir mejorando este bot para que trabaje mucho mejor en el futuro cercano.