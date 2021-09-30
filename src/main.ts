import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  let port = process.env.PORT || 3000
  console.log("App listening on port: ", port)
  await app.listen(port);
}
bootstrap();
