import { InspectorControls } from "@wordpress/block-editor";
import { Component } from "@wordpress/element";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import MultiDate from "./components/multidate";
import SingleDate from "./components/singleDate";

export default class Inspector extends Component {
  render() {
    const { attributes, setAttributes } = this.props;
    const { date, hiddenStart, isMultiDate, dates } = attributes;
    const setDates = newDates => setAttributes({ dates: newDates });

    return (
      <InspectorControls>
        <PanelBody>
          <ToggleControl
            label={__("Enable multiple dates", "schedule-content-block")}
            checked={isMultiDate}
            onChange={() => setAttributes({ isMultiDate: !isMultiDate })}
          />
        </PanelBody>

        {isMultiDate ? (
          <MultiDate dates={dates} setDates={setDates} />
        ) : (
          <SingleDate
            date={date}
            setAttributes={setAttributes}
            hiddenStart={hiddenStart}
          />
        )}
      </InspectorControls>
    );
  }
}
