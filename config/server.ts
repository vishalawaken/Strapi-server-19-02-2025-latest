interface Env {
  (key: string, defaultValue?: any): string | number | boolean;
  int(key: string, defaultValue?: number): number;
  bool(key: string, defaultValue?: boolean): boolean;
  array(key: string, defaultValue?: any[]): any[];
}

export default ({ env }: { env: Env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
