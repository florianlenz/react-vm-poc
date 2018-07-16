class Base {
    constructor(){
        this.children = [];
        this.props = {};
    }
    append(child){
        this.children.push(child)
    }
    appendChild(child){
        this.children.push(child)
    }
    removeChild(child){
        this.children.filter((currentChild) => currentChild !== child)
    }
    toObject(){
        return {
            type: this.type,
            props: this.props,
            children: (() => {

                if (typeof this.children === 'string' || typeof this.children === 'number'){
                    return this.children
                }

                return this.children.map((child) => {

                    if (typeof child === 'string' || typeof child === 'number'){
                        return child
                    }

                    return child.toObject();

                })
            })()
        }
    }
}

export class View extends Base {
    constructor(){
        super();
        this.type = "view";
    }
}

export class Text extends Base {
    constructor(){
        super();
        this.type = "text";
    }
}
