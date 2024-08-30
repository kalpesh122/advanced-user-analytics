import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IEvent } from '../../interfaces/event.interface';

@Table({
  tableName: 'track_event',
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      name: 'idx_user_event_timestamp',
      fields: ['user_id', 'event_type', 'timestamp'],
      using: 'BTREE'  
    },
    {
      name: 'idx_event_type_timestamp',
      fields: ['event_type', 'timestamp'],
      using: 'BTREE'
    },
    {
      name: 'idx_user_id',
      fields: ['user_id'],
      using: 'BTREE'
    },
    {
      name: 'idx_timestamp',
      fields: ['timestamp'],
      using: 'BTREE'
    }
  ]

})
export class Event extends Model<IEvent> implements IEvent {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.ENUM('page_view', 'button_click'),
    allowNull: false,
  })
  event_type!: 'page_view' | 'button_click';

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  page_url!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  button_name!: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  timestamp!: Date;
}
