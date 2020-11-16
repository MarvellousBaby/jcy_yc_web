import React from 'react'
import moment from 'moment';
import {Button, Card, Col, DatePicker, Divider, Input, Row, Table, Tooltip} from 'antd'
import {CloseCircleTwoTone, HighlightTwoTone,PlusOutlined } from '@ant-design/icons';
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import OrgDrawerForm from './OrgDrawerForm'


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

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss'||undefined;
class Organization extends React.Component {
    state = {
        current: 3,
        total: 50,
        color: 'red',
        bordered: true,
        data2: [],
        loading: false,
        loadingMore: false,

        drawerVisible:false,
        query: {
            name: "",
            type: "",
            startDate: undefined,
            endDate: undefined
        }
    };


    componentDidMount() {
        this.setState({
            loading: true,
        });
        this.setState({
            loading: false
        })
    };

    submit=(e)=> {
        console.log("value", e);
        console.log("startDate", this.state.query);
    };

    //清空
    clear=()=>{
        this.setState({
            query:{
                ...this.state.query,
                name:"",
                type:"",
                startDate: undefined,
                endDate: undefined,
            }
        })
    };

    //时间改变的方法
    onPickerChange = (date, dateString) => {
        console.log("data", date, "dateString", dateString);
        //这两个参数值antd自带的参数
        console.log("dateString", dateString[0], "dateString", dateString[1]);
        this.setState({
            query:{
                ...this.state.query,
                startDate: dateString[0],
                endDate: dateString[1],
            }
        })
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };


    render() {
        const {query} = this.state;
        return (
            <div>
                <CustomBreadcrumb arr={['组织']}/>
                <Row>
                    <Col className="gutter-row" span={1}>名称：</Col>
                    <Col className="gutter-row" span={3}>
                        <Input
                            onChange={(event => {
                                this.setState({
                                    query: {
                                        ...query,
                                        name:event.target.value
                                    }
                                })
                            })}
                            value={query.name}
                            placeholder="请输入名称"/>
                    </Col>

                    <Col span={1}></Col>

                    <Col className="gutter-row" span={1}>类型：</Col>
                    <Col className="gutter-row" span={3}>
                        <Input
                            onChange={(event => {
                                this.setState({
                                    query: {
                                        ...query,
                                        type:event.target.value
                                    }
                                })
                            })}
                            value={query.type}
                            placeholder="请输入类型"/>
                    </Col>

                    <Col span={1}></Col>

                    <Col className="gutter-row" span={1}>查询日期：</Col>
                    <Col span={4} className="gutter-row">
                        <RangePicker
                            onChange={this.onPickerChange}
                            value={query.startDate===undefined||query.endDate===undefined||query.startDate===""||query.endDate===""?null:[moment(query.startDate, dateFormat), moment(query.endDate, dateFormat)]}
                            format={dateFormat}
                            showTime/>
                    </Col>

                    <Col span={2}></Col>

                    <Col className="gutter-row" span={2}>
                        <div>
                            <Button key="submit" type="primary" onClick={this.submit}>
                                查询
                            </Button>
                            <Button style={{marginLeft: 8}} onClick={this.clear}>
                                重置
                            </Button>
                            <OrgDrawerForm />
                        </div>
                    </Col>

                </Row>

                <Divider/>

                <Card bordered={false} title='组织列表' style={{marginBottom: 10}}>
                    <Table dataSource={data} columns={columns} />
                </Card>
            </div>
        )
    }
}

export default Organization
