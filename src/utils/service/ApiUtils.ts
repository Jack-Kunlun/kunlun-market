import { AxiosResponse } from "axios";
import service from "./Service";
import { EndpointType } from "./types";

const httpget = <T, P = any>(endpoint: EndpointType, params: P): Promise<AxiosResponse<T>> => {
  return new Promise((resolve, reject) => {
    service
      .get(endpoint, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// const test = (params: string) => {
//   httpget<{ username: string; password: string }>("test", params).then((res) => {
//     console.log(res.data);
//   });
// };

// function httpget<P>({ endpoint, params }: HttpgetProps<P>) {
//   return new Promise((resolve, reject) => {
//     service
//       .get(endpoint, params)
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// const httppost = (endpoint: EndpointType, params: HttpParams) => {
//   return new Promise((resolve, reject) => {
//     service
//       .get(endpoint, params)
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

export { httpget };
