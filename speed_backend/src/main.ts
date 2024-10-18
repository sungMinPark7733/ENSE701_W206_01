import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// run backend command "npm run start"
// run frontend command "npm run dev"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({ 
    origin: 'https://speed-gold.vercel.app', // Update with your frontend's URL
    credentials: true 
  });

  const port = process.env.PORT || 8082;
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}

bootstrap();