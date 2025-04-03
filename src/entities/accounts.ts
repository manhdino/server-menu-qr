import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
@Entity({ name: 'accounts', schema: 'public' })
export default class AccountsEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string

  @Column({ type: 'varchar', length: 50, default: 'Employee' })
  role: string

  @Column({ type: 'int', nullable: true })
  ownerId: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
