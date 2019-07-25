import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Button } from 'antd';
import { createHashHistory } from 'history';
import CommentApp from '../../CommentApp.js' 


const history = createHashHistory();
var Blogshow
var BlogEditSign


class BlogShow extends Component {
    constructor() {
        super()
        this.state = {
            id:0,
            title: '',
            description: '',
            content: '',
            comments:[]
        }
    }
    componentWillMount() {
        if(Blogshow){PubSub.unsubscribe(Blogshow)}
        Blogshow=PubSub.subscribe('BlogShow', (msg, data) => {
            this.setState({
                title: data.title,
                description: data.description,
                content: data.content,
                id:data.id
            })

        })
        PubSub.publish('BlogShowSign',true)
    }
                           //*************************************************** 昨天写到这，博客的删除
    BlogDelete(){
        PubSub.publish('BlogDelete',true)
        history.push('/BlogOperate')
    }

    BlogEdit(){
        var EditBlog={
            id:this.state.id,
            title:this.state.title,
            description:this.state.description,
            content:this.state.content
        }
        if(BlogEditSign){PubSub.unsubscribe(BlogEditSign)}        
        BlogEditSign=PubSub.subscribe('EditSign',(msg,data)=>{
            if(data){
                console.log(data)
                PubSub.publish('BlogEdit',EditBlog)
                console.log(EditBlog)
            }
        })
        history.push('/BlogEditing')
    }
    
//*********************************************评论功能函数************************************************** 
    handleDeleteComment(index){
        console.log(index)
        const comments= this.state.comments
        comments.splice(index,1)                                           //删除序号为index的一条评论
        this.setState({comments})
        //this._saveComments(comments)
    }

    handleSummitComment(comment){
        if (!comment) return
        if (!comment.username) return alert('请输入用户名')
        if (!comment.content) return alert('请输入评论内容')
        const Comments=this.state.comments
        Comments.push(comment)
        this.setState({comments:Comments})
        console.log(Comments)
        //this._saveComments(comments)
    }

    render() {
        return (
            <div className="blogshow">
                <div className="blogshow-title">{this.state.title}</div>
                <div className="blogshow-description">{this.state.description}</div>
                <div
                    className='blogshow-content'
                    dangerouslySetInnerHTML={{ __html: this.state.content }} />
                <div className="wrapped-buttons">
                    <Button onClick={this.BlogEdit.bind(this)} type="dashed">编辑</Button>&nbsp;&nbsp;
                    <Button onClick={this.BlogDelete.bind(this)} type="danger" ghost>删除</Button>
                </div>
                <CommentApp comments={this.state.comments}
                            onDeleteComment={this.handleDeleteComment.bind(this)}
                            onSummitComment={this.handleSummitComment.bind(this)}></CommentApp>                
            </div>
        )
    }
}

export default BlogShow