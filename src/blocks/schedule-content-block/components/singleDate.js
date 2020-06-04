import { PanelBody, DateTimePicker, RadioControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const SingleDate = ({ hiddenStart, setAttributes, date }) => {
  const radioValue = hiddenStart ? "startAsHidden" : "startAsVisible";
  const onChangeRatio = status => {
    setAttributes({ hiddenStart: status === "startAsHidden" });
  };
  const onChangeDate = dateSelected => {
    const timestamp = new Date(dateSelected).getTime();
    setAttributes({ date: timestamp });
  };
  return (
    <>
      <PanelBody>
        <DateTimePicker currentDate={date} onChange={onChangeDate} />
      </PanelBody>
      <PanelBody>
        <RadioControl
          selected={radioValue}
          options={[
            {
              label: __("Start as visible", "schedule-content-block"),
              value: "startAsVisible"
            },
            {
              label: __("Start as hidden", "schedule-content-block"),
              value: "startAsHidden"
            }
          ]}
          onChange={onChangeRatio}
        />
      </PanelBody>
    </>
  );
};

export default SingleDate;
