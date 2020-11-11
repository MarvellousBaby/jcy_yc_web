import React from 'react'
import {Card, Divider, Table, Tooltip, Button, Pagination} from 'antd'
import {CloseCircleTwoTone, HighlightTwoTone} from '@ant-design/icons';
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    }, {
        title: 'Status',
        dataIndex: 'enable',
        key: 'enable',
    }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
        <Tooltip title="Delete">
          <CloseCircleTwoTone/>
        </Tooltip>
      <Divider type="vertical"/>
        <Tooltip title="Update">
            <HighlightTwoTone/>
        </Tooltip>
    </span>

        ),
    }];

const data = [
    {
        key: '1',
        name: 'John Brown',
        type: 32,
        enable: 'New York No. 1 Lake Park',
    }, {
        key: '2',
        name: 'Jim Green',
        type: 42,
        enable: 'London No. 1 Lake Park',
    }, {
        key: '3',
        name: 'Joe Black',
        type: 32,
        enable: 'Sidney No. 1 Lake Park',
    }]


class Organization extends React.Component {
    state = {
        current: 3,
        total: 50,
        color: 'red',
        bordered: true,
        data2: [],
        loading: false,
        loadingMore: false,
    };

    onChange = page => {
        console.log(page);
        this.setState({
            current: page,
        });
    };

    componentDidMount() {
        this.setState({
            loading: true,
        });
        this.setState({
            loading: false
        })
    };

    render() {
        const {size, bordered, loading, data2, loadingMore} = this.state;
        return (
            <div>
                <CustomBreadcrumb arr={['组织']}/>
                <Card bordered={false} title='组织列表' style={{marginBottom: 10}} id='basicUsage'>
                    <Table dataSource={data} columns={columns} style={styles.tableStyle}/>
                </Card>
                {/*<Pagination current={this.state.current} onChange={this.onChange} total={this.state.total}/>*/}
            </div>
        )
    }
}


const styles = {
    haveBorder: {
        minHeight: 270,
        width: '80%',
        boxSizing: 'border-box'
    },
    noBorder: {
        minHeight: 270,
        width: '80%',
        padding: '0 24px',
        boxSizing: 'border-box',
        border: '1px solid #fff'
    },
    loadMore: {
        height: 32,
        marginTop: 16,
        lineHeight: '32px',
        textAlign: 'center',
    },
    listStyle: {
        width: '80%'
    },
    affixBox: {
        position: 'absolute',
        top: 100,
        right: 50,
        with: 170
    }
}

export default Organization
