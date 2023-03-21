import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true // 이거 하는 이유는, incoming request에 우리가 예상하지 않는 properties가 들어오면 무시한다는 것. 예컨데 CreateUserDto에는 email, password밖에 없으므로 요청할떄 이거왜에 다른 프로퍼티 있으면 그건 무시한다는것.  
    })
  )
  await app.listen(3000);
}
bootstrap();
