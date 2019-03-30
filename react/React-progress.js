v16.2.x之后的版本
React Fiber 加入了事件优先级概念

//Create-react-app

//PWA serviceWork
index.js:
	inport 'React' from 'react'
	import 'ReactDOM' from 'react-dom'
	import 'Todolist' from './Todolist'
	RactDOM.render(<Todolist />, document.getElementById('app'))


todolist(父组件)：
import React, { Component, Fragment } from 'react'
import TodoItem from './TodoItem'
import Axios from 'axios'
import './style.css'

class todolist extends Component{
	constructor(props) {
		super(props); //调用父类构造函数, 调用一次
		//当组件的state或者props发生改变的时候, render函数就会重新执行
		this.state = {
			inputVal: '',
			list: []
		}
		this.handleChangeVal = this.handleChangeVal.bind(this);
		this.handleBtn = this.handleBtn.bind(this);
		this.handleItemDelete = this.handleItemDelete.bind(this);
	}

	//在组件即将被挂载到页面的时刻自动执行
	componentWillMount() {
		console.log('componentWillMount');
	}

	render() {
		console.log('render');
		return {
			<Fragment> {/* 隐藏外层标签, 使用Fragment标签占位符 */}
				<div>
					<label htmlFor="insertArea">输入内容</label>  {/* insertArea光标聚焦 */}
					<input 
						id="insertArea" 
						className="input"
						value={this.state.inputVal}
						onChange={this.handleChangeVal}
						ref={(input) => {this.input = input}}
					 />
					 <button onClick={this.handleBtn}>提交</button>
				</div>
				<ul>
					{ this.getTodoItem() }
				</ul>
			</Fragment>
		}
	}

	//组件被挂载到页面之后, 自动执行
	componentDidMount() {
		//axios 发送ajax请求
		axios.get('/api/todolist').then((res) => {
			console.log(res.data);
			this.setState(() => ({
				list: [...res.data]
			}))
		}).catch(() => {
			console.log('error');
		})
		
		console.log('componentDidMount');
	}

	//组件被更新之前, 会被执行
	shouldComponentUpdate() {
		console.log('shouldComponentUpdate');
		return true;
	}

	//组件被更新之前, 会被执行, 会在showComponent之后被执行, 
	//如果shouldComponent返回true会执行, 返回false不会执行
	componentWillUpdate() {
		console.log('componentWillUpdate');
	}

	//组件更新完成之后, 会被执行
	componentDidUpdate() {
		console.log('componentDidUpdate');
	}

	getTodoItem() {
		return this.state.list.map((item, index) => {
			return (
				<div key={index}>
				<TodoItem 
					conten={item} 
					index={index} 
					deleteItem={this.handleItemDelete} />

				{/*<li 
					key={index}
					onClick={this.handleItemDelete.bind(this, index)}
					dangerouslySetInnerHTML={{__html:item}} {/* 里面花括号: js对象 */}
				>
				</li>*/}
				<div>
			)
		})
	}

	handleChangeVal(e) {
		//const val = e.target.value;
		const val = this.input.value;
		this.setState(() => {
			return {
				inputVal: val
			}
		})
		/* 上面演变如下：
			this.setState(() => ({ inputVal: val }))
		*/

		// this.setState({
		// 	inputVal: e.target.value
		// })
	}

	handleBtn() {
		this.setState((prevState)=>({
			list: [...prevState.list, prevState.inputVal], // prevState === this.state
			inputVal: ''
		}))

		// this.setState({
		// 	list: [...this.state.list, this.state.inputVal], //往list添加数据
		// 	inputVal: ''
		// })
	}

	handleItemDelete(index) {
		/*
			immutable --> state不允许做任何的改变
			不能直接修改数据, 如:
			this.state.list.splice(index, 1);
		*/
		//const list = [...this.state.list];
		//list.splice(index, 1);

		// this.setState({
		// 	list: list
		// })


		this.setState((preState)=>{
			const list = [...preState.list];
			list.splice(index, 1);
			return { list }
		})
	}

}

export default todolist;


TodoItem(子组件):
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TodoItem extends Component{
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.content !== this.props.content) {
			return true;
		}else{
			return false;
		}
	}

	render() {
		const { conten, test } = this.props;
		return( 
			<div onClick={this.handleClick}>{this.props.conten}</div> 
			<div onClick={this.handleClick}>{test} - {conten}</div> 
			{/* 父组件向子组件传值使用属性, 子组件使用props接收值 */}
		)
	}

	handleClick() {
		const { deleteItem, index } = this.props;
		deleteItem(index);
		
		/*
			this.props.deleteItem(this.props.index);
			console.log(this.props.index);
		*/
	}

	//当一个组件从父组件接受参数
	//只要父组件render函数被执行了, 子组件的这个生命周期函数会被执行
	//或者如果这个组件第一次存在于父组件中, 不会执行; 如果这个组件之前已经存在于父组件中, 才会执行
	componentWillReceiveProps() {
		console.log('child componentWillReceiveProps');
	}

	//当这个组件即将被从页面中剔除时候, 会被执行
	componentWillUnmount() {
		console.log('child componentWillUnmount');
	}

}
TodoItem.propTypes = { //校验数据类型
	test: PropTypes.String.isRequired; //必须传值
	content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), 
	//arrayOf(PropTypes.number, PropTypes.string),
	deleteItem: PropTypes.func,
	index: PropTypes.number
}
TodoItem.defaultProps = { //默认值
	test: 'hello world'
}
export default Todolist;

todolis.json:
	['apple', 'banana', 'orger']

style.css:
	input{ border:1px solid red;}

/*	总结：
	声明式开发(减少dom操作)
	可以与其他框架并存
	组件化
	单向数据流
	视图层框架
	函数是编程 (自动化测试)
*/

Reactdevelopertools调试工具

什么是虚拟DOM
	虚拟DOM就是一个js对象, 用它描述真实的DOM
	JSX 通过 React.createElement('div', {}, 'item') 变成JS对象(虚拟DOM)
	diff算法 作比对

	setState触发 生成新的DOM

	setState为何设计成异步
		提高reat底层性能

	虚拟DOM对比: 同层对比, 有差异不会往下作对比, 把原始DOM删除掉, 新的DOM替换 
	不要使用index作为key值, 不稳定

生命周期函数指在某一时刻会自动调用执行的函数
初始化(Initialzation)
挂载(组件第一次挂载页面时候执行Mounting) --> componentWillMount、render、componentDidMount
组件更新(Updation) props 和 states 发生变化
	props: componentWillReceiveProps shouldComponentUpdate componentWillUpdate render componentDidUpdate
	states: shouldComponentUpdate componentWillUpdate render componentDidUpdate
去除(Unmounting) componentWillUnmount

charles模拟接口数据mock



二、 react-transition-group实现动画

index.js:
	import React from 'react'
	import ReactDOM from 'react-dom'
	import App from './App'
	ReactDOM.render(<app />, document.getELementById('app'))

App.js:
	import React, { Component } from 'react'
	import { CSSTransition } from 'css-transition-group'
	import './style.css'

	class App extends Component {
		constructor(props) {
			super(props);
			this.state = {
				show: true,
				list: []
			}
			this.handleToggle = this.handleToggle.bind(this);
			this.handleAddItem = this.handleAddItem.bind(this);
		}

		render() {
			return (
				<Fragment>
					<div className={ this.state.show ? 'show' : 'hide' }>hello</div>
					<CSSTransition
					 in = {this.state.show}
					  timeout = {1000}
					   classNames="fade" 
					   unmountOnExit {/* 隐藏dom结构 */}
					   onEntered={(el) => {el.style.color='blue'}} {/* 某一时刻自动执行 */}
					   appear={true} {/* 第一次展示时候也需要动画效果 */}
					 >
						<div>hello</div>
					</CSSTransition>
					<button onClick={this.handleToggle}>toggle</button>

					<br/>
					<br/>
					<br/>

					<TransitionGroup>
					{
						this.state.map((item, index)=>{
							return (
							<CSSTransition
							  timeout = {1000}
							   classNames="fade" 
							   unmountOnExit
							   onEntered={(el) => {el.style.color='blue'}}
							   appear={true}
							    key={index}
							 >
								<div>{item}</div>
							</CSSTransition>
							)
						})
					}
					</TransitionGroup>
					<button onClick="{this.handleAddItem}">toggle</button>
				</Fragment>
			)
		}

		handleToggle() {
			this.setState({
				show: this.state.show ? false : true
			})
		}

		handleAddItem() {
			this.setState((prevState) => {
				return {
					list: [...prevState.list, 'item']
				}
			})
		}
	}
	export default App;

style.css:
	.show{ animation: show-item 2s ease-in forwards;}
	.hide{ aniation: hide-item 2s ease-in forwards;}
	@keyframes hide-item {
		0% {
			opacity: 1;
			color: red;
		}
		50% {
			opacity: 0.5;
			color: green;
		}
		100% {
			opacity: 0;
			color: blue;	
		}
	}

	@keyframes show-item {
		0% {
			opacity: 0;
			color: red;
		}
		50% {
			opacity: 0.5;
			color: green;
		}
		100% {
			opacity: 1;
			color: blue;	
		}
	}


	.fade-enter,.fade-appear-active{
		opacity: 0;
	}
	.fade-enter-active,.fade-appear-active{
		opacity:1;
		transition: all 1s ease-in;
	}
	.fade-enter-done{
		opacity:1;
		//color:red;
	}

	.fade-exit{
		opacity:1
	}
	.fade-exit-active{
		opacity:0;
		transition: all 1s esae-in;
	}
	.fade-exit-done{
		opacity: 0;
	}

三、 Redux Store数据管理
 redux = Reducer + Flux

 Action Creaters(图书) -->   Store(管理员) --> <--- Reducers(记录本)
 				|
 			React Components

Ant Design of React布局库
Reduce devetools 调试工具

public/index.html
	...

src/index.js:
	import React from 'react'
	import ReactDOM from 'react-dom'
	import Todolist from './Todolist'

	ReactDOM.render(<Todolist />, document.getElementById('root'))

src/Todolist.js
	import React, { Component } from 'react'
	import 'antd/dist/antd.css'
	//import { Input, Button, List } from 'antd'
	import store from './store/index.js'
	//import { getInputChangeAction, getAddItemAction, getDeleteItemAction, initListAction } from './store/actionCreators'
	import { getTodoList, getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreators'
	//import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './store/actionTypes' // actionCreators包括了暂时无用
	import TodolistUI from './TodolistUI'
	import axios from 'axios'

	class Todolist extends Component{
		constructor(props) {
			super(props);
			this.state = store.getState();
			//console.log(this.state);
			this.handleInputChange = this.handleInputChange.bind(this);
			this.handleStoreChange = this.handleStoreChange.bind(this);
			store.subscribe(this.handleStoreChange);
			this.handleBtnClick = this.handleBtnClick.bind(this);
			this.handleItemDelete = this.handleItemDelete.bind(this);
		}

		render() {
			return (
				{/*
				<div style={{margin:'10px'}}>
					<div>
						<input 
						value={this.state.inputVal}
						 placeholder="todo info"
						  style={{width:'300px', marginRight:'10px'}} 
						  onChange={this.handleInputChange}
						   />
						<Button type="primarty" onClick={this.handleBtnClick}>提交</Button>
					</div>
					<List
						style={{width:'300px', marginTop:'10px'}}
						bordered
						dataSource={this.state.list}
						renderItem={(item, index) =>(<List.item onClick={this.handleItemDelete.bind(this, index)}>{item}</List.item>)}
					/>
				</div>
				*/}
				<br />
				<br />
				<br />
				<TodolistUI
				 inputVal={this.state.inputVal} 
				 list={this.state.list}
				 handleInputChange={this.handleInputChange}
				 handleBtnClick={this.handleBtnClick}
				 handleItemDelete={this.handleItemDelete}
				/>
			)
		}

		componentDidmount() {
			/*
			axios.get('/list.json').then((res)=>{
				const data = res.data;
				const action = initListAction(data);
				store.dispatch(action);
				//console.log(res.data);
			}).catch((err)=>{
				console.log(err);
			})
			*/

			const action = getTodoList();
			store.dispatch(action);
		}

		handleInputChange(e) {
			/*
			const action = {
				type: CHANGE_INPUT_VALUE,
				value: e.target.value
			}
			*/
			const action = getInputChangeAction(e.target.value);
			store.dispatch(action);
		}

		handleStoreChange() {
			this.setState(store.getState());
		}

		handleBtnClick() {
			/*
			const action = {
				type: ADD_TODO_ITEM
			}
			*/
			const action = getAddItemAction()
			store.dispatch(action);
		}

		handleItemDelete(index) {
			/*
			const action = {
				type: DELETE_TODO_ITEM,
				index
			}
			*/
			const action = getDeleteItemAction(index);
			store.dispatch(action);
		}

	}
	export default Todolist;

src/list.json:
	['banana', 'apple']

src/TodolistUI.js:
	//拆分UI部分
	//import React, { Component } from 'react'
	import React from 'react'
	import { Input, Button, List } from 'antd'

	//无状态组件, 性能较高 --> 就是一个函数, 普通函数只有render函数时候 可以写成如下：
	const TodolistUI = (props) => {
		return(
			<div style={{margin:'10px'}}>
				<div>
					<input 
					value={props.inputVal}
					 placeholder="todo info"
					  style={{width:'300px', marginRight:'10px'}} 
					  onChange={props.handleInputChange}
					   />
					<Button type="primarty" onClick={props.handleBtnClick}>提交</Button>
				</div>
				<List
					style={{width:'300px', marginTop:'10px'}}
					bordered
					dataSource={props.list}
					renderItem={(item, index) =>(<List.item onClick={()=>{props.handleItemDelete(index)}}>{item}</List.item>)}
				/>
			</div>
		)
	}

	/* 有类, 会执行生命周期函数 性能较差
	class TodolistUI extends Component{
		render() {
			return (
				<div style={{margin:'10px'}}>
					<div>
						<input 
						value={this.props.inputVal}
						 placeholder="todo info"
						  style={{width:'300px', marginRight:'10px'}} 
						  onChange={this.props.handleInputChange}
						   />
						<Button type="primarty" onClick={this.props.handleBtnClick}>提交</Button>
					</div>
					<List
						style={{width:'300px', marginTop:'10px'}}
						bordered
						dataSource={this.props.list}
						renderItem={(item, index) =>(<List.item onClick={(index)=>{this.props.handleItemDelete(index)}}>{item}</List.item>)}
					/>
				</div>
			)
		}
	}
	*/
	export default TodolistUI;
	

store/index.js:
	import { createStore, applyMiddleware, compose } from 'redux' //applyMiddleware compose thunk使用
	import reducer from './reducer'
	import thunk from 'redux-thunk'

	//-->添加的redux
	const composeEnhancers = window.__REDUX_DEVETOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVETOOLS_EXTENSION__COMPOSE__({}) : compose;
	const enhancer = composeEnhancers(
		applyMiddleware(thunk);
	);

	const store = createStore(
		reducer,
		enhancer 
		//window.__REDUX_DEVETOOLS_EXTENSION__ && window.__REDUX_DEVETOOLS_EXTENSION__() //浏览器调试扩展
	);
	export default store;


store/reducer.js
	import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION } from './actionTypes'
	const defaultState = {
		inputVal: '',
		list: []
	}

	//reducer 可以接收state, 不能修改state
	export default (state = defaultState, action) => {
		if(action.type === CHANGE_INPUT_VALUE) {
			const newState = JSON.parse(JSON.stringify(state)); //深拷贝
			newState.inputVal  = action.value;
			return newState;
		}
		if(action.type === ADD_TODO_ITEM) {
			const newState = JSON.parse(JSON.stringify(state));
			newState.list.push(newState.inputVal);
			newState.inputVal = '';
			return newState;
		}
		if(action.type === DELETE_TODO_ITEM) {
			const newState = JSON.parse(JSON.stringify(state));
			newState.list.splice(action.index, 1);
			return newState;
		}
		if(action.type === INIT_LIST_ACTION) {
			const newState = JSON.parse(JSON.stringify(data));
			newState.list = action.data;
			return newState;
		}
		//console.log(state, action);
		return state;
	}

store/actionTypes.js:
	//type的拆分整合
	export default const CHANGE_INPUT_VALUE = 'change_input_value';
	export default const ADD_TODO_ITEM = 'add_todo_item';
	export default const DELETE_TODO_ITEM = 'delete_todo_item';
	export default const INIT_LIST_ACTION = 'init_list_action'

store/actionCreators.js:
	//action的封装 统一管理
	import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION } from './actionTypes'

	import axios from 'axios'

	export const getInputChangeAction =(value) => ({
		type: CHANGE_INPUT_VALUE,
		value
	})

	export const getAddItemAction =() => ({
		type: ADD_TODO_ITEM
	})

	export const getDeleteItemAction =(index) => ({
		type: DELETE_TODO_ITEM,
		index
	})

	export const initListAction = (data) => ({
		type: INIT_LIST_ACTION,
		data
	})

	//redux-thunk
	export const getTodoList = () => {
		return (dispatch) => {
			axios.get('/list.json').then((res)=>{
				const data = res.data;
				const action = initListAction(data);
				dispatch(action);
			})
		}
	}

/*	总结：
	store是唯一的
	只有store能改变自己的内容
	reducer必须是纯函数
	纯函数：给固定的输入, 就一定会有固定的输出, 不会有任何的副作用

	redux : createStore  store.dispatch  store.getState  store.subscribe
	--------------------------------
	redux-thunk中间件

	redux-saga中间件
	
*/
Redux的使用
	src/index.js
		import React from 'react'
		import ReactDom from 'react-dom'
		import TodoList from './TodoList'
		//改造: 使用Provider
		import { Provider } from 'react-redux'
		import store from './store'

		const App = {
			<Provider store={store}>
				<TodoList />
				<A></A>
				...
			</Provider>
		}

		ReactDom.render(App, document.getElementById('app'))


	src/TodoList.js:
		import React, { Component } from 'react'
		//import store from './store'
		import { connect } from 'react-redux'

		//无状态组件
		const TodoList = (props) => {
			render() {
				return (
					const { inputVal, changeInputVal, handleClick, list, handleDelete } = props;
					
					<div>
						<div>
							<input type="text"
							 value={ inputVal}
							 onChange={ changeInputVal}
							/>
							<button onClick={ handleClick}>添加</button>
						</div>
						<ul>
							{
								list.map((item, index) => {
									<li onClick={handleDelete(index)} key={index}>{item}</li>
								})
							}
						</ul>
					</div>
				)
			}
		}

		const mapStateToProps = (state) => {
			return {
				inputVal: state.inputVal,
				list: state.list
			}
		}
		const mapDispatchToprops = (dispatch) => {
			return {
				changeInputVal(e) {
					const action = {
						type:'change_input_val',
						value: e.target.value
					}
					dispatch(action);
				}

				handleClick() {
					const action = {
						type: 'add_item'
					}
					dispatch(action);
				}

				handleDelete(index) {
					const action = {
						type: 'delete_item',
						index
					}
				}
			}
		}
		//TodoList 与 store做链接
		export default connect(mapStateToProps, mapDispatchToprops)(TodoList);


	src/store/index.js:
		import { createStore } from 'redux'
		import reducer from './reducer'

		const store = createStore(reducer);
		export default store;


	src/store/reducer.js:
		const defaultState = {
			inputVal: '',
			list: []
		}

		export default (state = defaultState, action) => {
			if(action.type === 'change_input_val') {
				const newState = JSON.parse(JSON.stringify(state));
				newState.value = action.value;
				return newState;
			}

			if(action.type === 'add_item') {
				const newState = JSON.parse(JSON.stringify(state));
				newState.list.push(newState.inputVal);	
				newState.inputVal = '';
				return newState;
			}

			if(action.type === 'delete_item') {
				const newState = JSON.parse(JSON.stringify(state));
				newState.list.splice(action.index, 1)
				return newState;
			}

			return state;
		}

