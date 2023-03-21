import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    create(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    findAll() {
        return this.userRepository.find();
    }

    findById(id: number) {
        if (!id) {
            return null;
        }
        return this.userRepository.findOneByOrFail({id});
    }

    findByEmail(email: string) {
        return this.userRepository.findOne({ where: { email: email } });
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException(`User not found.`)
        }
        Object.assign(user, attrs);
        return this.userRepository.save(user);
    }

    async remove(id: number) {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException(`User not found.`)
        }

        return this.userRepository.remove(user);
    }

}
