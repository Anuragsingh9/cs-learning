import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { CatsDuplicateModule } from './cats_duplicate/cats_duplicate.module';

@Module({
  imports: [CatsModule, CatsDuplicateModule],
  // controllers: [AppController, CatsController],
  // providers: [AppService, CatsService],
})
export class AppModule {}
