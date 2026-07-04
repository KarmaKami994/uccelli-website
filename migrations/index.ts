import * as migration_20260704_055801_initial from './20260704_055801_initial';

export const migrations = [
  {
    up: migration_20260704_055801_initial.up,
    down: migration_20260704_055801_initial.down,
    name: '20260704_055801_initial'
  },
];
