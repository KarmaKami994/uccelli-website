import * as migration_20260704_055801_initial from './20260704_055801_initial';
import * as migration_20260804_190000_community_items from './20260804_190000_community_items';

export const migrations = [
  {
    up: migration_20260704_055801_initial.up,
    down: migration_20260704_055801_initial.down,
    name: '20260704_055801_initial'
  },
  {
    up: migration_20260804_190000_community_items.up,
    down: migration_20260804_190000_community_items.down,
    name: '20260804_190000_community_items'
  },
];
