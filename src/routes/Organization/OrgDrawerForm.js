import _ from 'lodash';
import {Button, Col, Drawer, Form, Input, Row, Select} from 'antd';
import React, {Component} from 'react'
import {PlusOutlined} from '@ant-design/icons';

const {Option} = Select;

 class OrgDrawerForm extends Component {

    state = {
        visible: false,
        orgAdd: {
            name:"",
            type:undefined
        }
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
            orgAdd: {
                name:"",
                type:undefined
            }
        });
    };

    add = e =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        this.setState({
            visible: false,
            orgAdd: {
                name:"",
                type:undefined
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>
                    <PlusOutlined/> 新增
                </Button>
                <Drawer
                    title="Create a new organization"
                    width={400}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    destroyOnClose
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item label="Name">
                                    {getFieldDecorator('name', {
                                        initialValue: _.get(this.state, 'orgAdd.name', void 0),
                                        rules: [{ required: true, message: 'Please enter org name' }],
                                    })(<Input placeholder="Please enter org name" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item label="Type">
                                    {getFieldDecorator('type', {
                                        initialValue: _.get(this.state, 'orgAdd.type', void 0),
                                        rules: [{ required: true, message: 'Please select an type' }],
                                    })( <Select allowClear placeholder="Please select an type">
                                        <Option value="0">局</Option>
                                        <Option value="1">所</Option>
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
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={this.add} type="primary">
                            Submit
                        </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}

const OrgDrawerApp = Form.create()(OrgDrawerForm);

 export  default OrgDrawerApp;

