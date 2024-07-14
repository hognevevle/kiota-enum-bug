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
    console.log("Response from API with x=Old:", res);
  });

client.weatherforecast
  .get({
    queryParameters: {
      x: "New",
    },
  })
  .then((res) => {
    console.log("Response from API with x=New:", res);
  });
