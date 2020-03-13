import React, {PureComponent} from 'react';
import {injectIntl} from "react-intl";

interface IProps {
    color?: string,
    size?: string,
}

interface IState {
    filteredInfo: any,
    sortedInfo: any,
}


class FilterMessage extends PureComponent<IProps, IState> {


    handleCreateFilterGroup = ()=>{
        console.log('简单的 console 吧')
    }

    render() {
        const {
            // @ts-ignore
            intl: {formatMessage},
        } = this.props;
        return <div className="filter-editor-empty">
            {
                formatMessage({id: 'filter.emptyFilter'})
            }
            <span
                role="presentation"
                className="filter-editor-empty-add"
                onClick={this.handleCreateFilterGroup}
            >
                  {
                      formatMessage({id: 'filter.add.filterGroup'})
                  }
                </span>
            {
                formatMessage({id: 'filter.toAddFilter'})
            }
        </div>

    }
}

// @ts-ignore
export default injectIntl(FilterMessage);
;
