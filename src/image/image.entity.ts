import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string;    // 이미 URL주소에 유효성검사는 URL객체를 통해서 다 끝나고 string으로 변형된 상태

    @Column()
    key: number;
}