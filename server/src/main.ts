import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const customCorsOptions: CorsOptions = {
  //   origin: (origin, callback) => {
  //     // Check if the requested origin is allowed
  //     const allowedOrigins = [process.env.CORS_ALLOWED_ORIGIN];
 
  //     if (!origin || allowedOrigins.includes(origin)) {
  //       // Allow the request
  //       callback(null, true);
  //     } else {
  //       // Disallow the request
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   methods: ['GET', 'POST']
  // };
  // app.enableCors(customCorsOptions);
  app.enableCors({
    origin: [process.env.CORS_ALLOWED_ORIGIN],
    methods: 'GET,POST',
  });
  await app.listen(4000);
}
bootstrap();
