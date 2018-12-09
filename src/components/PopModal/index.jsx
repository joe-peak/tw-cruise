import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { stopPropagation, noop } from '../../utils/index';
import './index.less';

class PopModal extends PureComponent {
  state = {
    value: '',
  }

  handleSave = e => {
    const { value } = this.state;
    const { onSave } = this.props;
    stopPropagation(e);
    onSave(e, value);
  }

  handleClickModal = e => {
    stopPropagation(e);
  }
  
  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const {
      position,
      okayText,
      cancelText,
      onCancel,
      visible,
    } = this.props;
    const { top, left } = position;
    const { value } = this.state;
    return visible ? (
      <div
        className="pop-modal"
        onClick={this.handleClickModal}
        style={{ top: `${top}px`, left: `${left}px` }}
      >
        <div className="arrow-icon"></div>
        <div className="close-icon">
          <i onClick={onCancel} className="icon iconfont icon-close"></i>
        </div>
        <div className="pop-modal-content">
          <div className="pop-modal-body">
            <div className="input-tip">Seperate multiple resource name with commas</div>
            <input
              value={value}
              type="text"
              onChange={this.handleChange}
              placeholder="input value"
            />
          </div>
          <div className="pop-modal-footer">
            <span className="ok-btn" onClick={this.handleSave} >{okayText}</span>
            <span className="cancle-btn" onClick={onCancel}>{cancelText}</span>
          </div>
        </div>
      </div>
    ) : null;
  }
}

PopModal.propTypes = {
  onSave: PropTypes.func,
  position: PropTypes.object.isRequired,
  okayText: PropTypes.string,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
};

PopModal.defaultProps = {
  onSave: noop,
  onCancel: noop,
  okayText: 'Add Resources',
  cancelText: 'Cancel',
  visible: false,
};

export default PopModal;
