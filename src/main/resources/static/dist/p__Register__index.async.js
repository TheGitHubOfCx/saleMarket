(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"+nS6":function(e,t,a){"use strict";var l=a("CKcX"),r=a("u+rM");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("pGly");var n=r(a("LNHK"));a("sHWw");var u=r(a("Aywy")),s=r(a("U1Sa"));a("iBTD");var d=r(a("+TXG")),o=r(a("Pjwa")),i=r(a("2cji")),c=r(a("sp3j")),f=r(a("vZkh")),p=r(a("+KCP"));a("f+YK");var m=r(a("xrSm")),h=l(a("uqIC")),v=r(a("B+pt")),g=a("L5c0"),k=(m.default.Option,window.sessionStorage.getItem("userId"),function(e){function t(e){var a;return(0,o.default)(this,t),a=(0,c.default)(this,(0,f.default)(t).call(this,e)),a.state={count:60,liked:!0},a}return(0,p.default)(t,e),(0,i.default)(t,[{key:"componentWillMount",value:function(){}},{key:"countDown",value:function(){var e=this.state.count;1===e?this.setState({count:60,liked:!0}):(this.setState({count:e-1,liked:!1}),setTimeout(this.countDown.bind(this),1e3))}},{key:"handleClick",value:function(){var e=this.props,t=e.dispatch,a=e.register,l=a.phoneNum,r=(a.sendMsg,this.state.liked);r&&(t({type:"register/getVcode",payload:{phoneNum:l}}),this.countDown())}},{key:"setPhoneNum",value:function(e){var t=this.props.dispatch;t({type:"register/setState",payload:{phoneNum:e}})}},{key:"handleOk",value:function(){var e=this.props,t=e.form,a=e.dispatch,l=e.register,r=e.history,n=l.passWord;t.validateFields(function(e,l){e||(a({type:"register/addUser",payload:{userName:l.userName,sex:l.sex,phoneNum:l.phoneNum,passWord:n},callback:function(e){"0"!==e?r.push("/signIn"):r.push("/register")}}),t.resetFields())})}},{key:"nameChecked",value:function(e,t,a){t&&t.length>10&&a("\u7528\u6237\u540d\u957f\u5ea6\u4e0d\u53ef\u8d85\u8fc710"),a()}},{key:"codeChecked",value:function(e,t,a){var l=this.props.register,r=l.sendMsg;t&&r&&r!==t&&a("\u9a8c\u8bc1\u7801\u8f93\u5165\u9519\u8bef"),a()}},{key:"phoneNumChecked",value:function(e,t,a){a()}},{key:"passWordChecked",value:function(e,t,a){var l=new RegExp(/\s+/g);t&&t.length<6&&a("\u5bc6\u7801\u4f4d\u6570\u4e0d\u5f97\u5c11\u4e8e6\u4f4d\u6570"),l.test(t)&&a("\u5bc6\u7801\u4e0d\u53ef\u542b\u6709\u7a7a\u683c"),a()}},{key:"repeatPassWordChecked",value:function(e,t,a){var l=this.props.register,r=l.passWord,n=new RegExp(/\s+/g);t&&r&&r!==t&&a("\u91cd\u590d\u5bc6\u7801\u8f93\u5165\u4e0d\u4e00\u81f4"),n.test(t)&&a("\u5bc6\u7801\u4e0d\u53ef\u542b\u6709\u7a7a\u683c"),a()}},{key:"setPassWord",value:function(e){var t=this.props.dispatch;t({type:"register/setState",payload:{passWord:e}})}},{key:"render",value:function(){var e=this,t=this.props,a=t.register,l=t.form,r=this.state,o=r.count,i=r.liked,c=a.phoneNum,f=l.getFieldDecorator,p={labelCol:{span:1},wrapperCol:{span:10}};return h.default.createElement("section",{className:v.default.section},h.default.createElement("div",{className:v.default.formBox},h.default.createElement("div",{className:v.default.title},h.default.createElement("div",{className:v.default.titleName},"\u6ce8\u518c"),h.default.createElement("div",null)),h.default.createElement(u.default,{onSubmit:function(){return e.handleOk()}},h.default.createElement(u.default.Item,(0,s.default)({label:" \u7528\u6237\u540d:"},p),f("userName",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d"},{validator:function(t,a,l){return e.nameChecked(t,a,l)}}]})(h.default.createElement(d.default,{placeholder:"\u8bf7\u8f93\u5165\u7528\u6237\u540d"}))),h.default.createElement(u.default.Item,(0,s.default)({label:" \u6027 \u522b:"},p),f("sex",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6027\u522b"}]})(h.default.createElement(m.default,{showSearch:!0,placeholder:"\u8bf7\u9009\u62e9\u6027\u522b"},h.default.createElement("option",{value:"\u7537"},"\u7537"),h.default.createElement("option",{value:"\u5973"},"\u5973")))),h.default.createElement(u.default.Item,(0,s.default)({label:" \u5bc6 \u7801:"},p),f("passWord",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801"},{validator:function(t,a,l){return e.passWordChecked(t,a,l)}}]})(h.default.createElement(d.default,{type:"password",placeholder:"\u8bf7\u8f93\u5165\u5bc6\u7801(\u5bc6\u7801\u4f4d\u6570\u4e0d\u5f97\u5c11\u4e8e6\u4f4d\u6570)",onChange:function(t){return e.setPassWord(t.target.value)}}))),h.default.createElement(u.default.Item,(0,s.default)({label:"\u91cd\u590d\u5bc6\u7801:"},p),f("repeatPassWord",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u91cd\u590d\u5bc6\u7801"},{validator:function(t,a,l){return e.repeatPassWordChecked(t,a,l)}}]})(h.default.createElement(d.default,{type:"password",placeholder:"\u8bf7\u8f93\u5165\u5bc6\u7801(\u5bc6\u7801\u4f4d\u6570\u4e0d\u5f97\u5c11\u4e8e6\u4f4d\u6570)"}))),h.default.createElement(u.default.Item,(0,s.default)({label:" \u624b\u673a\u53f7:"},p),f("phoneNum",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7"},{validator:function(t,a,l){return e.phoneNumChecked(t,a,l)}}]})(h.default.createElement(d.default,{value:c,onChange:function(t){return e.setPhoneNum(t.target.value)},placeholder:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7"}))),h.default.createElement(u.default.Item,(0,s.default)({label:" \u9a8c\u8bc1\u7801:"},p),f("vCode",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801"},{validator:function(t,a,l){return e.codeChecked(t,a,l)}}]})(h.default.createElement(d.default,{placeholder:"\u514d\u8d39\u83b7\u53d6\u9a8c\u8bc1\u7801",addonAfter:h.default.createElement(n.default,{onClick:function(){return e.handleClick()}},i?"\u83b7\u53d6\u9a8c\u8bc1\u7801":"".concat(o," \u79d2\u540e\u91cd\u53d1"))}))),h.default.createElement("div",{className:v.default.button},h.default.createElement(n.default,{type:"primary",htmlType:"submit",className:"login-form-button"},"\u6ce8\u518c")))))}}]),t}(h.Component));k=u.default.create()(k);var y=(0,g.connect)(function(e){var t=e.register;return{register:t}})(k);t.default=y},"B+pt":function(e,t,a){e.exports={section:"section___2qDzP",formBox:"formBox___I4co5",title:"title___21ZLn",button:"button___1Viv2"}}}]);