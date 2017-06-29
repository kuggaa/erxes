import React, { PropTypes } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Wrapper } from '/imports/react-ui/layout/components';
import { Pagination } from '/imports/react-ui/common';
import Sidebar from '../../../Sidebar';

// console.log("sidebar: ", Sidebar);

const propTypes = {
  items: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

class CommonList extends React.Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
    this.getActionBar = this.getActionBar.bind(this);
    this.getContent = this.getContent.bind(this);
    this.getHeader = this.getHeader.bind(this);
    this.render = this.render.bind(this);
  }

  renderItems() {
    return null;
  }

  getActionBar() {
    const actionBarLeft = (
      <Button bsStyle="link" href={FlowRouter.path('settings/knowledgebase/add')}>
        <i className="ion-plus-circled" /> Add topic
      </Button>
    );

    return <Wrapper.ActionBar left={actionBarLeft} />;
  }

  getContent() {
    const { loadMore, hasMore } = this.props;

    return (
      <Pagination loadMore={loadMore} hasMore={hasMore}>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th width="183" className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderItems()}
          </tbody>
        </Table>
      </Pagination>
    );
  }

  getHeader() {
    const breadcrumb = [
      { title: 'Settings', link: '/settings/integrations' },
      { title: 'Integrations' },
    ];

    return <Wrapper.Header breadcrumb={breadcrumb} />;
  }

  render() {
    return (
      <div>
        <Wrapper
          header={this.getHeader()}
          leftSidebar={<Sidebar />}
          actionBar={this.getActionBar()}
          content={this.getContent()}
        />
      </div>
    );
  }
}

CommonList.propTypes = propTypes;

export default CommonList;
