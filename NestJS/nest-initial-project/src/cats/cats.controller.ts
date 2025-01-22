import { Body, Controller, Get, HttpCode, Param, Post, Query, Redirect, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
@Controller('cats')
@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
export class CatsController {

    constructor(private catsService: CatsService) {

    }

    // @Get()
    // findAll(@Req() request:Request): string {
    // findAll(@Query('version') version): string {
    //     console.log('requestt get',version);
    //     return 'This action returns Cats'
    // }

    // @Post()
    // @HttpCode(201)
    // @Redirect('https://nestjs.com',301)
    // createOne(@Body() body): any{
    //     if(body.name == 'NestJS'){
    //         return { url: 'https://docs.nestjs.com/v5/' };
    //     }
    //     console.log('requestt',body);
    //     return 'This action return new Cat';
    // }

    @Post()
    createCat(@Body() createCatDto: CreateCatDto) {
        try {
            this.catsService.create(createCatDto);
            return 'Created new Cat';
        } catch (error) {
            return error;
        }
    }

    @Get()
    findAll() {
        return this.catsService.findAll();
    }


    @Get('/sell')
    @Roles(['admin'])
    withdrawPayment(@Req() request: Request): string {
        return 'Withdrawal succesfull';
    }

    @Get(':id')
    findOne(@Req() request: Request, @Param() params: any): string {
        console.log('request get :id', params.id)
        return 'This action returns one cat by :id';
    }
}
