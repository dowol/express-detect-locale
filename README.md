# EXPRESS-DETECT-LOCALE

**NOTE**: **THIS PROJECT** IS NOT OFFICIALLY RELEASED YET.

**express-detect-locale** is a middleware of 
Express.js that provides locale and localisation 
infos for clients automatically.

## HOW TO USE
### Using JavaScript(ES5 or previous)

```javascript
const express = require('express');
const DetectLocale = require('express-detect-locale');

const app = express();
/* ... */
app.use(DetectLocale());
/* ... */
app.listen(3000);
```

### Using TypeScript or JavaScript(ES6 or later)

```typescript
import * as express from 'express';
import DetectLocale from 'express-detect-locale';

const app = express();
/* ... */
app.use(DetectLocale());
/* ... */
app.listen(3000);
```

## INSTALLATION
### Using npm
```shell
npm install express-detect-locale --save
```

### Using yarn
```shell
yarn add express-detect-locale
```

## LICENSES
**express-detect-locale** is distributing under the **MIT License**.

