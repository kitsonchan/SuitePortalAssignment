import { BadRequestException, Body, Controller, Post, Get, Param, Put, UseGuards, HttpException } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from './maintenance-request.service';
import { AuthGuard } from '../auth.guard';

@Controller('maintenance-requests')
export class MaintenanceRequestController {

  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {
    //
  }

  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: MaintenanceRequest,
  ) {
    if (!maintenanceRequest?.summary) {
      throw new BadRequestException('Must provide a valid summary');
    }
    if (!maintenanceRequest?.serviceType) {
      throw new BadRequestException('Must provide a valid Service Type');
    }
    return await this.maintenanceRequestService.createMaintenanceRequest(maintenanceRequest);
  }

  @Get('/:id')
  public async getMaintenanceRequest(
    @Param('id') id: string,
  ) {
    try {
      // if (!id) {
      //   throw new BadRequestException('No id provided');
      // }

      const response = await this.maintenanceRequestService.getMaintenanceRequest(id);
      return response
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, 404);
    }
  }

  ///Protecting the routes only authorized user (admin) can access with auth guards

  @Get('/')
  @UseGuards(AuthGuard)
  public async getAllOpenMaintenanceRequest() {
    return await this.maintenanceRequestService.getAllOpenMaintenanceRequest();
  }

  @Put('/:id/close')
  @UseGuards(AuthGuard)
  public async closeMaintenanceRequest(
    @Param('id') id: string
  ) {
    try {
      const response = await this.maintenanceRequestService.closeMaintenanceRequest(id);
      return response
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }
}
