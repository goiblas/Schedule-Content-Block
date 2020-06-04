import { useEffect, useState } from "@wordpress/element";
import {
  PanelBody,
  DateTimePicker,
  SelectControl,
  Button
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { formatDate } from "./../utils/date";

const PanelDate = ({
  isHidden,
  currentDate,
  onChangeDate,
  onChangeHidden,
  isInvalidDate,
  deletePanel
}) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const visibilityText = isHidden
      ? __("Hidden", "schedule-content-block")
      : __("Visible", "schedule-content-block");

    const titleDate = formatDate(currentDate);

    setTitle(`${visibilityText} - ${titleDate}`);
  }, [currentDate, isHidden]);

  const handleVisibility = state => onChangeHidden(state === "hidden");

  return (
    <PanelBody title={title} initialOpen={true}>
      <Button isDestructive isLink onClick={deletePanel}>
        {__("Delete", "schedule-content-block")}
      </Button>
      <hr />
      <DateTimePicker
        isInvalidDate={isInvalidDate}
        currentDate={currentDate}
        onChange={onChangeDate}
      />
      <hr />
      <SelectControl
        label={__("Visibility", "schedule-content-block")}
        value={isHidden ? "hidden" : "visible"}
        onChange={handleVisibility}
        options={[
          { label: __("Visible", "schedule-content-block"), value: "visible" },
          { label: __("Hidden", "schedule-content-block"), value: "hidden" }
        ]}
      />
    </PanelBody>
  );
};

export default PanelDate;
