import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { stopPropagation, noop } from '../../utils/index';
import './index.less';

const visual = { opacity: 1, zIndex: 999 };
const hidden = { opacity: 0, zIndex: -2 };
class PopModal extends PureComponent {
  state = {
    value: '',
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { visible: prevVisible } = prevProps;
    const { visible } = this.props;
    if (!prevVisible && visible) {
      this.setState({
        value: '',
      });
    }
    return null;
  }

  componentDidUpdate() {}

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
    const visibleStyle = visible ? visual : hidden;
    return (
      <div
        className="pop-modal"
        onClick={this.handleClickModal}
        style={{ top: `${top}px`, left: `${left}px`, ...visibleStyle }}
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
    );
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
  visible: true,
};

export default PopModal;
