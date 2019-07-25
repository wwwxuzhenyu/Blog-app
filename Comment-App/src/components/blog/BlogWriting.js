import React, { Component } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Input } from 'antd';
import { Button } from 'antd';
import PubSub from 'pubsub-js';                        //引入PubSub
import { createHashHistory } from 'history';

const history = createHashHistory();
//var ID=(new Date()).getTime()
//var getid

class BlogWriting extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            content: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
    }
/*
    componentWillMount(){
        if(getid){PubSub.unsubscribe(getid)}
        getid=PubSub.subscribe('ID',(msg,data)=>{
            ID=data                                             //发布数组长度得到id
        })
    }
*/    
    handleChange(value) {
        this.setState({ content: value })
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value })                    //onChange函数返回一个对象，因此要先将它取value
    }

    handleDescriptionChange(e) {
        this.setState({ description: e.target.value })              //onChange函数返回一个对象，因此要先将它取value
    }

    BlogSubmit() {
        if (this.state.title&&this.state.description) {
           
            const blog = {
                id:(new Date()).getTime(),
                title: this.state.title,
                content: this.state.content,
                description: this.state.description,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
               // href: '/#/BlogShow',
            }
            PubSub.publish('BlogItem', blog)

            this.setState({
                title: '',
                description: '',
                content: ''
            })
            alert("发布成功！")
            history.push('/BlogList')
        }
        else if(!this.state.title){
            alert("标题不能为空！")
        }
        else{
            alert("概要内容不能为空！")
        }
    }
    render() {
        return (
            <div>
                <p>请输入标题</p>
                <Input placeholder="标题"
                    value={this.state.title}
                    onChange={this.handleTitleChange}></Input>
                <br />
                <br />
                <p>请输入概要</p>
                <Input placeholder="概要"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}></Input>
                <br />
                <br />
                <p>请输入博客内容</p>
                <ReactQuill value={this.state.content}
                    onChange={this.handleChange} />
                <br />
                <Button type="primary"
                    onClick={this.BlogSubmit.bind(this)}>
                    发布
                </Button>
            </div>
        )
    }
}

export default BlogWriting