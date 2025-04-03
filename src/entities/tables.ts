import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'tables', schema: 'public' })
export default class TablesEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number

  @Column({ name: 'name', type: 'varchar', length: 256, nullable: true })
  name: string

  @Column({ type: 'int', nullable: false })
  capacity: number

  @Column({ type: 'int', nullable: false })
  number: number

  @Column({ type: 'varchar', length: 50, default: 'Available' })
  status: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  token: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
