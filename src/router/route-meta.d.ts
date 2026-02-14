import 'vue-router';
import type { SectionTab } from 'src/types/sectionTab';

declare module 'vue-router' {
  interface RouteMeta {
    sectionTabs?: SectionTab[];
  }
}
