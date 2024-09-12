import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GroupMenuManagerService } from 'src/manager/group-menu/group-menu-manager.service';

@ApiTags('Group Menu Mangement')
@Controller()
export class GroupMenuApiController {
    // constructor(private readonly groupMenuManagerService: GroupMenuManagerService) {}
}
