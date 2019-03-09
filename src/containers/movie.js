import React, { Component } from 'react';
import { List, Card } from 'antd';
import './style.scss';

class Movie extends Component {
  render() {
    const { data } = this.props;
    if (data) {
      return (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data.dataList}
          renderItem={item => (
            <List.Item>
              <Card title={item.title}>
                <dl>
                  <dt>活動日期:</dt>
                  <dd>{item.showInfo[0].time} ~ {item.showInfo[0].endTime}</dd>
                  <dt>位置:</dt>
                  <dd>{item.showInfo[0].locationName}</dd>
                  <dt>地址:</dt>
                  <dd className="movie-location">{item.showInfo[0].location}</dd>
                  <dt>網站售票處:</dt>
                  <dd>{item.sourceWebName}</dd>
                </dl>
              </Card>
            </List.Item>
          )}
        />
      );
    }

    return null;
  }
}

export default Movie;
