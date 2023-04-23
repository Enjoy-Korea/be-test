import { Controller } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { Users } from './entity/users.entity';

@Controller('repositories')
export class RepositoriesController {
  constructor(private repositoriesService: RepositoriesService) {}
}
