import PropTypes                 from 'prop-types';
import React                     from 'react';
import Button                    from '../button.jsx';
import { IconMinus, IconPlus }   from '../../../../Assets/Common';

const IncrementButtons = ({
    decrementValue,
    incrementValue,
    max_is_disabled,
    min_is_disabled,
}) => (
    <React.Fragment>
        <Button
            className={'input-wrapper__button input-wrapper__button--increment'}
            is_disabled={max_is_disabled}
            onClick={incrementValue}
            tabIndex='-1'
        >
            <IconPlus className={'input-wrapper__icon input-wrapper__icon--plus' } is_disabled={max_is_disabled} />
        </Button>
        <Button
            className={'input-wrapper__button input-wrapper__button--decrement'}
            is_disabled={min_is_disabled}
            onClick={decrementValue}
            tabIndex='-1'
        >
            <IconMinus className={'input-wrapper__icon input-wrapper__icon--minus'} is_disabled={min_is_disabled} />
        </Button>
    </React.Fragment>
);

IncrementButtons.propTypes = {
    decrementValue : PropTypes.func,
    incrementValue : PropTypes.func,
    max_is_disabled: PropTypes.bool,
    min_is_disabled: PropTypes.bool,
};

export default IncrementButtons;
