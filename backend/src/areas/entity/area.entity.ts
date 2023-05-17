import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Area {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    nombre: string

    @Column()
    email: string

    @Column()
    telefono: string
}
