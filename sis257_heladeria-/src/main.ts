import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   console.log('Base de datos:', process.env.DB_NAME);
 console.log('JWT Token:', process.env.JWT_TOKEN);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`App corriendo en ${await app.getUrl()}`)

 

}
bootstrap();

