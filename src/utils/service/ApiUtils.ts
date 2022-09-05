import service from "./Service";
import { HttpgetProps } from "./types";

type EndpointType = string;

interface HttpParams {
  [key: string]: string;
}

// const httpget = ({ endpoint, params }: HttpgetProps<P>) => {
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

function httpget<P>({ endpoint, params }: HttpgetProps<P>) {
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
}

// const test = (params: string) => {
//   httpget({ endpoint: "test", params });
// };

const httppost = (endpoint: EndpointType, params: HttpParams) => {
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

export { httpget, httppost };
