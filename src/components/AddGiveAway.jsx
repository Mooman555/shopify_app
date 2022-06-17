import React, { useState, useCallback } from "react";
import {
  Card,
  Page,
  Layout,
  FormLayout,
  TextField,
  TextStyle,
  Stack,
  Select,
  Button,
  Heading,
  Checkbox,
  InlineError,
} from "@shopify/polaris";
import moment from "moment";
import DatePicker from "react-datepicker";
import TimezoneSelect from "react-timezone-select";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";

import { getSessionToken } from "@shopify/app-bridge-utils";

export const AddGiveAway = () => {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const [{ month, year }, setDate] = useState({ month: 1, year: 2018 });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date("Wed Feb 07 2018 00:00:00 GMT-0500 (EST)"),
    end: new Date("Wed Feb 07 2018 00:00:00 GMT-0500 (EST)"),
  });

  const [longName, setLongName] = useState("");
  const [shortName, setShortName] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [timerBonusEntries, setTimerBonusEntries] = useState("");

  const [accountBonusEntries, setAccountBonusEntries] = useState("");
  const [friendBonusEntries, setFriendBonusEntries] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [selected, setSelected] = useState("single");
  const [multiplierSelected, setMultiplierSelect] = useState("1x");
  const [timeToObtainBonus, setTimeToObtainBonus] = useState("");
  const [checked, setChecked] = useState(false);
  const [referFriendchecked, setRefereFriendChecked] = useState(false);

  const [referFriendLink, setReferFriendLink] = useState(false);

  const [validations, setValidations] = useState({
    valid_from_date: true,
    valid_to_date: true,
    name: true,
    code: true,
    valid_from_time: true,
    valid_to_time: true,
  });

  const options = [
    { label: "Single", value: "single" },
    { label: "Dual", value: "dual" },
    { label: "Triple", value: "triple" },
  ];

  const MultiplierOptions = [
    { label: "1x", value: "1" },
    { label: "5x", value: "5" },
    { label: "10x", value: "10" },
  ];

  const obtainBonusOptions = [
    { label: "10 Minutes", value: "10" },
    { label: "30 Minutes", value: "30" },
    { label: "45 Minutes", value: "45" },
  ];

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const handleMultiplierSelectChange = useCallback(
    (value) => setMultiplierSelect(value),
    []
  );

  const handleSetTimeToObtainBonus = useCallback(
    (value) => setTimeToObtainBonus(value),
    []
  );

  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  const handleFriendRefereChange = useCallback(
    (newChecked) => setRefereFriendChecked(newChecked),
    []
  );

  const submitGiveAway = async () => {
    console.log(startTime, "startTime");
    console.log(endTime, "endTime");

    let _data = {
      valid_from_date: startDate && moment(startDate).format("YYYY-MM-DD"),
      valid_to_date: endDate && moment(endDate).format("YYYY-MM-DD"),
      name: longName,
      code: shortName,
      valid_from_time: startTime && moment(startTime).format("HH:mm"),
      valid_to_time: endTime && moment(endTime).format("HH:mm"),
    };

    let isValidate = _data && validateData(_data);

    console.log(isValidate, "isValidate");

    isValidate.length === 0 &&
      fetch("https://l1.gotomy.dev/shopify/api/v1/public/giveaways", {
        method: "POST",
        body: JSON.stringify(_data),
        // mode:"no-cors",
        headers: {
          "Content-type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
        },
      })
        .then((response) => {
          redirect.dispatch(Redirect.Action.APP, "/giveawaylist");
        })
        .catch((err) => console.log(err));
    // try {
    //     // console.log(process.env.SHOPIFY_APP_BASE_URL,"process.env.REACT_APP_BASE_URL");
    //     //    const token = await getSessionToken(app);
    //        const res = await fetch(`https://l1.gotomy.dev/shopify/api/v1/public/giveaways`)
    //     //    , {
    //     //     headers: { Authorization: `Bearer ${token}` },
    //     //   })
    //       const responseData = await res.json();
    //       console.log(responseData,"responseData");
    //     //   redirect.dispatch(Redirect.Action.APP, '/giveawaylist')

    // } catch (error) {
    //     console.log(error,"error");
    // }
  };

  const validateData = (data) => {
    let array = [];
    let _validations = validations;

    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        array.push(key);
        _validations[key] = false;
      }
    });
    setValidations({ ...validations, validations: _validations });
    return array;
  };

  return (
    <Page
      primaryAction={{ content: "Save", onAction: () => submitGiveAway() }}
      divider
      fullWidth
    >
      <Layout>
        <Layout.AnnotatedSection
          title="Contest Name"
          description="Shopify and your customers will use this information to contact you."
        >
          <FormLayout>
            <Card sectioned>
              <TextStyle variation="strong">Long name</TextStyle>
              <TextField
                error={validations.name === false && "This field required"}
                value={longName}
                onChange={(value) => {
                  setLongName(value);
                  setValidations({ ...validations, name: true });
                }}
                placeholder="DCG #55 - Widebody Supra + $40,000"
                autoComplete="off"
              />

              <br />
              <TextStyle variation="strong">Short Name</TextStyle>
              <TextField
                error={validations.code === false && "This field required"}
                value={shortName}
                id="shortName"
                type="text"
                placeholder="55"
                onChange={(value) => {
                  setShortName(value);
                  setValidations({ ...validations, code: true });
                }}
                autoComplete="off"
              />
            </Card>
          </FormLayout>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
          title="Date Information "
          description="This address will appear on your invoices."
        >
          <FormLayout>
            <Card sectioned>
              <Stack>
                <Stack vertical={true}>
                  <TextStyle variation="strong">Start Date</TextStyle>
                  <div className="datepicker">
                    <DatePicker
                      id="startDate"
                      required
                      className="icons8-time"
                      placeholderText="Select start date"
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        setValidations({
                          ...validations,
                          valid_from_date: true,
                        });
                      }}
                    />
                    {!validations.valid_from_date && (
                      <InlineError
                        message="This field name is required"
                        fieldID="startDate"
                      />
                    )}
                  </div>
                </Stack>

                <Stack vertical={true}>
                  <TextStyle variation="strong">Start Time</TextStyle>
                  <div className="timerpicker">
                    <DatePicker
                      id="startTime"
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      className={!startDate && "disbaled"}
                      disabled={!startDate ? true : false}
                      dateFormat="h:mm"
                      placeholderText="Select start time"
                      selected={startTime}
                      onChange={(date) => {
                        setStartTime(date);
                        setValidations({
                          ...validations,
                          valid_from_time: true,
                        });
                      }}
                    />
                  </div>
                  {!validations.valid_from_time && (
                    <InlineError
                      message="This field name is required"
                      fieldID="startTime"
                    />
                  )}
                </Stack>
              </Stack>
              <br />
              <Stack>
                <Stack vertical={true}>
                  <TextStyle variation="strong">End Date</TextStyle>
                  <div className="datepicker">
                    <DatePicker
                      id="endDate"
                      required
                      placeholderText="Select end date"
                      selected={endDate}
                      onChange={(date) => {
                        setEndDate(date);
                        setValidations({ ...validations, valid_to_date: true });
                      }}
                    />
                    {!validations.valid_to_date && (
                      <InlineError
                        message="This field name is required"
                        fieldID="endDate"
                      />
                    )}
                  </div>
                </Stack>

                <Stack vertical={true}>
                  <TextStyle variation="strong">End Time</TextStyle>
                  <div className="timerpicker">
                    <DatePicker
                      id="endTime"
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      className={!startDate && "disbaled"}
                      timeCaption="Time"
                      disabled={!endDate ? true : false}
                      dateFormat="h:mm"
                      placeholderText="Select end time"
                      selected={endTime}
                      onChange={(date) => {
                        setEndTime(date);
                        setValidations({ ...validations, valid_to_time: true });
                      }}
                    />
                  </div>
                  {!validations.valid_to_time && (
                    <InlineError
                      message="This field name is required"
                      fieldID="endTime"
                    />
                  )}
                </Stack>
              </Stack>
              <br />
              <Stack>
                <Stack.Item fill>
                  <TextStyle variation="strong">Time Zone</TextStyle>
                  <TimezoneSelect
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}
                  />
                </Stack.Item>
              </Stack>
            </Card>
          </FormLayout>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
          title="Entry Information"
          description="Shopify and your customers will use this information to contact you."
        >
          <FormLayout>
            <Card sectioned>
              <TextStyle variation="strong">Entry Type</TextStyle>
              <Select
                options={options}
                onChange={handleSelectChange}
                value={selected}
              />
              <br />

              <TextStyle variation="strong">Entry Multiplier</TextStyle>
              <Select
                options={MultiplierOptions}
                onChange={handleMultiplierSelectChange}
                value={multiplierSelected}
              />
              <br />

              <TextStyle variation="strong">Order Message</TextStyle>
              <TextField
                value={orderMessage}
                type="text"
                placeholder="(Widebody Supra + $40,000 Cash)"
                onChange={(value) => setOrderMessage(value)}
                autoComplete="off"
              />
              <br />
              <Stack>
                <Stack.Item fill>
                  <Heading></Heading>
                </Stack.Item>
                <Stack.Item>
                  <Button primary={true}>Add Schedule Bonus Period</Button>
                </Stack.Item>
              </Stack>
            </Card>
          </FormLayout>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
          title="Time Bonus Entry Information"
          description="Shopify and your customers will use this information to contact you."
        >
          <FormLayout>
            <Card sectioned>
              <TextStyle variation="strong">
                Countdown Time To Obtain Bonus Entries
              </TextStyle>
              <Select
                placeholder="8 Minutes"
                options={obtainBonusOptions}
                onChange={handleSetTimeToObtainBonus}
                value={timeToObtainBonus}
              />
              <br />

              <TextStyle variation="strong">Timer Bonus Entries</TextStyle>
              <TextField
                min={0}
                type="number"
                value={timerBonusEntries}
                placeholder="50"
                onChange={(values) => setTimerBonusEntries(values)}
                autoComplete="off"
              />
              <br />
            </Card>
          </FormLayout>
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
          title="Special Bonus Entry Information"
          description="Shopify and your customers will use this information to contact you."
        >
          <FormLayout>
            <Card sectioned>
              <Stack>
                <Stack.Item fill>
                  <Stack vertical={true}>
                    <TextStyle variation="strong">
                      Create an Account Bonus Entries
                    </TextStyle>
                    <TextField
                      min={0}
                      value={accountBonusEntries}
                      type="number"
                      placeholder="50"
                      onChange={(value) => setAccountBonusEntries(value)}
                      autoComplete="off"
                    />
                    <br />
                  </Stack>
                </Stack.Item>
                <Stack vertical={true}>
                  <TextStyle variation="strong">Enable</TextStyle>
                  <Checkbox checked={checked} onChange={handleChange} />
                </Stack>
              </Stack>

              <Stack>
                <Stack.Item fill>
                  <Stack vertical={true}>
                    <TextStyle variation="strong">
                      Refer A Friend Bonus Entries
                    </TextStyle>
                    <TextField
                      min={0}
                      value={friendBonusEntries}
                      type="number"
                      placeholder="50"
                      onChange={(value) => setFriendBonusEntries(value)}
                      autoComplete="off"
                    />
                    <br />
                  </Stack>
                </Stack.Item>
                <Stack vertical={true}>
                  <TextStyle variation="strong">Enable</TextStyle>
                  <Checkbox
                    checked={referFriendchecked}
                    onChange={handleFriendRefereChange}
                  />
                </Stack>
              </Stack>
              <TextStyle variation="strong">Refer A Friend link</TextStyle>
              <TextField
                value={referFriendLink}
                type="text"
                placeholder="{store_url|/pages/refer?AABB-CCDD-EEFF-GGHH"
                onChange={(value) => setReferFriendLink(value)}
                autoComplete="off"
              />
              <br />
            </Card>
          </FormLayout>
        </Layout.AnnotatedSection>
      </Layout>
      <br />
      <br />

      <Stack>
        <Stack.Item fill>
          <Heading></Heading>
        </Stack.Item>
        <Stack.Item>
          <Button onClick={() => submitGiveAway()} primary={true}>
            Save
          </Button>
        </Stack.Item>
      </Stack>
      <br />
      <br />
    </Page>
  );
};
