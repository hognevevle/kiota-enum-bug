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
    // if (!window.fetch) {
    //   throw new Error("fetch is not available");
    // }

    return fetch(request, init);
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
    console.log("Response from API:", res);
  });
