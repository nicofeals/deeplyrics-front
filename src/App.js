import './App.less'
import React, { Component } from 'react';
import { Button, Input, Layout, Radio, Space, Typography, Card, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const { Title, Text, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const OPTIONS = ['Verse', 'Song'];

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      size: 'Verse',
      requestSize: '',
      lyrics: '',
      loading: false,
    }
  }

  enterLoading = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false })
    }, 180000);
  };

  getLyrics = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'GET',
      mode: 'cors',
    };

    const queryString = 'input="' + this.state.input.toLowerCase() + '\n"&size=' + this.state.size.toLowerCase()

    fetch('http://127.0.0.1:5000/lyrics?' + queryString, requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        var res = data.lyrics;
        if (this.state.requestSize === 'Verse') {
          res = res.replace(/\n\n/g, '\n')
        }
        // res.toLowerCase().split('\n').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join('\n');
        console.log(res)
        this.setState({ lyrics: res, loading: false })
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    const { input, size, lyrics, loading } = this.state
    console.log(lyrics)

    return (
      <Layout className="layout">
        <Header style={{alignSelf:'center', marginTop:'2rem'}}>
          <div className="logo">
            <Title >D  E  E  P //  L  Y  R  I  C  S</Title>
          </div>
        </Header>
        <Content style={{padding:'50px', alignSelf:'center', alignItems:'center'}}>
          <Space direction='vertical' style={{alignSelf:'center'}}>
              <Text style={{alignSelf:'center'}}>This is a Deep Learning powered metalcore lyric generator</Text>
              <Radio.Group
                style={{alignSelf:'center'}}
                size='large'
                options={OPTIONS}
                value={size}
                onChange={e => this.setState({ size: e.target.value })}
                optionType="button"
                buttonStyle="solid"
                />
              <Input 
                placeholder="First word or sentence" 
                bordered={false}
                value={input}
                onChange={event => this.setState({
                  input: event.target.value,
                })}/>
              <Space direction='horizontal'>
              <Button 
                type="primary"
                shape='round'
                size='large'
                style={{alignSelf:'center'}}
                loading={loading}
                onClick={(e) => {
                  if (this.state.input === "") {
                    return
                  }
                  this.getLyrics(e)
                  this.enterLoading()
                  this.setState({ requestSize: this.state.size })
                }}>
                  Generate</Button>
                { lyrics !== '' &&
                  <CopyToClipboard text={lyrics}>
                    <Button shape='round' onClick={() => {message.info('Lyrics copied to clipboard!')}}>
                      <CopyOutlined />
                    </Button>
                  </CopyToClipboard>
                }
              </Space>
              <Card bordered={false} loading={loading} style={{position: 'absolute', width: '30rem', marginTop: '1rem'}}>
                <Paragraph style={{whiteSpace:'pre-wrap', textTransform: "capitalize"}}>{lyrics}</Paragraph>
              </Card>
            </Space>
          </Content>
        <Footer />
      </Layout>
    );
  }

}

export default App;
