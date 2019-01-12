const { __ } = wp.i18n;
const { Component } = wp.element;
const {
    InspectorControls
  } = wp.editor;

  const {
    PanelBody,
    DateTimePicker,
  } = wp.components;


export default class Inspector extends Component {

    render() {
        const { attributes, setAttributes } = this.props;
        const { date } = attributes;

   
        return (
            <InspectorControls>
                <PanelBody>
                 <DateTimePicker
                    currentDate={ date }
                    onChange={ ( date ) => {
                        setAttributes({date})
                    } }
                />
                </PanelBody>
        
            </InspectorControls>
        );
    }
}