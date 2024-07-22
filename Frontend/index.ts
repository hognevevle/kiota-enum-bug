import { AnonymousAuthenticationProvider } from "@microsoft/kiota-abstractions";
import {
  FetchRequestAdapter,
  KiotaClientFactory,
} from "@microsoft/kiota-http-fetchlibrary";
import { createApiClient } from "./sdk/apiClient";

const authProvider = new AnonymousAuthenticationProvider();
// Create request adapter using the fetch-based implementation
const adapter = new FetchRequestAdapter(
  authProvider,
  undefined,
  undefined,
  KiotaClientFactory.create((request, init) => {
    return new Promise(async (resolve, reject) => {
      const temp = await fetch(request, init);
      console.log("Raw API response:", await temp.clone().json());
      return resolve(temp);
    });
  })
);

adapter.baseUrl = `http://localhost:5123`;

const client = createApiClient(adapter);

client.weatherforecast
  .get({
    queryParameters: {
      x: "Old",
    },
  })
  .then((res) => {
    console.log("Kiota deserialized API-response with x=Old:", res);
  });

client.weatherforecast
  .get({
    queryParameters: {
      x: "New",
    },
  })
  .then((res) => {
    console.log("Kiota deserialized API-response with x=New:", res);
  });
