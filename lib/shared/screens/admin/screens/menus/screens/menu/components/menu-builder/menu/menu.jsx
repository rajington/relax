import bind from 'decorators/bind';
import cx from 'classnames';
import Animate from 'components/animate';
import Component from 'components/component';
import Dragger from 'components/dnd/dragger';
import Droppable from 'components/dnd/droppable';
import React, {PropTypes} from 'react';

import styles from './menu.less';
import Entry from '../entry';

export default class Menu extends Component {
  static fragments = {
    menu: {
      _id: 1,
      data: 1
    }
  };

  static propTypes = {
    dragging: PropTypes.bool.isRequired,
    draggedMenuItem: PropTypes.func.isRequired,
    menuData: PropTypes.object.isRequired
  };

  render () {
    const {menuData} = this.props;
    return (
      <div>
        <Droppable
          placeholder
          placeholderRender={this.renderPlaceholder}
          dropInfo={{
            id: 'root'
          }}
          minHeight='100%'
          className={styles.dropArea}
        >
          {
            menuData &&
            menuData.root &&
            menuData.root.children.length &&
            this.renderRoot()
          }
        </Droppable>
        {this.renderDragger()}
      </div>
    );
  }

  renderRoot () {
    const {menuData} = this.props;
    return (
      <div className={styles.items}>
        {this.renderChildren(menuData.root.children)}
      </div>
    );
  }

  renderChildren (children) {
    return children.map(this.renderEntry, this);
  }

  renderEntry (id) {
    const {menuData} = this.props;
    const item = menuData[id];

    return (
      <Entry item={item} key={id} />
    );
  }

  @bind
  renderPlaceholder ({isActive}) {
    let placeholderContent;

    if (isActive) {
      placeholderContent = (
        <Animate transition='slideDownIn' key='drop'>
          <i className={cx('nc-icon-outline weather_drop-12', styles.dropIcon)} />
        </Animate>
      );
    } else {
      placeholderContent = (
        <Animate transition='slideUpIn' key='info'>
          <div>
            <div className={styles.title}>Drop your links here!</div>
            <div className={styles.text}>
              Drag pages or custom links from the left and drop them in this
              section to start building your menu structure.
            </div>
            <div className={styles.text}>
              Remember you can also sort them by moving them above or bellow other items.
            </div>
          </div>
        </Animate>
      );
    }

    return (
      <div className={cx(styles.empty, isActive && styles.active)}>
        <div className={styles.emptyContent}>
          {placeholderContent}
        </div>
      </div>
    );
  }

  renderDragger () {
    const {dragging, draggedMenuItem} = this.props;
    if (dragging) {
      return (
        <Dragger shadow={false} onStopDrag={draggedMenuItem} />
      );
    }
  }
}
