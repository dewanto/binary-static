import classNames   from 'classnames';
import { observer } from 'mobx-react';
import PropTypes    from 'prop-types';
import React        from 'react';
import { localize } from '_common/localize';
import TickSteps    from './tick-steps.jsx';

const RangeSlider = ({
    className,
    ticks,
    max_value,
    min_value,
    name,
    value,
    onChange,
}) => {

    const handleChange = (e) => {
        if (e.target.value !== value) {
            onChange({ target: { name, value: e.target.value } });
        }
    };

    const handleClick = (e, index) => {
        if (index !== value) {
            onChange({ target: { name, value: index } });
        }
    };

    const first_tick = ticks - (ticks - 1);

    return (
        <div className={classNames('range-slider', className, { 'range-slider__error': ((value < min_value) || (value > max_value)) })}>
            <label className='range-slider__label' htmlFor='range'>
                <input
                    id='range'
                    className='input trade-container__input range-slider__track'
                    type='range'
                    min={first_tick}
                    max={ticks}
                    min_value={min_value}
                    max_value={max_value}
                    name={name}
                    steps='1'
                    onChange={handleChange}
                    tabIndex='0'
                    value={value}
                />
                <div className='range-slider__ticks'>
                    <TickSteps
                        value={value}
                        ticks={ticks}
                        onClick={handleClick}
                    />
                </div>
                {/* Calculate line width based on active value and size of range thumb */}
                <div
                    className='range-slider__line'
                    style={{ width: `calc(${value * 10}% - ${value < 4 ? '1.6rem' : '1rem'})` }}
                />
            </label>
            <div className='range-slider__caption'>
                <span className='range-slider__caption--first'>
                    {first_tick}
                </span>
                {
                    !!value &&
                    <span className='range-slider__caption-title'>
                        {+value === 1 && localize('[_1] Tick', value)}
                        {+value > 1 && localize('[_1] Ticks', value)}
                    </span>
                }
                <span className='range-slider__caption--last'>
                    {ticks}
                </span>
            </div>
        </div>
    );
};
// Keypress events do not trigger on Safari due to the way it handles input type='range' elements, using focus on the input element also doesn't work for Safari.

RangeSlider.propTypes = {
    className : PropTypes.string,
    first_tick: PropTypes.number,
    max_value : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    min_value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    name    : PropTypes.string,
    onChange: PropTypes.func,
    value   : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
};

export default observer(RangeSlider);
