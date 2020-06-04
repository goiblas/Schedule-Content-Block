import { PanelBody, Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import PanelDate from "./panelDate";
import { getTimestamp } from "./../utils/date";

const Multidate = ({ dates, setDates }) => {
  const addNewDate = () => {
    if (dates && dates.length >= 1) {
      const lastDate = dates[dates.length - 1];
      const oneHour = 3600 * 1000;
      setDates([
        ...dates,
        {
          timestamp: lastDate.timestamp + oneHour,
          hidden: !lastDate.hidden
        }
      ]);
    } else {
      setDates([
        {
          timestamp: getTimestamp(new Date()),
          hidden: true
        }
      ]);
    }
  };

  const modifyDate = (id, value) => {
    const newDates = dates.map((date, index) =>
      id === index ? { ...date, ...value } : date
    );
    setDates(newDates);
  };

  const isInvalidDate = (lastTimestamp, date) => {
    return lastTimestamp >= getTimestamp(date);
  };

  const deletePanel = id => {
    const newDates = dates.filter((_, index) => id !== index);
    setDates(newDates);
  };

  return (
    <>
      {dates &&
        dates.map(({ timestamp, hidden }, index) => (
          <PanelDate
            key={index}
            isHidden={hidden}
            currentDate={timestamp}
            onChangeHidden={newHidden =>
              modifyDate(index, { hidden: newHidden })
            }
            onChangeDate={date =>
              modifyDate(index, { timestamp: getTimestamp(date) })
            }
            deletePanel={() => deletePanel(index)}
            isInvalidDate={date =>
              index > 0 && isInvalidDate(dates[index - 1].timestamp, date)
            }
          />
        ))}
      <PanelBody>
        <Button isPrimary onClick={addNewDate}>
          {__("Add new date", "schedule-content-block")}
        </Button>
      </PanelBody>
    </>
  );
};

export default Multidate;
