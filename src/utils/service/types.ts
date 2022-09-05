type Endpoint = string;

export interface HttpgetProps<P> {
  endpoint: Endpoint;
  params: P;
}
