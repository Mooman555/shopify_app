import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  Provider as AppBridgeProvider,
  useAppBridge,
} from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import { Children, useState } from "react";
// import ClientRouter from "./components/ClientRouter";
// import { BrowserRouter } from "react-router-dom";
import Link from "./Link";
import Routes from "./Routes";
import { AddGiveAway } from "./components/AddGiveAway";
import { GiveAwayList } from "./components/GiveAwayList";

export default function App(props) {
  const [selection, setSelection] = useState([]);
  const { Component, pageProps, history } = props;

  const [toggleComponenent, setToggleComponenent] = useState(false);

  const setToggle = () => {
    setToggleComponenent((prev) => (prev = !prev));
  };

  return (
    // <BrowserRouter>
    <PolarisProvider i18n={translations}>
      <AppBridgeProvider
        config={{
          apiKey: process.env.SHOPIFY_API_KEY,
          host: new URL(location).searchParams.get("host"),
          forceRedirect: true,
        }}
      >
        <MyProvider>
          {/* <p>Hello</p> */}
          {/* <HomePage /> */}
          {/* <Routes /> */}
          {toggleComponenent === false ? (
            <AddGiveAway setToggle={setToggle} />
          ) : (
            <GiveAwayList setToggle={setToggle} />
          )}
        </MyProvider>
      </AppBridgeProvider>
    </PolarisProvider>
    // {/* </BrowserRouter> */}
  );
}

function MyProvider(props) {
  const app = useAppBridge();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      credentials: "include",
      fetch: userLoggedInFetch(app),
    }),
  });
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

export function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}
