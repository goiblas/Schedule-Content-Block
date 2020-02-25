import { InspectorControls } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { PanelBody,  DateTimePicker,  RadioControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default class Inspector extends Component {
    render() {
        const { attributes, setAttributes } = this.props;
        const { date, hiddenStart } = attributes;

        const radioValue = hiddenStart ? 'startAsHidden' : 'startAsVisible';
        const onChangeRatio = ( status ) => {
            setAttributes({ hiddenStart: status === 'startAsHidden' })
        }
        const onChangeDate = (dateSelected) => {
            const timestamp =  new Date(dateSelected).getTime()
            setAttributes({date: timestamp});
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