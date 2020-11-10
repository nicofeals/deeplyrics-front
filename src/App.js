import './App.less'
import React, { Component } from 'react';
import { Button, Input, Layout, Radio, Space, Typography, Popover, Card, message, Image, Modal } from 'antd';
import { CopyOutlined, GithubFilled, LinkedinFilled, QuestionCircleFilled } from '@ant-design/icons'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Logo from './assets/logo.png'
import Alazka from './assets/alazka.png';
import Beartooth from './assets/beartooth.png'
import NN from './assets/nn.png'
import Novelists from './assets/novelists.png'
import Polaris from './assets/polaris.png'

const { Title, Text, Link } = Typography;
const { Header, Content, Footer } = Layout;
const bands = [Alazka, Beartooth, NN, Novelists, Polaris]

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
      aboutVisible: false,
    }
  }

  enterLoading() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false })
    }, 300000);
  };

  setAboutVisible(bool) {
    console.log("BEFORE: ", this.state.aboutVisible)
    this.setState({ aboutVisible: {bool} })
    console.log("AFTER: ", this.state.aboutVisible)
  }

  getLyrics(e) {
    e.preventDefault();
    this.setState({ lyrics: '' })
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
    const { input, size, lyrics, loading, aboutVisible } = this.state

    return (
      <Layout className="layout">
        <Header style={{alignSelf:'center', marginTop:'2rem', height: "max-content"}}>
          <div className="logo">
            <Image
              src={Logo}
              preview={false} />
          </div>
        </Header>
        <Content style={{padding:'2rem', alignSelf:'center', alignItems:'center', maxWidth:'100%'}}>
          <Space 
            direction='vertical'
            size='middle'
            style={{alignSelf:'center', justifyContent:'center', display: 'flex'}} align='middle'>
              <h1 className="description">This is a Deep Learning powered metalcore lyric generator</h1>
              <div className="inspired-by">
                <Text>Inspired by bands such as</Text>
              </div>
              <div className="band-logos">
              <Space direction='horizontal' size='large'>
                { bands.map((image) => <Card hoverable={true} bordered={false}><Image src={image} width={150} preview={false} /></Card>)}
              </Space>
              </div>
              <div className="radio">
                <Title level={5} style={{justifyContent: 'center', display: 'flex'}}>Choose a size</Title>
                <Radio.Group
                  style={{alignSelf:'center', display: 'flex', justifyContent: 'center'}}
                  size='large'
                  options={OPTIONS}
                  value={size}
                  onChange={e => this.setState({ size: e.target.value })}
                  optionType="button"
                  buttonStyle="solid"
                  />
              </div>
              <div className="text-input">
                <Input 
                  placeholder="Type in the first word or sentence."
                  bordered={true}
                  size='large'
                  value={input}
                  onChange={event => this.setState({
                    input: event.target.value,
                  })}
                  onPressEnter={(e) => {
                    if (this.state.input === "") {
                      return
                    }
                    this.getLyrics(e)
                    this.enterLoading()
                    this.setState({ requestSize: this.state.size })
                  }}/>
              </div>
              <Space 
                direction='horizontal' 
                size='middle'
                style={{alignSelf:'center', display: 'flex', justifyContent: 'center'}}
                >
                <Button 
                  type="primary"
                  shape='round'
                  size='large'
                  style={{alignSelf:'center', display: 'flex', justifyContent: 'center'}}
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
                    <Popover content={<div>Copy lyrics</div>} placement='right'>
                      <Button shape='round' onClick={() => {message.info('Lyrics copied to clipboard!')}}>
                        <CopyOutlined />
                      </Button>
                    </Popover>
                  </CopyToClipboard>
                }
              </Space>
              { (lyrics !== '' || loading === true) &&
                <div className="lyrics">
                  <Card bordered={false} loading={loading}>
                    <Title level={5} style={{whiteSpace:'pre-wrap', textTransform: "capitalize", display: 'flex', alignSelf: 'center', justifyContent: 'center'}}>{lyrics}</Title>
                  </Card>
                </div>
              }
            </Space>
          </Content>
        <Footer style={{textAlign: 'center'}}>
          <Space direction='vertical'>
            <Text style={{marginBottom: '1rem', marginTop: 0}}>Developped by <Link href="https://nicolasceccarello.tech">Nicolas Ceccarello</Link></Text>
            <Space direction='horizontal' size='1'>
              <Button type='link' href="https://github.com/nicofeals/deeplyrics"><GithubFilled style={{ fontSize: '1rem'}}/></Button>
              <Button type='link' href="https://www.linkedin.com/in/nicolasceccarello"><LinkedinFilled style={{ fontSize: '1rem'}}/></Button>
              <Modal
                title="About"
                centered
                keyboard={true}
                visible={aboutVisible}
                onOk={() => this.setState({ aboutVisible: false})}
                onCancel={() => this.setState({ aboutVisible: false})}
                footer={null}
              >
                <Title level={3}>Description</Title>
                deeplyrics is based on Deep Learning, allowing text generation from a given input. The model used is a basic Recurrent Neural Network. If you want to read more about how it works, head over to the project's <Link href="https://github.com/nicofeals/deeplyrics" target="_blank">GitHub</Link>.
                <Title level={3}>Usage</Title>
                The model used to generate text is hosted on pythonanywhere.com, a free hosting service for educationnal purposes. The used plan only allows 100s of processing time per 24h hour, so please don't spam the generate button. This was done essentialy to demonstrate my work and how my neural network performs. However, feel free to use any generated lyrics for yourself.
                <Title level={3}>Data</Title>
                The model was trained on about 40 bands' (mainly metalcore except a few expections, but lyrics stay relevant) 20 most popular songs. Architects, BMTH, Casey, nothing,nowhere., Being As An Ocean, Novelists, Parkway Drive, Northlane, just to mention a few.
              </Modal>
              <Button type="link" onClick={() => this.setState({ aboutVisible: true })}>
                <QuestionCircleFilled style={{fontSize: '1rem'}} />
              </Button>
            </Space>
          </Space>
        </Footer>
      </Layout>
    );
  }

}

export default App;
