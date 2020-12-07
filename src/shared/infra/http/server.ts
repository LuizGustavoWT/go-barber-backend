import 'reflect-metadata';
import app from './app';

import '@shared/infra/typeorm';

app.listen(3333, () => {
  console.log('Iniciado');
});
