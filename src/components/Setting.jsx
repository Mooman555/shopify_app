import React, { useState } from "react";
import {
  Layout,
  Page,
  FormLayout,
  TextField,
  TextStyle,
  Card,
  Stack,
  Button,
} from "@shopify/polaris";
// import { AnnotatedSection } from '@shopify/polaris/build/ts/latest/src/components/Layout/components'
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
export const Setting = () => {
  const app = useAppBridge();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [comapnyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Page
      //   fullWidth
      breadcrumbs={[{ content: "Settings", url: "/settings", title: "Back" }]}
      divider
    >
      <Layout>
        <Layout.AnnotatedSection
          title="Account Information"
          description="Configure your account and security settings"
        >
          <FormLayout>
            <Card sectioned>
              <Stack>
                <Stack.Item>
                  <Stack vertical={true}>
                    <TextStyle variation="strong">First Name</TextStyle>
                    <TextField
                      value={firstName}
                      type="text"
                      onChange={(value) => setFirstName(value)}
                      placeholder=""
                      autoComplete="off"
                    />
                    <br />
                  </Stack>
                </Stack.Item>
                <Stack vertical={true}>
                  <TextStyle variation="strong">Last Name</TextStyle>
                  <TextField
                    value={lastName}
                    type="text"
                    placeholder=""
                    onChange={(value) => setLastName(value)}
                    autoComplete="off"
                  />
                </Stack>
              </Stack>

              <Stack>
                <Stack.Item>
                  <Stack vertical={true}>
                    <TextStyle variation="strong">Company Name</TextStyle>
                    <TextField
                      value={comapnyName}
                      type="text"
                      onChange={(value) => setCompanyName(value)}
                      placeholder=""
                      autoComplete="off"
                    />
                    <br />
                  </Stack>
                </Stack.Item>
                <Stack vertical={true}>
                  <TextStyle variation="strong">Email</TextStyle>
                  <TextField
                    value={email}
                    type="email"
                    placeholder=""
                    onChange={(value) => setEmail(value)}
                    autoComplete="off"
                  />
                </Stack>
              </Stack>
              <Button
                onClick={() => {
                  app.dispatch(
                    Redirect.toApp({
                      path: "/products",
                    })
                  );
                }}
              >
                Save Changes
              </Button>
            </Card>
          </FormLayout>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
};
