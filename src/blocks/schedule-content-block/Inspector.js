const { __ } = wp.i18n;
const { Component } = wp.element;
const {
    InspectorControls
  } = wp.editor;

  const {
    PanelBody,
    DateTimePicker,
    RadioControl
  } = wp.components;


export default class Inspector extends Component {

    render() {
        const { attributes, setAttributes } = this.props;
        const { date, hiddenStart } = attributes;

        const radioValue = hiddenStart ? 'startAsHidden' : 'startAsVisible';
        const onChangeRatio = ( status ) => {
            setAttributes({ hiddenStart: status == 'startAsHidden' })
        }
        const onChangeDate = (date) => {
            setAttributes({date});
        }
        return (
            <InspectorControls>
                <PanelBody>
                 <DateTimePicker
                    currentDate={ date }
                    onChange={ onChangeDate }
                />
                </PanelBody>
                <PanelBody>
                <RadioControl
                    selected={ radioValue }
                    options={ [
                        { label: __('Start as visible', 'schedule-content-block'), value: 'startAsVisible' },
                        { label:  __('Start as hidden', 'schedule-content-block'), value: 'startAsHidden' },
                    ] }
                    onChange={ onChangeRatio } 
                />
                </PanelBody>
            </InspectorControls>
        );
    }
}