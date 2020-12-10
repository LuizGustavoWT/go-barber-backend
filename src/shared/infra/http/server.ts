import 'reflect-metadata';
import app from './app';
import '@shared/infra/typeorm/index';
import '@shared/container';

app.listen(3333, () => {
  console.log('Iniciado');
});
