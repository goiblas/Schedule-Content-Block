const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { InnerBlocks } = wp.editor;

import classnames from 'classnames';

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
        },
        hiddenStart : {
            type: 'boolean',
            default: true
        }
    },
    edit: props => {
        const { className, attributes } = props;
        const { hiddenStart, date } = attributes;

        const blockTime = new Date(date).getTime();
        const now = new Date().getTime();
     
        let isHidden;
        if(hiddenStart) {
            isHidden = blockTime > now;
        } else {
            isHidden = blockTime < now;
        }

        
        return (
            <Fragment> 
                <Inspector {...props}/>
                <div className={classnames(className, {isHidden})}>
                 <InnerBlocks templateLock={ false } /></div>
            </Fragment>
        )
    },
    save: () => {
        return <InnerBlocks.Content />;
    }
});
