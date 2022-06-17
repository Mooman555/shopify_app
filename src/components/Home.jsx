import React from "react";
import {
  Card,
  Page,
  Layout,
  TextContainer,
  Navigation,
  Stack,
  Link,
  Frame,
} from "@shopify/polaris";

export const Home = () => {
  return (
    <Page
      // breadcrumbs={[{content: 'Products', url: '/products'}]}

      fullWidth
    >
      <Layout>
        <Layout.Section>Hello</Layout.Section>
      </Layout>
    </Page>
  );
};

export default Home;
