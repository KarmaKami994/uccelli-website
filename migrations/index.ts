import * as migration_20260704_055801_initial from './20260704_055801_initial';
import * as migration_20260804_190000_community_items from './20260804_190000_community_items';
import * as migration_20260804_203000_contact_submissions from './20260804_203000_contact_submissions';
import * as migration_20260804_213000_enable_cv_creator from './20260804_213000_enable_cv_creator';
import * as migration_20260922_092500_payload_390_auth from './20260922_092500_payload_390_auth';
import * as migration_20260922_111500_r2_object_key from './20260922_111500_r2_object_key';
import * as migration_20260923_141500_page_settings from './20260923_141500_page_settings';

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
  {
    up: migration_20260804_203000_contact_submissions.up,
    down: migration_20260804_203000_contact_submissions.down,
    name: '20260804_203000_contact_submissions'
  },
  {
    up: migration_20260804_213000_enable_cv_creator.up,
    down: migration_20260804_213000_enable_cv_creator.down,
    name: '20260804_213000_enable_cv_creator'
  },
  {
    up: migration_20260922_092500_payload_390_auth.up,
    down: migration_20260922_092500_payload_390_auth.down,
    name: '20260922_092500_payload_390_auth'
  },
  {
    up: migration_20260922_111500_r2_object_key.up,
    down: migration_20260922_111500_r2_object_key.down,
    name: '20260922_111500_r2_object_key'
  },
  {
    up: migration_20260923_141500_page_settings.up,
    down: migration_20260923_141500_page_settings.down,
    name: '20260923_141500_page_settings'
  },
];
