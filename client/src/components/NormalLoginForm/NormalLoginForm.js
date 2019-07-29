import { Form, Icon, Input, Button, Checkbox, Col, Row } from 'antd';
import React from 'react';
import './NormalLoginForm.css';

const normalLoginForm = props => {
    return (

        <Row>
            <Col span={8} offset={8}>
                <Form id="login-form">
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox>Remember me</Checkbox>
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </Col>
        </Row>


    );
}

export default normalLoginForm; 