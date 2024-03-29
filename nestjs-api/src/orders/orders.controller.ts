/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request ) {
    return this.ordersService.create({
      ...createOrderDto,
      client_id: req['user'].sub,
    });
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.ordersService.findAll(req['user'].sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.ordersService.findOne(id, req['user'].sub);
  }
}
