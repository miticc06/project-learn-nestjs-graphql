import React, { Component } from "react";
import { Row, Col } from "antd";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import { getEventsQuery, addEventMutation } from '../queries/queries';
import { Spin, List, Avatar, Skeleton, DatePicker } from 'antd';

import { Modal, Button, Input, InputNumber } from 'antd';
import moment from 'moment';



class EventPage extends Component {

    state = {
        visible: false,
        confirmLoading: false,
        title: "Tieu de event 1",
        description: "Mô tả mẫu event 1",
        price: 1,
        date: new Date().toISOString()

    };
    onChange(value) {
        console.log('changed', value);
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => { // create event
        this.setState({
            confirmLoading: true,
        });

        this.props.addEventMutation({
            variables: {
                title: this.state.title,
                description: this.state.description,
                price: this.state.price,
                date: this.state.date
            },
            refetchQueries: [{ query: getEventsQuery }] // lấy lại list event
        });

        this.setState({
            visible: false,
            confirmLoading: false,
        });

    };

    displayEvents() {
        var data = this.props.data;
        if (data.loading) {
            return (
                <Spin tip="Loading..."></Spin>
            );
        } else {

            return data.events.map(event => {
                return (<li key={event._id}>{event.title}</li>);
            });
        }
    }


    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        let date = new Date();

        // let listEvent = this.props.getEventsQuery.events || [];
        // listEvent.reverse();

        const listEvent = [];
        (this.props.getEventsQuery.events || []).map(event => {
            listEvent.unshift(event);
        })


        return (
            <React.Fragment>
                <h1> Events Page</h1>

                <Row>
                    <Col span={12} offset={6}>

                        <div>
                            <Button type="primary" onClick={this.showModal}>Create Event</Button>
                            <Modal
                                title="Tạo Event mới"
                                visible={visible}
                                onOk={this.handleOk}
                                confirmLoading={confirmLoading}
                                onCancel={this.handleCancel}
                            >
                                <p><Input onChange={(e) => this.setState({ title: e.target.value })} placeholder="Title" defaultValue={this.state.title}></Input></p>
                                <p><Input onChange={(e) => this.setState({ description: e.target.value })} placeholder="Description" defaultValue={this.state.description}></Input></p>
                                <p><InputNumber
                                    onChange={(e) => this.setState({ title: e.target.value })}
                                    placeholder="Price"
                                    defaultValue={this.state.price}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    onChange={this.onChange}
                                /></p>
                                <p>
                                    <DatePicker
                                        onChange={(e) => this.setState({ date: e._d.toISOString() })}
                                        defaultValue={moment(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(), 'DD/MM/YYYY')}
                                        format='DD/MM/YYYY' />
                                </p>
                            </Modal>
                        </div>



                        <List
                            className="demo-loadmore-list"
                            // loading={initLoading}
                            itemLayout="horizontal"
                            // loadMore={loadMore}
                            dataSource={listEvent} // source data list events

                            //dataSource={this.props.getEventsQuery.events} // source data list events
                            renderItem={item => (
                                <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                                    <Skeleton avatar title={false} loading={item.loading} active>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            }
                                            title={<a href="https://ant.design">{item.title} - {item.price}$ - create by {item.creator.username}</a>}
                                            description={item.description}
                                        />
                                        <div></div>
                                    </Skeleton>
                                </List.Item>
                            )}
                        ></List>

                    </Col>
                </Row>
            </React.Fragment>


        );
    }
}

// export default graphql(getEventsQuery)(EventPage);

export default compose(
    graphql(addEventMutation, { name: "addEventMutation" }),
    graphql(getEventsQuery, { name: "getEventsQuery" })
)(EventPage);