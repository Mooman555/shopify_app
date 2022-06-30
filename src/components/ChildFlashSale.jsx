import React, { useState } from "react";
import {
  Card,
  FormLayout,
  TextField,
  TextStyle,
  Stack,
  DatePicker,
} from "@shopify/polaris";

const ChildFlashSale = ({ formValues, changeHandler }) => {
  const [{ month, year }, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  //   const [selectedDates, setSelectedDates] = useState({
  //     start: new Date(),
  //     end: new Date(date.getTime() + 86400000),
  //   });

  const handleMonthChange = (month, year) => {
    console.log(month, year, "month,year");
    setDate({ month, year });
  };
  console.log(formValues, "formValues");

  let handleChangeFields = (i, target) => {
    console.log(target, "target");
    changeHandler(i, target);
  };

  return (
    <>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <FormLayout>
            <Card sectioned>
              <TextStyle variation="strong">Long name</TextStyle>
              <TextField
                //  error={validations.name === false && "This field required"}
                value={element.childLongName}
                name="childLongName"
                //  onChange={(value) => {
                //    setLongName(value);
                //   //  setValidations({ ...validations, name: true });
                //  }}
                onChange={(e) => handleChangeFields(index, e.target)}
                placeholder="DCG #55 - Widebody Supra + $40,000"
                autoComplete="off"
              />

              <br />
              <TextStyle variation="strong">Short Name</TextStyle>
              <TextField
                //  error={validations.code === false && "This field required"}
                name="childShortName"
                value={element.childShortName}
                onChange={(e) => handleChangeFields(index, e.target)}
                //  id="shortName"
                type="text"
                placeholder="DCGCG"
                //  onChange={(value) => {
                //    setShortName(value);
                //   //  setValidations({ ...validations, code: true });
                //  }}
                autoComplete="off"
              />
            </Card>
          </FormLayout>

          <FormLayout>
            <br />
            <Card sectioned>
              <Stack>
                <Stack vertical={true}>
                  <TextStyle variation="strong">Select Date</TextStyle>
                  <div className="datepicker">
                    <DatePicker
                      month={month}
                      year={year}
                      onChange={(e) => handleChangeFields(index, e.target)}
                      // onChange={(data) => {
                      //   setDates(data);
                      // }}
                      onMonthChange={handleMonthChange}
                      //   selected={selectedDates}
                      multiMonth
                      allowRange
                    />

                    {/* {!validations.valid_from_date && (
                <InlineError
                  message="This field name is required"
                  fieldID="startDate"
                />
              )} */}
                  </div>
                </Stack>
              </Stack>
              <div className="time-wrapper">
                <Stack vertical={true}>
                  <TextStyle variation="strong">Select Start Time</TextStyle>
                  {/* <div className="timerpicker"> */}
                  {/* <TimePicker onChange={onChange} value={value} /> */}
                  <input
                    type="time"
                    name="childStartTime"
                    value={element.childStartTime}
                    // onChange={(e) => setStartTime(e.target.value)}
                    onChange={(e) => handleChangeFields(index, e.target)}
                    id="childStartTime"
                  />
                  {/* </div> */}
                  {/* {!validations.valid_from_time && (
              <InlineError
                message="This field name is required"
                fieldID="startTime"
              />
            )} */}
                </Stack>

                <Stack vertical={true}>
                  <TextStyle variation="strong">Select End Time</TextStyle>
                  <div>
                    <input
                      type="time"
                      name="childEndTime"
                      value={element.childEndTime}
                      // onChange={(e) => setEndTime(e.target.value)}
                      onChange={(e) => handleChangeFields(index, e.target)}
                      id="childEndTime"
                    />
                  </div>

                  {/* </div> */}
                  {/* {!validations.valid_from_time && (
              <InlineError
                message="This field name is required"
                fieldID="startTime"
              />
            )} */}
                </Stack>
              </div>
              <br />
              <br />
            </Card>
          </FormLayout>
          <br />
          <br />
        </div>
      ))}
    </>
  );
};

export default ChildFlashSale;
