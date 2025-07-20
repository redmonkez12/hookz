export type TabId = "overview" | "results" | "awards";

export interface TabConfig {
  id: TabId;
  label: string;
  component: React.ComponentType<any>;
}
