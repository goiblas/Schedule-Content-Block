const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { InnerBlocks } = wp.editor;

import './editor.scss';

import icon from './icon';
import Inspector from './inspector';

export default registerBlockType(  'schedule-content-block/schedule-content-block', {
    title:__('Schedule Content Block', 'schedule-content-block'),
    category: 'formatting',
    keywords: [
        __( 'shedule', 'schedule-content-block' ),
        __( 'date', 'schedule-content-block' ),
        __( 'restrict', 'schedule-content-block' ),
    ],
    description: __('Add the date from which you want the content to be visible', 'schedule-content-block'),
    icon, 
    attributes: {
        date: {
            type: 'string',
            default: new Date()
        }
    },
    edit: props => {
        const { className } = props;
        return (
            <Fragment> 
                <Inspector {...props}/>
                <div className={className}>
                 <InnerBlocks templateLock={ false } /></div>
            </Fragment>
        )
    },
    save: () => {
        return <InnerBlocks.Content />;
    }
});
