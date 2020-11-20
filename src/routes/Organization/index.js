import _ from 'lodash';
import React from 'react'
import moment from 'moment';
import {Button, Card, Col, DatePicker, Divider, Drawer, Form, Input, Row, Select, Table, Tooltip,Switch} from 'antd'
import {CloseCircleTwoTone, HighlightTwoTone} from '@ant-design/icons';
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import OrgDrawerApp from './OrgDrawerForm'
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import { isAuthenticated } from '../../utils/Session'

const {Option} = Select;


const data = [
    {
        key: '1',
        name: '城区局',
        type: 0,
        enable: 1,
    }, {
        key: '2',
        name: '车站路所',
        type: 1,
        enable: 1,
    }, {
        key: '3',
        name: '象山所',
        type: 1,
        enable: 0,
    }]

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss' || undefined;
const scroll = {x:600, y: 700 };

@withRouter @inject('appStore') @observer @Form.create()
class Organization extends React.Component {
    state = {
        current: 3,
        total: 50,
        color: 'red',
        bordered: true,
        data2: [],
        loading: false,
        loadingMore: false,

        table:{
            scroll:scroll,
            showColumn:true
        },
        query: {
            name: "",
            type: "",
            startDate: undefined,
            endDate: undefined
        },
        orgUpdate: {
            updateDrawerVisible: false,
            id: "",
            name: "",
            type: "",
        }

    };


    componentDidMount() {
        console.log("user",isAuthenticated());
        if (isAuthenticated() !== "admin"){
            this.setState({
                table:{
                    ...this.state.table,
                    showColumn:false
                }
            })
        }
        this.init();
    };

    //查询列表
    submit = (e) => {
        console.log("value", e);
        console.log("startDate", this.state.query);
    };

    //清空
    clear = () => {
        this.setState({
            query: {
                ...this.state.query,
                name: "",
                type: "",
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
            query: {
                ...this.state.query,
                startDate: dateString[0],
                endDate: dateString[1],
            }
        })
    };

    // 获取数据: 列表数据
    getData = async ({params} = {}) => {
        const {data2} = {...this.props.params, ...params};
        this.setState({
            data2: data2
        })
    };

    onClose = () => {
        this.setState({
            orgUpdate: {
                ...this.state.orgUpdate,
                updateDrawerVisible: false,
                name: "",
                type: ""
            }
        });
    };

    clickUpdate = (text) => {
        this.setState({
            orgUpdate: {
                ...this.state.orgUpdate,
                updateDrawerVisible: true,
                id: text.key,
                name: text.name,
                type: text.type
            }
        })
        console.log("e2", this.state.orgUpdate.type);
    }

    clickDelete = (id) =>{
        this.setState({
            orgUpdate: {
                ...this.state.orgUpdate,
                id: id
            }
        })
        console.log("e3", this.state.orgUpdate.id);

    }

    update = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        this.setState({
            ...this.state.orgUpdate,
            orgUpdate: {
                updateDrawerVisible: false,
                name: "",
                type: ""
            }
        });
    };

    //页面数据初始化
    init = () => {

    };

    render() {
        const {query} = this.state;
        const {getFieldDecorator} = this.props.form;

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
                                        name: event.target.value
                                    }
                                })
                            })}
                            value={query.name}
                            placeholder="请输入名称"/>
                    </Col>

                    <Col span={1}></Col>

                    <Col className="gutter-row" span={1}>类型：</Col>
                    <Col className="gutter-row" span={4}>
                        <Select allowClear
                                placeholder="请输入类型"
                                onChange={(event => {
                                    console.log(event);
                                    this.setState({
                                        query: {
                                            ...this.state.query,
                                            type: event.target.value
                                        }
                                    })
                                })}
                                style={{width: 200}}>
                            <Option value="0">局</Option>
                            <Option value="1">所</Option>
                        </Select>
                    </Col>

                    <Col className="gutter-row" span={1}>查询日期：</Col>
                    <Col span={4} className="gutter-row">
                        <RangePicker
                            onChange={this.onPickerChange}
                            value={query.startDate === undefined || query.endDate === undefined || query.startDate === "" || query.endDate === "" ? null : [moment(query.startDate, dateFormat), moment(query.endDate, dateFormat)]}
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
                        </div>
                    </Col>

                    <Col span={1}></Col>

                    <OrgDrawerApp getData={this.getData}/>

                </Row>

                <Divider/>

                <Card bordered={false} title='组织列表' style={{marginBottom: 10}}>
                    <Table
                        {...this.state.table}
                        dataSource={data}
                        columns={this.column}/>
                </Card>

                <Drawer
                    title="update organization"
                    width={400}
                    onClose={this.onClose}
                    visible={this.state.orgUpdate.updateDrawerVisible}
                    bodyStyle={{paddingBottom: 80}}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item label="Name">
                                    {getFieldDecorator('name', {
                                        initialValue: _.get(this.state, 'orgUpdate.name', void 0),
                                        rules: [{required: true, message: 'Please enter org name'}],
                                    })(<Input placeholder="Please enter org name"/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item label="Type">
                                    {getFieldDecorator('type', {
                                        initialValue: this.state.orgUpdate.type,
                                        rules: [{required: true, message: 'Please select an type'}],
                                    })(<Select allowClear
                                               placeholder="Please select an type">
                                        <Option value={0}>局</Option>
                                        <Option value={1}>所</Option>
                                    </Select>)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{marginRight: 8}}>
                            Cancel
                        </Button>
                        <Button onClick={this.update} type="primary">
                            Update
                        </Button>
                    </div>
                </Drawer>

            </div>
        )
    }

    get column() {
        return [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                render: (text,record) => {
                    return <span>{text === 0 ? '局':'所'}</span>
                }
            }, {
                title: 'Status',
                dataIndex: 'enable',
                key: 'enable',
                render: (text,record) => {
                    return <Switch
                        checked={text === 0}
                        checkedChildren={'正常'}
                        unCheckedChildren={'删除'}
                    />
                }
            }, {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    this.state.table.showColumn?
                    <span >
                        <Tooltip title="Update">
                            <Button type="link"  onClick={event => this.clickUpdate(record)}><HighlightTwoTone/></Button>
                        </Tooltip>
                        <Divider type="vertical"/>
                        <Tooltip title="Delete">
                            <Button type="link"  onClick={event => this.clickDelete(record.key)}><CloseCircleTwoTone/></Button>
                        </Tooltip>
                    </span>:""
                )
            }];
    }


}

const OrganizationApp = Form.create()(Organization);

export default OrganizationApp;