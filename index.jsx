const React = require('react');
import {ReactTinyDOM} from './renderer'

const View = "View";
const Text = "Text";

// this is a app that will run inside the VM
class VMApp extends React.Component {
    constructor(props){
        super();
        this.props = props;
        this.state = {
            elements: [
                <Text>Hello1</Text>,
                <Text>Hello2</Text>,
                <Text>Hello3</Text>,
                <Text>Hello4</Text>,
            ]
        }
    }
    componentDidUpdate(){
        // push changed to client (pange)
        this.props.onNewJson(this.props.container.toObject());
    }
    componentDidMount() {
        // initially push changed to cient (pangea)
        this.props.onNewJson(this.props.container.toObject());
    }
    render(){
        return (
            <View>
                {this.state.elements}
            </View>
        )
    }
}

// this a container like you used to use in the DOM
// just a cheap fake
class Container {
    constructor(){
        this.children = [];
    }
    appendChild(child){
        this.children.push(child)
    }
    toObject(){
        return this.children.map((child) => {
            return child.toObject();
        })
    }
}

// THIS HERE is the most interesting method
// it will be called with the JSX tree in a object
// format as soon as the dom get's rendered / re rendered
const newJson = (json) => {
    console.log(json)
};

// initial setup. Don't care about this
const c = new Container();
ReactTinyDOM.render(<VMApp onNewJson={newJson} container={c}/>, c);
