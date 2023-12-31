import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    ParseIntPipe,
    UseGuards,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { UserDto } from './dto/user.dto';
  import { User } from './user.entity';
  
 
  
  @Controller('users')
  export class UserController {
    constructor(private readonly _userService: UserService) {}
  
   
    @Get(':id')
    async getUser(@Param() id : number)  {
      const users = await this._userService.get(id);
      return users;
    }

    @Get()
    async getUsers(): Promise<User[]> {
      const users = await this._userService.getAll();
      return users;
    }
  
    @Post()
    async createUser(@Body() user: User): Promise<User> {
      const createdUser = await this._userService.create(user);
      return createdUser;
    }
  
    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
      const updatedUser = await this._userService.update(id, user);
      return true;
    }
  
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
      await this._userService.delete(id);
      return true;
    }
  
    @Post('setRole/:userId/:roleId')
    async setRoleToUser(
      @Param('userId', ParseIntPipe) userId: number,
      @Param('roleId', ParseIntPipe) roleId: number,
    ) {
      return this._userService.setRoleToUser(userId, roleId);
    }
  }